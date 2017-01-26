// *********************************************************
// FindFrame()
//
// *********************************************************
function findFrame(name)
{
	var framecount;
	var i;

	if (parent!=null)
		for (framecount=0; framecount<parent.document.frames.length; framecount++)
			if (parent.document.frames(framecount).name==name)
				return parent.document.frames(framecount);
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

