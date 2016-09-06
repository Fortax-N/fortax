$(document).ready(function(){
    // One page navigation
    $('.nav').singlePageNav({
        offset: $('.navbar').outerHeight()
    });

    // Scroll to top
    $('.smooth-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                return false;
              }
            }
    });
    // Contact
    $('#submit').click(function(){
        $.post("contactus.php", $(".frm").serialize(),  function(response) {
            $('#success').html(response);
        });
        return false;
    });

    $(".animsition").animsition({
       inClass: 'fade-in',
       outClass: 'fade-out',
       inDuration: 1500,
       outDuration: 800,
       linkElement: '.animsition-link',
       // e.g. linkElement: 'a:not([target="_blank"]):not([href^=#])'
       loading: true,
       loadingParentElement: 'body', //animsition wrapper element
       loadingClass: 'animsition-loading',
       loadingInner: '', // e.g '<img src="loading.svg" />'
       timeout: false,
       timeoutCountdown: 5000,
       onLoadEvent: true,
       browser: [ 'animation-duration', '-webkit-animation-duration'],
       // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
       // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
       overlay : false,
       overlayClass : 'animsition-overlay-slide',
       overlayParentElement : 'body',
       transition: function(url){ window.location.href = url; }
    });


});
