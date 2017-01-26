// ***** menu code

// ***** browser neutral code

var arrHeirarchy = new Array();
var arrOpenMenu = new Array();
var rMenuArea = new Rectangle(0, 0 ,0, 0);

function AddPopupHeiarchy(strPopupID, arrHeirarchyIDs)
{
	arrHeirarchy[strPopupID] = arrHeirarchyIDs;
}

function IsAnAncestor(strID, strTestID)
{
	if (strID == strTestID)		// I am an ancestor of myself (biologically not very likely)
		return true;

	var len  = arrHeirarchy[strID].length;
	var count;
	for (count=0; count<len; count++)
	{
		if (arrHeirarchy[strID][count] == strTestID)
			return true;
	}
	return false;
}

function ParentID(strID)
{
	// this should be the first element in the array but in fact it is the last

	var parID = strID;
	var index = strID.lastIndexOf('.');
	if (index > 0)
		parID = strID.substring(0,index);
	
	return parID;
}

function OpenMenu(eSrc,eImg,eMenu,bSubMenu)
{
	if (!eMenu)
		return false;
		
	var len = arrOpenMenu.length;
	var count;
	for (count = 0; count<len; count++)
	{
		// already open
		if (arrOpenMenu[count] == eMenu)
			return false;
	}

	CloseAllExceptMyAncestors(eMenu.id);

	// find first free slot
	for (count = 0; count<len; count++)
	{
		if (arrOpenMenu[count] == null)
			break;
	}
	arrOpenMenu[count] = eMenu;
	BaseOpenMenu(eSrc,eImg,eMenu,bSubMenu);
	if (bSubMenu)
		CalcMenuArea(null);
	else
		CalcMenuArea(eSrc);
	return true;
}

function CloseMenu(eMenu)
{
	var len = arrOpenMenu.length;
	var count;
	for (count = 0; count<len; count++)
	{
		if (arrOpenMenu[count] && arrOpenMenu[count] == eMenu)
		{
			BaseCloseMenu(eMenu);
			arrOpenMenu[count] = null;
			CalcMenuArea(null);
			return;
		}
	}
}

function CloseAllMenus()
{
	var len = arrOpenMenu.length;
	var count;
	for (count = 0; count<len; count++)
	{
		if (arrOpenMenu[count])
		{
			BaseCloseMenu(arrOpenMenu[count]);
			arrOpenMenu[count] = null;
			CalcMenuArea(null);
		}
	}
	rMenuArea.reset();
}

function CloseAllExceptMyAncestors(strID)
{
	var len = arrOpenMenu.length;
	var count;

	// flip thru the open menus
	for (count = 0; count<len; count++)
	{
		// close any that are not an ancestor of me
		if (arrOpenMenu[count] && !IsAnAncestor(strID,arrOpenMenu[count].id))
		{
			BaseCloseMenu(arrOpenMenu[count]);
			arrOpenMenu[count] = null;
			CalcMenuArea(null);
		}
	}
}

function CalcMenuArea(objSrc)
{
	rMenuArea.reset();
	rMenuArea.left = 99999;
	rMenuArea.top = 99999;
	if (objSrc)										// if present this is the menu bar
		rMenuArea.top = getAbsoluteTop(objSrc);		// otherwise top level menus instantly disappear

	var len = arrOpenMenu.length;
	var count;
	var anyOpen = false;
	for (count = 0; count<len; count++)
	{
		if (arrOpenMenu[count])
		{
			anyOpen = true;
			var rThisMenu = Rectangle.createFromElement(arrOpenMenu[count]);
			rMenuArea = Rectangle.boundingRect(rMenuArea,rThisMenu);
		}
	}
	if (!anyOpen)
		rMenuArea.reset();
}

// **** browser switched code *****************************

