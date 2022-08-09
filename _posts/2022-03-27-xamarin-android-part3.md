---
layout: post
title:  "Xamarin Android Part 3"
date:   2022-03-27 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
---

# Xamarin Android for Android Developers

In the [previous post][part-2-url] I got to the point where I had created a PodcastUtilities app for Android using [Xamarin Android][xamarin-android-url]. This is the third part of that journey which describes the steps I took to get activities, viewmodels and observables working.

### Create AndroidLogic class library

As I said in [part 1][part-1-url], in "real" android instrumentation tests, the tests just reference the main app directly however the received wisdom is that [having test runner apps reference you main app][xamarin-tests1-url] was not a great plan in Xamarin Android, also see [this answer][xamarin-tests2-url] on Stackoverflow, so I created a common shared assembly as it doesnt really make much difference to the build. The structure looks like this

{% include widgets/image.html src='/images/jekyll/2021-12-01/podcastutilities2.png' width='612' height='285' title='Android Structure' %}

I created the `PodcastUtilities.AndroidLogic` assembly as an Android Class Library like this

{% include widgets/image.html src='/images/jekyll/2022-03-01/new proj2.png' width='500' height='300' title='New Project' %}

Be sure to make sure it also targets Android 12 like the main app.

### Adding development essentials

Before I could get to implementing any real code there were some base services that I needed to get into the app, for example logging and dependency injection. To initialise and house these services I needed to create my own custom application class.

#### Creating a custom application

To create a custom application class in Xamarin Android use the `Application` attribute and derive from `Android.App.Application`

