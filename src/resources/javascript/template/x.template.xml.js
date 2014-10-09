
template.xml = {
    /**
    * 解析 xml 字符串
    */
    parse: function(xml)
    {
        var buffer = template.xml.syntax(xml);

        return buffer.join('');
    },
    syntax: function(xml)
    {
        var buffer = [], originalBuffer = [];

        buffer = template.xml.array(xml);

        for (var i = 0; i < buffer.length; i++)
        {
            if (buffer[i].indexOf('</') == -1 && buffer[i].indexOf('<') < buffer[i].indexOf('>'))
            {
                // open tag

                var openTag = buffer[i];

                var closeTag = template.xml.closeTag(openTag);

                // console.log(openTag);

                var code = openTag.match(/x-(if|else|foreach)\=\"([a-zA-Z0-9-_\=\/\' ]+)\"/);

                if (x.isArray(code) && code.length == 3)
                {
                    // 判断是否存在语法

                    openTag = openTag.replace(code[0], '');

                    if (code[1] == "foreach")
                    {
                        buffer[i] = openTag + '{{foreach ' + code[2] + '}}';

                        buffer = template.xml.injectionCode(buffer, i, openTag, closeTag, code[1]);
                    }
                    else if (code[1] == "if")
                    {
                        buffer[i] = '{{if ' + code[2] + '}}' + openTag;

                        buffer = template.xml.injectionCode(buffer, i, openTag, closeTag, code[1]);
                    }
                    else if (code[1] == "else")
                    {
                        buffer[i] = '{{else}}' + openTag;
                    }
                }
            }
        }

        buffer = template.xml.array(buffer.join(''));

        return buffer;
    },

    /**
    * 将html字符转成数组
    */
    array: function()
    {
        var buffer = [], originalBuffer = [];

        // 分词: <
        originalBuffer = arguments[0].split(/</g);

        x.each(originalBuffer, function(index, node)
        {
            if (x.string.trim(node) != '' && index > 0)
            {
                buffer[buffer.length] = '<' + node;
            }
            else
            {
                buffer[buffer.length] = node;
            }
        });

        // 分词: >
        originalBuffer = buffer;

        buffer = [];

        for (var i = 0; i < originalBuffer.length; i++)
        {
            var text = x.string.trim(originalBuffer[i]);

            if (text != '')
            {
                if (text.indexOf('>') == -1)
                {
                    buffer[buffer.length] = text;
                    continue;
                }

                var nodes = text.split(/>/g);

                for (var j = 0; j < nodes.length; j++)
                {
                    if (nodes[j] != '')
                    {
                        if (nodes[j].indexOf('<') == 0)
                        {
                            buffer[buffer.length] = nodes[j] + '>';
                        }
                        else
                        {
                            buffer[buffer.length] = nodes[j];
                        }
                    }
                }
            }
        }

        // 分词: {{
        originalBuffer = buffer;

        buffer = [];

        for (var i = 0; i < originalBuffer.length; i++)
        {
            var text = x.string.trim(originalBuffer[i]);

            if (text != '')
            {
                if (text.indexOf('{{') == -1)
                {
                    buffer[buffer.length] = text;
                    continue;
                }

                var nodes = text.split(/{{/g);

                for (var j = 0; j < nodes.length; j++)
                {
                    if (nodes[j] != '')
                    {
                        if (j > 0)
                        {
                            buffer[buffer.length] = '{{' + nodes[j];
                        }
                        else
                        {
                            buffer[buffer.length] = nodes[j];
                        }
                    }
                }
            }
        }

        // 分词: }}
        originalBuffer = buffer;

        buffer = [];

        for (var i = 0; i < originalBuffer.length; i++)
        {
            var text = x.string.trim(originalBuffer[i]);

            if (text != '')
            {
                if (text.indexOf('}}') == -1)
                {
                    buffer[buffer.length] = text;
                    continue;
                }

                var nodes = text.split(/}}/g);

                for (var j = 0; j < nodes.length; j++)
                {
                    if (nodes[j] != '')
                    {
                        if (nodes[j].indexOf('{{') > -1)
                        {
                            buffer[buffer.length] = nodes[j] + '}}';
                        }
                        else
                        {
                            buffer[buffer.length] = nodes[j];
                        }
                    }
                }
            }
        }

        // 格式化标签
        for (var i = 0; i < buffer.length; i++)
        {
            var isTag = false;

            if (buffer[i].indexOf('<') < buffer[i].indexOf(' />'))
            {
                // single tag
                isTag = true;
            }
            else if (buffer[i].indexOf('</') == -1 && buffer[i].indexOf('<') < buffer[i].indexOf('>'))
            {
                // open tag
                isTag = true;
            }
            else if (buffer[i].indexOf('</') < buffer[i].indexOf('>'))
            {
                // close tag
                isTag = true;
            }

            if (isTag)
            {
                // 统一格式 小写, 去除两侧空白
                buffer[i] = buffer[i].toLowerCase().trim();
            }
        }

        return buffer;
    },
    // isTag: function() { },
    /**
    * 获取结束标记
    */
    closeTag: function(openTag)
    {
        var tag = openTag.match(/(<?\w+)|(<\/?\w+)\s/);

        if (tag)
        {
            if (!tag[0].match(/img|input/))
            {
                return '</' + tag[0].replace('<', '') + '>';
            }
        }

        return null;
    },

    injectionCode: function(buffer, beginIndex, openTag, closeTag, expression)
    {
        // x.debug.log('beginIndex:' + beginIndex + ', openTag:' + openTag + ', closeTag:' + closeTag + ', expression:' + expression);

        var deep = 0, endIndex = beginIndex;

        // 格式化开始标签
        openTag = openTag.match(/<\w+/)[0];

        for (var i = beginIndex + 1; i < buffer.length; i++)
        {
            if (buffer[i] == closeTag)
            {
                if (deep > 0)
                {
                    deep--;
                    continue;
                }

                if (expression == 'foreach')
                {
                    buffer[i] = '{{/' + expression + '}}' + buffer[i];
                }
                else if (expression == 'if')
                {
                    buffer[i] = buffer[i] + '{{/' + expression + '}}';
                }
                break;
            }
            else if (buffer[i].indexOf(openTag + '>') > -1 || buffer[i].indexOf(openTag + ' ') > -1)
            {
                deep++;
            }
        }

        return buffer;
    }
}