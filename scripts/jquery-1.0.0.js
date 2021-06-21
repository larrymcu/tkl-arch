var isGlobalResized, globalWindowWidth, globalWindowHeight;
$(function () {
    GoTop();
    isGlobalResized = false;
    globalWindowWidth = $(window).width();
    globalWindowHeight = $(window).height();
    DetectWindowResize();
});

/**
 * 偵測是否需要調整
 */
function DetectWindowResize() {
    $(window).resize(function (e) {
        if (isMobile()) {
            if (globalWindowWidth == $(window).width()) {
                isGlobalResized = false;
            } else {
                isGlobalResized = true;
                globalWindowWidth = $(window).width();
                globalWindowHeight = $(window).height();
            }
        } else {
            if (globalWindowWidth == $(window).width() &&
                globalWindowHeight == $(window).height()) {
                isGlobalResized = false;
            } else {
                isGlobalResized = true;
                globalWindowWidth = $(window).width();
                globalWindowHeight = $(window).height();
            }
        }
    });
}

/**
 * 調整頁長過短的foot最下方空白問題
 */
function FootAdjust() {
    var $divFootAbout = $('#divFootAbout');
    if ($divFootAbout.length == 1) {
        if ($(document).height() > ($divFootAbout.offset().top + $divFootAbout.outerHeight()))
            $divFootAbout.css({ 'height': ($(document).height() - $divFootAbout.offset().top - parseFloat($divFootAbout.css('padding-top')) - parseFloat($divFootAbout.css('padding-bottom'))) + 'px' });
    }
}
/**
 * 跳至上層 Called by backToTop
 */
function GoTop() {
    $(window).scroll(function () {
        $('.dm-footerToolBar').toggle($(window).scrollTop() > 130);
    });
    $('.dm-footerToolBar .backToTop').click(function () {
        GetToTop();
        return false;
    });
}
/**
 * 跳至上層函數
 */
function GetToTop() {
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.animate({ scrollTop: 0 }, 600);
}

/**
 * 設定 Text 只能輸入 Numeric (以 貼上 方式)
 * @param {any} obj
 */
function textNumericMask_c(obj) {
    clipboardData.setData('text', clipboardData.getData('text').replace(/[^\d]/g, ''))
}
/**
 * 凍結背景畫面
 */
function SetScreenFreeze() {
    $('body').addClass('stop-scrolling');
    $('body').bind('touchmove', function (e) { e.preventDefault() });
}
/**
 * 解除凍結背景畫面
 */
function SetScreenDefreeze() {
    $('body').removeClass('stop-scrolling');
    $('body').unbind('touchmove');
}
/**
 * 禁止返回上一頁
 */
function ForbidGetBack() {
    window.history.forward(1);
}
/**
 * 保持登入網路連線
 */
function KeepSession() {
    window.setInterval(function () {
        var url = '/static/keepsession.html';
        $.get(url);
    }, 60000);
}
/**
 * 跳至指定元件
 * @param {any} h
 * @param {any} $container
 */
function jumpTo(h, $container) {
    if ($container === undefined)
        $container = $('html, body');
    var top = ($('.' + h).length == 0) ?
        $('#' + h).offset().top - parseInt($('#' + h).css("margin-top")) :
        $('.' + h).offset().top - parseInt($('.' + h).css("margin-top"));
    $container.animate({ scrollTop: top }, 600);
    return false;
}

var map, latlng, infowindow;
/**
 * Load Google Map
 * @param {any} lat
 * @param {any} lng
 */
function GoogleMap(lat, lng, tel, address) {

    if (map === undefined) {

        var infoContent = "";
        if ($('#hfLang').val().trim() == Language.English)
            infoContent = ['<p>T.K.L Architects & Planners</p><p>Telphone: ', tel, '</p><p>Address: ', address, '</p>'].join('');
        else
            infoContent = ['<p>曾國立建築師事務所</p><p>電話：', tel, '</p><p>地址：', address, '</p>'].join('');
        infowindow = new google.maps.InfoWindow({
            content: infoContent
        });
        latlng = new google.maps.LatLng(lat, lng);
        var mapOptions = {
            zoom: 17, //初始放大倍數
            center: latlng, //中心點所在位置
            mapTypeId: google.maps.MapTypeId.ROADMAP //正常2D道路模式
        };
        //在指定DOM元素中嵌入地圖
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //加入標示點(Marker)
        var marker = new google.maps.Marker({
            position: latlng, //經緯度
            map: map //指定要放置的地圖對象
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }
    if ($('.contactContainer.extra').length == 0) {
        infowindow.open(map, marker);
    }
}

(function ($) {
    jQuery.fn.setfocus = function () {
        return this.each(function () {
            var dom = this;
            setTimeout(function () {
                try { dom.focus(); } catch (e) { }
            }, 0);
        });
    };
})(jQuery);