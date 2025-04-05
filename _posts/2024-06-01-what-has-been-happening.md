---
layout: post
title: "What has been happening?"
date: 2024-06-01 12:00:00
published: true
tags: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "RamEater", "Trailblazer", "Wrist-spin", "Mobile"]
categories: ["Xamarin", "Development", "Android", ".Net", "PodcastUtilities", "RamEater", "Trailblazer", "Wrist-spin", "Mobile"]
---

[I retired][previous-post-1-url] just over a year ago. I did say I would not be posting as often and it turns out I was right. I have still been doing some work on my projects so I though I would post a quick status update

## PodcastUtilities for Android

[PodcastUtilities for Android][podcastutilities-amazon] has developed into a pretty fully functional app now with the addition of the ability to configure the app rather than having to edit an XML file.

- Reworked the UI for adding a new feed to lookup the URL from the clipboard and the title from the feed
- Added ability to share a podcast RSS feed URL
- Added ability to modify the configuration from within the app
- Added ability to share the current control file off the device
- Added support for dark mode
- Accessibility fixes: Text scaling on toolbar and colour contrast
- Added keyboard support
- Made available for Windows Subsystem for Android

{% include widgets/image.html src='/images/jekyll/2024-06-01/pu1.png' width='150' height='300' title='PodcastUtilities1' %}
{% include widgets/image.html src='/images/jekyll/2024-06-01/pu2.png' width='150' height='300' title='PodcastUtilities2' %}
{% include widgets/image.html src='/images/jekyll/2024-06-01/pu3.png' width='150' height='300' title='PodcastUtilities3' %}

## PodcastUtilities for Windows/Linux and Mac

For the desktop version of PodcastUtilities I've updated the chocolatey packages for the [Windows only][pu-chocolatey] version and the [cross platform version][pucore-chocolatey]. The main change was to upgrade the target from .NET Core 2.1 to .NET Core 3.1. This is because there were security vulnerability warnings with .NET Core 2.1 and as its out of support I needed to update.

- updated .NET Core CLI tools to target .NET Core 3.1 rather than 2.1 (2.1 has security warnings that are not going to be patched)
- Improved processing of episodes with '.' in the title when used as a filename
- Expose and log the inner exception when returning errors from IEpisodeFinder and ICopier

## Trailblazer

I did a bit of a road trip with [Trailblazer][trailblazer-play] and found a few minor glitches that were impacting how it can be used so we have smoothed over those rough edges.

- Added ability to combine tracks, by multiselecting them
- Added the display of segment information to the statistics page
- Added support for dark mode
- Track list is now searchable
- Track recording will continue even if the app is restarted by the OS
- Importing tracks without timestamp data (eg. MyMaps) is now supported
- Fixed an out of memory issue when comparing large tracks
- Fixed issue with importing KML tracks from Google Earth

## RamEater

I dont tend to do much work on [RamEater][rameater-play] as its pretty complete but I did fix a minor issue with notifications permissions on Android 13. I am not looking forward to the additional restrictions imposed by Google with the forced update to Android 14, I am glad the app is also available on the [Amazon App Store][rameater-amazon]

## wrist-spin for Android

Almost a decade ago I produced wrist-spin a [cricket scoring app for Pebble watches][wrist-spin-pebble]. When that platform [came to and end][previous-post-2-url] I ported the app to Fitbit watches. Because of issues with [the way the watches talk to the internet][previous-post-3-url] I needed to use an Azure function proxy, which meant it ran through my Azure account so I was unwilling to put the app on the Fitbit app store. Now that Fitbit (or Google) have decided that [developers will not be allowed to develop apps for the newer Fitbit watches][fitbit-remove-apps] it looks as though that platform is also coming to an end.

I decided to port the app again, from javascript to Android Kotlin/Java with a view to running the app on android phones and maybe [WearOS][wear-os-url] watches. It was fun and now I have released [wrist-spin for Android phones][wrist-spin-amazon]. I originally produced wrist-spin for wearables as I wanted a low friction method of keeping up to date with the score and the main drive behind the port was to target [WearOS][wear-os-url]. However having produced the phone app I find that having the score on my lock screen or spoken using Text To Speech to work surprisingly well.

{% include widgets/image.html src='/images/jekyll/2024-06-01/wrist-spin1.png' width='150' height='300' title='wrist-spin1' %}
{% include widgets/image.html src='/images/jekyll/2024-06-01/wrist-spin2.png' width='150' height='300' title='wrist-spin2' %}
{% include widgets/image.html src='/images/jekyll/2024-06-01/wrist-spin3.png' width='150' height='300' title='wrist-spin3' %}
{% include widgets/image.html src='/images/jekyll/2024-06-01/wrist-spin4.png' width='150' height='300' title='wrist-spin4' %}


[previous-post-1-url]:  /blog/2023/05/04/end-of-an-era
[previous-post-2-url]:  /blog/2018/07/27/rebble-alliance
[previous-post-3-url]:  /blog/2019/08/27/fitbit-versa
[podcastutilities-amazon]:      https://www.amazon.com/dp/B0BG7SZJTL/
[trailblazer-play]:     https://play.google.com/store/apps/details?id=com.andrewandderek.trailblazer
[rameater-play]:        https://play.google.com/store/apps/details?id=derekwilson.net.rameater
[rameater-amazon]:      https://www.amazon.com/Derek-Wilson-RamEater/dp/B0B1LBJYY1/
[pu-chocolatey]:                https://community.chocolatey.org/packages/podcastutilities
[pucore-chocolatey]:            https://community.chocolatey.org/packages/podcastutilities-core
[wrist-spin-pebble]:            https://apps.rebble.io/en_US/application/56904b60e74aedc6b600000b?query=crick&section=watchapps
[wrist-spin-amazon]:            https://www.amazon.com/dp/B0D2ZJFS3G/
[fitbit-remove-apps]:           https://community.fitbit.com/t5/Versa-4/Versa-4-can-t-install-any-apps/td-p/5293802
[wear-os-url]:                  https://wearos.google.com