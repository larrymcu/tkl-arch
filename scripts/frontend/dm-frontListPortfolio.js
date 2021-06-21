/**
 * js for frontend list of Portfolio
 */

var chkPointTop = 0;
var arrKeyValue = new Array();
var portfolioST = 0;

/**
 * 設定作品的類別資訊
 */
function initializePortfolioProfile() {
    arrKeyValue.push(new KeyValue("TypeCode", GetParameterByName('TypeCode')));
    arrKeyValue.push(new KeyValue("S", GetParameterByName('S')));
    arrKeyValue.push(new KeyValue("Lan", GetParameterByName('Lan')));
}

/**
 * 初始化元件
 */
function initializePortfolioItems() {
    var $wrapper = $('#wrapper');
    $wrapper.css({ 'width': '' });
    var wihdowWidth = $(window).width();
    if (wihdowWidth > 1024)
        width = "1024px";
    else {
        if (wihdowWidth > 768)
            width = wihdowWidth + "px";
        else {
            if (wihdowWidth > 665)
                width = "665px";
            else {
                if (wihdowWidth > 484)
                    width = wihdowWidth;
                else
                    width = "330px";
            }
        }
    }
    $wrapper.css({ 'width': width });
    chkPointTop = $('.fatfoot').offset().top;
    $.MobileHeaderControl({
        'topmenuObj': $('#topMenu'),
        'tolerance': 100,
    });
    portfolioST = GetUrlParameter("ST");
    if (portfolioST === undefined)
        portfolioST = 0;
    else
        $(window).scrollTop(portfolioST);
}

/**
 * 事件綁定
 */
function eventBindPortfolio() {
    $(window).scroll(function (e) {
        portfolioST = $(window).scrollTop();
        if ((portfolioST + $(window).height()) > chkPointTop) {
            if ($('#hdClose').length === 0) {
                e.preventDefault();
                var $page = $('#hdPage');
                $page.val(parseInt($page.val()) + 1);
                var arr = arrKeyValue.slice();
                arr.push(new KeyValue("PG", $page.val().trim()));
                $.Message("資料載入中！請稍後", 2000);
                var res = Ajax(new AjaxObj('HandlerHtmlTags.ashx', RequestAct.Select, RequestType.Portfolio, JSON.stringify(arr)));
                res = res.replace(/\&amp/g, '&');
                $('.itemList').append(res);
                //$(res).hide().appendTo('.itemList').fadeIn();
                chkPointTop = $('.fatfoot').offset().top;
            }
        }
    });

    $('body').on('click', '.aLink', function (e) {
        var gid = $(this).data('value');
        var msg = (globalWindowWidth < globalWindowHeight && isMobile()) ?
            "照片正在載入當中<br>建議手機橫向瀏覽" : "照片載入中";
        $.Message(msg, 2000);
        $.popupSlick(gid, portfolioST);
        return false;
    });

    $("#ddlType").change(function (e) {
        e.preventDefault;
        __doPostBack('ddlType', $("#ddlType").val());
    });

    $(window).resize(function (e) {
        if (isGlobalResized)
            initializePortfolioItems();
    });
}

var listPortfolio = (function () {
    var that = {};
    that.init = function () {
        initializePortfolioProfile();
        initializePortfolioItems();
        eventBindPortfolio();
    };
    return that;
})();