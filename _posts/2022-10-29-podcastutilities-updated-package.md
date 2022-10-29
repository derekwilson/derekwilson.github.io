---
layout: post
title: "Updated package for PodcastUtilities"
date: 2022-10-29 12:00:00
published: true
tags: [".Net", "PodcastUtilities", "Development"]
categories: [".Net", "PodcastUtilities", "Development"]
---

[PodcastUtilities][code-url] is an application that enables complex local cache management for podcast feeds. Its available as a version for .NET Framework on Windows and also a cross platform version to run on Windows/Mac/Linux etc. The main difference between the two is that for syncing podcasts caches the .NET Framework versions supports MTP file systems, the cross platform version does not, for downloads the two versions are identical. [Last year we released PodcastUtilities][previous-post-url] on [Chocolatey][chocolatey-url]. 

[Last month we published a version of PodcastUtilities for Android][android-post-url] phones and made it [available through the Amazon App Store][pu-amazon-url]. To do this we needed to make some [minor changes][pu-changelog-url] to the core PodcastUtilities and also fix a few bugs.

This month we have updated both packages for PodcastUtilities, the [package for PodcastUtilities on .NET Framework on Windows][pu-chocolatey] and the [cross platform package for PodcastUtilities on .NET Core][pucore-chocolatey] to include the [changes][pu-changelog-url] that were made for the Android version.


## Installing PodcastUtilities v3.0.2.7

After installing chocolatey, to install the cross platform edition of PodcastUtilities run the command

```
choco install podcastutilities-core
```

After installing chocolatey, to install the .NET framework version of PodcastUtilities run the command

```
choco install podcastutilities
```

For most purposes you probably dont want or need to install both versions.

[chocolatey-url]:               https://chocolatey.org
[pu-chocolatey]:                https://community.chocolatey.org/packages/podcastutilities
[pucore-chocolatey]:            https://community.chocolatey.org/packages/podcastutilities-core
[code-url]:	      			    https://github.com/derekwilson/PodcastUtilities
[pu-amazon-url]:                https://www.amazon.com/dp/B0BG7SZJTL/
[amazon-appstore]:              https://www.amazon.com/gp/mas/get-appstore/android
[previous-post-url]:            /blog/2021/11/28/podcastutilities-new-package
[android-post-url]:             /blog/2022/09/30/podcastutilities-on-amazon
[pu-changelog-url]:             https://github.com/derekwilson/PodcastUtilities/blob/master/_PreBuiltPackages/CHANGELOG.md
