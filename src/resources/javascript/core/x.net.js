// -*- ecoding=utf-8 -*-

/**
* @namespace net
* @memberof x
* @description 网络
*/
x.net = {

    /**
    * 默认配置信息
    */
    defaults: {
        // 返回类型
        returnType: 'json',
        // 异步请求的数据键值
        xhrDataKey: 'xhr-xml',
        // 获取客户端标识信息        
        getClientId: function()
        {
            var element = x.query('#session-client-id');

            // 根据页面存放的 session-client-id 元素，获取客户端标识信息, 如果页面不存在 session-client-id 元素，则返回空值。
            return element == null ? '' : x.isUndefined(element.value, '');
        },
        // 获取客户端签名信息
        getClientSignature: function()
        {
            var element = x.query('#session-client-signature');

            // 根据页面存放的 session-client-signature 元素，获取签名信息, 如果页面不存在 session-client-signature 元素，则返回空值。
            return element == null ? '' : x.isUndefined(element.value, '');
        },
        // 获取时间信息
        getTimestamp: function()
        {
            var element = x.query('#session-timestamp');

            // 根据页面存放的 session-timestamp 元素，获取时间戳信息, 如果页面不存在 session-timestamp 元素，则返回空值。
            return element == null ? '' : x.isUndefined(element.value, '');
        },
        // 获取随机数信息
        getNonce: function()
        {
            var element = x.query('#session-nonce');

            // 根据页面存放的 session-nonce 元素，获取签名信息, 如果页面不存在 session-nonce 元素，则返回空值。
            return element == null ? '' : x.isUndefined(element.value, '');
        },
        // 获取等待窗口
        getWaitingWindow: function(options)
        {
            // 设置默认选项参数
            options = x.ext({
                type: 'default',                        // 窗口类型
                text: i18n.net.waiting.commitTipText    // 提示信息
            }, options || {});

            if(x.isUndefined(options.name))
            {
                options.name = x.getFriendlyName(location.pathname + '$' + options.type + '$waiting$window');
            }

            var name = options.name;

            if(x.isUndefined(window[name]))
            {
                if(options.type == 'mini')
                {
                    window[name] = {
                        // 名称
                        name: name,
                        // 选项
                        options: options,
                        // 容器
                        container: null,
                        // 消息框
                        message: null,

                        /*#region 函数:create(text)*/
                        create: function(text)
                        {
                            if(document.getElementById(this.name + '-text') == null)
                            {
                                $(document.body).append('<div id="' + this.name + '-container" class="x-ui-dialog-waiting-mini-window-container" ><div id="' + this.name + '-text" class="x-ui-dialog-waiting-mini-window-text" >' + text + '</div></div>');
                            }
                            else
                            {
                                x.query('[id="' + this.name + '-text"]').innerHTML = text;
                            }

                            if(this.container === null)
                            {
                                this.container = document.getElementById(this.name + '-container');
                            }
                        },
                        /*#endregion*/

                        /*#region 函数:show(text)*/
                        /*
                        * 显示
                        */
                        show: function()
                        {
                            if(!x.isUndefined(arguments[0]))
                            {
                                this.options.text = arguments[0];
                            }

                            this.create(this.options.text);

                            // 设置弹出窗口的位置
                            x.css.style(this.container, {
                                display: '',
                                position: 'fixed',
                                left: '4px',
                                bottom: '4px'
                            });
                        },
                        /*#endregion*/

                        /*#region 函数:hide()*/
                        /*
                        * 隐藏
                        */
                        hide: function()
                        {
                            if(this.container != null)
                            {
                                x.css.style(this.container, { display: 'none' });

                                // this.container.style.display = 'none';
                                // $(this.container).css({ display: '', opacity: this.maxOpacity });
                                // (this.container).fadeOut((this.maxDuration * 2000), function()
                                // {
                                //    $(this.container).css({ display: 'none' });
                                // });
                            }
                        }
                        /*#endregion*/
                    };
                }
                else
                {
                    window[name] = {
                        // 实例名称
                        name: name,

                        // 配置信息
                        options: options,

                        // 遮罩
                        maskWrapper: null,

                        // 容器
                        container: null,

                        // 消息框
                        message: null,

                        // 等待窗口的锁
                        lock: 0,

                        // 延迟显示等待窗口
                        // lazy: options.lazy ? options.lazy : 0,

                        maxOpacity: options.maxOpacity ? options.maxOpacity : 0.4,

                        maxDuration: options.maxDuration ? options.maxDuration : 0.2,

                        height: options.height ? options.height : 50,

                        width: options.width ? options.width : 200,

                        /*#region 函数:setPosition()*/
                        setPosition: function()
                        {
                            // 弹出窗口的位置
                            var range = x.page.getRange();

                            var pointX = (range.width - this.width) / 2;
                            var pointY = (range.height - this.height) / 3;

                            x.dom.fixed(this.container, pointX, pointY);
                        },
                        /*#endregion*/

                        /*#region 函数:createMaskWrapper()*/
                        createMaskWrapper: function()
                        {
                            var wrapper = document.getElementById(this.name + '-maskWrapper');

                            if(wrapper === null)
                            {
                                $(document.body).append('<div id="' + this.name + '-maskWrapper" style="display:none;" ></div>');

                                wrapper = document.getElementById(this.name + '-maskWrapper');
                            }

                            wrapper.className = 'x-ui-dialog-mask-wrapper';

                            wrapper.style.height = x.page.getRange().height + 'px';
                            wrapper.style.width = x.page.getRange().width + 'px';

                            if(wrapper.style.display === 'none')
                            {
                                $('#' + this.name + '-maskWrapper').css({ display: '', opacity: 0.1 });
                                $('#' + this.name + '-maskWrapper').fadeTo((this.maxDuration * 1000), this.maxOpacity, function()
                                {
                                    // var mask = window[this.id];

                                    // $(document.getElementById(mask.popupWindowName)).css({ display: '' });
                                });
                            }
                        },
                        /*#endregion*/

                        /*#region 函数:create(text)*/
                        create: function(text)
                        {
                            if(document.getElementById(this.name + '-text') == null)
                            {
                                $(document.body).append('<div id="' + this.name + '-container" class="x-ui-dialog-waiting-window-container" ><div id="' + this.name + '-text" class="x-ui-dialog-waiting-window-text" >' + text + '</div></div>');

                                this.createMaskWrapper();
                            }
                            else
                            {
                                document.getElementById(this.name + '-text').innerHTML = text;
                            }

                            if(this.container === null)
                            {
                                this.container = document.getElementById(this.name + '-container');
                                this.maskWrapper = document.getElementById(this.name + '-maskWrapper');
                            }
                        },
                        /*#endregion*/

                        /*#region 函数:show(text)*/
                        /*
                        * 显示
                        */
                        show: function(text)
                        {
                            this.lock++;

                            var that = this;

                            //var timer = x.newTimer(this.lazy, function(timer)
                            //{
                                if(that.lock > 0)
                                {
                                    // x.debug.log('x.net.waitingWindow.lock:【' + that.lock + '】');

                                    if(that.maskWrapper === null)
                                    {
                                        that.maskWrapper = x.ui.mask.newMaskWrapper(that.name + '-maskWrapper');
                                    }

                                    if(typeof (text) !== 'undefined')
                                    {
                                        that.options.text = text;
                                    }

                                    that.create(that.options.text);

                                    // 设置弹出窗口的位置
                                    var range = x.page.getRange();

                                    var pointX = (range.width - that.width) / 2;
                                    //var pointY = (range.height - this.height) / 3;
                                    var pointY = 120;

                                    x.dom.fixed(that.container, pointX, pointY);

                                    // 设置弹出窗口的位置
                                    that.container.style.display = '';
                                    that.maskWrapper.style.display = '';
                                }

                                //timer.stop();
                            //});

                            //timer.start();
                        },
                        /*#endregion*/

                        /*#region 函数:hide()*/
                        /*
                        * 隐藏
                        */
                        hide: function()
                        {
                            this.lock--;

                            // x.debug.log('x.net.waitingWindow.lock:【' + this.lock + '】');

                            if(this.lock === 0)
                            {
                                if(this.container != null)
                                {
                                    this.container.style.display = 'none';
                                }

                                if(this.maskWrapper != null && $(document.getElementById(this.name + '-maskWrapper')).css('display') !== 'none')
                                {
                                    var that = this;

                                    $(document.getElementById(this.name + '-maskWrapper')).css({ display: '', opacity: this.maxOpacity });
                                    $(document.getElementById(this.name + '-maskWrapper')).fadeOut((this.maxDuration * 2000), function()
                                    {
                                        $(document.getElementById(that.name + '-maskWrapper')).css({ display: 'none' });
                                    });
                                }
                            }
                        }
                        /*#endregion*/
                    };
                }
            }
            else
            {
                window[name].options = options;
            }

            return window[name];
        },
        /*#endregion*/

        // 捕获异常
        catchException: function(response, outputType)
        {
            try
            {
                var result = x.toJSON(response);

                if(!x.isUndefined(result) && !x.isUndefined(result.message) && !x.isUndefined(result.message.category) && result.message.category === 'exception')
                {
                    if(outputType == 'console')
                    {
                        x.debug.error(result.message.description);
                    }
                    else
                    {
                        x.msg(result.message.description);
                    }
                }
            }
            catch(ex)
            {
                x.debug.error(ex);
            }
        }
    },
    /*#endregion*/

    /**
    * 发起网络请求
    * @method xhr
    * @memberof x.net
    * @param {object} [options] 选项<br /> 
    * 可选值范围: 
    * <table class="param-options" >
    * <thead>
    * <tr><th>名称</th><th>类型</th><th class="last" >描述</th></tr>
    * </thead>
    * <tbody>
    * <tr><td class="name" >type</td><td>string</td><td>HTTP请求类型(GET|POST)</td></tr>
    * <tr><td class="name" >url</td><td>string</td><td>地址</td></tr>
    * <tr><td class="name" >data</td><td>object</td><td>数据</td></tr>
    * <tr><td class="name" >async</td><td>boolean</td><td>是否是异步请求</td></tr>
    * </tbody>
    * </table>
    */
    xhr: function()
    {
        // -------------------------------------------------------
        // 可选择参数
        // waitingMessage   等待窗口显示的文本信息。
        // popResultValue   弹出回调结果。
        // callback         回调函数。
        // -------------------------------------------------------

        var url, xhrDataValue, options;

        if(arguments.length == 2 && x.type(arguments[1]) === 'object')
        {
            // 支持没有Xml数据，只有地址和回调函数的调用。

            url = arguments[0];
            options = arguments[1];
            xhrDataValue = '';
        }
        else if(arguments.length == 2 && x.type(arguments[1]) === 'string')
        {
            // 支持没有回调函数，只有地址和Xml数据的调用。

            url = arguments[0];
            options = {};
            xhrDataValue = arguments[1];
        }
        else if(arguments.length == 3 && x.type(arguments[1]) === 'string' && x.isFunction(arguments[2]))
        {
            // 支持没有回调函数，只有地址和Xml数据的调用。

            url = arguments[0];
            options = { callback: arguments[2] };
            xhrDataValue = arguments[1];
        }
        else
        {
            url = arguments[0];
            xhrDataValue = arguments[1];
            options = arguments[2];
        }

        options = x.ext({}, x.net.defaults, options);

        // 判断是否启用等待窗口
        var enableWaitingWindow = x.isFunction(options.getWaitingWindow)
                                    && !x.isUndefined(options.waitingMessage)
                                    && options.waitingMessage !== '';

        if(enableWaitingWindow)
        {
            // 开启等待窗口
            options.getWaitingWindow({ text: options.waitingMessage, type: x.isUndefined(options.waitingType, 'default') }).show();
        }

        var type = x.isUndefined(options.type, 'POST');

        var async = x.isUndefined(options.async, false);

        // 设置 data 值
        var data = x.ext({}, options.data || {});

        var xml = x.toXML(xhrDataValue, 1);

        if(xhrDataValue != '' && xml)
        {
            data[options.xhrDataKey] = xhrDataValue;
        }
        else if(!xml && xhrDataValue.indexOf('=') > 0)
        {
            // 非Xml字符格式, 普通的POST数据
            var list = xhrDataValue.split('&');

            x.each(list, function(index, node)
            {
                var items = node.split('=');

                if(items.length == 2)
                {
                    data[items[0]] = decodeURIComponent(items[1]);
                }
            });
        }

        if(x.isFunction(options.getClientId) && options.getClientId() != '')
        {
            data.clientId = options.getClientId();

            if(x.isFunction(options.getClientId) && options.getClientSignature() != '')
            {
                data.clientSignature = options.getClientSignature();
                data.timestamp = options.getTimestamp();
                data.nonce = options.getNonce();
            }
        }

        // $.ajax 
        x.net.ajax({
            type: type,
            url: url,
            data: data,
            async: async,
            success: function(response)
            {
                if(enableWaitingWindow)
                {
                    // 关闭等待窗口
                    options.getWaitingWindow({ type: x.isUndefined(options.waitingType, 'default') }).hide();
                }

                if(options.returnType == 'json')
                {
                    // 捕获处理异常
                    options.catchException(response, options.outputException);

                    var result = x.toJSON(response).message;

                    switch(Number(result.returnCode))
                    {
                        case 0:
                            // 0:正确操作
                            if(!!options.popResultValue)
                            {
                                x.msg(result.value);
                            }

                            x.call(options.callback, response);
                            break;

                        case -1:
                        case 1:
                            // -1:异常信息 | 1:错误信息
                            x.msg(result.value);
                            break;
                        default:
                            // 其他信息
                            x.msg(result.value);
                            break;
                    }
                }
                else
                {
                    x.call(options.callback, response);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                x.debug.log(XMLHttpRequest.responseText);

                if(x.isFunction(options.error))
                {
                    options.error(XMLHttpRequest, textStatus, errorThrown);
                }
                else
                {
                    if(XMLHttpRequest.status == 401)
                    {
                        x.msg(i18n.net.errors['401']);
                    }
                    else if(XMLHttpRequest.status == 404)
                    {
                        x.msg(i18n.net.errors['404']);
                    }
                    else if(XMLHttpRequest.status == 500)
                    {
                        x.msg(i18n.net.errors['500']);
                    }
                    else if(XMLHttpRequest.status != 0)
                    {
                        x.debug.error(i18n.net.errors['unkown'].format(XMLHttpRequest.status + (XMLHttpRequest.statusText != '' ? (' ' + XMLHttpRequest.statusText) : '')));
                    }
                }
            }
        });
    },
    /*#endregion*/

    // 已加载的文件标识
    requireLoaded: {},

    /**
    * 通过Ajax方式加载样式和脚本
    */
    require: function(options)
    {
        options = x.ext({
            fileType: 'script',
            id: '',
            path: '',
            type: 'GET',
            async: true
        }, options || {});

        if(options.id != '' && x.net.requireLoaded[options.id])
        {
            x.debug.log('require file {"id":"{0}", path:"{1}"} exist. [ajax]'.format(options.id, options.path));

            x.call(options.callback);

            return true;
        }

        x.debug.log('require file {"id":"{0}", path:"{1}"} loading. [ajax]'.format(options.id, options.path));

        x.net.ajax(
        {
            type: options.type,
            url: options.path,
            async: options.async,
            success: function(responseText)
            {
                x.debug.log('require file {"id":"{0}", path:"{1}"} finished. [ajax]'.format(options.id, options.path));

                var head = document.getElementsByTagName("HEAD").item(0);

                if(options.fileType == 'template')
                {
                    var node = document.createElement("script");
                    node.type = "text/template";
                    node.src = options.path;
                }
                else if(options.fileType == 'css')
                {
                    var node = document.createElement("style");
                    node.type = "text/css";
                    node.href = options.path;
                }
                else
                {
                    var node = document.createElement("script");

                    node.language = "javascript";
                    node.type = "text/javascript";
                    node.src = options.path;
                }

                try
                {
                    // IE8以及以下不支持这种方式，需要通过text属性来设置
                    node.appendChild(document.createTextNode(responseText));
                }
                catch(ex)
                {
                    node.text = responseText;
                }

                if(options.id != '')
                {
                    node.id = options.id;
                    x.net.requireLoaded[options.id] = true;
                }

                head.appendChild(node);

                x.call(options.callback);
            }
        });
    },

    ajax: function(options)
    {
        var request = x.net.newHttpRequest(options);

        request.send();
    },
    /*#endregion*/

    newHttpRequest: function(options)
    {
        var request = {
            xhr: null,
            // 数据
            data: null,
            // 超时设置
            timeout: 90,
            // 是否已完成
            done: false,

            // 发送
            send: function()
            {
                if(this.xhr == null)
                {
                    this.xhr = x.net.newXmlHttpRequest();

                    if(!this.xhr)
                    {
                        x.debug.error('create xhr failed'); return false;
                    }
                }

                this.xhr.open(this.type, this.url, this.async);

                var me = this;

                x.event.add(this.xhr, "readystatechange", function()
                {
                    var xhr = me.xhr;

                    // 监听状态
                    // x.debug.log('{0} readyState:{1} status:{2} done:{3}'.format(x.debug.timestamp(), xhr.readyState, xhr.status, me.done));

                    // 保持等待，直到数据完全加载，并保证请求未超时  
                    if(xhr.readyState == 4 && !me.done)
                    {
                        // 0 为访问的本地，200 到 300 代表访问服务器成功，304 代表没做修改访问的是缓存
                        if(xhr.status == 0 || (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
                        {
                            // 成功则调用回调函数，并传入xhr对象  
                            x.call(me.success, xhr.responseText);
                        }
                        else
                        {
                            // 失败则调用error回调函数  
                            x.call(me.error, xhr, xhr.status);
                        }

                        // 避免内存泄漏，清理文档  
                        xhr = null;
                    }
                });

                // 如果请求超过 timeout 设置的时间没有响应, 则取消请求（如果尚未完成的话）  
                setTimeout(function() { me.done = true; }, me.timeout * 1000);

                if(this.type == 'POST')
                {
                    this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    this.xhr.send(x.serialize(this.data));
                }
                else
                {
                    // 发送同步请求，如果浏览器为Chrome或Opera，必须发布后才能运行，不然会报错
                    this.xhr.send(null);
                }
            },

            create: function(options)
            {
                options = x.ext({
                    type: 'GET',
                    url: '',
                    data: {},
                    async: true,
                    timeout: 90
                }, options || {});

                this.type = options.type.toUpperCase();
                this.url = options.url;
                this.data = options.data;
                this.async = options.async;
                this.timeout = options.timeout;

                this.success = options.success;
                this.error = options.error;
            }
        };

        // 初始化对象
        request.create(options);

        return request;
    },

    /*#region 函数:newXmlHttpRequest()*/
    /**
    * 创建 XMLHttpRequest 对象
    * @private
    */
    newXmlHttpRequest: function()
    {
        var xhr = null;

        if(window.ActiveXObject) // IE
        {
            try
            {
                // IE6 以及以后版本中可以使用
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(ex)
            {
                //IE5.5 以及以后版本可以使用
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        else if(window.XMLHttpRequest)
        {
            //Firefox，Opera 8.0+，Safari，Chrome
            xhr = new XMLHttpRequest();
        }

        return xhr;
    },
    /*#endregion*/

    /**
    * 请求信息
    * @namespace request
    * @memberof x.net
    */
    request: {

        /*#region 函数:find(key)*/
        /**
        * 获取请求地址中某个参数的值
        * @method find
        * @memberof x.net.request
        * @param {string} 参数的键
        * @returns {string} 参数的值
        */
        find: function(key)
        {
            var resultValue = '';
            var list = location.search.substr(1).split('&');

            for(var i = 0;i < list.length;i++)
            {
                if(list[i].indexOf(key) === 0)
                {
                    resultValue = decodeURIComponent(list[i].replace(key + '=', ''));
                    break;
                }
            }

            return resultValue;
        },
        /*#endregion*/

        /*#region 函数:findAll()*/
        /**
        * 查找请求的全部信息, 返回的值是个JSON格式.
        * 获取请求地址中所有参数的值
        * @method findAll
        * @memberof x.net.request
        * @returns {object} JSON格式的对象
        */
        findAll: function()
        {
            var outString = '';

            var list = location.search.substr(1).split('&');

            var temp;

            outString = '{';

            if(list === '') { return; }

            for(var i = 0;i < list.length;i++)
            {
                temp = list[i].split('=');

                outString += '"' + temp[0] + '":"' + decodeURIComponent(temp[1]) + '"';

                if(i < list.length - 1)
                    outString += ',';
            }

            outString += '}';

            return x.evalJSON(outString);
        },
        /*#endregion*/

        /*#region 函数:getRawUrl()*/
        /**
        * 获取附加了查询字符串的 URL 路径
        */
        getRawUrl: function()
        {
            return location.href.replace(location.origin, '');
        },
        /*#endregion*/

        /*#region 函数:hash(key)*/
        /*
        * 判断锚点
        */
        hash: function(key)
        {
            return location.hash === ('#' + key) ? true : false;
        }
        /*#endregion*/
    }
};

/*#region 私有函数:request_callback(response)*/
/**
* 网络请求的默认回调函数
* @private
*/
x.net.request_callback = function(response)
{
    var result = x.toJSON(response).message;

    switch(Number(result.returnCode))
    {
        case 0:
            // 0:正确操作
            // alert(result.value);
            break;
        case -1:
        case 1:
            // -1:异常信息 | 1:错误信息
            x.msg(result.value);
            break;
        default:
            // 其他信息
            x.msg(result.value);
            break;
    }
};
/*#endregion*/
