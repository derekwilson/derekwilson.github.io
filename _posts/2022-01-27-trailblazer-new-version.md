---
layout: post
title: "New release of Trailblazer"
date: 2022-01-27 12:00:00
published: true
tags: ["Android", "Trailblazer", "Development", "Mobile", "Kotlin"]
categories: ["Android", "Trailblazer", "Development", "Mobile", "Kotlin"]
---

This month we have released a new version of [Trailblazer][trailblazer-play].

Trailblazer is a simple, quick and easy to use track recorder, for hiking, running cycling etc. You can record and share your tracks. The app was inspired by MyTracks - a Google app that is now deprecated. The app is supported on all Android phones from Android 4 up.

It is activity being developed by a 100% remote team of developers, we use it to practice our skills and also because we miss MyTracks. This is "spare time" activity for us all which means that we have to take small steps, it turns out this is great for practising iterative development and agile practices.

In this release we have fixed a big where the mechanism to export a track, to either a KML or GPX file was broken on devices running Android 11 and above. This is because of [changes Google have made to the android file system][storage-url]. The effect is that on Android 11 and above tracks are exported to `/sdcard/Android/data/com.andrewandderek.trailblazer/export`, when running on Android 10 and lower tracks continue to be written to `/storage/emulated/0/Trailblazer` as it is far easier to access from other programs.

The [source code][trailblazer-source] is in bitbucket.

[trailblazer-play]:     https://play.google.com/store/apps/details?id=com.andrewandderek.trailblazer
[trailblazer-source]:   https://bitbucket.org/andrewandderek/trailblazer/src/master/
[storage-url]:          https://developer.android.com/about/versions/11/privacy/storage
