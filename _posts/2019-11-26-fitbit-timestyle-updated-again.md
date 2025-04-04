---
layout: post
title:  "Timestyle for Fitbit updated again"
date:   2019-11-26 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit", "Timestyle"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit", "Timestyle"]
---

[Last month I released an updated Timstyle for Fitbit][previous-post-url], It seemed to go quite well and as I added analytics I can get a feel for how users use the app. I even got some more feature requests from users.

So this month I have [released another update][timestyle-fitbit-url] to add

1. Start and end hours for the periodic interval alert
1. On-device settings that can be used without internet access to override the displayed time and to suppress the alters from the watchface.

The biggest feature is the addition of on-device settings. These are accessed by tapping the panel on the right hand side of the watch and can be used without any connection to the phone or the Fitbit app.

{% include widgets/image.html src='/images/jekyll/2019-11-01/devicesettings.png' width='600' height='200' title='SimpleSolution' %}

I did this because last month I had to travel for the first time with my new Versa and discovered that you cannot set the time on the watch unless you have a bluetooth connection to the Fitbit app on your phone and it also has access to the internet, if either of these is missing then the time on the watch cannot be updated and also no settings for the watchface are available. This is very annoying as once on a flight the recommended action is to set your watch to the time in your destination and this is not possible.

At first I thought I must be doing it wrong but it turned out there were [many people with this problem][set-time-2-url] on [more than one device][set-time-1-url].

So this update will enable you to override the displayed time either forward or backwards to enable you to have different timezone when travelling, to remind you that the time is overridden a small "O" is displayed in the top left corner. The other benefit of this setting is that if you want to do the old trick of running your watch five minutes fast you can now.

Only the time displayed on the watch face is changed, the time inside the device for alarms and tracking data is not affected.

## Updated impressions of the Versa

When I first got my Versa I [gave my impressions][versa-review-url] of it. After three months I have had time to reflect on it. In general I still stand by the good bits I noted, it is a lovely piece of hardware the problems with the device all come from the software.

1. The bluetooth is a lot more unstable than my pebble. I regularly have to reset the Fitbit app or the device.
1. Not being able to set the time when you do not have internet access stops me having a watch when I am flying and need to change timezone. Its flat out unacceptable to sell an expensive watch that doesn't tell the time when you are travelling. I have produced a work around for my watchface (see above) but it doesn't completely get around the problem.

Would I still recommend a Versa? Probably. The battery life is amazing, its nearer five days than four. Maybe the new firmware update will help the software....



[previous-post-url]:    /blog/2019/10/19/fitbit-timestyle-updated
[timestyle-fitbit-url]: https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd
[versa-review-url]:     /blog/2019/08/27/fitbit-versa
[set-time-1-url]:       https://community.fitbit.com/t5/Charge-HR/How-do-I-change-clock-time-zone-without-internet-access/td-p/1281843
[set-time-2-url]:       https://community.fitbit.com/t5/Versa-Smartwatches/set-the-clock-without-internet-access/td-p/3214609

