(function ($) {
    'use strict';

    var defaults = {
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset: 0
    };

    $.scrollIt = function (options) {

        var settings = $.extend(defaults, options),
            active = 0,
            lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');
        var navigate = function (ndx) {
            if (ndx < 0 || ndx > lastIndex) return;

            var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
            $('html,body').animate({
                scrollTop: targetTop,
                easing: settings.easing
            }, settings.scrollTime);
        };

        var doScroll = function (e) {
            var target = $(e.target).closest("[data-scroll-nav]").attr('data-scroll-nav') ||
                $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
            navigate(parseInt(target));
        };

        var keyNavigation = function (e) {
            var key = e.which;
            if ($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
                return false;
            }
            if (key == settings.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if (key == settings.downKey && active < lastIndex) {
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        var updateActive = function (ndx) {
            if (settings.onPageChange && ndx && (active != ndx)) settings.onPageChange(ndx);

            active = ndx;
            $('[data-scroll-nav]').removeClass(settings.activeClass);
            $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass);
        };

        var watchActive = function () {
            var winTop = $(window).scrollTop();

            var visible = $('[data-scroll-index]').filter(function (ndx, div) {
                return winTop >= $(div).offset().top + settings.topOffset &&
                    winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight()
            });
            var newActive = visible.first().attr('data-scroll-index');
            updateActive(newActive);
        };

        $(window).on('scroll', watchActive).scroll();

        $(window).on('keydown', keyNavigation);

        $('body').on('click', '[data-scroll-nav], [data-scroll-goto]', function (e) {
            e.preventDefault();
            doScroll(e);
        });

    };
}(jQuery));

$(document).ready(function () {
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 90) {
            $(".navbar").addClass("navbar-shrink");
        } else {
            $(".navbar").removeClass("navbar-shrink");
        }
    });

    function parallaxMouse() {
        if ($("#parallax").length) {
            var scene = document.getElementById("parallax");
            var parallax = new Parallax(scene);
        }
    }

    parallaxMouse();

    $(window).scroll(function () {
        var hT = $("#skill-bar-wrapper").offset().top;
        var hH = $("#skill-bar-wrapper").outerHeight();
        var wH = $(window).height();
        var wS = $(this).scrollTop();

        if (wS > (hT + hH - 1.4 * wH)) {
            jQuery('.skillbar-container').each(function () {
                jQuery(this).find('.skills').animate({
                    width: jQuery(this).attr('data-percent')
                }, 5000)
            })
        }
    })

    let $btns = $('.img-gallery .sortBtn .filter-btn');
    $btns.click(function (e) {
        $('.img-gallery .sortBtn .filter-btn').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.img-gallery .grid').isotope({
            filter: selector
        })
        return false;
    })

    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    })


    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    })

    $.scrollIt({
        topOffset: -50
    })

    $(".nav-link").on("click", function () {
        $(".navbar-collapse").collapse("hide");
    })

});