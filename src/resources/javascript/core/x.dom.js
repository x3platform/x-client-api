// -*- ecoding=utf-8 -*-

/**
* @namespace form
* @memberof x
* @description 表单管理
*/
x.dom = {

    /*#region 函数:query(selector)*/
    /**
    * 精确查询单个表单元素，返回一个jQuery对象。
    * @method query
    * @memberof x.dom
    * @param {string} selector 元素Id名称
    */
    query: function(selector)
    {
        // 默认根据id查找元素
        if (selector.indexOf('#') == -1 && selector.indexOf('.') == -1 && selector.indexOf(' ') == -1) { selector = '[id="' + selector + '"]'; }

        var element = x.query(selector);

        // $(null) 会返回 整个文档对象，所以定义一个特殊 __null__ 变量替代空值。
        return element === null ? $('#__null__') : $(element);
    },
    /*#endregion*/

    /*#region 函数:query(selector)*/
    /**
    * 获取元素的。
    * @method query
    * @memberof x.dom
    * @param {string} selector 元素Id名称
    */
    options: function(id)
    {
        var node = document.getElementById(id)

        if (node == null) { return null; }

        var value = node.getAttribute('x-dom-options');

        return (x.isUndefined(value) || value == '') ? {} : x.toJSON(value);
    },
    /*#endregion*/

    /*#region 函数:swap(options)*/
    /**
    * 交换控件的数据
    * @method swap
    * @memberof x.dom
    * @param {object} options 选项
    */
    swap: function(options)
    {
        var fromInput = x.dom.query(options.from);
        var toInput = x.dom.query(options.to);

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

    /**
    * 设置元素的位置
    *
    * @element	: 元素
    * @pointX   : 坐标x.
    * @pointY	: Y坐标
    */
    fixed: function(selector, pointX, pointY)
    {
        x.css.style(selector, {
            'position': 'fixed',
            'left': pointX + 'px',
            'top': pointY + 'px'
        });
    },

    /**
    * 设置容器的透明度
    *
    * container: 容器对象
    * value : 范围 0.0-0.9
    */
    setAlpha: function(element, value)
    {
        if (x.browser.ie)
        {
            // IE
            element.style.filter = 'alpha(opacity:' + (value * 100) + ')';
        }
        else
        {
            //其他浏览器
            element.style.MozOpacity = value;
        }
    },

    /**
    * select 元素相关的操作函数
    */
    select: {

        /**
        * 清空select元素中的所有option元素.
        */
        clear: function(selectName)
        {
            var select = x.dom.query(selectName)[0];

            // clear options
            try
            {
                if (x.net.browser.getName() == 'Internet Explorer')
                {
                    var selectObjectLength = select.options.length;

                    // IE
                    while (selectObjectLength !== 0)
                    {
                        selectObjectLength = select.options.length;

                        for (var i = 0; i < selectObjectLength; i++)
                        {
                            select.options.remove(i);
                        }

                        selectObjectLength = select.options.length;
                    }
                }
                else
                {
                    select.innerHTML = '';
                }
            }
            catch (ex)
            {
                select.innerHTML = ''; // Firefox
            }
        },

        /**
        * 添加 select 元素的 options 元素
        * @method add
        * @memberof x.dom.select
        */
        add: function(selectName, text, value)
        {
            var select = x.dom.query(selectName)[0];

            var option = document.createElement('option');

            option.value = value;
            option.innerHTML = text;

            select.appendChild(option);
        },

        /**
        * 把一个数组信息转换为 select 元素的 options 元素.
        */
        convert: function(selectName, options)
        {
            // clear options
            x.dom.select.clear(selectName);

            x.dom.select.append(selectName, options);
        },

        /**
        * 把一个数组信息追加为select元素的options元素.
        */
        append: function(selectName, options)
        {
            var select = x.dom.query(selectName)[0];

            // append options
            for (var i = 0; i < options.length; i++)
            {
                x.dom.select.add(selectName, options[i].text, options[i].value);
            }

            // 如果长度为1, 直接禁用.
            if (select.options.lenght == 1) { select.disabled = false; }
        },

        /**
        * 获取 select 元素的文本信息.
        * @method getText
        * @memberof x.dom.select
        */
        getText: function(selectName)
        {
            var select = x.dom.query(selectName)[0];

            var value = x.dom.select.getValue(selectName);

            for (var i = 0; i < select.options.length; i++)
            {
                if (select.options[i].value == value)
                {
                    return select.options[i].text;
                }
            }

            return '';
        },

        /**
        * 获取 select 元素的值
        * @method getValue
        * @memberof x.dom.select
        */
        getValue: function(selectName)
        {
            document.getElementById(selectName).value;
        },

        /**
        * 设置 select 元素的值
        * @method setValue
        * @memberof x.dom.select
        */
        setValue: function(selectName, value)
        {
            var select = $(selectName);

            for (var i = 0; i < select.options.length; i++)
            {
                if (select.options[i].value == value)
                {
                    try
                    {
                        select.selectedIndex = i;
                        select.options[i].selected = true;
                        return true;
                    }
                    catch (ex)
                    {
                    }
                }
            }

            select.selectedIndex = 0;
        }
    },

    checkbox: {
        /**
        * 获取checkbox元素的值.
        */
        getValue: function(checkboxName)
        {
            var result = '';

            var list = document.getElementsByName(checkboxName);

            for (var i = 0; i < list.length; i++)
            {
                if (list[i].checked)
                {
                    result += (result == '' ? '' : ',') + list[i].value;
                }
            }

            return result.trim(',');
        },

        /**
        * 设置checkbox元素的值.
        */
        setValue: function(checkboxName, value)
        {
            var list = document.getElementsByName(checkboxName);

            for (var i = 0; i < list.length; i++)
            {
                if (list[i].value == value)
                {
                    list[i].checked = true;
                    x.dom.checkbox.setCheckboxViewValue(list[i].id, true);
                }
            }
        },

        selectAll: function(checkboxName, checked)
        {
            var list = document.getElementsByName(checkboxName);

            checked = typeof (checked) == 'undefined' ? true : checked;

            for (var i = 0; i < list.length; i++)
            {
                list[i].checked = checked;
                x.dom.checkbox.setCheckboxViewValue(list[i].id, checked);
            }
        },

        /**
        * 反选
        */
        selectInverse: function(checkboxName)
        {
            var list = document.getElementsByName(checkboxName);

            for (var i = 0; i < list.length; i++)
            {
                list[i].checked = !list[i].checked;
                x.dom.checkbox.setCheckboxViewValue(list[i].id, list[i].checked);
            }
        },

        setCheckboxViewValue: function(id, value)
        {
            var checkboxView = x.dom.query(id + '$$view');

            if (checkboxView.size() > 0)
            {
                if (x.net.browser.brand('ie') && x.net.browser.getVersion() < 7)
                {
                    checkboxView[0].checked = value;
                }
                else
                {
                    if (value)
                    {
                        checkboxView.css({ 'background': 'url(/resources/images/x-ajax-controls.png) -3px -117px no-repeat' });
                        checkboxView.parent().css({ 'background': 'url(/resources/images/x-ajax-controls.png) -3px -41px no-repeat' });
                    }
                    else
                    {
                        checkboxView.css({ 'background': 'url(/resources/images/x-ajax-controls.png) -3px -41px no-repeat' });
                    }
                }
            }
        }
    },

    radio: {

        /**
        * 获取radio元素的值.
        */
        getValue: function(radioName)
        {
            var list = document.getElementsByName(radioName);

            for (var i = 0; i < list.length; i++)
            {
                if (list[i].checked)
                {
                    return list[i].value;
                }
            }

            return '';
        },

        /**
        * 设置radio元素的值.
        */
        setValue: function(radioName, value)
        {
            var list = document.getElementsByName(radioName);

            for (var i = 0; i < list.length; i++)
            {
                if (list[i].value == value)
                {
                    list[i].checked = true;
                    break;
                }
            }
        }
    },

    /*
    * 文本框
    */
    textarea: {
        /**
        * 获取textarea元素的值.
        */
        getValue: function(textareaName)
        {
            var re = /\n/g;

            return x.query(textareaName).value.replace(re, '<br \/>');
        },

        /**
        * 设置textarea元素的值.
        */
        setValue: function(textareaName, value)
        {
            var re = /<br \/>/g;

            value = value.replace(re, '\n');

            if (x.query(textareaName) == null)
            {
                x.query(textareaName).value = value;
            }

            return value;
        }
    },

    features: {

        /**
        * 默认配置信息
        */
        defaults: {
            // 特性属性名称
            scope: 'input,textarea,div,span',
            // 脚本文件夹位置
            featureScriptFilePath: '',
            // 特性属性名称
            featureAttributeName: 'x-dom-feature',
            // 特性是否已加载标识属性名称
            featureLoadedAttributeName: 'x-dom-featureLoaded',
            // 监听函数, 参数 element 页面元素
            listen: null
        },

        /**
        * 绑定客户端控件
        */
        bind: function(options)
        {
            options = x.ext(x.dom.features.defaults, options || {});

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

                        var feature = x.dom.query(list[i].id).attr(options.featureAttributeName);

                        if (feature != null && x.dom.query(list[i].id).attr(options.featureLoadedAttributeName) != '1')
                        {
                            x.require({
                                id: 'x-dom-feature-' + feature + '-script',
                                path: options.featureScriptPath + 'x.dom.features.' + feature + '.js',
                                data: { target: list[i], feature: feature },
                                callback: function(context)
                                {
                                    // x.debug.log('feature:' + feature + ',' + response.data.feature);
                                    var data = context.data;

                                    // 加载完毕后, 加个 featureLoaded 标识, 避免重复加载效果.
                                    x.dom.query(data.target.id).attr(options.featureLoadedAttributeName, '1');

                                    if (x.isUndefined(x.dom.features[data.feature]))
                                    {
                                        x.debug.error('x.dom.features.bind() 异常:系统加载表单元素特性【' + data.feature + '】失败，请检查相关配置。');
                                    }

                                    x.dom.features[data.feature].bind(data.target.id);
                                }
                            });

                            /*
                            // 加载完毕后, 加个 featureLoaded 标识, 避免重复加载效果.
                            x.dom.query(list[i].id).attr(options.featureLoadedAttributeName, '1');

                            if (x.isUndefined(x.dom.features[feature]))
                            {
                            x.debug.error('x.dom.features.bind() 异常:系统加载表单元素特性【' + feature + '】失败，请检查相关配置。');
                            continue;
                            }

                            x.dom.features[feature].bind(list[i].id);
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
};
