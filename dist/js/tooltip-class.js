$(function () {

  function Tooltip($elem, layout) {

    this.arrowMargin = 28;
    var _self = this;

    this.layoutTooltip = function (layout) {
      if (!layout) {
        layout = '<div>This is Tooltip</div>';
      }
      return layout;
    };

    this.hoverTooltip = function () {
      var $tooltip = $(this.layoutTooltip(layout));
      $elem
        .on('mouseenter touchstart', function () {
          $('body').append($tooltip);
          _self.setTooltipPosition($tooltip);
        })
        .on('mouseleave touchend', function () {
          $tooltip.remove();
        });


      $(window).on('click touchend', function(){
        $tooltip.remove();
      });
    };

    this.clickTooltip = function () {
      var $tooltip = $(this.layoutTooltip(layout));

      $elem.on('click', function (e) {
        e.preventDefault();
        $('body').append($tooltip);
        _self.setTooltipPosition($tooltip);
      });

      $tooltip.on('click', '.js-close', function (e) {
        e.preventDefault();
        $tooltip.remove();
        return false;
      });

      $(document).click(function (e) {
        if ($(e.target).closest($elem).length || $(e.target).closest($tooltip).length)
          return;

        e.preventDefault();
        $tooltip.remove();

      });

    };

    this.setTooltipPosition = function (tooltip) {

      var
          top,
          left,
          tooltipHalf = (tooltip.innerWidth() / 2),
          elemHalf = ($elem.innerWidth() / 2),
          elemHeight = $elem.innerHeight(),
          elemOffset = $elem.offset(),
          $arrow = $('.arrow', tooltip);

      left = elemOffset.left + elemHalf - tooltipHalf;
      top = elemOffset.top + elemHeight + 10;

      tooltip.css({
        top: top,
        left: left
      });

    };

    $(window).on('resize orientationchange', function() {
      _self.setTooltipPosition();
    });

  }

  //=========================================================//
  //=========================================================//

  var HoverTooltip = new Tooltip($('.js-tooltip-hover'), '<div class="tooltip-box"><div class="arrow top"></div>Tooltip 1</div>');
  HoverTooltip.hoverTooltip();

  var ClickTooltip = new Tooltip($('.js-tooltip-click'), '<div class="tooltip-box"><div class="arrow top"></div>Tooltip 2 <a href="https://www.google.ru" class="js-close">x</a></div>');
  ClickTooltip.clickTooltip();

});