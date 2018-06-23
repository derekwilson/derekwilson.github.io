---
layout: post
title:  "PodcastUtilities and TLS"
date:   2018-06-22 12:00:00
published: true
tags: ["Development", "General", "PodcastUtilities", ".Net"]
categories: ["Development", "General", "PodcastUtilities", ".Net"]
---

We have built a new version of PodcastUtilities this month. The [source code][code-url] and a [prebuild package][download-url] for Windows is now available.

We do have plans for PodcastUtilities but for the moment we are doing maintenance releases.

We have started noticing that some podcast providers are using an encrypted channel to distribute podcasts. I am not completely sure what attack vector is being mitigated by this but some providers do and some dont. If a provider does decide to encrypt then there is a problem. The original encrypted standard SSL 3 and its successor TLS 1.0 is no [longer considered secure][tls-url]. This standard has deficiencies which were addressed by TLS 1.1 and TLS 1.2. The [PCI Council][pci-url] recommend that SSL 3 and TLS 1.0 be prohibited by July 2018.

As a result we have noticed a number of sites that do not offer podcasts on un-encrypted channels and also now refuse a connection using the older TLS 1.0.

This has meant we have seen errors like this.

```
Error in: Test Match Special
 System.IO.IOException: Received an unexpected EOF or 0 bytes from the transport stream.
   at System.Net.TlsStream.EndWrite(IAsyncResult asyncResult)
   at System.Net.PooledStream.EndWrite(IAsyncResult asyncResult)
   at System.Net.ConnectStream.WriteHeadersCallback(IAsyncResult ar)
```

The change in PodcastUtilities is to request that TLS 1.1 or TLS 1.2 be used, however this can only be done if the OS supports these protocols. The support on windows is not uniform and for versions before Windows 8 support needs to be manually added.

| Windows      | Support           |
|:-------------|:------------------|
| 10           | Built In          |
| 8            | Built In          |
| 7            | Must apply [patch][w7-url] |
| Server 2008  | Must apply [patch][w7-url] |
| Vista        | Maybe you can try these [instructions][vista-url] and apply [KB4019276][kb-url].<br/>I have not tried this so your mileage may vary |
| XP           | [No][xp-url]      |
| Server 2003  | [No][xp-url]      |

Where there is no support, for example Windows XP PodcastUtilities will be unable to download over an encrypted channel however non encrypted channels should continue to work. You could also try using a VPN as it may be acting as a TLS proxy for you.

The new version (2.2.2.0) is now in [GitHub][code-url] and also available as a [binary download][download-url] if you just want to run PodcastUtilities.

[download-url]:			https://github.com/derekwilson/PodcastUtilities/tree/master/_PreBuiltPackages
[code-url]:				https://github.com/derekwilson/PodcastUtilities
[pci-url]:				https://www.pcisecuritystandards.org/about_us/
[tls-url]:				https://en.wikipedia.org/wiki/Transport_Layer_Security
[w7-url]:				https://support.microsoft.com/en-us/help/3154518/support-for-tls-system-default-versions-included-in-the-net-framework
[xp-url]:				https://blogs.msdn.microsoft.com/kaushal/2011/10/02/support-for-ssltls-protocols-on-windows/
[vista-url]:			https://msfn.org/board/topic/176902-enabling-tls-1112-support-in-vistas-internet-explorer-9/
[kb-url]:				https://www.catalog.update.microsoft.com/Search.aspx?q=KB4019276
