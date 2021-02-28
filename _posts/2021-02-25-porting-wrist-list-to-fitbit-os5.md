---
layout: post
title:  "Porting wrist-list to Fitbit OS5"
date:   2021-02-25 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit"]
---

## wrist-list

Last year I released [wrist-list][wrist-list-url] on the Fitbit app store. Its gone quite well with 2,500 installs. Fitbit have continued to release new devices that run [Fitbit OS][fitbit-smartwatches-url] and I have received requests to make wrist-list work on them. The new devices: Versa 3 and Sense run the new Fitbit OS5 and its only [available on the new devices][fitbit-os-url], and Fitbit OS4 is only available on the old devices.

So it was always going to be non-trivial to setup my project to support both OS4 and OS5, even though there was a [migration guide][fitbit-migration-guide].

## Getting build and run to work

The guides detailed a number of breaking changes and [required changes to the project structure][fitbit-announcing-os5]. As the Q&A section makes clear its not possible to target both OS4 and OS5 from the same project. I could have two separate projects and share some files between them but I've done this in the past found it to be a bat idea, it too easy to have an unfortunate effect on the "other" app. So I decided to copy the current app and have two completely separate folder structures `Fitbit-os4` and `Fitbit-os5`

The first steps are to get the application to build and run

1. Update the `package.json`
1. Rename the `widgets.gui` to `widget.defs`, be careful with the letter "s"
1. Rename the remaining `.gui` files to `.view`

### package.json

So first of all I target the correct devices and OS in the `package.json`

