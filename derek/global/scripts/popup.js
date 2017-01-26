// ****** popup window **********************************************************

function ShowPopup(strHolderID,strPopupID,bAlignRight) 
{
	if (document.layers)		// NS4
	{
		var holder = document.layers[strHolderID + "_NS"];
		var popup = document.layers[strPopupID];

		var newx;
		if (bAlignRight)
			newx = holder.pageX + holder.document.width - popup.document.width;
		else
			newx = holder.pageX;

		popup.moveToAbsolute(newx, holder.pageY + holder.document.height);
		popup.zIndex = 99;		// for some reason Netscape will not read this from the stylesheet

		popup.visibility = "visible";
	}
	else if (document.all)		// IE
	{
		var holder = document.all(strHolderID);
		var popup = document.all(strPopupID);

		var leftPos = getAbsoluteLeft(holder);
		if (bAlignRight)
			popup.style.pixelLeft = leftPos + holder.offsetWidth - popup.offsetWidth;
		else
			popup.style.pixelLeft = leftPos;

		popup.style.pixelTop = getAbsoluteTop(holder) + holder.offsetHeight;

		popup.style.visibility = "visible";  
	}
	else	// W3C DOM browser
	{
		var holder = document.getElementById(strHolderID);
		var popup = document.getElementById(strPopupID);

		var leftPos = getAbsoluteLeft(holder);
//		var leftPos = window.event.clientX;
		if (bAlignRight)
			popup.style.left = leftPos - 450;
		else
			popup.style.left = leftPos;

		popup.style.top = getAbsoluteTop(holder) + holder.offsetHeight;
//		popup.style.top = window.event.clientY;
		popup.style.visibility = "visible";  
	}

	return false;	// enable the link URL to be displayed on the status bar
}

function HidePopup(strPopupID)
{
	if (document.layers)		// NS4
	{
		var popup = document.layers[strPopupID];
		popup.visibility = "hidden";
	}
	else if (document.all)		// IE
	{
		var popup = document.all(strPopupID);
		popup.style.visibility = "hidden";  
	}
	else	// W3C DOM browser
	{
		var popup = document.getElementById(strPopupID);
		popup.style.visibility = "hidden";  
	}
}

