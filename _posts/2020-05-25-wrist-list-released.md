---
layout: post
title:  "wrist-list released"
date:   2020-05-25 12:00:00
published: true
tags: ["General", "JavaScript", "Fitbit"]
categories: ["General", "JavaScript", "Fitbit"]
---

## wrist-list

I have release a new app this month. Its called [wrist-list][wrist-list-url] and its a todo list for [Fitbit OS devices][fitbit-smartwatches-url].

The primary use case for the app is to be able to check off shopping items as you go around the supermarket without having to keep on getting your phone out. Hopefully it can also be used for may other todo list use cases.

wrist-list is not designed to edit and maintain lists, rather it will display lists from you chosen mobile todo list app conveniently on your wrist. 

The main workflow is that you use your todo list application to produce your list, for example [Google Keep][keep-url], then get the list onto the clipboard and paste it into the [wrist-list][wrist-list-url] app settings page on your phone and then send it to your device. Once the list is on your device you can check and un-check items. If you exit the app on your device the list and all the check marks are saved until you either reset the list or send a new list from your phone.

## Settings

The todo list is controlled from the settings page of the wrist-list app within the Fitbit companion app.

{% include widgets/image.html src='/images/jekyll/2020-05-01/screenb1.png' width='300' height='600' title='Settings' %}

The main items on this page are

### Separators

Separators are used to split the text into list items as it is pasted into [wrist-list][wrist-list-url].

Use the `Add Separator` button to make new separators active and the `Edit` button to deactivate any active separators. By default the separators are setup to work with Google Keep which uses `[x]` and `[ ]`, but other applications will use different separators.

The complete list of available separators is
- `[x]`
- `[ ]`
- `,`
- `;`
- `+`
- `-`
- `*`

You cannot use a separator within an item in the list

### The todo list

To get your list from Google Keep

- Open Keep on your phone, goto the main screen that displays your lists
- Long press on a list
- From the overflow menu select "Send"

{% include widgets/image.html src='/images/jekyll/2020-05-01/screena1.png' width='300' height='400' title='Settings' %}

- On the share menu, either copy it to the clipboard or send it to an app where you can copy the list to the clipboard

{% include widgets/image.html src='/images/jekyll/2020-05-01/screena2.png' width='300' height='500' title='Settings' %}

- On older versions of Android it might look like this

{% include widgets/image.html src='/images/jekyll/2020-05-01/screena21.png' width='300' height='500' title='Settings' %}

- In the Fitbit companion app goto the settings page for [wrist-list][wrist-list-url].
- Select the todo list, clear any content, long press and paste the clipboard. 

{% include widgets/image.html src='/images/jekyll/2020-05-01/screena3.png' width='300' height='600' title='Settings' %}

### Sending the list

In the Fitbit companion app goto the settings page for [wrist-list][wrist-list-url].

The Fitbit app will not display the [wrist-list][wrist-list-url] settings page unless you have internet access. However you can preload the list onto your device in advance and it will be available for use without internet access.

Remember you must have wrist-list running on your Fitbit device before you can send the list, its not possible to start it automatically so you will need to do this manually.

{% include widgets/image.html src='/images/jekyll/2020-05-01/screenb2.png' width='300' height='600' title='Settings' %}

Select `Send to device` and it should look something like this on your device

{% include widgets/image.html src='/images/jekyll/2020-05-01/screenc1.png' width='200' height='200' title='Settings' %}

Your device will vibrate to confirm the list has been received.

#### Processing the list while sending

When the list is send to the device some extra processing is done, this does not affect the original list only the list that is sent.

- Spaces are trimmed and empty items are removed
- Items can optionally be sorted alphabetically
- Checked items can optionally be removed, checked items are those marked with `[x]` or `+`


[wrist-list-url]:               https://gallery.fitbit.com/details/0c065eb4-008f-46ed-9929-e1d62c9a11e3
[keep-url]:                     https://play.google.com/store/apps/details?id=com.google.android.keep&hl=en
[fitbit-smartwatches-url]:      https://www.fitbit.com/us/products/smartwatches