function BaseOpenMenu(eSrc,eImg,eMenu,bSubMenu)
{
	if (eImg)
		eImg.src = strImagePathPrefix + "menu_more_right_hi.gif";

	if (document.layers)		// NS4
	{
		if (bSubMenu)
		{
			// SubMenus pop up to the right of an item
			// eSrc is the little arrow image 
			eMenu.moveToAbsolute(eSrc.pageX + eImg.x - 1, eSrc.pageY - 7)
		}
		else
		{
			// Menus drop down from the top bar
			// eSrc is a div that holds the title
			eMenu.moveToAbsolute(eSrc.pageX - 3, eSrc.pageY + eSrc.clip.height - 3)
		}
		eMenu.visibility = "visible";
	}
	else if (is_ie)				// IE
	{
		if (bSubMenu)
		{
			// SubMenus pop up to the right of an item

			var LeftPos = PositionSubMenuLeft(eSrc,eMenu)
			var SubMenuWidth = eMenu.offsetWidth;
			var WindowRight = document.body.scrollLeft + document.body.clientWidth;

			if (LeftPos + SubMenuWidth > WindowRight)
				LeftPos = getAbsoluteLeft(eSrc) - SubMenuWidth;
			eMenu.style.left = Math.max(parseInt(LeftPos),0);
			eMenu.style.top = PositionSubMenuTop(eSrc,eMenu);
		}
		else
		{
			// Menus drop down from the top bar
			var LeftPos = getAbsoluteLeft(eSrc) + tblMenuBar.offsetLeft;
			var MenuWidth = eMenu.offsetWidth;
			var WindowRight = document.body.scrollLeft + document.body.clientWidth;
			if (LeftPos + MenuWidth > WindowRight)
				LeftPos = WindowRight - MenuWidth;
			eMenu.style.left = Math.max(parseInt(LeftPos),0);
		}
		eMenu.style.visibility = "visible";
		MenuOpened(eMenu);
	}
	else // Opera NS6 etc
	{
		if (bSubMenu)
		{
			// SubMenus pop up to the right of an item
			eMenu.style.left = PositionSubMenuLeft(eSrc,eMenu);
			eMenu.style.top = PositionSubMenuTop(eSrc,eMenu);
		}
		else
		{
			// Menus drop down from the top bar
			var left = eSrc.style.left;
			eMenu.style.left = getAbsoluteLeft(eSrc);
			eMenu.style.top = getAbsoluteTop(eSrc) + eSrc.offsetHeight;
		}
		eMenu.style.visibility = "visible";
		MenuOpened(eMenu);
	}
}

function BaseCloseMenu(eMenu)
{
	var eImg = null;
	if (document.layers)		// NS4
	{
		eMenu.visibility = "hidden";

		// lo light the 'more' image on the menu above
		var parID = ParentID(eMenu.id);
		var parentMenu = getElement(parID);
		if (parentMenu && parentMenu.document)
		{
			var eImgID = eMenu.id.replace("div","img");
			eImg = parentMenu.document.images[eImgID];
		}
	}
	else
	{
		eMenu.style.visibility = "hidden";
		eImg = document.images[eMenu.id.replace("div","img")];
		MenuClosed(eMenu);
	}
	if (eImg)
		eImg.src = strImagePathPrefix + "menu_more_right.gif";
}

// ******* IE Specific code *****************

function HiddenControl(ctrl, visibility)
{
	this.ctrl = ctrl;
	this.visibility = visibility;
}

function MenuOpened(eMenu)
{
	var rMenu = Rectangle.createFromElement(eMenu);

	if (eMenu.arrHiddenControls == null)
		eMenu.arrHiddenControls = new Array();

	HideSelectControls(eMenu, rMenu, window, 0, 0);
}

function HideSelectControls(eMenu, rMenu, eWin, iParentX, iParentY)
{
	var iFrame;
	var iForm;
	var iElement;
	var iXOffset = iParentX + getAbsoluteLeft(eWin.frameElement);
	var iYOffset = iParentY + getAbsoluteTop(eWin.frameElement);
	
	for (iForm = eWin.document.forms.length - 1; iForm >= 0; iForm--)
		for (iElement = eWin.document.forms[iForm].elements.length - 1; iElement >= 0; iElement--)
		{
			var eCtrl = eWin.document.forms[iForm].elements[iElement];
			if (eCtrl.type == "select-one" &&
				eCtrl.style.visibility != "hidden")
			{
				var rCtrl = Rectangle.createFromElement(eCtrl);
				rCtrl.offsetRect(iXOffset, iYOffset);
						
				if (Rectangle.intersect(rMenu, rCtrl))
				{
					eMenu.arrHiddenControls[eMenu.arrHiddenControls.length] = new HiddenControl(eCtrl, eCtrl.style.visibility);
					eCtrl.style.visibility = "hidden";
				}
			}
		}
	if (eWin.document.frames)
	{
		for (iFrame = eWin.document.frames.length - 1; iFrame >= 0; iFrame--)
			HideSelectControls(eMenu, rMenu, eWin.document.frames[iFrame], iXOffset, iYOffset);
	}
}

function MenuClosed(eMenu)
{
	if (eMenu.arrHiddenControls)
	{
		var iControl;
		for (iControl = eMenu.arrHiddenControls.length - 1; iControl >= 0 ; iControl--)
		{
			eMenu.arrHiddenControls[iControl].ctrl.style.visibility = eMenu.arrHiddenControls[iControl].visibility;
			eMenu.arrHiddenControls[iControl] = null;
		}
				
		eMenu.arrHiddenControls.length = 0;
	}
}

function IsElementInOpenMenu(eTo)
{
	if (!eTo)
		return false;

	var len = arrOpenMenu.length;
	var count;
	for (count = 0; count<len; count++)
	{
		if (arrOpenMenu[count] && arrOpenMenu[count].contains(eTo))
		{
			return true;
		}
	}
	return false;
}

