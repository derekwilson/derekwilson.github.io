---
layout: post
title: "An image widget for liquid"
date: 2017-05-25 12:00:00
published: true
tags: ["Development", "General", "Web"]
categories: ["Development", "General", "Web"]
---

This year I [migrated][migrate-post-url] my blog to [Github Pages][github-pages-url]. I am super impressed by the move hosting on github is incredibly fast.

There are a few things that I took for granted in my old work flow. One was the way that if I inserted an image into a post then Windows Live Writer would insert a small thumbnail and link to the full image. I didnt realist how useful this was until I wrote one of my [first posts][example-post-url].

So I decided that I should be able to recreate this mechanism using Jekyll's [liquid][liquid-url] template engine

What I wanted was a widget so that I could write something like this

```html
{% raw  %}
{% include widgets/image.html src='/images/jekyll/2017-01-01/screen5b.png' width='150' height='300' title='Screen' %}
{% endraw  %}
```

What I ended up with in the widget was this

```html
{% raw  %}
<a href="{{ include.src }}">
    <img 
        title="{{ include.title }}" 
        style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" 
        alt="{{ include.title }}" 
        src="{{ include.src }}" 
        width="{{ include.width }}" 
        height="{{ include.height }}" 
    />
</a>
{% endraw  %}
```

And this renders as

```html
<a href="/images/jekyll/2017-01-01/screen5b.png">
    <img 
		title="Screen" 
		style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" 
		alt="Screen" 
		src="/images/jekyll/2017-01-01/screen5b.png" 
		width="150" 
		height="300" />
</a>
```

This replaces my include line with an A element that links to the original image and within the A element is a rescaled IMG with the specified dimensions. I have included inline styles so that the whole widget is in one file. OK, it is a bit more manual but its not that cumbersome.  

[migrate-post-url]:		/blog/2017/02/21/moving-on
[github-pages-url]:		https://pages.github.com
[liquid-url]:			https://jekyllrb.com/docs/templates/
[example-post-url]:		/blog/2017/01/26/recommender-new-version
