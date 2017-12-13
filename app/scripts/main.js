var ANIM_END = "animationend oAnimationEnd Animationend webkitAnimationEnd";

window.app = {
   foundation: function foundation() {
      $(document).foundation();
   },

    toggleMenu: function() {

        $(".main-header nav > ul > li > a").click(function(){
            $("header.main-header").addClass("hidden");

        });

        $(".nav-link").click(function(){
            $(".splash").addClass("hidden");

        });



        $(".back > a").click(function(){
            $("header.main-header").removeClass("hidden");
            $(".splash").removeClass("hidden");

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
   }
};

$(function() {
   $(document).scrollTop(0);
   app.init();

   $(window).resize(app.onResize);
   $(document).on("scroll ontouchstart", app.onScroll);
   $(window).trigger("resize");
   $(window).trigger("scroll");
});
