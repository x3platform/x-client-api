// 定义模板引擎的语法

var filtered = function(js, filter)
{
    var parts = filter.split(':');
    var name = parts.shift(); // shift 方法可移除数组中的第一个元素并返回该元素。
    var args = parts.join(':') || '';

    if (args)
    {
        args = ', ' + args;
    }

    return '$helpers.' + name + '(' + js + args + ')';
}

defaults.parser = function(code, options)
{
    // 去除左边的空格
    code = code.replace(/^\s/, '');

    var split = code.split(' ');
    var key = split.shift();
    var args = split.join(' ');

    switch (key)
    {
        case 'if':

            code = 'if(' + args + '){';
            break;

        case 'else':

            if (split.shift() === 'if')
            {
                split = ' if(' + split.join(' ') + ')';
            } else
            {
                split = '';
            }

            code = '}else' + split + '{';
            break;

        case '/if':

            code = '}';
            break;

        case 'foreach':

            if (split.length == 3 && split[1] == 'in')
            {
                var object = split[2] || '$data';
                var value = split[0] || '$value';

                var param = '$index,' + value;

                code = '$foreach(' + object + ',function(' + param + '){';
            }
            else if (split.length == 4 && split[2] == 'in')
            {
                var object = split[3] || '$data';
                var value = split[1] || '$value';
                var index = split[0] || '$index';

                var param = index + ',' + value;

                code = '$foreach(' + object + ',function(' + param + '){';
            }
            else
            {
                var object = split[3] || '$data';
                var adverb = split[2] || 'in';
                var value = split[1] || '$value';
                var index = split[0] || '$index';

                var param = index + ',' + value;

                if (adverb !== 'in')
                {
                    object = '[]';
                }

                code = '$foreach(' + object + ',function(' + param + '){';
            }
            break;

        case '/foreach':

            code = '});';
            break;

        case 'echo':

            code = 'print(' + args + ');';
            break;

        case 'print':
        case 'include':

            code = key + '(' + split.join(',') + ');';
            break;

        default:

            // 过滤器（辅助方法）
            // {{value | filterA:'abcd' | filterB}}
            // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
            if (args.indexOf('|') !== -1)
            {
                var escape = options.escape;

                // {{#value | link}}
                if (code.indexOf('#') === 0)
                {
                    code = code.substr(1);
                    escape = false;
                }

                var i = 0;
                var array = code.split('|');
                var len = array.length;
                var pre = escape ? '$escape' : '$string';
                var val = pre + '(' + array[i++] + ')';

                for (; i < len; i++)
                {
                    val = filtered(val, array[i]);
                }

                code = '=#' + val;

                // 即将弃用 {{helperName value}}
            }
            else if (template.helpers[key])
            {
                code = '=#' + key + '(' + split.join(',') + ');';

                // 内容直接输出 {{value}}
            }
            else
            {
                code = '=' + code;
            }

            break;
    }

    return code;
};


