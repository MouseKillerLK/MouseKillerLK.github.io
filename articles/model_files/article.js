	var artContentTitleFontSize = 24;
	var artContentSubtitleFontSize = 18;
    var artContentBodyFontSize = 14;
    function getUrl(lang) {
    	document.location.href = document.location.href.replace(/\/kp\/|\/en\/|\/cn\/|\/jp\/|\/es\/|\/ru\//g, "/" + lang + "/");
	};
	function zoomInFontSize() {
		artContentTitleFontSize++;
		artContentSubtitleFontSize++;
		artContentBodyFontSize++;
		$(".article-content-title h3").css("font-size", artContentTitleFontSize + "px");
		$(".article-content-title h4").css("font-size", artContentSubtitleFontSize + "px");
		$(".article-content-body").css("font-size", artContentBodyFontSize + "px");
		fixFooter();
	};
	function zoomOutFontSize() {
		artContentTitleFontSize--;
		artContentSubtitleFontSize--;
		artContentBodyFontSize--;
		$(".article-content-title h3").css("font-size", artContentTitleFontSize + "px");
		$(".article-content-title h4").css("font-size", artContentSubtitleFontSize + "px");
		$(".article-content-body").css("font-size", artContentBodyFontSize + "px");
		fixFooter();
	};
	function fixFooter() {
		var bh = 0;
		if (window.innerHeight) {
		     bh = window.innerHeight;
		} else {
		     bh = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
		}
		if ($(".footer-container").length == 0){
			return false;
		}
		$(".footer-container").removeClass("bottom-fixed");
		if (bh > $(".footer-container").position().top + $(".footer-container").height() + 10) {
			$(".footer-container").addClass("bottom-fixed");
		} else {
			$(".footer-container").removeClass("bottom-fixed");
		}
	};
$(window).resize(function() {
	fixFooter();
});				
$(document).ready(function() {	
	isTouch	  = document.createTouch !== undefined;
	if (isTouch) {
		$(".article-media-link a.photo_m").css("display", "block");
		$(".article-media-link a.photo_d").css("display", "none");
		$(".article-media-link a.video_m").css("display", "block");
		$(".article-media-link a.video_d").css("display", "none");
	} else {
		$(".article-media-link a.photo_m").css("display", "none");
		$(".article-media-link a.photo_d").css("display", "block");
		$(".article-media-link a.video_m").css("display", "none");
		$(".article-media-link a.video_d").css("display", "block");
	}
	if (typeof fancyboxOverlay == "undefined") {
	    $(".fancybox").fancybox({
	    	helpers: {
	    		overlay: {
		    		closeClick: false
	    		}
    		}
		});
    } else {
	    $(".fancybox").fancybox({
	    	helpers:  {
	            overlay : {
	                css : {
	                    'background' : fancyboxOverlay
	                },
	                closeClick: false
	            }
	        },
	        beforeShow: initCarouselOnFancybox,
	        onUpdate: updateCarouselOnFancybox
	    });
    }
});