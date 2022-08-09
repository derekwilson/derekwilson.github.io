---
layout: post
title:  "Xamarin Android Part 4"
date:   2022-04-27 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
---

# Xamarin Android for Android Developers

In the [previous post][part-3-url] we got as far as building an app for Android using [Xamarin Android][xamarin-android-url]. The app was build using the current Android architecture, targetting Android 12, using viewmodels, dependency injection and observers. The next step is to create unit tests to test the viewmodels.

### Create the AndroidTest application

The architecture we are trying to create looks like this

{% include widgets/image.html src='/images/jekyll/2021-12-01/podcastutilities2.png' width='612' height='285' title='Android Structure' %}

In the previous posts we created the `PodcastUtilities` application and `PodcastUtilities.AndroidLogic` class library next we need to create `PodcastUtilities.AndroidTests`

#### Running Unit Tests

The typical advice for testing android applications is to [split your tests into groups][unit-test1-url] where some run on the device and some are [local tests][unit-test2-url] that run on your development machine rather than an android device.

I've always felt uneasy about local tests, they are much quicker and more reliable as there is no android device or emulator involved. However they only work because of lots of patch code, for instance 

{% highlight kotlin linenos %}
  // Executes each task synchronously using Architecture Components.
  @get:Rule
  var instantExecutorRule = InstantTaskExecutorRule()

  // Set the main coroutines dispatcher for unit testing.
  @ExperimentalCoroutinesApi
  @get:Rule
  var mainCoroutineRule = MainCoroutineRule()
{% endhighlight %}

Also using mockable android library like this

```
	testOptions {
		unitTests.returnDefaultValues = true
	}
```

Also Google seem to recommend using [Robolectric][robolectric-url]. I have disliked Robolectric for a long time, running unit tests in a simulator that tends to lag behind the current platform and not be usable for certain configurations such as dynamic feature modules has never seemed like a good idea to me.

The basic problem all these tools and patches are trying to overcome is that your are not testing on Android. This was less of a problem when we were using presenter patterns but viewmodels and LiveData are intrinsically android concepts and I do understand why we run unit tests on local machines but I have remained nervous about it.

For better or worse Xamarin just does not have any of these patches or tools. In the end if you want to use an object that derives from `Java.Lang.Class` and `AndroidX.Lifecycle.AndroidViewModel` then you are going to need to be running in an environment where the runtime has access to the `Xamarin.AndroidX.Lifecycle.ViewModel` wrapper assembly and in turn the Google android runtime. Xamarin simply does not provide desktop versions of these, so the only choice is to create an android application to house the unit tests. This might sound slow and brittle but remember these are not UI tests they are true unit tests that just happen to run on a device. I run my tests on real devices but don't forget going forward that I see no reason why we could not use [Windows Subsystem for Android][wsa-url] which would deliver the robust and fast execution of unit tests on a developer machine but using a real android system image rather than a simulator.

#### xUnit

When I created the proof of concept projects I was using VisualStudio 2019 and targetting Android 11. In that setup I decided to use xUnit as my test runner, using [xUnit for devices][xunit-devices-url]. It worked well enough and I have always enjoyed using xUnit however the runner application for the devices was old and not being very well maintained. When building I could not use the latest Nuget package versions so I was getting these warnings on Android 11

```
NU1605: Detected package downgrade: Xamarin.Google.Android.Material from 1.4.0.4 to 1.3.0.1. Reference the package directly from the project to select a different version. 
 PodcastUtilitiesPOC.AndroidTests -> PodcastUtilitiesPOC.AndroidLogic -> Xamarin.Google.Android.Material (>= 1.4.0.4) 
 PodcastUtilitiesPOC.AndroidTests -> Xamarin.Google.Android.Material (>= 1.3.0.1)
```

In android 12 it broke and I could not use it.


#### nUnit

In Android 12 I switched to using [Nunit Lite][nunit-lite-url]. This had the huge advantage of being open sources and a much simpler implementation than xUnit. I also found this [blog post][nunit-template-url] on how to create a template but just looking at the open source repo was enough to get me started.

