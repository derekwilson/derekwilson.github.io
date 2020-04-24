---
layout: post
title:  "Working with Fitbit Virtual Checkbox Tile Lists"
date:   2020-04-23 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit"]
---

I've started working on a new project for my [Fibit Versa][versa-url] and so far it seems to be going quite well. Its basically a todo list on your wrist for a very specific use case, I am writing it for a birthday present but it may be more generally useful, we will see.

I knew that the [Fitbit SDK][fitbit-sdk-url] had support for some pretty advanced [view components][views-guide-url] so I started there.

What I needed was a combination of a [Virtual Tile List][vtilelist-example-url] and a [Checkbox List][checkbox-example-url], and I found some [very good and helpful examples][list-example-url]. However there were a couple of things I couldn't find examples for and I had to work them out myself.

1. setting the colour of the text and background of a checkbox tile
1. getting the height of a virtual checkbox tile with multi row text correct after the dynamic refresh

## A dynamic virtual checkbox list 

From the examples I ended up with a layout for the list like this, the list itself supports the idea of having groups of checkbox items with each group having a header item (which is not a checkbox)

{% highlight Xml linenos %}
<svg id="main-screen">

  <defs>
    <!-- Template Symbol for the view header -->
    <symbol id="view-header" href="#scrollview-header">
      <rect id="heading-banner" x="0" y="0" width="100%" height="100%" fill="green" pointer-events="visible"/>
      <text id="heading-text-top-left" x="4" y="30" />
      <text id="heading-text-top-right" x="100%-4" y="30" text-anchor="end"/>
    </symbol>
    <!-- Template Symbol for the checkbox items -->
    <symbol id="header-item" href="#tile-list-item" focusable="false"  height="40" class="header" display="none">
      <textarea id="item-header-text" x="4" y="30" width="100%" height="100%" fill="white">header-text</textarea>
    </symbol>
    <symbol id="tile-item" href="#tile-list-item" focusable="false" pointer-events="none" system-events="all" display="none">
      <rect id="item-background" x="0" y="0" width="100%" height="100%"/>
      <use id="item-text" href="#checkbox-tile" pointer-events="all" value="0">
        <set href="header/text" attributeName="text-buffer" to="item-text" />
      </use>
      <rect id="tile-divider-bottom" class="tile-divider-bottom" />
    </symbol>
  </defs>

  <use href="#view-header" height="39">
    <set href="#heading-text-top-left" attributeName="text-buffer" to="ver" />
    <set href="#heading-text-top-right" attributeName="text-buffer" to="99:99" />
  </use>

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

The code to populate the list is like this

{% highlight Javascript linenos %}
function setupTileList(data) {
    tileList.delegate = {
      getTileInfo: (index) => {
        const poolType = (data[index].type === "header") ? "header-pool" : "item-pool";
        return {
          type: poolType,
          data: data[index],
        };
      },
      configureTile: (tile, info) => {
        if (info.data.type === "header") {
          tile.getElementById("item-header-text").text = info.data.text;
        } else {
          const checkBoxTile = tile.getElementById("item-text");
          checkBoxTile.text = info.data.text;
          checkBoxTile.value = info.data.selected ? 1 : 0;
          checkBoxTile.onclick = (evt) => {
            info.data.selected = !info.data.selected;
          };
        }
      }
    };
}
{% endhighlight %}

and the data looks like this, in the real app the data is also dynamic

{% highlight Javascript linenos %}
let data = [{
    type: "header",
    text: "",
    selected: false
  }, {
    type: "item",
    text: "bread",
    selected: false
  }, {
    type: "item",
    text: "cheese",
    selected: true
  }];
{% endhighlight %}

## Setting the colour of the text and background of a checkbox tile

I was able to set the [colour of the checkbox][checkbox-colour-url] easily enough using the CSS styles, but I wanted to be able to set the colour of the text and background as well.

To set the colour of the checkbox I did this in CSS