{% highlight Javascript linenos %}
{
  "name": "wrist-list",
  "version": "2.0.0",
  "description": "Fitbit todo list",
  "private": true,
  "license": "BSD-2-Clause",
  "devDependencies": {
    "@fitbit/sdk": "^5.0.1",
    "@fitbit/sdk-cli": "^1.7.3"
  },
  "fitbit": {
    "appUUID": "0c065eb4-008f-46ed-9929-e1d62c9a11e3",
    "appType": "app",
    "appDisplayName": "wrist-list",
    "iconFile": "resources/images/icon.png",
    "wipeColor": "#ffffff",
    "requestedPermissions": [
      "access_internet",
      "access_user_profile",
      "run_background"
    ],
    "buildTargets": [
      "atlas",
      "vulcan"
    ],
    "i18n": {},
    "defaultLanguage": "en-US"
  },
{% endhighlight %}

then `npm install` to get the required packages

### widget.defs

The migration guide lists the system components that no longer exist, the only option is to remove these from the widgets file so my file went from this

{% highlight Xml linenos %}
<svg>
  <defs>
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" href="device-specific-styles.css" />
    <link rel="import" href="/mnt/sysassets/widgets_common.gui" />
    <!-- Additional Imports for views -->
    <link rel="import" href="/mnt/sysassets/widgets/baseview_widget.gui" />
    <!-- Additional Imports for tile list -->
    <link rel="import" href="/mnt/sysassets/widgets/tile_list_widget.gui" />
    <!-- Additional Imports for combo buttons -->
    <link rel="import" href="/mnt/sysassets/widgets/combo_button_widget.gui" />
    <!-- Additional Imports for check boxes -->
    <link rel="import" href="/mnt/sysassets/widgets/checkbox_tile_widget.gui" />
    <!-- Additional Imports for scroll view -->
    <link rel="import" href="/mnt/sysassets/widgets/scrollview_widget.gui" />
    <!-- Additional Imports for tumbler view -->
    <link rel="import" href="/mnt/sysassets/widgets/tumblerview_widget.gui" />
    <!-- Additional Imports for square buttons -->
    <link rel="import" href="/mnt/sysassets/widgets/square_button_widget.gui" />
    <!-- Mixed text -->
    <link rel="stylesheet" href="/mnt/sysassets/widgets/dynamic_textarea.css"/>
    <link rel="import" href="/mnt/sysassets/widgets/dynamic_textarea.gui"/>
    <link rel="import" href="/mnt/sysassets/widgets/mixed_text_widget.gui"/>
  </defs>
</svg>
{% endhighlight %}

to this

{% highlight Xml linenos %}
<svg>
  <defs>
    <link rel="stylesheet" href="styles.css" />
    <link rel="import" href="/mnt/sysassets/system_widget.defs" />
    <!-- Additional Imports for views -->
    <link rel="import" href="/mnt/sysassets/widgets/baseview_widget.defs" />
    <!-- Additional Imports for tile list -->
    <link rel="import" href="/mnt/sysassets/widgets/scrollbar.defs" />
    <link rel="import" href="/mnt/sysassets/widgets/tile_list_widget.defs" />
    <!-- Additional Imports for check boxes -->
    <link rel="import" href="/mnt/sysassets/widgets/checkbox.defs" />
    <!-- Additional Imports for scroll view -->
    <link rel="import" href="/mnt/sysassets/widgets/scrollview_widget.defs" />
    <!-- Additional Imports for text buttons -->
    <link rel="import" href="/mnt/sysassets/widgets/text_button.defs" />
  </defs>
</svg>
{% endhighlight %}

there were some quite obvious and documented things that needed to go, the migration guide lists these components as being removed

1. panoramaview_widget
1. combo_button_widget
1. square_button_widget
1. push_button_widget
1. mixed_text_widget

However what is not documented is that `tile_list_widget` is also gone, and with wrist-list being a todo app this was a bit of a problem.

At this point at least the app could be built and would launch, though nothing was displayed on the screen.

## Fixing the render

The existing app looks like this

{% include widgets/image.html src='/images/jekyll/2021-02-01/screen_1_old.png' width='200' height='200' title='Settings' %}

There were a large number of small changes I made to fix the render

1. Moved the title bar text towards the middle to cope with the more rounded shape of the device
1. Changed the `square-button` to be a `text-button`, this was as simple as the migration guide made it sound
1. Added the SDK recommended styles, I thought this would help with some of the system components
1. Ensure that I am only using system font, as its the only supported font in OS5
1. Removed the device specific styles, as there is only one screen size for OS5 devices
1. Replace the mixed text with some text fields, see below
1. Reimplement the checkbox tiles, see below

### SDK recommended styles

The SDK recommends adding these styles to the `styles.css`

{% highlight css linenos %}
/* SDK recommendations */
.application-fill           { fill: fb-cyan; }
.app-gradient-background    { fill: fb-blue; }
.foreground-fill            { fill: fb-white; }
.background-fill            { fill: fb-black; }
{% endhighlight %}


### Mixed and dynamic text

I replaced the mixed-text

{% highlight Xml linenos %}
<use id="no-items-message" href="#mixed-text-center-mid" height="100%" fill="fb-yellow">
  <set href="#header/text" attributeName="text-buffer" to="Nothing to do"/>
  <set href="#copy/text" attributeName="text-buffer"
        to="Add items from the settings page."/>
</use>
{% endhighlight %}

with these `text` elements

{% highlight Xml linenos %}
<svg class="horizontal-pad">
  <text class="h3 center-text application-fill" x="50%" y="50%">Nothing to do</text>
  <text class="p3 center-text application-fill" x="50%" y="$">Add items from the settings page.</text>
</svg>
{% endhighlight %}

I also replaced the `textarea` 

{% highlight Xml linenos %}
<textarea id="about-title" class="about-title" x="5" y="2" width="100%-5" pointer-events="visible">about title...</textarea>
<textarea id="about-copy" class="about-copy" x="5" y="$" width="100%-5" pointer-events="visible">about copy...</textarea>
{% endhighlight %}

with a `dynamic-textarea`

{% highlight Xml linenos %}
<svg class="horizontal-pad">
  <use id="about-title" href="#dynamic-textarea" class="p2 application-fill" x="5" y="20" pointer-events="visible">
    <set href="#text" attributeName="text-length" to="50" />
  </use>
  <rect width="100%" height="2" fill="fb-cyan" y="$+6" />
  <use id="about-copy" href="#dynamic-textarea" class="p2 foreground-fill" x="5" y="$+6" pointer-events="visible">
    <set href="#text" attributeName="text-length" to="100" />
  </use>
</svg>
{% endhighlight %}

### Implementing checkbox tiles

I did find [this posting][checkbox-question-url] that gave some information about checkboxes in OS5. However there is no documentation on how to use them so in the end I found that it was just easier to reimplement them myself.

The markup looks like this

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

I particularly liked the `rect` with the id of `touch` as a mechanism for adding a click event, which I found in the [SDK guide for the tile list component][sdk-guide-component-url]. 

The CSS is this

{% highlight css linenos %}
.list-item-header {
  font-size: 20;
  font-family: System-Regular;
  text-length: 32;
  fill: #FFFFFF;
}

.tile-divider-bottom {
  x: 0;
  y: 100%-2;
  width: 100%;
  height: 2;
  fill: #A0A0A0;
}

#touch {
  width: 100%;
  height: 100%-6;
  x: 0;
  y: 0;
  opacity: 0;
}
{% endhighlight %}

The only part I had to make a compromise on was the that in the original app I could have multiline checkboxes, in fact I [blogged about it][previous-post-url], in this implementation I only support single line with truncation. In fact that was one of the things that is different in OS5 that can trip you up, if you dont specify the `height` of the `tile-item` symbol (on line 8 of the SVG markup) then nothing is displayed.

