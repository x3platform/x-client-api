// -*- ecoding=utf-8 -*-

/**
* @namespace dom
* @memberof x
* @description 页面元素管理
*/
var dom = x.dom = function(selector, context)
{
    return new dom.fn.init(selector, context);
};

dom.fn = dom.prototype;

dom.fn.init = function()
{
    var that = this;

    this.results = x.queryAll.apply(x.queryAll, arguments);

    x.each(this.results, function(index, node)
    {
        that[index] = node;
    });

    return this;
};

dom.fn.init.prototype = dom.fn;

// 扩展对象的方法
dom = x.ext(dom, {

    /*#region 函数:query(selector)*/
    /**
    * 精确查询单个表单元素，返回一个jQuery对象。
    * @method query
    * @memberof dom
    * @param {string} selector 选择表达式
    */
    query: function(selector)
    {
        // 默认根据id查找元素
        if (selector.indexOf('#') == -1 && selector.indexOf('.') == -1 && selector.indexOf(' ') == -1) { selector = '[id="' + selector + '"]'; }

        var result = x.query(selector);

        // $(null) 会返回 整个文档对象，所以定义一个特殊 __null__ 变量替代空值。
        return result === null ? $('#__null__') : $(result);
    },
    /*#endregion*/

    nodes: function(html)
    {
        var list = [];

        var tmp = document.createElement('div');

        tmp.innerHTML = html;

        for (var i = 0; i < tmp.childNodes.length; i++)
        {
            list[list.length] = tmp.childNodes[i].cloneNode(true);
        }

        return list;
    },

    /*#region 函数:on(target, type, listener, useCapture)*/
    /**
    * 添加事件监听器 x.event.add 的别名
    * @method add
    * @memberof x
    * @param {string} target 监听对象
    * @param {string} type 监听事件
    * @param {string} listener 处理函数
    * @param {string} [useCapture] 监听顺序方式
    */
    on: function(target, type, listener, useCapture)
    {
        return x.event.add(target, type, listener, useCapture);
    },
    /*#endregion*/

    /*#region 函数:off(target, type, listener, useCapture)*/
    /**
    * 移除事件监听器 x.event.remove 的别名
    * @method add
    * @memberof x
    * @param {string} target 监听对象
    * @param {string} type 监听事件
    * @param {string} listener 处理函数
    * @param {string} [useCapture] 监听顺序方式
    */
    off: function(target, type, listener, useCapture)
    {
        return x.event.add(target, type, listener, useCapture);
    },
    /*#endregion*/

    /*#region 函数:attr(id, name, value)*/
    /**
    * 获取或设置元素的属性信息
    * @method attr
    * @memberof dom
    * @param {string} id 元素 Id
    */
    attr: function(id, name, value)
    {
        var node = null;

        if (x.type(arguments[0]).indexOf('html') == 0)
        {
            // Html 元素类型 直接返回
            node = arguments[0];
        }
        else if (x.type(arguments[0]) == 'string')
        {
            node = document.getElementById(id);
        }

        if (node == null) { return null; }

        if (x.isUndefined(value))
        {
            return node.getAttribute(name);
        }
        else
        {
            node.setAttribute(name, value);
        }
    },
    /*#endregion*/

    /*#region 函数:options(id)*/
    /**
    * 获取元素的选项配置信息
    * @method options
    * @memberof dom
    * @param {string} id 元素 Id
    */
    options: function(id)
    {
        var value = dom.attr(id, 'x-dom-options');

        return (x.isUndefined(value) || value == null || value == '') ? {} : x.toJSON(value);
    },
    /*#endregion*/

    // 追加 html 标记
    append: function(element, html)
    {
        var nodes = dom.nodes(html);

        for (var i = 0; i < nodes.length; i++)
        {
            element.appendChild(nodes[i]);
        }

        return element;
    },

    // 创建包裹层
    wrap: function(element, html)
    {
        var tmp = document.createElement('div');

        tmp.innerHTML = html;
        tmp = tmp.children[0];

        var _element = element.cloneNode(true);

        tmp.appendChild(_element);
        element.parentNode.replaceChild(tmp, element);

        return tmp;
    },

    before: function(element, html)
    {
        var nodes = dom.nodes(html);

        for (var i = 0; i < nodes.length; i++)
        {
            element.parentNode.insertBefore(nodes[i], element);
        }

        return element;
    },

    after: function(element, html)
    {
        var nodes = dom.nodes(html);

        for (var i = 0; i < nodes.length; i++)
        {
            element.parentNode.insertBefore(nodes[i], element.nextSibling);
        }

        return element;
    },

    /*#region 函数:swap(options)*/
    /**
    * 交换控件的数据
    * @method swap
    * @memberof dom
    * @param {object} options 选项
    */
    swap: function(options)
    {
        var fromInput = dom.query(options.from);
        var toInput = dom.query(options.to);

        x.each(options.attributes, function(index, node)
        {
            if (fromInput.attr(node))
            {
                toInput.attr(node, fromInput.attr(node));

                fromInput.removeAttr(node);
            }
        });
    },
    /*#endregion*/

    /*#region 函数:fixed(selector, pointX, pointY)*/
    /**
    * 设置元素的位置
    * @method fixed
    * @memberof dom
    * @param {string} selector 选择表达式
    * @param {number} pointX X坐标
    * @param {number} pointY Y坐标
    */
    fixed: function(selector, pointX, pointY)
    {
        dom.css(selector, {
            'position': 'fixed',
            'left': pointX + 'px',
            'top': pointY + 'px'
        });
    },
    /*#endregion*/

    /*#region 函数:setOpacity(selector, value)*/
    /**
    * 设置容器的透明度
    * @method setOpacity
    * @memberof dom
    * @param {string} selector 选择表达式
    * @param {number} value 透明度范围(0.00 ~ 1.00)
    */
    setOpacity: function(selector, value)
    {
        var element = x.query(selector);

        if (x.browser.ie && element.style.filter)
        {
            // IE
            element.style.filter = 'alpha(opacity:' + value + ')';
        }
        else
        {
            //其他浏览器
            element.style.opacity = value / 100;
        }
    },
    /*#endregion*/

    utils: {},

    hooks: {},

    features: {
        // 默认配置信息
        defaults: {
            // 特性属性名称
            scope: 'input,textarea,div,span',
            // 脚本文件夹位置
            featureScriptFilePath: '',
            // 特性属性名称
            featureAttributeName: 'x-dom-feature',
            // 特性是否已加载标识属性名称
            featureLoadedAttributeName: 'x-dom-feature-loaded',
            // 监听函数, 参数 element 页面元素
            listen: null
        },

        /**
        * 绑定客户端控件
        */
        bind: function(options)
        {
            options = x.ext(dom.features.defaults, options || {});

            if (x.isUndefined || options.featureScriptPath == '')
            {
                options.featureScriptPath = x.dir() + 'dom/features/';
            }

            var tags = options.scope.split(',');

            x.each(tags, function(index, node)
            {
                var list = document.getElementsByTagName(node);

                for (var i = 0; i < list.length; i++)
                {
                    if (x.isFunction(options.listen))
                    {
                        options.listen(list[i]);
                    }

                    /*
                    try
                    {
                    if ($(list[i]).hasClass('custom-forms-data-required') || $(list[i]).hasClass('custom-forms-data-regexp'))
                    {
                    if (options.tooltip)
                    {
                    // x.ui.tooltip.newWarnTooltip({ element: list[i].id, hide: 1 });
                    }
                    }
                    }
                    catch (ex)
                    {
                    x.debug.error(ex);
                    }
                    */
                    try
                    {
                        if (x.isUndefined(list[i].id) || list[i].id === '')
                        {
                            continue;
                        }

                        var feature = dom('#' + list[i].id).attr(options.featureAttributeName);

                        if (feature != null && dom('#' + list[i].id).attr(options.featureLoadedAttributeName) != '1')
                        {
                            feature = x.camelCase(feature);

                            x.require({
                                id: 'x-dom-feature-' + feature + '-script',
                                path: options.featureScriptPath + 'x.dom.features.' + feature + '.js',
                                data: { target: list[i], feature: feature },
                                callback: function(context)
                                {
                                    // x.debug.log('feature:' + feature + ',' + response.data.feature);
                                    var data = context.data;

                                    // 加载完毕后, 加个 featureLoaded 标识, 避免重复加载效果.
                                    dom('#' + data.target.id).attr(options.featureLoadedAttributeName, '1');

                                    if (x.isUndefined(dom.features[data.feature]))
                                    {
                                        x.debug.error('x.dom.features.bind() 异常:系统加载表单元素特性【' + data.feature + '】失败，请检查相关配置。');
                                    }

                                    dom.features[data.feature].bind(data.target.id);
                                }
                            });

                            /*
                            // 加载完毕后, 加个 featureLoaded 标识, 避免重复加载效果.
                            dom.query(list[i].id).attr(options.featureLoadedAttributeName, '1');

                            if (x.isUndefined(dom.features[feature]))
                            {
                            x.debug.error('dom.features.bind() 异常:系统加载表单元素特性【' + feature + '】失败，请检查相关配置。');
                            continue;
                            }

                            dom.features[feature].bind(list[i].id);
                            */
                        }
                    }
                    catch (ex)
                    {
                        x.debug.error(ex)
                    }
                }
            });
        }
    }
});

