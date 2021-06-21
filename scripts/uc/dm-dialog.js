//顯示訊息 且或 導覽
var dialogTitle = '曾國立建築師事務所';

function Alert(msg) {
    $.confirm({
        'title': dialogTitle,
        'message': (msg.indexOf('err') >= 0) ? GetErrorCode(msg) : msg,
        'buttons': {
            '確定': {
                'class': 'blue',
                'action': function () { }
            }
        }
    });
}
function AlertGet(msg, url) {
    $.confirm({
        'title': dialogTitle,
        'message': (msg.indexOf('err') >= 0) ? GetErrorCode(msg) : msg,
        'buttons': {
            '確定': {
                'class': 'blue',
                'action': function () {
                    location.href = url;
                }
            }
        }
    });
}
// Login use
function AlertGetLogin(msg, url) {
    $.confirm({
        'title': dialogTitle,
        'message': (msg.indexOf('err') >= 0) ? GetErrorCode(msg) : msg,
        'buttons': {
            '確定': {
                'class': 'blue',
                'action': function () {
                    opener.location.href = url;
                    window.close();
                }
            }
        }
    });
}
function AlertPost(msg, content) {
    $.confirm({
        'title': dialogTitle,
        'message': (msg.indexOf('err') >= 0) ? GetErrorCode(msg) : msg,
        'buttons': {
            '確定': {
                'class': 'blue',
                'action': function () {
                    var form = $(content);
                    $('body').append(form);
                    form.submit();
                }
            }
        }
    });
}
//顯示訊息並關閉
function AlertClose(msg) {
    msg = (msg.indexOf('err') >= 0) ? GetErrorCode(msg) : msg;
    $.confirm({
        'title': dialogTitle,
        'message': msg,
        'buttons': {
            '確定': {
                'class': 'blue',
                'action': function () {
                    window.close();
                }
            }
        }
    });
}

function Confirm(msg, url) {
    $.confirm({
        'title': dialogTitle,
        'message': (msg.indexOf('err') >= 0) ? GetErrorCode(msg) : msg,
        'buttons': {
            '確定': {
                'class': 'blue',
                'action': function () { window.location = url; }
            },
            '取消': {
                'class': 'gray',
                'action': function () { }
            }
        }
    });
}

function Setdialogwidth() {
    if ($('.dm-confirmContent').height() == 300)
        $('.dm-confirmBox').width($('.dm-confirmBox').width() + 20);
}

