let pageIndex = Math.round($(window).scrollTop() / $(window).height());
$(function () {
  let $tabButtons = $("#tabMember>li");
  let $tabContents = $(".memberContent");

  $tabButtons.on("click", function () {
    //$tabContents.removeClass("on");
    if ($(this).is(".on")) return;

    $(this).addClass("on").siblings().removeClass("on");

    $tabContents.removeClass("on");

    let index = $(this).attr("data-index");

    $tabContents.eq(index).addClass("on");
  });

  let $memberButtons = $("#memberBtns>ul>li");

  $memberButtons.on("click", function () {
    if ($(this).is(".memberOn")) return;

    $(this).addClass("memberOn").siblings().removeClass("memberOn");

    $tabContents.removeClass("memberOn");
  });
});

//--------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const imgElement = document.getElementById("blink");
  const imgElement2 = document.getElementById("blink2");
  let isBlinking = false;
  let blinkInterval;

  window.addEventListener("load", function () {
    if (isBlinking) {
      stopBlinking();
    } else {
      startBlinking();
    }
  });

  function startBlinking() {
    imgElement.style.visibility = "visible";
    blinkInterval = setInterval(function () {
      imgElement.style.visibility =
        imgElement.style.visibility === "hidden" ? "visible" : "hidden";
    }, 500);
    blink2Interval = setInterval(function () {
      imgElement2.style.visibility =
        imgElement2.style.visibility === "hidden" ? "visible" : "hidden";
    }, 500);
    isBlinking = true;
  }

  function stopBlinking() {
    clearInterval(blinkInterval);
    imgElement.style.visibility = "visible";
    imgElement2.style.visibility = "visible";
    isBlinking = false;
  }

  $(function () {
    $("#member1-img").click(() => {
      let m1 = document.querySelector("#team1");
      toView();
      m1.click();
    });
    $("#member2-img").click(() => {
      let m2 = document.querySelector("#team2");
      toView();
      m2.click();
    });
    $("#member3-img").click(() => {
      let m3 = document.querySelector("#team3");
      toView();
      m3.click();
    });
  });
  function toView() {
    $("html").animate({ scrollTop: $(window).height() });
    pageIndex = 1;
    if (pageIndex == 0) {
      $(".page-1").css("width", "50px");
      $(".page-2").css("width", "20px");
      $(".page-3").css("width", "20px");
    } else if (pageIndex == 1) {
      $(".page-2").css("width", "50px");
      $(".page-1").css("width", "20px");
      $(".page-3").css("width", "20px");
    } else {
      $(".page-3").css("width", "50px");
      $(".page-1").css("width", "20px");
      $(".page-2").css("width", "20px");
    }
  }
  $("#tVC").click(() => {
    toViewComment();
  });
  function toViewComment() {
    $("html").animate({ scrollTop: $(window).height() * 2 });
    pageIndex = 2;
    if (pageIndex == 0) {
      $(".page-1").css("width", "50px");
      $(".page-2").css("width", "20px");
      $(".page-3").css("width", "20px");
    } else if (pageIndex == 1) {
      $(".page-2").css("width", "50px");
      $(".page-1").css("width", "20px");
      $(".page-3").css("width", "20px");
    } else {
      $(".page-3").css("width", "50px");
      $(".page-1").css("width", "20px");
      $(".page-2").css("width", "20px");
    }
  }
  if (pageIndex == 0) {
    $(".page-1").css("width", "50px");
    $(".page-2").css("width", "20px");
    $(".page-3").css("width", "20px");
  } else if (pageIndex == 1) {
    $(".page-2").css("width", "50px");
    $(".page-1").css("width", "20px");
    $(".page-3").css("width", "20px");
  } else {
    $(".page-3").css("width", "50px");
    $(".page-1").css("width", "20px");
    $(".page-2").css("width", "20px");
  }
});

//-------------------------휠스크롤기능------------------------------------------------

$(function () {
  window.onload = function () {
    setTimeout(function () {
      scrollTo(0, 0);
      pageIndex = 0;
    }, 100);
  };

  $("html").animate({ scrollTop: pageIndex * $(window).height() }, 10);

  let $window = $(window);
  let $html = $("html");

  let windowHeight = $window.height();

  let lastPageIndex = $(".page").length - 1;

  window.addEventListener(
    "wheel",
    function (event) {
      event.preventDefault();
      if ($html.is(":animated")) return;

      if (event.deltaY > 0) {
        if (pageIndex >= lastPageIndex) return;

        pageIndex++;
        if (pageIndex == 0) {
          $(".page-1").css("width", "50px");
          $(".page-2").css("width", "20px");
          $(".page-3").css("width", "20px");
        } else if (pageIndex == 1) {
          $(".page-2").css("width", "50px");
          $(".page-1").css("width", "20px");
          $(".page-3").css("width", "20px");
        } else {
          $(".page-3").css("width", "50px");
          $(".page-1").css("width", "20px");
          $(".page-2").css("width", "20px");
        }
      } else if (event.deltaY < 0) {
        if (pageIndex <= 0) return;

        // 1.4. 이전 페이지로 스크롤 한다.
        pageIndex--;
        if (pageIndex == 0) {
          $(".page-1").css("width", "50px");
          $(".page-2").css("width", "20px");
          $(".page-3").css("width", "20px");
        } else if (pageIndex == 1) {
          $(".page-2").css("width", "50px");
          $(".page-1").css("width", "20px");
          $(".page-3").css("width", "20px");
        } else {
          $(".page-3").css("width", "50px");
          $(".page-1").css("width", "20px");
          $(".page-2").css("width", "20px");
        }
      }
      let posTop = windowHeight * pageIndex;

      $html.animate({ scrollTop: posTop });
    },
    { passive: false }
  );

  $window.on("resize", function () {
    windowHeight = $window.height();
  });
});

//-------------------------------페이지 확인-------//
