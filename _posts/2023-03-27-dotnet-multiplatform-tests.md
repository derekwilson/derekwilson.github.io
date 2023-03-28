---
layout: post
title: "Multiplatform test projects on .NET Core and .NET Framework"
date: 2023-03-27 12:00:00
published: true
tags: ["Development", "General", "PodcastUtilities", ".Net"]
categories: ["Development", "General", "PodcastUtilities", ".Net"]
---

Previously I wrote about [porting PodcastUtilities to .NETCore][previous-post-url], that is, producing a DLL project that can build multiple platform targets, one for the cross platform [.NET Standard][net-platform-url] and one for the Windows only .NET Framework. At the time we understood that we had incurred some tech debit, in that the tests still only ran on .NET Framework due to their use of [RhinoMocks][rhino-url]. RhinoMocks is [no longer maintained and does not support .NETCore][rhino-on-core-url].

When I wrote the previous post I was using VS2017 which would not run any of the tests that targetted .NETFramework 3.5, I had to use the stand-alone NUnit runner. Now with VS2022 the picture is better as VS will run the old .NETFramework tests. However we would like to be able to run the tests for `PodcastUtilities.Common.DLL` on .NETFramework as well as .NETCore, after all the assembly can target both platforms.

So, over the last month we have taken the existing old RhinoMock tests in `PodcastUtilities.Common.Tests` and produced a new `PodcastUtilities.Common.Multiplatform.Tests` which has all the original unit tests that can be run on .NETCore and .NETFramework.

## The Mocking Framework

Obviously I did what most people do and selected the [best known mocking framework][mocking-libs-url]. Also it must be said I have used [Moq][moq-url] in the past. Moq supports both .NETFramework (oldest version 4.6.2) as well as .NETCore (the oldest version I could get to run in VS2022 was 3.1)

## Porting RhinoMocks to Moq

There were approximately 500 tests to migrate. It was pretty straightforward, some tests made little use of mocks and most of the rest were ported like this

### RhinoMock Test

As an example this is a test written using RhinoMocks

