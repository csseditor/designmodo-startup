function fadedEls(el, shift) {
    el.css('opacity', 0);

    switch (shift) {
        case undefined: shift = 0;
        break;
        case 'h': shift = el.eq(0).outerHeight();
        break;
        case 'h/2': shift = el.eq(0).outerHeight() / 2;
        break;
    }

    $(window).resize(function() {
        if (!el.hasClass('ani-processed')) {
            el.eq(0).data('scrollPos', el.eq(0).offset().top - $(window).height() + shift);
        }
    }).scroll(function() {
        if (!el.hasClass('ani-processed')) {
            if ($(window).scrollTop() >= el.eq(0).data('scrollPos')) {
                el.addClass('ani-processed');
                el.each(function(idx) {
                    $(this).delay(idx * 200).animate({
                        opacity : 1
                    }, 1000);
                });
            }
        }
    });
};

(function($) {
    $(function() {            
        
        $('.header-10-sub .scroll-btn a').on('click', function(e) {
        e.preventDefault();
        $.scrollTo($(this).closest('section').next(), {
            axis : 'y',
            duration : 500
        });
        return false;
    });    

        // Parallax
      
        $('.header-10-sub,.header-10-sub .background').each(function() {
                  $(this).parallax('50%', -0.3, false);
              });
      
       
        $('.content-23:not(.custom-bg)').each(function() {
                   $(this).parallax('50%', 0.3, false);
               });
       

        // Faded elements
        fadedEls($('.content-7'), 300);
        fadedEls($('.content-8'), 300);

        
       
        (function(el) {
            el.css('left', '-100%');

            $(window).resize(function() {
                if (!el.hasClass('ani-processed')) {
                    el.data('scrollPos', el.offset().top - $(window).height() + el.outerHeight());
                }
            }).scroll(function() {
                if (!el.hasClass('ani-processed')) {
                    if ($(window).scrollTop() >= el.data('scrollPos')) {
                        el.addClass('ani-processed');
                        el.animate({
                            left : 0
                        }, 500);
                    }
                }
            });
        })($('.content-13 > .container'));

        $(window).resize().scroll();
        
        //carousel
            (function(el){                               
                $(window).resize(function() {
                    shift = el.eq(0).outerHeight() /10;
                if (!el.hasClass('ani-processed')) {
                    el.eq(0).data('scrollPos', el.eq(0).offset().top - $(window).height() + shift);
                }
                }).scroll(function() {
                     if (!el.hasClass('ani-processed')) {
                        if ($(window).scrollTop() >= el.eq(0).data('scrollPos')) {
                            el.addClass('ani-processed');
                            function carouselAnimation(){
                                el.css('top', '0');
                                var imgHeight = el.height();
                                var lastPoint = imgHeight - 448*2;                            
                                var intervalID = setInterval(function(){                                
                                  el.animate(
                                      {
                                        top: (el.css('top').slice(0, -2)) - 388
                                      },
                                      {
                                        duration: 1000,
                                        easing: "easeInOutSine"
                                      });
                                  console.log((-(el.css('top').slice(0, -2))), lastPoint);
                                  if (-(el.css('top').slice(0, -2))>=lastPoint){                                       
                                      clearInterval(intervalID);
                                      el.click(function(){
                                         carouselAnimation();
                                      });    
                                  }                 
                                },2000);
                            }    
                            carouselAnimation();                       
                        }
                    }
                });                 
                
            })($('.screen-custom img'));    });

   
})(jQuery);

