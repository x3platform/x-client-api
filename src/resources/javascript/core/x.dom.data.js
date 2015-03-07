// -*- ecoding=utf-8 -*-

/**
* @namespace data
* @memberof x.dom
* @description 页面元素数据管理
*/
dom.data = {
    // 默认配置信息
    defaults: {
        // 存储格式的类型
        storageType: 'normal',
        // 数据类型属性名称
        dataTypeAttributeName: 'x-dom-data-type',
        // 数据必填项验证属性名称
        dataRequiredAttributeName: 'x-dom-data-required',
        // 数据必填项验证失败提示信息证属性名称
        dataRequiredWarningAttributeName: 'x-dom-data-required-warning',
        // 数据正则表达式规则验证属性名称
        dataRegexpAttributeName: 'x-dom-data-regexp',
        // 数据正则表达式规则验证属性名称
        dataRegexpNameAttributeName: 'x-dom-data-regexp-name',
        // 数据正则表达式规则验证失败提示信息证属性名称
        dataRegexpWarningAttributeName: 'x-dom-data-regexp-warning'
    },

    /*#region 函数:bindInputData(options)*/
    /*
    * 绊定控件的数据
    */
    bindInputData: function(options)
    {
        // options.inputName ,options multiSelection
        var input = x.dom(options.inputName);

        if ('[contacts],[corporation],[project]'.indexOf(options.featureName) > -1)
        {
            // 根据data标签的数据内容设置隐藏值和文本信息
            var data = input.attr('x-dom-data');

            if (typeof (data) !== 'undefined' && data.indexOf('#') > -1)
            {
                var selectedValue = '';
                var selectedText = '';

                var list = x.string.trim(data, ',').split(',');

                for (var i = 0; i < list.length; i++)
                {
                    selectedValue += list[i].split('#')[1] + ',';
                    selectedText += list[i].split('#')[2] + ';';

                    // 单选时,只取data第一个值
                    if (options.multiSelection === 0) { break; }
                }

                selectedValue = x.string.rtrim(selectedValue, ',');
                selectedText = x.string.rtrim(selectedText, ';');

                if (options.multiSelection === 1)
                {
                    // 多选
                    input.val(data);
                }
                else
                {
                    // 单选
                    input.val(selectedValue);
                }

                input.attr('selectedText', selectedText);
            }
        }
    },
    /*#endregion*/

    /*#region 函数:check(options)*/
    /*
    * 验证客户端数据
    */
    check: function(options)
    {
        // 设置默认选项参数
        options = x.ext({
            // 提示工具条
            tooltip: 0,
            // 提示框
            alert: 1
        }, options || {});

        var warning = '';

        var list = x.dom('*');

        x.each(list, function(index, node)
        {
            try
            {
                if(x.type(node) == 'array' || x.type(node) == 'function') return;

                if(x.dom(node).attr('x-dom-data-required') || x.dom(node).attr('x-dom-data-regexp'))
                {
                    warning += x.dom.data.checkDataInput(node, options.tooltip);
                }
            }
            catch (ex)
            {
                x.debug.error(ex);
            }
        });

        if (warning === '')
        {
            return false;
        }
        else
        {
            alert(warning);
            return true;
        }
    },
    /*#endregion*/

    /*#region 函数:checkDataInput(node, warnTooltip)*/
    /*
    * 验证客户端数据
    */
    checkDataInput: function(node, warnTooltip)
    {
        // 如果没有id信息，或者为空则不检测
        if (typeof (node.id) === 'undefined' || node.id === '') { return ''; }

        var warning = '';

        if (warnTooltip == 1)
        {
            x.tooltip.newWarnTooltip({ element: node.id, hide: 1 });
        }

        if($(node).attr('x-dom-data-required'))
        {
            // 数据必填项验证
            if ($(node).val().trim() === '')
            {
                var dataVerifyWarning = $(node).attr('x-dom-data-required-warning');

                // x.debug.log('x:' + x.page.getElementLeft(node) + ' y:' + x.page.getElementTop(node));

                if (dataVerifyWarning)
                {
                    if (warnTooltip == 1)
                    {
                        x.tooltip.newWarnTooltip({ element: node.id, message: dataVerifyWarning, hide: 0 });
                    }

                    warning += dataVerifyWarning + '\n';
                }
            }
        }
       
        if($(node).attr('x-dom-data-regexp'))
        {
            // 数据规则验证
            if ($(node).val().trim() !== '')
            {
                if(!x.expressions.exists({ text: $(node).val(), ignoreCase: $(node).attr('x-dom-data-regexp-ignoreCase'), regexpName: $(node).attr('x-dom-data-regexp-name'), regexp: $(node).attr('x-dom-data-regexp') }))
                {
                    var dataRegExpWarning = $(node).attr('x-dom-data-regexp-warning');

                    // x.debug.log(x.page.getElementTop(node));

                    if (dataRegExpWarning)
                    {
                        if (warnTooltip == 1)
                        {
                            x.tooltip.newWarnTooltip({ element: node.id, message: dataRegExpWarning, hide: 0 });
                        }

                        warning += dataRegExpWarning + '\n';
                    }
                }
            }
        }

        return warning;
    },
    /*#endregion*/

    /*#region 函数:serialize(options)*/
    /**
    * 序列化数据
    */
    serialize: function(options)
    {
        options = x.ext({}, x.dom.data.defaults, options || {});

        // 统一格式为大写
        options.storageType = options.storageType.toUpperCase();

        if (x.isUndefined(serializeHooks[options.storageType])) { x.debug.error('Not supported serialize[{"storageType":"' + options.storageType + '"}].'); }

        return serializeHooks[options.storageType](options);
    }
    /*#endregion*/
};