// msgbox
(function ($) {
    $.Message = function (msg, isAutoOut, seconds) {
        // msg 訊息內容；isAutoOut 是否設定時間消失；seconds 消失的時間(毫秒)
        if ($('.dm-msgbox').length > 0)
            return false;
        isAutoOut = (isAutoOut === undefined) ? false : true;
        seconds = (seconds === undefined) ? 2000 : seconds;
        var $msgbox = $(["<div class='dm-dialogOverlay'><div class='dm-msgbox'>", msg, "</div></div>"].join(''));
        $msgbox.hide().appendTo('body').fadeIn();

        $('.dm-msgbox').css({ 'position': 'fixed', 'left': (($(window).outerWidth() - $('.dm-msgbox').outerWidth()) / 2 + 'px'), 'top': '40%' });

        SetScreenFreeze();
        if (isAutoOut) {
            setTimeout(function () {
                closeMessage();
            }, seconds);
        }

        $('body').on('click', '.dm-msgbox', function () {
            closeMessage();
        });

        $('body').on('click', '.dm-dialogOverlay', function () {
            closeMessage();
        });
    }

    $.Message.hide = function () {
        closeMessage();
    }
})(jQuery);
// dialog
(function ($) {
    $.dialog1 = function (params) {
        if ($('.dm-dialog').length)
            return false;
        if ($(window).width() <= 400) {
            $.iOS(params);
            return false;
        }

        var thisTitle = (params.title === undefined || params.title.trim().length == 0) ? dialogTitle : params.title;

        var buttonHTML = '';
        $.each(params.buttons, function (name, obj) {
            buttonHTML += '<a href="javascript:void(0)" class="button ' + obj['class'] + '">' + name + '</a>';
            if (!obj.action)
                obj.action = function () { };
        });
        var markup = [
            "<div class='dm-dialogOverlay'><div class='dm-dialogBox' style='", GetDialogStyle((params.width == undefined) ? 320 : params.width), "'><h1>", thisTitle, "</h1>",
            "<div class='dm-dialogContent'>", params.message, "</div>",
            "<div class='dm-dialogButtons'>", buttonHTML, "</div></div></div>"
        ].join('');
        $(markup).hide().appendTo('body').fadeIn();

        if ($(window).outerWidth() <= 400) {
            var height = $('.dm-dialogBox').height() - $('.dm-dialogBox h1').outerHeight() - $('.dm-dialogButtons').outerHeight();
            $('.dm-dialogContent').css({ 'height': height + 'px', 'max-height': height + 'px' });
        }

        var buttons = $('.dm-dialogButtons a');
        if (buttons.length == 3)
            buttons.css({ 'max-width': '33%' });
        var i = 0;

        $.each(params.buttons, function (name, obj) {
            if (params.notClose === undefined) {
                buttons.eq(i++).click(function () {
                    if (!$(this).hasClass('dm-btnCancel')) {
                        $('.dm-dialogBox').remove();
                        $('.dm-progressBar').show();
                        obj.action();
                        $('.dm-progressBar').hide();
                    }
                    closeDialog();
                    return false;
                });
            } else {
                buttons.eq(i++).click(function () {
                    if (!$(this).hasClass('dm-btnCancel')) {
                        $('.dm-dialogBox').remove();
                        $('.dm-progressBar').show();
                        obj.action();
                        $('.dm-progressBar').hide();
                    }
                    return false;
                });
            }
        });
        SetScreenFreeze();
        $('.dm-dialogButtons a:last-child').setfocus();
    }

    $.dialog1.hide = function () {
        closeDialog();
    }
})(jQuery);
// confirm
(function ($) {
    $.confirm = function (params) {
        if ($('.dm-confirmBox').length)
            return false;

        if ($(window).width() <= 400) {
            $.iOS(params);
            return false;
        }
        var thisTitle = (params.title === undefined || params.title.trim().length == 0) ? dialogTitle : params.title;

        var buttonHTML = '';
        $.each(params.buttons, function (name, obj) {
            buttonHTML += '<a href="javascript:void(0)" class="' + obj['class'] + '">' + name + '<span></span></a>';
            if (!obj.action)
                obj.action = function () { };
        });

        var markup = [
            "<div class='dm-confirmOverlay'><div class='dm-confirmBox' style='", GetDialogStyle(400), "'><h1>", thisTitle, "</h1>",
            "<div class='dm-confirmContent'>", params.message, "</div>",
            "<div class='dm-confirmButtons'>", buttonHTML, "</div></div></div>"
        ].join('');
        $(markup).draggable();
        $(markup).hide().appendTo('body').fadeIn();


        if ($(window).outerWidth() <= 400) {
            var height = $('.dm-confirmBox').height() - $('.dm-confirmBox h1').outerHeight() - $('.dm-confirmButtons').outerHeight();
            $('.dm-confirmContent').css({ 'height': height + 'px', 'max-height': height + 'px' });
        }

        var buttons = $('.dm-confirmButtons a');
        if (buttons.length == 3)
            buttons.css({ 'max-width': '33%' });
        var i = 0;

        $.each(params.buttons, function (name, obj) {
            if (params.notClose === undefined) {
                buttons.eq(i++).click(function () {
                    obj.action();
                    closeConfirm();
                    return false;
                });
            } else {
                buttons.eq(i++).click(function () {
                    obj.action();
                    return false;
                });
            }
        });
        SetScreenFreeze();
        $('.dm-confirmButtons a:last-child').setfocus();
    }

    $.confirm.hide = function () {
        closeConfirm();
    }
})(jQuery);
// iOS
(function ($) {
    $.iOS = function (params) {
        if ($('.dm-iosBox').length)
            return false;

        var thisTitle = (params.title === undefined || params.title.trim().length == 0) ? dialogTitle : params.title;

        var buttonHTML = '';
        $.each(params.buttons, function (name, obj) {
            buttonHTML += '<a href="javascript:void(0)">' + name + '</a>';
            if (!obj.action)
                obj.action = function () { };
        });

        var markup = [
            "<div class='dm-dialogOverlay'><div class='dm-iosBox'><h1>", thisTitle, "</h1>",
            "<div class='dm-iosContent'>", params.message, "</div>",
            "<div class='dm-iosButtons'>", buttonHTML, "</div></div></div>"
        ].join('');
        $(markup).draggable();
        $(markup).hide().appendTo('body').fadeIn();
        $('.dm-iosBox').css({ 'left': ((winWidth = $(window).outerWidth() - 300) / 2) + 'px' });

        var buttons = $('.dm-iosButtons a');
        if (buttons.length == 1)
            $('.dm-iosButtons a').css({ 'width': '100%' });
        if (buttons.length == 3)
            buttons.css({ 'max-width': '33%' });

        var i = 0;
        $.each(params.buttons, function (name, obj) {
            buttons.eq(i++).click(function () {
                obj.action();
                closeIOsDialog();
                return false;
            });
        });
        SetScreenFreeze();
        $('.dm-iosBox a:last-child').setfocus();
    }

    $.iOS.hide = function () {
        closeIOsDialog();
    }
})(jQuery);
// popForm
(function ($) {
    $.popform = function (params) {
        if ($('.dm-popformOverlay').length)
            return false;

        var thisTitle = (params.title === undefined || params.title.trim().length == 0) ? dialogTitle : params.title;
        var markup = [
            "<div class='dm-popformOverlay'><div class='dm-dialogBox' style='", GetDialogStyle(400), "'><h1>", thisTitle, "</h1>",
            "<div class='dm-dialogContent'>", params.message, "</div>"
        ].join('');
        $(markup).draggable();
        $(markup).hide().appendTo('body').fadeIn();

        if ($(window).outerWidth() <= 400) {
            var height = $('.dm-dialogBox').height() - $('.dm-dialogBox h1').outerHeight();
            $('.dm-dialogContent').css({ 'height': height + 'px', 'max-height': height + 'px' });
        }
        SetScreenFreeze();
    }

    $.popform.hide = function () {
        closePopform();
    }
})(jQuery);