// DOM 扩展设置类方法
x.each(['on', 'off', 'append', 'before', 'after', 'wrap'], function(index, name)
{
    dom.fn[name] = function()
    {
        for (var i = 0; i < this.results.length; i++)
        {
            var args = Array.prototype.slice.call(arguments).slice(0);

            args.unshift(this.results[i]);

            dom[name].apply(this, args);
        }

        return this;
    };
});

// DOM 扩展获取类方法
x.each(['attr', 'options'], function(index, name)
{
    dom.fn[name] = function()
    {
        if (this.results.length > 0)
        {
            var args = Array.prototype.slice.call(arguments).slice(0);

            args.unshift(this.results[0]);

            return dom[name].apply(this, args);
        }
    };
});

// ready 准备函数

x.ext(dom, {
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // 准备事件列表
    readyList: [],

    // DOM 加载完毕后执行
    ready: function()
    {
        // 简化调用方法 x.dom(document).ready(fn) => x.dom.ready(fn)
        if (x.isFunction(arguments[0]))
        {
            return dom(document).ready(arguments[0]);
        }

        // Abort if there are pending holds or we're already ready
        if (dom.isReady)
        {
            return;
        }

        // Remember that the DOM is ready
        dom.isReady = true;

        // If there are functions bound, to execute
        if (dom.readyList)
        {
            // Execute all of them
            x.each(dom.readyList, function()
            {
                this.call(document);
            });

            // Reset the list of functions
            dom.readyList = null;
        }
    }
});

