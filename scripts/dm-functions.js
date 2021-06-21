/**
 * 設定PrettyPhoto顯示
 */
function PrettyPhoto($container) {
    if ($container === undefined) {
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false, theme: 'facebook'
        });//{ theme: "facebook", social_tools: false, allow_resize: true } pp_default
    } else {
        $container.find("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false, theme: 'pp_default'
        });//{ theme: "facebook", social_tools: false, allow_resize: true }
    }
}

/**
 * 設定 CheckBoxList 可 Check 數量上限
 */
$.fn.CheckedCountLimit = function (n) {
    var self = this;
    this.click(function () {
        checkCountLimit();
    });
    checkCountLimit();
    function checkCountLimit() {
        (self.filter(":checked").length == n) ?
          self.not(":checked").prop("disabled", true) :
          self.not(":checked").prop("disabled", false);
    }
}
/**
 * 限制輸入格式(數值 + /)
 * @param {any} $obj
 * @param {any} regExpress
 */
function RestrictInputFormat($obj, regExpress) {
    var chkSum = $obj.val().replace(regExpress, '');
    $obj.val((chkSum == 0) ? '' : chkSum);
}
/**
 * 設定 TextBox 內容只能輸入數字 (透過 dm-txtnum 綁定輸入事件, maxLength:字數限制)
 * @param {any} maxLength
 */
function Txtnumonly(maxLength) {
    $(".dm-txtnum").bind("keypress", function (e) {
        var ecode = e.charCode || e.keyCode;
        var oElement = e.target || e.srcElement;
        if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
            if ((ecode > 47 && ecode < 58) ||
                ecode == 27 || ecode == 13) {
                oElement.value = oElement.value;
            } else {
                if (window.event) //IE
                    event.returnValue = false;
                else //Firefox
                    e.preventDefault();
            }
        }
    }).bind("keyup", function (e) {
        if ($(this).val().length > maxLength)
            $(this).val($(this).val().substr(0, maxLength));
    }).bind("beforepaste", function (e) {
        clipboardData.setData('text', clipboardData.getData('text').replace(/[^\d]/g, ''));
    }).prop("type", "number");
}
/**
 * 設定 Text 的輸入字數、剩餘字數
 * @param {any} txtCounter
 */
function SetWordCounter(txtCounter) {
    var curLen = txtCounter.$Text.val().length;
    var maxLen = txtCounter.$Text.prop('maxLength');
    if (maxLen <= 0)
        maxLen = txtCounter.DefaultLength;
    if (curLen > maxLen) {
        txtCounter.$Text.val(txtCounter.$Text.substr(0, maxLen));
        curLen = maxLen;
        Alert("輸入字數已超過上限<br>超出部分將自動刪除");
    }
    txtCounter.$Count.text(curLen);
    txtCounter.$Remainder.text(maxLen - curLen);
}
/**
 * 設定 物件 Focus()
 */
(function ($) {
    $.fn.setfocus = function () {
        return this.each(function () {
            var dom = this;
            setTimeout(function () {
                try { dom.focus(); } catch (e) { }
            }, 0);
        });
    };
})(jQuery);
/**
 * 輸入字數 TextArea
 */
(function ($) {
    $.fn.textareaCounter = function (options) {
        // setting the defaults $("textarea").textareaCounter({ limit: 100 });
        var defaults = {
            limit: 100
        };
        var options = $.extend(defaults, options);
        // and the plugin begins
        return this.each(function () {
            var obj, text, wordcount, limited;
            obj = $(this);
            obj.after('<span style="font-size: 11px; clear: both; margin-top: 3px; display: block;" id="counter-text">Max. ' + options.limit + ' words</span>');
            obj.keyup(function () {
                text = obj.val();
                if (text === "") {
                    wordcount = 0;
                } else {
                    wordcount = $.trim(text).split(" ").length;
                }
                if (wordcount > options.limit) {
                    $("#counter-text").html('<span style="color: #DD0000;">0 words left</span>');
                    limited = $.trim(text).split(" ", options.limit);
                    limited = limited.join(" ");
                    $(this).val(limited);
                } else {
                    $("#counter-text").html((options.limit - wordcount) + ' words left');
                }
            });
        });
    };
})(jQuery);

function isTouch() {
    return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
}

/**
 * 判定是否為 Mobile 裝置
 */
function isMobile() {
    var test1 = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)));
    var test2 = (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/) == null) ? false : true;
    return (test1 && test2);
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
var IsIEBrowser = function () {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
}();
/**
 * 偵測 IE瀏覽器，如為真則回傳版本；否則回傳 false
 */
function GetIEVersion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    // IE 10 or older => return version number
    if (msie > 0)
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    // IE 11 => return version number
    if (ua.indexOf('Trident/') > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    // Edge (IE 12+) => return version number
    var edge = ua.indexOf('Edge/');
    if (edge > 0)
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    // other browser
    return false;
}
/**
 * 檢查上傳圖片格式，有問題回傳0
 * @param {any} s
 */
function CheckAcceptedImgFormat(s) {
    if (!(/\.(gif|jpg|jpeg|bmp|png)$/i).test(s)) {
        Alert('您只能選取JPG, JPEG, GIF, PNG, 以及 BMP 檔案格式');
        return 0;
    } else
        return 1;
}
/**
 * 檢查text內容，有問題回傳字串/無問題回傳""
 * @param {any} s
 */
