	$(document).ready(function(){
	$("#controls li a").click(function(){
        /*Performed when a control is clicked */
	    var rel = $(this).attr("rel");
	    if ( $("#" + rel).hasClass("current") ){
	        return false;
	    }
	    $("#" + rel).stop(true,true).show();
	    $(".current").removeClass("current").css("display","none");
	    $("#" + rel).addClass("current");
	    $(".active").removeClass("active");
	    $(this).parents("li").addClass("active");
	    //set_new_interval(5000);
	    return false;
	});

    });
    function banner_switch(){
        /*This function is called on to switch the banners out when the time limit is reached */
        var next = $('.current').next('.banner').length ? 
            $('.current').next('.banner') : $('#banners div:first');
		$(next).fadeIn("slow");
        $(".current").removeClass("current").css("display","none");
        $(next).addClass("current");
        var next_link = $(".active").next("li").length ? $('.active').next('li') : $('#controls li:first');
        $(".active").removeClass("active");
        $(next_link).addClass('active');
    }
    $(function() {
        /*Initial timer setting */
        timer = setInterval("banner_switch()", 5000);
    });
    function set_new_interval(interval){
        /*Simply clears out the old timer interval and restarts it */
        clearInterval(timer);
        slide = setInterval("banner_switch()", interval);
    }

