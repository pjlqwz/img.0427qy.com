
var _functions = {};

$(function() {
    /*$(function(){
        $(".headerpage").load("header.html");
        $(".footerpage").load("footer.html");
    });	*/

    /*"use strict";*/
    /* "涓ユ牸妯″紡"鏄竴绉嶅湪JavaScript浠ｇ爜杩愯鏃惰嚜鍔ㄥ疄琛屾洿涓ユ牸瑙ｆ瀽鍜岄敊璇鐞嗙殑鏂规硶銆傝繖绉嶆ā寮忎娇寰桱avascript鍦ㄦ洿涓ユ牸鐨勬潯浠朵笅杩愯銆�*/

    /*================*/
    /* VARIABLES */
    /* Navigator 瀵硅薄鍙嶅簲鐨勬槸鏈夊叧娴忚鍣ㄧ殑娑堟伅 */
    /*================*/
    var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

    /*========================*/
    /* page calculations */
    /*========================*/
    _functions.pageCalculations = function(){
        winW = $(window).width();
        winH = $(window).height();
    };

    /*=================================*/
    /* function on document ready */
    /*=================================*/
    if(_ismobile) $('body').addClass('mobile');
    _functions.pageCalculations();

    /*============================*/
    /* function on page load */
    /*============================*/
    $(window).load(function(){
        _functions.initSwiper();
        $('body').addClass('loaded');
        $('#loader-wrapper').delay(1000).fadeOut();
    });

    /*function handlePreloader() {
        if($('.preloader').length){
            $('.preloader').delay(200).fadeOut(500);
        }
    }*/

    /*==============================*/
    /* function on page resize */
    /*==============================*/
    _functions.resizeCall = function(){
        _functions.pageCalculations();
    };
    if(!_ismobile){
        $(window).resize(function(){
            _functions.resizeCall();
        });
    } else{
        window.addEventListener("orientationchange", function() {
            _functions.resizeCall();
        }, false);
    }

    /*==============================*/
    /* function on page scroll */
    /*==============================*/

    $(window).scroll(function(){
        _functions.scrollCall();
    });

    _functions.scrollCall = function(){
        winScr = $(window).scrollTop();

        if (winScr > 130){
            $(".tt-header").addClass("stick fadeInDown animated");
        } else {
            $(".tt-header").removeClass("stick fadeInDown animated");
        }

    };




    /*=====================*/
    /* swiper sliders */
    /*=====================*/
    var initIterator = 0;

    _functions.initSwiper = function(){

        $('.swiper-container').not('.initialized').each(function(){
            var $t = $(this);

            var index = 'swiper-unique-id-'+initIterator;

            $t.addClass('swiper-'+index+' initialized').attr('id', index);
            $t.find('.swiper-pagination').addClass('swiper-pagination-'+index);
            $t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
            $t.find('.swiper-button-next').addClass('swiper-button-next-'+index);

            var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
            if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
                pagination: '.swiper-pagination-'+index,
                paginationClickable: true,
                nextButton: '.swiper-button-next-'+index,
                prevButton: '.swiper-button-prev-'+index,
                slidesPerView: slidesPerViewVar,
                autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
                loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
                autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):5000,
                breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
                initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
                speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):1500,
                keyboardControl: true,
                mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
                mousewheelReleaseOnEdges: true,
                spaceBetween: ($t.is('[data-space-between]'))?parseInt($t.data('space-between'), 10):0,
                direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
                onSlideChangeEnd: function(swiper){
                    var animationBlocks = $t.find('.swiper-slide-active .text-animation');
                    for (var i = 0; i < animationBlocks.length; ++i ){
                        $(animationBlocks[i]).addClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
                    }
                },
                onSlideChangeStart: function(swiper){
                    var animationBlocks = $t.find('.swiper-slide-active .text-animation');
                    for (var i = 0; i < animationBlocks.length; ++i ){
                        $(animationBlocks[i]).removeClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
                    }
                },
            });
            swipers['swiper-'+index].update();
            initIterator++;
        });
        $('.swiper-container.swiper-control-top').each(function(){
            swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
        });
        $('.swiper-container.swiper-control-bottom').each(function(){
            swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
        });
    };



    //menu
    $('.cmn-toggle-switch').on('click', function(e){
        $(this).toggleClass('active');
        $(this).parents('header').find('.toggle-block').slideToggle();
        e.preventDefault();
    });
    $('.main-nav .menu-toggle').on('click', function(e){
        $(this).closest('li').toggleClass('select').siblings('.select').removeClass('select');
        $(this).closest('li').siblings('.parent').find('.submenu').slideUp();
        $(this).closest('a').siblings('.submenu').slideToggle();
        $(this).closest('li').siblings('.parent').find('.submenu02').slideUp();
        $(this).closest('a').siblings('.submenu02').slideToggle();
        e.preventDefault();
    });



    /* accordeon */
    $('.tt-accordeon-title').on('click', function(){
        $(this).closest('.tt-accordeon').find('.tt-accordeon-title').not(this).removeClass('active').next().slideUp();
        $(this).toggleClass('active').next().slideToggle();


    });

    /* 寮瑰嚭 */
    $('.btn-tcly').click(function(){
        $('.zzsc').show(0);
        $('.content_mark').show(0);
    });
    $('.content_mark').click(function(){
        $('.zzsc').hide(0);
        $('.content_mark').hide(0);
    });
    $('.popupCancel').click(function(){
        $('.zzsc').hide(0);
        $('.content_mark').hide(0);
    });





    /* 濉厖杩涘害鏉� */
    $('.barfiller').barfiller({ barColor: '#e50012' });

    /*  - project carousel */
    var owl = $('.owl-carousel1');
    owl.owlCarousel({

        margin: 30,
        nav: true,
        loop: true,
        dots: true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        fluidSpeed:true,
        responsive: {
            0: {
                items: 1,

            },
            600: {
                margin: 0,
                items: 3
            },
            767:{
                margin: 30,
                items: 4,
            },
            1000: {
                margin: 30,
                items: 4
            },
            1400: {
                margin: 30,
                items: 5
            }
        }
    })

    var owl = $('.owl-carousel2');
    owl.owlCarousel({

        margin: 30,
        nav: true,
        loop: true,
        dots: true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        fluidSpeed:true,
        responsive: {
            0: {
                items: 1,

            },
            600: {
                margin: 0,
                items: 3
            },
            767:{
                margin: 30,
                items: 4,
            },
            1000: {
                margin: 30,
                items: 4
            },
            1400: {
                margin: 30,
                items: 5
            }
        }
    })

    var owl = $('.owl-carousel3');
    owl.owlCarousel({

        margin: 30,
        nav: true,
        loop: true,
        dots: true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        fluidSpeed:true,
        responsive: {
            0: {
                items: 2,

            },
            600: {
                margin: 0,
                items: 3
            },
            767:{
                margin: 30,
                items: 4,
            },
            1000: {
                margin: 30,
                items: 4
            },
            1400: {
                margin: 30,
                items: 5
            }
        }
    })

    $('.play').on('click',function(){
        owl.trigger('play.owl.autoplay',[1000])
    })
    $('.stop').on('click',function(){
        owl.trigger('stop.owl.autoplay')
    })

    $( ".owl-prev").html('<i class="icofont icofont-thin-left"></i>');
    $( ".owl-next").html('<i class="icofont icofont-thin-right"></i>');

    $( ".owl-prev").html('<i class="icofont icofont-rounded-left"></i>');
    $( ".owl-next").html('<i class="icofont icofont-rounded-right"></i>');

    $( ".owl-prev").html('<i class="fa fa-angle-left"></i>');
    $( ".owl-next").html('<i class="fa fa-angle-right"></i>');


    // 鏁板瓧婊氬姩
    $('.counter-value').each(function(){
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        },{
            duration: 3000,
            easing: 'swing',
            step: function (now){
                $(this).text(Math.ceil(now));
            }
        });
    });




    // TAB鍒囨崲棣栭〉瑙ｅ喅鏂规
    $(".taba ul li").click(function(){
        $(".taba-c .tabacontent").hide().eq($(".taba ul li").removeClass().index($(this).addClass("current"))).show();
    });

    // TAB鍒囨崲瑙ｅ喅鏂规sol椤�
    $(".tabb ul li").click(function(){
        $(".tabb-c .tabbcontent").hide().eq($(".tabb ul li").removeClass().index($(this).addClass("current"))).show();
    });

    // TAB鍒囨崲瀹㈡埛鎴愬姛case椤�
    $(".tabc ul li").click(function(){
        $(".tabc-c .tabccontent").hide().eq($(".tabc ul li").removeClass().index($(this).addClass("current"))).show();
    });

    // TAB鍒囨崲瀹㈡埛鎴愬姛pro01-YonSuite椤�
    $(".tabd ul li").click(function(){
        $(".tabd-c .tabdcontent").hide().eq($(".tabd ul li").removeClass().index($(this).addClass("current"))).show();
    });

    // TAB鍒囨崲瀹㈡埛鎴愬姛pro01-U9Cloud椤�
    $(".tabe ul li").click(function(){
        $(".tabe-c .tabecontent").hide().eq($(".tabe ul li").removeClass().index($(this).addClass("current"))).show();
    });

    // TAB鍒囨崲鎸夐鍩�-閲囪喘浜�-鏈嶅姟鍦烘櫙aly-caigou.html椤�
    $(".tabf ul li").click(function(){
        $(".tabf-c .tabfcontent").hide().eq($(".tabf ul li").removeClass().index($(this).addClass("current"))).show();
    });



    // 杩斿洖椤堕儴
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#mkdf-back-to-top').addClass('on');
        } else {
            $('#mkdf-back-to-top').removeClass('on');
        }
    });

    $('#mkdf-back-to-top').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });



    // 鍔犲噺璐墿杞︽暟閲�
    //$('.increaseQty').click(function() {
