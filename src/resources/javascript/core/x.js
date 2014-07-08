// -*- ecoding=utf-8 -*-

/**
* @namespace x
* @description 默认根命名空间
*/
var x = {

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
        * XPath 特性
        * @class XPath
        * @memberof x.browserFeatures
        */
        XPath: !!document.evaluate,
        /**
        * Selector 特性, 支持 querySelector, querySelectorAll
        * @class Selector
        * @memberof x.browserFeatures
        */
        Selector: !!document.querySelector,

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
    ui: {},

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
    require: function(href, type)
    {
        switch (type.toLowerCase())
        {
            case "text/css":
                return jQuery('<link type="text/css" rel="stylesheet" href="' + href + '"/>').appendTo('head');

            case "text/javascript":
            default:
                return jQuery('<script type="text/javascript" src="' + href + '"></script>').appendTo('head');
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

    each: function(object, callback)
    {
        var name, i = 0, length = object.length;

        if (length === undefined)
        {
            for (name in object)
            {
                if (callback.call(object[name], name, object[name]) === false) { break; }
            }
        }
        else
        {
            for (var value = object[0]; i < length && callback.call(value, i, value) != false; value = object[++i]) { }
        }

        return object;
    },

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
        return name.replace(/[\.\/-]/g, '$').replace(/\$\$/g, '$');
    },
    /*#endregion*/

    /*#region 函数:getEventObject(event)*/
    /*
    * 获取事件对象, 非IE浏览器的获取事件对象需要在调用方法中传递一个参数 event
    * @method getEventObject
    * @memberof x
    * @param {event} event 事件对象
    */
    getEventObject: function(event)
    {
        return window.event ? window.event : event;
    },
    /*#endregion*/

    /*#region 函数:getEventTarget(event)*/
    /**
    * 获取事件的目标对象
    * @method getEventTarget
    * @memberof x
    * @param {event} event 事件对象
    */
    getEventTarget: function(event)
    {
        return window.event ? window.event.srcElement : event ? event.target : null;
    },
    /*#endregion*/

    /*#region 函数:getEventPosition(event)*/
    /**
    * 获取事件的光标坐标
    * @method getEventPosition
    * @memberof x
    * @param {event} event 事件对象
    */
    getEventPosition: function(event)
    {
        var docElement = document.documentElement;

        var body = document.body || { scrollLeft: 0, scrollTop: 0 };

        return {
            x: event.pageX || (event.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0)),
            y: event.pageY || (event.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0))
        };
    },
    /*#endregion*/

    /*#region 函数:getEventPositionX(event)*/
    /**
    * 获取事件的光标X坐标
    * @method getEventPositionX
    * @memberof x
    * @param {event} event 事件对象
    */
    getEventPositionX: function(event)
    {
        return x.getEventPosition(event).x;
    },
    /*#endregion*/

    /*#region 函数:getEventPositionY(event)*/
    /**
    * 获取事件的光标Y坐标
    * @method getEventPositionY
    * @memberof x
    * @param {event} event 事件对象
    */
    getEventPositionY: function(event)
    {
        return x.getEventPosition(event).y;
    },
    /*#endregion*/

    /*#region 函数:stopEventPropagation(event)*/
    /**
    * 停止事件传播
    * @method stopEventPropagation
    * @memberof x
    * @param {event} event 事件对象
    */
    stopEventPropagation: function(event)
    {
        // 判定是否支持触摸
        suportsTouch = ("createTouch" in document);

        var touch = suportsTouch ? event.touches[0] : event;

        if (suportsTouch)
        {
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

    /*#region 函数:addEventListener(target, type, listener, useCapture)*/
    /**
    * 添加事件监听器
    * @method addEventListener
    * @memberof x
    * @param {string} target 监听对象
    * @param {string} type 监听事件
    * @param {string} listener 处理函数
    * @param {string} [useCapture] 监听顺序方式
    */
    addEventListener: function(target, type, listener, useCapture)
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

    /*#region 函数:removeEventListener(target, type, listener, useCapture)*/
    /**
    * 移除事件监听器
    * @method removeEventListener
    * @memberof x
    * @param {string} target 监听对象
    * @param {string} type 监听事件
    * @param {string} listener 处理函数
    * @param {string} [useCapture] 监听顺序方式
    */
    removeEventListener: function(target, type, listener, useCapture)
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
    },
    /*#endregion*/

    /*#region 函数:newHashTable()*/
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
            if (x.type(trimText) == 'undefined')
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
            if (x.type(trimText) == 'undefined')
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
            if (x.type(trimText) == 'undefined')
            {
                return text.replace(/(\s*$)/g, '');
            }
            else
            {
                return (text.substr(text.length - trimText.length, trimText.length) === trimText) ? text.substr(0, text.length - trimText.length) : text;
            }
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
    * 窗口
    * @namespace windows
    * @memberof x
    */
    windows: {
        /*#region 函数:newWindow(name, options)*/
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
                    outString += '" ></div>';

                    return outString;
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

                    x.form.features.bind();
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
            var name = x.getFriendlyName(location.pathname + '$window$' + name);

            var internalWindow = x.windows.newWindow(name, options);

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
};
