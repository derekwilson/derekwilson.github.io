---
layout: post
title: "Data Migration"
date: 2017-03-14 12:00:00
published: true
tags: ["Development", "General", "Web", ".Net"]
categories: ["Development", "General", "Web", ".Net"]
---

In the [previous post](/blog/2017/02/21/moving-on) I was looking at moving my site from GoDaddy to [Github](https://github.com) and [Azure](https://azure.microsoft.com/en-us/). The main dynamic part of my web site is my [books catalogue](https://dereksbooks.azurewebsites.net). The catalogue has been a pet project for me for many years.

Really the only user of the catalogue is me, its still my card index but I use it to experiment and practice with new frameworks and techniques on a real life data set.


| Year         | Platform | Data Store | Data Update | Data Access | Render |
|:-------------|:------------------|:------|:------|:-----|:-----|
| 1970's       | Box | Card | Pen | Look | none |
| 1980's       | [Atari ST](https://en.wikipedia.org/wiki/Atari_ST) | [Superbase](https://en.wikipedia.org/wiki/Superbase_(database)) | IDE | IDE | none |
| 1990's       | Windows | [Microsoft Access](https://en.wikipedia.org/wiki/Microsoft_Access) | Custom [VBA](https://en.wikipedia.org/wiki/Visual_Basic_for_Applications) App | Access | none |
| 1996         | IIS [ASP](https://en.wikipedia.org/wiki/Active_Server_Pages) | Microsoft Access | Custom VBA App | Conv2XML, XSLT | HTML |
| 2007         | IIS [ASP.NET](https://en.wikipedia.org/wiki/ASP.NET) | [SQLite](https://en.wikipedia.org/wiki/SQLite) | [SQLite Manager Firefox Addin](https://github.com/lazierthanthou/sqlite-manager) | [NHibernate](https://en.wikipedia.org/wiki/NHibernate) | [Web Forms](https://msdn.microsoft.com/en-us/library/ms973868.aspx), [jQuery](https://jquery.com) |
| 2012         | IIS [ASP.NET MVC](https://en.wikipedia.org/wiki/ASP.NET_MVC) | [SQLServerCE](https://en.wikipedia.org/wiki/SQL_Server_Compact) | [SQLCE40 Toolbox](https://github.com/ErikEJ/SqlCeToolbox) | NHibernate (Medium Trust) | Web Forms, jQuery
| 2017         | [ASP.NET Core](https://en.wikipedia.org/wiki/ASP.NET_Core) | SQLite | [SQLiteSpy](https://www.yunqa.de/delphi/products/sqlitespy/index) | [Dapper](https://github.com/StackExchange/Dapper) | [Razor](https://en.wikipedia.org/wiki/ASP.NET_Razor), jQuery

## A better card index

For well over a decade the catalogue was just a better card index system. Keeping data records in Superbase or Access was just easier than manually filing and editing paper cards, also as my book collection grew the card index was a bit tricky to query.

## The internet

In 1996 I got my first hosted web space and wanted to put my catalogue online so it could be accessed from anywhere. I used a local hosting provider which basically gave me space to host static HTML, there was some ability to run ASP Classic, but no documentation or support if anything went wrong, this was private hosting in the mid 90's.

So I took the existing Access Database project and wrote a small app to dump the database as XML and then used XSLT to generate static HTML pages and copied them to the site. 

{% include widgets/image.html src='/images/wordpress/2008/10/bookssite.gif' width='250' height='300' title='Screen' %}

It might sound quite primitive but it worked reliably and generated a fast reliable site. In fact I still have one of the [last generations](/derek/webgen/booksite/html/framework.htm) of the site and it still works fine.

## Dynamic generation

I did find the static generation of the catalogue to be fast and reliable, OK searching was a clunky ASP Classic page but all in all it was still serving its purpose 10 years on. In the end I moved to a dynamically generated site because I could. I wanted to start a blog and that needed a proper host, rather than a site for static HTML. I moved host to a Windows based server that could provide Wordpress hosting, as a by product of this I could also now gost ASP.NET dynamic content so I converted the site largely because I could.

It did require quite a lot of migration. Access cannot be used in a web environment so I opted for SQLite and the migration of the data required me to recompose the XSLT to produce SQL Insert statements rather than HTML. The schema I needed to write from scratch but it wasn't that hard.

I used NHibernate on a whim, we were using an ORM at work but it wasn't NHibernate and I wanted to compare it to see what it was like.

## No all computers are the same

I really am not comfortable with Wordpress PHP and wanted to move to a new platform. I needed .NET v4 and my host did provide it, so I moved to GoDaddy to get v4.

Then I learnt that there were slight differences in what my host provided in a Windows IIS host. I suspect as we make use of more hosted services I am going to learn this a lot going forward. GoDaddy runs in medium trust, this makes sense in a shared environment, I could get Full trust but it costs more.

SQLite [cannot run in medium trust](https://forums.iis.net/t/1161500.aspx?Medium+trust+and+SQLite) so I needed to migrate to SQLServer CE [which can](https://weblogs.asp.net/scottgu/new-embedded-database-support-with-asp-net). Luckily the very excellent SQLCE40 Toolbox was good at importing data and the schema definition language is so similar porting the schema was easy.

I managed to hang on to NHibernate, just. Dynamic proxies are not possible in Medium Trust but I could have [pre-generated](http://www.nhforge.org/wikis/howtonh/pre-generate-lazy-loading-proxies.aspx) them, but in the end just used some that [someone else had generated](http://iamdotnetcrazy.blogspot.co.nz/2010/09/how-to-get-fluent-nhibernate-nhibernate.html).

While I was about it I moved to MVC which enabled me to [layer](https://en.wikipedia.org/wiki/Abstraction_layer) the code better and provide a proper set of models and a [repository pattern](https://martinfowler.com/eaaCatalog/repository.html).

## Full circle

And then after moving to a dynamically generated site a decade ago, I decided tp move my blog to GitHub Pages where it is generated from markdown into static HTML, much like my original books catalogue.

Obviously I cannot host the MVC books catalogue in Github Pages so I needed a new home. I decided to move it to Azure and linking to it from my blog.

I had disliked moving to SQLServer CE and only did it because I was forced. So the first thing was to migrate back to SQLite, this was pretty easy, I still had the old schema and the SQLCE40 Toolbox could generate Insert statement text files.

Ditto with NHibernate, I had adopted is as an experiment and it was fine at what it did, and in a large line of business app I am sure it would be great, in my catalogue it was overkill. I had used and liked the simplicity and speed of Dapper so moved over to it.

Also and as an experiment I though I would upgrade to the latest MVC. This meant that I was so close to move off .NET (and Windows) to .NETCore that I decided to go the final step. 

So now I have a lightweight site that can be hosted in Azure (or probably any other provider), using Windows or Linux, in fact I am playing around with the idea of putting it on a Raspberry Pi running Ubuntu.

The client side has remained the same so its a clunky 10 year old collection of HTML, maybe I'll find some time soon to rewrite it.

## What have I learnt

### Database and ORM - patterns and interfaces

One of the perceived advantages of an ORM is that it can enable an app to swap database providers. In this instance I was swapping both ORM and database. My experience was that the ORM does isolate the app from the database and as a consequence swapping is possible. In fact this is what I did in 2012 when I went to SQLServer CE. 

Swapping both wasn't that much harder. In this instance having a repository pattern and programming against an interface was a lifesaver. The controller and view model logic were unaffected by the changes in the data access layer.

### View render engine - simple views

Web Forms are not available in .NETCore so I had to use Razor. Having very simple views that had no logic but were just containers for HTML was great, it meant that migrating was a simple search and replace for syntax changes.

### Layers are good

I know this is very basic but keeping code isolated in layers has helped my replace modules as I go. For example I have been able to work on the backed database and data access layers without disturbing the front end. Of course this does mean that the front end is looking a bit shabby and in need of some love but when I have some time I can get to it in isolation. 

