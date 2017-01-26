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
<title>Non-members</title>
</head>

<body stylesrc="../news_events.htm" background="../images/Backgrounds/Yellow.gif" bgcolor="#FFFFFF">

<h1><font face="Comic Sans MS" color="#004080">BOBS Non-members</font></h1>

<table border="0" cellpadding="5" width="761" id="TABLE1">
  <tr>
    <td width="106"><strong>Name</strong></td>
    <td width="153"><strong>Work 
            Tel</strong></td>
    <td width="224"><strong>Email</strong></td>
    <td width="270"><strong>Web</strong></td>
  </tr>
  <tr>
    <td width="106">Mark Baldwin</td>
    <td width="103">n/a</td>
    <td width="224"><a href="mailto:baldwin.mark@virgin.net">baldwin.mark@virgin.net</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Diane Barlow</td>
    <td width="103">n/a</td>
    <td width="224"><a href="mailto:keith_and_diane@compuserve.com">keith_and_diane@compuserve.com</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Keith Barlow</td>
    <td width="103">n/a</td>
    <td width="224"><a href="mailto:keith_barlow@uk.ibm.com">keith_barlow@uk.ibm.com</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">John Cottam</td>
    <td width="103">0411 348 847</td>
    <td width="224"><a href="mailto:john@web-planet.co.uk">john@web-planet.co.uk</a><br>
					<a href="mailto:john_cottam@bigfoot.com">john_cottam@bigfoot.com</a></td>
    <td width="270"><a href="http://www.web-planet.co.uk" target="_top"><font size="3">http://www.web-planet.co.uk</font></a></td>
  </tr>
  <tr>
    <td width="106">Paul Grey</td>
    <td width="103">07780 615 576</td>
    <td width="270">
	    <a href="mailto:paul.gray@sonny81.freeserve.co.uk">paul.gray@sonny81.freeserve.co.uk (home)</a><br>
		<a href="mailto:paul.gray@aldreley.zeneca.com">paul.gray@aldreley.zeneca.com (work)</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Rosie Grey</td>
    <td width="103">n/a</td>
    <td width="270">as Paul</td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Claire Lavin</td>
    <td width="103">0973 721 781</td>
    <td width="270"><a href="mailto:clairelavin@wanadoo.fr">clairelavin@wanadoo.fr</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Thomas McDonald</td>
    <td width="103">0161 242 2184</td>
    <td width="234"><a href="mailto:thomas.mcdonald@nccglobal.com">thomas.mcdonald@nccglobal.com</a><br>
    <a href="mailto:thomas@yoshicorp.screaming.net">thomas@yoshicorp.screaming.net</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Elaine Pratt</td>
    <td width="103">n/a</td>
    <td width="224"><a href="mailto:pratt05@ibm.net">pratt05@ibm.net</a></td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Katri Tamminen</td>
    <td width="103">n/a</td>
    <td width="224">n/a</td>
    <td width="270">n/a</td>
  </tr>
  <tr>
    <td width="106">Joanne White</td>
    <td width="103">n/a</td>
    <td width="224"><a href="mailto:joanne.white@hammondsuddards.co.uk">joanne.white@hammondsuddards.co.uk</a><br>
    <a href="mailto:joanne@yoshicorp.screaming.net">joanne@yoshicorp.screaming.net</a></td>
    <td width="270">n/a</td>
  </tr>
</table>
</body>
</html>
