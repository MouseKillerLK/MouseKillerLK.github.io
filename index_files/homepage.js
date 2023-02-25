function show_msg(content, type){
	var html = '<div class="alert alert-'+type+'">'+content+'</div>';
	$(".header .container").append(html);
	setTimeout(function(){$(".header .container .alert").remove();}, 2000);
}
function show_icon_msg(targetObj, content, icon) {
	if (icon == "success") {
		targetObj.parent().removeClass("has-error").addClass("has-success");
		targetObj.parent().find(".form-control-feedback").removeClass("glyphicon-remove").addClass("glyphicon-ok");
	}else {
		targetObj.parent().removeClass("has-success").addClass("has-error");
		targetObj.parent().find(".form-control-feedback").removeClass("glyphicon-ok").addClass("glyphicon-remove");
		targetObj.parent().find(".span-error").html(content).fadeIn();
		targetObj.focus();
		setTimeout(function(){
			$(".span-error").fadeOut();
			$(".signup-container .form-group").removeClass("has-error");
        	$(".signup-container .glyphicon").removeClass("glyphicon-remove");
        	$(".signup-container .span-error").html("");
        }, 2000);
	}
	return true;
}
function topicnews(){
	/*if ($(".topic-list .active").length == 0) {
		$(".topic-list .quick-read:first-child").next().addClass("active");
	}else if ($(".topic-list .active").next().length == 0){
		$(".topic-list .active").removeClass("active");
		$(".topic-list .quick-read:first-child").addClass("active");
	}else{
		var active = $(".topic-list .active");
		$(".topic-list .active").removeClass("active");
		active.next().addClass("active");
	}
	$(".topic-news").fadeOut("slow", function(){
		$(".topic-news").html($(".topic-list .active").clone()).fadeIn("slow");
	});*/
	
	/*
	$(".topic-news div").animate({top: "-=16"}, 3000, function(){
		if ($(".topic-news .quick-read").length >= 2){
			$(".topic-news .quick-read").eq(0).remove();
			$(".topic-news .quick-read").css('top', '0px');
		}
	});*/
	
}

function activityImgSlider() {
	if ($(".activity .gallery").length > 1) {
		var nextPhoto = $(".activity .gallerys .active").next();
		var gPhoto = $(".activity .gallerys .active").clone();
		$(".activity .gallerys .active").remove();
		nextPhoto.addClass("active");
		gPhoto.removeClass("active");
		$(".activity .gallerys").append(gPhoto);
	}
}

