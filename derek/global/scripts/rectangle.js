function Rectangle(top, left, bottom, right)
{
	this.top = top;
	this.left = left;
	this.bottom = bottom;
	this.right = right;
}
Rectangle.prototype.reset = Rectangle_reset;
Rectangle.prototype.width = Rectangle_width;
Rectangle.prototype.height = Rectangle_height;
Rectangle.prototype.pointIntersect = Rectangle_pointIntersect;
Rectangle.prototype.offsetRect = Rectangle_offsetRect;
Rectangle.intersect = Rectangle_intersect;
Rectangle.intersection = Rectangle_intersection;
Rectangle.boundingRect = Rectangle_boundingRect;
Rectangle.createFromElement = Rectangle_createFromElement;
Rectangle.elementIntersect = Rectangle_elementIntersect;

function Rectangle_reset()
{
	this.top = 0;
	this.left = 0;
	this.bottom = 0;
	this.right = 0;
}

function Rectangle_width()
{
	return this.right - this.left;
}

function Rectangle_height()
{
	return this.bottom - this.top;
}
		
function Rectangle_pointIntersect(x,y)
{
	if (this.left <= x && this.right >= x && this.top <= y && this.bottom >= y)
		return true;
	return false;
}
		
function Rectangle_offsetRect(x, y)
{
	this.left += x;
	this.right += x;
	this.top += y;
	this.bottom += y;
}
		
function Rectangle_intersect(r1, r2)
{
	var bIntersect = false;
			
	if ((Math.max(r1.left, r2.left) <= Math.min(r1.right, r2.right)) &&
		(Math.max(r1.top, r2.top) <= Math.min(r1.bottom, r2.bottom)))
		bIntersect = true;
			
	return bIntersect;
}

function Rectangle_elementIntersect(e, r)
{
	var eRect = Rectangle.createFromElement(e)
	return Rectangle.intersect(eRect,r);
}

function Rectangle_intersection(r1, r2)
{
	return new Rectangle(Math.max(r1.top, r2.top),
						 Math.max(r1.left, r2.left),
						 Math.min(r1.bottom, r2.bottom),
						 Math.min(r1.right, r2.right));
}
		
function Rectangle_boundingRect(r1, r2)
{
	return new Rectangle(Math.min(r1.top, r2.top),
						 Math.min(r1.left, r2.left),
						 Math.max(r1.bottom, r2.bottom),
						 Math.max(r1.right, r2.right));
}
		
function Rectangle_createFromElement(e)
{
	var l = getAbsoluteLeft(e);
	var t = getAbsoluteTop(e);
	var r;
	var b;
	if (document.layers)
	{
		r = l + e.clip.width;
		b = t + e.clip.height;
	}
	else
	{
		r = l + e.offsetWidth;
		b = t + e.offsetHeight;
	}
			
	return new Rectangle(t, l , b, r);
}
  