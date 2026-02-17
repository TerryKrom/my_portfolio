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
    const isPT = window.location.pathname.includes("index-pt");

    /* =========================
      PORTFOLIO DATA
========================= */

    const salesforceProjects = [
        {
            title: "Custom Timeline LWC",
            desc: {
                en: "Reusable Lightning Web Component for dynamic timeline views inside Salesforce.",
                pt: "Componente Lightning reutilizável para visualização dinâmica de timelines dentro do Salesforce."
            },
            stack: ["LWC", "Apex", "SLDS"],
            repo: "https://github.com/TerryKrom/custom-timeline"
        },
        {
            title: "LWC Rich Text Editor",
            desc: {
                en: "Advanced rich text editor for Salesforce beyond platform limitations.",
                pt: "Editor avançado de texto rico para Salesforce além das limitações padrão da plataforma."
            },
            stack: ["LWC", "JavaScript", "Salesforce UI"],
            repo: "https://github.com/TerryKrom/lwc-rich-text-editor"
        },
        {
            title: "Stripe Payment Integration",
            desc: {
                en: "Stripe payment link generation integrated into Salesforce CRM.",
                pt: "Geração de links de pagamento Stripe integrada ao CRM Salesforce."
            },
            stack: ["Apex", "REST API", "Stripe"],
            repo: "https://github.com/TerryKrom/stripe-payment-link"
        }
    ];

    const frontendProjects = [
        {
            category: "react",
            title: "Forum CPS",
            img: "./assets/images/forum.png",
            repo: "https://github.com/cpsforum/cpsforum"
        },
        {
            category: "react-native",
            title: "Forum CPS Mobile",
            img: "./assets/images/forum-mobile.png",
            repo: "https://github.com/terrykrom/cps-forum-mobile"
        },
        {
            category: "react",
            title: "Artist Page",
            img: "./assets/images/dkj.png",
            repo: "https://github.com/terrykrom/cps-forum-mobile"
        },
        {
            category: "react",
            title: "Way to game",
            img: "./assets/images/waytogame.png",
            repo: "#"
        },
        {
            category: "html",
            title: "Love Site",
            img: "./assets/images/lovesite.png",
            repo: "https://github.com/Redyen-Softwares/isTheLoveSite"
        }
    ];


    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 90) {
            $(".navbar").addClass("navbar-shrink");
        } else {
            $(".navbar").removeClass("navbar-shrink");
        }
    });

    function renderSalesforce() {
        let container = $("#sf-projects");
        container.empty();

        salesforceProjects.forEach(p => {
            container.append(`
            <div class="col-lg-4 col-md-6">
                <div class="sf-project-card p-4 mt-3">
                    <h4>${p.title}</h4>
                    <p>${isPT ? p.desc.pt : p.desc.en}</p>
                    <div class="tech-stack">
                        ${p.stack.map(s => `<span>${s}</span>`).join("")}
                    </div>
                    <a href="${p.repo}" target="_blank" class="github-link">
                        <i class="fa-brands fa-github"></i> ${isPT ? "Ver Repositório" : "View Repository"}
                    </a>
                </div>
            </div>
        `);
        });
    }

    function renderFrontend() {
        let container = $("#frontend-grid");
        container.empty();

        frontendProjects.forEach(p => {
            container.append(`
            <div class="col-lg-4 col-md-6 col-sm-6 ${p.category}">
                <div class="single-work text-center mt-30">
                    <div class="work-image">
                        <img src="${p.img}" alt="${p.title}">
                    </div>
                    <div class="work-overlay">
                        <div class="work-content">
                            <h3 class="work-title">${p.title}</h3>
                            <ul>
                                <li>
                                    <a href="${p.img}" class="image-popup">
                                        <i class="fa-solid fa-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="${p.repo}" target="_blank">
                                        <i class="fa-brands fa-github"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `);
        });

        // 🔥 IMPORTANTE: reinitialize isotope depois de renderizar
        $('.grid').isotope({
            itemSelector: '.col-lg-4'
        });

        // 🔥 reinitialize magnific popup
        $('.image-popup').magnificPopup({
            type: 'image',
            gallery: { enabled: true }
        });
    }

    renderSalesforce();
    renderFrontend();

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