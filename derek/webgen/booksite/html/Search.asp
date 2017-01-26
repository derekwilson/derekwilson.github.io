<%@ Language=VBScript %>

<%
	dim sSearchText
	sSearchText = "XXX"
	sSearchText = CookieRead("bookstext")
%>

<!--	#include virtual="/../../asp/cookie.inc"-->

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	</head>

<script language="Javascript">
<!--
	function OnLoaded()
	{
		// switch on the checkboxes
		document.forms[0].chkTitles.checked = true;
		document.forms[0].chkNotes.checked = true;
		document.forms[0].chkAuthor.checked = true;
		document.forms[0].chkPub.checked = true;
		
		// put the damned focus down
		document.forms[0].stext.focus();

		// hide submit message
		document.all["searchmessage"].style.display="none";
	}

	function OnSearch()
	{
		if (document.forms[0].stext.value == "")
		{
			alert("Please enter text to search for");
			return false;
		}
		if (!document.forms[0].chkTitles.checked &&
				!document.forms[0].chkNotes.checked &&
				!document.forms[0].chkAuthor.checked &&
				!document.forms[0].chkPub.checked)
		{
			alert("You must select at least one area to search");
			return false;
		}

		document.all["searchmessage"].style.display="inline";
		document.all["searchfrm"].style.display="none";

	}
-->
</script>

<body bgcolor="#FFFFFF" onload="OnLoaded()">
<font face="Arial" size="4" color="#000084">
Search<br>
</font>

<form id=searchfrm method="get" action="htmlsearch.asp" onSubmit="return OnSearch();">
	<INPUT id=chkTitles name=chkTitles type=checkbox>Titles&nbsp;&nbsp;
	<INPUT id=chkNotes name=chkNotes type=checkbox>Notes&nbsp;&nbsp;
	<INPUT id=chkAuthor name=chkAuthor type=checkbox>Author&nbsp;&nbsp;
	<INPUT id=chkPub name=chkPub type=checkbox>Publisher<br>
	<p>Search for <input id=stext name="stext" type="input" size="50" value="<%=sSearchText%>"></p>
	<p><input type="submit" value="Search">&nbsp;
	<input type="reset" value="Reset"></p>
</form>

<div id=searchmessage style="display: none;">
<p><b>Searching .....</b></p>
</div>
</body>
</html>
