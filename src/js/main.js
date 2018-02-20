console.log('Hello world!');
$(document).ready(function () {
  // lang-list
  $('.js-lang-list .lang-list__btn').click(function() {
    $(this).closest('.js-lang-list').toggleClass('active');
    $(this).closest('.lang-list__item').addClass('active').siblings().removeClass('active');
  });

  // .main-slider
  $(".js-slider-ban").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.js-prev-slider',
    dots: false,
    focusOnSelect: true,
    draggable: false,
    infinite: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
  });

  $(".js-prev-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.js-slider-ban',
    dots: true,
    arrows: false,
    focusOnSelect: true,
    draggable:false,
    infinite: true,
    variableWidth: true,
    responsive: [
      {
      breakpoint: 768,
      settings: {
        vertical: true,
        variableWidth: false,
        }
      }
    ],
  });

  // modal
  $('[data-modal]').click(function () {
    var thisId = $(this).attr('data-modal');
    $('body').toggleClass('fixed');
    $('[data-id=' + thisId +']').toggleClass('active');

    setTimeout(function() {
      $('[data-id=' + thisId +']').toggleClass('open');
    }, 50);
  });

  $('[data-close]').click(function () {
    setTimeout(function() {
      $('body').removeClass('fixed');
      $('[data-id]').removeClass('active');
    }, 500);

    $('[data-id]').removeClass('open');
  });

  // mob-menu
  if ($(window).width() < 1024) {
    $('.js-parent .main-menu__link').removeAttr('href');

    $('.js-parent .main-menu__link').click(function () {
      $(this).closest('.js-parent').find('.main-menu__submenu').slideToggle(300);
    });
  }
});

(function (document, navigator, CACHE, IE9TO11) {
  if (IE9TO11) document.addEventListener('DOMContentLoaded', function () {
    [].forEach.call(document.querySelectorAll('use'), function (use) {
      var
        svg = use.parentNode,
        url = use.getAttribute('xlink:href').split('#'),
        url_root = url[0],
        url_hash = url[1],
        xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

      if (!xhr.s) {
        xhr.s = [];

        xhr.open('GET', url_root);

        xhr.onload = function () {
          var x = document.createElement('x'), s = xhr.s;

          x.innerHTML = xhr.responseText;

          xhr.onload = function () {
            s.splice(0).map(function (array) {
              var g = x.querySelector('#' + array[2]);

              if (g) array[0].replaceChild(g.cloneNode(true), array[1]);
            });
          };

          xhr.onload();
        };

        xhr.send();
      }

      xhr.s.push([svg, use, url_hash]);

      if (xhr.responseText) xhr.onload();
    });
  });
})(
  document,
  navigator,
  {},
  /Trident\/[567]\b/.test(navigator.userAgent)
);

svg4everybody();