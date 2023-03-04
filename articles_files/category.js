function page(index){
	$(".pagevalue").each(function() {
		$(this).val(index);
	});
	$(".search-form").submit();
}
$(document).ready(function() {
	isTouch	  = document.createTouch !== undefined;
	$(".icon-login").click(function() {
		$(".category-list").css("display", "block");
		$(this).css("display", "none");
		$(".category-content.content").css("padding-left", "320px");
	});
	$(".icon-logout").click(function() {
		$(".category-list").css("display", "none");
		$(".icon-login").css("display", "block");
		$(".category-content.content").css("padding-left", "0");
	});
	// PUBLISH DATE RANGE
	$(".lang-link").click(function(e){
		e.preventDefault();
		$(".search-form").attr("action", $(this).attr("href"));
		$(".search-form").submit();
		return false;
	});
	var startDate = $('.dateranger').attr('startDate'); 
	var endDate = $('.dateranger').attr('endDate'); 
	if (startDate != "" && endDate != "") {
		$('.dateranger').val(startDate + " - " + endDate); 
		if (window.innerWidth < 768 || $("body").hasClass("photos") || $("body").hasClass("videos")) {
			$('.dateranger').daterangepicker({
				startDate: startDate, 
				endDate: endDate, 
				minDate: minDate,
				showDropdowns: true,
				format:'YYYY.M.D',
				locale: localeObject,
				opens: 'left'
			});
		} else {
			$('.dateranger').daterangepicker({
				startDate: startDate, 
				endDate: endDate, 
				minDate: minDate,
				showDropdowns: true,
				format:'YYYY.M.D',
				locale: localeObject
			});
		}
	} else {
		if (window.innerWidth < 768 || $("body").hasClass("photos") || $("body").hasClass("videos")) {
			$('.dateranger').daterangepicker({
				showDropdowns: true,
				minDate: minDate,
				format:'YYYY.M.D',
				locale: localeObject,
				opens: 'left'
			});
		} else {
			$('.dateranger').daterangepicker({
				showDropdowns: true,
				minDate: minDate,
				format:'YYYY.M.D',
				locale: localeObject
			});
		}
	}
	
	$('.search-settings').click(function(e) {
		$('.search-form').toggleClass("toggled"); 
	});
	
	$('.nav-toggle').click(function(e) {
		$('body').toggleClass("nav-toggled"); 
	}); 
	
	$('.search-toggle').click(function(e) {
		$('body').toggleClass("search-toggled"); 
	}); 
	 
	$('.search-form').on("submit", function(event) {
		var txt = $("#date").val();
		if (txt == "") $("#date").val("   ");
		txt = $("#category").val();
		if (txt == "") $("#category").val("   ");
		txt = "";
		$(".search-text").each(function() {
			if ($(this).val() != "") txt = $(this).val();
		});
		if (txt == "") $(".search-text").val("   ");
		var cquery = "";
		if ($("#cquery").length > 0){
			cquery = $("#cquery").val();
		}
		if (cquery == "") $("#cquery").val("   ");
		if (txt.indexOf("<") != -1 || txt.indexOf(">") != -1 || txt.indexOf("/") != -1 || txt.indexOf('"') != -1 ||
		cquery.indexOf("<") != -1 || cquery.indexOf(">") != -1 || cquery.indexOf("/") != -1 || cquery.indexOf('"') != -1){
			$(".warningtxt").removeClass("hide").fadeOut(3000, function(){$(".warningtxt").addClass("hide").fadeIn(1000);});
			return event.preventDefault();
		}else{
			return true;
		}
	}); 

	$("#selcatbtn").click(function(){
		if ($('.category-selector').hasClass("open")){
			$(".cat-btns .apply").trigger("click");
		}else{
			$('.category-selector').toggleClass("open");
		}
		return false;
	});

	$(".cat-btns .apply").click(function(){
		var catTxt = "";
		$(".categories .categorychk").each(function(){
			if ($(this).is(":checked")){
				catTxt += $(this).val() + ",";
			}
		});
		if (catTxt.length > 0) catTxt = catTxt.substring(0, catTxt.length-1);
		if (catTxt != ""){
			$("#selcatbtn").addClass("bgblue");
		}else{
			$("#selcatbtn").removeClass("bgblue");
		}
		$(".category").html(catTxt).val(catTxt);
		$("#category").val(catTxt); 
		$('.category-selector').toggleClass("open");
	});

	$(".cat-btns .cancel").click(function(){
		$("#selcatbtn").removeClass("bgblue");
		$(".category").val("").html("");
		$("#category").val(""); 
		$(".categories .categorychk").each(function(){
			if ($(this).is(":checked")){
				$(this).prop('checked',false); 
			}
		});
		$('.category-selector').toggleClass("open");
	});

	var alignVideo = function() {
		var videoWrapperItem = $('.video-wrapper-4'); 
		if (window.innerWidth < 507) videoWrapperItem = $('.video-wrapper-2'); 
		videoWrapperItem.each(function() {
			var maxHeight = 0;
			$(this).find('.video .desc').each(function() {
				if (maxHeight < $(this).height()) 
					maxHeight = $(this).height();
			});
			$(this).find('.video .desc').height(maxHeight); 
		}); 
	};
	alignVideo(); 
	$(window).resize(function() {
		$('.video-wrapper-2 .video .desc').height("inherit"); 
		alignVideo(); 
	}); 

    if (typeof fancyboxOverlay == "undefined") {
	    $(".fancybox").fancybox({
	    	helpers: {
	    		overlay: {
		    		closeClick: false
	    		}
    		}, 
    		wrapCSS: 'video',
    		onUpdate: resizeVideoFancybox
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
		
    if ($('.focus-gallery-wrapper .carousel-inner .item').length > 0) {
	    initCarousel(); 
        $(window).resize(function() { 
			updateCarousel(); 
		}); 
    }
    
    if ($(".category-wrapper").height() < 400 && $(window).width() > 767 ) {
    	$(".category-wrapper").addClass("fixed");
    }
});

if (window.localStorage !== undefined) {
	window.localStorage.setItem("referrer", document.location.href); 
} else if (window.sessionStorage !== undefined) {
	window.sessionStorage.setItem("referrer", document.location.href); 
}