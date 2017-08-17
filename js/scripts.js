(function($){
  $("img.scale").imageScale({
    rescaleOnResize: true,
    align: 'center'
  });
})(jQuery);

(function($){
  var cursorX;
  var cursorY;
  var maxHeight;
  var maxWidth;
  var min = 0;
  var normalizedHeight;
  var normalizedWidth;
  var bgimage = jQuery(".homepage-bg-images .bg-image");
  var fgimage = jQuery(".homepage-bg-images .fg-image");

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  function getMaxValues(){
    maxHeight = window.innerHeight;
    maxWidth = window.innerWidth;
  }

  function normalizeValues(cursorX, cursorY){
    normalizedHeight = Math.round((cursorY - min) / (maxHeight - min) * 100)/100;
    normalizedWidth = Math.round((cursorX - min) / (maxWidth - min)*100)/100;
    // console.log("Height: " + normalizedHeight + " | Width: " + normalizedWidth);
    bgimage.css({"transform":"translate(" + (normalizedWidth * 3) + "%, " + (normalizedHeight * 3) + "%) scale(1.1)"});
    fgimage.css({"transform":"translate(" + (-normalizedWidth * 1) + "%, " + (-normalizedHeight * 1) + "%) scale(1.1)"});
    return cursorX, cursorY;
  }

  getMaxValues();

  document.onmousemove = debounce(function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
    normalizeValues(cursorX, cursorY);
  }, 50);

  window.onresize = function(){
    var resizeInterval = setInterval(function(){
      clearInterval(resizeInterval);
      getMaxValues();
    }, 500);
  }

  $('.iterate-up').each(function() {
    var $this = $(this);
    var countTo = $this.attr('data-count');
    $this.html("0");

    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },{
      duration: 800,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
      }

    });
  });

  var wWidth = jQuery(window).width();
  if(wWidth >= 768){
    jQuery(".grid").masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      horizontalOrder: true
    });

    var mItems = jQuery('.work-mansonry').children(".grid-item:odd");
    var stStart = jQuery(document).scrollTop();
    jQuery(document).on("scroll", function(event){
      var nextSt = jQuery(document).scrollTop();
      var moveInterval = nextSt / 5;
      mItems.css('-webkit-transform','translate(0px,-' + moveInterval + 'px)');
      stStart = jQuery(document).scrollTop();
    });
  }

  setTimeout(function () {
    jQuery(".away").removeClass("away");
  }, 1000);

  jQuery(".close").on('click', function(){
    jQuery("#bmenub").click();
  });

})(jQuery);
