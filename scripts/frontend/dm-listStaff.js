/**
 * 設定引言動畫
 */
function setIntrodAnimation() {
    $('.staffHeader .introd p').each(function (index) {
        $(this).delay((staffTextAnimationTime) * index).fadeIn(staffTextAnimationTime);
    });
}
/**
 * 團隊成員
 */
var listStaff = (function () {
    var that = {};
    that.init = function () {
        setIntrodAnimation();
        $('.jProfile').click(function (e) {
            var width = Math.min($(this).closest('.wrapper').width(), $(window).width()) - 20;
            var left = ($(window).outerWidth() - width) / 2;
            $(this).find('.popForm').css({ 'width': width + 'px', 'left': left + 'px' });
            var $markup = $("<div class='dm-dialogOverlay'>" + $(this).find('.detail').html() + "</div>");
            $markup.hide().appendTo('body').fadeIn();
            var $popForm = $markup.find('.popForm');
            if (($popForm.offset().top + $popForm.height()) > $(window).height()) {
                var top = $(window).height() - $markup.find('.popForm').height() - 20;
                top = (top < 0) ? 0 : top;
                $popForm.css({ 'top': top + 'px' });
            }
            SetScreenFreeze();
        });
        $('body').on('click touchstart', '.dm-dialogOverlay', function (e) {
            $(this).fadeOut(function () {
                $(this).remove();
            });
            SetScreenDefreeze();
        });

        $('.staffPrev').click(function (e) {
            $('.staff > ul > li').first().appendTo('.staff > ul');
        });
    }
    return that;
})();