function CheckTextContent(s) {
    return (s.match(/script/gi)) ? '本網站不支援script的寫入' : "";
}
/**
 * 檢查手機號碼
 * @param {any} s
 */
function CheckCellPhoneNumber(s) {
    return (s.match(/((?=(09))[0-9]{10})$/g)) ? '' : '手機號碼有誤';
}

/**
 * 檢查text內容是否為數字，有問題回傳字串/無問題回傳""
 * @param {any} s
 * @param {any} c
 */
function CheckNumTextContent(s, c) {
    if (s.length == 0)
        return '1';
    var t = parseFloat(s);
    if (isNaN(t)) {
        return '請輸入0-9的數值';
    } else if (t == 0) {
        return '請輸入總計不為0的數值';
    } else if (c != 0) {
        if (t > c)
            return '數值已超過上限';
    }
    return "";
}
/**
 * 非email回傳1
 * @param {any} s
 */
function CheckEmailFormat(s) {
    return (s.search(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/) == -1) ? 1 : 0;
}
/**
 * 台灣身分證檢查
 * @param {any} id
 */
function IsMeetTwID(id) {
    id = id.toUpperCase();
    // 使用「正規表達式」檢驗格式
    if (id.search(/^[A-Z]{1}(1|2){1}\d{8}$/) == -1) { //  /^[A-Z](1|2)\d{8}$/i
        return false;
    } else {
        //建立字母分數陣列(A~Z)
        var city = new Array(
        1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11,
        20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30);
        //將字串分割為陣列(IE必需這麼做才不會出錯)
        id = id.split('');
        //計算總分
        var total = city[id[0].charCodeAt(0) - 65];
        for (var i = 1; i <= 8; i++) {
            total += eval(id[i]) * (9 - i);
        }
        //補上檢查碼(最後一碼)
        total += eval(id[9]);
        //檢查比對碼(餘數應為0);
        return ((total % 10 == 0));
    }
}
/**
 * 台灣公司統編檢查
 * @param {any} id
 */
function IsMeetBusinessNo(id) {
    var invalidList = "00000000,11111111";
    if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1)
        return false;
    // 使用「正規表達式」檢驗格式
    if (id.search(/\d{8}/) == -1) {
        return false;
    } else {
        var cx = [1, 2, 1, 2, 1, 2, 4, 1];
        //將字串分割為陣列(IE必需這麼做才不會出錯)
        var cnum = id.split('');
        //計算總分
        var total = 0;
        for (var i = 0; i <= 7; i++) {
            var n = parseInt(cnum[i]) * cx[i];
            total += (n < 10) ? n : (Math.floor(n / 10) + (n % 10));
        }
        return ((total % 10 == 0) || (cnum[6] == 7 && (total + 1) % 10 == 0)) ? true : false;
    }
}
/**
 * 檢查日期格式(正確回傳true)
 * @param {any} date
 */
function IsValidDate(date) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(regEx))
        return false;  // Invalid format
    var d;
    if (!((d = new Date(date)) | 0))
        return false; // Invalid date (or this could be epoch)
    return d.toISOString().slice(0, 10) == date;
}
//===========Return Event===========
/**
 * 回傳浮點數
 * @param {any} value
 * @param {any} digit
 */
function ReturnFloat(value, digit) {
    var v = parseFloat(value);
    digit = (typeof digit == 'undefined') ? 3 : digit;
    return (isNaN(v) || v < 0) ? '' : (Math.round(v * Math.pow(10, digit)) / Math.pow(10, digit));
}
/**
 * 平方公尺與坪數互換
 * @param {any} $objAeeay
 * @param {any} unit
 * @param {any} digit
 */
function ReturnTransformedSize($objAeeay, unit, digit) {
    var weight = (unit == '坪') ? 0.3025 : 3.30579;
    digit = (typeof digit == 'undefined') ? 3 : digit;
    $objAeeay.each(function () {
        if ($(this).val().trim().length > 0)
            $(this).val(ReturnFloat(+$(this).val() * weight, digit));
    });
}
/**
 * 取得 Url Query String
 * @param {any} name
 * @param {any} url
 */
function GetParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/**
 * 取得 Url Query String
 * @param {any} sParam
 */
var GetUrlParameter = function GetUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
/**
 * 使用 dm-listtable 格式時全選
 */
function SetCheckAll() {
    $('.jchkAll').click(function () {
        $(this).parents().find('.dm-listtable').children('.dm-listtbody').find('[type=checkbox]').prop("checked", (this.checked) ? true : false);
    });
}
/**
 * Ajax
 * @param {any} AjaxObj
 */
function Ajax(AjaxObj) {
    var res = '';
    $.ajax({
        url: "/handler/" + AjaxObj.Url,
        type: "post",
        async: false,
        data: ['r=', AjaxObj.RequestAct, '&t=', AjaxObj.RequestType, '&c=', AjaxObj.Code].join(''),
        success: function (msg) {
            res = msg;
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        error: function (xhr, ajaxOptions, thrownError) {
            Alert(xhr.status);
            Alert(thrownError);
        }
    });
    return res;
}