As multiline is not supported it made the javascript less complex

{% highlight Javascript linenos %}

const selectedBackgroundColour = "#000000";
const selectedTextColour = "green";
const notSelectedBackgroundColour = "#000000";
const notSelectedTextColour = "#FFFFFF";

function setupTileColours(bg, textArea, checkBoxRectBorder, checkBoxRect, checkImage, selected) {
  bg.style.fill = selected ? selectedBackgroundColour : notSelectedBackgroundColour;
  textArea.style.fill = selected ? selectedTextColour : notSelectedTextColour;
  checkBoxRectBorder.style.fill = selected ? selectedTextColour : notSelectedTextColour;
  checkBoxRect.style.fill = selected ? selectedBackgroundColour : notSelectedBackgroundColour;
  if (selected) {
    checkImage.style.display = "inline";
    checkImage.style.fill = selected ? selectedTextColour : notSelectedTextColour;
  } else {
    checkImage.style.display = "none";
  }
}

function setupTileList(data) {
    tileList.delegate = {
      getTileInfo: (index) => {
        const poolType = (data.list[index].type === "header") ? "header-pool" : "item-pool";
        return {
          type: poolType,
          data: data.list[index],
        };
      },
      configureTile: (tile, info) => {
        if (info.data.type === "header") {
          tile.getElementById("item-header-text").text = info.data.text;
        } else {
          const bg = tile.getElementById("item-background");
          const textArea = tile.getElementById("item-text");
          const checkBoxRectBorder = tile.getElementById("check-rect-border");
          const checkBoxRect = tile.getElementById("check-rect");
          const checkImage = tile.getElementById("check-on-img");

          textArea.text = info.data.text;
          setupTileColours(bg,textArea,checkBoxRectBorder,checkBoxRect,checkImage,info.data.selected);

          let touch = tile.getElementById("touch");
          touch.onclick = (evt) => {
            info.data.selected = !info.data.selected;
            setupTileColours(bg,textArea,checkBoxRectBorder,checkBoxRect,checkImage,info.data.selected);
            updateTitleBar(data);
          };
        }
      }
    };
}
{% endhighlight %}

And after all these changes it looks like this

{% include widgets/image.html src='/images/jekyll/2021-02-01/screen_1_new.png' width='200' height='200' title='Settings' %}

The tick image is from the [Fitbit SDK design assets][design-assets-repo].

## Unresolved items

I am still getting this error in the simulator

```
App: Error 22 Load event was not sent due to missing type handler '(null)' in ./Resources/switcher/switcher_main.view
```

and sometimes this error

```
App: Error 2 Invalid path '/mnt/sysassets/widgets/images/fb_logo/logo_dot_a8.png'
```

But as far as I can tell this is just the simulator being a bit flaky.



[wrist-list-url]:               https://gallery.fitbit.com/details/0c065eb4-008f-46ed-9929-e1d62c9a11e3
[fitbit-smartwatches-url]:      https://www.fitbit.com/us/products/smartwatches
[fitbit-os-url]:                https://help.fitbit.com/articles/en_US/Help_article/2302.htm
[fitbit-migration-guide]:       https://dev.fitbit.com/build/guides/migration/
[fitbit-announcing-os5]:        https://dev.fitbit.com/blog/2020-09-24-announcing-fitbit-os-sdk-5.0/
[checkbox-question-url]:        https://community.fitbit.com/t5/SDK-Development/Checkboxes-on-SDK-5/td-p/4600660
[sdk-guide-component-url]:      https://dev.fitbit.com/build/guides/user-interface/svg-components/views/#tile-list
[previous-post-url]:            /blog/2020/04/23/fitbit-vlist-management
[design-assets-repo]:           https://github.com/Fitbit/sdk-design-assets

[versa-url]:                    https://www.fitbit.com/nz/shop/versa
[fitbit-sdk-url]:               https://dev.fitbit.com/build/guides/
[views-guide-url]:              https://dev.fitbit.com/build/guides/user-interface/svg-components/views/
[vtilelist-example-url]:        https://community.fitbit.com/t5/SDK-Development/Example-for-VirtualTileList/td-p/2677410
[checkbox-example-url]:         https://community.fitbit.com/t5/SDK-Development/Checkbox-component/td-p/2577867
[list-example-url]:             https://github.com/adiroiban/fitbit-os-assistant-relay
[checkbox-colour-url]:          https://community.fitbit.com/t5/SDK-Development/Change-color-of-checkbox/td-p/2673670