{% highlight css linenos %}
/* all checkboxes */
.checkbox-tile-image image { fill: green }
.checkbox-unselected-color image { fill: #FFFFFF }
{% endhighlight %}

Setting the colours of the other elements was a bit more tricky, I did it like this

{% highlight Javascript linenos %}
const selectedBackgroundColour = "yellow";
const selectedTextColour = "green";
const notSelectedBackgroundColour = "blue";
const notSelectedTextColour = "#FFFFFF";

function setupTileColours(bg, textArea, selected) {
  bg.style.fill = selected ? selectedBackgroundColour : notSelectedBackgroundColour;
  textArea.style.fill = selected ? selectedTextColour : notSelectedTextColour;
}

function setupTileList(data) {
    tileList.delegate = {
      getTileInfo: (index) => {
        const poolType = (data[index].type === "header") ? "header-pool" : "item-pool";
        return {
          type: poolType,
          data: data[index],
        };
      },
      configureTile: (tile, info) => {
        if (info.data.type === "header") {
          tile.getElementById("item-header-text").text = info.data.text;
        } else {
          const bg = tile.getElementById("item-background");
          const checkBoxTile = tile.getElementById("item-text");
          const textArea = checkBoxTile.getElementById("header");

          checkBoxTile.text = info.data.text;
          setupTileColours(bg,textArea,info.data.selected);

          checkBoxTile.value = info.data.selected ? 1 : 0;
          checkBoxTile.onclick = (evt) => {
            info.data.selected = !info.data.selected;
            setupTileColours(bg,textArea,info.data.selected);
          };
        }
      }
    };
}
{% endhighlight %}

Note that as the rendered colours are dependent on the current checked state I need to also call `setupTileColours` in the `onclick` handler.

{% include widgets/image.html src='/images/jekyll/2020-04-01/colours.png' width='300' height='300' title='Coloured checkboxes' %}

The colours are pretty extreme and are only here as an example.

## Setting the height of a virtual checkbox tile

One annoyance with the list was after the list was refreshed, that is the underlying data was changed and `setupTileList` called again, the the text was not drawn correctly. If the text was too long to fit on one row I wanted it to wrap down onto the next line rather than being truncated. For example the top item of the list is actually "dark chocolate".

{% include widgets/image.html src='/images/jekyll/2020-04-01/bad.png' width='300' height='300' title='truncated text' %}

I noticed that if I "clicked" (or tapped) on the item when it was redrawn it was correct like this

{% include widgets/image.html src='/images/jekyll/2020-04-01/clicked.png' width='300' height='300' title='wrapped text' %}

This was great but I wanted it to be drawn correctly as soon as the list was refreshed. I wondered what would happen if I tried to force the redraw in code like this.

{% highlight Javascript linenos %}
function setupTileList(data) {
    tileList.delegate = {
      getTileInfo: (index) => {
        const poolType = (data[index].type === "header") ? "header-pool" : "item-pool";
        return {
          type: poolType,
          data: data[index],
        };
      },
      configureTile: (tile, info) => {
        if (info.data.type === "header") {
          tile.getElementById("item-header-text").text = info.data.text;
        } else {
          const bg = tile.getElementById("item-background");
          const checkBoxTile = tile.getElementById("item-text");
          const textArea = checkBoxTile.getElementById("header");

          checkBoxTile.text = info.data.text;
          setupTileColours(bg,textArea,info.data.selected);

          // check the box - a funky approach to force a redraw and resize if the text is multi line
          if (info.data.selected) {
            checkBoxTile.value = 1;
          } else {
            checkBoxTile.value = 1;   // force redraw
            checkBoxTile.value = 0;
          }

          checkBoxTile.onclick = (evt) => {
            info.data.selected = !info.data.selected;
            setupTileColours(bg,textArea,info.data.selected);
          };
        }
      }
    };
}
{% endhighlight %}

It worked, I know this is a little bit of a hack but needs must.

{% include widgets/image.html src='/images/jekyll/2020-04-01/forced in code.png' width='300' height='300' title='wrapped text' %}

If anyone knows a better way then please let me know.

[versa-url]:                    https://www.fitbit.com/nz/shop/versa
[fitbit-sdk-url]:               https://dev.fitbit.com/build/guides/
[views-guide-url]:              https://dev.fitbit.com/build/guides/user-interface/svg-components/views/
[vtilelist-example-url]:        https://community.fitbit.com/t5/SDK-Development/Example-for-VirtualTileList/td-p/2677410
[checkbox-example-url]:         https://community.fitbit.com/t5/SDK-Development/Checkbox-component/td-p/2577867
[list-example-url]:             https://github.com/adiroiban/fitbit-os-assistant-relay
[checkbox-colour-url]:          https://community.fitbit.com/t5/SDK-Development/Change-color-of-checkbox/td-p/2673670


