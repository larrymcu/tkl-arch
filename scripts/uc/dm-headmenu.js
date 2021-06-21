//選單
var headmenu = (function () {
    var that = {};
    that.init = function () {
        $('#sidebar-menu a').click(function (e) {

            if ($(this).prop('href').toLowerCase().indexOf("index.aspx") >= 0) {
                window.location.href = "/index.aspx?" + "Lan=" + GetUrlParameter('Lan') + "&s=" + $(this).data('value');
                return false;
            }

            if ($(this).find('i.floatR').length == 0) {
                return true;
            }
            var $icon = $(this).find('i.fa-caret-right');
            if ($icon.length == 1) {
                $('#sidebar-menu > ul > li > a').removeClass('active');
                $('#sidebar-menu .dm-submenu').slideUp();
                $('#sidebar-menu i.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');
                $icon.removeClass('fa-caret-right').addClass('fa-caret-down');
                $(this).next('.dm-submenu').slideDown();
                $(this).addClass('active');
            } else {
                $(this).next('.dm-submenu').slideUp();
                $(this).find('i.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');
                $(this).removeClass('active');
            }
        });

        var typecode = GetParameterByName('TypeCode');
        if (typecode != null) {
            var chkSum = false;
            $('#sidebar-menu > ul > li > a').each(function (e) {
                if ($(this).prop('href') == "javascript:void(0)") {
                    var $parentA = $(this);
                    $(this).next('.dm-submenu').find('li > a').each(function (e) {
                        if ($(this).prop('href').indexOf(typecode) >= 0) {
                            $parentA.trigger('click');
                            $(this).addClass('active');
                            chkSum = true;
                            return false;
                        }
                    });
                } else {
                    if ($(this).prop('href').indexOf(typecode) >= 0) {
                        $(this).addClass('active');
                        chkSum = true;
                    }
                }
                if (chkSum)
                    return false;
            });
        }

        var windowHeight = $(document).height();
        $(".leftbar-body").css({ 'height': windowHeight + 'px' });
        $(".slimscrollleft").css({ 'height': windowHeight + 'px' });

        $(".slimscrollleft").slimScroll({
            height: $(window).height() + "px",
            size: "10px",
            color: "#9ea5ab",
        });
        $('.navbar-toggle, .leftbarToggle').on('click', function (e) {
            $('.dm-rightBar').toggleClass('close');
            $(this).toggleClass('active');
        });
    }
    return that;
})();