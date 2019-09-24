---
layout: post
title:  "Timestyle Fitbit released"
date:   2019-09-23 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Pebble", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Pebble", "Fitbit"]
---

[Last month I wrote][previous-post-url] about my decision to buy a [Fitbit Versa][versa-url]. As I noted in the conclusion I thought I might end up writing some of the apps that I wanted. It turned out that the first thing I wanted was a watch face like my beloved [TimeStyle on the pebble][timestyle-pebble-url].

I wanted to stay true to [Dan's wonderful design goals][timestyle-site-url]. However in the first release I was going to cut down the amount of configuration so I could get something produced and usable.

In addition to having a large clear time display I wanted

1. To be able to set the colour of all watchface elements
1. Select 12 or 24 hour display, or use the setting from your fitbit account
1. Zero pad the date day
1. Zero pad the hour
1. Vibrate when the bluetooth status changes
1. See at a glance the device battery level.

{% include widgets/image.html src='/images/jekyll/2019-09-01/listing.png' width='300' height='200' title='SimpleSolution' %}

Now that it is released and in the app store I am pretty pleased with the result, I use it every day and I am already getting feature requests.

{% include widgets/image.html src='/images/jekyll/2019-09-01/rescent.png' width='500' height='400' title='SimpleSolution' %}

Its [open source][timestyle-source-url] so people can contribute if they want to.

[versa-url]:                    https://www.fitbit.com/nz/shop/versa
[previous-post-url]:            /blog/2019/08/27/fitbit-versa
[timestyle-fitbit-url]:         https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd
[timestyle-pebble-url]:         https://apps.rebble.io/en_US/application/55a5c024f4510f794c000071
[timestyle-site-url]:           https://www.dantilden.com/projects/timestyle/
[timestyle-source-url]:         https://bitbucket.org/derekwilson/timestyle-fitbit/src/master/
