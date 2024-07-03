(function ($) {
"use strict";

// perloader
function preloader() {
  $('#preloader').delay(0).fadeOut();
};

$(window).on('load', function () {
    preloader(),
    wowanimation();
});


// meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "992"
});


// sticky-menu
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 350) {
		$("#header-sticky").removeClass("sticky-menu");
	} else {
		$("#header-sticky").addClass("sticky-menu");
	}
});



// data - background
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})


  // offcanvas menu
$(".menu-tigger").on("click", function () {
	$(".extra-info,.offcanvas-overly").addClass("active");
	return false;
});
$(".menu-close,.offcanvas-overly").on("click", function () {
	$(".extra-info,.offcanvas-overly").removeClass("active");
});



// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: true,
		fade: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="lb lb-left_arrow-icon"></i> Prev</button>',
    nextArrow: '<button type="button" class="slick-next"><i class="lb lb-rigth_arrow-icon"></i></button>',
		responsive: [
			{ breakpoint: 1400, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();

// odometer-active
$('.odometer').appear(function (e) {
	var odo = $(".odometer");
	odo.each(function () {
		var countNumber = $(this).attr("data-count");
		$(this).html(countNumber);
	});
});

// testimonial-active
$('.testimonial-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
  slidesToShow: 1,
  fade: false,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    }
  ]
});

// project-active
$('.project-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 992,
      settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      }
    },
    {
      breakpoint: 767,
      settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      }
    },
	  {
      breakpoint: 479,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      }
    },
  ]
});

// project-active
$('.project-carousel').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-double-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-double-right"></i></button>',
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 992,
      settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      }
    },
    {
      breakpoint: 767,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      }
    },
  ]
});

// brand-active
$('.brand-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: false,
  slidesToShow: 5,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
      }
    },
  ]
});

// testimonial-active
$('.app-testi-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: true,
  prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
	  {
      breakpoint: 1400,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
      }
    },
    {
      breakpoint: 767,
      settings: {
      slidesToShow: 5,
	  	slidesToScroll: 1,
		  arrows: true,
      }
    },
    {
      breakpoint: 639,
      settings: {
      slidesToShow: 4,
		  slidesToScroll: 1,
		  arrows: true,
      }
    },
	  {
      breakpoint: 479,
      settings: {
      slidesToShow: 3,
		  slidesToScroll: 1,
		  arrows: true,
      }
    },
  ]
});

// testimonial-active
$('.portfolio-testi-active').slick({
  dots: true,
  infinite: true,
  speed: 1000,
  arrows: true,
  prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
  slidesToShow: 3,
  centerMode: true,
  centerPadding: '0px',
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '250px',
        infinite: true,
        arrows: false,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
      }
    },
    {
      breakpoint: 767,
      settings: {
      slidesToShow: 1,
	  	slidesToScroll: 1,
		  arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
      slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
      }
    },
  ]
});

// pd-carousel-active
$('.pd-carousel-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: true,
  slidesToShow: 1,
  prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-double-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-double-right"></i></button>',
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
      slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
      }
    },
  ]
});

// sass-testi-active
$('.sass-testi-active').slick({
  dots: true,
  infinite: true,
  speed: 1000,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
      slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
      }
    },
  ]
});

// screenshot-active
$('.screenshot-active').slick({
  dots: true,
  infinite: true,
  speed: 1500,
  arrows: false,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
		    slidesToScroll: 1,
		    arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
		    slidesToScroll: 1,
		    arrows: false,
      }
    },
  ]
});

// Testimonails-active
$('.testimonails-active').slick({
  dots: false,
  infinite: true,
  speed: 1000,
  prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 992,
      settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      }
    },
    {
      breakpoint: 767,
      settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      }
    },
	  {
      breakpoint: 479,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      }
    },
  ]
});

// niceSelect;
 $(".selected,.faq-selected").niceSelect();

// scrollToTop
$("#scrollToTop").on('click', function () {
	$("body, html").animate({ scrollTop: 0 }, 1000);
	return false;
});


/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});

// aos-active
AOS.init({
	duration: 1000,
	mirror: true
});

// isotop
$('.project-masonry,.product-active').imagesLoaded( function() {
	// init Isotope
  var $grid = $('.project-masonry,.product-active').isotope({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  masonry: {
      columnWidth: '.grid-sizer'
	  }
	});
  // filter items on button click
  $('.project-m-menu,.shop-items-menu').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
});

//for menu active class
$('.project-m-menu button,.shop-items-menu button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});

// paroller
if ($('.paroller').length) {
	$('.paroller').paroller();
}

//* Parallaxmouse js
function parallaxMouse() {
	if ($('#parallax').length) {
		var scene = document.getElementById('parallax');
		var parallax = new Parallax(scene);
	};
};
parallaxMouse();


// active
$('.app-pricing-box,.agn-single-about,.single-sass-features').on('mouseenter', function () {
    $(this).addClass('active').parent().siblings().find('.app-pricing-box,.agn-single-about,.single-sass-features').removeClass('active');
})


// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp',
	topDistance: '300',
	topSpeed: 300,
	animation: 'fade',
	animationInSpeed: 200,
	animationOutSpeed: 200,
	scrollText: '<i class="far fa-level-up-alt"></i>',
	activeOverlay: false,
});

  // WOW active
function wowanimation() {
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: false,
    live: true
  });
  wow.init();
}
})(jQuery);