I used VisualStudio 2022 to create a Xamarin Android app

{% include widgets/image.html src='/images/jekyll/2022-04-01/new proj1.png' width='600' height='300' title='New Project' %}

Like the other class libraries and applications, make sure it targets Android 12.

The `PodcastUtilities.AndroidTests` application does have more dependencies than the main application as it needs the test runner and also the mocking mechanism. The Nuget package references looked like this

{% include widgets/image.html src='/images/jekyll/2022-04-01/nuget tests.png' width='500' height='300' title='Package references' %}

I created a main activity like this

{% highlight C# linenos %}
namespace PodcastUtilities.AndroidTests
{
  [Activity(Label = "UnitTests PodcastUtilities", MainLauncher = true)]
  public class MainActivity : TestSuiteActivity
  {
    protected override void OnCreate(Bundle bundle)
    {
      // tests can be inside the main assembly
      this.AddTest(Assembly.GetExecutingAssembly());
      // or in any reference assemblies
      // AddTest (typeof (Your.Library.TestClass).Assembly);

      // Once you called base.OnCreate(), you cannot add more assemblies.
      base.OnCreate(bundle);
    }
  }
}
{% endhighlight %}


### Mocking using FakeItEasy

The first thing I needed in the test assemblies was a mocking framework that was capable of mocking `Java.Lang.Class` derived objects. I tried a few but settled on [FakeItEasy][fakeiteasy-url] as it was a dynamic fake library that meant that I could mock pretty much anything.

### Viewmodel tests using LiveData

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
{% endhighlight %}

I wanted to be able to write a test that ensured that when `Initialise` was called, we logged and also we updated the title.

{% highlight C# linenos %}
[TestFixture]
public class ExampleViewModelTests
{
  private ExampleViewModel ViewModel;

  protected Android.App.Application MockApplication = A.Fake<Android.App.Application>();
  protected ILogger MockLogger = A.Fake<ILogger>();
  protected ILiveDataFactory MockLiveDataFactory = A.Fake<ILiveDataFactory>();
  protected MutableLiveData MockTitleLiveData = A.Fake<MutableLiveData>();

  [SetUp]
  public void Setup()
  {
    A.CallTo(() => MockLiveDataFactory.CreateMutableLiveData()).Returns(MockTitleLiveData);
    ViewModel = new ExampleViewModel(MockApplication, MockLogger, MockLiveDataFactory);
  }

  [Test]
  public void Initialise_Sets_LiveData_Title()
  {
    ViewModel.Initialise();

    var calls = Fake.GetCalls(MockTitleLiveData).ToList();
    Assert.True(1 == calls.Count, $"there should be one call to the livedata there was {calls.Count} ");
    A.CallTo(() => MockTitleLiveData.PostValue(A<Java.Lang.Object>.That.Matches(s => s.ToString() == "Observed LiveData Title"))).MustHaveHappened(1, Times.Exactly);
  }

  [Test]
  public void Initialise_Loggs()
  {
    ViewModel.Initialise();

    // once for the ctor and once for Initialise()
    A.CallTo(() => MockLogger.Debug(A<ILogger.MessageGenerator>.Ignored)).MustHaveHappened(2, Times.Exactly);
  }
}
{% endhighlight %}

In real production code we would use string resources that are provided and mocked but literals have been used in the example to make it simpler.

As with the main app code using LiveData its just a bit more complex to use LiveData, this is only natural as we are trying to move .NET data from one class to another and going via the Android/Java concept of LiveData is always going to be more complex however the test is interesting as it illustrates that it would appear that this is all possible in Xamarin.Android.

### Viewmodel tests using C# EventHandlers

[C# events][events-url] have been baked into the language almost from the beginning. There is considerable advantage when the observer and observed code are both .NET. 

{% highlight C# linenos %}
public class DownloadViewModel : AndroidViewModel, ILifecycleObserver
{
  public class ObservableGroup
  {
    public EventHandler<string> Title;
  }
  public ObservableGroup Observables = new ObservableGroup();

  private ILogger Logger;
  private IResourceProvider ResourceProvider;

  public DownloadViewModel(
    Application app,
    ILogger logger,
    IResourceProvider resourceProvider) : base(app)
  {
    Logger = logger;
    ResourceProvider = resourceProvider;
  }

  public void Initialise()
  {
    Logger.Debug(() => $"DownloadViewModel:Initialise");
    Observables.Title?.Invoke(this, ResourceProvider.GetString(Resource.String.download_activity_title));
  }
{% endhighlight %}

The tests for this look like this

{% highlight C# linenos %}
[TestFixture]
public class DownloadViewModel_Initialise : DownloadViewModelBase
{
  protected DownloadViewModel ViewModel;

  public class ObservedResultsGroup
  {
    public string LastSetTitle;
  }
  protected ObservedResultsGroup ObservedResults = new ObservedResultsGroup();

  // mocks
  protected Application MockApplication;
  protected ILogger MockLogger;
  protected IResourceProvider MockResourceProvider;

  protected void ResetObservedResults()
  {
    ObservedResults.LastSetTitle = null;
  }

  private void SetupResources()
  {
    A.CallTo(() => MockResourceProvider.GetString(Resource.String.download_activity_title)).Returns("Mocked Title");
  }

  [SetUp]
  public void Setup()
  {
    ResetObservedResults();

    MockApplication = A.Fake<Application>();
    A.CallTo(() => MockApplication.PackageName).Returns("com.andrewandderek.podcastutilities");
    MockLogger = A.Fake<ILogger>();
    MockResourceProvider = A.Fake<IResourceProvider>();

    SetupResources();

    ViewModel = new DownloadViewModel(
      MockApplication,
      MockLogger,
      MockResourceProvider
    );
    ViewModel.Observables.Title += SetTitle;
  }

  [TearDown]
  public void TearDown()
  {
    ViewModel.Observables.Title -= SetTitle;
  }

  private void SetTitle(object sender, string title)
  {
    ObservedResults.LastSetTitle = title;
  }

  [Test]
  public void Initialise_Sets_Title()
  {
    // arrange

    // act
    ViewModel.Initialise();

    // assert
    Assert.AreEqual("Mocked Title", ObservedResults.LastSetTitle);
  }

  [Test]
  public void Initialise_Logs()
  {
    // arrange

    // act
    ViewModel.Initialise();

    // assert
    A.CallTo(() => MockLogger.Debug(A<ILogger.MessageGenerator>.Ignored)).MustHaveHappened(2, Times.Exactly);
  }
}
{% endhighlight %}

This does seem less complex than the LiveData approach, the penalty we have to pay is unhooking the observers in the `TearDown` method.

### Putting it all together

When the tests are run they look like this and failures can be easily spotted and rectified.

{% include widgets/image.html src='/images/jekyll/2022-04-01/testsgood.png' width='300' height='600' title='Tests UI' %}
{% include widgets/image.html src='/images/jekyll/2022-04-01/testsbad.png' width='300' height='600' title='Tests Fail UI' %}


[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[part-2-url]:               /blog/2022/02/24/xamarin-android-part2
[part-3-url]:               /blog/2022/03/27/xamarin-android-part3
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
[livedata-url]:             https://developer.android.com/topic/libraries/architecture/livedata
[events-url]:               https://docs.microsoft.com/en-us/dotnet/standard/events/
[unit-test1-url]:           https://developer.android.com/training/testing/fundamentals
[unit-test2-url]:           https://developer.android.com/training/testing/local-tests
[robolectric-url]:          http://robolectric.org
[wsa-url]:                  https://docs.microsoft.com/en-us/windows/android/wsa/
[xunit-devices-url]:        https://github.com/xunit/devices.xunit
[nunit-lite-url]:           https://github.com/xamarin/Xamarin.Legacy.NUnitLite
[nunit-template-url]:       https://dgatto.com/posts/2020/12/droid-nunit-template/
[fakeiteasy-url]:           https://fakeiteasy.readthedocs.io/en/stable/

