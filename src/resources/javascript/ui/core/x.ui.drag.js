// -*- ecoding : utf-8 -*-

/**
* 拖拽区块
*
* require	: x.js
*/
x.ui.drag = {
    /**
    * 获取可拖拽窗口
    */
    getDraggableWindow: function(options)
    {
        var name = x.getFriendlyName(location.pathname + '$' + options.targetWindowName + '$draggable');

        var draggable = {
            // 实例名称
            name: name,

            // 配置信息
            options: options,

            // 目标窗口
            targetWindow: null,

            // 目标窗口宽度
            targetWindowWidth: 0,

            // 目标窗口高度
            targetWindowHeight: 0,

            mask: 'dragListenerMask',

            //
            isDragging: false,

            pointX: '',
            pointY: '',

            currentX: '',
            currentY: '',

            // 拖拽时的容器样子
            draggingClassName: 'alpha',
            // 停止时的容器样子
            stopClassName: '',

            load: function()
            {
                if (document.getElementById(this.options.targetWindowName) === undefined)
                {
                    alert('元素【' + this.options.targetWindowName + '】未找到。');
                    return;
                }

                this.targetWindowName = this.options.targetWindowName;

                if (this.options.draggingClassName)
                {
                    this.draggingClassName = this.options.draggingClassName;
                }

                this.targetWindow = document.getElementById(this.targetWindowName);

                this.stopClassName = this.targetWindow.className;

                // 设置目标窗口的宽度
                if (typeof (this.options.targetWindowWidth) === 'undefined')
                {
                    this.targetWindowWidth = $(this.targetWindow).width();
                    this.targetWindowWidth += Number($(this.targetWindow).css('padding-left').replace('px', ''));
                    this.targetWindowWidth += Number($(this.targetWindow).css('padding-right').replace('px', ''));
                }
                else
                {
                    this.targetWindowWidth = this.options.targetWindowWidth;
                }

                // 设置目标窗口的高度
                if (typeof (this.options.targetWindowHeight) === 'undefined')
                {
                    this.targetWindowHeight = $(this.targetWindow).height();

                    this.targetWindowHeight += Number($(this.targetWindow).css('padding-top').replace('px', ''));
                    this.targetWindowHeight += Number($(this.targetWindow).css('padding-bottom').replace('px', ''));
                }
                else
                {
                    this.targetWindowHeight = this.options.targetWindowHeight;
                }

                // if (!document.getElementById(this.mask))
                // {
                // -*- IE 6 hack -*-

                //    var iframe = document.createElement('iframe');

                //    iframe.id = this.mask;

                //    iframe.frameBorder = 0;
                //    iframe.className = "hidden";

                //    document.body.appendChild(iframe);
                // }

                if (typeof (this.options.pointX) !== 'undefined')
                {
                    this.targetWindow.style.top = this.options.pointX + "px";
                }

                if (typeof (this.options.pointY) !== 'undefined')
                {
                    this.targetWindow.style.left = this.options.pointY + "px";
                }

                var self = this;

                // 拖拽
                $(document.body).bind('mousemove', function(event)
                {
                    event = (event === null) ? window.event : event;

                    if (self.isDragging)
                    {
                        // 自定义拖拽样式
                        if (self.options.draggingStyle !== 'default')
                        {
                            self.targetWindow.className = self.draggingClassName;
                        }

                        self.targetWindow.style.left = event.clientX - self.pointX + "px";
                        self.targetWindow.style.top = event.clientY - self.pointY + "px";

                        self.currentX = self.targetWindow.offsetLeft;
                        self.currentY = self.targetWindow.offsetTop;

                        if (self.currentX < 0)
                        {
                            self.targetWindow.style.left = '0px';
                        }

                        if (self.currentY < 0)
                        {
                            self.targetWindow.style.top = '0px';
                        }

                        /*
                        if (self.currentX + self.targetWindowWidth > document.body.clientWidth - 22)
                        {
                        self.targetWindow.style.left = (document.body.clientWidth - self.targetWindowWidth - 22) + "px";
                        }

                        if (self.currentY + self.targetWindowHeight > document.body.clientHeight)
                        {
                        self.targetWindow.style.top = (document.body.clientHeight - self.targetWindowHeight) + "px";
                        }
                        */
                        var range = x.page.getRange();

                        if (self.currentX + self.targetWindowWidth > range.width - 22)
                        {
                            self.targetWindow.style.left = (range.width - self.targetWindowWidth - 22) + "px";
                        }

                        if (self.currentY + self.targetWindowHeight > range.height)
                        {
                            self.targetWindow.style.top = (range.height - self.targetWindowHeight) + "px";
                        }

                        x.debug.log('document.body.scrollHeight:' + document.body.scrollHeight + " | self.targetWindow.offsetTop:" + self.targetWindow.offsetTop + ' | '
                        + 'range.width:' + range.width + " | range.height:" + range.height + " | "
                        + 'targetWindowWidth:' + self.targetWindowWidth + " | targetWindowHeight:" + self.targetWindowHeight + " | "
                        + 'left:' + self.currentX + ' | top:' + self.currentY + ' | right:' + (range.width - (self.currentX + self.targetWindowWidth)) + ' | bottom:' + (self.currentY + self.targetWindowHeight));

                        // -*- IE 6 hack -*-

                        var div = self.targetWindow;
                        var iframe = document.getElementById(self.mask);

                        div.style.display = "block";
                            
                        if (iframe)
                        {
                            iframe.style.width = div.offsetWidth;
                            iframe.style.height = div.offsetHeight;
                            iframe.style.top = div.style.top;
                            iframe.style.left = div.style.left;
                            iframe.style.zIndex = div.style.zIndex - 1;
                            iframe.style.position = 'absolute';
                            iframe.style.display = 'block';

                            iframe.className = "transparent";
                        } 
                    }
                    else
                    {
                        return true;
                    }
                });

                // 结束
                $(document.body).bind('mouseup', function(event)
                {
                    if (self.targetWindow.releaseCapture)
                    {
                        self.targetWindow.releaseCapture();
                    }
                    else if (window.releaseEvents)
                    {
                        window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                    };

                    if (self.isDragging)
                    {
                        var iframe = document.getElementById(self.mask);

                        if (iframe)
                        {
                            iframe.style.display = 'hidden';
                        }
                    }

                    self.isDragging = false;

                    return false;
                });

                // 拖拽开始
                $(this.targetWindow).bind('mousedown', function(event)
                {
                    event = (event === null) ? window.event : event;

                    // x.debug.log(event.target.id);
                    if (event.target.id === self.targetWindow.id)
                    {
                        if (self.targetWindow.setCapture)
                        {
                            self.targetWindow.setCapture();
                        }
                        else if (window.captureEvents)
                        {
                            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                        };

                        if (event.button != 2)
                        {
                            self.targetWindow.style.zIndex = 99;

                            self.pointX = event.clientX - self.targetWindow.offsetLeft;
                            self.pointY = event.clientY - self.targetWindow.offsetTop;

                            self.isDragging = true;
                        }
                    }
                });

                // 拖拽停止
                $(this.targetWindow).bind('mouseup', function(event)
                {
                    if (self.targetWindow.releaseCapture)
                    {
                        self.targetWindow.releaseCapture();

                        self.targetWindow.className = self.stopClassName;
                    }
                    else if (window.releaseEvents)
                    {
                        window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)

                        self.targetWindow.className = self.stopClassName;
                    }

                    self.isDragging = false;

                    return false;
                });
            }
        };

        draggable.load();

        return draggable;
    }
};