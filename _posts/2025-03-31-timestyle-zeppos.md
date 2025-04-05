---
layout: post
title: "Timestyle for Amazfit/ZeppOS"
date: 2025-03-31 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "ZeppOS", "Timestyle"]
categories: ["Gadgets", "General", "JavaScript", "ZeppOS", "Timestyle"]
---

Ten years ago I bought a [Pebble Time][pebble-url], and I loved [Dan Tilden's wonderful iconic Timestyle][timestyle-site-url] watch face. 5 years later I bought a [Fitbit Vera][previous-post-1-url] and I could not find a watch face as good as Timestyle so I ported Dan's design and wrote the code again from scratch and released [Timestyle for Fitbit][timestyle-fitbit-url] on the app atore.

Last year I bought an [Amazfit Bip5 Unity][previous-post-2-url] and once again I missed the clear simplicity of Dan's design and I decided to port the design to ZeppOS. The environment was completely different so I ended up rewriting the code again from scratch. I am very happy with the result.

{% include widgets/image.html src='/images/jekyll/2025-03-01/1.png' width='200' height='238' title='Mono' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/2.png' width='200' height='238' title='Blue' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/3.png' width='200' height='238' title='Khaki' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/4.png' width='200' height='238' title='Pink' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/6.png' width='200' height='238' title='Electric' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/7.png' width='200' height='238' title='Christmas' %}

## Installing Timestyle

I have gone to the effort of getting the watch face published in the official app store - you can install it on any Bip 5 watch by using the Zepp App and going to device tab and selecting watch faces. If it is not on the featured list then you can find it in the Simplicity section

{% include widgets/image.html src='/images/jekyll/2025-03-01/zepp_app1.jpg' width='150' height='300' title='Devices Tab' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/zepp_app2.jpg' width='150' height='300' title='Watch face description' %}

## Main design ideas

Unlike most ZeppOS watch faces Timestyle uses pure text to render the display, this means that it is very power friendly and also can offer the ability to have multiple colour and font renders in one watch face.

- 8 built-in colour schemes
- 7 fonts
- 12 or 24 hour display
- Watch battery level
- Optionally display any two of steps, PAI, stand, fat burn, or heart rate
- Day/Date
- Supports English, French, German and Spanish

There have been some changes since the last port. ZeppOS provides no easy mechanism for configuring the watch face from the Zepp App and the configuration options on the device are limited to being able to select between builtin colour schemes and fonts and selecting which sensor data to display on the sidebar. So its not really possible to support the ability to customise the colour schemes, however I have provided that ability in a separate app called Timestyle+.

## Timestyle+

The structure of watch faces in ZeppOS means that some more complex UI designs are not really possible. So to add extra functionality to the Timestyle watch face I have created and published the Timestyle+ app on the official app store.

You do not need to install Timestyle+, if you are happy with the built-in options then you can just use the Timestyle watch face as is.

{% include widgets/image.html src='/images/jekyll/2025-03-01/plus1.png' width='200' height='238' title='Main Menu' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/plus2.png' width='200' height='238' title='Scheme List' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/plus3.png' width='200' height='238' title='Customise scheme' %}
{% include widgets/image.html src='/images/jekyll/2025-03-01/plus4.png' width='200' height='238' title='Colour picker' %}

After installing Timestyle+ you will see extra colour schemes in the Timestyle watch face configuration screen. These schemes are called Custom1, Custom2 etc. You can change the colours for these custom colour schemes in this app and the changes will be reflected in the Timestyle watch face.

## Installing Timestyle+

You can install it on any Bip 5 watch by using the Zepp App and going to device tab and selecting app store. You can search for Timestyle+ or find it in the Utilities section

{% include widgets/image.html src='/images/jekyll/2025-03-01/zepp_app3.jpg' width='150' height='300' title='Timestyle+ description' %}

## Other Amazfit/ZeppOS devices

As Timestyle and Timestyle+ both target ZeppOS v1 in theory they should run on almost any Amazfit device however I have noticed that testing in the simulator is not the same as a real device, for instance the way large font characters are handled. So with this im mind I will add support for other devices when I have the real devices to test on.

## Success criteria

When I published Timestyle for Fitbit I tried to [measure the performance against my success criteria][previous-post-3-url]. Timestyle for Fitbit continues to be successful with over 10,000 downloads and over 1,000 reviews averaging 4.5 stars. 

I guess when I published the watch face for ZeppOS I wanted to match that performance. Well it turns out that Timestyle is easilly my most successful project. The Fitbit version got about 1,000 downloads in the first three months, the ZeppOS version has had almost 20,000 downloads in the first three months and Timestyle+ has had 700 downloads in the first month.

{% include widgets/image.html src='/images/jekyll/2025-03-01/downloads1.png' width='500' height='300' title='Total Downloads' %}

{% include widgets/image.html src='/images/jekyll/2025-03-01/downloads2.png' width='500' height='300' title='Total Downloads' %}

[previous-post-1-url]:          /blog/2019/08/27/fitbit-versa
[previous-post-2-url]:          /blog/2024/10/01/amazfit-bip5
[previous-post-3-url]:          /blog/2020/01/23/fitbit-timestyle-stats
[pebble-url]:                   https://en.wikipedia.org/wiki/Pebble_Time
[timestyle-site-url]:           https://www.dantilden.com/projects/timestyle/
[timestyle-fitbit-url]:         https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd



