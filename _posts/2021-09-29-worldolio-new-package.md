---
layout: post
title: "New package for Worldolio"
date: 2021-09-29 12:00:00
published: true
tags: [".Net", "Worldolio", "Development"]
categories: [".Net", "Worldolio", "Development"]
---

This month we have created a new [package for Worldolio][worldolio-chocolatey]. [Worldolio][wo-url] is an application that enables you to keep track of various geographical information for cities around the world. [Wordlolio][wo-url] was implemented as a [web site][wo-site], a mobile app ([Windows Mobile][windows-mobile], remember that) and a [Windows desktop application][wo-net]

We pretty much stopped work on Worldolio in 2008, apart from doing some very minor maintenance work. I do still use the [desktop version][wo-net] and was keen to continue to do so but there were a couple of problems I wanted to fix

1. Because it installed into the `Program Files` folder and the app writes its state back to the folder it started in it requires administrator permissions to run, if it installed into an unprotected folder then it could run as a normal program.
1. It uses .NET 3.5, on older versions of Windows (Vista, XP, 7) that was fine but on Windows 10 it insisted on installing .NET 3.5 instead of using .NET 4 which was already installed. Worldolio can run using .NET 4 but needs a config file to stop the user being prompted to install .NET 3.5

We started the project using Visual Studio 2003 and pretty much the only maintenance we have done it to upgrade the project file. When I tried to upgrade to Visual Studio 2017 everything worked fine except the old installer project, that produced the `msi` file was no longer supported. I've found this to be a common problem, mainstream project types get pretty good upgrade support as Visual Studio evolves, the more obscure project types, such as MSI creators not so much.

So in an effort to have a more robust solution I looked around the package installer scene for Windows. I had spotted [winget][winget-url] and thought that it was the obvious solution but it [does not support ZIP file installs][winget-zip] at the moment and its Windows 10+ only. So I had a look at [Chocolatey][chocolatey-url], it seemed to fit the bill, it supported Windows 7 and ZIP installs and seemed robust and mature and better yet it had a public community repo so we could publish the app for the first time. 

So without much effort we have produce a [worldolio package for chocolatey][worldolio-chocolatey].

## Installing Chocolatey on Windows 7

One thing that isn't completely obvious, as the [old TLS security was dropped by Chocolatey][chocolatey-tls] and Windows 7 was released before all this you need to make sure that Windows 7 can do TLS 1.2 from Powershell. The easiest way to do this is to install the [Windows Management Framework 5.1][wmf-51], which will upgrade Powershell as well.

## Running on .NET 3.5 or .NET 4

To get worldolio so that it would just run with the currently installed .NET Framework on Windows 7 and Windows 10 was a bit of a trick. I can across [this great article][config-setup] which explained how to setup the `.exe.config` file up. I wanted the app to use .NET 3.5 if it was available (on either Windows 7 or 10) and fallback to using .NET 4 if it was available. It turns out that the `.exe.config` file needed to be like this

{% highlight Xml linenos %}
<?xml version="1.0"?>
<configuration>
  <startup>
    <supportedRuntime version="v2.0.50727"/>
    <supportedRuntime version="v4.0"/>
  </startup>
  <runtime>
  </runtime>
</configuration>
{% endhighlight %}


[chocolatey-url]:       https://chocolatey.org
[worldolio-chocolatey]: https://community.chocolatey.org/packages/worldolio
[chocolatey-tls]:       https://blog.chocolatey.org/2020/01/remove-support-for-old-tls-versions/
[wo-url]:               https://worldolio.azurewebsites.net/default.aspx?ctrl=tab
[wo-site]:              https://worldolio.azurewebsites.net/Pages/WOWebApp/addmap.aspx
[wo-net]:               https://worldolio.azurewebsites.net/Pages/WOWin/default.aspx?ctrl=tab
[windows-mobile]:       https://en.wikipedia.org/wiki/Windows_Mobile
[winget-url]:           https://en.wikipedia.org/wiki/Windows_Package_Manager
[winget-zip]:           https://github.com/microsoft/winget-cli/issues/140
[wmf-51]:               https://www.microsoft.com/en-us/download/details.aspx?id=54616
[config-setup]:         https://www.codeproject.com/Articles/886256/NET-Versioning-and-Multi-targeting-on-Csharp-Appli