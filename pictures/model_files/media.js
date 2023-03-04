$(document).ready(function() {	
	$(".gallery-control").click(function() {
		var action = $(this).attr("data-action");
		var tempPhoto;
		var photoCount,photoIndex,is_special;
		if ($("#photo_count").length >0) is_special = true; else is_special = false;
		if (is_special) {
			photoCount = $("#photo_count").html();photoCount++;photoCount--;
			photoIndex = $("#photo_index").html();photoIndex++;photoIndex--;
		}
		if (action == "next") {
			$(".content img.active").next().addClass("active");	
			if (!is_special) $(".carousel-indicators .active").next().addClass("active");
				
			$(".content img.active").first().removeClass("active");
			if (!is_special) $(".carousel-indicators .active").first().removeClass("active");
			if ($(".content img.active").length == 0) {
				$(".content img").first().addClass("active");
				if (!is_special) $(".carousel-indicators li").first().addClass("active");
			}		
			if (is_special) if (photoCount == photoIndex) photoIndex = 1; else photoIndex++;
		} else {
			$(".content img.active").prev().addClass("active");
			$(".content img.active").last().removeClass("active");
			if (!is_special) $(".carousel-indicators .active").prev().addClass("active");
			if (!is_special) $(".carousel-indicators .active").last().removeClass("active");
			if ($(".content img.active").length == 0) {
				$(".content img").last().addClass("active");
				if (!is_special) $(".carousel-indicators li").last().addClass("active");
			}
			if (is_special) if (photoIndex == 1) photoIndex = photoCount; else photoIndex--;
		}
		if (is_special) $("#photo_index").html(photoIndex);
		/*$(".content img.active").fadeOut(100, function() {
			
			$(".content .active").fadeIn(100);
		});*/
	});
	$(".carousel-indicators li").click(function() {
		var index = $(this).attr("data-slide-to");
		$(".carousel-indicators .active").removeClass("active");
		$(this).addClass("active");
		$(".content img.active").fadeOut(100, function() {
			$(".content img.active").removeClass("active");
			$(".content img").each(function(idx) {
				if (index == idx) {
					$(this).addClass("active");
				}
			});
			$(".content .active").fadeIn(100);
		});
	});
	$(".main-container video").click(function() {
		/*var v = document.getElementsByTagName("video")[0];
		if (v.paused)
			v.play();
		else 
			v.pause();*/
	});
	
	$("body.video").keydown(function(evt) {
		var v = document.getElementsByTagName("video")[0];
		switch(evt.keyCode) {
			case 37: 
				v.currentTime -= 3;
				break;
			case 38: 
				v.volume+=0.1;
				break;
			case 39: 
				v.currentTime += 3;
				break;
			case 40: 
				v.volume-=0.1;
				break;
		}
	});
	$("body.gallery").keydown(function(evt) {
		switch(evt.keyCode) {
			case 37: 
				$(".control-button .button-previous").trigger("click");
				break;
			case 39: 
				$(".control-button .button-next").trigger("click");
				break;
		}
	});
	
	// Redraw Carousel
	function redrawCarousel() {
		var innerHeight;
		if (window.innerHeight){
		     innerHeight = window.innerHeight;
		}else{
		     innerHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
		}
		var titleHeight = 0;
		if ($(".title").length > 0)
			titleHeight = $(".title").css("height").replace("px", "");
		var indicatorHeight = 0;
		if ($(".carousel-indicators").length > 0)
			indicatorHeight = $(".carousel-indicators").css("height").replace("px", "");
		else 
			indicatorHeight = $(".spacebar").css("height").replace("px", "");
		titleHeight++;titleHeight--;indicatorHeight++;indicatorHeight--;
		$(".main-container").css("height", "calc(100% - " + (titleHeight + indicatorHeight) + "px)");
		$(".main-container img").css("max-height", innerHeight-titleHeight-indicatorHeight);
		$(".main-container video").css("max-height", innerHeight-titleHeight-indicatorHeight);
		$(".control-button .gallery-control").css("top", (titleHeight-indicatorHeight) + "px");
	}
	redrawCarousel(); 
	
	$(window).resize(function() {
		//$('.carousel-inner').width(0); 	
		redrawCarousel(); 
	}); 
});