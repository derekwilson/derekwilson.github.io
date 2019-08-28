---
layout: post
title:  "Another Gadget: Fitbit Versa"
date:   2019-08-27 12:00:00
published: true
tags: ["Gadgets", "General", "Javascript", "Pebble", "Fitbit"]
categories: ["Gadgets", "General", "Javascript", "Pebble", "Fitbit"]
---

I have another new gadget - [Fitbit Versa][versa-url]. I have owned and [developed apps][pebble-posts-url] on a number of Pebbles and I was very disappointed when [Pebble stopped trading][pebble-bought-url]. I really enjoyed using my Pebble watches, and I guess to a certain extent was resentful of Fitbit, however I have to say that Fitbit have [tried to be fair][end-pebble-url] to us Pebble users. As my Pebbles have started to show signs of wear and tear, and Fitbit launched the Versa so I decided to have a look.

## Research

These devices are sufficiently expensive in money and effort to develop apps that I wanted to make sure the Versa was right for me. I have to say that there is lots of [documentation to help me get started][fitbit-guides-url] and there is even a [simulator][getting-started-url] that I can start writing code for without buying a device.

I had a look around the guides and decided I needed a real project to work out if the device was going to be good for me.

## Wrist-spin

The main app I wanted to have on my watch was wrist-spin, a realtime cricket scoreboard app that uses vibration alerts to notify me when a wicket falls. I have already produced a version of the [app for Pebble][wrist-spin-pebble-url].

{% include widgets/image.html src='/images/jekyll/2019-08-01/pebble.png' width='884' height='168' title='SimpleSolution' %}

The architecture of the Pebble means that the HTTP request is made over Wifi/3G from Javascript running on the paired phone and then that data is returned to the watch over bluetooth and the screens rendered by the C code running on the watch.

### The simple solution

In theory this should be even easier on the Fitbit as it has build in Wifi I should be able to do something like this

{% include widgets/image.html src='/images/jekyll/2019-08-01/wrist-spin-1.png' width='600' height='100' title='SimpleSolution' %}

However as I tried to port the application is became obvious that I needed a more complex solution because

1. HTTP requests cannot be made over Wifi from apps that users write for Fitbit devices, the Wifi is only used for system updates and file transfer. The only communications possible is over bluetooth to a "companion app" running in the Fitbit on a paired phone. 
1. ESPNCricinfo does not support HTTPS at the moment its data is only accessible via HTTP. Using a similar architecture to the Pebble I could get the phone to make a HTTP request however the SDK [blocks any HTTP request that is not local][fitbit-no-http-url]. 

### The actual solution

To get around this I ended up with the following architecture.

{% include widgets/image.html src='/images/jekyll/2019-08-01/wrist-spin-2.png' width='600' height='100' title='SimpleSolution' %}

1. The phone has a "companion app" that makes HTTPS calls over Wifi/3G to an [Azure Function Proxy][azure-func-proxy-url], this make a proxy call to ESPN Cricinfo HTTP endpoint, the data is then returned to the phone
1. The "companion app" then parses the returned data and sends a small packet over bluetooth to the Fitbit
1. The Fitbit renders the score and handles any vibrating and alerting.

## Other issues

During development there were sine other issues that I stumbled over

1. Bluetooth might not work, there might be [problems][bluetooth-nokia-issue-url] with my Nokia 7.1, it is not on the [list of supported devices][fitbit-supported-devices-url]
1. Running while the screen is off might not work, there appears to be a problem disabling the app timeout in the simulator but it [might be OK on a real device][timeout-problem-url]
1. Bugs with combo buttons and physical buttons

In the end I decided that I was near enough to getting it working on the simulator and that I should buy a device and hope that I could work round the issues. As it happened the bluetooth was fine and running while the screen is off does not work in the simulator but is fine on a real device.

The bugs with the physical and combo buttons is annoying but there are [workarounds][fitbit-button-workaround-url].

## Summary

There were any number of concerns about buying a Versa and now I have had one for a month I think on balance I am very happy with it.

I have ported wrist-spin and it is working very well and looks great.

Good Bits
1. Screen is excellent, even in bright sunlight
1. I could port wrist-spin and it works as well on the Fitbit as it did on the Pebble
1. Bluetooth with my Nokia 7.1 is fine
1. Battery life is not as good as the Pebble - but its OK
1. Fitbit is a much better fitness tracker than the Pebble and the software is much better than Google Fit

Less Good Bits
1. Pebble screen was "always on". The Fitbit "auto on" screen mostly works but is annoying when it doesnt.
1. The quality and quantity of the apps is not great, its much worse that either Pebble or Android Wear, however I dont really need many apps and I'll probably write the ones I need.

[versa-url]:                    https://www.fitbit.com/nz/shop/versa
[pebble-posts-url]:             /blog/categories#Pebble
[pebble-bought-url]:            https://www.theverge.com/2016/12/7/13867158/fitbit-buys-pebble-smartwatch-acquisition-deal
[end-pebble-url]:               https://www.theverge.com/2018/1/24/16928792/fitbit-smartwatch-pebble-end-support-date-june
[fitbit-guides-url]:            https://dev.fitbit.com/build/guides/
[getting-started-url]:          https://dev.fitbit.com/getting-started/
[wrist-spin-pebble-url]:        https://apps.rebble.io/en_US/application/56904b60e74aedc6b600000b?query=crick&section=watchapps
[wrist-spin-source-url]:        https://bitbucket.org/derekwilson/wrist-spin/src/master/
[fitbit-no-http-url]:           https://community.fitbit.com/t5/SDK-Development/FItbit-OS-Simulator-Blocked-insecure-request-to-URL-http/td-p/3058650
[azure-func-proxy-url]:         https://docs.microsoft.com/en-us/azure/azure-functions/functions-proxies
[timeout-problem-url]:          https://community.fitbit.com/t5/SDK-Development/me-appTimeoutEnabled-will-not-be-set/td-p/3079978
[bluetooth-nokia-issue-url]:    https://community.fitbit.com/t5/Versa-Versa-Lite/Nokia-7-1-Not-Syncing/td-p/3115610
[fitbit-supported-devices-url]: https://help.fitbit.com/articles/en_US/Help_article/2315
[fitbit-button-workaround-url]: https://community.fitbit.com/t5/SDK-Development/Combo-Button-and-physical-button/td-p/2334229
