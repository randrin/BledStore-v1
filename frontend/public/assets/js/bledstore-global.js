// Go to Top Page & Scroll Navbar Effet
$(document).ready(function () {
    $('body').append('<button id="bledstore-footer-scrollToTopBtn" class="btn btn-warning btn-round" title="Go to Top Page"><span><i class="fa fa-angle-up"></i></span></button>');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 260) {
            $('#bledstore-footer-scrollToTopBtn').fadeIn();
            $('#navbar-main').addClass('scroll-navbar');
            $('ul.navbar-nav li.nav-item a.btn-outline-primary').removeClass('btn-outline-primary').addClass('btn-success')
        } else {
            $('#bledstore-footer-scrollToTopBtn').fadeOut();
            $('#navbar-main').removeClass('scroll-navbar');
            $('ul.navbar-nav li.nav-item a.btn-success').removeClass('btn-success').addClass('btn-outline-primary')
        }
    });
    $('#bledstore-footer-scrollToTopBtn').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
});