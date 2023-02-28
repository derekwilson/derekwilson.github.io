---
layout: post
title: "Recommender Updated"
date: 2023-02-28 12:00:00
published: true
tags: ["Android", "Recommender", "Development", "Mobile"]
categories: ["Android", "Recommender", "Development", "Mobile"]
---

Its been six years since I updated Recommender. Not really because I have abandoned it but rather it was pretty complete. However unlike other platforms Android does seem to be in a constant state of churn which has meant that there were some issues starting to surface

1. It targetted SDK 23 and this is [no longer allowed and not surfaced by the play store][target-api]
1. The legacy Android support library didnt work properly with newer devices, it did not use the whole screen
1. The [Android file system permissions][file-permissions] have breaking changes in them
1. The share mechanism also has [breaking changes][file-sharing]

To address these issues I have

1. Targeted SDK 31
1. Use the latest Jetpack libraries
1. Move exporting, importing, sharing and logging to use the app public folder `/sdcard/Android/data/net.derekwilson.recommender`
1. Enable the user to select a file using [SAF][saf], handily enough now Google has decided to not allow opening from the app public folder 
1. Only share using content providers

I have also made a few changes to try and isolate the app from Googles endless churn

1. Removed all references to Google play services, migrated to using AppCenter for crashes and analytics
1. Target and deploy using [Google Play Store][recommender-play] as well as [Amazon App Store][recommender-amazon], Amazon do not have the same restrictions on target SDKs

I also made a few minor changes

1. Re-tweaked the share decoder from pages on the Amazon web site
1. Added a decoder for goodreads.com
1. Tweaked the backup/restore process to make it more flexible

The [source code][recommender-source] is in bitbucket.

[recommender-play]:     https://play.google.com/store/apps/details?id=net.derekwilson.recommender
[recommender-amazon]:   https://www.amazon.com/gp/product/B0BVPH5YMY
[recommender-source]:   https://bitbucket.org/derekwilson/recommender-android
[target-api]:           https://support.google.com/googleplay/android-developer/answer/11926878?hl=en
[file-permissions]:     https://developer.android.com/about/versions/11/privacy/storage
[file-sharing]:         https://developer.android.com/reference/android/os/FileUriExposedException
[saf]:                  https://developer.android.com/guide/topics/providers/document-provider
