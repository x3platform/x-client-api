// -*- ecoding=utf-8 -*-

/**
* @namespace x
* @description 默认根命名空间
*/
var x = {
    defaults: {
        // 默认消息提示方式
        msg: function(text) { alert(text); }
    },

    msg: function(text) { x.defaults.msg(text) },

    /*#region 函数:type(object)*/
    /**
    * 检查对象类型
    * @method type
    * @memberof x
    */
    type: function(object)
    {
        try
        {
            if (typeof (object) === 'undefined') { return 'undefined'; }
            if (object === null) { return 'null'; }

            return /\[object ([A-Za-z]+)\]/.exec(Object.prototype.toString.call(object))[1].toLowerCase();
        }
        catch (ex)
        {
            if (ex instanceof RangeError) { return '...'; }

            throw ex;
        }
    },
    /*#endregion*/

    /*#region 函数:isArray(object)*/
    /**
    * 判断对象是否是 Array 类型
    * @method isArray
    * @memberof x
    */
    isArray: function(object)
    {
        return x.type(object) === 'array';
    },
    /*#endregion*/

    /*#region 函数:isFunction(object)*/
    /**
    * 判断对象是否是 Function 类型
    * @method isFunction
    * @memberof x
    */
    isFunction: function(object)
    {
        return x.type(object) === 'function';
    },
    /*#endregion*/

    /*#region 函数:isString(object)*/
    /**
    * 判断对象是否是 String 类型
    * @method isString
    * @memberof x
    */
    isString: function(object)
    {
        return x.type(object) === 'string';
    },
    /*#endregion*/

    /*#region 函数:isNumber(object)*/
    /**
    * 判断对象是否是 Number 类型
    * @method inspect
    * @memberof Object
    */
    isNumber: function(object)
    {
        return x.type(object) === 'number';
    },
    /*#endregion*/

    /*#region 函数:isUndefined(value, replacementValue)*/
    /*
    * 判断是否是 undefined 类型, 如果 undefined 则使用替换的值
    * @method isUndefined
    * @memberof x
    * @param {object} value 值
    * @param {string} replacementValue 替换的值
    */
    isUndefined: function(object, replacementValue)
    {
        if (arguments.length == 2)
        {
            // 如果设置了 replacementValue 值, 则当对象是 undefined 值时, 返回替换值信息
            return (x.type(object) === 'undefined') ? replacementValue : object;
        }
        else
        {
            return x.type(object) === 'undefined';
        }
    },
    /*#endregion*/

    /**
    * 浏览器
    * @class browser
    * @memberof x
    */
    browser: {
        /** 
        * 判断是否是 Internet Explorer 浏览器
        * @member {bool} ie 
        * @memberof x.browser
        * @example
        * // returns true or false
        * x.browser.ie;
        */
        ie: !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
        /** 
        * 判断是否是 Webkit 浏览器
        * @member {bool} webkit 
        * @memberof x.browser
        * @example
        * // returns true or false
        * x.browser.webkit;
        */
        webkit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        /** 
        * 判断是否是 Gecko 浏览器
        * @member {bool} gecko 
        * @memberof x.browser
        * @example
        * // returns true or false
        * x.browser.gecko;
        */
        gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
        /** 
        * 判断是否是 Opera 浏览器
        * @member {bool} opera 
        * @memberof x.browser
        * @example
        * // returns true or false
        * x.browser.opera;
        */
        opera: navigator.userAgent.indexOf('Opera') > -1,
        /** 
        * 判断是否是 Mobile Safari 浏览器
        * @member {bool} mobilesafari 
        * @memberof x.browser
        * @example
        * // returns true or false
        * x.browser.mobilesafari;
        */
        mobilesafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),

        /*#region 函数:current()*/
        /** 
        * 获取当前浏览器的名称和版本
        * @method getVersion 
        * @memberof x.browser
        * @example
        * x.browser.current();
        */
        current: function()
        {
            return { name: x.browser.getName(), version: x.browser.getVersion() };
        },
        /*#endregion*/

        /*#region 函数:getName()*/
        /** 
        * 获取当前浏览器的名称
        * @method getName 
        * @memberof x.browser
        * @example
        * x.browser.getName();
        */
        getName: function()
        {
            if (navigator.userAgent.indexOf("MSIE") > 0)
                return "Internet Explorer";
            if (navigator.userAgent.indexOf("Chrome") >= 0)
                return "Chrome";
            if (navigator.userAgent.indexOf("Firefox") >= 0)
                return "Firefox";
            if (navigator.userAgent.indexOf("Opera") >= 0)
                return "Opera";
            if (navigator.userAgent.indexOf("Safari") > 0)
                return "Safari";
            if (navigator.userAgent.indexOf("Camino") > 0)
                return "Camino";
            if (navigator.userAgent.indexOf("Gecko") > 0)
                return "Gecko";

            return "unknown";
        },
        /*#endregion*/

        /*#region 函数:getVersion()*/
        /** 
        * 获取当前浏览器的版本
        * @method getVersion 
        * @memberof x.browser
        * @example
        * x.browser.getVersion();
        */
        getVersion: function()
        {
            var browserName = x.browser.getName();

            var version = navigator.userAgent;

            var startValue;
            var lengthValue;

            switch (browserName)
            {
                case "Internet Explorer":
                    startValue = version.indexOf("MSIE") + 5;
                    lengthValue = 3;
                    version = version.substr(startValue, lengthValue);
                    break;
                case "Firefox":
                    startValue = version.indexOf("Firefox") + 8;
                    lengthValue = 3;
                    version = version.substr(startValue, lengthValue);
                    break;
                case "Opera":
                    startValue = version.indexOf("Opera") + 6;
                    lengthValue = 3;
                    version = version.substr(startValue, lengthValue);
                    break;
                case "Safari":
                    break;
                case "Camino":
                    break;
                case "Gecko":
                    break;
                default:
                    break;
            }

            return version;
        }
        /*#endregion*/
    },

    /**
    * 浏览器特性
    * @class browserFeatures
    * @memberof x
    */
    browserFeatures: {
        /**
        * Selector 特性, 支持 querySelector, querySelectorAll
        * @class Selector
        * @memberof x.browserFeatures
        */
        Selector: !!document.querySelector,
        /**
        * SuportsTouch 特性, 支持触摸事件
        * @class SuportsTouch
        * @memberof x.browserFeatures
        */
        SuportsTouch: ("createTouch" in document),
        /**
        * XPath 特性
        * @class XPath
        * @memberof x.browserFeatures
        */
        XPath: !!document.evaluate,

        ElementExtensions: !!window.HTMLElement,
        SpecificElementExtensions:
		        document.createElement('div')['__proto__']
                && document.createElement('div')['__proto__'] !== document.createElement('form')['__proto__']
    },

    /**
    * @namespace mask
    * @memberof x.ui
    * @description UI 名称空间
    */
    ui: {
        // 样式名称前缀
        classNamePrefix: 'x-ui',
        // 样式表路径前缀
        stylesheetPathPrefix: '/resources/styles/x-ui/'
    },

    // 脚本代码片段
    scriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',

    // 脚本代码片段
    jsonFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

    // 一种简单的方法来检查HTML字符串或ID字符串
    quickExpr: /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,

    // Is it a simple selector
    isSimple: /^.[^:#\[\.,]*$/,

    /**
    * 空操作
    */
    noop: function() { },

    /**
    * 加载脚本
    */
    require: function(options)
    {
        var context = x.ext({
            id: '',
            path: '',
            onScriptLoad: function(event)
            {
                var node = x.event.getTarget(event);

                if (event.type === 'load' || /^(complete|loaded)$/.test(node.readyState))
                {
                    node.ready = true;

                    // x.debug.log('load');
                    // console.log(context);
                    context.callback(context);
                }
            }
        }, options || {});

        var head = document.getElementsByTagName('head')[0];

        var node = document.getElementById(context.id);

        if (node == null)
        {
            if (context.fileType == 'css')
            {
                var node = document.createElement("link");

                node.id = context.id;
                node.type = "text/css";
                node.rel = "stylesheet";
                node.href = context.path;
            }
            else
            {
                var node = document.createElement("script");

                node.id = context.id;
                node.type = "text/javascript";
                node.async = true;
                node.src = context.path;
            }

            if (x.isFunction(context.callback))
            {
                if (node.attachEvent &&
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera)
                {
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273

                    x.event.add(node, 'readystatechange', context.onScriptLoad);
                }
                else
                {
                    x.event.add(node, 'load', context.onScriptLoad);
                }
            }

            head.appendChild(node);
        }
        else
        {
            if (x.isFunction(context.callback))
            {
                if (node.ready)
                {
                    // x.debug.log('callbak');
                    // x.debug.log(context);

                    context.callback(context);
                }
                else
                {
                    if (node.attachEvent &&
                        !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                        !isOpera)
                    {
                        x.event.add(node, 'readystatechange', context.onScriptLoad);
                    }
                    else
                    {
                        x.event.add(node, 'load', context.onScriptLoad);
                    }
                }
            }
        }
    },

    /**
    * 注册对象信息
    * @method register
    * @memberof x
    */
    register: function(value)
    {
        var parts = value.split(".");

        var root = window;

        for (var i = 0; i < parts.length; i++)
        {
            if (typeof root[parts[i]] === "undefined")
            {
                root[parts[i]] = {};
            }

            root = root[parts[i]];
        }

        return root;
    },

    /*#region 函数:ext(destination, source)*/
    /**
    * 将原始对象的属性和方法扩展至目标对象
    * @method ext
    * @memberof x
    * @param destination 目标对象
    * @param source 原始对象
    */
    ext: function(destination, source)
    {
        for (var property in source)
        {
            destination[property] = source[property];
        }

        return destination;
    },
    /*#endregion*/

    /*#region 函数:clone(object)*/
    /**
    * 克隆对象
    * @method clone
    * @memberof x
    * @returns {object} 克隆的对象
    */
    clone: function(object)
    {
        return x.ext({}, object);
    },
    /*#endregion*/

    /*#region 函数:invoke(object, fun)*/
    /**
    * 执行对象方法
    * @method invoke
    * @memberof x
    */
    invoke: function(object, fun)
    {
        // 注:数组的 slice(start, end) 方法可从已有的数组中返回选定的元素。
        var args = Array.prototype.slice.call(arguments).slice(2);

        return fun.apply(object, args);
    },
    /*#endregion*/

    /*#region 函数:call(anything)*/
    /*
    * 调用方法或者代码文本
    * @method call
    * @memberof x
    */
    call: function(anything)
    {
        if (!x.isUndefined(anything))
        {
            if (x.type(anything) === 'function')
            {
                return anything();
            }
            else if (x.type(anything) === 'string')
            {
                if (anything !== '') { return eval(anything); }
            }
        }
    },
    /*#endregion*/

    /*#region 函数:query(selector)*/
    /**
    * 精确查询单个表单元素。
    * @method query
    * @memberof x.form
    * @param {string} selector 选择表达式
    */
    query: function(selector)
    {
        if (x.type(selector).indexOf('html') == 0)
        {
            // Html元素类型 直接返回
            return selector;
        }
        else if (x.type(selector) == 'string')
        {
            /*
            // 由 Sizzle 引擎替代以下功能
            var element = document.getElementById(selector);

            // 支持 querySelector 方法查找元素
            if (element == null && x.browserFeatures.Selector &&
            (selector.indexOf('#') > -1 || selector.indexOf('.') > -1 || selector.indexOf(' ') > -1))
            {
            element = document.querySelector(selector);
            }

            return element;
            */

            var results = Sizzle.apply(window, Array.prototype.slice.call(arguments, 0));

            return (results.length == 0) ? null : results[0];
        }
    },
    /*#endregion*/

    /*#region 函数:each(data, callback)*/
    /**
    * 遍历元素对象, 如果需要退出返回 false
    * @method query
    * @memberof x
    * @param {Object} data 对象
    * @param {Function} callback 回调函数
    */
    each: function(data, callback)
    {
        var name, i = 0, length = data.length;

        if (length === undefined)
        {
            // 默认对象
            for (name in data)
            {
                if (callback.call(data[name], name, data[name]) === false) { break; }
            }
        }
        else
        {
            // 数组对象
            for (var value = data[0]; i < length && callback.call(value, i, value) != false; value = data[++i]) { }
        }

        return data;
    },
    /*#endregion*/

    /*#region 函数:toJSON(text)*/
    /**
    * 将字符串转换为JSON对象
    * @method toJSON
    * @memberof x
    * @param {string} text JSON对象的文本格式
    */
    toJSON: function(text)
    {
        if (x.type(text) === 'object') { return text; }

        // 类型为 undefined 时或者字符串内容为空时, 返回 undefined 值.
        if (x.isUndefined(text) || text === '') { return undefined; }

        return eval('(' + text + ')');
    },
    /*#endregion*/

    /*#region 函数:toSafeJSON(text)*/
    /**
    * 将普通文本信息转换为安全的符合JSON格式规范的文本信息
    * @method toSafeJSON
    * @memberof x
    * @param {string} text 文本信息
    */
    toSafeJSON: function(text)
    {
        var outString = '';

        for (var i = 0; i < text.length; i++)
        {
            var ch = text.substr(i, 1);

            if (ch === '"' || ch === '\'' || ch === '\\')
            {
                outString += '\\';
                outString += ch;
            }
            else if (ch === '\b')
            {
                outString += '\\b';
            }
            else if (ch === '\f')
            {
                outString += '\\f';
            }
            else if (ch === '\n')
            {
                outString += '\\n';
            }
            else if (ch === '\t')
            {
                outString += '\\t';
            }
            else if (ch === '\r')
            {
                outString += '\\r';
            }
            else
            {
                outString += ch;
            }
        }

        return outString;
    },
    /*#endregion*/

    /*#region 函数:toSafeLike(text)*/
    /**
    * 将字符串中特殊字符([%_)转换为可识别的Like内容.
    * @method toSafeLike
    * @memberof x
    * @param {string} text 文本信息
    */
    toSafeLike: function(text)
    {
        return text.replace(/\[/g, '[[]').replace(/%/g, '[%]').replace(/_/g, '[_]');
    },
    /*#endregion*/

    /*#region 函数:formatNature(text)*/
    /**
    * 将字符串统一转换为本地标识标识
    * @method formatNature
    * @memberof x
    * @param {string} text 文本信息
    */
    formatNature: function(text)
    {
        switch (text.toLowerCase())
        {
            case 'en-us':
                text = 'en-us';
                break;
            case 'zh-cn':
                text = 'zh-cn';
                break;
            default:
                text = 'zh-cn';
                break;
        }

        return text;
    },
    /*#endregion*/

    /*#region 函数:getFriendlyName(name)*/
    /**
    * 将不规范的标识名称转换为友好的名称.
    * @method getFriendlyName
    * @memberof x
    * @param {string} name 名称
    * @example
    * // 将路径中的[.-/]符号替换为[$]符号
    * console.log(x.getFriendlyName(location.pathname));
    */
    getFriendlyName: function(name)
    {
        return 'x' + name.replace(/[\.\/-]/g, '$').replace(/\$\$/g, '$');
    },
    /*#endregion*/

    /*#region 类:newHashTable()*/
    /**
    * 哈希表
    * @class HashTable 哈希表
    * @constructor newHashTable
    * @memberof x
    * @example
    * // returns HashTable
    * var hashtable = x.newHashTable();
    */
    newHashTable: function()
    {
        var hashTable = {

            // 内部数组对象
            innerArray: [],

            /*#region 函数:clear()*/
            /**
            * 清空哈希表
            * @method clear
            * @memberof x.newHashTable#
            */
            clear: function()
            {
                this.innerArray = [];
            },
            /*#endregion*/

            /*#region 函数:exist(key)*/
            /**
            * 判断是否已存在相同键的对象
            * @method exist
            * @memberof x.newHashTable#
            * @returns {bool}
            */
            exist: function(key)
            {
                for (var i = 0; i < this.innerArray.length; i++)
                {
                    if (this.innerArray[i].name === key)
                    {
                        return true;
                    }
                }

                return false;
            },
            /*#endregion*/

            /*#region 函数:get(index)*/
            /**
            * @method get
            * @memberof x.newHashTable#
            */
            get: function(index)
            {
                return this.innerArray[index];
            },
            /*#endregion*/

            /*#region 函数:add(key, value)*/
            /**
            * @method add
            * @memberof x.newHashTable#
            */
            add: function(key, value)
            {
                if (arguments.length === 1)
                {
                    var keyArr = key.split(';');

                    for (var i = 0; i < keyArr.length; i++)
                    {
                        var valueArr = keyArr[i].split('#');

                        this.innerArray.push(x.types.newListItem(valueArr[0], valueArr[1]));

                    }
                }
                else
                {
                    if (this.exist(key))
                    {
                        throw 'hashtable aleardy exist same key[' + key + ']';
                    }
                    else
                    {
                        this.innerArray.push(x.types.newListItem(key, value));
                    }
                }
            },
            /*#endregion*/

            /*#region 函数:find(key)*/
            /**
            * @method find
            * @memberof x.newHashTable#
            */
            find: function(key)
            {
                for (var i = 0; i < this.innerArray.length; i++)
                {
                    if (this.innerArray[i].name === key)
                    {
                        return this.innerArray[i].value;
                    }
                }

                return null;
            },
            /*#endregion*/

            /*#region 函数:size()*/
            /**
            * 获取哈希表的当前大小
            * @method size
            * @memberof x.newHashTable#
            */
            size: function()
            {
                return this.innerArray.length;
            }
            /*#endregion*/
        };

        return hashTable;
    },
    /*#endregion*/

    /*#region 类:newQueue()*/
    /**
    * 队列
    * @description 创建 Queue 对象
    * @class Queue
    * @constructor newQueue
    * @memberof x
    */
    newQueue: function()
    {
        var queue = {

            // 内部数组对象
            innerArray: [],

            /**
            * 插入队列顶部元素
            * @method push
            * @memberof x.newQueue#
            */
            push: function(targetObject)
            {
                this.innerArray.push(targetObject);
            },
            /*#endregion*/

            /**
            * 弹出队列顶部元素
            * @method pop
            * @memberof x.newQueue#
            */
            pop: function()
            {
                if (this.innerArray.length === 0)
                {
                    return null;
                }
                else
                {
                    var targetObject = this.innerArray[0];

                    // 将队列元素往前移动一个单位
                    for (var i = 0; i < this.innerArray.length - 1; i++)
                    {
                        this.innerArray[i] = this.innerArray[i + 1];
                    }

                    this.innerArray.length = this.innerArray.length - 1;

                    return targetObject;
                }
            },
            /*#endregion*/

            /**
            * 取出队列底部元素(并不删除队列底部元素)
            */
            peek: function()
            {
                if (this.innerArray.length === 0)
                {
                    return null;
                }

                return this.innerArray[0];
            },
            /*#endregion*/

            /*#region 函数:clear()*/
            /**
            * 清空堆栈
            <<<<<<< HEAD
            * @method clear
            =======
            * @method isEmpty
            >>>>>>> 86d619ad16f6d4840df8ba2f3eaae9c8014fd094
            * @memberof x.newQueue#
            */
            clear: function()
            {
                this.innerArray.length = 0; //将元素的个数清零即可
            },
            /*#endregion*/

            /*#region 函数:size()*/
            /**
            * 获得线性队列当前大小
            * @method size
            * @memberof x.newQueue#
            */
            size: function()
            {
                return this.innerArray.length;
            },
            /*#endregion*/

            /*#region 函数:isEmpty()*/
            /*
            * 判断一个线性队列是否为空
            * @method isEmpty
            * @memberof x.newQueue#
            */
            isEmpty: function()
            {
                return (this.innerArray.length === 0) ? true : false;
            }
            /*#endregion*/
        };

        return queue;
    },
    /*#endregion*/

    /*#region 类:newStack()*/
    /**
    * 栈
    * @description 创建 Stack 对象
    * @class Stack
    * @constructor newStack
    * @memberof x
    */
    newStack: function()
    {
        var stack = {

            // 内部数组对象
            innerArray: [],

            /*
            * 插入栈顶元素
            */
            push: function(targetObject)
            {
                this.innerArray[this.innerArray.length] = targetObject;
            },
            /*#endregion*/

            /*
            * 弹出栈顶元素(并删除栈顶元素)
            */
            pop: function()
            {
                if (this.innerArray.length === 0)
                {
                    return null;
                }
                else
                {
                    var targetObject = this.innerArray[this.innerArray.length - 1];

                    this.innerArray.length--;

                    return targetObject;
                }
            },
            /*#endregion*/

            /*
            * 取出栈顶元素(并不删除栈顶元素)
            */
            peek: function()
            {
                if (this.innerArray.length === 0)
                {
                    return null;
                }

                return this.innerArray[this.innerArray.length - 1];
            },
            /*#endregion*/

            /*
            * 清空堆栈
            */
            clear: function()
            {
                this.innerArray.length = 0; //将元素的个数清零即可
            },
            /*#endregion*/

            /*#region 函数:size()*/
            /**
            * 获得线性堆栈的当前大小
            * @method size
            * @memberof x.newStack#
            */
            size: function()
            {
                return this.innerArray.length;
            },
            /*#endregion*/

            /*
            * 判断一个线性堆栈是否为空
            */
            isEmpty: function()
            {
                return (this.innerArray.length === 0) ? true : false;
            }
            /*#endregion*/
        };

        return stack;
    },
    /*#endregion*/

    /*#region 类:newStringBuilder()*/
    /**
    * 高效字符串构建器<br />
    * 注: 现在的主流浏览器都针对字符串连接作了优化，所以性能要好于StringBuilder类，不推荐使用，仅作字符串算法研究。
    * @class StringBuilder
    * @constructor newStringBuilder
    * @memberof x
    */
    newStringBuilder: function()
    {
        var stringBuilder = {

            // 内部数组对象
            innerArray: [],

            /*#region 函数:append(text)*/
            /**
            * 附加文本信息
            * @method append
            * @memberof x.newStringBuilder#
            * @param {string} text 文本信息
            */
            append: function(text)
            {
                this.innerArray[this.innerArray.length] = text;
            },
            /*#endregion*/

            /*#region 函数:toString()*/
            /**
            * 转换为字符串
            * @method toString
            * @memberof x.newStringBuilder#
            * @returns {string}
            */
            toString: function()
            {
                return this.innerArray.join('');
            }
            /*#endregion*/
        };

        return stringBuilder;
    },
    /*#endregion*/

    /*#region 类:newTimer(interval, callback)*/
    /**
    * 计时器
    * @class Timer
    * @constructor newTimer
    * @memberof x
    * @param {int} interval 时间间隔(单位:秒)
    * @param {function} callback 回调函数
    * @example
    * // 初始化一个计时器
    * var timer = x.newTimer(5, function(timer) {
    *   console.log(new Date());
    *   // 启动计时器
    *   timer.stop();
    * });
    * // 停止计时器
    * timer.start();
    */
    newTimer: function(interval, callback)
    {
        var timer = {

            // 定时器的名称
            name: 'timer$' + Math.ceil(Math.random() * 900000000 + 100000000),
            // 定时器的间隔
            interval: interval * 1000,
            // 回调函数
            callback: callback,

            /*#region 函数:run()*/
            /**
            * 执行回调函数
            * @private
            * @method run
            * @memberof x.newTimer#
            */
            run: function()
            {
                this.callback(this);
            },
            /*#endregion*/

            /*#region 函数:start()*/
            /**
            * 启动计时器
            * @method start
            * @memberof x.newTimer#
            */
            start: function()
            {
                eval(this.name + ' = this;');

                this.timerId = setInterval(this.name + '.run()', this.interval);
            },
            /*#endregion*/

            /*#region 函数:stop()*/
            /**
            * 停止计时器
            * @method stop
            * @memberof x.newTimer#
            */
            stop: function()
            {
                clearInterval(this.timerId);
            }
            /*#endregion*/
        };

        return timer;
    },
    /*#endregion*/

    event: {
        /*#region 函数:getEvent(event)*/
        /*
        * 获取事件对象, 非IE浏览器的获取事件对象需要在调用方法中传递一个参数 event
        * @method getEvent
        * @memberof x
        * @param {event} event 事件对象
        */
        getEvent: function(event)
        {
            return window.event ? window.event : event;
        },
        /*#endregion*/

        /*#region 函数:getTarget(event)*/
        /**
        * 获取事件的目标对象
        * @method getTarget
        * @memberof x
        * @param {event} event 事件对象
        */
        getTarget: function(event)
        {
            return window.event ? window.event.srcElement : (event ? event.target : null);
        },
        /*#endregion*/

        /*#region 函数:getPosition(event)*/
        /**
        * 获取事件的光标坐标
        * @method getPosition
        * @memberof x
        * @param {event} event 事件对象
        */
        getPosition: function(event)
        {
            var docElement = document.documentElement;

            var body = document.body || { scrollLeft: 0, scrollTop: 0 };

            return {
                x: event.pageX || (event.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0)),
                y: event.pageY || (event.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0))
            };
        },
        /*#endregion*/

        /*#region 函数:getPositionX(event)*/
        /**
        * 获取事件的光标X坐标
        * @method getEventPositionX
        * @memberof x
        * @param {event} event 事件对象
        */
        getPositionX: function(event)
        {
            return x.getPosition(event).x;
        },
        /*#endregion*/

        /*#region 函数:getPositionY(event)*/
        /**
        * 获取事件的光标Y坐标
        * @method getPositionY
        * @memberof x
        * @param {event} event 事件对象
        */
        getPositionY: function(event)
        {
            return x.getPosition(event).y;
        },
        /*#endregion*/

        /*#region 函数:stopPropagation(event)*/
        /**
        * 停止事件传播
        * @method stopPropagation
        * @memberof x
        * @param {event} event 事件对象
        */
        stopPropagation: function(event)
        {
            // 判定是否支持触摸
            suportsTouch = ("createTouch" in document);

            var touch = suportsTouch ? event.touches[0] : event;

            if (suportsTouch)
            {
                touch.stopPropagation();
                touch.preventDefault();
            }
            else
            {
                if (window.event)
                {
                    // IE
                    window.event.cancelBubble = true;
                    window.event.returnValue = false;
                    return;
                }

                if (event)
                {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        },
        /*#endregion*/

        /*#region 函数:add(target, type, listener, useCapture)*/
        /**
        * 添加事件监听器
        * @method add
        * @memberof x
        * @param {string} target 监听对象
        * @param {string} type 监听事件
        * @param {string} listener 处理函数
        * @param {string} [useCapture] 监听顺序方式
        */
        add: function(target, type, listener, useCapture)
        {
            if (target.addEventListener)
            {
                target.addEventListener(type, listener, useCapture);
            }
            else if (target.attachEvent)
            {
                target.attachEvent('on' + type, listener);
            }
            else
            {
                target['on' + type] = listener;
            }
        },
        /*#endregion*/

        /*#region 函数:remove(target, type, listener, useCapture)*/
        /**
        * 移除事件监听器
        * @method remove
        * @memberof x
        * @param {string} target 监听对象
        * @param {string} type 监听事件
        * @param {string} listener 处理函数
        * @param {string} [useCapture] 监听顺序方式
        */
        remove: function(target, type, listener, useCapture)
        {
            if (target.removeEventListener)
            {
                target.removeEventListener(type, listener, useCapture);
            }
            else if (target.detachEvent)
            {
                target.detachEvent('on' + type, listener);
            }
            else
            {
                target['on' + type] = null;
            }
        }
        /*#endregion*/
    },

    /**
    * Guid 格式文本
    * @namespace guid
    * @memberof x
    */
    guid: {
        /*#region 函数:create(format, isUpperCase)*/
        /**
        * 创建 Guid 格式文本
        * @method create
        * @memberof x.guid
        * @param {string} [format] 分隔符格式(如果填空白字符串则不显示)
        * @param {bool} [isUpperCase] 是否是大写格式(true|false)
        * @example
        * // 输出格式 aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
        * console.log(x.guid.create());
        * @example
        * // 输出格式 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        * console.log(x.guid.create(''));
        * @example
        * // 输出格式 AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA
        * console.log(x.guid.create('-', true));
        */
        create: function(format, isUpperCase)
        {
            var text = '';

            // 格式限制
            format = x.isUndefined(format, '-').toLowerCase();

            for (var i = 0; i < 8; i++)
            {
                text += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

                if (i > 0 && i < 5)
                {
                    if (format === '-')
                    {
                        text += '-';
                    }
                }
            }

            text = isUpperCase ? text.toUpperCase() : text.toLowerCase();

            return text;
        }
        /*#endregion*/
    },

    /**
    * 随机文本
    * @namespace randomText
    * @memberof x
    */
    randomText: {
        /*#region 函数:create(length)*/
        /**
        * 创建随机文本信息
        * @method create
        * @memberof x.randomText
        * @param {int} length 返回的文本长度
        * @example
        * // 输出格式 00000000
        * console.log(x.randomText.create(8));
        */
        create: function(length, buffer)
        {
            var result = '';

            var buffer = x.type(buffer) == 'string' ? buffer : "0123456789abcdefghijklmnopqrstuvwyzx";

            for (var i = 0; i < length; i++)
            {
                result += buffer.charAt(Math.ceil(Math.random() * 100000000) % buffer.length);
            }

            return result;
        }
        /*#endregion*/
    },

    /**
    * 字符串
    * @namespace string
    * @memberof x
    */
    string: {

        stringify: function(value)
        {
            var type = x.type(value);

            if (type !== 'string')
            {
                if (type === 'number')
                {
                    value += '';
                }
                else if (type === 'function')
                {
                    value = x.string.stringify(value.call(value));
                }
                else
                {
                    value = '';
                }
            }

            return value;
        },

        /*#region 函数:trim(text, trimText)*/
        /**
        * 去除字符串两端空白或其他文本信息.
        *
        * @method trim
        * @memberof x.string
        * @param {string} text 文本信息.
        * @param {int} [trimText] 需要去除的文本信息(默认为空白).
        */
        trim: function(text, trimText)
        {
            if (x.isUndefined(trimText))
            {
                return text.replace(/(^\s*)|(\s*$)/g, '');
            }
            else
            {
                return x.string.rtrim(x.string.ltrim(text, trimText), trimText);
            }
        },
        /*#endregion*/

        /*#region 函数:ltrim(text, trimText)*/
        /**
        * 去除字符串左侧空白.
        * @method ltrim
        * @memberof x.string
        * @param {string} text 文本信息.
        * @param {int} [trimText] 需要去除的文本信息(默认为空白).
        */
        ltrim: function(text, trimText)
        {
            if (x.isUndefined(trimText))
            {
                return text.replace(/(^\s*)/g, '');
            }
            else
            {
                return (text.substr(0, trimText.length) === trimText) ? text.substr(trimText.length, text.length) : text;
            }
        },
        /*#endregion*/

        /*#region 函数:rtrim(text, trimText)*/
        /**
        * 去除字符串右侧空白.
        * @method rtrim
        * @memberof x.string
        * @param {string} text 文本信息.
        * @param {int} [trimText] 需要去除的文本信息(默认为空白).
        */
        rtrim: function(text, trimText)
        {
            if (x.isUndefined(trimText))
            {
                return text.replace(/(\s*$)/g, '');
            }
            else
            {
                return (text.substr(text.length - trimText.length, trimText.length) === trimText) ? text.substr(0, text.length - trimText.length) : text;
            }
        },
        /*#endregion*/

        /*#region 函数:format(text, args)*/
        /**
        * 去除字符串右侧空白.
        * @method rtrim
        * @memberof x.string
        * @param {string} text 文本信息.
        * @param {int} [trimText] 需要去除的文本信息(默认为空白).
        */
        format: function()
        {
            if (arguments.length == 0) { return null; }

            var text = arguments[0];

            for (var i = 1; i < arguments.length; i++)
            {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                text = text.replace(re, arguments[i]);
            }

            return text;
        },
        /*#endregion*/

        /*#region 函数:left(text, length, hasEllipsis)*/
        /**
        * 字符串长度超长时, 截取左侧字符.
        * @method left
        * @memberof x.string
        * @param {string} text	: 需要处理的字符串.
        * @param {int} length	: 长度范围.
        * @param {bool} hasEllipsis	: 是否显示'...'.
        */
        left: function(text, length, hasEllipsis)
        {
            if (text.length === 0) { return text; }

            if (text.length > length)
            {
                return text.substr(0, length) + (x.isUndefined(hasEllipsis, true) ? '...' : '');
            }
            else
            {
                return text;
            }
        }
        /*#endregion*/
    },

    /**
    * 颜色编码处理
    */
    color: {

        // 正则规则
        // reg: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,

        hex: function(colorRgbCode)
        {
            if (/^(rgb|RGB)/.test(colorRgbCode))
            {
                var colorBuffer = colorRgbCode.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
                var strHex = "#";
                for (var i = 0; i < colorBuffer.length; i++)
                {
                    var hex = Number(colorBuffer[i]).toString(16);

                    if (hex === "0")
                    {
                        hex += hex;
                    }

                    strHex += hex;
                }

                if (strHex.length !== 7)
                {
                    strHex = colorRgbCode;
                }

                return strHex;
            }
            else if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(colorRgbCode))
            {
                var colorBuffer = colorRgbCode.replace(/#/, "").split("");

                if (colorBuffer.length === 6)
                {
                    return colorRgbCode;
                }
                else if (colorBuffer.length === 3)
                {
                    var numHex = "#";

                    for (var i = 0; i < colorBuffer.length; i += 1)
                    {
                        numHex += (colorBuffer[i] + colorBuffer[i]);
                    }

                    return numHex;
                }
            }
            else
            {
                return colorRgbCode;
            }
        },

        /**
        * 十六进制颜色转为RGB格式
        */
        rgb: function(colorHexCode)
        {
            var color = colorHexCode.toLowerCase();

            if (color && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color))
            {
                // 处理简写的颜色
                if (color.length === 4)
                {
                    var originalColor = "#";

                    for (var i = 1; i < 4; i += 1)
                    {
                        originalColor += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                    }

                    color = originalColor;
                }

                // 处理六位的颜色值
                var colorBuffer = [];

                for (var i = 1; i < 7; i += 2)
                {
                    colorBuffer.push(parseInt("0x" + color.slice(i, i + 2)));
                }
                return 'rgb(' + colorBuffer.join(', ') + ')';
            }
            else
            {
                return color;
            }
        }
    }
};

var scriptFilePath = '';

x.file = function()
{
    return scriptFilePath;
}

x.dir = function()
{
    if (scriptFilePath.length > 0)
    {
        return scriptFilePath.substring(0, scriptFilePath.lastIndexOf("/") + 1);
    }
    else
    {
        return '';
    }
}

if (document)
{
    try
    {
        // 判断文件路径的 javascript 代码一般都直接放在 javascript 文件中而不是函数中，
        // 所以当加载该 javascript 文件时会立即执行其中的语句，而执行此语句时所获取到的文件数目正好是scripts.length-1，
        // 因为页面后面的 javascript 文件还没有加载，所以该处的js文件获取的数目并不是页面所有的js文件的数目。
        var scripts = document.scripts;

        scriptFilePath = scripts[scripts.length - 1].src;
    }
    catch (ex)
    {
        scriptFilePath = '';
    }
}