// -*- ecoding=utf-8 -*-

/**
* @namespace page
* @memberof x
* @description 页面管理
*/
x.page = {

    /*region 函数:back()*/
    /**
    * 返回上一个页面.
    * @method back
    * @memberof x.page
    */
    back: function()
    {
        window.history.back();

        // if (document.referrer)
        // {
        //    location.href = document.referrer;
        // }
        // else
        // {
        //    window.history.back();
        // }
    },
    /*endregion*/

    /*region 函数:close()*/
    /**
    * 关闭窗口
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
        catch (ex)
        {
            window.close();
        }
    },
    /*endregion*/

    /*region 函数:refreshParentWindow()*/
    /**
    * 刷新父级窗口.
    * @method refreshParentWindow
    * @memberof x.page
    */
    refreshParentWindow: function()
    {
        if (typeof (window.opener) == 'object')
        {
            x.debug.error('未定义父级窗口。');
        }

        // 如果有父级窗口，调用父级窗口刷新函数
        if (x.type(window.opener) == 'object' && x.isFunction(window.opener.window$refresh$callback))
        {
            window.opener.window$refresh$callback();
        }
        else
        {
            x.debug.log('父级窗口未定义 window$refresh$callback() 函数。');
        }
    },
    /*endregion*/

    /**
    * 获取页面范围信息
    * @method getRange
    * @memberof x.page
    */
    getRange: function()
    {
        var pageWidth, pageHeight, windowWidth, windowHeight;

        var xScroll, yScroll;

        if (window.innerHeight && window.scrollMaxY)
        {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        }
        else if (document.body.scrollHeight > document.body.offsetHeight)
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

        if (window.innerHeight)
        {
            // all except Explorer
            if (document.documentElement.clientWidth)
            {
                windowWidth = document.documentElement.clientWidth;
            }
            else
            {
                windowWidth = window.innerWidth;
            }

            windowHeight = window.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight)
        {
            // IE
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        }
        else if (document.body)
        {
            // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight)
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
        if (xScroll < windowWidth)
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
        // return document.documentElement.clientHeight;
        return x.page.getRange().windowHeight;
    },

    /*
    * 获取页面可视区域宽度
    */
    getViewWidth: function()
    {
        // return document.documentElement.clientWidth;
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

        for (var i = 0; i < parents.length; i++)
        {
            var parent = $(parents[i]);

            if (parent.css('position') === 'absolute' && parent.css('top') !== 'auto')
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
        if (display != 'none' && display != null)
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
        if (text == null) { return ''; }

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
            if ($(document.getElementById('forbidCopy$activate')).val() === '1')
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

            if (document.layers)
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

            if (document.all)
            {
                if (event.button == 1 || event.button == 2 || event.button == 3)
                {
                    window.document.oncontextmenu = function() { return false; }
                }
            }

            if (document.layers)
            {
                if (event.which == 3)
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

            for (var i = 0; i < hotkeys.length; i++)
            {
                if (hotkeys[i] == event.keyCode)
                {
                    result = true;
                    break;
                }
            }

            // event.shiftKey | event.altKey | event.ctrlKey
            if (event.ctrlKey || result)
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
    newPagesHelper: function(pageSize)
    {
        if (pageSize === undefined || pageSize === '') { pageSize = 10; }

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

            whereClause: '',

            orderBy: '',

            /*
            * 加载对象信息
            */
            load: function(pages)
            {
                if (typeof (pages.pageSize) != 'undefined') { this.pageSize = Number(pages.pageSize); }

                if (typeof (pages.rowCount) != 'undefined') { this.rowCount = Number(pages.rowCount); }

                if (typeof (pages.rowIndex) != 'undefined') { this.rowIndex = Number(pages.rowIndex); }

                if (typeof (pages.firstPage) != 'undefined') { this.firstPage = Number(pages.firstPage); }

                if (typeof (pages.previousPage) != 'undefined') { this.previousPage = Number(pages.previousPage); }

                if (typeof (pages.nextPage) != 'undefined') { this.nextPage = Number(pages.nextPage); }

                if (typeof (pages.lastPage) != 'undefined') { this.lastPage = Number(pages.lastPage); }

                if (typeof (pages.whereClause) != 'undefined') { this.whereClause = pages.whereClause; }

                if (typeof (pages.orderBy) != 'undefined') { this.orderBy = pages.orderBy; }
            },

            /*
            * 设置上一页的参数.
            */
            setPreviousPage: function(value)
            {
                this.previousPage = value - 1;

                if (this.previousPage < 1)
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

                if (this.nextPage > this.lastPage)
                {
                    this.nextPage = this.lastPage;
                }
            },

            /**
            * 设置页数
            */
            getPagesNumber: function(format, value, length)
            {
                // may be overwrite here. ^_^
                //
                // x.page.newPagesHelper.prototype.getPagesNumber
                //

                var outString = '';

                var page = value;

                var counter;

                if (value - length > 0)
                {
                    value -= length;
                }
                else
                {
                    value = 1;
                }

                counter = value + (length * 2) + 1;

                if (counter > this.lastPage)
                {
                    value = this.lastPage - (length * 2);
                }

                for (var i = value; i < counter; i++)
                {
                    if (i < 1) { continue; }

                    if (i > this.lastPage) { break; }

                    if (format.indexOf('{0}') > -1)
                    {
                        outString += '<a href="' + format.replace('{0}', i) + '" >';
                    }
                    else
                    {
                        outString += '<a href="javascript:' + format + '(' + i + ');" >';
                    }

                    outString += ((page == i) ? ('<strong>' + i + '</strong>') : i);
                    outString += '</a> ';
                }

                return outString;
            },

            /**
            * 解析为分页菜单信息
            */
            tryParseMenu: function(format)
            {
                var outString = '';

                outString += '<div class="nav-pager" >';
                outString += '<div class="nav-pager-1" >';
                outString += '共有' + this.rowCount + '条信息 当前' + (this.rowIndex + 1) + '-' + (this.rowIndex + this.pageSize) + '信息 ';

                if (format.indexOf('{0}') > -1)
                {
                    outString += '<a href="' + format.replace('{0}', this.firstPage) + '">首页</a> ';
                    outString += '<a href="' + format.replace('{0}', this.previousPage) + '">上一页</a> ';
                    outString += this.getPagesNumber(format, this.currentPage, 2)
                    outString += '<a href="' + format.replace('{0}', this.nextPage) + '">下一页</a> ';
                    outString += '<a href="' + format.replace('{0}', this.lastPage) + '">末页</a> ';
                }
                else
                {
                    outString += '<a href="javascript:' + format + '(' + this.firstPage + ');">首页</a> ';
                    outString += '<a href="javascript:' + format + '(' + this.previousPage + ');">上一页</a> ';
                    outString += this.getPagesNumber(format, this.currentPage, 2)
                    outString += '<a href="javascript:' + format + '(' + this.nextPage + ');">下一页</a> ';
                    outString += '<a href="javascript:' + format + '(' + this.lastPage + ');">末页</a> ';
                }

                outString += '</div>';
                outString += '<div class="clear" ></div>';
                outString += '</div>';

                return outString;
            },

            toXml: function()
            {
                var outString = '';

                outString += '<pages>';
                outString += '<rowIndex>' + this.rowIndex + '</rowIndex>';
                outString += '<pageSize>' + this.pageSize + '</pageSize>';
                outString += '<rowCount>' + this.rowCount + '</rowCount>';
                outString += '<pageCount>' + this.pageCount + '</pageCount>';
                outString += '<currentPage>' + this.currentPage + '</currentPage>';
                outString += '<firstPage>' + this.firstPage + '</firstPage>';
                outString += '<previousPage>' + this.previousPage + '</previousPage>';
                outString += '<nextPage>' + this.nextPage + '</nextPage>';
                outString += '<lastPage>' + this.lastPage + '</lastPage>';
                outString += '<whereClause><![CDATA[' + this.whereClause + ']]></whereClause>';
                outString += '<orderBy><![CDATA[' + this.orderBy + ']]></orderBy>';
                outString += '</pages>';

                return outString;
            }
        };

        return helper;
    }
}
