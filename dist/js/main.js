$(function () {

    /*   Hover Tooltip 'bottom'   */

    $('.js-tooltip-hover-bottom').tooltip({
        layout: '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover bottom</div>',
        animation: 'grow'
    });

    /*   Hover Tooltip 'top'   */

    var HoverTooltipTop = new Tooltip({
        elem: $('.js-tooltip-hover-top'),
        layout: function (elem) {
            return '<div class="tooltip-box"><div class="arrow"></div>' + elem.data('id') + '</div>';
        },
        position: 'top',
        margin: 20,
        animation: 'fall',
        animationDuration: 800
    });

    HoverTooltipTop.init();

    /*   Hover Tooltip 'left'   */

    var HoverTooltipLeft = new Tooltip({
        elem: $('.js-tooltip-hover-left'),
        layout: '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover left</div>',
        position: 'left',
        animation: 'swing'
    });

    HoverTooltipLeft.init();

    /*   Hover Tooltip 'right'   */

    var HoverTooltipRight = new Tooltip({
        elem: $('.js-tooltip-hover-right'),
        layout: '<div class="tooltip-box"><div class="arrow"></div>Tooltip hover right</div>',
        position: 'right',
        animation: 'slide'
    });

    HoverTooltipRight.init();



    /*   Click Tooltip top   */

    var ClickTooltipTop = new Tooltip({
        elem: $('.js-tooltip-click-top'),
        layout: '<div class="tooltip-box top">' +
        '<div class="arrow"></div>' +
        '<span>Tooltip click top</span>' +
        '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
        '</div>',
        position: 'top',
        mode: 'click',
        animation: 'fall',
        animationDuration: 800
    });

    ClickTooltipTop.destroy = function () {
        this.removeAnimation();
    };

    ClickTooltipTop.init();

    /*   Click Tooltip bottom   */

    var ClickTooltipBottom = new Tooltip({
        elem: $('.js-tooltip-click-bottom'),
        layout: '<div class="tooltip-box bottom">' +
        '<div class="arrow"></div>' +
        '<span>Tooltip click <a href="https://www.google.ru"> bottom</a></span>' +
        '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
        '</div>',
        mode: 'click'
    });

    ClickTooltipBottom.destroy = function () {
        $('.tooltip-box.bottom').remove();
    };

    ClickTooltipBottom.init();

    /*   Click Tooltip left   */

    var ClickTooltipLeft = new Tooltip({
        elem: $('.js-tooltip-click-left'),
        layout: '<div class="tooltip-box left">' +
        '<div class="arrow"></div>' +
        '<span>Tooltip click left</span>' +
        '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
        '</div>',
        position: 'left',
        mode: 'click',
        animation: 'fall'
    });

    ClickTooltipLeft.destroy = function () {
        $('.tooltip-box.left').remove();
    };

    ClickTooltipLeft.init();

    /*   Click Tooltip right   */

    var ClickTooltipRight = new Tooltip({
        elem: $('.js-tooltip-click-right'),
        layout: '<div class="tooltip-box right">' +
        '<div class="arrow"></div>' +
        '<span>Tooltip click right</span>' +
        '<a href="https://www.google.ru" class="js-close icon"><img src="../img/close.png" alt=""></a>' +
        '</div>',
        position: 'right',
        mode: 'click'
    });

    ClickTooltipRight.destroy = function () {
        $('.tooltip-box.right').remove();
    };

    ClickTooltipRight.init();

});