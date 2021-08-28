---
layout: post
title: "New release of Trailblazer"
date: 2021-08-28 12:00:00
published: true
tags: ["Android", "Trailblazer", "Development", "Mobile", "Kotlin"]
categories: ["Android", "Trailblazer", "Development", "Mobile", "Kotlin"]
---

This month we have released a new version of [Trailblazer][trailblazer-play].

Trailblazer is a simple, quick and easy to use track recorder, for hiking, running cycling etc. You can record and share your tracks. The app was inspired by MyTracks - a Google app that is now deprecated. The app is supported on all Android phones from Android 4 up.

It is activity being developed by a 100% remote team of developers, we use it to practice our skills and also because we miss MyTracks. This is "spare time" activity for us all which means that we have to take small steps, it turns out this is great for practising iterative development and agile practices.

In this release we have tackled some technical debt, we have switched from [FusedLocationApi][old-api] which has been deprecated by Google to [FusedLocationProviderClient][new-api] to interface with the GPS on the phone. We have also made the tracklist load significantly faster.

The [source code][trailblazer-source] is in bitbucket.

[trailblazer-play]:     https://play.google.com/store/apps/details?id=com.andrewandderek.trailblazer
[trailblazer-source]:   https://bitbucket.org/andrewandderek/trailblazer/src/master/
[old-api]:              https://developers.google.com/android/reference/com/google/android/gms/location/FusedLocationProviderApi
[new-api]:              https://developers.google.com/android/reference/com/google/android/gms/location/FusedLocationProviderClient
