// -*- ecoding=utf-8 -*-

/**
* @namespace dialogs
* @memberof x.ui
* @description 页面对话框
*/
x.ui.dialogs = {

    // 默认选项
    defaults: {
        id: '',
        title: '标题',
        content: "text:内容",
        width: "300",
        height: "200",
        titleClass: "boxTitle",
        closeID: "",
        triggerID: "",
        boxBdColor: "#E9F3FD",
        boxBdOpacity: "1",
        boxWrapBdColor: "#A6C9E1",
        windowBgColor: "#000000",
        windowBgOpacity: "0.5",
        time: "",
        drag: "",
        dragBoxOpacity: "1",
        showTitle: true,
        showBoxbg: true,
        showbg: false,
        offsets: "",
        button: "",
        callback: function() { },
        fns: function() { }
    },

    // 列表
    list: [],

    /**
    * 对话框
    * @description 对话框
    * @class Dialog
    * @constructor newDialog
    * @memberof x.ui.dialogs
    * @param {object} options 选项
    */
    newDialog: function(options)
    {
        // options = x.ext({}, x.ui.dialogs.defaults, options || {});
        options = x.ext({}, x.ui.dialogs.defaults, options || {});

        var dialog = {
            id: null,
            container: null,

            getID: function()
            {
                return thisID = BOXID.boxID;
            },

            //构造弹出层
            show: function()
            {
                var $titleHeight = options.showTitle != true ? 1 : 33,
				$borderHeight = options.showTitle != true ? 0 : 10;
                $boxDialogHeight = options.button != "" ? 45 : 0;
                $boxDialogBorder = $boxDialogHeight == "0" ? "0" : "1";
                var $width = parseInt(options.width) > 1000 ? 1000 : parseInt(options.width),
				$height = parseInt(options.height) > 550 ? 550 : parseInt(options.height);
                var $boxDom = "<div id=\"" + options.id + "\" class=\"x-ui-dialogs\">";
                $boxDom += "<div class=\"boxWrap\">";
                $boxDom += "<div class=\"boxTitle\"><h3></h3><span class=\"closeBox\">关闭</span></div>";
                $boxDom += "<div class=\"boxContent\"></div>";
                $boxDom += "<div class=\"boxDialog\"></div>";
                $boxDom += "</div>";
                $boxDom += "<div class=\"boxBd\"></div>";
                $boxDom += "<iframe src=\"about:blank\" style=\"position:absolute;left:0;top:0;filter:alpha(opacity=0);opacity:0;scrolling=no;z-index:10714\"></iframe>";
                $boxDom += "</div>";
                $($boxDom).appendTo("body");
                var $box = $("#" + options.id);
                $box.css({
                    position: "relative",
                    width: $width + 12 + "px",
                    height: $height + $titleHeight + $borderHeight + $boxDialogHeight + 1 + "px",
                    zIndex: "891208"
                });
                var $iframe = $("iframe", $box);
                $iframe.css({
                    width: $width + 12 + "px",
                    height: $height + $titleHeight + $borderHeight + $boxDialogHeight + 1 + "px"
                });
                var $boxWrap = $(".boxWrap", $box);
                $boxWrap.css({
                    position: "relative",
                    top: "5px",
                    margin: "0 auto",
                    width: $width + 2 + "px",
                    height: $height + $titleHeight + $boxDialogHeight + 1 + "px",
                    overflow: "hidden",
                    zIndex: "20590"
                });
                var $boxContent = $(".boxContent", $box);
                $boxContent.css({
                    position: "relative",
                    width: $width + "px",
                    height: $height + "px",
                    padding: "0",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: options.boxWrapBdColor,
                    overflow: "auto",
                    backgroundColor: "#fff"
                });
                var $boxDialog = $(".boxDialog", $box);
                $boxDialog.css({
                    width: $width + "px",
                    height: $boxDialogHeight + "px",
                    borderWidth: $boxDialogBorder + "px",
                    borderStyle: "solid",
                    borderColor: options.boxWrapBdColor,
                    borderTop: "none",
                    textAlign: "right"
                });
                var $boxBg = $(".boxBd", $box);
                $boxBg.css({
                    position: "absolute",
                    width: $width + 12 + "px",
                    height: $height + $titleHeight + $borderHeight + $boxDialogHeight + 1 + "px",
                    left: "0",
                    top: "0",
                    opacity: options.boxBdOpacity,
                    background: options.boxBdColor,
                    zIndex: "10715"
                });
                var $title = $(".boxTitle>h3", $box);
                $title.html(options.title);
                $title.parent().css({
                    position: "relative",
                    width: $width + "px",
                    borderColor: options.boxWrapBdColor
                });
                if (options.titleClass != "")
                {
                    $title.parent().addClass(options.titleClass);
                    $title.parent().find("span").hover(function()
                    {
                        $(this).addClass("hover");
                    }, function()
                    {
                        $(this).removeClass("hover");
                    });
                };
                if (options.showTitle != true) { $(".boxTitle", $box).remove(); }
                if (options.showBoxbg != true)
                {
                    $(".boxBd", $box).remove();
                    $box.css({
                        width: $width + 2 + "px",
                        height: $height + $titleHeight + $boxDialogHeight + 1 + "px"
                    });
                    $boxWrap.css({ left: "0", top: "0" });
                };
                // 定位弹出层
                var TOP = -1;
                this.getDomPosition();
                var $location = options.offsets;
                var $wrap = $("<div id=\"" + options.id + "parent\"></div>");
                var est = x.browser.ie6 ? (options.triggerID != "" ? 0 : document.documentElement.scrollTop) : "";
                if (options.offsets == "" || options.offsets.constructor == String)
                {
                    switch ($location)
                    {
                        case ("left-top"): //左上角
                            $location = { left: "0px", top: "0px" + est };
                            TOP = 0;
                            break;
                        case ("left-bottom"): //左下角
                            $location = { left: "0px", bottom: "0px" };
                            break;
                        case ("right-top"): //右上角
                            $location = { right: "0px", top: "0px" + est };
                            TOP = 0;
                            break;
                        case ("right-bottom"): //右下角
                            $location = { right: "0px", bottom: "0px" };
                            break;
                        case ("middle-top"): //居中置顶
                            $location = { left: "50%", marginLeft: -parseInt($box.width() / 2) + "px", top: "0px" + est };
                            TOP = 0;
                            break;
                        case ("middle-bottom"): //居中置低
                            $location = { left: "50%", marginLeft: -parseInt($box.width() / 2) + "px", bottom: "0px" };
                            break;
                        case ("left-middle"): //左边居中
                            $location = { left: "0px", top: "50%" + est, marginTop: -parseInt($box.height() / 2) + "px" + est };
                            TOP = $getPageSize[1] / 2 - $box.height() / 2;
                            break;
                        case ("right-middle"): //右边居中
                            $location = { right: "0px", top: "50%" + est, marginTop: -parseInt($box.height() / 2) + "px" + est };
                            TOP = $getPageSize[1] / 2 - $box.height() / 2;
                            break;
                        default: //默认为居中
                            $location = { left: "50%", marginLeft: -parseInt($box.width() / 2) + "px", top: "50%" + est, marginTop: -parseInt($box.height() / 2) + "px" + est };
                            TOP = $getPageSize[1] / 2 - $box.height() / 2;
                            break;
                    };
                }
                else
                {
                    var str = $location.top;
                    $location.top = $location.top + est;
                    if (typeof (str) != 'undefined')
                    {
                        str = str.replace("px", "");
                        TOP = str;
                    };
                };

                if (options.triggerID != "")
                {
                    var $offset = $("#" + options.triggerID).offset();
                    var triggerID_W = $("#" + options.triggerID).outerWidth(), triggerID_H = $("#" + options.triggerID).outerHeight();
                    var triggerID_Left = $offset.left, triggerID_Top = $offset.top;
                    var vL = $location.left, vT = $location.top;
                    if (typeof (vL) != 'undefined' || typeof (vT) != 'undefined')
                    {
                        vL = parseInt(vL.replace("px", ""));
                        vT = parseInt(vT.replace("px", ""));
                    };
                    var left = vL >= 0 ? parseInt(vL) + triggerID_Left : parseInt(vL) + triggerID_Left - $getPageSize[2];
                    var top = vT >= 0 ? parseInt(vT) + triggerID_Top : parseInt(vT) + triggerID_Top - $getPageSize[3];
                    $location = { left: left + "px", top: top + "px" };
                };
                if (x.browser.ie6)
                {
                    if (options.triggerID == "")
                    {
                        if (TOP >= 0)
                        {
                            this.addStyle(".ui_fixed_" + options.id + "{width:100%;height:100%;position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:expression(documentElement.scrollTop+" + TOP + ")}");
                            $wrap = $("<div class=\"" + options.id + "IE6FIXED\" id=\"" + options.id + "parent\"></div>");
                            $box.appendTo($wrap);
                            $("body").append($wrap);
                            $("." + options.id + "IE6FIXED").css($location).css({
                                position: "absolute",
                                width: $width + 12 + "px",
                                height: $height + $titleHeight + $borderHeight + $boxDialogHeight + 1 + "px",
                                zIndex: "891208"
                            }).addClass("ui_fixed_" + options.id);
                        } else
                        {
                            this.addStyle(".ui_fixed2_" + options.id + "{width:100%;height:100%;position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight)}");
                            $wrap = $("<div class=\"" + options.id + "IE6FIXED\"  id=\"" + options.id + "parent\"></div>");
                            $box.appendTo($wrap);
                            $("body").append($wrap);
                            $("." + options.id + "IE6FIXED").css($location).css({
                                position: "absolute",
                                width: $width + 12 + "px",
                                height: $height + $titleHeight + $borderHeight + $boxDialogHeight + 1 + "px",
                                zIndex: "891208"
                            }).addClass("ui_fixed2_" + options.id);
                        };
                        $("body").css("background-attachment", "fixed").css("background-image", "url(n1othing.txt)");
                    }
                    else
                    {
                        $wrap.css({
                            position: "absolute",
                            left: left + "px",
                            top: top + "px",
                            width: $width + 12 + "px",
                            height: $height + $titleHeight + $borderHeight + $boxDialogHeight + 1 + "px",
                            zIndex: "891208"
                        });
                    };
                }
                else
                {
                    $wrap.css($location).css({
                        position: "fixed",
                        width: $width + 12 + "px",
                        height: $height + $titleHeight + $borderHeight + $boxDialogHeight + 1 + "px",
                        zIndex: "891208"
                    });
                    if (options.triggerID != "") { $wrap.css({ position: "absolute" }) };
                    $("body").append($wrap);
                    $box.appendTo($wrap);
                };
            },
            // 装载弹出层内容
            setContent: function()
            {
                var $box = $("#" + options.id);
                var $width = parseInt(options.width) > 1000 ? 1000 : parseInt(options.width),
				$height = parseInt(options.height) > 550 ? 550 : parseInt(options.height);
                var $contentID = $(".boxContent", $box);
                $contentType = options.content.substring(0, options.content.indexOf(":"));
                $content = options.content.substring(options.content.indexOf(":") + 1, options.content.length);
                $.ajaxSetup({ global: false });
                switch ($contentType)
                {
                    case "text":
                        $contentID.html($content);
                        break;
                    case "id":
                        $("#" + $content).children().appendTo($contentID);
                        break;
                    case "img":
                        $.ajax({
                            beforeSend: function()
                            {
                                $contentID.html("<p class='boxLoading'>loading...</p>");
                            },
                            error: function()
                            {
                                $contentID.html("<p class='boxError'>加载数据出错...</p>");
                            },
                            success: function(html)
                            {
                                $contentID.html("<img src=" + $content + " alt='' />");
                            }
                        });
                        break;
                    case "swf":
                        $.ajax({
                            beforeSend: function()
                            {
                                $contentID.html("<p class='boxLoading'>loading...</p>");
                            },
                            error: function()
                            {
                                $contentID.html("<p class='boxError'>加载数据出错...</p>");
                            },
                            success: function(html)
                            {
                                $contentID.html("<div id='" + options.id + "swf'><h1>Alternative content</h1><p><a href=\"http://www.adobe.com/go/getflashplayer\"><img src=\"http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif\" alt=\"Get Adobe Flash player\" /></a></p></div><script type=\"text/javascript\" src=\"swfobject.js\" ></script><script type=\"text/javascript\">swfobject.embedSWF('" + $content + "', '" + options.id + "swf', '" + $width + "', '" + $height + "', '9.0.0', 'expressInstall.swf');</script>");
                                $("#" + options.id + "swf").css({
                                    position: "absolute",
                                    left: "0",
                                    top: "0",
                                    textAlign: "center"
                                });
                            }
                        });
                        break;
                    case "url":
                        var contentDate = $content.split("?");
                        $.ajax({
                            beforeSend: function()
                            {
                                $contentID.html("<p class='boxLoading'>loading...</p>");
                            },
                            type: contentDate[0],
                            url: contentDate[1],
                            data: contentDate[2],
                            error: function()
                            {
                                $contentID.html("<p class='boxError'><em></em><span>加载数据出错...</span></p>");
                            },
                            success: function(html)
                            {
                                $contentID.html(html);
                            }
                        });
                        break;
                    case "iframe":
                        $contentID.css({ overflowY: "hidden" });
                        $.ajax({
                            beforeSend: function()
                            {
                                $contentID.html("<p class='boxLoading'>loading...</p>");
                            },
                            error: function()
                            {
                                $contentID.html("<p class='boxError'>加载数据出错...</p>");
                            },
                            success: function(html)
                            {
                                $contentID.html("<iframe src=\"" + $content + "\" width=\"100%\" height=\"" + parseInt(options.height) + "px\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
                            }
                        });
                };
            },
            //对话模式
            ask: function()
            {
                var $box = $("#" + options.id);
                $boxDialog = $(".boxDialog", $box);
                if (options.button != "")
                {
                    var map = {}, answerStrings = [];

                    if (options.button instanceof Array)
                    {
                        for (var i = 0; i < options.button.length; i++)
                        {
                            map[options.button[i]] = options.button[i];
                            answerStrings.push(options.button[i]);
                        };
                    }
                    else
                    {
                        for (var k in options.button)
                        {
                            map[options.button[k]] = k;
                            answerStrings.push(options.button[k]);
                        };
                    };

                    $boxDialog.html($.map(answerStrings, function(v)
                    {
                        return "<input class='dialogBtn' type='button'  value='" + v + "' />";
                    }).join(' '));

                    $(".dialogBtn", $boxDialog).hover(function()
                    {
                        $(this).addClass("hover");
                    }, function()
                    {
                        $(this).removeClass("hover");
                    }).click(function()
                    {
                        var $this = this;
                        if (options.callback != "" && $.isFunction(options.callback))
                        {
                            //设置回调函数返回值很简单，就是回调函数名后加括号括住的返回值就可以了。
                            options.callback(map[$this.value]);
                        };
                        this.remove();
                    });
                };
            },
            // 获取要吸附的ID的left和top值并重新计算弹出层left和top值
            getDomPosition: function()
            {
                var $box = $("#" + options.id);
                var cw = document.documentElement.clientWidth, ch = document.documentElement.clientHeight;
                var sw = $box.outerWidth(), sh = $box.outerHeight();
                var $soffset = $box.offset(), sl = $soffset.left, st = $soffset.top;
                $getPageSize = new Array();
                $getPageSize.push(cw, ch, sw, sh, sl, st);
            },
            //设置窗口的zIndex
            setZIndex: function()
            {
                x.ui.dialogs.list.push(document.getElementById(options.id + "parent")); //存储窗口到数组

                // var event = "mousedown" || "click";
                var target = x.query('#' + this.id + 'parent');

                x.event.add(target, 'click', function()
                {
                    for (var i = 0; i < x.ui.dialogs.list.length; i++)
                    {
                        x.ui.dialogs.list[i].style.zIndex = 870618;
                    };

                    target.style.zIndex = 891208;
                });
            },

            //写入CSS样式
            addStyle: function(s)
            {
                var T = this.style;
                if (!T)
                {
                    T = this.style = document.createElement('style');
                    T.setAttribute('type', 'text/css');
                    document.getElementsByTagName('head')[0].appendChild(T);
                };
                T.styleSheet && (T.styleSheet.cssText += s) || T.appendChild(document.createTextNode(s));
            },
            //绑定拖拽
            drag: function()
            {
                var $moveX = 0, $moveY = 0,
				drag = false;
                var $ID = $("#" + options.id);
                $Handle = $("." + options.drag, $ID);
                $Handle.mouseover(function()
                {
                    if (options.triggerID != "")
                    {
                        $(this).css("cursor", "default");
                    } else
                    {
                        $(this).css("cursor", "move");
                    };
                });
                $Handle.mousedown(function(e)
                {
                    drag = options.triggerID != "" ? false : true;
                    if (options.dragBoxOpacity)
                    {
                        if (options.boxBdOpacity != "1")
                        {
                            $ID.children("div").css("opacity", options.dragBoxOpacity);
                            $ID.children("div.boxBd").css("opacity", options.boxBdOpacity);
                        } else
                        {
                            $ID.children("div").css("opacity", options.dragBoxOpacity);
                        };
                    };
                    e = window.event ? window.event : e;
                    var ID = document.getElementById(options.id);
                    $moveX = e.clientX - ID.offsetLeft;
                    $moveY = e.clientY - ID.offsetTop;
                    $(document).mousemove(function(e)
                    {
                        if (drag)
                        {
                            e = window.event ? window.event : e;
                            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                            var x = e.clientX - $moveX;
                            var y = e.clientY - $moveY;
                            $(ID).css({
                                left: x,
                                top: y
                            });
                        };
                    });
                    $(document).mouseup(function()
                    {
                        drag = false;
                        if (options.dragBoxOpacity)
                        {
                            if (options.boxBdOpacity != "1")
                            {
                                $ID.children("div").css("opacity", "1");
                                $ID.children("div.boxBd").css("opacity", options.boxBdOpacity);
                            } else
                            {
                                $ID.children("div").css("opacity", "1");
                            };
                        };
                    });
                });
            },
            //关闭弹出层
            remove: function()
            {
                var $box = $("#" + this.id);
                var $boxbg = $("#XYTipsWindowBg");
                if ($box != null || $boxbg != null)
                {
                    var $contentID = $(".boxContent", $box);
                    $contentType = this.content.substring(0, this.content.indexOf(":"));
                    $content = this.content.substring(this.content.indexOf(":") + 1, this.content.length);
                    if ($contentType == "id")
                    {
                        $contentID.children().appendTo($("#" + $content));
                        $box.parent().removeAttr("style").remove();
                        $boxbg.animate({ opacity: "0" }, 500, function() { $(this).remove(); });
                        $("body").css("background", "#fff");
                    }
                    else
                    {
                        $box.parent().removeAttr("style").remove();
                        $boxbg.animate({ opacity: "0" }, 500, function() { $(this).remove(); });
                        $("body").css("background", "#fff");
                    };
                };
            },

            //健盘事件，当按Esc的时候关闭弹出层
            keydown: function()
            {
                document.onkeydown = function(e)
                {
                    e = e || event;
                    if (e.keyCode == 27)
                    {
                        this.remove();
                    };
                };
            },

            /*#region 函数:create(options)*/
            /**
            * 创建对象实例
            */
            create: function(options)
            {
                var me = this;

                // 初始化选项信息
                this.options = options;

                if (this.options.id == '')
                {
                    this.id = this.options.id = x.randomText.create(10);
                }
                else
                {
                    this.id = this.options.id;
                }

                this.content = options.content;

                // BOXID = options;

                if (x.query("#" + this.id) != null)
                {
                    x.msg("创建弹出层失败！窗口“" + options.id + "”已存在！");
                    return false;
                };

                this.show();

                // 设置内容
                this.setContent();

                var $box = $("#" + this.id);

                this.box = x.query("#" + this.id);

                x.dom.on(x.query(".closeBox", this.box), "click", function()
                {
                    me.remove();
                });

                x.css.style(this.box, { zIndex: "870618" });

                if (options.closeID != "")
                {
                    x.dom.on(x.query("#" + options.closeID, this.box), "click", function()
                    {
                        me.remove();
                    });
                };

                if (options.time != "")
                {
                    setTimeout(this.remove, options.time);
                };

                if (options.showbg != "" && options.showbg == true)
                {
                    x.dom.append(document.body, "<div id=\"XYTipsWindowBg\" style=\"position:absolute;background:" + options.windowBgColor + ";filter:alpha(opacity=0);opacity:0;width:100%;left:0;top:0;z-index:870618\"><iframe src=\"about:blank\" style=\"width=100%;height:" + $(document).height() + "px;filter:alpha(opacity=0);opacity:0;scrolling=no;z-index:870610\"></iframe></div>");

                    // var $boxBgDom = "<div id=\"XYTipsWindowBg\" style=\"position:absolute;background:" + options.windowBgColor + ";filter:alpha(opacity=0);opacity:0;width:100%;left:0;top:0;z-index:870618\"><iframe src=\"about:blank\" style=\"width=100%;height:" + $(document).height() + "px;filter:alpha(opacity=0);opacity:0;scrolling=no;z-index:870610\"></iframe></div>";
                    // $($boxBgDom).appendTo("body").animate({ opacity: options.windowBgOpacity }, 200);
                };
                if (options.drag != "")
                {
                    this.drag();
                };
                if (options.fns != "" && $.isFunction(options.fns))
                {
                    options.fns.call(this);
                };

                if (options.button != "")
                {
                    this.ask();
                };

                this.keydown();

                this.setZIndex();

                if (options.showbg != true)
                {
                    // $("#" + options.id).addClass("shadow");
                    x.css.add(this.container, 'shadow');
                };

                // $("#" + options.id).die().live("mouseenter", function()
                // {
                //    BOXID = o;
                // });
            }
            /*#endregion*/

        }

        dialog.create(options);

        return dialog;
    }
};
