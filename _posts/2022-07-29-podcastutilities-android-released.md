---
layout: post
title: "PodcastUtilities for Android released"
date: 2022-07-29 12:00:00
published: true
tags: [".Net", "PodcastUtilities", "Development", "Android", "Mobile"]
categories: [".Net", "PodcastUtilities", "Development", "Android", "Mobile"]
---

This month we have released a new version of PodcastUtilities, [PodcastUtilities for Android][apk-url].

This version takes advantage of the work we did porting `PodcastUtilities.Common` to be [.NET Core/.NET Standard][net-platform-url]. Using the .NET Standard assembly we can then make use of [Xamarin Android][xamarin-android-url] to provide exactly the same logic as the desktop versions of PodcastUtilities,  [PodcastUtilities on .NET Framework on Windows][pu-chocolatey] or [cross platform package for PodcastUtilities on .NET Core][pucore-chocolatey], on Android devices. The process we used to produce the Android application has been documented in a [separate series of posts][part-1-url].

We did attempt to distribute it via the Google Play Store however as we needed `Manage Storage` permission and Google declined saying "The feature you identified that is dependent on this permission does not appear to be critical to the core functionality of your app". This was disappointing but rather than arguing the toss with a Google-bot we decided to sideload the APK.


[apk-url]:					https://github.com/derekwilson/PodcastUtilities/tree/master/Android/Support/_PreBuiltPackages
[part-1-url]:               /blog/2021/12/28/xamarin-android-part1
[port-url]:					/blog/2019/04/26/dotnet-multiplatform
[net-platform-url]:  		https://msdn.microsoft.com/en-us/magazine/mt842506.aspx
[xamarin-android-url]:      https://docs.microsoft.com/en-us/xamarin/android/
[pu-chocolatey]:        https://community.chocolatey.org/packages/podcastutilities
[pucore-chocolatey]:    https://community.chocolatey.org/packages/podcastutilities-core



