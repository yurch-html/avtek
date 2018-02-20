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

// svg
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
svg4everybody();