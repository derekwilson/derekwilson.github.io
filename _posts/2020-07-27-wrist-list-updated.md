---
layout: post
title:  "wrist-list updated"
date:   2020-07-27 12:00:00
published: true
tags: ["General", "JavaScript", "Fitbit"]
categories: ["General", "JavaScript", "Fitbit"]
---

## wrist-list

A couple of [months ago][previous-post-url] I released [wrist-list][wrist-list-url] a todo list for [Fitbit OS devices][fitbit-smartwatches-url].

Almost immediately I found a bug, if you left the list unattended for more than two minutes it would exit back to your clock face. This month I released an update to fix the problem.

## appTimeoutEnabled

It turns out that the Fitbit SDK documentation does cover [applications timing out after inactivity][appTimeoutEnabled-doc-url]. I fixed it by adding this code

{% highlight Javascript linenos %}
import { me } from "appbit";
me.appTimeoutEnabled = false;
{% endhighlight %}

It is a bit fiddly to work with as the [emulator does not support it][appTimeoutEnabled-emulator-url] so the emulator will still kill the app after inactivity, however it works as expected on a real device.

[previous-post-url]:                /blog/2020/05/25/wrist-list-released
[wrist-list-url]:                   https://gallery.fitbit.com/details/0c065eb4-008f-46ed-9929-e1d62c9a11e3
[fitbit-smartwatches-url]:          https://www.fitbit.com/us/products/smartwatches
[appTimeoutEnabled-doc-url]:        https://dev.fitbit.com/build/reference/device-api/appbit/
[appTimeoutEnabled-emulator-url]:   https://community.fitbit.com/t5/SDK-Development/Does-AppBit-appTimeoutEnabled-actually-work/m-p/4346254/highlight/true#