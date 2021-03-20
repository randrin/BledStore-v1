// Go to Top Page & Scroll Navbar Effet
$(document).ready(function () {
  $("body").append(
    '<button id="bledstore-footer-scrollToTopBtn" class="btn btn-warning btn-round" title="Go to Top Page"><span><i class="fas fa-angle-up"></i></span></button>'
  );
  $(window).scroll(function () {
    if ($(this).scrollTop() > 260) {
      $("#bledstore-footer-scrollToTopBtn").fadeIn();
      $(".banner-wrapper").addClass("banner-scroll-wrapper");
      // $(".header-wrapper").addClass("header-scroll-wrapper");
    } else {
      $("#bledstore-footer-scrollToTopBtn").fadeOut();
      $(".banner-wrapper").removeClass("banner-scroll-wrapper");
      // $(".header-wrapper").removeClass("header-scroll-wrapper");
    }
  });
  $("#bledstore-footer-scrollToTopBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});

// Click anytime and first go to top screen
$(document).ready(function () {
  var element = document.querySelector(".loading");

  $("a, button, img").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // if (!!element) {
  //   console.log("element: ", element);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }
});
