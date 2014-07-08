// -*- ecoding=utf-8 -*-

/**
* @namespace net
* @memberof x
* @description 网络
*/
x.net = {

    xhr: function()
    {
        // -------------------------------------------------------
        // 可选择参数
        // waitingMessage   等待窗口显示的文本信息。
        // popResultValue   弹出回调结果。
        // callback         回调函数。
        // -------------------------------------------------------

        var url, xml, options;

        if (arguments.length == 2 && typeof (arguments[1]) === 'object')
        {
            // 支持没有Xml数据，只有地址和回调函数的调用。

            url = arguments[0];
            options = arguments[1];
            xml = '';
        }
        else if (arguments.length == 2 && typeof (arguments[1]) === 'string')
        {
            // 支持没有回调函数，只有地址和Xml数据的调用。

            url = arguments[0];
            options = {};
            xml = arguments[1];
        }
        else
        {
            url = arguments[0];
            xml = arguments[1];
            options = arguments[2];
        }

        if (typeof (options.waitingMessage) !== 'undefined' && options.waitingMessage !== '' && x.customForm)
        {
            // 开启等待窗口
            x.net.getWaitingWindow({ text: options.waitingMessage, type: options.waitingType }).show();
        }

        var type = x.isUndefined(options.type, 'POST');

        var data = { xml: xml };

        if (x.net.getClientSignature() != '') { data.clientSignature = x.net.getClientSignature(); }

        if (x.net.getClientId() != '')
        {
            data.clientId = x.net.getClientId();

            if (x.net.getClientSecret() != '')
            {
                data.clientSecret = x.net.getClientSecret();
            }
        }

        $.ajax({
            type: type,
            url: url,
            data: data,
            success: function(response)
            {
                if (typeof (options.waitingMessage) !== 'undefined' && options.waitingMessage !== '')
                {
                    // 关闭等待窗口
                    x.net.getWaitingWindow({ type: options.waitingType }).hide();
                }

                if (options.returnType == 'json')
                {
                    // 捕获处理异常
                    x.net.fetchException(response, options.outputException);

                    var result = x.toJSON(response).message;

                    switch (Number(result.returnCode))
                    {
                        case 0:
                            if (typeof (options.popResultValue) !== 'undefined' && options.popResultValue === 1)
                            {
                                alert(result.value);
                            }

                            if (typeof (options.callback) !== 'undefined')
                            {
                                options.callback(response);
                            }
                            break;

                        case -1:
                        case 1:
                            alert(result.value);
                            break;

                        default:
                            alert(result.value);
                            break;
                    }
                }
                else
                {
                    if (typeof (options.callback) !== 'undefined')
                    {
                        options.callback(response);
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                x.debug.log(XMLHttpRequest.responseText);

                if (typeof (options.error) !== 'undefined')
                {
                    options.error(XMLHttpRequest, textStatus, errorThrown);
                }
                else
                {
                    if (XMLHttpRequest.status == 401)
                    {
                        alert('访问被拒绝，客户试图未经授权访问受密码保护的页面。');
                    }
                    else if (XMLHttpRequest.status == 404)
                    {
                        alert('无法找到指定位置的资源。');
                    }
                    else if (XMLHttpRequest.status == 500)
                    {
                        alert('服务器繁忙，请稍候再试。');
                    }
                    else if (XMLHttpRequest.status != 0)
                    {
                        x.debug.error('系统错误，错误代码【' + XMLHttpRequest.status + (XMLHttpRequest.statusText != '' ? (' ' + XMLHttpRequest.statusText) : '') + '】。');
                    }
                }
            }
        });
    },

    /**
    * 获取客户端签名信息
    */
    getClientSignature: function()
    {
        // 根据页面存放的 system$signature 元素，获取签名信息
        var clientSignature = x.form.query('system$signature').val();

        // 如果页面不存在 system$signature 元素，则返回空值。
        if (typeof (clientSignature) == 'undefined') { clientSignature = ''; }

        return clientSignature;
    },

    /**
    * 获取客户端标识信息
    */
    getClientId: function()
    {
        // 根据页面存放的 session$clientId 元素，获取签名信息
        var clientId = x.form.query('session$clientId').val();

        // 如果页面不存在 session$clientId 元素，则返回空值。
        if (typeof (clientId) == 'undefined') { clientId = ''; }

        return clientId;
    },

    /**
    * 获取客户端标识信息
    */
    getClientSecret: function()
    {
        // 根据页面存放的 session$clientId 元素，获取签名信息
        var clientSecret = x.form.query('session$clientSecret').val();

        // 如果页面不存在 session$clientId 元素，则返回空值。
        if (typeof (clientSecret) == 'undefined') { clientSecret = ''; }

        return clientSecret;
    },

    /**
    * 抓取Ajax请求返回的异常
    */
    fetchException: function(response, outputType)
    {
        try
        {
            var result = x.toJSON(response);

            if (typeof (result) != 'undefined' && typeof (result.message) != 'undefined' && typeof (result.message.category) != 'undefined' && result.message.category === 'exception')
            {
                if (outputType == 'console')
                {
                    x.debug.error(result.message.description);
                }
                else
                {
                    alert(result.message.description);
                }
            }
        }
        catch (ex)
        {
            x.debug.error(ex);
        }
    },

    /**
    * Ajax 请求的默认回调函数
    */
    request_callback: function(response)
    {
        var result = x.toJSON(response).message;

        switch (Number(result.returnCode))
        {
            case 0:
                // 0:正确操作
                // alert(result.value);
                break;
            case -1:
            case 1:
                // -1:异常信息 | 1:错误信息
                alert(result.value);
                break;
            default:
                alert(result.value);
                break;
        }
    },

    /*#region 函数:getWaitingWindow(options)*/
    /*
    * 私有函数
    */
    getWaitingWindow: function(options)
    {
        if (typeof (options) === 'undefined')
        {
            options = {};
        }

        if (typeof (options.type) === 'undefined')
        {
            options.type = 'default';
        }

        if (typeof (options.name) === 'undefined')
        {
            options.name = x.getFriendlyName(location.pathname + '$' + options.type + '$waiting$window');
        }

        if (typeof (options.text) === 'undefined')
        {
            options.text = '正在处理数据，请稍候......';
        }

        var name = options.name;

        if (typeof (window[name]) === 'undefined')
        {
            if (options.type == 'mini')
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

                    maxOpacity: 0.9,

                    maxDuration: 0.6,

                    height: 50,

                    width: 200,

                    /*#region 函数:create(text)*/
                    create: function(text)
                    {
                        if (document.getElementById(this.name + '$text') == null)
                        {
                            $(document.body).append('<div id="' + this.name + '$container" class="ajax-dialog-waiting-mini-window-container" ><div id="' + this.name + '$text" class="ajax-dialog-waiting-mini-window-text" >' + text + '</div></div>');
                        }
                        else
                        {
                            document.getElementById(this.name + '$text').innerHTML = text;
                        }

                        if (this.container === null)
                        {
                            this.container = document.getElementById(this.name + '$container');
                            this.maskWrapper = document.getElementById(this.name + '$maskWrapper');
                        }
                    },
                    /*#endregion*/

                    /*#region 函数:show(text)*/
                    /*
                    * 显示
                    */
                    show: function(text)
                    {
                        if (typeof (text) !== 'undefined')
                        {
                            this.options.text = text;
                        }

                        this.create(this.options.text);

                        // 设置弹出窗口的位置
                        this.container.style.display = '';
                        this.container.style.position = 'absolute';
                        this.container.style.left = '4px';
                        this.container.style.bottom = '4px';
                    },
                    /*#endregion*/

                    /*#region 函数:hide()*/
                    /*
                    * 隐藏
                    */
                    hide: function()
                    {
                        if (this.container != null)
                        {
                            // this.container.style.display = 'none';
                            $(this.container).css({ display: '', opacity: this.maxOpacity });
                            $(this.container).fadeOut((this.maxDuration * 2000), function()
                            {
                                $(this.container).css({ display: 'none' });
                            });
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
                    lazy: options.lazy ? options.lazy : 0,

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

                        x.util.setLocation(this.container, pointX, pointY);
                    },
                    /*#endregion*/

                    /*#region 函数:createMaskWrapper()*/
                    createMaskWrapper: function()
                    {
                        var wrapper = document.getElementById(this.name + '$maskWrapper');

                        if (wrapper === null)
                        {
                            $(document.body).append('<div id="' + this.name + '$maskWrapper" style="display:none;" ></div>');

                            wrapper = document.getElementById(this.name + '$maskWrapper');
                        }

                        wrapper.className = 'ajax-dialog-mask-wrapper';

                        wrapper.style.height = x.page.getRange().height + 'px';
                        wrapper.style.width = x.page.getRange().width + 'px';

                        if (wrapper.style.display === 'none')
                        {
                            $(document.getElementById(this.name + '$maskWrapper')).css({ display: '', opacity: 0.1 });
                            $(document.getElementById(this.name + '$maskWrapper')).fadeTo((this.maxDuration * 1000), this.maxOpacity, function()
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
                        if (document.getElementById(this.name + '$text') == null)
                        {
                            $(document.body).append('<div id="' + this.name + '$container" class="ajax-dialog-waiting-window-container" ><div id="' + this.name + '$text" class="ajax-dialog-waiting-window-text" >' + text + '</div></div>');

                            this.createMaskWrapper();
                        }
                        else
                        {
                            document.getElementById(this.name + '$text').innerHTML = text;
                        }

                        if (this.container === null)
                        {
                            this.container = document.getElementById(this.name + '$container');
                            this.maskWrapper = document.getElementById(this.name + '$maskWrapper');
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

                        var timer = x.newTimer(this.lazy, function(timer)
                        {
                            if (that.lock > 0)
                            {
                                x.debug.log('x.customForm.waitingWindow.lock:【' + that.lock + '】');

                                if (that.maskWrapper === null)
                                {
                                    that.maskWrapper = x.mask.newMaskWrapper(that.name + '$maskWrapper');
                                }

                                if (typeof (text) !== 'undefined')
                                {
                                    that.options.text = text;
                                }

                                that.create(that.options.text);

                                // 设置弹出窗口的位置
                                var range = x.page.getRange();

                                var pointX = (range.width - that.width) / 2;
                                //var pointY = (range.height - this.height) / 3;
                                var pointY = 120;

                                x.util.setLocation(that.container, pointX, pointY);

                                // 设置弹出窗口的位置
                                that.container.style.display = '';
                                that.maskWrapper.style.display = '';
                            }

                            timer.stop();
                        });

                        timer.start();
                    },
                    /*#endregion*/

                    /*#region 函数:hide()*/
                    /*
                    * 隐藏
                    */
                    hide: function()
                    {
                        this.lock--;

                        x.debug.log('x.customForm.waitingWindow.lock:【' + this.lock + '】');

                        if (this.lock === 0)
                        {
                            if (this.container != null)
                            {
                                this.container.style.display = 'none';
                            }

                            if (this.maskWrapper != null && $(document.getElementById(this.name + '$maskWrapper')).css('display') !== 'none')
                            {
                                var that = this;

                                $(document.getElementById(this.name + '$maskWrapper')).css({ display: '', opacity: this.maxOpacity });
                                $(document.getElementById(this.name + '$maskWrapper')).fadeOut((this.maxDuration * 2000), function()
                                {
                                    $(document.getElementById(that.name + '$maskWrapper')).css({ display: 'none' });
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

    /**
    * 请求信息
    * @class request
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

            for (var i = 0; i < list.length; i++)
            {
                if (list[i].indexOf(key) === 0)
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

            if (list === '') { return; }

            for (var i = 0; i < list.length; i++)
            {
                temp = list[i].split('=');

                outString += '"' + temp[0] + '":"' + decodeURIComponent(temp[1]) + '"';

                if (i < list.length - 1)
                    outString += ',';
            }

            outString += '}';

            return x.evalJSON(outString);
        },
        /*#endregion*/

        /**
        * 获取附加了查询字符串的 URL 路径
        */
        getRawUrl: function()
        {
            return location.href.replace(location.origin, '');
        },

        /*
        * 判断锚点
        */
        hash: function(key)
        {
            return location.hash === ('#' + key) ? true : false;
        }
    }
};
