/**
 * default
 */
var $section;
var sectionInnerHeight; // 只有內部不含 padding
var sectionIndex = 0; // 目前的 section Index
var indexWindowHeight;
var indexWindowWidth;

var staffIntrodMaxHeight = 200;
var staffPMaxLineHeight = 28;
var staffPMinLineHeight = 25;

var portfolioIconWidth = 90;

var recruitMaxLineHeight = 50;
var recruitMinLineHeight = 13;

/**
 * default
 */
var defaultPage = (function () {
    var that = {};
    that.init = function () {
        $('.container').addClass('default');

        $('#divImgMain').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: indexImgAnimationTime,
        });

        var indexMainHeight = ($(window).height() - $('.banner').outerHeight() - $('#divFootAbout').outerHeight() - $('.indexMain').outerHeight() - 20) / 2;
        if (indexMainHeight > 0)
            $('.indexMain').css({ 'padding-top': (indexMainHeight - 20) + 'px', 'padding-bottom': (indexMainHeight + 20) + 'px' });
        
        $('.indexMain .introd p').each(function (index) {
            $(this).delay(indexTextAnimationTime * index).fadeIn(indexTextAnimationTime);
        });
    }
    return that;
})();

/**
 * 設定 Section 動畫切換
 * @param {any} thisIndex
 */
function setSection(thisIndex) {

    $section.eq(sectionIndex).hide();
    $section.eq(thisIndex).show();

    $('#indexNavibar li').eq(sectionIndex).removeClass('active');
    $('#indexNavibar li').eq(thisIndex).addClass('active');

    sectionIndex = thisIndex;
}

/**
 * 初始化各項值
 */
function indexInitializeValues() {
    indexWindowWidth = $(window).width();
    indexWindowHeight = $(window).height();
    $section.css({ 'height': indexWindowHeight + 'px' });

    // 還原初始狀態
    // staff
    $('.staffHeader .introd').css({ 'height': '' });
    $('.staffHeader .introd p').css({ 'line-height': '' });

    // portfolio
    $('#Portfolios').removeClass('extra');
    $('.showPortfolio').removeClass('extra');
    $('.portfolioItem').css({ 'width': '' });
    $('.portfolioItem').css({ 'margin-bottom': '' });

    // contact
    $('.contactContainer').removeClass('extra');
    $('#divGoogleMap').css({ 'height': 'auto' });
}


/**
 * index
 */
var index = (function () {
    var that = {};
    that.init = function () {

        $section = $('.section');

        // 設定起初選擇section;
        sectionIndex = $('#hfS').val().trim();
        $section.eq(sectionIndex).show();
        $('#indexNavibar li').eq(sectionIndex).addClass('active');

        indexInitialize();
        indexEventBinding();

        var url = window.location.toString().toLowerCase();
        $('#indexNavibar > ul > li > a').each(function (e) {
            if ($(this).prop('href').toLowerCase() === url) {
                $(this).trigger('click');
                return false;
            }
        });
    }
    return that;
})();

/**
 * 元件初始化
 */
function indexInitialize() {

    indexInitializeValues();
    sectionInnerHeight = $section.eq(0).height();

    setStaffContainer();
    setPortfolioItem();
    setRecriut();
    setContact();
    GoogleMap(parseFloat($('#hdlatlng').val().trim().split(',')[0]),
        parseFloat($('#hdlatlng').val().trim().split(',')[1]),
        $('#hdTel').val().trim(), $('#hdAddress').val().trim());

    $('.sectionContentCell').css({ 'max-height': getSectionContentCellHeight(0) + 'px' });
}

/**
 * 事件綁定
 */
function indexEventBinding() {
    $(window).resize(function (e) {
        if (isGlobalResized)
            indexInitialize();
    });

    $('#indexNavibar a').click(function (e) {
        var index = $(this).data('value');
        if (index === undefined)
            return;
        var thisIndex = parseInt(index);
        if (sectionIndex != thisIndex)
            setSection(thisIndex);
    });

    $('#indexNavibar li.language a').click(function (e) {
        if (!$(this).find('span').is(':visible')) {
            var obj = ["<ul>", $(this).next('.dm-submenu').html().trim(), "</ul>"].join('');
            $.dialog1({
                'title': "Select language",
                'message': obj,
                'buttons': { 'Close': { 'class': 'dm-btnConfirm', 'action': function () { } } }
            });
        }
        var $li;
        if ($('.dm-dialogContent').length > 0)
            $li = $('.dm-dialogContent').find('li');
        if ($('.dm-iosContent').length > 0)
            $li = $('.dm-iosContent').find('li');
        $li.css({ 'line-height': '30px' });
        $("<i class='fa fa-circle-o fa-fw'></i>").insertBefore($li.find('a'));
    });
}

/**
 * 計算 是否需要調整高度
 */
function getSectionContentCellHeight(type) {
    var $sectionTitle = $('.sectionTitle');
    var devi = sectionInnerHeight - ($sectionTitle.is(':visible') ? $sectionTitle.outerHeight() : 0);
    return (type == 0) ? devi : (devi - $('.staff').height());
}

/**
 * 設定成員台
 */
