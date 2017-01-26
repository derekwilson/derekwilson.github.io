
// the ids of the <TR> that are the groups of author links are all in an array called AllGroups

var AllGroups = new Array();
function AddGroup(id)
{
	AllGroups[AllGroups.length] = id;
}

function SetParentColour(elem,colour)
{
	if (elem.parentElement != null)				// ie4
		elem.parentElement.bgColor = colour;
	else if (elem.parentNode != null)			// ie5 ns etc
		elem.parentNode.bgColor = colour;
}

var currentElement = null;

// *********************************************************
// highlightAuthor()
// 
// Do this to provide user feedback to indicate the selected page
//
// *********************************************************
function highlightAuthor(authorLink)
{
	if (currentElement != null)
		SetParentColour(currentElement,'');

	// turn on the one we were told to
	SetParentColour(authorLink,'#F0F0FF');

	currentElement = authorLink;
}

// *********************************************************
// expandcollapse()
//
// Function that expands and collapses the navigator 
// elements. 
//
// *********************************************************
function expandcollapse(childID)
{
	var childElement=null;
	if (document.all)
		childElement = document.all(childID);
	else
		childElement = document.getElementById(childID);

	if (childElement.style.display ==  "none")
		childElement.style.display = "inline";
	else
		childElement.style.display = "none";
}

// *********************************************************
// expandAll()
//
// *********************************************************
function expandAll()
{
	var i=0;
	for(i=0;i<AllGroups.length;i++)
		document.all(AllGroups[i]).style.display='inline';
}

// *********************************************************
// colapseAll()
//
// *********************************************************
function colapseAll()
{
	var i=0;
	for(i=0;i<AllGroups.length;i++)
		document.all(AllGroups[i]).style.display='none';
}

