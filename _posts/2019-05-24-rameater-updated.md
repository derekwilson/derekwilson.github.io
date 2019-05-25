---
layout: post
title: "RamEater updated"
date: 2019-05-24 12:00:00
published: true
tags: ["Android", "Development", "RamEater"]
categories: ["Android", "Development", "RamEater"]
---

This month I have done a maintenance release of [RamEater][rameater-play]. I have noticed that newer phones like the S10 now have 8GB of memory and the number of services in [RamEater][rameater-play] was not enough to consume all the available memory on its own. I've added another 6 bringing it up to 16 services, Android usually limits each service to 0.5GB so that should be enough for the moment.

I also fixed a UI bug that has been in the app for years, I am very grateful for a helpful user for spotting it and sending me all the information I needed to fix it.

I also added some notes to the app help. Since Android 8.1 the developer options have contained an item called **Memory**, this item can cause confusion because it shows app memory averaged over a number of hours rather than the memory consumed by each process in real time which is shown by **Running Services**

The [source code][rameater-source] is in Github.

[rameater-play]:   https://play.google.com/store/apps/details?id=derekwilson.net.rameater
[rameater-source]: https://github.com/derekwilson/RamEater



