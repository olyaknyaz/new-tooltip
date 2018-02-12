(function ($) {
  var settings = {
    position: 'top',
    duration: 500,
    layout: '<div class="toolt"><div class="arrow top"></div>Hello, world!</div>'
  };

  var methods = {
    init: function (options) {
      settings = $.extend(settings, options);
      return this.each(function () {
        $(this)
          .css('position', 'relative')
          .append(methods.create())
          .on('mouseover', methods.show)
          .on('mouseout', methods.hide);
      });
    },
    getTrigger: function () {
      return $(this);
    },
    create: function () {
      var $tooltip = $(settings.layout);
      setTooltipPosition($tooltip);
      return $tooltip.addClass('tooltip-box');
    },
    show: function () {
      $(this).addClass('active');
    },
    hide: function () {
      $(this).removeClass('active');
    }
  };
  
  $.fn.tooltip = function (action) {
    if(methods[action]) {
      return methods[action].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof action === 'object' || !action) {
      return methods.init.apply(this, arguments);
    } else {
      console.info('Action' + action + 'is not found');
      return this;
    }
  };

  function setTooltipPosition($elem) {
    var trigger = methods.getTrigger;
    var
      top, bottom, left, right;

    top = 10;
    $elem.css({
      top: top
    });
    return $elem;
  }
})(jQuery);