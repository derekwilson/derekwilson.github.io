---
layout: post
title:  "Fitbit OS memory management"
date:   2019-03-01 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit"]
---

[Last month I released Timstyle for Fitbit][previous-post-url], It seemed to go quite well and I even got some feature requests from users.

So this month I have [released an update][timestyle-fitbit-url] to add

1. A narrow font option for the time display as it appears to not fit properly on a Versa 2
1. The steps display can now be switched off in the settings
1. Optionally there can be a second display of distance, floors, or heart rate. Running the heart rate monitor does seem to have an effect on the battery life.
1. An interval alert which will vibrate on 15 mins, 30 mins or hourly
1. Optional AM/PM indicator

I have also managed to find a [package][analytics-module-url] to add [Google Analytics][analytics-url] to the watchface so that I measure how features are used. The new release has gone quite well and is being used by more than 20 users in the first day.

{% include widgets/image.html src='/images/jekyll/2019-10-01/ga1.png' width='300' height='200' title='SimpleSolution' %}

It is [open source][timestyle-source-url] so people can contribute if they want to.

[previous-post-url]:            /blog/2019/09/23/fitbit-timestyle-released
[timestyle-fitbit-url]:         https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd
[timestyle-source-url]:         https://bitbucket.org/derekwilson/timestyle-fitbit/src/master/
[analytics-module-url]:         https://www.npmjs.com/package/fitbit-google-analytics
[analytics-url]:                https://support.google.com/analytics/answer/1008015?hl=en

