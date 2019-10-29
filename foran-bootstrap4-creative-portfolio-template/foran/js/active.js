/*********************************************************************************

	Template Name: Foran - Bootstrap4 Creative Portfolio Template
	Description: A perfect template for build beautiful and unique portfolio websites. It comes with nice and clean design.
	Version: 1.0

	Note: This is active js. Plugins activation code here.

**********************************************************************************/



(function ($) {
	'use strict';

	
	/* Fake Loader */
	$('.fakeloader').fakeLoader({
		timeToHide: 1200,
		bgColor: '#de2532',
		spinner: 'spinner4',
	});




	/* Scroll Up Activation */
	$.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
	});



	/* Mobile Menu Activation */
	$('nav.cr-navigation').meanmenu({
		meanMenuClose: '<img src="images/icons/icon-close.png" alt="close icon">',
		meanMenuCloseSize: '18px',
		meanScreenWidth: '991',
		meanExpandableChildren: true,
		meanMenuContainer: '.mobile-menu',
		onePage: true
	});



	/* Projects Filtering */
	var $gallery = $('.fn-portfolios-2');
	var $boxes = $('.fn-portfolio-single');
	$boxes.hide();
	$gallery.imagesLoaded({
		background: true
	}, function () {
		$boxes.fadeIn();
		$gallery.isotope({
			itemSelector: '.fn-portfolio-single',
		});
	});
	
	var filterValueNew = '.portfolio-actionbox-zoom';
	$('.portfolio-filters-2').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter');
		$('.fn-portfolios-2').isotope({
			filter: filterValue
		});
		
		filterValueNew = '' + filterValue + ' .portfolio-actionbox-zoom';
		if (filterValueNew == '* .portfolio-actionbox-zoom'){
			filterValueNew = '.portfolio-actionbox-zoom';
		}
		$gallery.data('lightGallery').destroy(true);
		$gallery.lightGallery({
			selector: filterValueNew,
			thumbnail: false,
		});
	});

	$gallery.lightGallery({
		selector: filterValueNew,
		thumbnail: false,
	});

	$('.portfolio-filters-2').on('click', 'button', function () {
		$('.portfolio-filters-2 button').removeClass('is-checked');
		$(this).addClass('is-checked');
	});






	/* Projects Filtering 2 */
	var $gallery2 = $('.fn-portfolios');
	var $boxes2 = $('.fn-portfolio-single');
	$boxes2.hide();
	$gallery2.imagesLoaded({
		background: true
	}, function () {
		$boxes2.fadeIn();
		$gallery2.isotope({
			itemSelector: '.fn-portfolio-single',
		});

		$('.portfolio-suffle-button').on( 'click', function() {
			$gallery2.isotope('shuffle');
		});

	});

	var filterValue2New = '.single-portfolio-thumb';
	$('.portfolio-filters').on('click', 'button', function () {
		var filterValue2 = $(this).attr('data-filter');
		$('.fn-portfolios').isotope({
			filter: filterValue2,
			itemSelector: '.fn-portfolio-single',
		});

		filterValue2New = '' + filterValue2 + ' .single-portfolio-thumb';
		if (filterValue2New == '* .single-portfolio-thumb') {
			filterValue2New = '.single-portfolio-thumb';
		}
		$gallery2.data('lightGallery').destroy(true);
		$gallery2.lightGallery({
			selector: filterValue2New
		});
	});

	$gallery2.lightGallery({
		selector: filterValue2New
	});

	$('.portfolio-filters').on('click', 'button', function () {
		$('.portfolio-filters button').removeClass('is-checked');
		$(this).addClass('is-checked');
	});



	/* Recent Portfolio Popup */
	$('.recent-portfolio-slider').lightGallery({
		selector: '.portfolio-actionbox-zoom',
		thumbnail: false,
	});




	/* Banner Image Slider */
	$('.banner-images').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
		nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
		adaptiveHeight: true,
		dots: false,
		dotsClass: 'cr-slider-dots',
		fade: false,
	});




	/* Testimonial 2 slider */
	$('.testimonial2-wrapper').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
		nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
		adaptiveHeight: true,
		dots: true,
		dotsClass: 'cr-slider-dots',
		fade: false,
	});





	/* Brand Logo Slider */
	$('.brand-logos-slider').slick({
		slidesToShow: 6,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
		nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
		dots: false,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
	});


	/* Recent Portfolio Slider */
	$('.recent-portfolio-slider').slick({
		slidesToShow: 4,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
		nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
		dots: false,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
	});


	/* Popular Post Slider */
	$('.polular-post-slider-active').slick({
		slidesToShow: 4,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
		nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
		dots: false,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
	});


	/* Popular Post Slider for Sidebar */
	$('.polular-post-slider-active-3-items').slick({
		slidesToShow: 3,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
		nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
		dots: false,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
	});




	/* Testimonial Slider */
	$('.testimonial-wrap').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
		nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
		adaptiveHeight: true,
		dots: true,
		dotsClass: 'cr-slider-dots',
		fade: false,
	});





	/* Odometer Activation */
	if( $('.odometer').length ){

		var elemOffset = $('.odometer').offset().top;
		var winHeight = $(window).height();

		if(elemOffset < winHeight){

			$('.odometer').each(function(){
				$(this).html($(this).data('count-to'));
			});

		}

		$(window).on('scroll', function(){

			function winScrollPosition() {
				var scrollPos = $(window).scrollTop(),
					winHeight = $(window).height();
				var scrollPosition = Math.round(scrollPos + (winHeight / 1.2));
				return scrollPosition;
			}
			

			var scrollPos = $(this).scrollTop();
			var elemOffset = $('.odometer').offset().top;
			var winHeight = $(window).height();

			if ( elemOffset < winScrollPosition()) {

				$('.odometer').each(function(){
					$(this).html($(this).data('count-to'));
				});

			}
			
		});

	}



	
	/* Instafeed Activation */
	if($('#sidebar-instagram-feed').length){

		var userFeed = new Instafeed({
			get: 'user',
			userId: 6665768655,
			accessToken: '6665768655.1677ed0.313e6c96807c45d8900b4f680650dee5',
			target: 'sidebar-instagram-feed',
			resolution: 'standard_resolution',
			limit: 4,
			template: '<div class="sidebar-instafeed-single"><a href="{{link}}" target="_new"><img src="{{image}}" /><span>{{caption}}</span></a></div>',
			
			after: function() {

				$('#sidebar-instagram-feed').slick({
					slidesToShow: 1,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: false,
					dots: true,
					adaptiveHeight: true,
				});

			},
		});
		userFeed.run();

	}




	/* Nice Select Activation */
	$('select').niceSelect();




	/* Twitter Feed */
	if($('#sidebar-twitter-feed').length){

		var configProfile = {
			"profile": {"screenName": 'devitemsllc'},
			"domId": 'sidebar-twitter-feed',
			"maxTweets": 2,
			"enableLinks": true, 
			"showUser": false,
			"showTime": true,
			"showImages": true,
			"lang": 'en'
		};

		twitterFetcher.fetch(configProfile);

	}
	


	/* Twitter Feed Activation */
	if($('#twitter-feeds').length){

		var configProfile2 = {
			"profile": {"screenName": 'devitemsllc'},
			"domId": 'twitter-feeds',
			"maxTweets": 2,
			"enableLinks": true, 
			"showUser": false,
			"showTime": true,
			"showImages": true,
			"lang": 'en'
		};

		twitterFetcher.fetch(configProfile2);

	}



	/* Parallax Background */
	$('.bg-parallax').jarallax();



	
	/* Match Height */
	$('.service-content').matchHeight({
		property: 'min-height',
		target: $('.service-thumb')
	});



	/* Sticky Sidebar Activation */
	$('.sticky-sidebar-active').theiaStickySidebar({
		additionalMarginTop: 30
	});



	/* Mailchimp Activation */
	$('#mc-form').ajaxChimp({
		language: 'en',
		callback: mailChimpResponse,
		// ADD YOUR MAILCHIMP URL BELOW HERE!
		url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'
	
	});
	
	function mailChimpResponse(resp) {	
		if (resp.result === 'success') {
			$('.mailchimp-success').html('' + resp.msg).fadeIn(900);
			$('.mailchimp-error').fadeOut(400);
			
		} else if(resp.result === 'error') {
			$('.mailchimp-error').html('' + resp.msg).fadeIn(900);
		}  
	}

})(jQuery);
