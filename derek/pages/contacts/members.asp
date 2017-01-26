<%@ Language=VBScript %>

<%
'== jump to restricted area
'== params

if not CheckPassword("password","badminton") then
Response.Redirect("../../asp/register.htm")
end if

%>

<!--	#include virtual="/../asp/cookie.inc"-->
<!--	#include virtual="/../asp/protect.inc"-->

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html>

<head>

<meta name="GENERATOR" content="Microsoft FrontPage 3.0">
<title>Members</title>
</head>

<body stylesrc="../news_events.htm" background="../images/Backgrounds/Yellow.gif" bgcolor="#FFFFFF">

<h1><font face="Comic Sans MS" color="#004080">BOBS Members</font></h1>

<table border="0" cellpadding="5" width="800">
  <tr>
    <td width="106"><strong>Name</strong></td>
    <td width="103"><strong>Work 
            Tel</strong></td>
    <td width="270"><strong>Email</strong></td>
    <td width="270"><strong>Web</strong></td>
  </tr>
  <tr>
    <td width="106">Sarah Banks</td>
    <td width="103">0161 455 1725</td>
    <td width="270"><a href="mailto:sarahbanks99@hotmail.com">sarahbanks99@hotmail.com</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Louise Chance</td>
    <td width="103">0774 027 9130</td>
    <td width="270"><a href="mailto:louisechance@uk2.net">louisechance@uk2.net</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Richard Critten</td>
    <td width="103">n/a</td>
    <td width="270"><a href="mailto:bobs@greenview.demon.co.uk">bobs@greenview.demon.co.uk</a></td>
    <td width="270"><a href="http://www.greenview.demon.co.uk" target="_top">http://www.greenview.demon.co.uk</a></td>
  </tr>
  <tr>
    <td width="106">Alistair Davidson</td>
    <td width="103">07966 162 559</td>
    <td width="270"><a href="mailto:a1davidson1@netscapeonline.co.uk">a1davidson1@netscapeonline.co.uk</a></td>
    <td width="270">n/a</td>

  </tr>
  <tr>
    <td width="106">Hugh Everett</td>
    <td width="103">0161 905 6712</td>
    <td width="270"><a href="mailto:hugh_everett@uk.ibm.com">hugh_everett@uk.ibm.com</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Ian Livesey</td>
    <td width="103">0771 896 8825</td>
    <td width="270">
		<a href="mailto:ian.livesey@ntlworld.com">ian.livesey@ntlworld.com (home)</a><br>
		<a href="mailto:ian.livesey@uk.ibm.com">ian.livesey@uk.ibm.com (work)</a></td>
    <td width="270"><a href="http://www.ian.livesey.mcmail.com/" target="_top">http://www.ian.livesey.mcmail.com/</a>
    </td>
  </tr>
  <tr>
    <td width="106">Sue Livesey</td>
    <td width="103">n/a</td>
    <td width="270"><a href="mailto:sue.livesey@ntlworld.com">sue.livesey@ntlworld.com (home)</a></td>
    <td width="270">as Ian</td>
  </tr>
  <tr>
    <td width="106">Liz Rees</td>
    <td width="103">07977 141 451</td>
    <td width="270"><a href="mailto:liz@e-c-rees.freeserve.co.uk">liz@e-c-rees.freeserve.co.uk (home)</a><br>
					<a href="mailto:liz.rees@cis.co.uk">liz@liz.rees@cis.co.uk (work)</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Stephanie Slater</td>
    <td width="103">07941 221 994</td>
    <td width="270"><a href="mailto:mail@stephanieslater.com">mail@stephanieslater.com (home)</a></td>
    <td width="270"><a href="http://www.stephanieslater.com" target="_top">http://www.stephanieslater.com</a></td>
  </tr>
  <tr>
    <td width="106">Andrew Trevarrow</td>
    <td width="103">07980 862 292</td>
    <td width="270"><a href="mailto:andrew@andrewt.com">andrew@andrewt.com (home)</a><br>
					<a href="mailto:andrew.trevarrow@videocoding.com">andrew.trevarrow@videocoding.com (work)</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Derek Wilson</td>
    <td width="103">07941 212 312</td>
    <td width="270">
		<a href="mailto:mail@derekwilson.net">mail@derekwilson.net (home)</a><br>
		<a href="mailto:derek.wilson@uk.pwcglobal.com">derek.wilson@uk.pwcglobal.com (work)</a></td>
    <td width="270"><a href="http://www.derekwilson.net" target="_top">http://www.derekwilson.net</a></td>
  </tr>
  <tr>
    <td width="106">Siobhan Wilson</td>
    <td width="103">07771 973 079</td>
    <td width="270"><a href="mailto:siobhanw@freenet.co.uk">siobhanw@freenet.co.uk</a></td>
    <td width="270">n/a</td>
  </tr>
</table>
</body>
</html>
