---
layout: post
title: "Data Migration"
date: 2017-02-14 12:00:00
published: true
tags: ["Development", "General", "Web", ".Net"]
categories: ["Development", "General", "Web", ".Net"]
---

In the [previous post](/blog/2017/02/21/moving-on) I was looking at moving my site from GoDaddy to [Github](https://github.com) and [Azure](https://azure.microsoft.com/en-us/). The main dynamic part of my web site is my [books catalog](https://dereksbooks.azurewebsites.net). The catalog has been a pet project for me for many years. Its not really useful for amyone but me but it helps me keep my hand in building and migrating data that is useful to me. Its been around for quite a while, it started as a card index before I owned a computer and I've kept it going ever since.

| Year         | Platform | Data Store | Data Update | Data Access | Render |
|:-------------|:------------------|:------|:------|:-----|:-----|
| 1970's       | Box | Card | Pen | Look | none |
| 1980's       | Atari ST | Superbase | IDE | IDE | none |
| 1990's       | Windows | Microsoft Access | Custom VBA App | Access | none |
| 1996         | IIS ASP | Microsoft Access | Custom VBA App | Conv2XML, XSLT | HTML |
| 2007         | IIS ASP.NET | SQLite | Firefox Addin | NHibernate | ASPX, jQuery |
| 2012         | IIS ASP MVC | SQLCE40 Toolbox | SQL Server CE Tools | NHibernate (Medium Trust) | MVC v3 jQuery
| 2017         | .NET Core | SQLite | SQLiteSpy | Dapper | ASP.NETCore jQuery

