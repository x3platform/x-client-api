// -*- ecoding : utf-8 -*-

define(['jquery'], function ($) {
    /**
    * @description 根命名空间
    */
    var x = {

        version: '1.0.0.0',

        publishDate: '2010-01-01',

        corporation: 'x3platform.com',

        author: 'ruanyu@live.com',

        // 浏览器类别信息
        browser: {
            IE: !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
            Opera: navigator.userAgent.indexOf('Opera') > -1,
            WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
            Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
            MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
        },

        // 浏览器特性
        browserFeatures: {
            XPath: !!document.evaluate,
            SelectorsAPI: !!document.querySelector,
            ElementExtensions: !!window.HTMLElement,
            SpecificElementExtensions:
		  document.createElement('div')['__proto__']
          && document.createElement('div')['__proto__'] !== document.createElement('form')['__proto__']
        },

        scriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',

        jsonFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

        // A simple way to check for HTML strings or ID strings
        // (both of which we optimize for)
        quickExpr: /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,

        // Is it a simple selector
        isSimple: /^.[^:#\[\.,]*$/,

        /**
        * 空函数 emptyFunction
        */
        emptyFunction: function () { },

        /**
        *
        */
        k: function (x) { return x; },

        call: function (callback) {
            if (typeof (callback) !== 'undefined') {
                if (typeof (callback) === 'function') {
                    callback();
                }
                else {
                    if (callback !== '') { eval(callback); }
                }
            }
        },

        /**
        * 加载脚本
        */
        require: function (href, type) {
            switch (type.toLowerCase()) {
                case "text/css":
                    return jQuery('<link type="text/css" rel="stylesheet" href="' + href + '"/>').appendTo('head');

                case "text/javascript":
                default:
                    return jQuery('<script type="text/javascript" src="' + href + '"></script>').appendTo('head');
            }
        },

        /**
        * 注册模块名称
        */
        register: function (value) {
            var parts = value.split(".");

            var root = window;

            for (var i = 0; i < parts.length; i++) {
                if (typeof root[parts[i]] === "undefined") {
                    root[parts[i]] = {};
                }

                root = root[parts[i]];
            }

            return root;
        },

        /*
        * 扩展对象的方法
        */
        ext: function (destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }

            return destination;
        },

        /*
        * 执行对象方法
        */
        invoke: function (object, fun) {
            var args = Array.prototype.slice.call(arguments).slice(2);

            return function () {
                return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)));
            }
        },

        /**
        * 查找页面元素
        *
        * @expression	: 表达式
        */
        find: function (expression) {
            // x.debug.warn('此方法已过期，请使用 x.form.query(name)。');

            var elements, element;

            if (arguments.length > 1) {
                for (var i = 0, elements = [], length = arguments.length; i < length; i++) {
                    elements.push(x.find(arguments[i]));
                }

                if (elements.length > 0) {
                    return Element.ext(elements[0]);
                }
            }

            if (Object.isString(expression)) {
                var element = document.getElementById(expression);

                if (element !== null) {
                    return Element.ext(element);
                }

                var elements = document.getElementsByName(expression);

                if (elements.length > 0) {
                    return Element.ext(elements[0]);
                }

                elements = Selector.findChildElements(document, $A(arguments));

                if (elements.length > 0) {
                    return elements[0];
                }

                return undefined;
            }

            return Element.ext(expression);
        },

        /**
        * 查找页面元素.
        *
        * @name	: 元素的名称.
        */
        findAll: function (iterable) {
            // x.debug.warn('此方法已过期，请使用 jQuery 相关函数。');

            return Selector.findChildElements(document, $A(arguments));
        },

        /*#region 函数:toJSON(text)*/
        /**
        * 将字符串转换为JSON对象
        *
        * @text	: 符合JSON格式的文本信息
        */
        toJSON: function (text) {
            if (typeof (text) === 'object') { return text; }

            if (typeof (text) === 'undefined' || text === '') {
                return undefined;
            }

            return eval('(' + text + ')');
        },
        /*#endregion*/

        /*#region 函数:toSafeJSON(text)*/
        /**
        * 将字符串转换为安全的JSON格式文本
        *
        * @text	: 文本信息
        */
        toSafeJSON: function (text) {
            var outString = '';

            for (var i = 0; i < text.length; i++) {
                var ch = text.substr(i, 1);

                if (ch === '"' || ch === '\'' || ch === '\\') {
                    outString += '\\';
                    outString += ch;
                }
                else if (ch === '\b') {
                    outString += '\\b';
                }
                else if (ch === '\f') {
                    outString += '\\f';
                }
                else if (ch === '\n') {
                    outString += '\\n';
                }
                else if (ch === '\t') {
                    outString += '\\t';
                }
                else if (ch === '\r') {
                    outString += '\\r';
                }
                else {
                    outString += ch;
                }
            }

            return outString;
        },
        /*#endregion*/

        /*#region 函数:toSafeLike(text)*/
        /**
        * 将字符串转换为安全的Like内容.
        *
        * @text	: 符合Json格式的字符串.
        */
        toSafeLike: function (text) {
            return text.replace(/\[/g, '[[]').replace(/%/g, '[%]').replace(/_/g, '[_]');
        },
        /*#endregion*/

        /*#region 函数:formatNature(text)*/
        /**
        * 将字符串统一转换为本地标识标识
        */
        formatNature: function (text) {
            switch (text.toLowerCase()) {
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

        /**
        * 获取随机Guid格式文本.
        */
        guid: {
            /*#region 函数:create(format)*/
            /**
            * 创建随机文本
            */
            create: function (format) {
                var text = '';

                if (typeof (format) === 'undefined') {
                    format = '-';
                }

                format = format.toLowerCase();

                for (var i = 0; i < 8; i++) {
                    text += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

                    if (i > 0 && i < 5) {
                        if (format === '-') {
                            text += '-';
                        }
                    }
                }

                if (format === 'lower') {
                    text = text.toLowerCase();
                }
                else if (format === 'upper') {
                    text = text.toUpperCase();
                }

                return text;
            }
            /*#endregion*/
        },

        /**
        * 获取随机文本
        */
        randomText: {
            /*#region 函数:create(length)*/
            /**
            * 创建随机文本
            */
            create: function (length) {
                var result = '';

                var x = "0123456789abcdefghijklmnopqrstuvwyzx";

                for (var i = 0; i < length; i++) {
                    result += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
                }

                return result;
            }
            /*#endregion*/
        },

        /**
        * String methods
        */
        string: {
            /*#region 函数:trim(text, trimText)*/
            /**
            * 去除字符串两端空白.
            */
            trim: function (text, trimText) {
                if (typeof (trimText) == 'undefined') {
                    return text.replace(/(^\s*)|(\s*$)/g, '');
                }
                else {
                    return x.string.rtrim(x.string.ltrim(text, trimText), trimText);
                }
            },
            /*#endregion*/

            /*#region 函数:ltrim(text, trimText)*/
            /**
            * 去除字符串左侧空白.
            */
            ltrim: function (text, trimText) {
                if (typeof (trimText) == 'undefined') {
                    return text.replace(/(^\s*)/g, '');
                }
                else {
                    return (text.substr(0, trimText.length) === trimText) ? text.substr(trimText.length, text.length) : text;
                }
            },
            /*#endregion*/

            /*#region 函数:rtrim(text, trimText)*/
            /**
            * 去除字符串右侧空白.
            */
            rtrim: function (text, trimText) {
                if (typeof (trimText) == 'undefined') {
                    return text.replace(/(\s*$)/g, '');
                }
                else {
                    return (text.substr(text.length - trimText.length, trimText.length) === trimText) ? text.substr(0, text.length - trimText.length) : text;
                }
            }
            /*#endregion*/
        },

        /**
        * 通用窗口
        */
        windows: {
            newWindow: function (name, options) {
                var __window__ = {

                    name: name,
                    options: options,

                    /*#region 函数:create()*/
                    create: function () {
                        x.debug.error("必须重写向导对象的 create() 方法。");

                        return "必须重写向导对象的 create() 方法。";
                    },
                    /*#endregion*/

                    /*#region 函数:bindOptions(options)*/
                    bindOptions: function (options) {
                        x.debug.error("必须重写向导对象的 bindOptions() 方法。");
                    },
                    /*#endregion*/

                    render: function () {
                        // 验证并绑定选项信息
                        this.bindOptions(options);

                        // 设置重写后的创建函数
                        if (typeof (options.create) !== 'undefined') {
                            this.create = options.create;
                        }

                        // 加载遮罩和页面内容
                        this.create();

                        x.form.features.bind();
                    }
                };

                return __window__;
            },

            getWindow: function (name, options) {
                var name = x.getFriendlyName(location.pathname + '$window$' + name);

                var __window__ = x.ext({}, x.wizards.newWindow(name, options));

                // 加载界面、数据、事件
                __window__.render();

                // 绑定到Window对象
                window[name] = __window__;

                return wizard;
            }
        },

        /*#region 函数:getFriendlyName(name)*/
        /**
        * 将不规范的标识名称转换为友好的名称.
        */
        getFriendlyName: function (name) {
            return name.replace(/[\.\/-]/g, '$').replace(/\$\$/g, '$');
        },
        /*#endregion*/

        /*#region 函数:isUndefined(value, replacementValue, decodeValue)*/
        /*
        * value             : 值信息;
        * replacementValue  : 替换的值;
        * decodeValue       : 编码的值;
        */
        isUndefined: function (value, replacementValue, decodeValue) {
            return (typeof (value) === 'undefined') ? replacementValue : (arguments.length == 3 ? decodeValue : value);
        },
        /*#endregion*/

        /*#region 函数:getEventObject(event)*/
        getEventObject: function (event) {
            return window.event ? window.event : event;
        },
        /*#endregion*/

        /**
        * 获取页面光标坐标
        */
        getEventPosition: function (event) {
            var docElement = document.documentElement;

            var body = document.body || { scrollLeft: 0, scrollTop: 0 };

            return {
                x: event.pageX || (event.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0)),
                y: event.pageY || (event.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0))
            };
        },

        getEventPositionX: function (event) {
            return x.getEventPosition(event).x;
        },

        getEventPositionY: function (event) {
            return x.getEventPosition(event).y;
        },

        /*#region 函数:getEventTarget(e)*/
        getEventTarget: function (e) {
            return window.event ? window.event.srcElement : e ? e.target : null;
        },
        /*#endregion*/

        /*#region 函数:stopEventPropagation(e)*/
        stopEventPropagation: function (e) {
            if (window.event) {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
                return;
            }

            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
        },
        /*#endregion*/

        /*#region 函数:addEventListener(target, type, listener, useCapture)*/
        /**
        * target    : 监听对象;
        * type      : 监听事件;
        * listener  : 处理函数;
        * useCapture: 监听顺序方式
        */
        addEventListener: function (target, type, listener, useCapture) {
            if (target.addEventListener) {
                target.addEventListener(type, listener, useCapture);
                return true;
            }
            else if (target.attachEvent) {
                return target.attachEvent('on' + type, listener);
            }
            else {
                target['on' + type] = listener;
            }
        },
        /*#endregion*/

        /*#region 函数:removeEventListener(target, type, listener, useCapture)*/
        /**
        * target    : 监听对象;
        * type      : 监听事件;
        * listener  : 处理函数;
        * useCapture: 监听顺序方式
        */
        removeEventListener: function (target, type, listener, useCapture) {
            if (target.removeEventListener) {
                target.removeEventListener(type, listener, useCapture);
                return true;
            }
            else if (target.detachEvent) {
                return target.detachEvent('on' + type, listener);
            }
            else {
                target['on' + type] = null;
            }
        },
        /*#endregion*/

        /*#region 函数:newHashTable()*/
        /**
        * 哈希表
        */
        newHashTable: function () {
            var hashTable = {

                // 内部数组对象
                innerArray: [],

                /*#region 函数:clear()*/
                clear: function () {
                    this.innerArray = [];
                },
                /*#endregion*/

                /*#region 函数:exist(key)*/
                exist: function (key) {
                    for (var i = 0; i < this.innerArray.length; i++) {
                        if (this.innerArray[i].name === key) {
                            return true;
                        }
                    }

                    return false;
                },
                /*#endregion*/

                get: function (_index) {
                    return this.innerArray[_index];
                },

                add: function (_key, _value) {
                    if (arguments.length === 1) {
                        var keyArr = _key.split(';');
                        for (var i = 0; i < keyArr.length; i++) {
                            var valueArr = keyArr[i].split('#');

                            this.innerArray.push(x.types.newListItem(valueArr[0], valueArr[1]));

                        }
                    }
                    else {
                        if (this.exist(_key)) {
                            throw 'hashtable aleardy exist same key';
                        }
                        else {
                            this.innerArray.push(x.types.newListItem(_key, _value));
                        }
                    }
                },

                find: function (_key) {
                    for (var i = 0; i < this.innerArray.length; i++) {
                        if (this.innerArray[i].name === _key) {
                            return this.innerArray[i].value;
                        }
                    }
                    return null;
                },

                length: function () {
                    return this.innerArray.length;
                }
            };

            return hashTable;
        },
        /*#endregion*/

        /*#region 类:newQueue()*/
        /*
        * 队列
        */
        newQueue: function () {
            var queue = {

                // 内部数组对象
                innerArray: [],

                /*
                * 插入队列顶部元素
                */
                push: function (targetObject) {
                    this.innerArray.push(targetObject);
                },

                pop: function () {
                    if (this.innerArray.length === 0) {
                        return null;
                    }
                    else {
                        var targetObject = this.innerArray[0];

                        // 将队列元素往前移动一个单位
                        for (var i = 0; i < this.innerArray.length - 1; i++) {
                            this.innerArray[i] = this.innerArray[i + 1];
                        }

                        this.innerArray.length = this.innerArray.length - 1;

                        return targetObject;
                    }
                },

                /*
                * 取出队列底部元素(并不删除队列底部元素)
                */
                peek: function () {
                    if (this.innerArray.length === 0) {
                        return null;
                    }

                    return this.innerArray[0];
                },

                /*
                * 清空堆栈
                */
                clear: function () {
                    this.innerArray.length = 0; //将元素的个数清零即可
                },

                /*
                * 获得线性队列当前大小
                */
                length: function () {
                    return this.innerArray.length;
                },

                /*
                * 判断一个线性队列是否为空
                */
                isEmpty: function () {
                    return (this.innerArray.length === 0) ? true : false;
                }
            };

            return queue;
        },
        /*#endregion*/

        /*#region 类:newStack()*/
        newStack: function () {
            var stack = {

                // 内部数组对象
                innerArray: [],

                /*
                * 插入栈顶元素
                */
                push: function (targetObject) {
                    this.innerArray[this.innerArray.length] = targetObject;
                },

                /*
                * 弹出栈顶元素(并删除栈顶元素)
                */
                pop: function () {
                    if (this.innerArray.length === 0) {
                        return null;
                    }
                    else {
                        var targetObject = this.innerArray[this.innerArray.length - 1];

                        this.innerArray.length--;

                        return targetObject;
                    }
                },

                /*
                * 取出栈顶元素(并不删除栈顶元素)
                */
                peek: function () {
                    if (this.innerArray.length === 0) {
                        return null;
                    }

                    return this.innerArray[this.innerArray.length - 1];
                },

                /*
                * 清空堆栈
                */
                clear: function () {
                    this.innerArray.length = 0; //将元素的个数清零即可
                },

                /*
                * 获得线性堆栈的当前大小
                */
                length: function () {
                    return this.innerArray.length;
                },

                /*
                * 判断一个线性堆栈是否为空
                */
                isEmpty: function () {
                    return (this.innerArray.length === 0) ? true : false;
                }
            };

            return stack;
        },
        /*#endregion*/

        /*#region 类:newStringBuilder()*/
        /*
        * 高效字符串构建器(在现在主流浏览器都针对字符串连接作了优化，所以性能要好于StringBuilder类)，仅作字符串算法研究。
        */
        newStringBuilder: function () {
            var stringBuilder = {

                // 内部数组对象
                innerArray: [],

                /*
                * 附加文本
                */
                append: function (text) {
                    this.innerArray[this.innerArray.length] = text;
                },

                /*
                * 判断一个线性堆栈是否为空
                */
                toString: function () {
                    return this.innerArray.join('');
                }
            };

            return stringBuilder;
        },
        /*#endregion*/

        /*#region 类:newTimer(interval, callback)*/
        /*
        * Timer类
        * 方法:
        *   构造函数: Timer(间隔, 回调函数)
        *   清除: stop()
        *   使用示例:
        *   var timer = x.newTimer(5, function(timer){
        *       console.log(new Date());
        *       timer.stop();
        *   });
        *   timer.start();
        */
        newTimer: function (interval, callback) {
            var timer = {

                // 定时器的名称
                name: 'timer$' + Math.ceil(Math.random() * 900000000 + 100000000),
                // 定时器的间隔
                interval: interval * 1000,
                // 回调函数
                callback: callback,

                run: function () {
                    this.callback(this);
                },

                start: function () {
                    eval(this.name + ' = this;');

                    this.timerId = setInterval(this.name + '.run()', this.interval);
                },

                stop: function () {
                    clearInterval(this.timerId);
                }
            };

            return timer;
        }
        /*#endregion*/
    };


    // -------------------------------------------------------
    // 扩展内置对象方法
    // -------------------------------------------------------

    /**
    * 扩展 Object 对象
    */

    x.ext(Object, {

        /**
        * 审查.
        */
        inspect: function (object) {
            try {
                if (Object.isUndefined(object))
                    return 'undefined';
                if (object === null)
                    return 'null';
                return object.inspect ? object.inspect() : String(object);
            }
            catch (ex) {
                if (ex instanceof RangeError) { return '...'; }

                throw ex;
            }
        },

        clone: function (object) {
            return x.ext({}, object);
        },

        isElement: function (object) {
            return !!(object && object.nodeType == 1);
        },

        isArray: function (object) {
            // return object != null && typeof object == "object" && 'splice' in object && 'join' in object;
            // 新的方式
            return Object.prototype.toString.apply(object) === '[object Array]';
        },

        isHash: function (object) {
            return object instanceof Hash;
        },

        isFunction: function (object) {
            return typeof object == 'function';
        },

        isString: function (object) {
            // return typeof object == 'string';
            return Object.prototype.toString.apply(object) === '[object String]';
        },

        isNumber: function (object) {
            // return typeof object == 'number';
            return Object.prototype.toString.apply(object) === '[object Number]';
        },

        isUndefined: function (object) {
            return typeof object == 'undefined';
        }
    });

    var $break = {};

    var Enumerable = {
        each: function (iterator, context) {
            var index = 0;
            try {
                this._each(function (value) {
                    iterator.call(context, value, index++);
                });
            } catch (e) {
                if (e != $break) throw e;
            }
            return this;
        },

        eachSlice: function (number, iterator, context) {
            var index = -number, slices = [], array = this.toArray();
            if (number < 1) return array;
            while ((index += number) < array.length)
                slices.push(array.slice(index, index + number));
            return slices.collect(iterator, context);
        },

        all: function (iterator, context) {
            iterator = iterator || x.k;
            var result = true;
            this.each(function (value, index) {
                result = result && !!iterator.call(context, value, index);
                if (!result) throw $break;
            });
            return result;
        },

        any: function (iterator, context) {
            iterator = iterator || x.k;
            var result = false;
            this.each(function (value, index) {
                if (result = !!iterator.call(context, value, index))
                    throw $break;
            });
            return result;
        },

        collect: function (iterator, context) {
            iterator = iterator || x.k;
            var results = [];
            this.each(function (value, index) {
                results.push(iterator.call(context, value, index));
            });
            return results;
        },

        detect: function (iterator, context) {
            var result;
            this.each(function (value, index) {
                if (iterator.call(context, value, index)) {
                    result = value;
                    throw $break;
                }
            });
            return result;
        },

        findAll: function (iterator, context) {
            var results = [];
            this.each(function (value, index) {
                if (iterator.call(context, value, index))
                    results.push(value);
            });
            return results;
        },

        grep: function (filter, iterator, context) {
            iterator = iterator || x.k;
            var results = [];

            if (Object.isString(filter))
                filter = new RegExp(filter);

            this.each(function (value, index) {
                if (filter.match(value))
                    results.push(iterator.call(context, value, index));
            });
            return results;
        },

        include: function (object) {
            if (Object.isFunction(this.indexOf))
                if (this.indexOf(object) != -1) return true;

            var found = false;
            this.each(function (value) {
                if (value == object) {
                    found = true;
                    throw $break;
                }
            });
            return found;
        },

        inGroupsOf: function (number, fillWith) {
            fillWith = Object.isUndefined(fillWith) ? null : fillWith;
            return this.eachSlice(number, function (slice) {
                while (slice.length < number) slice.push(fillWith);
                return slice;
            });
        },

        inject: function (memo, iterator, context) {
            this.each(function (value, index) {
                memo = iterator.call(context, memo, value, index);
            });
            return memo;
        },

        invoke: function (method) {
            var args = $A(arguments).slice(1);
            return this.map(function (value) {
                return value[method].apply(value, args);
            });
        },

        max: function (iterator, context) {
            iterator = iterator || x.k;
            var result;
            this.each(function (value, index) {
                value = iterator.call(context, value, index);
                if (result == null || value >= result)
                    result = value;
            });
            return result;
        },

        min: function (iterator, context) {
            iterator = iterator || x.k;
            var result;
            this.each(function (value, index) {
                value = iterator.call(context, value, index);
                if (result == null || value < result)
                    result = value;
            });
            return result;
        },

        partition: function (iterator, context) {
            iterator = iterator || x.k;
            var trues = [], falses = [];
            this.each(function (value, index) {
                (iterator.call(context, value, index) ?
        trues : falses).push(value);
            });
            return [trues, falses];
        },

        pluck: function (property) {
            var results = [];
            this.each(function (value) {
                results.push(value[property]);
            });
            return results;
        },

        reject: function (iterator, context) {
            var results = [];
            this.each(function (value, index) {
                if (!iterator.call(context, value, index))
                    results.push(value);
            });
            return results;
        },

        sortBy: function (iterator, context) {
            return this.map(function (value, index) {
                return {
                    value: value,
                    criteria: iterator.call(context, value, index)
                };
            }).sort(function (left, right) {
                var a = left.criteria, b = right.criteria;
                return a < b ? -1 : a > b ? 1 : 0;
            }).pluck('value');
        },

        toArray: function () {
            return this.map();
        },

        zip: function () {
            var iterator = x.k, args = $A(arguments);
            if (Object.isFunction(args.last()))
                iterator = args.pop();

            var collections = [this].concat(args).map($A);
            return this.map(function (value, index) {
                return iterator(collections.pluck(index));
            });
        },

        size: function () {
            return this.toArray().length;
        },

        inspect: function () {
            return '#<Enumerable:' + this.toArray().inspect() + '>';
        }
    };

    x.ext(Array.prototype, Enumerable);

    if (!Array.prototype._reverse) { Array.prototype._reverse = Array.prototype.reverse; }

    x.ext(Array.prototype, {
        _each: function (iterator) {
            for (var i = 0, length = this.length; i < length; i++) {
                iterator(this[i]);
            }
        },

        clear: function () {
            this.length = 0;
            return this;
        },

        first: function () {
            return this[0];
        },

        last: function () {
            return this[this.length - 1];
        },

        compact: function () {
            return this.select(function (value) {
                return value != null;
            });
        },

        flatten: function () {
            return this.inject([], function (array, value) {
                return array.concat(Object.isArray(value) ?
        value.flatten() : [value]);
            });
        },

        without: function () {
            var values = $A(arguments);
            return this.select(function (value) {
                return !values.include(value);
            });
        },

        reverse: function (inline) {
            return (inline !== false ? this : this.toArray())._reverse();
        },

        reduce: function () {
            return this.length > 1 ? this : this[0];
        },

        uniq: function (sorted) {
            return this.inject([], function (array, value, index) {
                if (0 == index || (sorted ? array.last() != value : !array.include(value)))
                    array.push(value);
                return array;
            });
        },

        intersect: function (array) {
            return this.uniq().findAll(function (item) {
                return array.detect(function (value) { return item === value });
            });
        },

        clone: function () {
            return [].concat(this);
        },

        size: function () {
            return this.length;
        },

        inspect: function () {
            return '[' + this.map(Object.inspect).join(', ') + ']';
        }
    });

    /**
    * 扩展默认字符串对象.
    */
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, '');
        }
    };

    if (!String.prototype.ltrim) {
        String.prototype.ltrim = function () {
            return this.replace(/(^\s*)/g, '');
        }
    };

    if (!String.prototype.rtrim) {
        String.prototype.rtrim = function () {
            return this.replace(/(\s*$)/g, '');
        }
    };

    // 利用正则表达式检测字符串规则
    if (!String.prototype.exists) {
        String.prototype.exists = function (regexp) {
            return this.match(regexp) !== null;
        }
    };

    /* JSONPath 0.8.0 - XPath for JSON
    *
    * Copyright (c) 2007 Stefan Goessner (goessner.net)
    * Licensed under the MIT (MIT-LICENSE.txt) licence.
    */
    function jsonPath(obj, expr, arg) {
        var P = {
            resultType: arg && arg.resultType || "VALUE",
            result: [],
            normalize: function (expr) {
                var subx = [];
                return expr.replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) { return "[#" + (subx.push($1) - 1) + "]"; })
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function ($0, $1) { return subx[$1]; });
            },
            asPath: function (path) {
                var x = path.split(";"), p = "$";
                for (var i = 1, n = x.length; i < n; i++)
                    p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
                return p;
            },
            store: function (p, v) {
                if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
                return !!p;
            },
            trace: function (expr, val, path) {
                if (expr) {
                    var x = expr.split(";"), loc = x.shift();
                    x = x.join(";");
                    if (val && val.hasOwnProperty(loc))
                        P.trace(x, val[loc], path + ";" + loc);
                    else if (loc === "*")
                        P.walk(loc, x, val, path, function (m, l, x, v, p) { P.trace(m + ";" + x, v, p); });
                    else if (loc === "..") {
                        P.trace(x, val, path);
                        P.walk(loc, x, val, path, function (m, l, x, v, p) { typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m); });
                    }
                    else if (/,/.test(loc)) { // [name1,name2,...]
                        for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                            P.trace(s[i] + ";" + x, val, path);
                    }
                    else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                        P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                    else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                        P.walk(loc, x, val, path, function (m, l, x, v, p) { if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m)) P.trace(m + ";" + x, v, p); });
                    else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                        P.slice(loc, x, val, path);
                }
                else
                    P.store(path, val);
            },
            walk: function (loc, expr, val, path, f) {
                if (val instanceof Array) {
                    for (var i = 0, n = val.length; i < n; i++)
                        if (i in val)
                            f(i, loc, expr, val, path);
                }
                else if (typeof val === "object") {
                    for (var m in val)
                        if (val.hasOwnProperty(m))
                            f(m, loc, expr, val, path);
                }
            },
            slice: function (loc, expr, val, path) {
                if (val instanceof Array) {
                    var len = val.length, start = 0, end = len, step = 1;
                    loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function ($0, $1, $2, $3) { start = parseInt($1 || start); end = parseInt($2 || end); step = parseInt($3 || step); });
                    start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
                    end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
                    for (var i = start; i < end; i += step)
                        P.trace(i + ";" + expr, val, path);
                }
            },
            eval: function (x, _v, _vname) {
                try { return $ && _v && eval(x.replace(/@/g, "_v")); }
                catch (e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
            }
        };

        var $ = obj;
        if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
            P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
            return P.result.length ? P.result : false;
        }
    }

    return x;
});