function imgSlider(){
	activityImgSlider();
	$(".gallery-container .active").fadeOut("3000", function() {
		$(".gallery-container .active").next().fadeIn("3000", function() {
			var nextPhoto = $(".gallery-container .active").next();
			var gPhoto = $(".gallery-container .active").clone();
			$(".gallery-container .active").remove();
			nextPhoto.addClass("active");
			gPhoto.removeClass("active");
			$(".gallery-container").append(gPhoto);
			setTimeout(imgSlider, 10000);
			videoSlider();
		});
	});
}
function videoSlider(){
	$(".video-container .active").fadeOut("3000", function() {
		$(".video-container .active").next().fadeIn("3000", function() {
			var nextPhoto = $(".video-container .active").next();
			var gPhoto = $(".video-container .active").clone();
			$(".video-container .active").remove();
			nextPhoto.addClass("active");
			gPhoto.removeClass("active");
			$(".video-container").append(gPhoto);
		});
	});
}
$(window).load(function () {
	setActivityHeight();
	$(window).resize(setActivityHeight); 
	setTimeout(imgSlider, 6000);
});
function setActivityHeight() {
	var width = $(".gallery.active .item").css("width").replace("px", "");
	width++; width--;
	var height = width * 2/3;
	$(".gallery .item").css("height", height + "px");
	$(".gallery .item img").css("max-height", (height - 5) + "px");
}
$(document).ready(function(){
	$(".cat-title").click(function() {
		window.location.href = $(this).children("a").attr("href");
	});
	isTouch	  = document.createTouch !== undefined;
	$(".topic-news a").mouseover(function() {
		document.getElementById("quick_marquee").stop();
	});
	$(".topic-news a").mouseout(function() {
		document.getElementById("quick_marquee").start();
	});
	
	
	var height = 0;
	/*$(".video-item .desc").each(function(){
		if (height < $(this).height()){
			height = $(this).height();
		}
	});
	$(".video-item .desc").height(height + 'px');*/
	$(".photo-toggle a").click(function(){
		if ($(window).width() < 768) flag = false;
		else flag = true;
	});
	$(".photo-toggle").click(function(){
		if (flag) {
			var $photoObj = $(this);
			if ($photoObj.hasClass("open")){
				/*if (screen.width > 768) {
				   return true;
				}*/
				$photoObj.next().next().find(".photo-block").fadeOut(function(){$photoObj.removeClass("open");});
			}else{
				$photoObj.next().next().find(".photo-block").fadeIn(function(){$photoObj.addClass("open");});
			}
		}
	});
	$(".video-toggle a").click(function(){
		if ($(window).width() < 768) flag = false;
		else flag = true;
	});
	$(".video-toggle").click(function(){
		if (flag) {
			var $videoObj = $(this);
			if ($videoObj.hasClass("open")){
				/*if (screen.width > 768) {
				   return true;
				}*/
				$videoObj.parent().next().next().fadeOut(function(){$videoObj.removeClass("open");});
			}else{
				
				$videoObj.parent().next().next().fadeIn(function(){$videoObj.addClass("open");});
			}
		}
	});
	$('.search-form').on("submit", function(event) {
		var txt = $(".search-text").val();
		var cquery = $("#cquery").val();
		if (txt.indexOf("<") != -1 || txt.indexOf(">") != -1 || txt.indexOf("/") != -1 || txt.indexOf('"') != -1 ||
		cquery.indexOf("<") != -1 || cquery.indexOf(">") != -1 || cquery.indexOf("/") != -1 || cquery.indexOf('"') != -1){
			$(".warningtxt").removeClass("hide").fadeOut(3000, function(){$(".warningtxt").addClass("hide").fadeIn(1000);});
			return event.preventDefault();
		}else{
			return true;
		}
	}); 
	$("#kw_disp_title").keydown(function(event){
		if (event.keyCode == "13"){
			$(".search-btn").trigger("click");
		}
	});
	
	
	$("#user_id").keydown(function(event){
		if (event.keyCode == 13) {
			$("#user_pass").focus();
		}
	});
	$("#user_pass").keydown(function(event){
		if (event.keyCode == 13) {
			$(".login-confirm").trigger("click");
		}
	});
	
	$(".btn-status").click(function(){
		var addTr = $(this).closest('tr');
		$.ajax({
            url: globalContextPath + '/kp/home/saveCSRList.kcmsf',
            method: 'post',
            dataType: 'json',
            data: {
            	'id': addTr.find(".status").attr("data-id"),
            	'issue': addTr.find(".issue").text(),
            	'developer': addTr.find(".developer").text(),
            	'status': addTr.find(".status").attr("status-id") == '1'?0:1
            	},
            success: function (data) {
            	if (data.success == "0"){
            		
	                addTr.find(".status").attr("status-id", addTr.find(".status").attr("status-id") == '1'?'0':'1');
	                var text1 = "??????";
	                var text2 = "??????";
	                if (addTr.find(".status").attr("status-id") == '1') {
	                	addTr.removeClass("warning").addClass("success");
	                	addTr.find(".btn-status").html(text1);
	                }else{
	                	addTr.removeClass("success").addClass("warning");
	                	addTr.find(".btn-status").html(text2);
	                }
	                
                }else{
                	
                }
            },
            error: function() {
                
            }
        }); 
	});
	

    $(".screen .fancybox").fancybox({
	    	helpers: {
	    		overlay: {
		    		closeClick: false
	    		}
    		}, 
    		wrapCSS: 'video',
    		onUpdate: resizeVideoFancybox
		});
		

    $(".img .fancybox").fancybox({
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
	
	//--------event process for search bar-----------------
	
	$(".search-settings").click(function(e){
		e.preventDefault();
		$('.search-form').toggleClass("toggled"); 
		return false;
	});
	$("#selcatbtn").click(function(){
		if ($('.category-wrapper').hasClass("open")){
			$(".cat-btns .apply").trigger("click");
		}else{
			$('.category-wrapper').toggleClass("open");
		}
		return false;
	});
	$(".cat-btns .apply").click(function(){
		var catList = "";
		var catTxt = "";
		$(".categories .categorychk").each(function(){
			if ($(this).is(":checked")){
				catList += $(this).val() + ",";
				catTxt += $(this).next().html() + ",";
			}
		});
		if (catList != ""){
			catList = catList.substring(0, catList.length-1);
			$("#selcatbtn").addClass("bgblue");
		}else{
			$("#selcatbtn").removeClass("bgblue");
		}
		$(".category-txt").html(catTxt);
		$("#category").val(catList);
		$('.category-wrapper').toggleClass("open");
	});
	$(".cat-btns .cancel").click(function(){
		$("#selcatbtn").removeClass("bgblue");
		$("#category").val("");
		$(".category-txt").html("");
		$(".categories .categorychk").each(function(){
			if ($(this).is(":checked")){
				$(this).prop('checked',false); 
			}
		});
		$('.category-wrapper').toggleClass("open");
	});
	
});

if (window.localStorage !== undefined) {
	window.localStorage.setItem("referrer", document.location.href); 
} else if (window.sessionStorage !== undefined) {
	window.sessionStorage.setItem("referrer", document.location.href); 
}