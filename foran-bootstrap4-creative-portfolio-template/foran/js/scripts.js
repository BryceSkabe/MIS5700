/*********************************************************************************

	Template Name: Foran - Bootstrap4 Creative Portfolio Template
	Description: A perfect template for build beautiful and unique portfolio websites. It comes with nice and clean design.
	Version: 1.0

    Note: This is scripts js. All custom scripts here.

**********************************************************************************/

(function ($) {
    'use strict';


    /* Header Style 1 Sticky Header */
    $(window).on('scroll', function () {

        var scrollPos = $(this).scrollTop();
            
        if (scrollPos > 300) {
            $('.sticky-header').addClass('is-sticky');
        } else {
            $('.sticky-header').removeClass('is-sticky');
        }

    });


    $('<div class="body-overlay"></div>').prependTo('.wrapper');


    /* Expandable Menu */
	function expandableSearchbox() {
        var trigger = $('.expandable-search-trigger'),
            container = $('.expandable-searchbox');

        trigger.on('click', function (e) {
			e.preventDefault();
            $(this).find('i.fa').toggleClass('fa-close');
            container.toggleClass('is-visible');
        });

        container.on('focus', 'input', function () {
            $(this).parents('form').addClass('focused');
        });
        container.on('focusout', 'input', function () {
            $(this).parents('form').removeClass('focused');
            var $this = $(this);
            if ($this.val().trim().length !== 0) {
                $(this).parents('form').addClass('focused');
            }
        });

        $('.close').on('click', function () {
            container.removeClass('is-visible');
            trigger.find('i.fa').removeClass('fa-close');
        });

    }
    expandableSearchbox();



    /* Sidemenu Toggler */
    function sidemenuTooggle(){
        $('.sidemenu-toggle-trigger').on('click', function(){
            $('.body-overlay').addClass('is-visible');
            $('.sidemenu-area').toggleClass('is-visible');
        });
        $('.body-overlay').on('click', function(){
            $(this).removeClass('is-visible');
            $('.sidemenu-area').removeClass('is-visible');
        });
        $('<button class="close"><i class="fa fa-close"></i></button>').prependTo('.sidemenu-area').on('click', function(){
            $('.body-overlay').removeClass('is-visible');
            $('.sidemenu-area').removeClass('is-visible');
        });
    }
    sidemenuTooggle();



    /* Progress Bar Effect */
    $(window).on('scroll', function () {

        function winScrollPosition() {
            var scrollPos = $(window).scrollTop(),
                winHeight = $(window).height();
            var scrollPosition = Math.round(scrollPos + (winHeight / 1.2));
            return scrollPosition;
        }

        var trigger = $('.progress-bar');
        if (trigger.length) {
            var triggerPos = Math.round(trigger.offset().top);
            if (triggerPos < winScrollPosition()) {
                trigger.each(function () {
                    $(this).addClass('fill');
                });
            }
        }

    });



})(jQuery);