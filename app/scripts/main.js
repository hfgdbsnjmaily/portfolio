var ANIM_END = "animationend oAnimationEnd Animationend webkitAnimationEnd";

window.app = {
   foundation: function foundation() {
      $(document).foundation();
   },

   scrollTo: function() {
      $(document).on("click", "[data-scroll-to]", function(e) {
         var _this = $(this).is("a") ? $(this)[0].hash : $(this).data("scroll-to");
         if (_this) {
            app.scrolling = true;
            app.setActive(_this.substring(1));

            e.preventDefault();
            $("html, body").animate({
               scrollTop: $(_this).offset().top - $('header.main-header').height()
            }, 2000, function() {
               app.scrolling = false;
            });
         }
      });
   },

   fixedHeader: function() {
      if ($(window).scrollTop() > 20)
         $("header.main-header").addClass("sticky");
      else
         $("header.main-header").removeClass("sticky");
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

   menuSlide: function menuSlide() {
      var navOffset = $(".main-header nav").offset().left;

      if ($(".main-header nav > ul > li").hasClass("active")) {

         $(".hover-line").css("width", $(".main-header nav > ul > li.active > a").width())
            .addClass("visible")
            .css("left", $(".main-header nav > ul > li.active > a").position().left);
      } else
         $(".hover-line").removeClass("visible");

      $(".hover-line-element").hover(function() {
            if ($(this).find("a").length)
               $(".hover-line").css("width", $(this).find("a").width()).addClass("visible")
               .css("left", $(this).find("a").position().left);
         }, function() {
            $(".hover-line").removeClass("visible");

            if ($(".main-header nav > ul > li.active").length)
               $(".hover-line").css("width", $(".main-header nav > ul > li.active > a").width())
               .addClass("visible")
               .css("left", $(".main-header nav > ul > li.active > a").position().left);
         }

      );
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


   setActive: function(section, subsection) {
      subsection = subsection || false;

      if (subsection) {
         $('.step-navigation li').removeClass('active');

         $('.step-navigation li._' + section).addClass('active').prevAll().addClass('active');
         return;
      }

      if (section == "how-it-works")
         $('.step-navigation').addClass("active");
      else
         $('.step-navigation').removeClass("active");

      $('header.main-header nav li').removeClass('active');
      if (!section) return;
      $('header.main-header nav li._' + section).addClass('active');
   },



   onScroll: function onScroll() {
      app.fixedHeader();
      var headerOffset = $('header.main-header').height();

      if (app.inBounds($('#how-it-works'), 'center'))
         app.setActive('how-it-works');
      else if (app.inBounds($('#functions'), 'center'))
         app.setActive('functions');
      else if (app.inBounds($('#download'), 'center'))
         app.setActive('download');
      else
         app.setActive(null);

      if (app.inBounds($('#step-1'), -200))
         app.setActive('step-1', true);
      else if (app.inBounds($('#step-2'), -500))
         app.setActive('step-2', true);
      else if (app.inBounds($('#step-3'), 100))
         app.setActive('step-3', true);

      app.menuSlide();
   },


   init: function init() {
      app.foundation();
      app.scrollTo();
      app.animationOnScroll();
      app.menuSlide();
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
