---
layout: post
title: "Compare tracks in Trailblazer"
date: 2020-11-26 12:00:00
published: true
tags: ["Android", "Trailblazer", "Development", "Mobile", "Kotlin"]
categories: ["Android", "Trailblazer", "Development", "Mobile", "Kotlin"]
---

This month we have released a new version of [Trailblazer][trailblazer-play].

Trailblazer is a simple, quick and easy to use track recorder, for hiking, running cycling etc. You can record and share your tracks. The app was inspired by MyTracks - a Google app that is now deprecated. The app is supported on all Android phones from Android 4 up.

It is activity being developed by a 100% remote team of developers, we use it to practice our skills and also because we miss MyTracks. This is "spare time" activity for us all which means that we have to take small steps, it turns out this is great for practising iterative development and agile practices.

In the [previous release][previous-post-url] we implemented multiple select however all we used it for was calling delete or export multiple times. Implementing multiple select was a non-trivial exercise and a lot of work for so little gain. However the reason we did that was so that we could then build on in to be able to compare multiple tracks, it just happens that we decided we should ship the multi-select code as soon as it was ready.

{% include widgets/image.html src='/images/jekyll/2020-11-01/screen6.PNG' width='150' height='300' title='Screen' %}

Now after selecting all the tracks you want you can compare them by speed, pace, distance and time.

{% include widgets/image.html src='/images/jekyll/2020-11-01/screen7.PNG' width='150' height='300' title='Screen' %}

We will try to continue to add more features in this incremental as time allows.

The [source code][trailblazer-source] is in bitbucket.

[trailblazer-play]:   https://play.google.com/store/apps/details?id=com.andrewandderek.trailblazer
[trailblazer-source]: https://bitbucket.org/andrewandderek/trailblazer/src/master/
[previous-post-url]:  /blog/2020/08/25/trailblazer-new-version
