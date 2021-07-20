---
layout: post
title:  "Checkbox controls in Fitbit OS5"
date:   2021-07-19 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit"]
---

## Fitbit OS5

Last year [Fitbit announced OS5][fitbit-announcing-os5] and during this year I have ported two of my apps from OS4 to OS5: [wrist-list][wrist-list-url] and [Timestyle][timestyle-url].

While I was [porting them][previous-post-url] one of the things that tripped me up was that OS5 [does not have a documented checkbox widget][checkbox-question-url]

Now I have ported both apps I have pulled out my implementation of checkbox so that it is relativity easy to add to other apps.

## Checkbox Control

These are the steps to add a checkbox control to a Fitbit OS5 app. Full source code can be found in the [timestyle repo][timestyle-repo-url]

### widget.defs

In `widget.defs` add this line

{% highlight Xml linenos %}
<svg>
  <defs>
    <!-- other application imports -->
    <!-- my implementation of checkboxes in tile list -->
    <link rel="import" href="checkbox_tile_list.defs" />
  </defs>
</svg>
{% endhighlight %}

### checkbox_tile_list.defs

`checkbox_tile_list.defs` should contain

{% highlight Xml linenos %}
<svg>
  <defs>
    <symbol id="checkbox-tile-item" href="#tile-list-item" class="list-item-checkbox" height="55" focusable="false" pointer-events="none" system-events="all">
      <rect id="item-background" x="0" y="0" width="100%" height="100%"/>
      <textarea id="item-text" x="10" y="11" text-length="50" width="100% - 48" height="100%">item-text</textarea>
      <rect id="check-rect-border" x="100% - 44" y="13" width="30" height="30" />
      <rect id="check-rect" x="100% - 43" y="14" width="28" height="28" />
      <image id="check-on-img" x="100% - 43" y="14" width="28" height="28" href="images/check_on.png" />
      <rect id="tile-divider-bottom" class="tile-divider-bottom" />
      <rect id="touch" pointer-events="all" />
    </symbol>
  </defs>
</svg>
{% endhighlight %}

You will also need the file `images/check_on.png`, the path is relative to the `.defs` files and the image comes from the [Fitbit design assets][design-assets-repo]

### style.css

Next add these lines to your `style.css`

{% highlight css linenos %}
/* checkbox tile items */

.list-item-checkbox textarea {
  fill: #FFFFFF;
}

.list-item-checkbox #check-rect-border {
  fill: #FFFFFF;
}

.list-item-checkbox #check-on-img {
  fill: #FFFFFF;
  display: none;
}

#touch {
  width: 100%;
  height: 100%-6;
  x: 0;
  y: 0;
  opacity: 0;
}
{% endhighlight %}

### your_screen.view

In your `.view` file you can add checkboxes like this

{% highlight Xml linenos %}
<svg id="settings-screen" display="none">

  <use id="settings-list" href="#tile-list">
    <var id="reorder-enabled" value="0"/>
    <var id="peek-enabled" value="0" />

    <use id="settings-suppress-alert" href="#checkbox-tile-item" class="checkbox-tile-item">
        <set href="item-text" attributeName="text-buffer" to="Suppress alerts" />
    </use>

    <use id="settings-override-time" href="#checkbox-tile-item" class="checkbox-tile-item">
        <set href="item-text" attributeName="text-buffer" to="Override time" />
    </use>

  </use>
</svg>
{% endhighlight %}

### index.js

And finally they need to be hooked up to code in your javascript file like this

{% highlight Javascript linenos %}
let imageSuppressAlerts = null;
let imageOverrideTime = null;

// menu panel
let list = document.getElementById("settings-list");
let checkboxItems = list == null ? null : list.getElementsByClassName("checkbox-tile-item");
if (checkboxItems != null) {
  checkboxItems.forEach((element, index) => {
    let checkImage = element.getElementById("check-on-img");
    if (checkImage != null) {
      switch (index) {
        case 0:     // suppress alerts
          imageSuppressAlerts = checkImage;
          break;
        case 1:     // override time
          imageOverrideTime = checkImage;
          break;
      }
    }
    
    let touch = element.getElementById("touch");
    touch.onclick = (evt) => {
      switch (index) {
        case 0:     // suppress alerts
          toggleSuppressAlerts(imageSuppressAlerts);
          break;
        case 1:     // override time
          toggleOverrideTime(imageOverrideTime);
          break;
      }
    }
  });

function toggleSuppressAlerts(chkImage) {
  deviceSettings.setSuppressAlerts(!deviceSettings.isSuppressAlerts());
  setupCheckImageDisplay(chkImage, deviceSettings.isSuppressAlerts());
};

function toggleOverrideTime(chkImage) {
  deviceSettings.setOverrideTime(!deviceSettings.isOverrideTime());
  setupCheckImageDisplay(chkImage, deviceSettings.isOverrideTime());
};


function setupCheckImageDisplay(image, chkValue) {
  if (image == null) {
    return;
  }
  if (chkValue) {
    image.style.display = "inline";
  } else {
    image.style.display = "none";
  }
}


  // initialisation
  setupCheckImageDisplay(imageSuppressAlerts, deviceSettings.isSuppressAlerts() );
  setupCheckImageDisplay(imageOverrideTime, deviceSettings.isOverrideTime());
}
{% endhighlight %}

Its not the most elegant code in the world but it does get the job done

{% include widgets/image.html src='/images/jekyll/2021-07-01/screen.png' width='200' height='200' title='Settings' %}


[wrist-list-url]:               https://gallery.fitbit.com/details/0c065eb4-008f-46ed-9929-e1d62c9a11e3
[timestyle-url]:                https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd
[timestyle-repo-url]:           https://bitbucket.org/derekwilson/timestyle-fitbit/src/master/
[fitbit-announcing-os5]:        https://dev.fitbit.com/blog/2020-09-24-announcing-fitbit-os-sdk-5.0/
[checkbox-question-url]:        https://community.fitbit.com/t5/SDK-Development/Checkboxes-on-SDK-5/td-p/4600660
[previous-post-url]:            /blog/2021/02/25/porting-wrist-list-to-fitbit-os5
[design-assets-repo]:           https://github.com/Fitbit/sdk-design-assets


