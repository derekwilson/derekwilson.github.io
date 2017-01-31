---
layout: post
title: "New version of Recommender"
date: 2017-01-26 12:00:00
published: true
tags: ["Android", "Recommender", "Development", "Mobile"]
categories: ["Android", "Recommender", "Development", "Mobile"]
---

I’ve [released][recommender-play] a small update to Recommender this month. The app is working quite well in its small user base, the change enables you to add a nickname to the app and then when you share a recommendation the recipient will always know where the recommendation came from.

You can also edit any recommendation to identify where it came from in the same way as giving a recommendation a category.

{% include widgets/image.html src='/images/jekyll/2017-01-01/screen5b.png' width='150' height='300' title='Screen' %}

The [source code][recommender-source] is in bitbucket.

Also this version has been enabled to allow the data local to the phone to be backed up by Google Drive. However this does not appear to work with all manufacturers on my phone I can see the backup by selecting Google Drive –> Settings –> Manage Backups.

{% include widgets/image.html src='/images/jekyll/2017-01-01/drive.png' width='150' height='300' title='Drive' %}

However, on some devices Recommender never appears in the list, let me know if you have any ideas about how to get Google Drive to back the data up.

[recommender-play]:   https://play.google.com/store/apps/details?id=net.derekwilson.recommender
[recommender-source]: https://bitbucket.org/derekwilson/recommender-android
