$(document).ready(function() {
	var newCarousel = new Carousel($("#scrolling1 .wrapper"));
	for (var i = 0; i < 31; i++)
	{
		newCarousel.AddItem($("<div class='contents'>Item " + i + "</div>"));
	}
});

function Carousel(carouselElement){
	var me = this;
	var carousel, container, prevButton, nextButton;
	var xorigin, startmargin, pageSize, itemCount, startLeft;
	me.carousel = carouselElement;
	me.container = me.carousel.parent();
	me.startLeft = me.carousel.position().left;
	BindEvents();
	BuildNavigation();
	CalculatePageSize();
	
	function BindEvents()
	{
		$(me.container).bind("mousedown", StartSwipe);
		$(document).bind("mouseup", EndSwipe);	
		document.getElementById(me.container.attr("id")).ontouchstart = StartTouchSwipe;
		document.getElementById(me.container.attr("id")).ontouchend = EndTouchSwipe;	
	}
	function BuildNavigation()
	{		
		me.prevButton = AddNavButton("previous", $("<span>Prev</span>"), -1);		
		me.nextButton = AddNavButton("next", $("<span>Next</span>"), 1);
	}	
	function AddNavButton(className, content, pagechange)
	{
		var button = $("<div class='navigation " + className + "'></div>");
		button.append(content);
		button.bind("click", function(){ if (!$(this).hasClass("disabled")) ChangePage(pagechange); });
		me.container.append(button);
		return button;
	}
	function CalculatePageSize()
	{
		me.pageSize = me.container.innerWidth();
	}
	function ChangePage(pageDelta)
	{
		var pageChange = -pageDelta * parseInt(me.container.innerWidth());
		var newMargin = parseInt(me.carousel.css("left")) + pageChange;
		me.carousel.animate({ "left": newMargin }, 400, function(){ ValidateNavigation(); });
	}
	this.AddItem = function(listItem)
	{
		me.carousel.append(listItem);
		me.carousel.width(me.carousel.width() + listItem.outerWidth(true));
		ValidateNavigation();
	}
	function StartSwipe(event)
	{
		me.xorigin = event.pageX;
		me.startmargin = parseInt(me.carousel.css("left"));
		me.carousel.bind("mousemove", Swipe);
		event.preventDefault();
	}
	function ValidateNavigation()
	{
		if (me.carousel.position().left >= me.startLeft) 
		{
			me.prevButton.addClass("disabled");
			me.carousel.css("left", me.startLeft + "px");
		}	
		else 
		{
			me.prevButton.removeClass("disabled");
		}
	}
	function Swipe(event)
	{
		me.carousel.css("left", (me.startmargin + event.pageX - me.xorigin) + "px");
	}
	function EndSwipe(event)
	{
		xorigin = null;
		me.carousel.unbind("mousemove");
		ValidateNavigation();
	}
	function StartTouchSwipe(event)
	{
		me.xorigin = event.touches[0].pageX;
		me.startmargin = parseInt(me.carousel.position().left);
		document.getElementById(me.container.attr("id")).ontouchmove = TouchSwipe;
		event.preventDefault();
}
	function TouchSwipe(event)
	{
		me.carousel.css("left", (me.startmargin + event.touches[0].pageX - me.xorigin) + "px");
	}
	function EndTouchSwipe(event)
	{
		me.xorigin = null;
		document.getElementById(me.container.attr("id")).ontouchmove = null;
		ValidateNavigation();
	}	
	function IsTouchable()
	{
		
	}
};

