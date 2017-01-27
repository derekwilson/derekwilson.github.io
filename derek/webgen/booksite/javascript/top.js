// *********************************************************
// FindFrame()
//
// *********************************************************
function findFrame(name)
{
	var framecount;
	var i;

	if (parent!=null)
		for (framecount=0; framecount<parent.frames.length; framecount++)
			if (parent.frames[framecount].name==name)
				return parent.frames[framecount];
}

// *********************************************************
// colapseAll()
//
// *********************************************************
function colapseAll()
{
	var navigatorframe = findFrame("navigator");
	navigatorframe.colapseAll();
}

// *********************************************************
// expandAll()
//
// *********************************************************
function expandAll()
{
	var navigatorframe = findFrame("navigator");
	navigatorframe.expandAll();
}

