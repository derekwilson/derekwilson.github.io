---
layout: post
title:  "Fitbit emulater != device"
date:   2019-12-25 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Pebble", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Pebble", "Fitbit"]
---

I have been working on [Timestyle Fitbit][timestyle-fitbit-url], a watchfach for Fitbit devices. I had thought that I had completed most of the functionality and that I could leave the project alone for a while.

However I received an email from a user who had a Versa2, they said that the time display did not fit properly on the display. I did believe the user, however I could not replicate the problem, I didnt have a Versa2, so I was a little stuck. I guessed that adding a narrow font option would help, and indeed the user confirmed it, so I left it at that.

So there are a number of problems in play here. There is the original Versa, the new Versa2 and the emulator. However its not as simple as that, the original Versa firmware (32.33.1.30) has just received an [update][firmware-url] (32.70.7.14) that makes it behave more like the new Versa2. The emulator is not quite following the same pattern. The emulator that I originally used (v0.7.2) was like the original Versa firmware, however the new emulator (v0.8) was like the new firmware. 

So to summarise, there are two distinct layouts for the same software. Here are screenshots for the old v1.2 version of the clockface

Versa firmware (32.33.1.30) and emulator v0.7.2 look like this

{% include widgets/image.html src='/images/jekyll/2019-12-01/old.png' width='600' height='250' title='Old' %}

Versa firmware (32.70.7.14), emulator v0.8, and presumably the Versa2 look like this

{% include widgets/image.html src='/images/jekyll/2019-12-01/new.png' width='600' height='250' title='New' %}

Thats all well and good but I cannot have the old and the new emulator installed on the same machine - its one or the other. This means that I cannot check any changes I make for the new firmware after I have updated the emulator and my device. I have released a new v1.3 version of the clockface that corrects the clipping problem. Hopefully the changes I have made to correct the clipping of the font will not stop it working on old firmware versions.


[timestyle-fitbit-url]: https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd
[firmware-url]: 		https://community.fitbit.com/t5/Versa-Smartwatches/Fitbit-OS-4-1-Firmware-Release-70-7-14/td-p/3931908

