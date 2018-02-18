$(function () {

  function Tooltip(options) {

    this.$elem = options.elem;
    this.$layout = options.layout;

    this.$window = $(window);
    this.$body = $('body');

    this.$activeElem = null;
    this.$activeTooltip = null;

    this.arrowMargin = 28;
    var _self = this;

    this.layoutTooltip = function (layout) {
      if (!layout) {
        layout = '<div>This is Tooltip</div>';
      }
      return layout;
    };

    this.create = function (elem) {
      this.$activeElem = elem;
      this.$activeTooltip = $(this.layoutTooltip(this.$layout));
      this.$body.append(this.$activeTooltip);
      this.setTooltipPosition(elem, this.$activeTooltip);
    };

    this.destroy = function () {
      this.$activeTooltip.remove();
      this.$activeElem = null;
      this.$activeTooltip = null;
    };

    this.hoverTooltip = function () {
      this.$activeTooltip = $(this.layoutTooltip(this.$layout));
      // this.$activeElem = options.elem;
      this.$elem
        .on('mouseenter touchstart', function () {
          _self.create($(this));
          console.log($(this));
        })
        .on('mouseleave touchend', function () {
          _self.destroy();
        });

      // $(window).on('click touchend', function(){
      //   _self.destroy();
      // });
    };

    this.clickTooltip = function () {
      this.$activeTooltip = $(this.layoutTooltip(this.$layout));
      this.$elem.on('click', function (e) {
        e.preventDefault();
        _self.create($(this));
        console.log($(this));
      });

      this.$activeTooltip.on('click', '.js-close', function (e) {
        e.preventDefault();
        _self.destroy();
      });

      $(document).click(function (e) {
        e.preventDefault();
        if ($(e.target).closest(_self.$elem).length)
          return;

        _self.destroy();

      });

    };

    this.setTooltipPosition = function (elem, tooltip) {
      if (!this.$activeElem) return;
      var
        top,
        left,
        tooltipHalf = (tooltip.innerWidth() / 2),
        elemHalf = (elem.innerWidth() / 2),
        elemHeight = elem.innerHeight(),
        elemOffset = elem.offset(),
        $arrow = $('.arrow', tooltip);

      left = elemOffset.left + elemHalf - tooltipHalf;
      top = elemOffset.top + elemHeight + 10;

      tooltip.css({
        top: top,
        left: left
      });

    };

    $(window).on('resize orientationchange', function() {
      _self.setTooltipPosition(_self.$activeElem, _self.$activeTooltip);
    });

  }

  //=========================================================//
  //=========================================================//

  var HoverTooltip = new Tooltip({
    elem: $('.js-tooltip-hover'),
    layout: '<div class="tooltip-box"><div class="arrow top"></div>Tooltip hover</div>'
  });
  HoverTooltip.hoverTooltip();

  var ClickTooltip = new Tooltip({
    elem: $('.js-tooltip-click'),
    layout: '<div class="tooltip-box"><div class="arrow top"></div>Tooltip click <a href="https://www.google.ru" class="js-close">x</a></div>'
  });
  ClickTooltip.clickTooltip();

});