//			  var $input = $(this).parents('.qtySelector').find('.qtyValue');
//			  var val = parseInt($input.val(), 10);
//			  $input.val(val + 1);
//			});
//
//			$('.decreaseQty').click(function() {
//			  var $input = $(this).parents('.qtySelector').find('.qtyValue');
//			  var val = parseInt($input.val(), 10);
//			  $input.val(val - 1);
//			})

    $(".increaseQty").click(function(){
        var value=parseInt($('.qtyValue').val())+1;
        $('.qtyValue').val(value);
    })

    $(".decreaseQty").click(function(){
        var num = $(".qtyValue").val()
        if(num>0){
            $(".qtyValue").val(num-1);
        }

    })


    // Page Loaded...

    try {
        var ZoomImage = jQuery('.zoom, .zoom-image');
        ZoomImage.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    } catch(err) {
    }


    // 璇︽儏椤靛鍥惧垏鎹㈡斁澶ч暅
    var sdBoxW = $('.moveBox').css('width');
    sdBoxW = parseInt(sdBoxW);//绉诲姩灞傜殑瀹藉害
    var magBoxW = $('.magBox').css('width');
    magBoxW = parseInt(magBoxW);//鍥剧墖鏀惧ぇ灞傜殑瀹藉害
    var normalBoxW = $('.normalBox').css('width');
    normalBoxW = parseInt(normalBoxW);//浜嬩欢缁戝畾灞傜殑瀹藉害
    var num = 0;//瀛樻斁涓嬫爣
    //鎵惧嚭鏀惧ぇ鍥剧墖鐨勬瘮渚�(鏍稿績)
    var scale = magBoxW/sdBoxW;
    //绉诲叆normalBox鐩掑瓙
    $('.normalBox').hover(function () {
        $('.moveBox').css('display','block');
        $('.magBox').css('display','block');
    },function () {
        $('.moveBox').css('display','none');
        $('.magBox').css('display','none');
    });
    //3銆佺Щ鍏eftBox灞�
    $('.leftBox').mouseover(function () {
        //缁欐斁澶х殑鍥剧墖鍜屽浘鐗囧眰璁剧疆瀹藉害锛�
        $('.magBox ul li img').css('width',scale*normalBoxW+'px');
        $('.magBox ul li').css({'width':scale*normalBoxW+'px','height':scale*normalBoxW+'px'})
    });
    //4銆佽缃斁澶у€嶆暟
    var n = 1;
    function sty() {
        $('.moveBox').css({'width':200/n+'px','height':200/n+'px'});
        $('.multiple').html(n);
        scale = magBoxW/(sdBoxW/n);
    }
    $('.btn1').click(function () {
        n ++;
        sty()
    });
    $('.btn2').click(function () {
        if (n==1){
            return;
        } else {
            n --;
            sty()
        }
    }) ;
    //1銆佺Щ鍏ョ缉灏忓浘鍏宠仈
    $('.botBox ul li').attr('index',function (i,e) {
        return i;
    });
    $('.botBox ul li').mouseover(function () {
        if ($(this).attr('class')=='bord'){
            return;//璺宠繃绗竴涓�
        }else{
            $(this).attr('class','bord').siblings().removeAttr('class');
            var index = $(this).attr('index');
            //鑱斿姩normal鍜宮agBox涓殑鍥剧墖
            $('.normalBox .w').eq(index).attr('id','n').siblings().removeAttr('id');
            $('.magBox ul li').eq(index).attr('class','m').siblings().removeAttr('class');
            num = index;
        }
    });
    //2銆侀紶鏍囧湪绉诲姩灞傜Щ鍔�
    $('.normalBox').mousemove(function (e) {
        var offset = $(this).offset();
        var X = e.pageX-offset.left-$('.moveBox').width()/2;
        var Y = e.pageY-offset.top-$('.moveBox').height()/2;
        if (X<=0){
            X=0;
        }else if(X>$(this).width()-$('.moveBox').width()){
            X = $(this).width()-$('.moveBox').width();
        }
        if (Y<=0){
            Y=0;
        }else if(Y>$(this).height()-$('.moveBox').height()){
            Y = $(this).height()-$('.moveBox').height();
        }
        $('.moveBox').css('left',X+'px');
        $('.moveBox').css('top',Y+'px');
        $('.magBox ul li').eq(num).css('left',-X*scale+'px');
        $('.magBox ul li').eq(num).css('top',-Y*scale+'px');
    });

