// -*- ecoding=utf-8 -*-

/**
* 窗口
* @namespace windows
* @memberof x.ui
*/
x.ui.windows = {
    /*#region 函数:newWindow(name, options)*/
    /**
    * 窗口
    * @class Window
    * @constructor newWindow
    * @memberof x.ui.windows
    * @param {string} name 名称
    * @param {object} [options] 选项<br />
    * 可选键值范围: 
    * <table class="param-options" >
    * <thead>
    * <tr><th>名称</th><th>类型</th><th class="last" >描述</th></tr>
    * </thead>
    * <tbody>
    * <tr><td class="name" >content</td><td>string</td><td>窗口内容</td></tr>
    * <tr><td class="name" >domain</td><td>string</td><td>所属的域</td></tr>
    * </tbody>
    * </table>
    
    */
    newWindow: function(name, options)
    {
        var internalWindow = {
            // 名称
            name: name,
            // 选项
            options: options,

            /*#region 函数:open()*/
            open: function()
            {
                document.getElementById(name).style.display = '';
            },
            /*#endregion*/

            /*#region 函数:close()*/
            close: function()
            {
                document.getElementById(name).style.display = 'none';
            },
            /*#endregion*/

            /*#region 函数:create()*/
            create: function()
            {
                var outString = '';

                var opts = this.options;

                outString = '<div id="' + this.name + '" style="';
                outString += 'position: fixed; display:none;'
                outString += 'z-index: ' + opts.zIndex + ';'
                outString += 'border: ' + opts.border + ';'
                outString += 'width: ' + opts.width + ';'
                outString += 'height: ' + opts.height + ';'
                outString += 'top: ' + opts.top + ';'
                outString += 'right:' + opts.right + ';'
                outString += 'bottom: ' + opts.bottom + ';'
                outString += 'left: ' + opts.left + ';'
                outString += '" >' + opts.content + '</div>';

                return outString;
            },
            /*#endregion*/

            /*#region 函数:destroy()*/
            /**
            * 销毁对象
            */
            destroy: function()
            {
                $(document.getElementById(name)).remove();
            },
            /*#endregion*/

            /*#region 函数:bindOptions(options)*/
            bindOptions: function(options)
            {
                // 设置默认选项参数
                this.options = x.ext({
                    zIndex: 999,                    // Z轴坐标
                    height: '100px',                // 高度
                    width: '100px',                 // 宽度
                    top: 'auto',                    // 上
                    right: 'auto',                  // 右
                    bottom: 'auto',                 // 下
                    left: 'auto'                    // 左
                }, options || {});
            },
            /*#endregion*/

            load: function(options)
            {
                // 验证并绑定选项信息
                this.bindOptions(options);

                // 设置重写后的创建函数
                if (!x.isUndefined(options.create))
                {
                    this.create = options.create;
                }

                // 加载遮罩和页面内容
                $(document.body).append(this.create());

                if (this.options.bindingFeature)
                {
                    x.dom.features.bind();
                }
            }
        };

        return internalWindow;
    },
    /*#endregion*/

    /*#region 函数:getWindow(name, options)*/
    /**
    * 获取窗口对象
    */
    getWindow: function(name, options)
    {
        var name = x.getFriendlyName(location.pathname + '-window-' + name);

        var internalWindow = x.ui.windows.newWindow(name, options);

        // 加载界面、数据、事件
        internalWindow.load(options);

        // 绑定到Window对象
        window[name] = internalWindow;

        return internalWindow;
    },
    /*#endregion*/

    /*#region 函数:getDialog(url, width, height, style)*/
    /**
    * 打开对话新窗口, 该窗口在屏幕居中.
    */
    getDialog: function(url, width, height, style)
    {
        // 样式参数
        // resizable        调整大小
        // location         地址栏

        if (typeof (style) === 'undefined')
        {
            style = 'resizable=1,directories=0,location=0,menubar=1,scrollbars=1,status=0,titlebar=0,toolbar=0';
            //
            //style = 'resizable=1,directories=1,location=1,menubar=1,scrollbars=1,status=1,titlebar=1,toolbar=1';
            //
            //style = 'resizable=1,directories=0,location=0,menubar=0,scrollbars=1,status=0,titlebar=0,toolbar=0';
        }

        if (typeof (width) === 'undefined')
        {
            style = "width=" + screen.availWidth + "," + style;
            var left = Math.round((screen.availWidth - width) / 2);
            style = "left=" + left + "," + style;
        }
        else
        {
            style = "width=" + width + "," + style;
            var left = Math.round((screen.availWidth - width) / 2);
            style = "left=" + left + "," + style;
        }

        if (typeof (height) === 'undefined')
        {
            style = "height=" + screen.availHeight + "," + style;
            var top = Math.round((screen.availHeight - height) / 2);
            style = "top=" + top + "," + style;
        }
        else
        {
            style = "height=" + height + "," + style;
            var top = Math.round((screen.availHeight - height) / 2);
            style = "top=" + top + "," + style;
        }

        return window.open(url, '', style);
    },
    /*#endregion*/

    /*#region 函数:getModalDialog(url, width, height, style)*/
    /**
    * 打开模态窗口, 该窗口在屏幕居中.
    */
    getModalDialog: function(url, width, height, style)
    {
        if (typeof (style) === 'undefined')
        {
            style = 'toolbar=no; location=no; directories=no; status=no; menubar=no; center=yes; help=0; resizable=yes; status=0;';
        }

        if (typeof (width) === 'undefined')
        {
            var left = Math.round((screen.availWidth - width) / 2);
            style = 'dialogWidth=' + width + 'px,left=' + left + ',' + style;
        }
        else
        {
            style = "dialogWidth=" + width + "px," + style;
            var left = Math.round((screen.availWidth - width) / 2);
            style = "left=" + left + "," + style;
        }

        if (typeof (height) === 'undefined')
        {
            var top = Math.round((screen.availHeight - height) / 2);
            style = 'dialogHeight=' + height + 'px,top=' + top + ',' + style;
        }
        else
        {
            style = "dialogHeight=" + height + "px," + style;
            var top = Math.round((screen.availHeight - height) / 2);
            style = "top=" + top + "," + style;
        }

        return window.showModalDialog(url, window, style);
    }
    /*#endregion*/
}
    