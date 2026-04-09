---
layout: post
title:  "wrist-list for Amazfit/ZeppOS released"
date:   2026-04-07 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "ZeppOS", "Wrist-list"]
categories: ["Gadgets", "General", "JavaScript", "ZeppOS", "Wrist-list"]
---

## wrist-list

A couple of years ago I bought an [Amazfit Bip5 Unity][previous-post-1-url] and I [ported my watchface][previous-post-2-url] to the Amazfit/ZeppOS device. I have now ported wrist-list for [Amazfit/ZeppOS devices][amazfit-url].

The primary use case for the app is to be able to check off shopping items as you go around the supermarket without having to keep on getting your phone out. Hopefully it can also be used for many other todo list use cases.

wrist-list is not designed to edit and maintain lists, rather it will display lists from you chosen mobile todo list app conveniently on your wrist. 

The main workflow is that you use your todo list application to produce your list, for example [Google Keep][keep-url], then get the list onto the clipboard and paste it into the wrist-list app settings page on your phone and then send it to your device. Once the list is on your device you can check and un-check items. If you exit the app on your device the list and all the check marks are saved until you either reset the list or send a new list from your phone.

## Settings

The todo list is controlled from the settings page of the wrist-list app within the Zepp app on your phone.

1. Open Zepp app on your phone
1. Select the Device tab, the rightmost tab at the bottom of the screen
1. Then select More in the Device App Settings panel
1. Then select wrist-list

You should see a page like this

{% include widgets/image.html src='/images/jekyll/2026-04-01/1.png' width='300' height='600' title='Settings' %}

The main items on this page are

### Import Options

#### Separator

Separators are used to split the text into list items as it is pasted into wrist-list. 

1. Google Keep, is used when importing lists from Google Keep, see below for details of importing
1. CSV, uses comma and semicolon `,;` as a separator
1. Markdown, uses asterisk plus and minus `*+-` as a separator

In addition spaces are trimmed from each items and empty items are removed

#### Sort Items

If selected then the items are sorted alphabetically as they are imported. Otherwise the items are left in the order they were in the source text.

#### Delete Checked Items

If selected then items that have been checked in the source text are removed as they are imported. Otherwise all items are imported, the checked items are marked as checked. The identification of checked items depends on the source separator format. For Google Keep checked items start with `[x]`, for markdown checked items start `+`

### Other options

#### Group Checked Items

If selected then checked items are placed together at the bottom of the list, otherwise they appear throughout the list where they were originally imported. This will apply when items are imported and also as they are checked on the watch.


### Import

When you select import then a panel is displayed with a text entry field. You should either type items that you want to import into the list here, or perhaps more easily paste them into the text field. The typed or pasted text needs to include your selected separator style.

For example getting your list from Google Keep

- Open Keep on your phone, goto the main screen that displays your lists
- Long press on a list
- From the overflow menu select "Send"

{% include widgets/image.html src='/images/jekyll/2026-04-01/keep1.png' width='300' height='400' title='Keep' %}

- On the share menu, either copy it to the clipboard or send it to an app where you can copy the list to the clipboard. Different versions of Android will present the share options differently

{% include widgets/image.html src='/images/jekyll/2026-04-01/keep2a.png' width='300' height='500' title='Share' %}
{% include widgets/image.html src='/images/jekyll/2026-04-01/keep2b.png' width='300' height='500' title='Share' %}
{% include widgets/image.html src='/images/jekyll/2026-04-01/keep2c.png' width='220' height='500' title='Share' %}
{% include widgets/image.html src='/images/jekyll/2026-04-01/keep2d.png' width='220' height='500' title='Share' %}

- Goto the settings page of the wrist-list app within the Zepp app on your phone as detailed above
- Select Reset if you want to start a new list, or do not if you just want to add to a list
- Select Import
- Clear any existing text you do not want
- Long press on the text entry field and select paste

You do not need to have wrist-list open on your watch to transfer the list, the next time it is opened on you watch then the list will be updated.

{% include widgets/image.html src='/images/jekyll/2026-04-01/device1.png' width='200' height='238' title='List' %}

### Reset

This will remove all items from the current list. When you import items they are added to the list so you may want to reset before starting a new list.

### The todo list

This is the current list of items. Items can be deleted from wrist-list however it will not delete the items from the source app. This list is kept in sync with the one on your watch, it also shows the number of items and the number checked. 

## Installing wrist-list

You can install it on any Amazfit watch that uses ZeppOS v3 or better by using the Zepp App on your phone and going to device tab and selecting the App Store. You can search for wrist-list or find it in the Utilities section

{% include widgets/image.html src='/images/jekyll/2026-04-01/store1.jpg' width='150' height='300' title='wrist-list' %}
{% include widgets/image.html src='/images/jekyll/2026-04-01/store2.jpg' width='150' height='300' title='wrist-list' %}
{% include widgets/image.html src='/images/jekyll/2026-04-01/store3.png' width='150' height='300' title='wrist-list' %}

The [source code][source-url] for wrist-list is publicly available and open source.

## Success criteria

I try and think what I would want as success criteria when launching an app. My previous ZeppOS app [Timestyle+ achieved 1,000 downloads][previous-post-2-url] in the first two months. I thought that anything better than that would be good.

{% include widgets/image.html src='/images/jekyll/2026-04-01/downloads1.png' width='500' height='300' title='Total Downloads' %}

There have been over 2,500 downloads of wrist-list in the first month.

[keep-url]:                     https://play.google.com/store/apps/details?id=com.google.android.keep&hl=en
[amazfit-url]:                  https://www.amazfit.com/pages/watch-classify

[previous-post-1-url]:          /blog/2024/10/01/amazfit-bip5
[previous-post-2-url]:          /blog/2025/03/31/timestyle-zeppos

[source-url]:                   https://bitbucket.org/derekwilson/wrist-list/src/master/

