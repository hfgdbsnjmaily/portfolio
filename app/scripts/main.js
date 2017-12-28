var ANIM_END = 'animationend oAnimationEnd Animationend webkitAnimationEnd';
var slideIndex = 1;

window.app = {
   foundation: function foundation() {
      $(document).foundation();
   },

    keyboardMenu: function() {
        let left, top, right, bottom;

        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:

                    if (left === 0) {

                        app.move('#skills', 'left', '100vw');
                        left = 1;

                    } else if (bottom === 0 || top === 0) {

                    } else {

                        app.move('#portfolio', 'right', '0');
                        $('header.main-header').addClass('hidden');
                        right = 0;
                    }

                    break;

                case 38:

                    if (top === 0) {
                        app.move('#contact', 'top', '200vh');
                        top = 1;

                    } else if (right === 0 || left === 0) {

                    } else {
                        app.move('#about-me', 'bottom', '0');
                        $('header.main-header').addClass('hidden');
                        bottom = 0;
                    }

                    break;

                case 39:

                    if (right === 0) {
                        app.move('#portfolio', 'right', '100vw');
                        right = 1;

                    } else if (bottom === 0 || top === 0) {

                    } else {
                        app.move('#skills', 'left', '0');
                        $('header.main-header').addClass('hidden');
                        left = 0;
                    }

                    break;

                case 40:

                    if (bottom === 0) {
                        app.move('#about-me', 'bottom', '200vh');
                        bottom = 1;
                    } else if (right === 0 || left === 0) {

                    } else {
                        app.move('#contact', 'top', '0');
                        $('header.main-header').addClass('hidden');
                        top = 0;
                    }

                    break;
            }
        }
    },

    currentDiv: function currentDiv(n) {
        app.carousel(slideIndex = n);
        document.getElementById('slide1').className += ' animated bounceInLeft';
        document.getElementById('slide2').className += ' animated bounceInRight';
    },

    carousel: function(n) {

        var i;
        var x = document.getElementsByClassName('slide');
        var dots = document.getElementsByClassName('dot');
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
         x[i].style.visibility = 'hidden';

         x[i].style.display = 'none';
        }
        for (i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(' active', '');
        }
        x[slideIndex-1].style.visibility = 'visible';
        x[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].className += ' active';

    },

    toggleMenu: function() {

        $('.main-header nav > ul > li > a').click(function(){
            $('header.main-header').addClass('hidden');

        });

        $('.nav-link').click(function(){
            $('.splash').addClass('hidden');

        });



        $('.back > a').click(function(){
            $('header.main-header').removeClass('hidden');
            $('.splash').removeClass('hidden');

        });
    },

    move: function move(section, direction, value) {
        console.log(section, direction, value);
        $(section).css(direction, value);
    },

   scrollTo: function() {
      $('a[href*="#"]:not([href="#"])').click(function() {

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

          if (target.length) {

            $('html, body').animate({

              scrollTop: target.offset().top
            }, 1000);

            return false;
          }
        }
      });
   },

   animationOnScroll: function() {
      $('[data-anim]').each(function(i, element) {
         var animation = $(element).attr('data-anim');
         var offset = $(element).attr('data-offset');
         var delay = $(element).attr('data-delay');
         var duration = $(element).attr('data-dur');
         var res = $(element).attr('data-res');

         $(element).unbind().removeData().waypoint(function() {
            if (duration)
               $(element).css('animation-duration', duration);


            setTimeout(function() {
               $(element).addClass(animation);
               $(element).addClass('animated');
            }, delay != undefined ? parseFloat(delay) * 1000 : 0);

         }, {
            offset: offset ? offset : '80%'
         });
      });
   },

   scrolling: false,
    
   inBounds: function(element, offsetTop) {
      if (!element.length || app.scrolling)
         return false;

      var topOfObject = element.position().top;
      var bottomOfObject = element.position().top + element.outerHeight();
      var topOfWindow = $(window).scrollTop();
      var bottomOfWindow = $(window).scrollTop() + $(window).height();
      var viewportHeight = $(window).height();

      if (offsetTop == 'center') {
         if ((topOfObject < (bottomOfWindow - viewportHeight / 2) && bottomOfObject > (bottomOfWindow - viewportHeight / 2)))
            return true;
      } else {
         if ((topOfObject < topOfWindow + offsetTop && bottomOfObject > topOfWindow + offsetTop))
            return true;
      }
      return false;
   },



   init: function init() {
      app.foundation();
      app.scrollTo();
      app.animationOnScroll();
       app.toggleMenu();
       app.carousel(1);
       app.keyboardMenu();
   }
};

$(function() {
   $(document).scrollTop(0);
   app.init();

   $(window).resize(app.onResize);
   $(document).on('scroll ontouchstart', app.onScroll);
   $(window).trigger('resize');
   $(window).trigger('scroll');
});
