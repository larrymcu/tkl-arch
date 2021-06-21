/*!
 * Mobile Device Header control
 *
 * Copyright (C) 2018 - A project by Frich Chen
 */
var lastScrollTop = 0,
    windowWidth,
    windowHeight,
    mobileHeaderControlIsBinded = false,
    $topMenu,
    tolerance = 0;

/**
 * 控制手機平板寬螢幕時的選單出現、消失 事件 (使用時只須呼叫setMobileHeaderControl)
 */
function mobileHeaderControl() {

    if ($topMenu.hasClass('none'))
        return false;

    var st = $(window).scrollTop();

    if (st > lastScrollTop && st > $topMenu.height()) {
        $topMenu.addClass('extra');
    } else {
        if ((st + $(window).height() + tolerance) < $(document).height()
            || st == 0) {
            $topMenu.removeClass('extra');
        }
    }
    lastScrollTop = st;
}

/**
 * Resize 事件
 */
function mobileHeaderResize() {

    if (windowWidth == $(window).width())
        return false;
    else {
        //Alert("MobileHearer <br> width = " + windowWidth  + " & " + $(window).width() + "<br> height = " + windowHeight  + " & " + $(window).height());

        windowHeight = $(window).height();
        windowWidth = $(window).width();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        lastScrollTop = 0;
        $topMenu.removeClass('extra');
    }
}

/* 設定 行動裝置瀏覽時隱藏標題 (tolerance 向上滑容忍誤差 */
(function ($) {

    $.MobileHeaderControl = function (params) {

        if (!isMobile()) {
            $(window).unbind("scroll", mobileHeaderControl);
            mobileHeaderControlIsBinded = false;
            return false;
        }

        // setting passed parameters
        tolerance = params.tolerance;
        $topMenu = params.topmenuObj;

        // setting default parameters
        windowHeight = $(window).height();
        windowWidth = $(window).width();

        if (!mobileHeaderControlIsBinded) { // 只需要綁定一次
            $(window).bind("scroll", mobileHeaderControl);
            $(window).bind("resize", mobileHeaderResize);
            mobileHeaderControlIsBinded = true;
        }
    }
})(jQuery);