{% highlight C# linenos %}
using Android.App;

namespace PodcastUtilities
{
    [Application]
    public class AndroidApplication : Application, IAndroidApplication
    {
        // we must have a ctor or the app will not start
        protected AndroidApplication(System.IntPtr javaReference, JniHandleOwnership transfer) : base(javaReference, transfer)
        {
        }
    }
}
{% endhighlight %}

There is a gotcha, if you do not have a constructor your app will crash on launch with this error

```
android.runtime.JavaProxyThrowable: System.NotSupportedException: Unable to activate instance of type PodcastUtilities.AndroidApplication from native handle 0x7fdcabc194 (key_handle 0x8d41e11).
 ---> System.MissingMethodException: No constructor found for PodcastUtilities.AndroidApplication::.ctor(System.IntPtr, Android.Runtime.JniHandleOwnership)
  ---> Java.Interop.JavaLocationException: Exception of type 'Java.Interop.JavaLocationException' was thrown.
--- End of inner exception stack trace ---
```

#### Adding NLog

One of the advantages of using .NET and C# for development is the range of choice for each of the components of an app. There are any number of logging frameworks that can be used I used [NLog][nlog-url] for this app largely because I could find some [good examples][nlog-example-url] of how to configure it.

For PodcastUtilities all that was needed was

1. Add NUget reference for NLog to the main app and the logic dll
1. Add NLog config to the app `Assets`
1. Initialise the logging in our custom `Application` class

The `NLog.config` needs to be placed in the app `Assets`, make sure the build action is `AndroidAsset`. 

{% include widgets/image.html src='/images/jekyll/2022-03-01/nlogconfig.png' width='200' height='600' title='NLog config' %}

Its an XML file and mine looks like this.

{% highlight XML linenos %}
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.nlog-project.org/schemas/NLog.xsd NLog.xsd"
      autoReload="true"
      throwExceptions="false"
      internalLogLevel="Off"
      internalLogFile="c:\temp\nlog-internal.log">
	<targets>
		<target xsi:type="Console" 
				name="consoleTarget" 
				layout="PodcastUtilities-Tag ${uppercase:${level}} ${message}" />

		<target xsi:type="File"
				name="externalFileTarget"
				fileName="set-in-code.csv"
				archiveFileName="set-in-code.csv"
				archiveEvery="Day"
				archiveNumbering="Rolling"
				maxArchiveFiles="7"
				concurrentWrites="false"
				keepFileOpen="false">
			<layout xsi:type="CsvLayout" delimiter="Tab" quoting="Nothing" withHeader="true">
				<column name="time" layout="${longdate:universalTime=true}" />
				<column name="threadid" layout="${threadid}" />
				<column name="level" layout="${level:upperCase=true}" />
				<column name="callsite" layout="${callsite:includeSourcePath=true}" />
				<column name="message" layout="${message}" />
				<column name="stacktrace" layout="${callsite:includeSourcePath=true}" />
				<column name="exception" layout="${exception:format=ToString}" />
			</layout>
		</target>
	</targets>

	<rules>
		<logger name="*" writeTo="externalFileTarget" />
		<logger name="*" writeTo="consoleTarget" />
	</rules>
</nlog>
{% endhighlight %}

In the config file the filenames are specified as `set-in-code.csv`. These filenames are actually set and the logging initialised from the application like this

{% highlight C# linenos %}
[Application]
public class AndroidApplication : Application, IAndroidApplication
{
  public ILogger Logger { get; private set; }

  public override void OnCreate()
  {
    SetupExceptionHandler();
    base.OnCreate();
    var dirs = Context.GetExternalFilesDirs(null);
    if (dirs != null && dirs[0] != null)
    {
      // use our external folder - it depends on package name
      LoggerFactory = new NLoggerLoggerFactory(dirs[0].AbsolutePath);
    }
    else
    {
      // hard code and hope for the best
      LoggerFactory = new NLoggerLoggerFactory($"/sdcard/Android/data/{this.PackageName}/files/");
    }
    Logger = LoggerFactory.Logger;
    Logger.Debug(() => $"AndroidApplication:Logging init");
  }

  private void SetupExceptionHandler()
  {
    AppDomain.CurrentDomain.UnhandledException += CurrentDomainOnUnhandledException;
    TaskScheduler.UnobservedTaskException += TaskSchedulerOnUnobservedTaskException;
  }

  private void TaskSchedulerOnUnobservedTaskException(object sender, UnobservedTaskExceptionEventArgs unobservedTaskExceptionEventArgs)
  {
      Logger?.LogException(() => "TaskSchedulerOnUnobservedTaskException", unobservedTaskExceptionEventArgs.Exception);
  }

  private void CurrentDomainOnUnhandledException(object sender, UnhandledExceptionEventArgs unhandledExceptionEventArgs)
  {
    Logger?.LogException(() => "CurrentDomainOnUnhandledException", unhandledExceptionEventArgs.ExceptionObject as Exception);
  }
}
{% endhighlight %}

The call to create the `NLoggerLoggerFactory` is passed the full path to the application's public file storage area so that the logs can be seen from an on-device file manager.

`SetupExceptionHandler` ensures that any unexpected crashes are logged.

The logging utility class looks like this

{% highlight C# linenos %}
public interface ILogger
{
  public delegate string MessageGenerator();

  void Debug(MessageGenerator message);
  void Warning(MessageGenerator message);
  void LogException(MessageGenerator message, Exception ex);
}
public class NLogLogger : ILogger
{
  private Logger nlogLogger;

  public NLogLogger(Logger logger)
  {
    nlogLogger = logger;
  }

  public void Debug(ILogger.MessageGenerator message)
  {
    if (nlogLogger.IsEnabled(LogLevel.Debug))
    {
      // only call the message delegate if we are logging
      nlogLogger.Debug(message());
    }
  }

  public void Warning(ILogger.MessageGenerator message)
  {
    if (nlogLogger.IsEnabled(LogLevel.Warn))
    {
      // only call the message delegate if we are logging
      nlogLogger.Warn(message());
    }
  }

  public void LogException(ILogger.MessageGenerator message, Exception ex)
  {
    nlogLogger.Error(ex, message() + $" => {ex.Message}");
  }
}

public interface ILoggerFactory
{
  ILogger Logger { get; }
}

public class NLoggerLoggerFactory : ILoggerFactory
{
  /// <summary>
  /// Use whatever is in the config file
  /// </summary>
  public NLoggerLoggerFactory()
  {
  }

  /// <summary>
  /// setup the file target with the supplied folder
  /// </summary>
  /// <param name="folder">folder for log files</param>
  public NLoggerLoggerFactory(String folder)
  {
    var config = LogManager.Configuration;
    var target = config.FindTargetByName("externalFileTarget");
    var fileTarget = target as FileTarget;
    fileTarget.FileName = Path.Combine(folder, "logs/${shortdate}.log.csv");
    fileTarget.ArchiveFileName = Path.Combine(folder, "logs/archive.{#}.log.csv");
    LogManager.ReconfigExistingLoggers();
  }

  public ILogger Logger
  {
    get
    {
      var logger = LogManager.GetCurrentClassLogger();
      return new NLogLogger(logger);
    }
  }
}
{% endhighlight %}

The `MessageGenerator` delegate mechanism is so that the code that creates the log messages will not be called if logging is not enabled.

The constructor that takes a folder path parameter uses the `LogManager.Configuration` to set the filenames in the config to be correct, in the case of PodcastUtilities it is set to be `/sdcard/Android/data/com.andrewandderek.podcastutilities.debug/logs/${shortdate}.log.csv` for a debug build. 

Note:
1. The path is different for release builds. 
1. The `${shortdate}` macro is evaluated by NLog
1. NLog will ensure the folder exists
1. The factory will always create a logger, it relies on the IoC container to ensure that its a singleton.


#### Adding dependency injection

`PodcastUtilities.Common` already makes use of dependency injection by using `PodcastUtilities.IoC`. The dependency injection mechanism is accessed via an interface `IIocContainer` because we need to be able to use different IoC implementations depending upon the runtime environment, .NET Framework or .NET Standard. In .NET Standard `PodcastUtilities.Common` uses [Microsoft.Extensions.DependencyInjection][ms-di-url] and it would be much simpler if the app and the core utilities used the same container.

This was done by adding some initialisation code and methods in the custom application class like this.

{% highlight C# linenos %}
using PodcastUtilities.Common;
using PodcastUtilities.Common.Platform;
using PodcastUtilities.Ioc;

[Application]
public class AndroidApplication : Application, IAndroidApplication
{
  public IIocContainer IocContainer { get; private set; }

  /// <summary>
  /// setup the core PodcastUtilities.Common components
  /// </summary>
  /// <returns>an initialised container</returns>
  private static IIocContainer InitializeIocContainer()
  {
    var container = IocRegistration.GetEmptyContainer();

    IocRegistration.RegisterSystemServices(container);
    IocRegistration.RegisterPortableDeviceServices(container);
    IocRegistration.RegisterFileServices(container);
    IocRegistration.RegisterFeedServices(container);
    IocRegistration.RegisterPlaylistServices(container);

    return container;
  }

  /// <summary>
  /// add extra android things to the container so we can inject our viewmodels
  /// </summary>
  /// <param name="container">container to add to</param>
  /// <returns>the updated container</returns>
  private IIocContainer AddExtrasToIocContainer(IIocContainer container)
  {
    // the container itself, for factories
    container.Register<IIocContainer>(container);
    // android things
    container.Register<Context>(ApplicationContext);
    container.Register<Application>(this);
    // helpers
    container.Register<IAndroidApplication>(this);
    container.Register<ILogger>(Logger);
    container.Register<ICrashReporter, CrashlyticsReporter>(IocLifecycle.Singleton);
    container.Register<IAnalyticsEngine, FirebaseAnalyticsEngine>(IocLifecycle.Singleton);
    container.Register<IResourceProvider, AndroidResourceProvider>(IocLifecycle.Singleton);
    container.Register<IFileSystemHelper, FileSystemHelper>(IocLifecycle.Singleton);
    // view models
    container.Register<ViewModelFactory, ViewModelFactory>(IocLifecycle.Singleton);
    container.Register<MainViewModel, MainViewModel>();
    container.Register<SettingsViewModel, SettingsViewModel>();
    container.Register<OpenSourceLicensesViewModel, OpenSourceLicensesViewModel>();
    container.Register<DownloadViewModel, DownloadViewModel>();
    container.Register<MessagesViewModel, MessagesViewModel>();

    var factory = container.Resolve<ViewModelFactory>();
    factory.AddMap(typeof(MainViewModel));
    factory.AddMap(typeof(SettingsViewModel));
    factory.AddMap(typeof(OpenSourceLicensesViewModel));
    factory.AddMap(typeof(DownloadViewModel));
    factory.AddMap(typeof(MessagesViewModel));
    return container;
  }

  public override void OnCreate()
  {
    base.OnCreate();
    // initialise the IoC container
    IocContainer = InitializeIocContainer();
    AddExtrasToIocContainer(IocContainer);
  }
}
{% endhighlight %}

Now when the logic objects are resolved in the android app then dependencies from `PodcastUtilities.Common` or from `PodcastUtilities.AndroidLogic` can all be supplied with one call to the `container.Resolve<>()` method.

### ViewModels

Since the advent of Jetpack Google have been recommending that developers use [viewmodels][viewmodel-url] and I was keen to try and use them from Xamarin Android. This is the method that I used.

1. Create a viewmodel by deriving from `AndroidX.Lifecycle.AndroidViewModel`, we want to be able to test the viewmodel and it is not referenced directly from the manifest so I put it in the AndroiLogic assembly.
1. Create an activity by deriving from `AndroidX.AppCompat.App.AppCompatActivity`, the activity is referenced from the manifest so I put it in the main app
1. Add the viewmodel to the IoC container and also to the `ViewModelFactory` map.

#### The ViewModel

The skeleton viewmodel looks like this

{% highlight C# linenos %}
public class ExampleViewModel : AndroidViewModel, ILifecycleObserver
{
  public class ObservableGroup
  {
    public EventHandler<string> Title;
  }
  public ObservableGroup Observables = new ObservableGroup();

  private ILogger Logger;
  private IResourceProvider ResourceProvider;

  public ExampleViewModel(
    ILogger logger,
    IResourceProvider resProvider
    ) : base(app)
  {
    Logger = logger;
    Logger.Debug(() => $"ExampleViewModel:ctor");

    ResourceProvider = resProvider;
  }

  public void Initialise()
  {
    Logger.Debug(() => $"ExampleViewModel:Initialise");
    Observables.Title?.Invoke(this, ResourceProvider.GetString(Resource.String.example_activity_title));
  }
}
{% endhighlight %}

The construction parameters will be supplied from the IoC container.

#### The Activity

The activity looks like this

{% highlight C# linenos %}
// Title is set dynamically
[Activity(ParentActivity = typeof(MainActivity))]
public class ExampleActivity : AppCompatActivity
{
  private DownloadViewModel ViewModel;
  private AndroidApplication AndroidApplication;

  protected override void OnCreate(Bundle savedInstanceState)
  {
    AndroidApplication = Application as AndroidApplication;
    AndroidApplication.Logger.Debug(() => $"ExampleActivity:OnCreate");

    base.OnCreate(savedInstanceState);

    // Set our view from the layout resource
    SetContentView(Resource.Layout.activity_download);

    var factory = AndroidApplication.IocContainer.Resolve<ViewModelFactory>();
    ViewModel = new ViewModelProvider(this, factory).Get(Java.Lang.Class.FromType(typeof(ExampleViewModel))) as ExampleViewModel;

    Lifecycle.AddObserver(ViewModel);
    SetupViewModelObservers();

    ViewModel.Initialise();
    AndroidApplication.Logger.Debug(() => $"ExampleActivity:OnCreate - end");
  }

  protected override void OnDestroy()
  {
    base.OnDestroy();
    KillViewModelObservers();
  }
{% endhighlight %}

The method `Java.Lang.Class.FromType(typeof(ExampleViewModel))` gets the Java class information for the class that is the Java wrapper generated by the build tools for the supplied .NET class.

#### The ViewModelFactory

I guess the clever bit of this code is in the `ViewModelFactory` we hand this off to the `AndroidX.Lifecycle.ViewModelProvider` and as long as we do the right thing when asked, Android will not know we are any different from any other Java/Kotlin consumer.

The right thing in this instance looks like this

{% highlight C# linenos %}
public class ViewModelFactory : Java.Lang.Object, ViewModelProvider.IFactory
{
  public struct ClassMap
  {
    public Java.Lang.Class javaClassType;
    public Type netType;
  }

  private IIocContainer IocContainer;
  private ILogger Logger;

  private Dictionary<string, ClassMap> ModelMap = new Dictionary<string, ClassMap>(10);

  public ViewModelFactory(
    IIocContainer container,
    ILogger logger
    )
  {
    IocContainer = container;
    Logger = logger;
  }

  public void AddMap(ClassMap item)
  {
    Logger.Debug(() => $"ViewModelFactory:AddMap {item.javaClassType.CanonicalName}");
    ModelMap.Add(item.javaClassType.CanonicalName, item);
  }

  public void AddMap(Type type)
  {
    AddMap(new ClassMap() { javaClassType = Java.Lang.Class.FromType(type), netType = type });
  }

  public Java.Lang.Object Create(Java.Lang.Class classType)
  {
    Logger.Debug(() => $"ViewModelFactory:Create {classType.CanonicalName}");

    // instead of a generic call like this
    // var obj = IocContainer.Resolve<DownloadViewModel>();
    // we do this - because we do not know the type (DownloadViewModel in this example) at compile time
    MethodInfo method = typeof(IIocContainer).GetMethod(nameof(IIocContainer.Resolve));
    MethodInfo generic = method.MakeGenericMethod(ModelMap[classType.CanonicalName].netType);
    var obj = generic.Invoke(IocContainer, null);

    Logger.Debug(() => $"ViewModelFactory:Create null == {obj == null}");
    return (Java.Lang.Object)obj;
  }
}
{% endhighlight %}

Android will call `Create` and will pass in the `Java` class it want to be created. Internally in the `ViewModelFactory` we have a map of java classes to .NET classes so we can get the IocContainer to create the .NET type (we need to do this via reflection as we dont know the type at compile time) and then we just cast it back to being a Java object and hand it back.

As we are using the IocContainer to resolve the type any dependencies or lifestyle restrictions will be satisfied by the IocContainer. As the IocContainer is an injected dependency of the factory we place the container in the container in the `AndroidApplication`.

#### The Application

The only other bit that is needed is to ensure the factory and container have the `ExampleViewModel` added to them when the application is started like this

{% highlight C# linenos %}
/// <summary>
/// add extra android things to the container so we can inject our viewmodels
/// </summary>
/// <param name="container">container to add to</param>
/// <returns>the updated container</returns>
private IIocContainer AddExtrasToIocContainer(IIocContainer container)
{
  // the container itself, for factories
  container.Register<IIocContainer>(container);
  // android things
  container.Register<Context>(ApplicationContext);
  container.Register<Application>(this);
  // helpers
  container.Register<IAndroidApplication>(this);
  container.Register<ILogger>(Logger);
  container.Register<ICrashReporter, CrashlyticsReporter>(IocLifecycle.Singleton);
  container.Register<IAnalyticsEngine, FirebaseAnalyticsEngine>(IocLifecycle.Singleton);
  container.Register<IResourceProvider, AndroidResourceProvider>(IocLifecycle.Singleton);
  container.Register<IFileSystemHelper, FileSystemHelper>(IocLifecycle.Singleton);
  // view models
  container.Register<ViewModelFactory, ViewModelFactory>(IocLifecycle.Singleton);
  container.Register<MainViewModel, MainViewModel>();
  container.Register<SettingsViewModel, SettingsViewModel>();
  container.Register<OpenSourceLicensesViewModel, OpenSourceLicensesViewModel>();
  container.Register<DownloadViewModel, DownloadViewModel>();
  container.Register<MessagesViewModel, MessagesViewModel>();
  container.Register<ExampleViewModel, ExampleViewModel>();

  var factory = container.Resolve<ViewModelFactory>();
  factory.AddMap(typeof(MainViewModel));
  factory.AddMap(typeof(SettingsViewModel));
  factory.AddMap(typeof(OpenSourceLicensesViewModel));
  factory.AddMap(typeof(DownloadViewModel));
  factory.AddMap(typeof(MessagesViewModel));
  factory.AddMap(typeof(ExampleViewModel));
  return container;
}
{% endhighlight %}

If you forget to add the viewmodel to the factory then you will get an error like this

```
The given key 'crc644c7cb612129105ac.PurgeViewModel' was not present in the dictionary.	
Collections.Generic.KeyNotFoundException: The given key 'crc644c7cb612129105ac.PurgeViewModel' was not present in the dictionary.
  at System.Collections.Generic.Dictionary`2[TKey,TValue].get_Item (TKey key) [0x0001e] in <a8b4702b60024176b74a9d7a0c8fe330>:0 
  at PodcastUtilities.AndroidLogic.ViewModel.ViewModelFactory.Create (Java.Lang.Class classType) [0x00055] in <9aa43d2f76e444f8a2df9c9e1a95a089>:0 
  at AndroidX.Lifecycle.ViewModelProvider+IFactoryInvoker.n_Create_Ljava_lang_Class_ (System.IntPtr jnienv, System.IntPtr native__this, System.IntPtr native_modelClass) [0x0000f] in <3bc29452d8cf4fe3980f8edceb3ad872>:0 
  at (wrapper dynamic-method) Android.Runtime.DynamicMethodNameCounter.4(intptr,intptr,intptr)
--- End of stack trace from previous location where exception was thrown ---

  at Java.Interop.JniEnvironment+InstanceMethods.CallObjectMethod (Java.Interop.JniObjectReference instance, Java.Interop.JniMethodInfo method, Java.Interop.JniArgumentValue* args) [0x0006e] in <2e109281f9514c53b44688fd4549adb2>:0 
  at Java.Interop.JniPeerMembers+JniInstanceMethods.InvokeVirtualObjectMethod (System.String encodedMember, Java.Interop.IJavaPeerable self, Java.Interop.JniArgumentValue* parameters) [0x0002a] in <2e109281f9514c53b44688fd4549adb2>:0 
  at AndroidX.Lifecycle.ViewModelProvider.Get (Java.Lang.Class modelClass) [0x00031] in <3bc29452d8cf4fe3980f8edceb3ad872>:0 
  at PodcastUtilities.UI.Purge.PurgeActivity.OnCreate (Android.OS.Bundle savedInstanceState) [0x00101] in <ad7fdac40ea443a59474142a1a615fe1>:0 
  at Android.App.Activity.n_OnCreate_Landroid_os_Bundle_ (System.IntPtr jnienv, System.IntPtr native__this, System.IntPtr native_savedInstanceState) [0x0000f] in <96214b62e5264246be943a5d64d16954>:0 
  at (wrapper dynamic-method) Android.Runtime.DynamicMethodNameCounter.5(intptr,intptr,intptr)
```


#### Lifecycle

If you want to have your viewmodel lifecycle aware then you can do that by deriving the viewmodel from `ILifecycleObserver` as well as `AndroidViewModel` and add methods like this

{% highlight C# linenos %}
[Lifecycle.Event.OnResume]
[Java.Interop.Export]
public void OnResume()
{
  Logger.Debug(() => $"ExampleViewModel:OnResume");
}

[Lifecycle.Event.OnPause]
[Java.Interop.Export]
public void OnPause()
{
  Logger.Debug(() => $"ExampleViewModel:OnPause");
}
{% endhighlight %}

These methods will be called directly from Android without going via the activity.

However do be aware when you do this you must add a reference to `Mono.Android.Export.dll` or you will get an error like this

```
error XA4210: Please add a reference to Mono.Android.Export.dll when using ExportAttribute or ExportFieldAttribute.
```

### Observable data

In order that viewmodels work properly they must not directly refer to the activity or view. Instead we use some form of observable data mechanism.

#### LiveData

In "real" android applications the most obvious choice is to use [LiveData][livedata-url]. To get that working I did this

{% highlight C# linenos %}
public class ExampleViewModel : AndroidViewModel, ILifecycleObserver
{
  public class LiveDataObservableGroup
  {
    public LiveDataObservableGroup(ILiveDataFactory livedateFactory)
    {
      Title = livedateFactory.CreateMutableLiveData();
    }

    public MutableLiveData Title { get; private set; }
  }

  public LiveDataObservableGroup LiveDataObservables;

  private ILogger Logger;

  public ExampleViewModel(
    ILogger logger,
    ILiveDataFactory livedateFactory
    ) : base(app)
  {
    Logger = logger;

    Logger.Debug(() => $"ExampleViewModel:ctor");

    LiveDataObservables = new LiveDataObservableGroup(livedateFactory);
  }

  public void Initialise()
  {
    Logger.Debug(() => $"ExampleViewModel:Initialise");
    LiveDataObservables.Title.PostValue("Observed LiveData Title");
  }
}

public interface ILiveDataFactory
{
  MutableLiveData CreateMutableLiveData();
}

public class LiveDataFactory : ILiveDataFactory
{
  public MutableLiveData CreateMutableLiveData()
  {
    return new MutableLiveData();
  }
}

[Activity(ParentActivity = typeof(MainActivity))]
public class ExampleActivity : AppCompatActivity
{
  private ExampleViewModel ViewModel;
  private AndroidApplication AndroidApplication;

  private class ExampleTitleObserver : Java.Lang.Object, IObserver
  {
    ExampleActivity Activity;

    public ExampleTitleObserver(ExampleActivity downloadActivity)
    {
      Activity = downloadActivity;
    }

    public void OnChanged(Java.Lang.Object o)
    {
      string value = (string)o;
      Activity.Title = value;
    }
  }

  protected override void OnCreate(Bundle savedInstanceState)
  {
    AndroidApplication = Application as AndroidApplication;
    AndroidApplication.Logger.Debug(() => $"ExampleActivity:OnCreate");

    base.OnCreate(savedInstanceState);

    // Set our view from the layout resource
    SetContentView(Resource.Layout.activity_example);

    var factory = AndroidApplication.IocContainer.Resolve<ViewModelFactory>();
    ViewModel = new ViewModelProvider(this, factory).Get(Java.Lang.Class.FromType(typeof(ExampleViewModel))) as ExampleViewModel;
    Lifecycle.AddObserver(ViewModel);
    SetupLiveDataViewModelObservers();

    ViewModel.Initialise();

    AndroidApplication.Logger.Debug(() => $"ExampleActivity:OnCreate - end");
  }

  protected override void OnStop()
  {
    base.OnStop();
    // the LiveData observers are automatically removed at this point because of the androidx lifecycle
  }

  private void SetupLiveDataViewModelObservers()
  {
    ViewModel.LiveDataObservables.Title.Observe(this, new ExampleTitleObserver(this));
  }
}
{% endhighlight %}

The `ILiveDataFactory` is present to eliminate newing up the concrete `MutableLiveData` so that the viewmodel can be tested.

Having the nested `ExampleTitleObserver` class to receive the event is a little clunky and could get messy with lots of events. Also every object passed to `OnChanged` needs to be wrapped in a Java object which means that complex data types need to derive from `Java.Lang.Object`. This is a consequence of using the android observable implementation LiveData


#### C# EventHandlers

[C# events][events-url] have been baked into the language almost from the beginning. There is considerable advantage when the observer and observed code are both .NET. 

{% highlight C# linenos %}
public class ExampleViewModel : AndroidViewModel, ILifecycleObserver
{
  public class ObservableGroup
  {
    public EventHandler<string> Title;
  }
  public ObservableGroup Observables = new ObservableGroup();

  private ILogger Logger;

  public ExampleViewModel(
    ILogger logger
    ) : base(app)
  {
    Logger = logger;
    Logger.Debug(() => $"ExampleViewModel:ctor");
  }

  public void Initialise()
  {
    Logger.Debug(() => $"ExampleViewModel:Initialise");
    Observables.Title?.Invoke(this, "Observed Title");
  }
}

[Activity(ParentActivity = typeof(MainActivity))]
public class ExampleActivity : AppCompatActivity
{
  private ExampleViewModel ViewModel;
  private AndroidApplication AndroidApplication;

  protected override void OnCreate(Bundle savedInstanceState)
  {
    AndroidApplication = Application as AndroidApplication;
    AndroidApplication.Logger.Debug(() => $"ExampleActivity:OnCreate");

    base.OnCreate(savedInstanceState);

    // Set our view from the layout resource
    SetContentView(Resource.Layout.activity_example);

    var factory = AndroidApplication.IocContainer.Resolve<ViewModelFactory>();
      ViewModel = new ViewModelProvider(this, factory).Get(Java.Lang.Class.FromType(typeof(ExampleViewModel))) as ExampleViewModel;
    Lifecycle.AddObserver(ViewModel);
    SetupViewModelObservers();

    ViewModel.Initialise();

    AndroidApplication.Logger.Debug(() => $"ExampleActivity:OnCreate - end");
  }

  protected override void OnStop()
  {
    base.OnStop();
    KillObservers();
  }

  private void SetupViewModelObservers()
  {
    ViewModel.Observables.Title += SetTitle;
  }

  private void KillObservers()
  {
    ViewModel.Observables.Title -= SetTitle;
  }

  private void SetTitle(object sender, string title)
  {
    Title = title;
  }
}
{% endhighlight %}

The `Invoke` mechanism is far less clunky than using LiveData the only advantage that LiveData has is that when we use `EventHandler` we must remove the handler in the activity `OnStop()` method. 

The other advantage is that it is easy to use complex .NET types like Tuple in this manner

In the viewmodel

{% highlight C# linenos %}
  public EventHandler<Tuple<ISyncItem, Status, string>> UpdateItemStatus;

  Observables.UpdateItemStatus?.Invoke(this, Tuple.Create(item, Status.Error, e.Message));
{% endhighlight %}

In the activity

{% highlight C# linenos %}
private void UpdateItemStatus(object sender, Tuple<ISyncItem, Status, string> updateItem)
{
  RunOnUiThread(() =>
  {
    (ISyncItem item, Status status, string message) = updateItem;
    var position = Adapter.SetItemStatus(item.Id, status, message);
    Adapter.NotifyItemChanged(position);
  });
}
{% endhighlight %}

Its worth noting that if we raise events from background threads then we need to wrap any UI code in `RunOnUiThread`. I think this would apply to both `EventHandler` and `LiveData`.

Having setup the app structure the next step will be to write tests for the viewmodels.

[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[part-2-url]:               /blog/2022/02/24/xamarin-android-part2
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
[xamarin-tests1-url]:           https://social.msdn.microsoft.com/Forums/en-US/c913d278-5967-4945-98bd-236aac7453ec/unit-testing-with-android-unit-test-project-in-xamarinforms?forum=xamarinforms
[xamarin-tests2-url]:           https://stackoverflow.com/questions/41953284/xamarin-unit-test-app-android-defining-usage
[nlog-example-url]:         https://github.com/tafuji/Xamarin-Forms-NLog-Sample
[ms-di-url]:                https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection
[viewmodel-url]:            https://developer.android.com/topic/libraries/architecture/viewmodel?gclid=CjwKCAjwloCSBhAeEiwA3hVo_W9NJ8qCGqov4nEsacdrC08aXVB3PP6sf-vSrZNpwIyXHOAvHA5_zhoCK8QQAvD_BwE&gclsrc=aw.ds
[livedata-url]:             https://developer.android.com/topic/libraries/architecture/livedata
[nlog-url]:                 https://nlog-project.org
[events-url]:               https://docs.microsoft.com/en-us/dotnet/standard/events/

