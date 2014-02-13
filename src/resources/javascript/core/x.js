// -*- ecoding : utf-8 -*-

define(['jquery'], function($)
{
    /**
    * @namespace x
    * @description 默认根命名空间
    */
    var x = {

        version: '1.0.0.0',

        author: 'ruanyu@live.com',

        publishDate: '2010-01-01',

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

            /**
            * 检测浏览器品牌信息.
            */
            //            brand: function(value)
            //            {
            //                var name = x.browser.getName();

            //                switch (value.toLowerCase())
            //                {
            //                    case 'ie':
            //                    case 'internet explorer':
            //                        return (name === 'Internet Explorer') ? true : false;

            //                    case 'chrome':
            //                        return (name === 'Chrome') ? true : false;

            //                    case 'firefox':
            //                        return (name === 'Firefox') ? true : false;

            //                    case 'opera':
            //                        return (name === 'Opera') ? true : false;

            //                    case 'safari':
            //                        return (name === 'Safari') ? true : false;

            //                    case 'camino':
            //                        return (name === 'Camino') ? true : false;

            //                    case 'gecko':
            //                        return (name === 'Gecko') ? true : false;
            //                }
            //            },

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
            XPath: !!document.evaluate,
            SelectorsAPI: !!document.querySelector,
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
        * 空函数 emptyFunction
        */
        emptyFunction: function() { },

        /**
        *
        */
        k: function(x) { return x; },

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

        /**
        * 执行对象方法
        * @method invoke
        * @memberof x
        */
        invoke: function(object, fun)
        {
            var args = Array.prototype.slice.call(arguments).slice(2);

            return function()
            {
                return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)));
            }
        },

        /*
        * 执行对象方法
        * @method call
        * @memberof x
        */
        call: function(callback)
        {
            if (typeof (callback) !== 'undefined')
            {
                if (typeof (callback) === 'function')
                {
                    callback();
                }
                else
                {
                    if (callback !== '') { eval(callback); }
                }
            }
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
            if (typeof (text) === 'object') { return text; }

            if (typeof (text) === 'undefined' || text === '')
            {
                return undefined;
            }

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
<<<<<<< HEAD
        * @example
        * // 将路径中的[.-/]符号替换为[$]符号
        * console.log(x.getFriendlyName(location.pathname));
=======
>>>>>>> 86d619ad16f6d4840df8ba2f3eaae9c8014fd094
        */
        getFriendlyName: function(name)
        {
            return name.replace(/[\.\/-]/g, '$').replace(/\$\$/g, '$');
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
        isUndefined: function(value, replacementValue)
        {
            return (typeof (value) === 'undefined') ? replacementValue : value;
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
            create: function(length)
            {
                var result = '';

                var buffer = "0123456789abcdefghijklmnopqrstuvwyzx";

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
                if (typeof (trimText) == 'undefined')
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
                if (typeof (trimText) == 'undefined')
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
                if (typeof (trimText) == 'undefined')
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
            newWindow: function(name, options)
            {
                var __window__ = {

                    name: name,
                    options: options,

                    /*#region 函数:create()*/
                    create: function()
                    {
                        x.debug.error("必须重写向导对象的 create() 方法。");

                        return "必须重写向导对象的 create() 方法。";
                    },
                    /*#endregion*/

                    /*#region 函数:bindOptions(options)*/
                    bindOptions: function(options)
                    {
                        x.debug.error("必须重写向导对象的 bindOptions() 方法。");
                    },
                    /*#endregion*/

                    render: function()
                    {
                        // 验证并绑定选项信息
                        this.bindOptions(options);

                        // 设置重写后的创建函数
                        if (typeof (options.create) !== 'undefined')
                        {
                            this.create = options.create;
                        }

                        // 加载遮罩和页面内容
                        this.create();

                        x.form.features.bind();
                    }
                };

                return __window__;
            },

            getWindow: function(name, options)
            {
                var name = x.getFriendlyName(location.pathname + '$window$' + name);

                var __window__ = x.ext({}, x.wizards.newWindow(name, options));

                // 加载界面、数据、事件
                __window__.render();

                // 绑定到Window对象
                window[name] = __window__;

                return wizard;
            },

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
            },

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

                window.open(url, '', style);
            }
        }
    };

    // -------------------------------------------------------
    // 扩展 Object 对象方法
    // -------------------------------------------------------

    /**
    * 创建 Object 对象
    * @class Object 扩展 Javascript 的 Object 对象的方法
    * @constructor Object
    */
    x.ext(Object, {

        /**
        * 检查对象类型
        * @method inspect
        * @memberof Object
        */
        inspect: function(object)
        {
            try
            {
                if (Object.isUndefined(object)) { return 'undefined'; }
                if (object === null) { return 'null'; }

                return object.inspect ? object.inspect() : String(object);
            }
            catch (ex)
            {
                if (ex instanceof RangeError) { return '...'; }

                throw ex;
            }
        },

        /*#region 函数:create(length)*/
        /**
        * 克隆对象
        * @method clone
        * @memberof Object
        * @returns {object} 克隆的对象
        */
        clone: function(object)
        {
            return x.ext({}, object);
        },
        /*#endregion*/

        /**
        * 检查对象类型
        * @method inspect
        * @memberof Object
        */
        isElement: function(object)
        {
            return !!(object && object.nodeType == 1);
        },

        /**
        * 检查对象类型
        * @method inspect
        * @memberof Object
        */
        isArray: function(object)
        {
            // return object != null && typeof object == "object" && 'splice' in object && 'join' in object;
            // 新的方式
            return Object.prototype.toString.apply(object) === '[object Array]';
        },

        /**
        * 检查对象类型
        * @method inspect
        * @memberof Object
        */
        isHash: function(object)
        {
            return object instanceof Hash;
        },

        /**
        * 检查对象类型
        * @method inspect
        * @memberof Object
        */
        isFunction: function(object)
        {
            return typeof object == 'function';
        },

        /**
        * 检查对象类型
        * @method inspect
        * @memberof Object
        */
        isString: function(object)
        {
            // return typeof object == 'string';
            return Object.prototype.toString.apply(object) === '[object String]';
        },

        /**
        * 判断对象是否是 Number 类型
        * @method inspect
        * @memberof Object
        */
        isNumber: function(object)
        {
            // return typeof object == 'number';
            return Object.prototype.toString.apply(object) === '[object Number]';
        },

        /**
        * 判断对象是否是 undefined 类型
        * @method isUndefined
        * @memberof Object
        */
        isUndefined: function(object)
        {
            return typeof (object) === 'undefined';
        }
    });

    // -------------------------------------------------------
    // 扩展 Function 对象方法
    // -------------------------------------------------------

    if (!Function.prototype.bind)
    {
        Function.prototype.bind = function(that)
        {
            if (typeof this !== "function")
            {
                // closest thing possible to the ECMAScript 5 internal
                // IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function() { },
				fBound = function()
				{
				    return fToBind.apply(this instanceof fNOP
					     ? this
					     : that || window,
					     aArgs.concat(Array.prototype.slice.call(arguments)));
				};

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    };

    // -------------------------------------------------------
    // 扩展 Array 对象方法
    // -------------------------------------------------------

    var $break = {};

    // 枚举
    var Enumerable = {
        each: function(iterator, context)
        {
            var index = 0;
            try
            {
                this._each(function(value)
                {
                    iterator.call(context, value, index++);
                });
            }
            catch (e)
            {
                if (e != $break) throw e;
            }
            return this;
        },

        eachSlice: function(number, iterator, context)
        {
            var index = -number, slices = [], array = this.toArray();
            if (number < 1) return array;
            while ((index += number) < array.length)
                slices.push(array.slice(index, index + number));
            return slices.collect(iterator, context);
        },

        all: function(iterator, context)
        {
            iterator = iterator || x.k;
            var result = true;
            this.each(function(value, index)
            {
                result = result && !!iterator.call(context, value, index);
                if (!result) throw $break;
            });
            return result;
        },

        any: function(iterator, context)
        {
            iterator = iterator || x.k;
            var result = false;
            this.each(function(value, index)
            {
                if (result = !!iterator.call(context, value, index))
                    throw $break;
            });
            return result;
        },

        collect: function(iterator, context)
        {
            iterator = iterator || x.k;
            var results = [];
            this.each(function(value, index)
            {
                results.push(iterator.call(context, value, index));
            });
            return results;
        },

        detect: function(iterator, context)
        {
            var result;
            this.each(function(value, index)
            {
                if (iterator.call(context, value, index))
                {
                    result = value;
                    throw $break;
                }
            });
            return result;
        },

        findAll: function(iterator, context)
        {
            var results = [];
            this.each(function(value, index)
            {
                if (iterator.call(context, value, index))
                    results.push(value);
            });
            return results;
        },

        grep: function(filter, iterator, context)
        {
            iterator = iterator || x.k;
            var results = [];

            if (Object.isString(filter))
                filter = new RegExp(filter);

            this.each(function(value, index)
            {
                if (filter.match(value))
                    results.push(iterator.call(context, value, index));
            });
            return results;
        },

        include: function(object)
        {
            if (Object.isFunction(this.indexOf))
                if (this.indexOf(object) != -1) return true;

            var found = false;
            this.each(function(value)
            {
                if (value == object)
                {
                    found = true;
                    throw $break;
                }
            });
            return found;
        },

        inGroupsOf: function(number, fillWith)
        {
            fillWith = Object.isUndefined(fillWith) ? null : fillWith;
            return this.eachSlice(number, function(slice)
            {
                while (slice.length < number) slice.push(fillWith);
                return slice;
            });
        },

        inject: function(memo, iterator, context)
        {
            this.each(function(value, index)
            {
                memo = iterator.call(context, memo, value, index);
            });
            return memo;
        },

        invoke: function(method)
        {
            var args = $A(arguments).slice(1);
            return this.map(function(value)
            {
                return value[method].apply(value, args);
            });
        },

        max: function(iterator, context)
        {
            iterator = iterator || x.k;
            var result;
            this.each(function(value, index)
            {
                value = iterator.call(context, value, index);
                if (result == null || value >= result)
                    result = value;
            });
            return result;
        },

        min: function(iterator, context)
        {
            iterator = iterator || x.k;
            var result;
            this.each(function(value, index)
            {
                value = iterator.call(context, value, index);
                if (result == null || value < result)
                    result = value;
            });
            return result;
        },

        partition: function(iterator, context)
        {
            iterator = iterator || x.k;
            var trues = [], falses = [];
            this.each(function(value, index)
            {
                (iterator.call(context, value, index) ?
        trues : falses).push(value);
            });
            return [trues, falses];
        },

        pluck: function(property)
        {
            var results = [];
            this.each(function(value)
            {
                results.push(value[property]);
            });
            return results;
        },

        reject: function(iterator, context)
        {
            var results = [];
            this.each(function(value, index)
            {
                if (!iterator.call(context, value, index))
                    results.push(value);
            });
            return results;
        },

        sortBy: function(iterator, context)
        {
            return this.map(function(value, index)
            {
                return {
                    value: value,
                    criteria: iterator.call(context, value, index)
                };
            }).sort(function(left, right)
            {
                var a = left.criteria, b = right.criteria;
                return a < b ? -1 : a > b ? 1 : 0;
            }).pluck('value');
        },

        toArray: function()
        {
            return this.map();
        },

        zip: function()
        {
            var iterator = x.k, args = $A(arguments);
            if (Object.isFunction(args.last()))
                iterator = args.pop();

            var collections = [this].concat(args).map($A);
            return this.map(function(value, index)
            {
                return iterator(collections.pluck(index));
            });
        },

        size: function()
        {
            return this.toArray().length;
        },

        inspect: function()
        {
            return '#<Enumerable:' + this.toArray().inspect() + '>';
        }
    };

    // 扩展
    x.ext(Array.prototype, Enumerable);

    if (!Array.prototype._reverse) { Array.prototype._reverse = Array.prototype.reverse; }

    /**
    * 创建 Array 对象
    * @class Array 扩展 Javascript 的 Array 对象的方法
    * @constructor Array
    */
    x.ext(Array.prototype, {
        _each: function(iterator)
        {
            for (var i = 0, length = this.length; i < length; i++)
            {
                iterator(this[i]);
            }
        },

        clear: function()
        {
            this.length = 0;
            return this;
        },

        first: function()
        {
            return this[0];
        },

        last: function()
        {
            return this[this.length - 1];
        },

        compact: function()
        {
            return this.select(function(value)
            {
                return value != null;
            });
        },

        flatten: function()
        {
            return this.inject([], function(array, value)
            {
                return array.concat(Object.isArray(value) ?
        value.flatten() : [value]);
            });
        },

        without: function()
        {
            var values = $A(arguments);
            return this.select(function(value)
            {
                return !values.include(value);
            });
        },

        reverse: function(inline)
        {
            return (inline !== false ? this : this.toArray())._reverse();
        },

        reduce: function()
        {
            return this.length > 1 ? this : this[0];
        },

        uniq: function(sorted)
        {
            return this.inject([], function(array, value, index)
            {
                if (0 == index || (sorted ? array.last() != value : !array.include(value)))
                    array.push(value);
                return array;
            });
        },

        intersect: function(array)
        {
            return this.uniq().findAll(function(item)
            {
                return array.detect(function(value) { return item === value });
            });
        },

        clone: function()
        {
            return [].concat(this);
        },

        size: function()
        {
            return this.length;
        },

        inspect: function()
        {
            return '[' + this.map(Object.inspect).join(', ') + ']';
        }
    });

    // -------------------------------------------------------
    // 扩展 String 对象方法
    // -------------------------------------------------------

    /*#region 类:String*/
    /**
    * 创建 String 对象
    * @class String 扩展 Javascript 的 String 对象的方法
    * @constructor String
    */

    /*#region 函数:trim()*/
    if (!String.prototype.trim)
    {
        /**
        * 去除字符串两侧空白
        * @method trim
        * @memberof String#
        * @returns {string}
        */
        String.prototype.trim = function()
        {
            return this.replace(/(^\s*)|(\s*$)/g, '');
        }
    };
    /*#endregion*/

    /*#region 函数:ltrim()*/
    if (!String.prototype.ltrim)
    {
        /**
        * 去除字符串左侧空白
        * @method ltrim
        * @memberof String#
        * @returns {string}
        */
        String.prototype.ltrim = function()
        {
            return this.replace(/(^\s*)/g, '');
        }
    };
    /*#endregion*/

    /*#region 函数:rtrim()*/
    if (!String.prototype.rtrim)
    {
        /**
        * 去除字符串右侧空白
        * @method rtrim
        * @memberof String#
        * @returns {string}
        */
        String.prototype.rtrim = function()
        {
            return this.replace(/(\s*$)/g, '');
        }
    };
    /*#endregion*/

    /*#region 函数:exists()*/
    if (!String.prototype.exists)
    {
        /**
        * 利用正则表达式验证字符串规则
        * @method exists
        * @memberof String#
        * @param {RegExp} regexp 正则表达式
        * @returns {bool}
        */
        String.prototype.exists = function(regexp)
        {
            return this.match(regexp) !== null;
        }
    };
    /*#endregion*/

    /*#endregion*/

    if (window)
    {
        window.$x$ = x;
    }

    return x;
});
