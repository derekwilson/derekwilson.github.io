---
layout: post
title:  "Timestyle updated"
date:   2020-10-25 12:00:00
published: true
tags: ["Gadgets", "General", "JavaScript", "Fitbit"]
categories: ["Gadgets", "General", "JavaScript", "Fitbit"]
---

The last update to my [Timestyle for Fitbit][timestyle-fitbit-url] watchface was six months ago in it I addressed [memory issues][previous-post-url] when launching the watchface

## Active Zone Minutes

The main reason for the update was to add support for Fitbit's new [Active Zone Minutes][azm-url]. This required updating the [SDK][sdk-42-url] to version 4.2 and then rebuilding the watchface.

Adding support for Active Zone Minutes was pretty straightforward

{% highlight Javascript linenos %}
function getAzm() {
  let val = (today.adjusted.activeZoneMinutes.total || 0);
  return {
    pretty: convertNumberToK(val)
  }
}

function convertNumberToK(num) {
  if (num > 999) {
    if (num > 100000) {
      return (num/1000).toFixed(0) + 'k' 
    } else {
      return (num/1000).toFixed(1) + 'k' 
    }
  }
  return num;
}
{% endhighlight %}

However I was a little worried as I needed to add this code and an icon for the display and as I noted six months ago memory is tight.

## Memory

The release notes for the new SDK did say that [more memory was available for the newer watches][sdk-memory-url]. This was great for those watches but I still had to support the older watches as well.

I had measured the memory footprint as I optimised six months ago. During that optimisation I reordered the way the code was executed on launch, step 3.

{% include widgets/image.html src='/images/jekyll/2020-03-01/optimisations.png' width='600' height='300' title='Memory used on launch' %}

I was pleasantly surprised to note that after upgrading the SDK and building v1.5 of the clockface that the memory footprint of the clockface had improved by about 5K, or almost 10%.

{% include widgets/image.html src='/images/jekyll/2020-10-01/memory15.png' width='600' height='300' title='Memory used with SDK 4.2' %}

I celebrated by adding some extra colours to match shirts that I have.

[previous-post-url]:            /blog/2020/03/01/fitbit-memory-management
[timestyle-fitbit-url]:         https://gallery.fitbit.com/details/dfe5fccd-01e5-4979-a5ad-070673df12dd
[timestyle-source-url]:         https://bitbucket.org/derekwilson/timestyle-fitbit/src/master/
[sdk-42-url]:                   https://dev.fitbit.com/blog/2020-09-10-announcing-fitbit-os-sdk-4.2/
[sdk-memory-url]:               https://dev.fitbit.com/blog/2020-09-10-announcing-fitbit-os-sdk-4.2/#double-memory-for-versa-2
[azm-url]:                      https://blog.fitbit.com/active-zone-minutes/

