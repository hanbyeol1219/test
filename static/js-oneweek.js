$(function () {
  let $tabButtons = $("#tabMember>li");
  let $tabContents = $(".memberContent");

  $tabButtons.on("click", function () {
    $tabContents.removeClass("on");
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
    let member_img = $(".members>img");
  });
  function toView() {
    window.scrollTo(0, window.innerHeight * 1);
  }
});

//-------------------------------------------------------------------------

$(function () {
  window.onload = function () {
    setTimeout(function () {
      scrollTo(0, 0);
      pageIndex = 0;
    }, 100);
  };

  let pageIndex = Math.round($(window).scrollTop() / $(window).height());

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
      } else if (event.deltaY < 0) {
        if (pageIndex <= 0) return;

        // 1.4. 이전 페이지로 스크롤 한다.
        pageIndex--;
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