// 瑙嗛鍒楄〃
    $(".play").click(function () {
        var _src = $(this).attr("_src");
        $(".video_tc").fadeIn();
        $(".video_tc ._vid").html('<video autoplay="autoplay" controls><source src="' + _src + '" type="video/mp4"></video>');
    });
    $(".video_tc i").click(function () {
        $(".video_tc").fadeOut();
        $(".video_tc ._vid").html("");
    });
    $(".d_1 .d_1_play").click(function () {
        var type = $(this).attr('data-type');
        if (type == '闄勪欢') {
            var fj = $(this).attr('data-fj');
            $(".video_tc ._vid").html('<video autoplay="autoplay" controls><source src="' + fj + '" type="video/mp4"></video>');
        } else {
            var dm = $(this).attr('data-dm');
            $(".video_tc ._vid").html(dm);
        }
        $(".video_tc").fadeIn();
    });
    $(".d_s .d_1_play").click(function () {
        var type = $(this).attr('data-type');
        if (type == '闄勪欢') {
            var fj = $(this).attr('data-fj');
            $(".video_tc ._vid").html('<video autoplay="autoplay" controls><source src="' + fj + '" type="video/mp4"></video>');
        } else {
            var dm = $(this).attr('data-dm');
            $(".video_tc ._vid").html(dm);
        }
        $(".video_tc").fadeIn();
    });
    $(".video_tc i").click(function () {
        $(".video_tc").fadeOut();
        $(".video_tc ._vid").html('');
    });



