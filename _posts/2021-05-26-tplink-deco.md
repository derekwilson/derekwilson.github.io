---
layout: post
title:  "Another Gadget: TP-link Deco Mesh Network"
date:   2021-05-26 12:00:00
published: true
tags: ["Gadgets", "General"]
categories: ["Gadgets", "General"]
---


I have moved house again and as part of the process, for reasons that are too complex but trivial to go into, I ended up with a free offer of a [mesh network from my ISP, Vodafone][vodafone-url]. The deal was a two pack of [TP-Link Deco X20s][x20-url] which is part of the [TP-Link Deco Mesh Network][deco-url] product line.

I had not really used a mesh network before as I thought it might be overkill in a domestic setting. The thing that convinced me to try it, apart from it being free, was that the new house has a main building and then a large garage at the bottom of the garden, around 15 meters from the main house. We wanted to make use of the large, insulated garage as a hobby space and wanted internet wifi access there.

My existing setup was a TP-Link Archer C7 router and although I like the router and its provided excellent service for a couple of years it could only just reach the garage and the connectivity was patchy at best.

I decided to measure the speed in various locations before and after getting the mesh network working. The mesh network was configured in access point mode and plugged into the C7 router, the router wifi was disabled. The primary mesh node was in the study and the second node in the garage.

The locations I tested were:

* **Study** The room next to the ONT/Router. I tested both wired and wireless connections here, the wired one is a little unfair as its a gigabit switch straight onto the internet. When tested with the mesh the primary node was in this room.
* **Lounge** A room in the house as far away from the router as possible
* **Garage** 15 meters from the house, when tested with the mesh the second node was in the garage.

I tested using a Windows PC and an Android phone. I used the domestic fibre providers [speed test][speed-url] each time to get the figures. For the purposes of general browsing and audio streaming its the download speed that has the most impact.

### TP-Link Archer C7 (no mesh)

|                      | Study        |             |             | Lounge      | Garage       |              |
|                      | PC Wired     | PC WiFi     | Phone WiFi  | PC WiFi     | PC WiFi      | Phone WiFi   |
|:---------------------|:-------------|:------------|:------------|:------------|:-------------|:-------------|
| Ping                 | 3            | 5           | 7           | 18          | 18           | 4            |
| Jitter               | 1            | 1           | 3           | 1           | 4            | 4            |
| **Download (Mbps)**  | **101**      | **52**      | **41**      | **20**      | **16**       | **20**       |
| Upload (Mbps)        | 21           | 21          | 20          | 20          | 21           | 12           |

The wired connection is very fast. Also the garage figures are flattering as they were taken with the main door open, if the door was closed then often no connection was possible.

### Deco Mesh (2 x X20)

|                      | Study        |             |             | Lounge      | Garage       |              |
|                      | PC Wired     | PC WiFi     | Phone WiFi  | PC WiFi     | PC WiFi      | Phone WiFi   |
|:---------------------|:-------------|:------------|:------------|:------------|:-------------|:-------------|
| Ping                 | 3            | 3           | 8           | 3           | 6            | 10           |
| Jitter               | 1            | 2           | 9           | 5           | 3            | 1            |
| **Download (Mbps)**  | **101**      | **61**      | **72**      | **56**      | **60**       | **74**       |
| Upload (Mbps)        | 21           | 23          | 23          | 23          | 23           | 23           |

The mesh network makes no difference to the wired connection but the wireless connection has been significantly improved. The phone seems to deliver better performance over wireless, I think this is because it can do 5GHz but the PC was limited to 2.4GHz just because it was an old PC.

So all in all I am pretty happy with the mesh network.

[vodafone-url]:     https://www.vodafone.co.nz/broadband/superwifi
[deco-url]:         https://www.tp-link.com/us/deco-mesh-wifi/product-family/
[x20-url]:          https://www.tp-link.com/us/deco-mesh-wifi/product-family/deco-x20/
[speed-url]:        https://www.chorus.co.nz/speed-test