function setStaffContainer() {
    
    var $introd = $('.staffHeader .introd');
    var $p = $('.staffHeader .introd p');
    $('#cssStaff').text('');
    
    //var isWidthNeedAdjust = (657 > $(window).width()) ? true : false;
    var devi = getSectionContentCellHeight(1);
    
    if (devi < 0) {
        var pLength = $p.length;
        var lineHeight = Math.min(Math.floor((devi) / pLength), staffPMaxLineHeight);
        lineHeight = Math.max(lineHeight, staffPMinLineHeight);
        $p.css({ 'line-height': lineHeight + 'px' });
        $('.introd').css({ 'height': (lineHeight * pLength) + 'px' });
    }
    var liStaffWidth = $('.staff li > a').width() + 20;
    if (liStaffWidth == 20)
        liStaffWidth = 70 + 20;
    var oneRowSize = Math.floor($('.staff').width() / liStaffWidth);
    var marginWidth = ($('.staff').width() - oneRowSize * liStaffWidth) / (oneRowSize + 1);
    var css =
        [".staff li{width:90px!important;margin-left:", marginWidth, "px;}",
            ".staff li:nth-child(", oneRowSize, "n+", oneRowSize, "){margin-right:", marginWidth, "px;}"].join('');
    $('#cssStaff').text(css);
}

/**
 * 調整作品顯示方式
 */
function setPortfolioItem() {

    var $showPortfolio = $('.showPortfolio');
    var $portfolioItem = $('.portfolioItem');
    var $sectionContentCell = $('.showPortfolio .sectionContentCell');
    $('#cssPortfolios').text('');
    
    var showPortfolioWidth = $showPortfolio.width();
    showPortfolioWidth = (showPortfolioWidth == 0) ? Math.min(indexWindowWidth, 1024) : showPortfolioWidth;
    $sectionContentCell.css({ 'width': showPortfolioWidth + 'px' });

    if (indexWindowWidth > 484) {
        var width = indexWindowWidth;
        if (indexWindowWidth > 1024)
            width = "1024px";
        else {
            if (indexWindowWidth > 768)
                width = indexWindowWidth + "px";
            else {
                if (indexWindowWidth > 665)
                    width = "665px";
                else
                    width = "auto";
            }
        }
        $sectionContentCell.css({ 'width': width });
    } else {
        $showPortfolio.addClass('extra');
        $('#Portfolios').addClass('extra');
        var marginWidth = 0;
        if (indexWindowWidth > indexWindowHeight) { // <360<=484，一列三個
            marginWidth = (indexWindowWidth - 3 * 90) / 4;
            var removeMarginBottom = "";
            var portfolioItemHeight = 86 + parseFloat($portfolioItem.css('margin-bottom'));
            if (getSectionContentCellHeight(0) < portfolioItemHeight * 2)
                removeMarginBottom = 'margin-bottom:0px!important;';
            var css =
                [".portfolioItem{width:60px!important;margin-left:", marginWidth, "px;", removeMarginBottom, "}",
                    ".portfolioItem:nth-child(3n+3){margin-right:", marginWidth, "px;}"].join('');
            $('#cssPortfolios').text(css);

        } else { // <= 360，一列兩個
            marginWidth = (indexWindowWidth - 2 * 90) / 3;
            var css =
                [".portfolioItem{width:60px!important;margin-left:", marginWidth, "px;}",
                    ".portfolioItem:nth-child(2n+2){margin-right:", marginWidth, "px;}"].join('');
            $('#cssPortfolios').text(css);
        }
    }
}

/**
 * 設定招募字形
 */
function setRecriut() {

    var $element = $(".itemList .recruitContent .newsContent");
    $(".itemList .recruitContent .newsContent").css({ "font-size": '' });

    var eleFontSize = parseFloat($element.eq(0).css("font-size"));
    if (eleFontSize > newsContentFontSizeMax)
        $element.css({ "font-size": newsContentFontSizeMax + "px" });
    if (eleFontSize < newsContentFontSizeMin)
        $element.css({ "font-size": newsContentFontSizeMin + "px" });

    $element = $(".itemList .recruitTitle .newsTitle");
    eleFontSize = parseFloat($element.eq(0).css("font-size"));
    if (eleFontSize > newsContentH3FontSizeMax)
        $element.css({ "font-size": newsContentH3FontSizeMax + "px" });
    if (eleFontSize < newsContentH3FontSizeMin)
        $element.css({ "font-size": newsContentH3FontSizeMin + "px" });

    // 設定招募內容行高
    var $newsContent = $('.itemList .recruitContent .newsContent');
    $newsContent.css({ 'line-height': recruitMaxLineHeight + 'px' });

    var devi = getSectionContentCellHeight(0) - $('.recruitTitle').outerHeight();
    if ($('.recruitContent').eq(0).height() === 0) {
        if (devi < 8 * recruitMaxLineHeight) {
            lineHeight = Math.max(lineHeight, recruitMinLineHeight);
            $newsContent.css({ 'line-height': lineHeight + 'px' });
        }
    } else {
        if (devi < $('.recruitContent').eq(0).height()) {
            lineHeight = Math.max(lineHeight, recruitMinLineHeight);
            var rows = 0;
            $('.recruitContent').each(function (e) {
                rows = Math.max(rows, Math.round($(this).height() / recruitMaxLineHeight))
            });
            var lineHeight = Math.min((devi - 10) / rows, recruitMaxLineHeight);
            lineHeight = Math.max(lineHeight, recruitMinLineHeight);
            $newsContent.css({ 'line-height': lineHeight + 'px' });
        }
    }
}

/**
 * 設定 Contact 與 Google地圖
 */
function setContact() {
    var $contactContainer = $('.contactContainer');
    var $map = $('#divGoogleMap');
    if ($(window).width() < 768) {
        $contactContainer.addClass('extra');
        var mapHeight = getSectionContentCellHeight(0) - $('.contactInfo').height() - 10;
        $map.css({ 'height': mapHeight + 'px' });
    } else {
        $map.css({ 'height': (getSectionContentCellHeight(0) - 10) + 'px' });
    }
}