---
layout: post
title:  "Xamarin Android Part 1"
date:   2021-12-28 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "Mobile"]
---

# Xamarin Android for Android Developers

I've been aware of [Xamarin][xamarin-url] for quite a while, but given that I write my Android apps in AndroidStudio and Kotlin I've always ignored it. I think I always though of Xamarin as being another attempt at a cross platform UI, I have played around with these on and off over the last 30 years going all the way back to [Zinc][zinc-url], and I've never found any of them to be great experiences. It turns out there are two flavours of Xamarin for Android developers [Xamarin Forms][xamarin-forms-url] (soon to be called MAUI) is a cross platform UI, [Xamarin Android][xamarin-android-url] is a framework than enables running .NET code using [Mono][mono-url] on Android phones by providing wrappers and bridges to calling the OS and allows the regular XML layout files and assets to be used.

There is a lot of ground to cover so I've broken this up into a number of posts

* [Part 1][part-1-url]
  * [The Software](/blog/2021/12/28/xamarin-android-part1#the-software)
  * [The Developer](/blog/2021/12/28/xamarin-android-part1#the-developer)
  * [The Project](/blog/2021/12/28/xamarin-android-part1#the-project)
  * [Current Structure](/blog/2021/12/28/xamarin-android-part1#current-structure)
  * [The Target](/blog/2021/12/28/xamarin-android-part1#the-target)
* [Part 2][part-2-url]
  * [Create Application Project](/blog/2022/02/24/xamarin-android-part2#create-application-project)
  * [App icon and colour scheme](/blog/2022/02/24/xamarin-android-part2#app-icon-and-colour-scheme)
  * [App name and package name](/blog/2022/02/24/xamarin-android-part2#app-name-and-package-name)
  * [Update package references](/blog/2022/02/24/xamarin-android-part2#update-package-references)
  * [Putting it all together](/blog/2022/02/24/xamarin-android-part2#putting-it-all-together)
* [Part 3][part-3-url]
  * [Create AndroidLogic class library](/blog/2022/03/27/xamarin-android-part3#create-androidlogic-class-library)
  * [Adding development essentials](/blog/2022/03/27/xamarin-android-part3#adding-development-essentials)
  * [Creating a custom application](/blog/2022/03/27/xamarin-android-part3#creating-a-custom-application)
  * [Adding NLog](/blog/2022/03/27/xamarin-android-part3#adding-nlog)
  * [Adding dependency injection](/blog/2022/03/27/xamarin-android-part3#adding-dependency-injection)
  * [ViewModels](/blog/2022/03/27/xamarin-android-part3#viewmodels)
     * [The ViewModel](/blog/2022/03/27/xamarin-android-part3#the-viewmodel)
     * [The Activity](/blog/2022/03/27/xamarin-android-part3#the-activity)
     * [The ViewModelFactory](/blog/2022/03/27/xamarin-android-part3#the-viewmodelfactory)
     * [The Application](/blog/2022/03/27/xamarin-android-part3#the-application)
     * [Lifecycle](/blog/2022/03/27/xamarin-android-part3#lifecycle)
  * [Observable data](/blog/2022/03/27/xamarin-android-part3#observable-data)
    * [LiveData](/blog/2022/03/27/xamarin-android-part3#livedata)
    * [C# EventHandlers](/blog/2022/03/27/xamarin-android-part3#c-eventhandlers)
* [Part 4][part-4-url]
  * [Create the AndroidTest application](/blog/2022/04/27/xamarin-android-part4#create-the-androidtest-application)
  * [Running Unit Tests](/blog/2022/04/27/xamarin-android-part4#running-unit-tests)
    * [xUnit](/blog/2022/04/27/xamarin-android-part4#xunit)
    * [nUnit](/blog/2022/04/27/xamarin-android-part4#nunit)
  * [Mocking using FakeItEasy](/blog/2022/04/27/xamarin-android-part4#mocking-using-fakeiteasy)
  * [Viewmodel tests using LiveData](/blog/2022/04/27/xamarin-android-part4#viewmodel-tests-using-livedata)
  * [Viewmodel tests using C# EventHandlers](/blog/2022/04/27/xamarin-android-part4#viewmodel-tests-using-c-eventhandlers)
  * [Putting it all together](/blog/2022/04/27/xamarin-android-part4#putting-it-all-together)
* [Part 5][part-5-url]
  * [Odds and Ends](/blog/2022/06/30/xamarin-android-part5#odds-and-ends)
    * [Signing](/blog/2022/06/30/xamarin-android-part5#signing)
    * [Package names](/blog/2022/06/30/xamarin-android-part5#package-names)
    * [Logging](/blog/2022/06/30/xamarin-android-part5#logging)
  * [Publishing](/blog/2022/06/30/xamarin-android-part5#publishing)
    * [Publishing an AAB](/blog/2022/06/30/xamarin-android-part5#publishing-an-aab)
    * [Publishing an APK](/blog/2022/06/30/xamarin-android-part5#publishing-an-apk)
* [Part 6][part-6-url]
  * [Click Handers in Recyclerviews](/blog/2022/08/30/xamarin-android-part6#click-handers-in-recyclerviews)

## The Software

[PodcastUtilities][podcastutilities-url] is a .NET Framework podcast cache manager. It is designed to have a minimal UI or be used as a headless API. It is old code, most of it was written over 10 years ago, the only significant development done recently has been [make the main projects multi-platform][podcastutilities-cross-url] so that they target .NET Framework and .NET Core/.NET Standard. Using .NET Core enabled Podcast Utilities to be run on Mac, Windows and Linux. It was fun to see it running on a Raspberry PI 1 using Mono but that was where it was left except for minor maintenance releases to code with TLS changes. 

Its still used extensively to download and manage a podcast cache on a server, then the podcasts can be played from there or synced to a phone.

## The Developer

I worked as a .NET developer for 15 years, on both desktop and web, using [WPF][wpf-url], [WinForms][winforms-url], [WebForms][webforms-url] and [MVC][mvc-url]. For the last 7 years I have worked as an Android developer using Java, [Kotlin][kotlin-url] and [AndroidX][androidx-url]. In other words I have experience of the pretty standard toolchain on both platforms. 

I pretty much stopped using .NET around the time .NET Core was really getting started. This meant that I didn't really understand about [Xamarin Android][xamarin-android-url] and didn't really take [Mono][mono-url] seriously.

## The Project

When I looked into Xamarin Android and saw that it was a wrapper for .NET code using Mono as a runner and I thought about the work we had done to get PodcastUtilities API compiled as a [.NET Standard DLL][netstandard-url] it made me think that most of the heavy lifting has been done and surely that this would be a good test to see if the toolchain could be taken seriously. 

The app was sufficiently complex and big that not having to write it again on Android would be a real time saver. Phones now have more storage available, 50GB+ is not uncommon, they certainly have enough storage to keep a cache locally. Running the utilities on the phone and downloading directly, rather than download to a server and syncing by the increasingly forgotten MTP protocol was also attractive.

### Current Structure

The current structure of [PodcastUtilities as distributed on chocolatey][podcastutilities-package-url] can be illustrated by this diagram

{% include widgets/image.html src='/images/jekyll/2021-12-01/podcastutilities1.png' width='583' height='211' title='Desktop Structure' %}

There are four main utilities, DownloadPodcasts, SyncPodcasts, GeneratePlaylist and PurgePodcasts. They all read their configuration from an XML file and make use of all the logic in `PodcastUtilities.Common`. The raw objects in this assembly can be used directly however its much more usual to access then via `PodcastUtilities.Ioc`. Although the boxes on the diagram are the same size the bulk of the code is in `PodcastUtilities.Common`, `PodcastUtilities.Ioc` is an access layer and the console apps read the config, call the heavy lifters in `PodcastUtilities.Common` and channel the output to the console.

For example the object that finds episodes in a feed is in `PodcastUtilities.Common` and looks like this

{% highlight C# linenos %}
/// <summary>
/// discover items to be downloaded from a feed
/// </summary>
public class EpisodeFinder : IEpisodeFinder
{
    private readonly IDirectoryInfoProvider _directoryInfoProvider;
    private readonly IFileUtilities _fileUtilities;
    private readonly IPodcastFeedFactory _feedFactory;
    private readonly IWebClientFactory _webClientFactory;
    private readonly ITimeProvider _timeProvider;
    private readonly IStateProvider _stateProvider;
    private readonly ICommandGenerator _commandGenerator;

    /// <summary>
    /// discover items to be downloaded from a feed
    /// </summary>
    public EpisodeFinder(
        IFileUtilities fileFinder, 
        IPodcastFeedFactory feedFactory, 
        IWebClientFactory webClientFactory, 
        ITimeProvider timeProvider, 
        IStateProvider stateProvider, 
        IDirectoryInfoProvider directoryInfoProvider, 
        ICommandGenerator commandGenerator)
    {
        _fileUtilities = fileFinder;
        _commandGenerator = commandGenerator;
        _directoryInfoProvider = directoryInfoProvider;
        _stateProvider = stateProvider;
        _timeProvider = timeProvider;
        _webClientFactory = webClientFactory;
        _feedFactory = feedFactory;
    }
{% endhighlight %}

This object could be instantiated by a client directly or by making use of the objects in `PodcastUtilities.Ioc` like this

{% highlight C# linenos %}
class Program
{
    private static IIocContainer _iocContainer;
    private static ReadOnlyControlFile _control;

    private static IIocContainer InitializeIocContainer()
    {
        var container = IocRegistration.GetEmptyContainer();

        IocRegistration.RegisterSystemServices(container);
        IocRegistration.RegisterPortableDeviceServices(container);
        IocRegistration.RegisterFileServices(container);
        IocRegistration.RegisterFeedServices(container);

        return container;
    }

    static void Main(string[] args)
    {
        _control = new ReadOnlyControlFile(args[0]);
        _iocContainer = InitializeIocContainer();
        var podcastEpisodeFinder = _iocContainer.Resolve<IEpisodeFinder>();
        foreach (var podcastInfo in _control.GetPodcasts())
        {
            var episodesInThisFeed = podcastEpisodeFinder.FindEpisodesToDownload(
                _control.GetSourceRoot(), 
                _control.GetRetryWaitInSeconds(), 
                podcastInfo, 
                _control.GetDiagnosticRetainTemporaryFiles());
            allEpisodes.AddRange(episodesInThisFeed);
        }
{% endhighlight %}

It might seem cumbersome to setup but once it is setup then the IoC container will wire up all dependencies and the dependent dependencies and so on.

By using IoC via an interface rather than referencing a concrete implementation enables us to replace the container if needed. The interface looks like this

{% highlight C# linenos %}
namespace PodcastUtilities.Common
{
    /// <summary>
    /// supports the ability to register objects in an IoC container
    /// </summary>
    public interface IIocContainer
    {
        /// <summary>
        /// register a service
        /// </summary>
        /// <typeparam name="TService">the service to be registered, usually an interface</typeparam>
        /// <typeparam name="TImplementor">the concrete implementation</typeparam>
        void Register<TService, TImplementor>()
            where TService : class
            where TImplementor : class, TService;

        /// <summary>
        /// register a service
        /// </summary>
        /// <typeparam name="TService">the service to be registered, usually an interface</typeparam>
        /// <typeparam name="TImplementor">the concrete implementation</typeparam>
        /// <param name="lifecycle">The lifecycle of the registered implementation</param>
        void Register<TService, TImplementor>(IocLifecycle lifecycle)
            where TService : class
            where TImplementor : class, TService;

        ///<summary>
        /// Register a type as both the service type and implementing type.
        ///</summary>
        ///<param name="serviceTypeToRegisterAsSelf">The service/implementing type to register</param>
        void Register(Type serviceTypeToRegisterAsSelf);

        ///<summary>
        /// Register an instance as a service.
        ///</summary>
        ///<param name="instance">The service/implementing instance to register</param>
        void Register<TService>(TService instance) where TService : class;

        ///<summary>
        /// Resolve a service
        ///</summary>
        ///<typeparam name="TService"></typeparam>
        ///<returns></returns>
        TService Resolve<TService>();
    }
{% endhighlight %}

Again this might seem like overkill but when we wrote PodcastUtilities we used .NET Framework and one of the leading IoC Containers, [LinFu][linfu-url]. Ten years later and LinFu is no longer in active development and we needed a different IoC container for .NET core, [Microsoft.Extensions][msextensions-url]. The code that makes use of `PodcastUtilities.Ioc` does not need to know which container is being used.

### The Target

The idea is that we can run [PodcastUtilities][podcastutilities-url] on an android phone, they have the capacity these days, and it will also to avoid having to sync files from a local server cache.

After some trial and error with getting the hang of how the tooling worked the structure I ended up with was this.

{% include widgets/image.html src='/images/jekyll/2021-12-01/podcastutilities2.png' width='612' height='285' title='Android Structure' %}

`PodcastUtilities.Common` and `PodcastUtilities.Ioc` are exactly the same DLLs that are distributed for the desktop console apps. At the moment they are produced using Visual Studio 2017, they could be updated to a later version but that is a separate task. I would be using Visual Studio 2019 for the android app as it included more up to date components and was also pretty stable.

I the manner of modern android apps the UI components, activities, views and fragments would be relativity simple using IoC to provide a ViewModel for the logic. The UI components went in the main app, the ViewModels and supporting logic went in an AndroidLogic DLL which could then be referenced by the tests. In "real" android instrumentation tests the tests just reference the main app directly however received wisdom is that [having test runner apps reference you main app][xamarin-tests1-url] was not a great plan in Xamarin Android, also see [this answer][xamarin-tests2-url] on Stackoverflow, so I created a common shared assembly as it doesnt really make much difference to the build.

I was expecting to fall into a number of traps along the way, in fact I think I suspected I would find things that made the whole idea a non-starter.

Next time I'll start to dig into the steps I took and traps I fell into.

[zinc-url]:                 https://en.wikipedia.org/wiki/Zinc_Application_Framework
[xamarin-url]:              https://dotnet.microsoft.com/en-us/apps/xamarin
[xamarin-forms-url]:        https://dotnet.microsoft.com/en-us/apps/xamarin/xamarin-forms
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
[mono-url]:                 https://www.mono-project.com
[podcastutilities-url]:     https://github.com/derekwilson/PodcastUtilities
[podcastutilities-cross-url]:   /blog/2019/04/26/dotnet-multiplatform
[podcastutilities-package-url]: /blog/2021/11/28/podcastutilities-new-package
[xamarin-tests1-url]:           https://social.msdn.microsoft.com/Forums/en-US/c913d278-5967-4945-98bd-236aac7453ec/unit-testing-with-android-unit-test-project-in-xamarinforms?forum=xamarinforms
[xamarin-tests2-url]:           https://stackoverflow.com/questions/41953284/xamarin-unit-test-app-android-defining-usage
[wpf-url]:                  https://docs.microsoft.com/en-us/visualstudio/designers/getting-started-with-wpf?view=vs-2022
[winforms-url]:             https://docs.microsoft.com/en-us/dotnet/desktop/winforms/overview/?view=netdesktop-6.0
[webforms-url]:             https://docs.microsoft.com/en-us/aspnet/web-forms/what-is-web-forms
[mvc-url]:                  https://dotnet.microsoft.com/en-us/apps/aspnet/mvc
[kotlin-url]:               https://kotlinlang.org
[androidx-url]:             https://developer.android.com/jetpack/androidx
[netstandard-url]:          https://docs.microsoft.com/en-us/dotnet/standard/net-standard
[linfu-url]:                https://github.com/philiplaureano/LinFu
[msextensions-url]:         https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection-usage


[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[part-2-url]:               /blog/2022/02/24/xamarin-android-part2
[part-3-url]:               /blog/2022/03/27/xamarin-android-part3
[part-4-url]:				/blog/2022/04/27/xamarin-android-part4
[part-5-url]:				/blog/2022/06/30/xamarin-android-part5
[part-6-url]:				/blog/2022/08/30/xamarin-android-part6
