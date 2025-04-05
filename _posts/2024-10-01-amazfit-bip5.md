---
layout: post
title: "Another Gadget: Amazfit Bip5"
date: 2024-10-01 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "ZeppOS", "Wrist-spin"]
categories: ["Gadgets", "General", "JavaScript", "ZeppOS", "Wrist-spin"]
---

Almost exactly 5 years after I bought my previous everyday wearable [a Fitbit Vera][previous-post-1-url] I decided to buy a new one.

## My requirements

Having previously used Pebble and Fitbit devices I boiled down my requirements to

- Good battery life, I think a week is pretty much the minimum I would like to have to live with
- SDK available, I want to be able to write my own apps and download others
- Affordable, I am not sure I understand watches costing hundreds (or thousands) of dollard and only lasting a couple of years
- Notifications on my wrist, I dont use my phone lock screen

I dont think this is a demanding list and it was certainly covered by both Fitbit and Pebble but today its quite tricky. Most fitness trackers just come with the prebuilt software and thats not really what I want, I want a large clear time display that I can easily see and also I have got used to having the cricket scores on my wrist. Watches that do have an SDK pretty much need charging every day and tend to be quite expensive.

## Amazfit Bip 5

I settled on an [Amazfit Bip 5][bip-5-url], and as it turned out I am very happy with it. The only minor drawbacks are

- Screen does not automatically dim and brighten
- Screen isn't really visible in bright sunlight
- It took a couple of weeks for the battery life to settle down

Also there are some unexpected bonuses

- The wrist movement detection to turn the screen on is much better than Fitbit
- The movement detection can be turned off at night
- It seems very well made
- The developer community support is fantastic

## wrist-spin

I have ported wrist-spin my cricket score tracker to Pebble, Fitbit and [Android][previous-post-2-url] devices so it made sense for me to port it to the Bip 5. I have added support for ZeppOS to the [source repo][wrist-spin-url]. Its largely a port of the Fitbit javascript code. I hope that it will run on other ZeppOS devices but its my first app so lets see how that works out.

{% include widgets/image.html src='/images/jekyll/2024-10-01/screen1.png' width='200' height='238' title='Match Display' %}
{% include widgets/image.html src='/images/jekyll/2024-10-01/screen2.png' width='200' height='238' title='Match Details Display' %}
{% include widgets/image.html src='/images/jekyll/2024-10-01/screen3.png' width='200' height='238' title='Main Menu' %}
{% include widgets/image.html src='/images/jekyll/2024-10-01/screen4.png' width='200' height='238' title='Select Match' %}
{% include widgets/image.html src='/images/jekyll/2024-10-01/screen5.png' width='200' height='238' title='Options' %}
{% include widgets/image.html src='/images/jekyll/2024-10-01/screen6.png' width='200' height='238' title='Data Source' %}


[previous-post-1-url]:  /blog/2019/08/27/fitbit-versa
[previous-post-2-url]:  /blog/2024/06/01/what-has-been-happening

[pebble-url]:           https://en.wikipedia.org/wiki/Pebble_Time
[bip-5-url]:            https://www.amazfit.com/pages/amazfit-bip-5-unity

[wrist-spin-url]:       https://bitbucket.org/derekwilson/wrist-spin


