$(function () {

  function Tooltip(options, callback) {

    // Define options default
    var settings = {
      elem: null,
      position: 'bottom',
      margin: 10,
      animation: 'fade', // fall, grow, swing, slide
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
        this.$activeTooltip.on('mouseleave touchend', function () {
          _self.destroy();
        });
        if(this.$activeTooltip.is(':hover')) return;
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

      this._setAnimationDirection();

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

    this._setAnimationDirection = function () {
      // animation direction
      if (settings.animation === 'fall') {
        this.$activeTooltip.css({
          top: this.$activeElem.offset().top - this.$activeTooltip.outerHeight() - 60
        });
      } else if (settings.animation === 'slide') {
        if (settings.position === 'right') {
          this.$activeTooltip.css({
            left: this.$activeElem.offset().left + this.$activeElem.outerWidth() + 60
          });
        } else if ( settings.position === 'left') {
          this.$activeTooltip.css({
            left: this.$activeElem.offset().left - this.$activeElem.outerWidth() - 60
          });
        }
      }
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

    this.hover = function () {
      settings.elem.on('mouseenter touchstart mouseleave', function (e) {
        _self._create(e, $(this));
      });
    };

    this.click = function () {

      settings.elem.on('click', function (e) {
        e.preventDefault();
        _self._create(e, $(this));
      });

      this.$body.on('click', '.js-close', function (e) {
        _self.destroy();
        e.preventDefault();
      });

      this.$window.on('click', function (e) {
        if ($(e.target).closest(settings.elem).length || $(e.target).closest(_self.$activeTooltip).length) return;
        _self.destroy();
      });

    };

    this.removeAnimation = function () {
      if (this.$activeTooltip) {
        this.$activeTooltip
          .removeClass('tooltip-show')
          .addClass('tooltip-dying')
          .delay(settings.animationDuration).queue(function () {
          $(this).remove();
        });
      }
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

  HoverTooltipTop.hover();

  /*   Hover Tooltip 'bottom'   */

  var HoverTooltipBottom = new Tooltip({
    elem: $('.js-tooltip-hover-bottom'),
    animation: 'grow'
  }, function () {
    return '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover bottom</div>';
  });

  HoverTooltipBottom.hover();

  /*   Hover Tooltip 'left'   */

  var HoverTooltipLeft = new Tooltip({
    elem: $('.js-tooltip-hover-left'),
    position: 'left',
    animation: 'swing'
  }, function () {
    return '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover left</div>';
  });

  HoverTooltipLeft.hover();

  /*   Hover Tooltip 'right'   */

  var HoverTooltipRight = new Tooltip({
    elem: $('.js-tooltip-hover-right'),
    position: 'right',
    animation: 'slide'
  }, function () {
    return '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover right</div>';
  });

  HoverTooltipRight.hover();



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
    this.removeAnimation();
  };

  ClickTooltipTop.click();

  /*   Click Tooltip bottom   */

  var ClickTooltipBottom = new Tooltip({
    elem: $('.js-tooltip-click-bottom')
  }, function () {
    return '<div class="tooltip-box bottom">' +
      '<div class="arrow"></div>' +
      '<span>Tooltip click <a href="https://www.google.ru"> bottom</a></span>' +
      '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
      '</div>';
  });

  ClickTooltipBottom.destroy = function () {
    $('.tooltip-box.bottom').remove();
  };

  ClickTooltipBottom.click();

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

  ClickTooltipLeft.click();

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

  ClickTooltipRight.click();

});