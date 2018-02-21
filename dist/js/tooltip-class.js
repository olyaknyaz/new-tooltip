$(function () {

  function Tooltip(options) {

    // Define options default
    var settings = {
      elem: null,
      layout: '<div>This is Tooltip</div>',
      position: 'bottom',
      margin: 10,
      animation: 'fade',
      animationDuration: 350,
      autoOpen: false
    };

    settings = $.extend(settings, options);

    // Create global element references
    this.$activeElem = null;
    this.$activeTooltip = null;
    this.$document = $(document);
    this.$window = $(window);
    this.$body = $('body');

    var _self = this;

    // Public methods
    this.create = function (elem) {

      this.$activeElem = elem;
      this.$activeTooltip = $(settings.layout);

      this.$body.append(this.$activeTooltip);

      if (settings.animation) {
        this.animate(this.$activeTooltip);
      }
      this.setTooltipPosition(this.$activeElem, this.$activeTooltip);
    };

    this.destroy = function () {
      if (settings.animation) {
        this.removeAnimation(this.$activeTooltip);
      } else {
        this.$activeTooltip.remove();
      }
      this.$activeElem = null;
      this.$activeTooltip = null;
    };

    this.animate = function (tooltip) {

      tooltip
        .addClass('tooltip-' + settings.animation)
        .addClass('tooltip-initial')
        .css({
          '-moz-animation-duration': settings.animationDuration + 'ms',
          '-ms-animation-duration': settings.animationDuration + 'ms',
          '-o-animation-duration': settings.animationDuration + 'ms',
          '-webkit-animation-duration': settings.animationDuration + 'ms',
          'animation-duration': settings.animationDuration + 'ms',
          'transition-duration': settings.animationDuration + 'ms'
        });

      setTimeout(function() {

        _self.$activeTooltip
          .addClass('tooltip-show')
          .removeClass('tooltip-initial');

        if (settings.animationDuration > 0) {
          _self.$activeTooltip.delay(settings.animationDuration);
        }

      }, 0);
    };

    this.removeAnimation = function (tooltip) {
      tooltip
        .clearQueue()
        .removeClass('tooltip-show')
        .addClass('tooltip-dying');

      setTimeout(function() {
        tooltip.remove();
      }, settings.animationDuration);

    };

    this.hoverTooltip = function () {
      settings.elem
        .on('mouseenter touchstart', function () {
          _self.create($(this));
        })
        .on('mouseleave touchend', function () {
          _self.destroy();
        });
    };

    this.clickTooltip = function () {

      settings.elem.on('click', function (e) {
        e.preventDefault();
        if (_self.$activeElem)
            _self.destroy();

        _self.create($(this));
      });

      this.$body.on('click', '.js-close', function (e) {
        _self.destroy();
        e.preventDefault();
      });

      this.$document.on('click', function (e) {
        if ($(e.target).closest(settings.elem).length) return;
        _self.destroy();
      });

    };

    this.setTooltipPosition = function (elem, tooltip) {

      if (!this.$activeElem) return;

      var
        top,
        left,
        topA,
        margin = settings.margin,
        tooltipHeight = tooltip.outerHeight(),
        tooltipHalf = (tooltip.outerWidth() / 2),
        elemHeight = elem.outerHeight(),
        elemHalf = (elem.outerWidth() / 2),
        elemOffset = elem.offset(),
        $arrow = $('.arrow', tooltip);

      left = elemOffset.left + elemHalf - tooltipHalf;
      top = elemOffset.top + elemHeight + margin;


      if (settings.position === 'top') {
        top = elemOffset.top - tooltipHeight - margin;
      } else if (settings.position === 'left') {

        left = elemOffset.left - tooltip.outerWidth() - margin;

        if (left < 0) {
          left = 0;
        }
      } else if (settings.position === 'right') {
        left = elemOffset.left + elemHalf * 2 + margin;
      }

      if (settings.position === 'left' || settings.position === 'right') {

        top = elemOffset.top + elemHeight / 2 - tooltipHeight / 2;

        topA = tooltipHeight / 2 - 6;
        $arrow.css({
          top: topA
        });

      }
      console.log(left);
      tooltip.css({
        top: top,
        left: left
      });

    };

    this.$window.on('resize orientationchange', function() {
      _self.setTooltipPosition(_self.$activeElem, _self.$activeTooltip);
    });

  }

  //=========================================================//
  //=========================================================//

  /*   Hover Tooltip 'top'   */

  var HoverTooltipTop = new Tooltip({
    elem: $('.js-tooltip-hover-top'),
    layout: '<div class="tooltip-box"><div class="arrow bottom"></div>Tooltip hover top hello world hello world</div>',
    position: 'top',
    margin: 20,
    animation: 'fall',
    animationDuration: 800
  });

  HoverTooltipTop.hoverTooltip();

  /*   Hover Tooltip 'bottom'   */

  var HoverTooltipBottom = new Tooltip({
    elem: $('.js-tooltip-hover-bottom'),
    layout: '<div class="tooltip-box"><div class="arrow top"></div>Tooltip hover bottom</div>',
    position: 'bottom'
  });

  HoverTooltipBottom.hoverTooltip();

  /*   Hover Tooltip 'left'   */

  var HoverTooltipLeft = new Tooltip({
    elem: $('.js-tooltip-hover-left'),
    layout: '<div class="tooltip-box"><div class="arrow right"></div>Tooltip hover left</div>',
    position: 'left'
  });

  HoverTooltipLeft.hoverTooltip();

  /*   Hover Tooltip 'right'   */

  var HoverTooltipRight = new Tooltip({
    elem: $('.js-tooltip-hover-right'),
    layout: '<div class="tooltip-box"><div class="arrow left"></div>Tooltip hover right</div>',
    position: 'right'
  });

  HoverTooltipRight.hoverTooltip();



  /*   Click Tooltip top   */

  var ClickTooltipTop = new Tooltip({
    elem: $('.js-tooltip-click-top'),
    layout: '<div class="tooltip-box top">' +
              '<div class="arrow bottom"></div>' +
              '<span>Tooltip click top</span>' +
              '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
            '</div>',
    position: 'top',
    animation: 'fall',
    animationDuration: 800
  });

  ClickTooltipTop.destroy = function () {

    this.removeAnimation($('.tooltip-box.top'));

  };

  ClickTooltipTop.clickTooltip();

  /*   Click Tooltip bottom   */

  var ClickTooltipBottom = new Tooltip({
    elem: $('.js-tooltip-click-bottom'),
    layout: '<div class="tooltip-box bottom">' +
              '<div class="arrow top"></div>' +
              '<span>Tooltip click bottom</span>' +
              '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
            '</div>',
    position: 'bottom'
  });

  ClickTooltipBottom.destroy = function () {
    $('.tooltip-box.bottom').remove();
  };

  ClickTooltipBottom.clickTooltip();

  /*   Click Tooltip left   */

  var ClickTooltipLeft = new Tooltip({
    elem: $('.js-tooltip-click-left'),
    layout: '<div class="tooltip-box left">' +
              '<div class="arrow right"></div>' +
              '<span>Tooltip click left</span>' +
              '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
            '</div>',
    position: 'left'
  });

  ClickTooltipLeft.destroy = function () {
    $('.tooltip-box.left').remove();
  };

  ClickTooltipLeft.clickTooltip();

  /*   Click Tooltip right   */

  var ClickTooltipRight = new Tooltip({
    elem: $('.js-tooltip-click-right'),
    layout: '<div class="tooltip-box right">' +
              '<div class="arrow left"></div>' +
              '<span>Tooltip click right</span>' +
              '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
            '</div>',
    position: 'right'
  });

  ClickTooltipRight.destroy = function () {
    $('.tooltip-box.right').remove();
  };

  ClickTooltipRight.clickTooltip();

});