var serializeHooks = [];

/*#region 函数:serializeHooks['NORMAL'](options)*/
/**
* 将表单数据序列化为普通格式数据
* @private
*/
serializeHooks['NORMAL'] = function(options)
{
    var outString = '';

    var list = x.dom('*');

    x.each(list, function(index, node)
    {
        try
        {
            if (x.isUndefined(node.id) || node.id === '') { return; }

            var dataType = x.dom(node).attr(options.dataTypeAttributeName);

            if (!x.isUndefined(dataType) && dataType != null)
            {
                switch (dataType)
                {
                    case 'value':
                        outString += node.id + '=' + encodeURIComponent(x.dom(node).val().trim()) + '&';
                        break;
                    case 'html':
                        outString += node.id + '=' + encodeURIComponent(x.dom(node).html().trim()) + '&';
                        break;
                    default:
                        break;
                }
            }
        }
        catch (ex)
        {
            x.debug.error(ex);
        }
    });

    // 移除最后一个 & 符号
    outString = x.string.rtrim(outString, '&');

    return outString;
};
/*#endregion*/

/*#region 函数:serializeHooks['JSON'](options)*/
/**
* 将表单数据序列化为JSON格式数据
* @private
*/
serializeHooks['JSON'] = function(options)
{
    var outString = '';

    if (options.includeRequestNode)
    {
        outString = '{"request":{'
    }

    var list = x.dom('*');

    x.each(list, function(index, node)
    {
        try
        {
            if (x.isUndefined(node.id) || node.id === '') { return; }

            var dataType = x.dom(node).attr(options.dataTypeAttributeName);

            if (!x.isUndefined(dataType) && dataType != null)
            {
                switch (dataType)
                {
                    case 'value':
                        outString += '"' + node.id + '":"' + x.toSafeJSON(x.dom(node).val().trim()) + '",';
                        break;
                    case 'html':
                        outString += '"' + node.id + '":"' + x.toSafeJSON(x.dom(node).html().trim()) + '",';
                        break;
                    case 'checkbox':
                        outString += '"' + node.id + '":[';

                        if ($(document.getElementsByName(node.id)).size() === 0)
                        {
                            outString += '],';
                            break;
                        }

                        var checkboxGroupName = node.id;

                        $(document.getElementsByName(node.id)).each(function(index, node)
                        {
                            if (checkboxGroupName === node.name && node.type.toLowerCase() === 'checkbox')
                            {
                                outString += '{"text":"' + $(node).attr('text') + '", "value":"' + x.toSafeJSON($(node).val()) + '", "checked":' + node.checked + '},';
                            }
                        });

                        if (outString.substr(outString.length - 1, 1) === ',')
                        {
                            outString = outString.substr(0, outString.length - 1);
                        }

                        outString += '],';

                        break;

                    case 'list':
                        outString += '"' + node.id + '":[';

                        if ($(this).find('.list-item').size() === 0)
                        {
                            outString += '],';
                            break;
                        }

                        $(this).find('.list-item').each(function(index, node)
                        {
                            outString += '[';

                            $(this).find('.list-item-colum').each(function(index, node)
                            {
                                if ($(node).hasClass('data-type-html'))
                                {
                                    outString += '"' + x.toSafeJSON($(node).html().trim()) + '",';
                                }
                                else
                                {
                                    outString += '"' + x.toSafeJSON($(node).val().trim()) + '",';
                                }
                            });

                            if (outString.substr(outString.length - 1, 1) === ',')
                            {
                                outString = outString.substr(0, outString.length - 1);
                            }

                            outString += '],';
                        });

                        if (outString.substr(outString.length - 1, 1) === ',')
                        {
                            outString = outString.substr(0, outString.length - 1);
                        }

                        outString += '],';

                        break;

                    case 'table':
                        outString += '"' + node.id + '":[';

                        $('#' + node.id).find('tr').each(function(index, node)
                        {
                            if ($(this).find('.table-td-item').size() === 0)
                            {
                                return;
                            }

                            outString += '[';

                            $(this).find('.table-td-item').each(function(index, node)
                            {
                                if ($(node).hasClass('data-type-html'))
                                {
                                    outString += '"' + x.toSafeJSON($(node).html().trim()) + '",';
                                }
                                else
                                {
                                    outString += '"' + x.toSafeJSON($(node).val().trim()) + '",';
                                }
                            });

                            if (outString.substr(outString.length - 1, 1) === ',')
                                outString = outString.substr(0, outString.length - 1);

                            outString += '],';
                        });

                        if (outString.substr(outString.length - 1, 1) === ',')
                            outString = outString.substr(0, outString.length - 1);

                        outString += '],';

                        break;
                    default:
                        break;
                }
            }
        }
        catch (ex)
        {
            x.debug.error(ex);
        }
    });

    // 移除最后一个逗号
    outString = x.string.rtrim(outString, ',');

    if (options.includeRequestNode)
    {
        outString += '}}';
    }

    return outString;
};
/*#endregion*/

