/** 前端 ucRecruit */

/**
 * 徵才項目
 */
var listRecruitment = (function () {
    var that = {};
    that.init = function () {
        $('.itemList .recruitTitle .newsTitle').eq(0).addClass('active');
        $('.itemList .recruitContent').eq(0).addClass('active');

        $('.newsTitle').click(function (e) {
            var id = $(this).data('value');
            $('.itemList .recruitTitle .newsTitle').removeClass('active');
            $(this).addClass('active');
            $('.content' + id).show();
        })
        $('.newsTitle').mouseover(function (e) {
            $('.itemList .recruitContent').hide();
            $('.content' + $(this).data('value')).show();
        });
        $('.newsTitle').mouseleave(function (e) {
            $('.itemList .recruitContent').hide();
            var id = $('.newsTitle.active').data('value');
            $('.content' + id).show();
        });
    }
    return that;
})();