//關閉 Message
function closeIOsDialog() {
    $('.dm-dialogOverlay').fadeOut(function () {
        $(this).remove();
    });
    SetScreenDefreeze();
}
//關閉 Message
function closeMessage() {
    $('.dm-dialogOverlay').fadeOut(function () {
        $(this).remove();
    });
    if (($('.dm-dialogBox').length + $('.dm-confirmBox').length + $('.dm-iosBox').length + $('.dm-popSlickOverlay:visible').length) == 0) {
        SetScreenDefreeze();
    }
}
//關閉 Dialog
function closeDialog() {
    $('.dm-dialogOverlay').fadeOut(function () {
        $(this).remove();
    });
    SetScreenDefreeze();
}
//關閉 confirm
function closeConfirm() {
    $('.dm-confirmOverlay').fadeOut(function () {
        $(this).remove();
    });
    SetScreenDefreeze();
}
//關閉 Popform
function closePopform() {
    $('.dm-popformOverlay').fadeOut(function () {
        $(this).remove();
    });
    SetScreenDefreeze();
}

//設定 Dialog 的大小、位置
function GetDialogStyle(objWidth) {
    var styleArray = ["position: fixed;"];
    var winWidth = $(window).outerWidth();
    if (winWidth <= 400) {
        styleArray.push(["width:", winWidth, "px !important;"].join(''));
        styleArray.push(["height:", $(window).height(), "px !important;"].join(''));
        styleArray.push(["left:0px;"]);
        styleArray.push(["top:0px;"]);
    } else {
        styleArray.push([(objWidth == undefined) ? "min-width:400px;" : ("width:" + objWidth + "px;")]);
        styleArray.push(["left:" + ((objWidth == undefined) ? "50%;" : ((winWidth - objWidth) / 2 + "px;"))]);
        styleArray.push(["top:20%;"]);
    }
    return styleArray.join('');
}