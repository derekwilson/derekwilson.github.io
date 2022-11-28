---
layout: post
title:  "Xamarin Android Part 7"
date:   2022-11-28 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
---

# Monitoring Xamarin Android Applications

In a [previous post][part-5-url] we completed all the basic tasks building and publishing an app for Android using [Xamarin Android][xamarin-android-url]. Part of deploying a mobile app includes the ability to be able to monitor crashes and report on analytics.

To do this monitoring I declared two interfaces one for analytics and one for crashes

{% highlight C# linenos %}
public interface ICrashReporter
{
    void TestReporting();
    void LogNonFatalException(Exception ex);
}

public interface IAnalyticsEngine
{
    void DownloadFeedEvent(int numberOfItems);
    void DownloadSpecificFeedEvent(int numberOfItems, string folder);
    void DownloadEpisodeEvent(long sizeInMB);
    void DownloadEpisodeCompleteEvent();
    void LoadControlFileEvent();
    void LifecycleLaunchEvent();
    void LifecycleErrorEvent();
    void LifecycleErrorFatalEvent();
    void GeneratePlaylistEvent(PlaylistFormat format);
    void GeneratePlaylistCompleteEvent(int numberOfItems);
    void PurgeScanEvent(int numberOfItems);
    void PurgeDeleteEvent(int numberOfItems);
}
{% endhighlight %}

### Google Analytics and Firebase Crashlytics

The automatic choice for most android applications is [Google Analytics][ga-url] and [Firbase Crashlytics][crashlytics-url]

Adding these to a Xamarin Android application is pretty straightforward. Simply add NuGet package references for `Xamarin.Firebase.Analytics` and `Xamarin.Firebase.Crashlytics` to the project.

There are [instructions for setting up Crashlytics][crashlytics-setup-url] but essentially you create a project in the developer console, download the generated `google-services.json` and add the file to your project 

{% highlight XML linenos %}
<ItemGroup>
  <AndroidAsset Include="Assets\NLog.config" />
  <GoogleServicesJson Include="google-services.json" />
{% endhighlight %}

There is a small gotcha as explained [here][firebase-fix-url], but if you add this string to your resources then all should be well.

{% highlight XML linenos %}
<resources>
 <!-- 
 Bonkers - but see
 https://github.com/a-imai/XamarinCrashlyticsUpgradeSample
 https://docs.microsoft.com/en-us/answers/questions/450181/android-firebase-crashlytics-build-id-is-missing.html
 -->
 <string name="com.google.firebase.crashlytics.mapping_file_id">none</string>
</resources>
{% endhighlight %}


The crash reporter looks like this

{% highlight C# linenos %}
public class CrashlyticsReporter : ICrashReporter
{
  private IAnalyticsEngine AnalyticsEngine;

  public CrashlyticsReporter(IAnalyticsEngine analyticsEngine)
  {
    AnalyticsEngine = analyticsEngine;
  }

  public void LogNonFatalException(Exception ex)
  {
    var throwable = Java.Lang.Throwable.FromException(ex);
    FirebaseCrashlytics.Instance.RecordException(throwable);

    AnalyticsEngine?.LifecycleErrorEvent();
  }

  public void TestReporting()
  {
    throw new NotImplementedException("Test Crash Reporting");
  }
}
{% endhighlight %}

The analytics looks like this

{% highlight C# linenos %}
public class FirebaseAnalyticsEngine : IAnalyticsEngine
{
  private Context ApplicationContext;
  private IAndroidApplication Application;

  public FirebaseAnalyticsEngine(Context applicationContext, IAndroidApplication application)
  {
    ApplicationContext = applicationContext;
    Application = application;
  }

  private void SendEvent(string eventName, string eventCategory, string eventAction, string eventLabel, string eventValue)
  {
    var firebaseAnalytics = FirebaseAnalytics.GetInstance(ApplicationContext);
    var bundle = new Bundle();
    bundle.PutString(FirebaseAnalytics.Param.ItemId, eventCategory);
    if (eventAction != null)
    {
      bundle.PutString(FirebaseAnalytics.Param.ItemName, eventAction);
    }
    if (eventLabel != null)
    {
      bundle.PutString(FirebaseAnalytics.Param.ContentType, eventLabel);
    }
    if (eventValue != null)
    {
      bundle.PutString(FirebaseAnalytics.Param.Value, eventValue);
    }
    firebaseAnalytics.LogEvent(eventName, bundle);
  }

  private const string Seperator = "_";
  private const string Category_Lifecycle = "Lifecycle";
  private const string Action_Lifecycle_Error = "Lifecycle_Error";

  public void LifecycleErrorEvent()
  {
    SendEvent(
      FirebaseAnalytics.Event.SelectContent,
      Category_Lifecycle,
      Action_Lifecycle_Error,
      Action_Lifecycle_Error + Seperator + Application.DisplayVersion,
      null
    );
  }
{% endhighlight %}

The crashes appear like this

{% include widgets/image.html src='/images/jekyll/2022-11-01/crashlytics.png' width='612' height='285' title='Crashlytics' %}

The stack trace is a little mangled almost certainly caused by passing it from .NET to Java environments

### AppCenter Crashes and Analytics

The main issue with using Google Analytics and Firebase Crashlytics is that it ties you into using Google Play Services and that means that you can only run on Google's Android, [Amazon Fire OS][fireos-url] and [Windows Subsystem for Android][wsa-url] are not available without hacking.

[Microsoft AppCenter][appcenter-url] is an free alternative from Microsoft that, amongst other things, has [AppCenter Crashes][appcenter-crashes-url] and [AppCenter Analytics][appcenter-analytics-url] that are direct replacements that work in all Android forks.

Getting setup is also very simple. Add NuGet package references for `Microsoft.AppCenter.Analytics` and `Microsoft.AppCenter.Crashes` Then create a new project in the [AppCenter Console][appcenter-console-url] and then initialise the SDK like this

{% highlight C# linenos %}
  [Application]
  public class AndroidApplication : Application, IAndroidApplication
  {
    public override void OnCreate()
    {
      AppCenter.Start(Secrets.APP_CENTER_SECRET, typeof(Analytics), typeof(Crashes));
{% endhighlight %}

The crash reporter looks like this

{% highlight C# linenos %}
public class AppCenterCrashReporter : ICrashReporter
{
  private IAnalyticsEngine AnalyticsEngine;

  public AppCenterCrashReporter(IAnalyticsEngine analyticsEngine)
  {
    AnalyticsEngine = analyticsEngine;
  }

  public void LogNonFatalException(Exception ex)
  {
    Crashes.TrackError(ex);
    AnalyticsEngine?.LifecycleErrorEvent();
  }

  public void TestReporting()
  {
    // Note - this will only do anything in a debug build
    Crashes.GenerateTestCrash();
  }
}
{% endhighlight %}

The analytics looks like this

{% highlight C# linenos %}
public class AppCenterAnalyticsEngine : IAnalyticsEngine
{
  private IAndroidApplication Application;

  public AppCenterAnalyticsEngine(IAndroidApplication application)
  {
    Application = application;
  }

  private const string Event_Lifecycle_Error = "Lifecycle_Error";
  private const string Property_Version = "Version";

  public void LifecycleErrorFatalEvent()
  {
    Analytics.TrackEvent(Event_Lifecycle_ErrorFatal, new Dictionary<string, string> {
      { Property_Version, Application.DisplayVersion}
    });
  }
{% endhighlight %}

The crashes appear like this

{% include widgets/image.html src='/images/jekyll/2022-11-01/appcrashes.png' width='612' height='285' title='Crashlytics' %}

Both mechanisms work pretty much as you would expect

[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[part-2-url]:               /blog/2022/02/24/xamarin-android-part2
[part-3-url]:               /blog/2022/03/27/xamarin-android-part3
[part-4-url]:				        /blog/2022/04/27/xamarin-android-part4
[part-5-url]:				        /blog/2022/06/30/xamarin-android-part5
[part-6-url]:			        	/blog/2022/08/30/xamarin-android-part6
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
[ga-url]:                   https://developers.google.com/analytics
[crashlytics-url]:          https://firebase.google.com/products/crashlytics
[crashlytics-setup-url]:    https://firebase.google.com/docs/crashlytics/get-started?platform=android
[wsa-url]:                  https://learn.microsoft.com/en-us/windows/android/wsa/
[fireos-url]:               https://en.wikipedia.org/wiki/Fire_OS
[appcenter-url]:            https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/Xamarin
[appcenter-crashes-url]:    https://learn.microsoft.com/en-us/appcenter/sdk/crashes/android
[appcenter-analytics-url]:  https://learn.microsoft.com/en-us/appcenter/sdk/analytics/android
[firebase-fix-url]:         https://learn.microsoft.com/en-us/answers/questions/450181/android-firebase-crashlytics-build-id-is-missing.html
[appcenter-console-url]:    https://appcenter.ms/apps



