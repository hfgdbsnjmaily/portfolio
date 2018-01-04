let ANIM_END = 'animationend oAnimationEnd Animationend webkitAnimationEnd';
let slideIndex = 1;
let about = 0, portfolio = 0, skills = 0, contact = 0;

window.app = {
    foundation: function foundation() {
        $(document).foundation();
    },

    moveUp: function moveUp() {
        if (about === 0 && portfolio === 0 && skills === 0 && contact === 0) {

            app.move('#about-me', 'bottom', '0');
            $('header.main-header').addClass('hidden');
            about = 1;

        } else if (contact === 1) {
            app.move('#contact', 'top', '200vh');
            contact = 0;

        } else if (skills === 1 || portfolio === 1) {}
        console.log(about, portfolio, skills, contact);
    },

    moveDown: function moveDown() {
        if (about === 0 && portfolio === 0 && skills === 0 && contact === 0) {

            app.move('#contact', 'top', '0');
            $('header.main-header').addClass('hidden');
            contact = 1;

        } else if (about === 1) {
            app.move('#about-me', 'bottom', '200vh');
            about = 0;

        } else if (skills === 1 || portfolio === 1) {}
        console.log(about, portfolio, skills, contact);

    },

    moveLeft: function moveLeft() {
        if (about === 0 && portfolio === 0 && skills === 0 && contact === 0) {

            app.move('#portfolio', 'right', '0');
            $('header.main-header').addClass('hidden');
            portfolio = 1;

        } else if (skills === 1) {
            app.move('#skills', 'left', '100vw');
            skills = 0;

        } else if (skills === 2) {
            app.currentDiv(1);
            skills = 1;

        } else if (about === 1 || contact === 1) {}
        console.log(about, portfolio, skills, contact);
    },

    moveRight: function moveRight() {
        if (about === 0 && portfolio === 0 && skills === 0 && contact === 0) {

            app.move('#skills', 'left', '0');
            $('header.main-header').addClass('hidden');
            skills = 1;

        } else if (portfolio === 1) {
            app.move('#portfolio', 'right', '100vw');
            portfolio = 0;

        } else if (skills === 1) {
            app.currentDiv(2);
            skills = 2;

        } else if (about === 1 || contact === 1) {}
        console.log(about, portfolio, skills, contact);
    },

    keyboardMenu: function() {
        document.onkeydown = function(e) {
            console.log(e.keyCode);

            document.getElementById('keyboard').style.display = 'none';
            document.getElementById('swipe').style.display = 'block';

            switch (e.keyCode) {
                case 37:
                    app.moveLeft();
                    break;
                case 38:
                    app.moveUp();
                    break;
                case 39:
                    app.moveRight();
                    break;
                case 40:
                    app.moveDown();
                    break;
            }
        }
    },

    mobileSwipeMenu: function() {
        let myElement = document.getElementById('body');

        let mc = new Hammer(myElement);

        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

        mc.on('swipeleft swiperight swipeup swipedown', function(ev) {

            document.getElementById('swipe').style.display = 'none';

            switch (ev.type) {
                case 'swiperight':
                    app.moveLeft();
                    break;
                case 'swipeleft':
                    app.moveRight();
                    break;
                case 'swipedown':
                    app.moveUp();
                    break;
                case 'swipeup':
                    app.moveDown();
                    break;
            }
        })
    },

    currentDiv: function currentDiv(n) {
        app.carousel(slideIndex = n);
        document.getElementById('slide1').className += ' animated slideInLeft';
        document.getElementById('slide2').className += ' animated slideInRight';

        if (n === 2) {
            skills = 2;
        } else if (n === 1) {
            skills = 1;
        }
    },

    carousel: function(n) {

        let i;
        let slides = document.getElementsByClassName('slide');
        let dots = document.getElementsByClassName('dot');

        if (n > slides.length) {
            slideIndex = 1
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {

            slides[i].style.visibility = 'hidden';

            slides[i].style.display = 'none';
        }

        for (i = 0; i < dots.length; i++) {

            dots[i].className = dots[i].className.replace(' active', '');
        }

        slides[slideIndex-1].style.visibility = 'visible';
        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].className += ' active';
    },


    toggleMenu: function() {

        $('.main-header nav > ul > li > a').click(function(){
            $('header.main-header').addClass('hidden');

        });

        $('.back > a').click(function(){
            $('header.main-header').removeClass('hidden');
        });
    },

    move: function move(section, direction, value) {
        $(section).css(direction, value);
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

    init: function init() {
        app.foundation();
        app.carousel(1);
        app.mobileSwipeMenu();
        app.animationOnScroll();
        app.toggleMenu();
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
