x.dom.on(window, 'load', function()
{
    x.dom('#test1_0').on('click', function()
    {
        x.ui.dialogs.newDialog({ title: "测试窗口 1_0" });
    });

    x.dom.on(x.query("#test1_1"), 'click', function()
    {
        x.ui.dialogs.newDialog({
            title: "左上角",
            offsets: "left-top"
        });
    });
    $("#test1_2").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "右上角",
            offsets: "right-top"
        });
    });
    $("#test1_3").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "左下角",
            offsets: "left-bottom"
        });
    });
    $("#test1_4").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "右下角",
            offsets: "right-bottom"
        });
    });
    $("#test1_5").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "靠左居中",
            offsets: "left-middle"
        });
    });
    $("#test1_6").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "靠右居中",
            offsets: "right-middle"
        });
    });
    $("#test1_7").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "居中置顶",
            offsets: "middle-top"
        });
    });
    $("#test1_8").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "居中置底",
            offsets: "middle-bottom"
        });
    });
    $("#test1_9").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "自定义位置",
            offsets: { left: "100px", top: "100px" }
        });
    });
    //END

    $("#test2_0").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "无边框无标题",
            showTitle: false,
            showBoxbg: false,
            closeID: "wubiaoti",
            content: "text:<p>这是一个没有标题的纯内容弹出层</p><button id='wubiaoti'>关闭</button>"
        });
    });
    $("#test2_1").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "边框透明",
            boxBdColor: "#666",
            boxBdOpacity: "0.5",
            boxWrapBdColor: "#ABABAB"
        });
    });
    $("#test2_2").click(function()
    {
        var dialog = x.ui.dialogs.newDialog({
            title: "对话框",
            content: "text:<div style='width:200px;text-align:left;padding:5px 15px;line-height:25px;'>这是一个Arert对话框,点击确定后将返回弹出层里的文字</div>",
            width: "300",
            height: "100",
            drag: "box-title",
            button: ["确定"],
            callback: function()
            {
                var text = $(".boxContent", $("#" + dialog.id)).text();
                alert(text);
                dialog.remove();
            }
        });
    });
    $("#test2_3").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "对话框",
            content: "text:这是一个confirm对话框。",
            width: "300",
            height: "100",
            button: ["确定", "取消"],
            callback: function(val)
            {
                alert(val);
            }
        });
    });
    $("#test2_4").click(function()
    {
        var dialog = x.ui.dialogs.newDialog({
            title: "载入提示",
            content: "text:页面载入中...",
            width: "100",
            height: "40",
            showTitle: false,
            showBoxbg: false,
            showbg: true,
            windowBgColor: "#ffffff",
            windowBgOpacity: "0.5",
            time: 3000,
            fns: function()
            {
                $("#" + dialog.id).find(".boxContent").css({ border: "none" }).addClass("loadinglayer");
            }
        });
    });
    $("#test2_5").click(function()
    {
        var dialog = x.ui.dialogs.newDialog({
            title: "Tips效果",
            content: "text:<p style='margin:1px;padding:8px;background:#FFF9DF'>心已伤，乃稍变。<br />志未灭，气犹存！<br />他朝金鳞跃龙门！</p>",
            width: "150",
            height: "78",
            showTitle: false,
            showBoxbg: false,
            boxWrapBdColor: "#FDB838",
            triggerID: "test2_5",
            closeID: "colseTipsLayer",
            offsets: { left: "90px", top: "0px" },
            time: 5000,
            fns: function()
            {
                $("body").append("<span class=\"arrowLeft\" style=\"left:-7px;top:15px;\">箭头</span><em class=\"colseBtn\" id=\"colseTipsLayer\">关闭</em>");
                $(".arrowLeft,#colseTipsLayer").appendTo("#" + this.id);
                $("#" + this.id).find(".boxContent").css({ background: "#FFFFFF" }).addClass("tipslayer");
            }
        });
    });
    $("#test2_6").click(function()
    {
        var dialog = x.ui.dialogs.newDialog({
            title: "吸附模式",
            triggerID: "test2_6",
            content: "text:我的位置是相对于被点击元素定义的",
            offsets: { left: "80px", top: "0px" }
        });
    });
    $("#test2_7").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "右下角弹出",
            offsets: { right: "0px", bottom: "-300px" },
            fns: function()
            {
                $("#" + this.id).parent().animate({ "bottom": "0px" }, 500);
            }
        });
    });
    $("#test2_8").click(function()
    {
        x.ui.dialogs.newDialog({
            title: "可拖动层",
            drag: "box-title"
        });
    });
    $("#test2_9").on('click', function()
    {
        x.ui.dialogs.newDialog({
            title: "自动关闭",
            content: "text:2秒后我会自动关闭",
            time: "2000"
        });
    });
    //END

    $("#test_1").on('click', function()
    {
        x.ui.dialogs.newDialog({
            title: "Hello world",
            content: "text:提示信息内容",
            showbg: true,
            drag: "box-title"
        });
    });
    $("#test_2").on('click', function()
    {
        x.ui.dialogs.newDialog({
            title: "我是页面中的一个ID",
            content: "id:testID",
            showbg: true,
            drag: "box-title"
        })
    });
    $("#test_3").on('click', function()
    {
        x.ui.dialogs.newDialog({
            title: "我是一张图片",
            content: "img:http://leotheme.cn/wp-content/uploads/2008/09/tr2xcp6yw4o5xebj9s.jpg",
            width: "500",
            height: "230",
            drag: "box-title",
            showbg: true
        });
    });
    $("#test_4").on('click', function()
    {
        x.ui.dialogs.newDialog({
            title: "视频FLASH演示",
            content: "swf:http://player.youku.com/player.php/sid/XMjM5NTM1NDk2/v.swf",
            width: "500",
            height: "400",
            drag: "box-title"
        });
    });

    x.dom("#test_5").on('click', function()
    {
        x.ui.dialogs.newDialog({
            title: "我是测试文件",
            content: "url:get?test.html",
            width: "400",
            height: "200",
            drag: "box-title",
            showbg: true
        });
    });

    x.dom("#test_6").on('click', function()
    {
        x.ui.dialogs.newDialog({
            title: "框架应用",
            content: "iframe:http://github.x3platform.com",
            width: "800",
            height: "450"
        });
    });

    $("#uid").click(function()
    {
        x.ui.dialogs.newDialog({
            boxID: "uidtest",
            content: "text:ID测试",
            width: "240",
            height: "150",
            offsets: "middle-bottom"
        });
    })
});