dom.fn.ready = function(fn)
{
    // Attach the listeners
    bindReady();

    if (dom.isReady)
    {
        // If the DOM is already ready
        // Execute the function immediately
        // fn.call(document, dom);
        completed();
    }
    else
    {
        // Otherwise, remember the function for later
        // Add the function to the wait list
        dom.readyList.push(fn);
    }
    return this;
};

// 执行准备函数并且移除事件
function completed()
{
    // 支持旧版的 IE : readyState === "complete"
    if (document.addEventListener || event.type === "load" || document.readyState === "complete")
    {
        if (document.addEventListener)
        {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);
        }
        else
        {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }

        dom.ready();
    }
}

// 界限
var readyBound = false;

function bindReady()
{
    if (readyBound) return;

    readyBound = true;

    if (document.readyState === "complete")
    {
        // 处理异步的文档加载情况, 允许直接执行函数
        setTimeout(dom.ready);
    }
    else if (document.addEventListener)
    {
        // 支持 DOMContentLoaded 的标准浏览器

        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed, false);
    }
    else if (document.attachEvent)
    {
        // If IE event model is used

        // ensure firing before onload,
        // maybe late but safe also for iframes
        // Ensure firing before onload, maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", completed);

        window.attachEvent("onload", completed);

        // If IE and not an iframe
        // continually check to see if the document is ready
        if (document.documentElement.doScroll && window == window.top) (function()
        {
            if (dom.isReady) return;

            try
            {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            }
            catch (error)
            {
                setTimeout(arguments.callee, 0);
                return;
            }

            // and execute any waiting functions
            dom.ready();
        })();
    }
}