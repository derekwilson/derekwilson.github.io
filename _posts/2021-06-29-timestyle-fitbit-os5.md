---
layout: post
title:  "Timestyle for Fitbit OS5 released"
date:   2021-06-29 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit", "Timestyle"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit", "Timestyle"]
---

## Timstyle for Fitbit OS5

This month I have [released a new version of Timestyle][timestyle-url] for [Fitbit OS5][fitbit-announcing-os5], the new OS for its Versa 3 and Sense devices

{% include widgets/image.html src='/images/jekyll/2021-06-01/timestyle.png' width='200' height='200' title='Broken' %}

This was a bit more tricky than a usual app port as I don't own one of these devices, I have an older Versa model and Fitbit have not, and [will not release OS5 for these devices][old-device-url]. So I am reliant on the emulator, which is at best an approximation of the real device. I've blogged in the past that sometimes the [render does not match][previous-post1-url] and sometimes [api calls work differntly][previous-post2-url].

Most of the changes were pretty straightforward and similar to the [port I did with wrist-list][previous-post3-url]. However when I was happy and submitted the app to Fitbit it was rejected as the screen did not update properly when returning from the settings screen on the device.

> Due to the fact that your CLOCK has functionality issues, we regretfully inform you that
> we have declined your submission. Please find the issues uncovered during testing below:
>
> unfortunately the issue is still present, the digits aren’t visible for like a minute
> after I set a time offset. Please consult the following link for more information:
> https://dev.fitbit.com/legal/app-gallery-guidelines/ 

Of course it rendered perfectly in the emulator, so I was down to guessing what the problem was, luckily I was able to re-submit and then the reviewer would let me know when I had got it right. I would not have been able to fix this issue without the help and support of the Fitbit app reviewers - so a bit thank you to them.

## Clockface screen updates in Fitbit OS5

The mail SVG layout of the clockface looks a bit like this

{% highlight Xml linenos %}
<svg>
  <link rel="import" href="watchface.view" />
  <link rel="import" href="settings.view" />
</svg>
{% endhighlight %}

`watchface.view` starts like this

{% highlight Xml linenos %}
<svg id="watchface-screen">
  <svg id="watch" class="watch">
    <rect id="background" />
{% endhighlight %}

and `settings.view` starts like this

{% highlight Xml linenos %}
<svg id="settings-screen" display="none">
  <defs>
{% endhighlight %}

Then I show and hide the relevant screens when the user navigates between them.

{% highlight Javascript linenos %}
let settingsScreen = document.getElementById("settings-screen");
let watchFaceScreen = document.getElementById("watchface-screen");

function showSettingsScreen() {
  settingsScreen.style.display = "inline";
  watchFaceScreen.style.display = "none";
}

function showWatchFace() {
  watchFaceScreen.style.display = "inline";
  settingsScreen.style.display = "none";
}
{% endhighlight %}

When the user moves from the settings screen to the clockface, having made changes to the settings, then this is the sort of code that is executed

{% highlight Javascript linenos %}
btnSettingsBack.onclick = function(evt) {
  handleOverrideIndicator(deviceSettings.isDeviceSettingsBeingUsed());
  simpleClock.setOffset(deviceSettings.isOverrideTime(), deviceSettings.getOverrideMins(), true);
  showWatchFace();
}
{% endhighlight %}

I had a thought that maybe the device had extra optimisations for battery performance such that the updates to the display in `watchface.view` did not occur while it had its display set to be `none`

I reordered the code, moving the `showWatchFace()` call to before the calls to update the display and re-submitted the app

{% highlight Javascript linenos %}
btnSettingsBack.onclick = function(evt) {
  showWatchFace();
  handleOverrideIndicator(deviceSettings.isDeviceSettingsBeingUsed());
  simpleClock.setOffset(deviceSettings.isOverrideTime(), deviceSettings.getOverrideMins(), true);
}
{% endhighlight %}

[And it was accepted][timestyle-url]. As I said the emulator does not have this optimisation and works in either order so some care is needed when working with clockfaces, I have not seen this behaviour in apps that are not clockfaces.

[timestyle-url]:                https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd
[fitbit-os-url]:                https://help.fitbit.com/articles/en_US/Help_article/2302.htm
[fitbit-announcing-os5]:        https://dev.fitbit.com/blog/2020-09-24-announcing-fitbit-os-sdk-5.0/
[old-device-url]:               https://www.slashgear.com/fitbit-no-os-5-0-update-for-these-older-models-24639705/
[previous-post1-url]:           /blog/2019/12/25/fitbit-emulater
[previous-post2-url]:           /blog/2020/07/27/wrist-list-updated
[previous-post3-url]:           /blog/2021/02/25/porting-wrist-list-to-fitbit-os5

