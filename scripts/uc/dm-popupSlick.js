/** popupSlick */
var $imgContainer;

// 記錄呼叫此套件時的 window.scrollTop() (返回時使用)
var popupSlickST = 0;

/**
 * 關閉 Popform
 */
function closePopupSlick() {
    $('.dm-popSlickOverlay').fadeOut(function () {
        $imgContainer.slick('unslick');
    });
    SetScreenDefreeze("closePopupSlick");
}

/**
 * 載入 slick 套件
 * @param {object} $container Element
 */
function setupSlick($container) {

    $imgContainer = $container;
    var isThisMobile = isMobile();
    if (isThisMobile) {
        $imgContainer.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: indexImgAnimationTime,
        });
    } else {
        $imgContainer.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: indexImgAnimationTime,
        });
        $('.slick-prev').html("<i class='fa fa-angle-left' aria-hidden='true'></i>");
        $('.slick-next').html("<i class='fa fa-angle-right' aria-hidden='true'></i>");
    }

    $imgContainer.closest('.dm-popSlickOverlay').show();

    if (!isThisMobile) {
        $('.slick-next').trigger('click');
    }
}

/* 關閉事件 */
$(function () {
    $('body').on('click', '.dm-popSlickOverlay .eye', function (e) {
        var imgurl = $('.slick-slide.slick-active > div').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        lan = GetUrlParameter('Lan'),
            s = GetUrlParameter('S'),
            page = $('#hdPage').val().trim();
        window.location.href = "/view.aspx?img=" + imgurl + "&Lan=" + lan + "&S=" + s + "&PG=" + page + "&ST=" + popupSlickST;
    });

    $('body').on('click', '.dm-popSlickOverlay .close', function (e) {
        var overlay = $('.dm-popSlickOverlay:visible');
        if (overlay.length > 0)
            closePopupSlick();
    });

    $(document).keyup(function (e) {
        var overlay = $('.dm-popSlickOverlay:visible');
        if (overlay.length > 0) {
            switch (e.keyCode) {
                case 27:
                    closePopupSlick();
                    break;
                case 37: //left
                    $('.slick-prev').trigger('click');
                    break;
                case 39: //right
                    $('.slick-next').trigger('click');
                    break;
            }
        }
    });
    $(window).resize(function (e) {
        if (isGlobalResized) {
            if ($imgContainer !== undefined && $imgContainer.is(':visible')) {
                $imgContainer.slick('unslick');
                setupSlick($imgContainer);
            }
        }
    });
});

/* 物件產生 */
(function ($) {

    $.popupSlick = function (gid, st) {
        if ($('.dm-popSlickOverlay #' + gid).length == 0) {
            var html = Ajax(new AjaxObj('HandlerHtmlTags.ashx', RequestAct.Select, RequestType.Pics, gid));
            var markup = ["<div class='dm-popSlickOverlay'>", html, "</div>"].join('');
            $(markup).hide().appendTo('body');
        }
        popupSlickST = st;
        setupSlick($('#' + gid));
        if (window.history && window.history.pushState) {
            var url = window.location.toString() + '#forward'
            window.history.pushState('forward', null, url);
            $(window).on('popstate', function () {
                if ($('.dm-popSlickOverlay').is(':visible')) {
                    closePopupSlick();
                    return false;
                }
            });
        }
    }
})(jQuery);