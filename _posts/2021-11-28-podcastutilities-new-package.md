---
layout: post
title: "New package for PodcastUtilities"
date: 2021-11-28 12:00:00
published: true
tags: [".Net", "PodcastUtilities", "Development"]
categories: [".Net", "PodcastUtilities", "Development"]
---

This month we have created two new packages for PodcastUtilities, a [package for PodcastUtilities on .NET Framework on Windows][pu-chocolatey] and a [cross platform package for PodcastUtilities on .NET Core][pucore-chocolatey]. 

[PodcastUtilities][code-url] is an application that enables complex local cache management for podcast feeds. Its available as a version for .NET Framework on Windows and also a cross platform version to run on Windows/Mac/Linux etc. The main difference between the two is that for syncing podcasts caches the .NET Framework versions supports MTP file systems, the cross platform version does not, for downloads the two versions are identical.

There never was an installer for PodcastUtilities so these new packages give an easy way to get it installed, the main advantages of the installer are

1. PodcastUtilities for .NET Framework uses .NET 3.5, on older versions of Windows (Vista, XP, 7) that was fine but on Windows 10 it insisted on installing.NET 3.5 instead of using .NET 4 which was already installed. PodcastUtilities can run using .NET 4 but needs a config file to stop the user being prompted to install .NET 3.5, the package contains the config file
1. The utility commands (DownloadPodcasts, SyncPodcasts, PurgePodcasts, GeneratePlaylist) are shimmed onto the path so they can be run from anywhere, the utility commands for the .NET Core version are called (DownloadPodcasts-core, SyncPodcasts-core, PurgePodcasts-core, GeneratePlaylist-core)
1. A link to the documentation is placed on the desktop.

## Installing Chocolatey on Windows 7

One thing that isn't completely obvious, as the [old TLS security was dropped by Chocolatey][chocolatey-tls] and Windows 7 was released before all this you need to make sure that Windows 7 can do TLS 1.2 from Powershell. The easiest way to do this is to install the [Windows Management Framework 5.1][wmf-51], which will upgrade Powershell as well.

## Running on .NET 3.5 or .NET 4

To get PodcastUtilities so that it would just run with the currently installed .NET Framework on Windows 7 and Windows 10 was a bit of a trick. I can across [this great article][config-setup] which explained how to setup the `.exe.config` file up. I wanted the app to use .NET 3.5 if it was available (on either Windows 7 or 10) and fallback to using .NET 4 if it was available. It turns out that the `.exe.config` file needed to be like this

{% highlight Xml linenos %}
<?xml version="1.0"?>
<configuration>
  <startup>
    <supportedRuntime version="v2.0.50727"/>
    <supportedRuntime version="v4.0"/>
  </startup>
  <runtime>
  </runtime>
</configuration>
{% endhighlight %}

## Installing PodcastUtilities

After installing chocolatey, to install the cross platform edition of PodcastUtilities run the command

```
choco install podcastutilities-core
```

At the time of writing the .NET framework version of the package had not been approved so to install the .NET Framework version you need this command

```
choco install podcastutilities --version 3.0.0.2
```

For most purposes you probably dont want or need to install both versions.

[chocolatey-url]:       https://chocolatey.org
[pu-chocolatey]:        https://community.chocolatey.org/packages/podcastutilities
[pucore-chocolatey]:    https://community.chocolatey.org/packages/podcastutilities-core
[code-url]:	      			https://github.com/derekwilson/PodcastUtilities
[chocolatey-tls]:       https://blog.chocolatey.org/2020/01/remove-support-for-old-tls-versions/
[wmf-51]:               https://www.microsoft.com/en-us/download/details.aspx?id=54616
[config-setup]:         https://www.codeproject.com/Articles/886256/NET-Versioning-and-Multi-targeting-on-Csharp-Appli