/*#region 函数:serializeHooks['XML'](options)*/
serializeHooks['XML'] = function(options)
{
    var outString = '';

    if (typeof (options) == 'undefined')
    {
        options = { includeRequestNode: false };
    }

    if (options.includeRequestNode)
    {
        outString += '<?xml version="1.0" encoding="utf-8" ?>';
        outString += '<request>';
    }

    var list = x.dom('*');

    x.each(list, function(index, node)
    {
        try
        {
            if (x.isUndefined(node.id) || node.id === '') { return; }

            var dataType = x.dom(node).attr(options.dataTypeAttributeName);

            if (!x.isUndefined(dataType) && dataType != null)
            {
                switch (dataType)
                {
                    case 'value':
                        outString += '<' + node.id + '>' + x.cdata(x.dom(node).val().trim()) + '</' + node.id + '>';
                        break;
                    case 'html':
                        outString += '<' + node.id + '>' + x.cdata(x.dom(node).html().trim()) + '</' + node.id + '>';
                        break;
                    case 'select':

                        if ($(node).get(0).selectedIndex !== -1)
                        {
                            outString += '<' + node.id + '><![CDATA[' + x.toSafeJSON(x.dom(node).get(0)[$(node).get(0).selectedIndex].value.trim()) + ']]></' + node.id + '>';
                        }
                        else
                        {
                            outString += '<' + node.id + '></' + node.id + '>';
                        }
                        break;

                    case 'checkbox':
                        var checkboxs = document.getElementsByName("check" + node.id);
                        var checkboxsResult = "";
                        for (var i = 0; i < checkboxs.length; i++)
                        {
                            if (checkboxs[i].checked)
                            {
                                checkboxsResult += checkboxs[i].value + ';';
                            }
                        }

                        if (checkboxsResult !== '')
                        {
                            checkboxsResult = checkboxsResult.substring(0, checkboxsResult.length - 1);
                            outString += '<' + node.id + '><![CDATA[' + checkboxsResult + ']]></' + node.id + '>';
                        }
                        else
                        {
                            var notSelectedDefaultValue = $(node).attr('notSelectedDefaultValue');

                            if (notSelectedDefaultValue == undefined)
                            {
                                outString += '<' + node.id + '>' + x.cdata('') + '</' + node.id + '>';
                            }
                            else
                            {
                                outString += '<' + node.id + '><![CDATA[' + notSelectedDefaultValue + ']]></' + node.id + '>';
                            }
                        }
                        break;

                    default:
                        break;
                }
            }
        }
        catch (ex)
        {
            x.debug.error(ex);
        }
    });

    if (options.includeRequestNode)
    {
        outString += '</request>';
    }

    return outString;
}
/*#endregion*/