// this is used by IE,NS6 and DOM browsers
function MenuBar_over(event)
{
	var eSrc = null;
	if (window.event)	// IE
		eSrc = window.event.srcElement;
	else if (event)		// NS6
		eSrc = event.target;

	while (eSrc && (eSrc.tagName == null || eSrc.tagName.toUpperCase() != "TD"))
	{
		eSrc = getParentElement(eSrc);
	}

	if (eSrc && eSrc.tagName)
	{
		var eMenu = getElement(eSrc.id.replace("tdMenuBarItem","divMenu"));
		if (OpenMenu(eSrc,null,eMenu,false))
		{
			if (!window.event)
			{
				GeckoStart_Capture();
			}
		}
	}
}

function SubMenu_over(eSrc,strMenuID)
{
	var eImg = document.images[strMenuID.replace("div","img")];
	var eMenu = getElement(strMenuID);
	OpenMenu(eSrc,eImg,eMenu,true);
}
	
function MenuBar_out()
{
	if (window.event)
	{
		var eTo = window.event.toElement;
		if (eTo && "tblMenuBar" == eTo.id)
			return;
		if (IsElementInOpenMenu(eTo))
			return;

		CloseAllMenus();
	}
}

function Menu_out()
{
	if (window.event)
	{
		var eTo = window.event.toElement;
		if (eTo && tblMenuBar.contains(eTo))
			return;
		if (IsElementInOpenMenu(eTo))
			return;

		CloseAllMenus();
	}
}

function HighlightMenuItem (eItem,bHi)
{
	if (bHi)
		eItem.className = 'clsMenuItemHighlight';
	else
		eItem.className = 'clsMenuItem';
}

function PositionSubMenuLeft(eSrc,eMenu)
{
	var LeftPos = getAbsoluteLeft(eSrc) + eSrc.offsetWidth + 1;
	return Math.max(parseInt(LeftPos),0);
}

function PositionSubMenuTop(eSrc,eMenu)
{
	var TopPos = getAbsoluteTop(eSrc);
	return Math.max(parseInt(TopPos),0);
}

// *** Gecko menu code *********

function GeckoStart_Capture()
{
	var gecko_mask = null;
	if (Event.MOUSEMOVE)			
		gecko_mask = Event.MOUSEMOVE;		// NS6.01
	else
		gecko_mask = Event.MouseMove;		// later NS6 versions

	window.captureEvents(gecko_mask);
	window.onmousemove = GeckoMouse_move;
}

function GeckoCloseAllMenus()
{
	var gecko_mask = null;
	if (Event.MOUSEMOVE)			
		gecko_mask = Event.MOUSEMOVE;		// NS6.01
	else
		gecko_mask = Event.MouseMove;		// later NS6 versions

	window.releaseEvents(gecko_mask);
	CloseAllMenus();
}

function GeckoMouse_move(ev)
{
	if (!(rMenuArea.pointIntersect(ev.pageX, ev.pageY)))
		GeckoCloseAllMenus();
}

// *** Netscape menu code *********
	
function NSCloseAllMenus()
{
	window.releaseEvents(Event.MOUSEMOVE);
	CloseAllMenus();
}

function NSMouse_move(ev)
{
	if (!(rMenuArea.pointIntersect(ev.pageX, ev.pageY)))
		NSCloseAllMenus();
}

function NSMenuBar_over(ev)
{
	if (!is_nav4)	// the NS4 events go off in NS6 but don't work properly !!
		return;

	var evSrc = ev.target;
	var strMenuID = evSrc.name.replace("lyrMenuBarItem", "divMenu");
	var eMenu = document.layers[strMenuID];

	if (eMenu)
	{
		if (OpenMenu(evSrc,null,eMenu,false))
		{
			window.captureEvents(Event.MOUSEMOVE);
			window.onmousemove = NSMouse_move;
		}
	}
}

function NSSubMenuBar_over(ev,eSrc,strParentMenuID,strMenuID)
{
	if (!is_nav4)	// the NS4 events go off in NS6 but don't work properly !!
		return;

	var eParentMenu = getElement(strParentMenuID);
	var eImg = null;
	if (eParentMenu)
		eImg = eParentMenu.document.images[strMenuID.replace("div","img")];

	var eMenu = getElement(strMenuID);
	OpenMenu(eSrc,eImg,eMenu,true);
}

function NSHighlightMenuItem (eItem,bHi)
{
	// if you want something done in Netscape you have to do it your bleedin' self
	if (bHi)
		eItem.bgColor = strHiColour;
	else
		eItem.bgColor = strLoColour;
}

// *** Global Code *********

var strImagePathPrefix = '';
function SetMenuImagePathPrefix(str)
{
	strImagePathPrefix = str;
}

var strHiColour = '#003366';
var strLoColour = '#336699';

function SetMenuHighlightColours(strHi,strLo)
{
	strHiColour = strHi;
	strLoColour = strLo;
}
