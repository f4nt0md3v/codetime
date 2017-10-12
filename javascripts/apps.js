viewportHeight = function(){
  var windowHeight = $(window).height();
  $('#hero').height(windowHeight);
};

navExpands = function () {
  $('nav').removeClass('closed');
  $('body').addClass('nav-is-open');
  $('button.lines-button.x').addClass('close');
}
navCollapses = function () {
  $('nav').addClass('closed');
  $('body').removeClass('nav-is-open');
  $('button.lines-button.x').removeClass('close');  
}
mobileClass = function () {
  var windowWidth = $(window).width();
  if ( windowWidth < 601 ) {
    $('body').addClass('mobile');
    if (!$('nav').hasClass('closed')) {
      $('button.lines-button').removeClass('close');
    }
    
  } else {
    $('body').removeClass('mobile');
    $('nav').show();
    if (!$('nav').hasClass('closed')) {
      $('button.lines-button').addClass('close');    }

  }
}

servicesResponsiveMagic = function () {
  var windowWidth = $(window).width();
  var navWidth = $('nav').width();
  if ( (windowWidth - navWidth) < 900 ) {
    $('#services ul').addClass('two-per-row');
  } else {
    $('#services ul').removeClass('two-per-row');
  }
  // console.log(windowWidth, navWidth);
}

mobileCheck = function() {
  var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPod|iPad/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } 
  };

  if(isMobile.any()) {
    // $('body').addClass('mobile');
    FastClick.attach(document.body);
  }
}

function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');

    osElement.css({
        '-webkit-animation-delay':  osAnimationDelay,
        '-moz-animation-delay':     osAnimationDelay,
        'animation-delay':          osAnimationDelay
    });

    var osTrigger = ( trigger ) ? trigger : osElement;

    osTrigger.waypoint(function() {
        osElement.addClass('animated').addClass(osAnimationClass);
    },{
        // triggerOnce: true,
        offset: '75%'
    });
  });
};

// Talks & Events (Home) equal height
talksAndEventsEqualHeight = function() {
  var eventsPaddingBottom = parseInt($('#home #events').css("padding-bottom"), 10);
  var eventsHeight = $('body#home:not(.mobile) #events').outerHeight();
  var talksHeight = $('body#home:not(.mobile) #talks').outerHeight();  
  // console.log(eventsHeight, talksHeight, eventsPaddingBottom);
  if (eventsHeight > talksHeight) {
    $('#home #talks').css({'paddingBottom' : eventsHeight - talksHeight});
  } else {
    $('#home #events').css({'paddingBottom' :  talksHeight - eventsHeight + eventsPaddingBottom});
  }

  
};

  

$(document).ready(function() {
  viewportHeight();
  mobileCheck();
  onScrollInit( $('.os-animation') );
  onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );
  new WOW().init();
  servicesResponsiveMagic();
  talksAndEventsEqualHeight();

  $(function(){
      if($('#hero').size()>0)
        $("#hero h1 strong").typed({
          strings: $("#hero h1 strong").data('words').split(' '),
          startDelay: 1500, 
          typeSpeed: 150,
          loop: true,
          backSpeed: 80,
          backDelay: 1500,
        });
  });

  $('#home nav').onePageNav({
    currentClass: 'active',
    scrollSpeed: 750,
    scrollThreshold: 0.2,
    easing: 'swing'
  });

  var windowWidth = $(window).width();
  if ( windowWidth < 880 ) {
    navCollapses();
  }
  mobileClass();


  // Animated Hamburger Icon  
  $('button.lines-button.x').click(function() {
    if ( !$(this).hasClass('close') ) {
      navExpands();
      if ($('body').hasClass('mobile')) {
        $('nav').addClass('open').show();
        $('.social').addClass('inside-the-nav');
      }    
    } else {
      navCollapses();
      if ($('body').hasClass('mobile')) {
        $('nav').removeClass('open').hide();
        $('.social').removeClass('inside-the-nav');
      } 
    }      
    return false;
  });

  // Mobile Nav, close it when clicking on a nav item
  $('nav ul li a').click(function() {    
    if ($('nav').hasClass('open')) {
      $('button.lines-button.x').click();
    }
    if ($('body#homepage').length) {
      return false; // this is only required on the homepage.
    }
  });

  // Inner Page nav items fix path
  $('body.inner-page nav ul li a[href^="#"]').each(function() {    
    var _href = $(this).attr("href"); 
    $(this).attr("href", 'index.html' + _href);
  });


    
  // Team
  $('#team li:not(:last-child)').hover(function() {
    if (!$('body').hasClass('mobile')) {
      $(this).siblings().toggleClass('fade');
    }
  });
  $('body.mobile #team li').click(function() {
    $(this).toggleClass('hide-computer');    
  });


  // Testimonials
  $('#testimonials ul').slick({
    dots: true,
    appendArrows: $('#testimonials'),
  });


  // Contact
  // Placeholder magic
  $('input,textarea').focus(function(){
    $(this).data('placeholder',$(this).attr('placeholder'))
    $(this).attr('placeholder','');
  }).blur(function(){
    $(this).attr('placeholder',$(this).data('placeholder'));
  });

  // Portfolio
  $('#scene').parallax({
    calibrateX: false,
    calibrateY: true,
    invertX: false,
    invertY: true,
    limitX: false,
    limitY: 100,
    scalarX: 2,
    scalarY: 8,
    frictionX: 0.2,
    frictionY: 0.8,
    originX: 0.5,
    originY: 0.5
  });

  if ($('#project-count').length) {

    $('#project-count').addClass("animated").trigger('classChange');
      $('#project-count').on('classChange', function() {
           // alert('hello');
      });

    // Counter
    var options = {
      useEasing : true, 
      useGrouping : false, 
      separator : ',', 
      decimal : '.', 
      prefix : '', 
      suffix : '' 
    };
    var counter = new CountUp("number", 0000, 3761, 0, 4, options);
    // counter.start();

    overload = function() {
      $('#project-count').addClass('overflow');
      $('#number').html('OVERFLOW');
    }

    var waypoint = new Waypoint({
      element: document.getElementById('project-count'),
      handler: function(direction) {    
        if (direction === 'down') {
          counter.start(overload);
        }
      },
      offset: '70%'
    })
  }


  // Talks & Events --> TABS
  $('#talks_and_events h4 a').click(function() {
    $('#talks_and_events h4 a').removeClass('active');
    $(this).addClass('active');
    $('#upcoming, #past').hide();
    var id = $(this).attr("href");
    $(id).show();
    event.preventDefault();
  });
  



});



$(window).load(function() {

});



$(window).resize(function() {
	viewportHeight();
  mobileClass();
  servicesResponsiveMagic();
  $('#services ul li .circle').addClass('webkit-circle-fix');  

  if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
      $(this).trigger('resizeEnd');
    }, 2000);

});

$(window).bind('resizeEnd', function() {

});




$(window).scroll(function(){

});

