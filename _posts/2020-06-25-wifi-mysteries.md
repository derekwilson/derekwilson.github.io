---
layout: post
title:  "Things I dont know about wifi"
date:   2020-06-25 12:00:00
published: true
tags: ["Gadgets", "General"]
categories: ["Gadgets", "General"]
---

OK, there are probably lots of things I dont know about wifi networking, but this is just one example and how I managed to get it working on my machine.

I bought a new machine a couple of years ago, it is a [ThinkCentre M720q][thinkcentre-url], its very nice and works fine. The only bit I have had trouble with has been the wifi. It comes with a [Intel 8265 11ac wifi adapter][wifi-url] and Windows 10. I've got a [TP-Link Archer C7][router-url] router.

All the other devices in the house seem to be working fine but the ThinkCentre seemed to be working oddly. Sometimes it would be fast and sometimes not and sometimes it would just disconnect from the network.

The router is at the other end of the house - which may be a problem but it is only 10 metres away and its a wooden house.

I ran my local [internet speed test][speed-url] on the adapter in its default configuration and was alarmed to see that it was downloading at 1 Mbps. This seemed very wrong to me. I tried adjusting all the settings I could on the adapter and rerunning the internet speed test, I noticed if I adjusted the Wireless mode to be `802.11a only` then the speed was what I would consider to be more normal. The default was `dual band a/b/g`.

{% include widgets/image.html src='/images/jekyll/2020-06-01/wifi.png' width='500' height='300' title='Wifi Settings' %}

There was a problem, maybe one or twice a week the connection would just drop and I would have to disconnect and reconnect to the wifi. Not the biggest problem in the world but annoying.

There are a lot of moving parts here, the wifi adapter, the router, general radio interference, maybe Windows 10. I tried to eliminate some of the possibilities. I also have a old [Netcomm Powerline][powerline-url] adapter for running ethernet over the mains power cables so I can try without using wifi, it was fine for what it was and it was completely stable.

I also tried other Windows 10 machines, Windows 7 and even a spectacularly expensive MacBook Pro, which at least was the fastest.

They all seemed to work but the Intel adapter seemed to either be slow or unstable. I tried everything suggested on the support sites, removing and reinstalling drivers from Microsoft and Intel but nothing seemed to get over the issue.

In the end I bought a relatively cheap [TP-Link TL-WN722N][usb-wifi-url] USB wifi adapter on the basis that either it worked or I hadn't risked much, and it was the same brand as the router. Well it worked, it was sort of midrange in terms of speed but it was completely stable, I've now run it for a month and its not disconnected once.

| Adapter                           | Download Speed | Notes                    |
|:----------------------------------|:---------------|:-------------------------|
| Intel 8265 11ac - Default Config  | 0.9 Mbps       | Slow                     |
| Intel 8265 11ac - 802.11a only    | 48 Mbps        | Occasional disconnect    |
| Netcomm Powerline                 | 16 Mbps        | Stable                   |
| Surface Pro                       | 40 Mbps        |                          |
| Windows 7 Laptop                  | 29 Mbps        |                          |
| Macbook Pro                       | 52 Mbps        |                          |
| TP-Link TL-WN722N                 | 29 Mbps        | Stable                   |

I am still not sure I understand what is wrong with the Intel adapter, I am not even sure if its the adapter or the router or both but I do now know that its worth measuring and testing things until you get them right.


[thinkcentre-url]:      https://www.lenovo.com/nz/en/desktops-and-all-in-ones/thinkcentre/m-series-tiny/ThinkCentre-M720q/p/11TC1MTM72Q?&cid=nz:sem:ata7pm&gclid=CjwKCAjwltH3BRB6EiwAhj0IUDy5GGHATT2ltvDyL-rp1cNbo86XHnKMWqdOy0hwLvieI2g2RfPcvRoC1mUQAvD_BwE&gclsrc=aw.ds
[wifi-url]:             https://ark.intel.com/content/www/us/en/ark/products/94150/intel-dual-band-wireless-ac-8265.html
[router-url]:           https://www.tp-link.com/us/home-networking/wifi-router/archer-c7/
[powerline-url]:        https://support.netcommwireless.com/legacy-products/NP203
[usb-wifi-url]:         https://www.tp-link.com/us/home-networking/usb-adapter/tl-wn722n/
[speed-url]:            https://www.chorus.co.nz/speed-test


