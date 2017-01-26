function GetOneCSSForBrowser(pathPrefix,cssfile)
{
	if (document.layers)
		document.write("<link rel='stylesheet' type='text/css' href='" + pathPrefix + cssfile + "_ns.css'>");
	else
		document.write("<link rel='stylesheet' type='text/css' href='" + pathPrefix + cssfile + "_ie.css'>");
}

