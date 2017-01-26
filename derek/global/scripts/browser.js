// ********* Cross browser funcs
function undoFrames()
{
	// if we have been launched in a frame then climb out and fill the window
	if (window != top)
	{
		top.location.href = location.href;
	}
}

function CheckBrowserCapabilities(texturl)
{
	if (is_nav4up)
		return;

	// IE is OK but exclude PocketPC
	if (is_ie4up)
		return;

	// My old version of Opera5 fills in the appVersion with text
	if (is_opera)
		return;

	// Our support is a bit sketchy but lets go for it
	if (is_opera5up)
		return;

	// if the url contains 'force' then do not redirect
	if (location.search)
		if (location.search.indexOf("force") != -1)
			return;

	if (texturl && texturl != "")
		document.write("<meta http-equiv='refresh' content='0;URL=" + texturl + "'>");
}

function getElement(strID)
{
	// IE5, NS6
	if (document.getElementById)
		return document.getElementById(strID);
	// IE4
	if (document.all)
		return document.all[strID];
	// NS4
	if (document.layers)
		return document.layers[strID];
	return null;
}

function getParentElement(obj)
{
	if (obj.parentElement)
		return obj.parentElement;
	if (obj.parentNode)
		return obj.parentNode;
	return null;
}

function GetOneCSSForBrowser(pathPrefix,cssfile)
{
	if (document.layers)
		document.write("<link rel='stylesheet' type='text/css' href='" + pathPrefix + cssfile + "_ns.css'>");
	else
		document.write("<link rel='stylesheet' type='text/css' href='" + pathPrefix + cssfile + "_ie.css'>");
}

function GetCSSForBrowser(pathPrefix)
{
	GetOneCSSForBrowser(pathPrefix,'menus');
	GetOneCSSForBrowser(pathPrefix,'frame');
	GetOneCSSForBrowser(pathPrefix,'topstrip');
}

function getAbsoluteLeft(oNode)
{
	if (document.layers)
		return oNode.pageX;

	var iLeft = 0;
		
	if (oNode != null)
	{
		iLeft = oNode.offsetLeft;
		var oCurrentNode = oNode.offsetParent;
		
		while(oCurrentNode != null && oCurrentNode.style.position!="absolute")
		{
		   iLeft += oCurrentNode.offsetLeft;
		   oCurrentNode = oCurrentNode.offsetParent;
		}

		if (oCurrentNode != null && oCurrentNode.style.position == "absolute")
		{
		   iLeft += oCurrentNode.offsetLeft;
		}
	}
		
	return iLeft;
}

function getAbsoluteRight(oNode)
{
	if (document.layers)
		return oNode.pageX + oNode.clip.width;

	return getAbsoluteLeft(oNode) + oNode.offsetWidth;
}

function getAbsoluteTop(oNode)
{
	if (document.layers)
		return oNode.pageY;

	var iTop = 0;

	if (oNode != null)
	{
		iTop = oNode.offsetTop;
		var oCurrentNode = oNode.offsetParent;
		
		while(oCurrentNode != null && oCurrentNode.style.position!="absolute")
		{
		   iTop += oCurrentNode.offsetTop;
		   oCurrentNode = oCurrentNode.offsetParent;
		}

		if (oCurrentNode != null && oCurrentNode.style.position == "absolute")
		{
			iTop += oCurrentNode.offsetTop;
		}
	}
				
	return iTop;
}

function getAbsoluteBottom(oNode)
{
	if (document.layers)
		return oNode.pageY + oNode.clip.height;

	return getAbsoluteTop(oNode) + oNode.offsetHeight;
}

// ********* Netscapefix *********	
function setMenuHandler()
{	
	// This function checks to make sure the version of Netscape 
	// in use contains the bug; if so, it records the window's 
	// width and height and sets all resize events to be handled 
	// by the fixMenuHandler() function.

	if ((navigator.appName == 'Netscape') && (parseInt(navigator.appVersion) == 4))
	{
		if (typeof document.WM == 'undefined')
		{
			document.WM = new Object;
		}

		if (typeof document.WM.WM_netscapeCssFix == 'undefined')
		{
			document.WM.WM_netscapeCssFix = new Object;
			document.WM.WM_netscapeCssFix.initWindowWidth = window.innerWidth;
			document.WM.WM_netscapeCssFix.initWindowHeight = window.innerHeight;
		}

		window.onresize = fixMenuHandler;
	}
}

function fixMenuHandler(e)
{	
	if (document.WM.WM_netscapeCssFix.initWindowWidth != window.innerWidth ||
		document.WM.WM_netscapeCssFix.initWindowHeight != window.innerHeight)
	{
		document.location = document.location;
	}
}
	
// ******** GLOBAL CODE **************
setMenuHandler();

