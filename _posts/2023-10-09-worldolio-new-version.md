---
layout: post
title: "Worldolio updated"
date: 2023-10-09 12:00:00
published: true
tags: [".Net", "Worldolio", "Development"]
categories: [".Net", "Worldolio", "Development"]
---

In my [previous-post][previous-post-1-url], in May, I did say that I would no longer feel compelled to post once a month, and indeed it turns out that's exactly what has happened. I did also say that I would continue to learn and work on personal projects and with that in mind I have made some progress.

[Worldolio][wo-url] is an application that enables you to keep track of various geographical information for cities around the world. It was a collaborative project that was started 20 years ago but we have not really updated it since 2008. A while ago I did produce a [package available on Chocolatey][worldolio-chocolatey] to enable the 2008 build to be easily installed.

I have been away for a number of months but on my return I managed to find some time to look into producing an update for the time zone data. The whole build mechanism was last run on Windows XP so it was a bit of challenge working out how to produce the update and documenting how it can be done in future.

In the 15 years since the last release there have been quite a number of changes to the time zone for the cities in Worldolio. The changes include the Russian Federation dropping DST and Turkey changing time zone.

Added new timezones:
- (UTC+03:00) Istanbul
- (UTC+06:00) Dhaka
- (UTC-05:00) Havana
- (UTC-05:00) Haiti
- (UTC+02:00) Tripoli
- (UTC+11:00) Norfolk Island
- (UTC+02:00) Khartoum
- (UTC+02:00) Damascus
- (UTC+03:00) Minsk
- (UTC-05:00) Turks and Caicos
- (UTC+03:00) Volgograd
- (UTC-07:00) Yukon

Updated timezones:
- (GMT-04:00) La Paz
- (UTC-01:00) Cabo Verde Is.
- (GMT+03:00) Moscow; St. Petersburg; Volgograd
- (GMT+05:00) Ekaterinburg
- (GMT+06:00) Almaty; Novosibirsk
- (GMT+07:00) Krasnoyarsk
- (GMT+08:00) Irkutsk; Ulaan Bataar
- (GMT+09:00) Yakutsk
- (GMT+10:00) Vladivostok

Removed timezones:
- (GMT+04:00) Yerevan
- (GMT-07:00) Chihuahua; La Paz; Mazatlan - Old
- (GMT-06:00) Guadalajara; Mexico City; Monterrey - Old

Corrected timezones for: Almaty, Ankara, Bishkek, Damascus, Dhaka, Havana, Istanbul, Khartoum, Minsk, Port-au-Prince, Tripoli, Volgograd, Whitehorse, Yerevan, Kingston, Grand Turk

I have updated [Windows desktop application][wo-net] and its [chocolatey package][worldolio-chocolatey] as well as the [web site version][wo-site].

Upgrading Worldolio from chocolatey is done by running `choco upgrade worldolio` in Powershell like this (you need to run the upgrade as an administrator)

```
Windows PowerShell
Copyright (C) 2016 Microsoft Corporation. All rights reserved.

PS C:\Data> choco list --local-only
Chocolatey v0.10.15
chocolatey 0.10.15
podcastutilities 3.1.0.0
podcastutilities-core 3.1.0.0
worldolio 2.0.0.0
4 packages installed.
PS C:\Data> choco upgrade worldolio
Chocolatey v0.10.15
Upgrading the following packages:
worldolio
By upgrading you accept licenses for the packages.

You have worldolio v2.0.0.0 installed. Version 2.0.1.0 is available based on your source(s).
Progress: Downloading worldolio 2.0.1.0... 100%

worldolio v2.0.1.0 [Approved]
worldolio package files upgrade completed. Performing other installation steps.
The package worldolio wants to run 'chocolateyinstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): y

Extracting C:\ProgramData\chocolatey\lib\worldolio\tools\\Worldolio.zip to C:\ProgramData\worldolio...
C:\ProgramData\worldolio
Added C:\ProgramData\chocolatey\bin\worldolio.exe shim pointed to 'c:\programdata\worldolio\worldolio.exe'.
 The upgrade of worldolio was successful.
  Software installed to 'C:\ProgramData\worldolio'

Chocolatey upgraded 1/1 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
PS C:\Data>
PS C:\Data> choco list --local-only
Chocolatey v0.10.15
chocolatey 0.10.15
podcastutilities 3.1.0.0
podcastutilities-core 3.1.0.0
worldolio 2.0.1.0
4 packages installed.
PS C:\Data>
```


[previous-post-1-url]:  /blog/2023/05/04/end-of-an-era
[previous-post-2-url]:  /blog/2021/09/29/worldolio-new-package
[chocolatey-url]:       https://chocolatey.org
[worldolio-chocolatey]: https://community.chocolatey.org/packages/worldolio
[chocolatey-tls]:       https://blog.chocolatey.org/2020/01/remove-support-for-old-tls-versions/
[wo-url]:               https://worldolio.azurewebsites.net/default.aspx?ctrl=tab
[wo-site]:              https://worldolio.azurewebsites.net/Pages/WOWebApp/addmap.aspx
[wo-net]:               https://worldolio.azurewebsites.net/Pages/WOWin/default.aspx?ctrl=tab
[wo-data-url]:          https://bitbucket.org/derekwilson/aad/src/master/Worldolio/Support/DataBase/README.md

