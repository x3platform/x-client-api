// -*- ecoding : utf-8 -*-

x.ui.mask = {

    zIndex: 800,

    // 遮罩的栈
    stack: null,

    getMaskStack: function()
    {
        if (x.ui.mask.stack === null)
        {
            x.ui.mask.stack = x.newStack();
        }

        return x.ui.mask.stack;
    },

    // 默认遮罩实例
    defaultInstance: null,

    /**
    * 获取默认遮罩窗口实例
    * @method getWindow
    * @memberof x
    * @param {string} html 窗口中的Html代码
    * @param {object} [instance] 当前遮罩实例
    * @return {object} 这张对象
    */
    getWindow: function(options, instance)
    {
        if (typeof (instance) === 'undefined')
        {
            // 获得默认遮罩实例
            if (this.defaultInstance === null)
            {
                var name = x.getFriendlyName(location.pathname + '$mask$default$instance');

                this.defaultInstance = instance = x.ui.mask.newMaskWrapper(name, options);
            }
            else
            {
                instance = this.defaultInstance;
            }
        }

        // 加载遮罩、页面结构
        instance.open().innerHTML = options.content;

        instance.resize();

        return instance;
    },

    clear: function()
    {
        var mask = x.ui.mask.getMaskStack().peek();

        if (mask !== null)
        {
            mask.close();
        }
    },

    /**
    * @class MaskWrapper 页面的遮罩封装器
    * @constructor newMaskWrapper
    * @memberof x.ui.mask
    */
    newMaskWrapper: function(name, options)
    {
        var maskWrapper = {
            // 实例名称
            name: 'maskWrapper',
            // 弹出窗口名称
            popupWindowName: 'maskPopupWindow',
            // 配置信息
            options: null,
            // 最大
            maxOpacity: 0.4,
            //
            maxDuration: 0.2,
            // 自动隐藏
            autoHide: 1,

            create: function(name, options)
            {
                // 初始化选项信息
                this.options = x.ext(options || {}, {
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0'
                });

                this.name = name;
                this.popupWindowName = name + '$maskPopupWindow';

                if (options.url)
                {
                    options.content = '<div >'
                            + '<iframe border="0" frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" '
                            + 'style="border:none; width:' + options.width + '; height:' + options.height + ';" src="' + options.url + '"></iframe>'
                            + '</div>';
                }
            },

            /**
            * 显示遮罩
            */
            show: function()
            {
                var wrapper = document.getElementById(this.name);

                if (wrapper === null)
                {
                    $(document.body).append('<div id="' + this.name + '" style="display:none;" ></div>');

                    wrapper = document.getElementById(this.name);
                }

                if (this.autoHide === 1)
                {
                    $(wrapper).bind('click', function(event)
                    {
                        $(this).unbind('click');

                        x.stopEventPropagation(event);

                        var mask = window[this.id];

                        if (x.dom.query(mask.name).css('display') === '')
                        {
                            // x.debug.log(mask.name + '.close()');
                            mask.close();
                        }
                    });
                }

                // .x-mask-wrapper{ position: absolute; top: 0; left: 0; z-index: 90; width: 100%; height: 100%; background-color: #000; }
                // wrapper.className = 'x-mask-wrapper';

                // wrapper.style.height = x.page.getRange().height + 'px';
                // wrapper.style.width = x.page.getRange().width + 'px';

                $(wrapper).css({
                    // 'position': 'absolute',
                    'position': 'fixed',
                    'top': 0,
                    'left': 0,
                    'z-index': 90,
                    'width': '100%',
                    'height': '100%',
                    'background': 'rgba(0,0,0,100)'
                });

                if (wrapper.style.display === 'none')
                {
                    // x.debug.log('show:' + mask.name);

                    x.dom.query(this.name).css({ display: '', opacity: 0.1 });

                    x.dom.query(this.popupWindowName).css({ display: 'none' });

                    x.dom.query(this.name).fadeTo((this.maxDuration * 1000), this.maxOpacity, function()
                    {
                        var mask = window[this.id];

                        // x.debug.log(mask.popupWindowName + '.show()');

                        x.dom.query(mask.popupWindowName).css({ display: '' });
                        x.dom.query(mask.popupWindowName).slideDown('slow');
                    });
                }
            },

            /*
            * 隐藏
            */
            hide: function()
            {
                if (x.dom.query(this.popupWindowName).css('display') !== 'none')
                {
                    /*
                    x.dom.query(this.popupWindowName).css({ display: 'none' });

                    x.dom.query(this.name).css({ display: '', opacity: this.maxOpacity });

                    x.dom.query(this.name).fadeOut((this.maxDuration * 1000), function()
                    {
                    x.dom.query(this.name).css({ display: 'none' });
                    });
                    */

                    // 注:取消对 IE6 的支持
                    // IE 6 支持
                    /*
                    if (document.getElementById('dragListenerMask'))
                    {
                    document.getElementById('dragListenerMask').style.display = 'none';
                    }
                    */

                    var that = this;

                    x.dom.query(this.popupWindowName).fadeOut('normal', function()
                    {
                        x.dom.query(that.name).css({ display: '', opacity: that.maxOpacity });

                        x.dom.query(that.name).fadeOut((that.maxDuration * 1000), function()
                        {
                            x.dom.query(that.name).css({ display: 'none' });
                        });
                    });
                }
            },

            /**
            * 打开弹出窗口
            */
            open: function()
            {
                // 如果之前有遮罩，则隐藏之前的遮罩内容。
                var mask = x.ui.mask.getMaskStack().peek();

                if (mask !== null && mask.name !== this.name)
                {
                    mask.hide();
                }

                if (mask === null || mask.name !== this.name)
                {
                    x.ui.mask.getMaskStack().push(this);
                }

                this.show();

                var element = document.getElementById(this.popupWindowName);

                // 弹出窗口的位置
                var pointX = this.options.left, pointY = this.options.top;

                if (element === null)
                {
                    element = document.createElement('div');

                    element.id = this.popupWindowName;

                    element.style.width = this.options.width;

                    element.style.height = this.options.height;

                    element.style.display = 'none';

                    element.style.zIndex = x.ui.mask.zIndex++;

                    $(document.body).append(element);

                    $(element).fadeIn('normal');

                    pointX = (x.page.getRange().width - $(element).width()) / 2;

                    // 设置窗口的位置
                    x.util.setLocation(element, pointX, pointY);
                }
                else
                {
                    element.style.zIndex = x.ui.mask.zIndex++;

                    // $(element).show();
                    $(element).fadeIn('normal');

                    pointX = (x.page.getRange().width - $(element).width()) / 2;

                    x.util.setLocation(element, pointX, pointY);
                }

                this.resize();

                return element;
            },

            /**
            * 重置大小
            */
            resize: function()
            {
                var element = x.dom.query(this.popupWindowName);

                if (element.size() === 0) { return; }

                // 弹出窗口的位置
                var pointX = this.options.left, pointY = this.options.top;

                var width = 720;

                if (element.children().length === 0) { return; }

                // 弹出窗口宽度
                var width = element.width();
                // height = $(element.children()[0]).height();

                // 设置容器宽度
                element.css({ 'width': width + 'px' });

                pointX = (x.page.getRange().width - width) / 2;

                x.util.setLocation(element, pointX, pointY);

                // 设置窗口可拖拽
                x.drag.getDraggableWindow({
                    targetWindowName: this.popupWindowName,
                    targetWindowWidth: options.draggableWidth,
                    targetWindowHeight: options.draggableHeight,
                    draggingStyle: 'default'
                });
            },

            closeEvent: null,

            /*
            * 关闭弹出窗口
            */
            close: function()
            {
                x.ui.mask.getMaskStack().pop();

                this.hide();

                // 如果之前遮罩，则显示之前的遮罩内容。
                var mask = x.ui.mask.getMaskStack().peek();

                if (mask !== null)
                {
                    // x.debug.log(mask.name + '.show()');
                    mask.show();
                }

                if (this.closeEvent)
                {
                    this.closeEvent();
                }
            }
        };

        maskWrapper.create(name, options);

        window[name] = maskWrapper;

        return maskWrapper;
    }
};