{% highlight c# linenos %}
[TestFixture]
public abstract class WhenTestingBehaviour
{
  /// <summary>
  /// Seal the method so it can not be overriden. We want all _context to be
  /// set in the <see cref="GivenThat" /> method.
  /// </summary>
  [SetUp]
  public void SetUp()
  {
    GivenThat();

    When();
  }

  /// <summary>
  /// Set up the _context of the test.
  /// </summary>
  protected virtual void GivenThat()
  {
  }

  /// <summary>
  /// Invoke the action being tested.
  /// </summary>
  protected abstract void When();

  protected TM GenerateMock<TM>()
    where TM : class
  {
    return MockRepository.GenerateMock<TM>();
  }
}

public abstract class WhenTestingTheDownloader : WhenTestingBehaviour
{
  protected Downloader FeedDownloader { get; set; }
  protected IWebClient WebClient { get; set; }
  protected IPodcastFeedFactory FeedFactory { get; set; }
  protected Uri Address { get; set; }

  protected IPodcastFeed Feed { get; set; }
  protected Stream StreamData { get; set; }

  protected override void GivenThat()
  {
    base.GivenThat();

    Address = new Uri("http://localhost/fred");
    WebClient = GenerateMock<IWebClient>();
    FeedFactory = GenerateMock<IPodcastFeedFactory>();
    FeedDownloader = new Downloader(WebClient,FeedFactory);

    StreamData = new MemoryStream();

    WebClient.Stub(client => client.OpenRead(Address)).Return(StreamData);
  }
}

public class WhenTestingTheDownloaderInRss : WhenTestingTheDownloader
{
  protected override void When()
  {
    Feed = FeedDownloader.DownloadFeed(PodcastFeedFormat.RSS,Address, null);
  }

  [Test]
  public void ItShouldDownloadTheFeed()
  {
    WebClient.AssertWasCalled(c => c.OpenRead(Address));
  }

  [Test]
  public void ItShouldReturnAFeed()
  {
    FeedFactory.AssertWasCalled(f => f.CreatePodcastFeed(PodcastFeedFormat.RSS, StreamData, null));
  }
}
{% endhighlight %}

### Moq Test

As you can see converting it to Moq is really just about translating syntax the meaning of the test is the same.

{% highlight c# linenos %}
public abstract class WhenTestingBehaviour
{
  /// <summary>
  /// Seal the method so it can not be overriden. We want all context to be
  /// set in the <see cref="GivenThat" /> method.
  /// </summary>
  [SetUp]
  public void Setup()
  {
      GivenThat();

      When();
  }

  /// <summary>
  /// Set up the context of the test.
  /// </summary>
  protected virtual void GivenThat()
  {
  }

  /// <summary>
  /// Invoke the action being tested.
  /// </summary>
  protected abstract void When();

  protected Mock<MOCKTYPE> GenerateMock<MOCKTYPE>()
      where MOCKTYPE : class
  {
    return new Mock<MOCKTYPE>(MockBehavior.Loose);
  }

  protected Mock<MOCKTYPE> GenerateStrictMock<MOCKTYPE>()
      where MOCKTYPE : class
  {
    return new Mock<MOCKTYPE>(MockBehavior.Strict);
  }
}

public abstract class WhenTestingTheDownloader : WhenTestingBehaviour
{
  protected Downloader FeedDownloader { get; set; }
  protected Mock<IWebClient> WebClient { get; set; }
  protected Mock<IPodcastFeedFactory> FeedFactory { get; set; }
  protected Uri Address { get; set; }

  protected IPodcastFeed Feed { get; set; }
  protected Stream StreamData { get; set; }

  protected override void GivenThat()
  {
    base.GivenThat();

    Address = new Uri("http://localhost/fred");
    WebClient = GenerateMock<IWebClient>();
    FeedFactory = GenerateMock<IPodcastFeedFactory>();
    FeedDownloader = new Downloader(WebClient.Object, FeedFactory.Object);

    StreamData = new MemoryStream();

    WebClient.Setup(client => client.OpenRead(Address)).Returns(StreamData);
  }
}

public class WhenTestingTheDownloaderInRss : WhenTestingTheDownloader
{
  protected override void When()
  {
    Feed = FeedDownloader.DownloadFeed(PodcastFeedFormat.RSS, Address, null);
  }

  [Test]
  public void ItShouldDownloadTheFeed()
  {
    WebClient.Verify(c => c.OpenRead(Address));
  }

  [Test]
  public void ItShouldReturnAFeed()
  {
    FeedFactory.Verify(f => f.CreatePodcastFeed(PodcastFeedFormat.RSS, StreamData, null));
  }
}
{% endhighlight %}

### A more complex RhinoMock Test

There were a few complex tests, for example this one needed to ensure that the calls happened in a specific order

{% highlight c# linenos %}
public class WhenThereAreSomePodcastsContainingFilesNeedingSorting : WhenTestingThePlaylistGenerator
{
  protected MockRepository mocks = new MockRepository();

  protected override void GivenThat()
  {
    Playlist = mocks.DynamicMock<IPlaylist>();

    base.GivenThat();

    Podcasts.Clear();
    Podcasts.Add(new PodcastInfo(ControlFile) { Folder = "Hanselminutes" });
    Podcasts.Add(new PodcastInfo(ControlFile) { Folder = "This Developers Life" });
    Podcasts[0].Pattern.Value = "*.mp3";
    Podcasts[1].Pattern.Value = "*.wma";

    var podcastFiles1 = new List<IFileInfo> {GenerateMock<IFileInfo>(), GenerateMock<IFileInfo>()};
    podcastFiles1[0].Stub(f => f.FullName).Return(@"c:\destination\Hanselminutes\001.mp3");
    podcastFiles1[1].Stub(f => f.FullName).Return(@"c:\destination\Hanselminutes\002.mp3");

    var podcastFiles2 = new List<IFileInfo> {GenerateMock<IFileInfo>(), GenerateMock<IFileInfo>(), GenerateMock<IFileInfo>()};
    // add them so they need sorting
    podcastFiles2[0].Stub(f => f.FullName).Return(@"c:\destination\This Developers Life\997.wma");
    podcastFiles2[1].Stub(f => f.FullName).Return(@"c:\destination\This Developers Life\999.wma");
    podcastFiles2[2].Stub(f => f.FullName).Return(@"c:\destination\This Developers Life\998.wma");

    Finder.Stub(f => f.GetFiles(@"c:\destination\Hanselminutes", "*.mp3"))
      .Return(podcastFiles1);

    Finder.Stub(f => f.GetFiles(@"c:\destination\This Developers Life", "*.wma"))
      .Return(podcastFiles2);

    using (mocks.Ordered())
    {
      Playlist.Expect(x => x.AddTrack(@".||Hanselminutes||001.mp3")).Return(true);
      Playlist.Expect(x => x.AddTrack(@".||Hanselminutes||002.mp3")).Return(true);
      Playlist.Expect(x => x.AddTrack(@".||This Developers Life||997.wma")).Return(true);
      Playlist.Expect(x => x.AddTrack(@".||This Developers Life||998.wma")).Return(true);
      Playlist.Expect(x => x.AddTrack(@".||This Developers Life||999.wma")).Return(true);
    }
    Playlist.Replay();
  }

  protected override void When()
  {
    PlaylistGenerator.GeneratePlaylist(ControlFile,false);
  }

  [Test]
  public void ItShouldAddAllTheTracksForEachPodcastInTheCorrectOrder()
  {
    Playlist.VerifyAllExpectations();
  }
}
{% endhighlight %}

### A more complex Moq Test

The syntax changes for this change were more divergent but the meaning is still recognisable

{% highlight c# linenos %}
public class WhenThereAreSomePodcastsContainingFilesNeedingSorting : WhenTestingThePlaylistGenerator
{
  protected Mock<IPlaylist> StrictPlaylist { get; set; }

  protected Mock<IFileInfo> _file1;
  protected Mock<IFileInfo> _file2;
  protected Mock<IFileInfo> _file3;
  protected Mock<IFileInfo> _file4;
  protected Mock<IFileInfo> _file5;

  protected override void GivenThat()
  {
    base.GivenThat();

    StrictPlaylist = GenerateStrictMock<IPlaylist>();
    Factory.Setup(factory => factory.CreatePlaylist(It.IsAny<PlaylistFormat>(), It.IsAny<string>()))
        .Returns(StrictPlaylist.Object);

    Podcasts.Clear();
    Podcasts.Add(new PodcastInfo(ControlFile.Object) { Folder = "Hanselminutes" });
    Podcasts.Add(new PodcastInfo(ControlFile.Object) { Folder = "This Developers Life" });
    Podcasts[0].Pattern.Value = "*.mp3";
    Podcasts[1].Pattern.Value = "*.wma";

    _file1 = GenerateMock<IFileInfo>();
    _file2 = GenerateMock<IFileInfo>();
    _file3 = GenerateMock<IFileInfo>();
    _file4 = GenerateMock<IFileInfo>();
    _file5 = GenerateMock<IFileInfo>();

    var podcastFiles1 = new List<IFileInfo> { _file1.Object, _file2.Object };
    _file1.Setup(f => f.FullName).Returns(@"c:\destination\Hanselminutes\001.mp3");
    _file2.Setup(f => f.FullName).Returns(@"c:\destination\Hanselminutes\002.mp3");

    // add them so they need sorting
    var podcastFiles2 = new List<IFileInfo> { _file3.Object, _file4.Object, _file5.Object };
    _file3.Setup(f => f.FullName).Returns(@"c:\destination\This Developers Life\997.wma");
    _file4.Setup(f => f.FullName).Returns(@"c:\destination\This Developers Life\999.wma");
    _file5.Setup(f => f.FullName).Returns(@"c:\destination\This Developers Life\998.wma");

    Finder.Setup(f => f.GetFiles(@"c:\destination\Hanselminutes", "*.mp3"))
      .Returns(podcastFiles1);

    Finder.Setup(f => f.GetFiles(@"c:\destination\This Developers Life", "*.wma"))
      .Returns(podcastFiles2);

    var sequence = new MockSequence();
    // Create the expectations, notice that the Setup is called via InSequence
    StrictPlaylist.InSequence(sequence).Setup(p => p.AddTrack(@".||Hanselminutes||001.mp3")).Returns(true);
    StrictPlaylist.InSequence(sequence).Setup(p => p.AddTrack(@".||Hanselminutes||002.mp3")).Returns(true);
    StrictPlaylist.InSequence(sequence).Setup(p => p.AddTrack(@".||This Developers Life||997.wma")).Returns(true);
    StrictPlaylist.InSequence(sequence).Setup(p => p.AddTrack(@".||This Developers Life||998.wma")).Returns(true);
    StrictPlaylist.InSequence(sequence).Setup(p => p.AddTrack(@".||This Developers Life||999.wma")).Returns(true);

    StrictPlaylist.SetupGet(p => p.NumberOfTracks).Returns(5);
    StrictPlaylist.Setup(p => p.SaveFile(@"c:\file.tmp"));
  }

  protected override void When()
  {
    PlaylistGenerator.GeneratePlaylist(ControlFile.Object, false);
  }

  [Test]
  public void ItShouldAddAllTheTracksForEachPodcastInTheCorrectOrder()
  {
    // the verification order does not matter - its the setup order that counts
    StrictPlaylist.Verify(p => p.AddTrack(@".||Hanselminutes||001.mp3"), Times.Once());
    StrictPlaylist.Verify(p => p.AddTrack(@".||Hanselminutes||002.mp3"), Times.Once());
    StrictPlaylist.Verify(p => p.AddTrack(@".||This Developers Life||997.wma"), Times.Once());
    StrictPlaylist.Verify(p => p.AddTrack(@".||This Developers Life||998.wma"), Times.Once());
    StrictPlaylist.Verify(p => p.AddTrack(@".||This Developers Life||999.wma"), Times.Once());
  }
}
{% endhighlight %}


## Multiple targets in the test assembly project

`PodcastUtilities.Common.DLL`, the assembly under test, is slightly different when built for .NETFramework. .NETFramework supports MTP via P/Invoke whereas the .NETCore build does not. This means that there are between 20 and 30 extra tests for the .NETFramework version. We would like those tests to be run when the tests are run on .NETFramework.

Initially I created a test assembly in VS2022 that targetted .NETCore. To convert it to target both .NETCore and .NETFramework the `.csproj` file was changed like this

Change

```
<TargetFramework>netcoreapp3.1</TargetFramework>
```

to be

```
<TargetFrameworks>net462;netcoreapp3.1</TargetFrameworks>
```

There may be a way of doing this in UI but I just edited the `.csproj` file.

We also added the following section into the `.csproj` file.

{% highlight xml linenos %}
  <!-- .NET Core 3.1 references, compilation flags and build options -->
  <PropertyGroup Condition=" '$(TargetFramework)' == 'netcoreapp3.1'">
    <DefineConstants>NETCORE;NETCORE3_1</DefineConstants>
  </PropertyGroup>

  <ItemGroup Condition=" '$(TargetFramework)' == 'netcoreapp3.1'">
    <Compile Remove=".\Platform\FileSystemAwareFileUtilitiesTests\**\*.cs" Label="NO_MTP" />
    <Compile Remove=".\Platform\MtpTests\**\*.cs" Label="NO_MTP" />
  </ItemGroup>

  <!-- .NET references, compilation flags and build options -->
  <PropertyGroup Condition=" '$(TargetFramework)' == 'net462'">
    <DefineConstants>NET462;NETFULL</DefineConstants>
  </PropertyGroup>
{% endhighlight %}

In the .NETCore target we remove all the tests from the `FileSystemAwareFileUtilitiesTests` and the `MtpTests` folders, as those tests cannot be run (or even compiled) on that platform as they are MTP tests.

By adding the `DefineConstants` we can write code for a specific platform in C# like this

{% highlight c# linenos %}
#if NETFULL
  CodeThatCanOnlyRunOnWindowsDotNetFramework()
#endif
{% endhighlight %}

You can see the complete code for the project including the tests [in Github][code-url]

[previous-post-url]:    /blog/2019/04/26/dotnet-multiplatform
[download-url]:         https://github.com/derekwilson/PodcastUtilities/tree/master/_PreBuiltPackages
[code-url]:				      https://github.com/derekwilson/PodcastUtilities
[net-platform-url]:     https://msdn.microsoft.com/en-us/magazine/mt842506.aspx
[rhino-url]:            https://github.com/ayende/rhino-mocks
[rhino-on-core-url]:    https://blog.ladeak.net/posts/rhinomocks-updater
[moq-url]:              https://github.com/moq/moq4
[mocking-libs-url]:     https://www.danclarke.com/comparing-dotnet-mocking-libraries

