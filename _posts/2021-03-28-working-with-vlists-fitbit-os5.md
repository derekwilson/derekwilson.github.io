---
layout: post
title:  "Virtual Checkbox Tile Lists in Fitbit OS5"
date:   2021-03-28 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit"]
---

## wrist-list

Last month I started to migrate [wrist-list][wrist-list-url] to the new [Fitbit OS5][fitbit-announcing-os5]

After [some challenges][previous-post2-url] I was able to get the app working. At the last moment I discovered a problem with the virtual tile list.

The issue was that as long as there were up to 10 items in the list everything was fine, if there were 11 items then the render and scrolling on the list was broken like this

{% include widgets/image.html src='/images/jekyll/2021-03-01/broken.png' width='200' height='200' title='Broken' %}

The top couple of items are not being rendered properly and also the scrolling does not work as expected.

I have written about how I [work with virtual tile lists][previous-post-url] in the past so I have had some experience playing around with them. I looked at the [SDK guide for virtual tile lists][sdk-guide-component-url] when I compared the guide's markup to my markup I noticed something interesting. 

{% highlight Xml linenos %}
<svg id="main-screen">

  <defs>
    <!-- Template Symbol for the checkbox items -->
    <symbol id="header-item" href="#tile-list-item" class="list-item-header" height="35" focusable="false" display="none">
      <textarea id="item-header-text" x="10" y="4" width="100%" height="100%">header-text</textarea>
    </symbol>
    <symbol id="tile-item" href="#tile-list-item" class="list-item" height="55" focusable="false" pointer-events="none" system-events="all" display="none">
      <rect id="item-background" x="0" y="0" width="100%" height="100%"/>
      <textarea id="item-text" x="10" y="11" text-length="50" width="100% - 48" height="100%" fill="white">item-text</textarea>
      <rect id="check-rect-border" x="100% - 44" y="13" width="30" height="30" />
      <rect id="check-rect" x="100% - 43" y="14" width="28" height="28" />
      <image id="check-on-img" x="100% - 43" y="14" width="28" height="28" href="images/check_on.png" />
      <rect id="tile-divider-bottom" class="tile-divider-bottom" />
      <rect id="touch" pointer-events="all" />
    </symbol>
  </defs>

  <use id="main-list" href="#tile-list">
    <var id="virtual" value="1" />
    <var id="reorder-enabled" value="0" />
    <var id="separator-height-bottom" value="2" />
    <!-- peek mode is disabled for checkboxes so lets do it for the list item as well -->
    <var id="peek-enabled" value="0" />

    <use id="header-pool" href="#tile-list-pool">
      <use id="header-pool[0]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[1]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[2]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[3]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[4]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[5]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[6]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[7]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[8]" href="#header-item" class="tile-list-item" />
      <use id="header-pool[9]" href="#header-item" class="tile-list-item" />
    </use>

    <use id="item-pool" href="#tile-list-pool">
      <use id="item-pool[0]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[1]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[2]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[3]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[4]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[5]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[6]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[7]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[8]" href="#tile-item" class="tile-list-item" />
      <use id="item-pool[9]" href="#tile-item" class="tile-list-item" />
    </use>
  </use>
</svg>
{% endhighlight %}

I previous versions of the guide the example shows 10 items in the item pool however the newer guide shows 15. Initially I thought this could not be the problem as there are only supposed to be 5 (and some of the sixth) items displayed on the screen at any time. 

{% include widgets/image.html src='/images/jekyll/2021-03-01/working.png' width='200' height='200' title='Working' %}

However when I increased the pool size it fixed the issue. In fact increasing it to 14 fixed the problem in my case, your mileage may vary.

I was helped in tracking this bug by avery helpful and forgiving user.

So even though the simulator is a little flakey, often crashing and sometimes needing to be killed, I have managed to get [wrist-list][wrist-list-url] out into the store and after over 350 downloads in the first month it appears to be going well.





[wrist-list-url]:               https://gallery.fitbit.com/details/0c065eb4-008f-46ed-9929-e1d62c9a11e3
[fitbit-smartwatches-url]:      https://www.fitbit.com/us/products/smartwatches
[fitbit-os-url]:                https://help.fitbit.com/articles/en_US/Help_article/2302.htm
[fitbit-migration-guide]:       https://dev.fitbit.com/build/guides/migration/
[fitbit-announcing-os5]:        https://dev.fitbit.com/blog/2020-09-24-announcing-fitbit-os-sdk-5.0/
[checkbox-question-url]:        https://community.fitbit.com/t5/SDK-Development/Checkboxes-on-SDK-5/td-p/4600660
[sdk-guide-component-url]:      https://dev.fitbit.com/build/guides/user-interface/svg-components/views/#tile-list
[previous-post-url]:            /blog/2020/04/23/fitbit-vlist-management
[previous-post2-url]:           /blog/2021/02/25/porting-wrist-list-to-fitbit-os5
[design-assets-repo]:           https://github.com/Fitbit/sdk-design-assets

[versa-url]:                    https://www.fitbit.com/nz/shop/versa
[fitbit-sdk-url]:               https://dev.fitbit.com/build/guides/
[views-guide-url]:              https://dev.fitbit.com/build/guides/user-interface/svg-components/views/
[vtilelist-example-url]:        https://community.fitbit.com/t5/SDK-Development/Example-for-VirtualTileList/td-p/2677410
[checkbox-example-url]:         https://community.fitbit.com/t5/SDK-Development/Checkbox-component/td-p/2577867
[list-example-url]:             https://github.com/adiroiban/fitbit-os-assistant-relay
[checkbox-colour-url]:          https://community.fitbit.com/t5/SDK-Development/Change-color-of-checkbox/td-p/2673670


