$(function () {

  function Tooltip(options, callback) {

    // Define options default
    var settings = {
      elem: null,
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
    this.$window = $(window);
    this.$body = $('body');

    var _self = this;

    // Private methods

    this._setLayout = function () {
      return callback(settings.elem);
    };

    this._create = function (event, elem) {

      if (this.$activeElem) {
        this.destroy();
      }

      if (event.type === 'mouseleave' || event.type === 'touchend') return;

      this.$activeElem = elem;
      this.$activeTooltip = $(this._setLayout());

      this.$body.append(this.$activeTooltip);

      if (settings.animation) {
        this._animate();
      }
      this._setPosition();
    };

    this._setPosition = function () {

      if (!this.$activeElem) return;

      var
        top,
        left,
        topA,
        leftA,
        margin = settings.margin,
        tooltipHeight = this.$activeTooltip.outerHeight(),
        tooltipHalf = (this.$activeTooltip.outerWidth() / 2),
        elemHeight = this.$activeElem.outerHeight(),
        elemHalf = (this.$activeElem.outerWidth() / 2),
        elemOffset = this.$activeElem.offset(),
        $arrow = $('.arrow', this.$activeTooltip);

      top = elemOffset.top + elemHeight + margin;
      left = elemOffset.left + elemHalf - tooltipHalf;

      topA = '-8px';
      leftA = tooltipHalf - ($arrow.outerWidth() / 2);

      if (settings.position === 'top') {
        top = elemOffset.top - tooltipHeight - margin;
        topA = tooltipHeight;
        $arrow.css({transform : 'rotate(180deg)'});
      }  else if (settings.position === 'left') {

        left = elemOffset.left - this.$activeTooltip.outerWidth() - margin;
        top = elemOffset.top + elemHeight / 2 - tooltipHeight / 2;
        topA = tooltipHeight / 2 - 4;
        leftA = this.$activeTooltip.outerWidth() - 2;
        $arrow.css({transform : 'rotate(90deg)'});

        if ((elemOffset.left - this.$activeTooltip.outerWidth()) < 0) {
          left = elemOffset.left + elemHalf - tooltipHalf;
          top = elemOffset.top + elemHeight + margin;
          topA = '-8px';
          leftA = tooltipHalf - ($arrow.outerWidth() / 2);
          $arrow.css({transform : 'rotate(0deg)'});
        }
      } else if (settings.position === 'right') {
        left = elemOffset.left + elemHalf * 2 + margin;
        top = elemOffset.top + elemHeight / 2 - tooltipHeight / 2;
        topA = tooltipHeight / 2 - 4;
        leftA = '-10px';
        $arrow.css({transform : 'rotate(-90deg)'});
        if (((this.$body.outerWidth() - (elemOffset.left + this.$activeElem.outerWidth())) - this.$activeTooltip.outerWidth()) < 0) {
          left = elemOffset.left + elemHalf - tooltipHalf;
          top = elemOffset.top + elemHeight + margin;
          topA = '-8px';
          leftA = tooltipHalf - ($arrow.outerWidth() / 2);
          $arrow.css({transform : 'rotate(0deg)'});
        }
      }

      $arrow
        .css({
          top: topA,
          left: leftA
        });

      this.$activeTooltip.css({
        top: top,
        left: left
      });

    };

    this._animate = function () {

      this.$activeTooltip
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


    // Public methods

    this.destroy = function () {
      if (settings.animation) {
        this.removeAnimation();
      } else {
        this.$activeTooltip.remove();
      }
      this.$activeElem = null;
      this.$activeTooltip = null;
    };

    this.hoverTooltip = function () {
      settings.elem.on('mouseenter touchstart mouseleave', function (e) {
        _self._create(e, $(this));
      });

        // .on('mouseenter touchstart', function () {
        //   _self._create($(this));
        // })
        // .on('mouseleave touchend', function () {
        //   _self.destroy();
        // });
    };

    this.clickTooltip = function () {

      settings.elem.on('click', function (e) {
        e.preventDefault();
        // if (_self.$activeElem)
        //     _self.destroy();

        _self._create(e, $(this));
      });

      this.$body.on('click', '.js-close', function (e) {
        _self.destroy();
        e.preventDefault();
      });

      this.$window.on('click', function (e) {
        if ($(e.target).closest(settings.elem).length) return;
        _self.destroy();
      });

    };

    this.removeAnimation = function () {
      this.$activeTooltip
        .removeClass('tooltip-show')
        .addClass('tooltip-dying');

      this.$activeTooltip.remove(); // удаление без анимации, переписать!!!

      // setTimeout(function() {
      //   _self.$activeTooltip.remove();
      // }, settings.animationDuration);

    };


    // Keep tooltip position after window resize

    this.$window.on('resize orientationchange', function() {
      _self._setPosition();
    });

  }

  //=========================================================//
  //=========================================================//

  /*   Hover Tooltip 'top'   */

  var HoverTooltipTop = new Tooltip({
    elem: $('.js-tooltip-hover-top'),
    position: 'top',
    margin: 20,
    animation: 'fall',
    animationDuration: 800
  }, function (elem) {
    return '<div class="tooltip-box"><div class="arrow"></div>'+elem.data('id')+'</div>';
  });

  HoverTooltipTop.hoverTooltip();

  /*   Hover Tooltip 'bottom'   */

  var HoverTooltipBottom = new Tooltip({
    elem: $('.js-tooltip-hover-bottom')
  }, function () {
    return '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover bottom</div>';
  });

  HoverTooltipBottom.hoverTooltip();

  /*   Hover Tooltip 'left'   */

  var HoverTooltipLeft = new Tooltip({
    elem: $('.js-tooltip-hover-left'),
    position: 'left'
  }, function () {
    return '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover left</div>';
  });

  HoverTooltipLeft.hoverTooltip();

  /*   Hover Tooltip 'right'   */

  var HoverTooltipRight = new Tooltip({
    elem: $('.js-tooltip-hover-right'),
    position: 'right'
  }, function () {
    return '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover right</div>';
  });

  HoverTooltipRight.hoverTooltip();



  /*   Click Tooltip top   */

  var ClickTooltipTop = new Tooltip({
    elem: $('.js-tooltip-click-top'),
    position: 'top',
    animation: 'fall',
    animationDuration: 800
  }, function () {
    return '<div class="tooltip-box top">' +
      '<div class="arrow"></div>' +
      '<span>Tooltip click top</span>' +
      '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
      '</div>'
  });

  ClickTooltipTop.destroy = function () {
    $('.tooltip-box.top').remove();
  };

  ClickTooltipTop.clickTooltip();

  /*   Click Tooltip bottom   */

  var ClickTooltipBottom = new Tooltip({
    elem: $('.js-tooltip-click-bottom')
  }, function () {
    return '<div class="tooltip-box bottom">' +
      '<div class="arrow"></div>' +
      '<span>Tooltip click bottom</span>' +
      '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
      '</div>';
  });

  ClickTooltipBottom.destroy = function () {
    $('.tooltip-box.bottom').remove();
  };

  ClickTooltipBottom.clickTooltip();

  /*   Click Tooltip left   */

  var ClickTooltipLeft = new Tooltip({
    elem: $('.js-tooltip-click-left'),
    position: 'left'
  }, function () {
    return '<div class="tooltip-box left">' +
      '<div class="arrow"></div>' +
      '<span>Tooltip click left</span>' +
      '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
      '</div>';
  });

  ClickTooltipLeft.destroy = function () {
    $('.tooltip-box.left').remove();
  };

  ClickTooltipLeft.clickTooltip();

  /*   Click Tooltip right   */

  var ClickTooltipRight = new Tooltip({
    elem: $('.js-tooltip-click-right'),
    position: 'right'
  }, function () {
    return '<div class="tooltip-box right">' +
      '<div class="arrow"></div>' +
      '<span>Tooltip click right</span>' +
      '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
      '</div>';
  });

  ClickTooltipRight.destroy = function () {
    $('.tooltip-box.right').remove();
  };

  ClickTooltipRight.clickTooltip();

});