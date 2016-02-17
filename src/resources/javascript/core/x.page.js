// -*- ecoding=utf-8 -*-

/**
* @namespace page
* @memberof x
* @description 页面管理
*/
x.page = {

    /*#region 函数:back()*/
    /**
    * 返回上一个页面. window.history.back() 函数的别名
    * @method back
    * @memberof x.page
    */
    back: function()
    {
        window.history.back(arguments);
    },
    /*#endregion*/

    /*#region 函数:close()*/
    /**
    * 关闭窗口<br />
    * 注: 由于浏览器安全限制, 此方法只支持关闭以 _blank 方式打开的窗口.
    * @method close
    * @memberof x.page
    */
    close: function()
    {
        try
        {
            window.opener = null;
            window.open('', '_self');
            window.close();
        }
        catch(ex)
        {
            window.close();
        }
    },
    /*#endregion*/

    /*#region 函数:refreshParentWindow()*/
    /**
    * 刷新父级窗口
    * @method refreshParentWindow
    * @memberof x.page
    */
    refreshParentWindow: function()
    {
        if(window.opener == null)
        {
            x.debug.warn('未定义父级窗口。');
            return
        }

        if(!x.isFunction(window.opener.window$refresh$callback))
        {
            x.debug.warn('父级窗口未定义 window$refresh$callback() 函数。');
            return
        }

        // 如果有父级窗口，调用父级窗口刷新函数
        // IE 显示 Window 为 [object Object]
        // Firefox 显示 Window 为 [object window]
        // Chrome 显示 Window 为 [object global]
        // if((x.type(window.opener) == 'object' || x.type(window.opener) == 'window' || x.type(window.opener) == 'global'))
        // {
        //    window.opener.window$refresh$callback();
        // }

        window.opener.window$refresh$callback();
    },
    /*#endregion*/

    /**
    * 获取页面范围信息
    * @method getRange
    * @memberof x.page
    */
    getRange: function()
    {
        var pageWidth, pageHeight, windowWidth, windowHeight;

        var xScroll, yScroll;

        if(window.innerHeight && window.scrollMaxY)
        {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        }
        else if(document.body.scrollHeight > document.body.offsetHeight)
        {
            // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        }
        else
        {
            // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        //console.log('self.innerWidth:' + self.innerWidth);
        //console.log('document.documentElement.clientWidth:' + document.documentElement.clientWidth);

        if(window.innerHeight)
        {
            // all except Explorer
            if(document.documentElement.clientWidth)
            {
                windowWidth = document.documentElement.clientWidth;
            }
            else
            {
                windowWidth = window.innerWidth;
            }

            windowHeight = window.innerHeight;
        }
        else if(document.documentElement && document.documentElement.clientHeight)
        {
            // IE
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        }
        else if(document.body)
        {
            // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if(yScroll < windowHeight)
        {
            pageHeight = windowHeight;
        }
        else
        {
            pageHeight = yScroll;
        }

        //console.log("xScroll " + xScroll)
        //console.log("windowWidth " + windowWidth)

        // for small pages with total width less then width of the viewport
        if(xScroll < windowWidth)
        {
            pageWidth = xScroll;
        }
        else
        {
            pageWidth = windowWidth;
        }

        //console.log("pageWidth " + pageWidth)

        return {
            width: pageWidth,
            height: pageHeight,
            windowWidth: windowWidth,
            windowHeight: windowHeight
        };
    },

    /*
    * 获取页面高度
    */
    getHeight: function()
    {
        // return document.body.scrollHeight;
        return x.page.getRange().height;
    },

    /*
    * 获取页面宽度
    */
    getWidth: function()
    {
        // return document.body.scrollWidth;
        return x.page.getRange().width;
    },

    /*
    * 获取页面可视区域高度
    */
    getViewHeight: function()
    {
        return x.page.getRange().windowHeight;
    },

    /**
    * 获取页面可视区域宽度
    */
    getViewWidth: function()
    {
        return x.page.getRange().windowWidth;
    },

    /**
    * 获取元素在页面中的坐标 Top 坐标
    */
    getElementTop: function(element)
    {
        return element.getBoundingClientRect().top;
        /*
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null)
        {
        actualTop += current.offsetTop;
        current = current.offsetParent;
        }
        return actualTop;
        */
    },

    /**
    * 获取元素在页面中的坐标 Left 坐标
    */
    getElementLeft: function(element)
    {
        return element.getBoundingClientRect().left;
        /*
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null)
        {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
        }
        return actualLeft;
        */
    },

    /**
    * 获取元素在页面可视区域中的坐标 Top 坐标
    */
    getElementViewTop: function(element)
    {
        return element.getBoundingClientRect().top;
        /*
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null)
        {
        actualTop += current.offsetTop;
        current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat")
        {
        var elementScrollTop = document.body.scrollTop;
        } else
        {
        var elementScrollTop = document.documentElement.scrollTop;
        }
        return actualTop - elementScrollTop;*/
    },

    /**
    * 获取元素在页面可视区域中的坐标 Left 坐标
    */
    getElementViewLeft: function(element)
    {
        return element.getBoundingClientRect().left;
        /*
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null)
        {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat")
        {
        var elementScrollLeft = document.body.scrollLeft;
        } else
        {
        var elementScrollLeft = document.documentElement.scrollLeft;
        }
        return actualLeft - elementScrollLeft;
        */
    },

    /**
    * 获取元素在页面可视区域中的坐标 Left 坐标
    */
    getElementAbsoluteTop: function(element)
    {
        var top = x.page.getElementViewTop(element);

        var parents = $(element).parents();

        for(var i = 0;i < parents.length;i++)
        {
            var parent = $(parents[i]);

            if(parent.css('position') === 'absolute' && parent.css('top') !== 'auto')
            {
                top = top - Number(parent.css('top').replace('px', ''));
            }

            x.page.getElementViewTop(parents[i])
        }

        return top;
    },

    /**
    * 获取元素的范围
    */
    getElementRange: function(element)
    {
        var display = $(element).css('display');

        // Safari bug
        if(display != 'none' && display != null)
        {
            return { width: element.offsetWidth, height: element.offsetHeight };
        }

        // All *Width and *Height properties give 0 on elements with display none,
        // so enable the element temporarily
        var style = element.style;

        var originalVisibility = style.visibility;
        var originalPosition = style.position;
        var originalDisplay = style.display;

        style.visibility = 'hidden';
        style.position = 'absolute';
        style.display = 'block';

        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;

        style.display = originalDisplay;
        style.position = originalPosition;
        style.visibility = originalVisibility;

        return { width: originalWidth, height: originalHeight };
    },

    scrollBarWidth: null,

    /**
    * 获取滚动条宽度
    */
    getScrollBarWidth: function()
    {
        // 利用元素的 overflow:scroll; 样式, 显示滚动条
        // 然后获取 offsetHeight 和 clientHeight 的差值

        if(this.scrollBarWidth) return this.scrollBarWidth;

        var helper = document.createElement("div");
        // if MSIE
        // 如此设置的话，scroll bar的最大宽度不能大于50px（通常不会）。
        helper.style.cssText = "overflow:scroll;width:50px;height:50px;";
        // else OTHER Browsers:
        // scrollBarHelper.style.cssText = "overflow:scroll;";
        document.body.appendChild(helper);

        if(helper)
        {
            this.scrollBarWidth = {
                horizontal: helper.offsetHeight - helper.clientHeight,
                vertical: helper.offsetWidth - helper.clientWidth
            };
        }

        document.body.removeChild(helper);

        return this.scrollBarWidth;
    },

    /**
    * 返回页面顶部
    */
    goTop: function()
    {
        window.scrollTo(0, 0);
        // document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },

    /*
    * 竖向滚动
    */
    scroll: function(value)
    {
        window.scrollTo(0, value);
    },

    /**
    * 重新调整元素的大小
    *
    * @element	: 元素
    * @height	: 高度
    * @width	: 宽度
    */
    resize: function(element, height, width)
    {
        $(element).css({
            height: document.body.clientHeight - height + "px",
            width: document.body.clientWidth - width + "px"
        });
    },

    /*
    * 模拟窗口最大化.
    */
    setFullScreen: function()
    {
        // 作废
        //
        // var width = screen.availWidth - (document.layers ? 10 : -8);
        // var height = screen.availHeight - (document.layers ? 20 : -8);

        // window.resizeTo(width, height);

        // x.Page.setTitle(width + '-' + height);
    },

    /**
    * 打印Xml的文档
    *
    * @text : 文本信息
    */
    printXml: function(text)
    {
        if(text == null) { return ''; }

        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    /**
    * 禁止拷贝
    */
    forbidCopy: {
        /*
        * Hotkey 即为热键的键值,是ASII码.
        * Ctronl : 17.
        * C : 99
        * V :
        */
        hotkeys: [67],

        message: '当前页面【禁止拷贝】信息。',

        /*#region 函数:listen()*/

        listen: function()
        {
            if($(document.getElementById('forbidCopy$activate')).val() === '1')
            {
                // 禁止拷贝
                x.page.forbidCopy.activate();
            }
        },
        /*#endregion*/

        /*#region 函数:activate(e)*/
        activate: function(e)
        {
            var event = window.event ? window.event : e;

            if(document.layers)
            {
                document.captureEvents(event.MOUSEDOWN);

                document.captureEvents(event.KEYDOWN);
            }

            // 上下文菜单
            document.oncontextmenu = function() { return false; };

            // 全选功能
            document.onselectstart = function(event)
            {
                event = x.getEventObject(event);

                event.returnValue = false;
            };

            // 鼠标
            document.onmousedown = x.page.forbidCopy.mouse;

            // 键盘
            document.onkeydown = x.page.forbidCopy.keyboard;
        },
        /*#endregion*/

        /*#region 函数:mouse(e)*/
        mouse: function(e)
        {
            var event = window.event ? window.event : e;

            if(document.all)
            {
                if(event.button == 1 || event.button == 2 || event.button == 3)
                {
                    window.document.oncontextmenu = function() { return false; }
                }
            }

            if(document.layers)
            {
                if(event.which == 3)
                {
                    window.document.oncontextmenu = function() { return false; }
                }
            }
        },
        /*#endregion*/

        /*#region 函数:keyboard(e)*/
        keyboard: function(e)
        {
            var event = window.event ? window.event : e;

            var hotkeys = x.page.forbidCopy.hotkeys;

            var result = false;

            for(var i = 0;i < hotkeys.length;i++)
            {
                if(hotkeys[i] == event.keyCode)
                {
                    result = true;
                    break;
                }
            }

            // event.shiftKey | event.altKey | event.ctrlKey
            if(event.ctrlKey || result)
            {
                alert(x.page.forbidCopy.message);

                x.debug.log(x.page.forbidCopy.message);

                return false;
            }
        }
        /*#endregion*/
    },

    /*
    * 创建分页对象
    */
    newPagingHelper: function(pageSize)
    {
        if(pageSize === undefined || pageSize === '') { pageSize = 10; }

        var helper = {

            rowIndex: 0,

            pageSize: pageSize,

            rowCount: 0,

            pageCount: 0,

            currentPage: 0,

            firstPage: 0,

            previousPage: 0,

            nextPage: 0,

            lastPage: 0,

            query: {
                scence: '', table: '', fields: '', where: {}, orders: ''
            },

            /*
            * 加载对象信息
            */
            load: function(paging)
            {
                if(!x.isUndefined(paging.pageSize)) { this.pagingize = Number(paging.pageSize); }

                if(!x.isUndefined(paging.rowCount)) { this.rowCount = Number(paging.rowCount); }

                if(!x.isUndefined(paging.rowIndex)) { this.rowIndex = Number(paging.rowIndex); }

                if(!x.isUndefined(paging.firstPage)) { this.firstPage = Number(paging.firstPage); }

                if(!x.isUndefined(paging.previousPage)) { this.previousPage = Number(paging.previousPage); }

                if(!x.isUndefined(paging.nextPage)) { this.nextPage = Number(paging.nextPage); }

                if(!x.isUndefined(paging.lastPage)) { this.lastPage = Number(paging.lastPage); }
            },

            /*
            * 设置上一页的参数.
            */
            setPreviousPage: function(value)
            {
                this.previousPage = value - 1;

                if(this.previousPage < 1)
                {
                    this.previousPage = 1;
                }
            },

            /**
            * 设置下一页的参数.
            */
            setNextPage: function(value)
            {
                this.nextPage = value + 1;

                if(this.nextPage > this.lastPage)
                {
                    this.nextPage = this.lastPage;
                }
            },

            /**
            * 设置页数
            */
            getPagesNumber: function(format, value, length)
            {
                var outString = '';

                var page = value;

                var counter;

                if(value - length > 0)
                {
                    value -= length;
                }
                else
                {
                    value = 1;
                }

                counter = value + (length * 2) + 1;

                if(counter > this.lastPage)
                {
                    value = this.lastPage - (length * 2);
                }

                for(var i = value;i < counter;i++)
                {
                    if(i < 1) { continue; }

                    if(i > this.lastPage) { break; }

                    outString += '<li ' + ((page == i) ? ('class="active"') : '') + ' ><a href="' + format.replace('{0}', i) + '" >';
                    outString += ((page == i) ? ('<strong>' + i + '</strong>') : i);
                    outString += '</a></li>';
                }

                return outString;
            },

            /**
            * 解析为分页菜单信息
            */
            tryParseMenu: function(format)
            {
                var outString = '';
                //
                // message //.format("{rowCount}条信息")

                outString += '<div class="form-inline text-right">';
                outString += '<div class="form-group" style="padding:0 10px 0 0;" >';
                outString += '共有' + this.rowCount + '条信息 当前' + (this.rowIndex + 1) + '-' + (this.rowIndex + this.pageSize) + '信息 ';
                outString += '</div>';
                outString += '<div class="form-group">';
                outString += '<nav>';
                outString += '<ul class="pagination pagination-sm">';

                outString += '<li><a href="' + format.replace('{0}', this.firstPage) + '" aria-label="首页"><span class="glyphicon glyphicon-step-backward"></span></a></li>';
                outString += '<li><a href="' + format.replace('{0}', this.previousPage) + '" aria-label="上一页"><span class="glyphicon glyphicon-triangle-left"></span></a></li>';
                outString += this.getPagesNumber(format, this.currentPage, 2);
                outString += '<li><a href="' + format.replace('{0}', this.nextPage) + '" aria-label="下一页"><span class="glyphicon glyphicon-triangle-right"></span></a></li> ';
                outString += '<li><a href="' + format.replace('{0}', this.lastPage) + '" aria-label="末页"><span class="glyphicon glyphicon-step-forward"></span></a></li> ';

                outString += '</ul>';
                outString += '</nav>';
                outString += '</div>';
                outString += '</div>';

                return outString;
            },

            // 序列化查询信息
            toQueryXml: function()
            {
                var outString = '';

                outString += '<query>';

                if(this.query.scence.length > 0) outString += '<scence><![CDATA[' + this.query.scence + ']]></scence>';
                if(this.query.table.length > 0) outString += '<table><![CDATA[' + this.query.table + ']]></table>';
                if(this.query.fields.length > 0) outString += '<fields><![CDATA[' + this.query.fields + ']]></fields>';

                var where = '<where>';
                x.each(this.query.where, function(name, value)
                {
                    where += '<key name="' + name + '" ><![CDATA[' + value + ']]></key>';
                });
                where += '</where>';
                if(where != '<where></where>') outString += where;

                if(this.query.orders.length > 0) outString += '<orders><![CDATA[' + this.query.orders + ']]></orders>';

                outString += '</query>';

                if(outString == '<query></query>') outString += '';

                return outString;
            },

            toXml: function()
            {
                var outString = '';

                outString += '<paging>';
                outString += '<rowIndex>' + this.rowIndex + '</rowIndex>';
                outString += '<pageSize>' + this.pageSize + '</pageSize>';
                outString += '<rowCount>' + this.rowCount + '</rowCount>';
                outString += '<pageCount>' + this.pageCount + '</pageCount>';
                outString += '<currentPage>' + this.currentPage + '</currentPage>';
                outString += '<firstPage>' + this.firstPage + '</firstPage>';
                outString += '<previousPage>' + this.previousPage + '</previousPage>';
                outString += '<nextPage>' + this.nextPage + '</nextPage>';
                outString += '<lastPage>' + this.lastPage + '</lastPage>';
                outString += '</paging>';
                outString += this.toQueryXml();

                return outString;
            }
        };

        return helper;
    }
}