//灞忚斀鍙抽敭鑿滃崟
//document.oncontextmenu = function (event){
//	if(window.event){
//		event = window.event;
//	}try{
//		var the = event.srcElement;
//		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
//			return false;
//		}
//		return true;
//	}catch (e){
//		return false;
//	}
//}

//灞忚斀绮樿创
//document.onpaste = function (event){
//	if(window.event){
//		event = window.event;
//	}try{
//		var the = event.srcElement;
//		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
//			return false;
//		}
//		return true;
//	}catch (e){
//		return false;
//	}
//}

//灞忚斀澶嶅埗
//document.oncopy = function (event){
//	if(window.event){
//		event = window.event;
//	}try{
//		var the = event.srcElement;
//		if(!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
//			return false;
//		}
//		return true;
//	}catch (e){
//		return false;
//	}
//}

//灞忚斀鍓垏
//document.oncut = function (event){
//	if(window.event){
//		event = window.event;
//	}try{
//		var the = event.srcElement;
//		if(!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
//			return false;
//		}
//		return true;
//	}catch (e){
//		return false;
//	}
//}

//灞忚斀閫変腑
//document.onselectstart = function (event){
//	if(window.event){
//		event = window.event;
//	}try{
//		var the = event.srcElement;
//		if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
//			return false;
//		}
//		return true;
//	} catch (e) {
//		return false;
//	}
//}



    /*--End--*/

});


//浠ヤ笅鏄痑os婊氬姩
//AOS.init({
//	easing: 'ease-out-back',
//	duration: 1000
//});

//$('.hero-scroll').on('click', function(e) {
//	$('html, body').animate({
//		scrollTop: $(window).height()
//	}, 1200);
//});
//
//function autoHeight() {
//	if (window.innerHeight) { //FF
//		nowHeight = window.innerHeight;
//	} else {
//		nowHeight = document.documentElement.clientHeight;
//	}
//	var jianHeight = 0;
//	if (nowHeight > jianHeight) {
//		document.getElementById('Full').style.height = nowHeight - jianHeight + 'px';
//	} else {
//		document.getElementById('Full').style.height = jianHeight + 'px';
//	}
//}
//autoHeight();
//window.onresize = autoHeight;
