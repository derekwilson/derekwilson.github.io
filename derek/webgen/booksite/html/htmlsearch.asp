<%@ Language=VBScript %>

<%
option explicit
'== tell client we are sending HTML
Response.ContentType = "text/html"

'== create and init global vars
dim sIndex			' filename of index XML file
dim objXMLDocument	' XML parser
dim sXMLError		' error message from XML parser

dim sSearch			' text to search for
dim bSearchAll		' true if we are searching everything
dim bSearchTitles	' true if we are searching titles
dim bSearchAuthors	' true if we are searching authors
dim bSearchNotes	' true if we are searching notes
dim bSearchPub		' true if we are searching publishers

dim sHTML			' results of search

sIndex = "../build/index.xml"
set objXMLDocument = Server.CreateObject("MSXML.DOMDocument")

sSearch = Request.QueryString("stext")
if Request.QueryString("chkTitles") = "on" then
	bSearchTitles = true
else
	bSearchTitles = false
end if
if Request.QueryString("chkAuthor") = "on" then
	bSearchAuthors = true
else
	bSearchAuthors = false
end if
if Request.QueryString("chkNotes") = "on" then
	bSearchNotes = true
else
	bSearchNotes = false
end if
if Request.QueryString("chkPub") = "on" then
	bSearchPub = true
else
	bSearchPub = false
end if
if bSearchPub and bSearchNotes and bSearchAuthors and bSearchTitles then
	bSearchAll = true
else
	bSearchAll = false
end if

dim dtExpire
dtExpire = DateAdd("y",1,Now())

Call CookieWrite("bookstext",sSearch,dtExpire,"")

%>

<!--	#include virtual="/../../asp/cookie.inc"-->

<HTML>
<HEAD>
<META NAME="GENERATOR" Content="Microsoft Visual Studio 6.0">
</HEAD>
<BODY bgcolor="#FFFFFF">

<%
Response.Write "<p>Scanning <b>" & sIndex & "</b> for <b>" & sSearch & "</b><br>"
Response.Write "Searching in "
if bSearchTitles then
	Response.Write "<b>Titles</b> "
end if
if bSearchAuthors then
	Response.Write "<b>Authors</b> "
end if
if bSearchNotes then
	Response.Write "<b>Notes</b> "
end if
if bSearchPub then
	Response.Write "<b>Publishers</b> "
end if
Response.Write "</p>"

sXMLError = LoadIndex(sIndex)
if sXMLError = "" then
	sHTML = Search(sSearch)
end if
%>

<P><%=sHTML%></P>

<%
if sXMLError <> "" then
	Response.Write sXMLError
end if
%>

</BODY>
</HTML>

<script language="VBScript" runat=server>

Function LoadIndex(sIndex)
	LoadIndex = ""
	objXMLDocument.async = false
	objXMLDocument.validateOnParse = True
	objXMLDocument.load Server.MapPath(sIndex)
	if objXMLDocument.parseError.errorCode <> 0 then
		LoadIndex = "XMLError: " + objXMLDocument.parseError.reason + " : " + CStr(objXMLDocument.parseError.line) + "," + CStr(objXMLDocument.parseError.linepos)
	end if
end function

Private Function Search(sSearch)
    Search = ""
    dim sRet
    sRet = "<table>"
    
    dim xmlNodes
    Set xmlNodes = objXMLDocument.selectNodes("//book")

	dim xmlNode
	dim xmlChildNode
	dim count
	dim found
	count = 0
	for each xmlNode in xmlNodes

		found = false
		
		if bSearchAll then
			found = InStr(1,xmlNode.Text,sSearch,vbTextCompare) > 0
		else
			if bSearchTitles then
				set xmlChildNode = xmlNode.selectSingleNode("title")
				if not xmlChildNode is nothing then
					found = InStr(1,xmlChildNode.Text,sSearch,vbTextCompare) > 0
				end if
			end if
			if bSearchAuthors and not found then
				set xmlChildNode = xmlNode.selectSingleNode("author")
				if not xmlChildNode is nothing then
					found = InStr(1,xmlChildNode.Text,sSearch,vbTextCompare) > 0
				end if
			end if
			if bSearchNotes and not found then
				set xmlChildNode = xmlNode.selectSingleNode("notes")
				if not xmlChildNode is nothing then
					found = InStr(1,xmlChildNode.Text,sSearch,vbTextCompare) > 0
				end if
			end if
			if bSearchPub and not found then
				set xmlChildNode = xmlNode.selectSingleNode("publisher")
				if not xmlChildNode is nothing then
					found = InStr(1,xmlChildNode.Text,sSearch,vbTextCompare) > 0
				end if
			end if
		end if

		if found then
			sRet = sRet + OutputNode(xmlNode)
			count = count + 1
		end if
	next
	set xmlNode = nothing

    sRet = sRet & "</table><p>" & CStr(count) & " matches found</p>"
    Search = sRet
End Function

function OutputNode(xmlIndexNode)
	dim xmlChildNode
	dim sTitle
	dim sAuthorLink

	set xmlChildNode = xmlIndexNode.selectSingleNode("title")
	if xmlChildNode is nothing then
		sTitle = "Unknown"
	else
		sTitle = xmlChildNode.Text
	end if

	set xmlChildNode = xmlIndexNode.selectSingleNode("author")
	if xmlChildNode is nothing then
		sTitle = " by Unknown"
	else
		sTitle = sTitle & " by " & xmlChildNode.Text
	end if

	set xmlChildNode = xmlIndexNode.selectSingleNode("id")
	if not xmlChildNode is nothing then
		sAuthorLink = "../build/author_" & xmlChildNode.Text & ".htm"
	end if

	OutputNode = OutputRow(sTitle,sAuthorLink)
end function

function OutputRow(display,link)
	dim sRet
	sRet = "<tr>"
	sRet = sRet + OutputCell(display,link)
	sRet = sRet + "</tr>"
	OutputRow = sRet
end function

function OutputCell(display,link)
	dim sRet
	sRet = "<td><a href='"
	sRet = sRet + link
	sRet = sRet + "'>"
	sRet = sRet + display
	sRet = sRet + "</a></td>"
	OutputCell = sRet
end function
	
</script>