/**
* 编译模板
* 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
* @name    template.compile
* @param   {String}    模板字符串
* @param   {Object}    编译选项
*
*      - openTag       {String}
*      - closeTag      {String}
*      - fileName      {String}
*      - escape        {Boolean}
*      - compress      {Boolean}
*      - debug         {Boolean}
*      - cache         {Boolean}
*      - parser        {Function}
*
* @return  {Function}  渲染方法
*/
var compile = template.compile = function(source, options)
{
    options = x.ext(template.defaults, options || {});

    var fileName = options.fileName;

    try
    {
        var Render = compiler(source, options);
    }
    catch (ex)
    {
        ex.fileName = fileName || 'anonymous';
        ex.name = 'Syntax Error';

        return showDebugInfo(ex);
    }

    // 对编译结果进行一次包装
    function render(data)
    {
        try
        {
            return new Render(data, fileName) + '';

        }
        catch (ex)
        {
            // 运行时出错后自动开启调试模式重新编译
            if (!options.debug)
            {
                options.debug = true;
                return compile(source, options)(data);
            }

            return showDebugInfo(ex)();
        }
    }

    render.prototype = Render.prototype;
    render.toString = function()
    {
        return Render.toString();
    };

    if (fileName && options.cache)
    {
        cacheStore[fileName] = render;
    }

    return render;
};

// 静态分析模板变量
var KEYWORDS =
// 关键字
    'break,case,catch,continue,debugger,default,delete,do,else,false'
    + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
    + ',throw,true,try,typeof,var,void,while,with'

// 保留字
    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
    + ',final,float,goto,implements,import,int,interface,long,native'
    + ',package,private,protected,public,short,static,super,synchronized'
    + ',throws,transient,volatile'

// ECMA 5 - use strict
    + ',arguments,let,yield'

    + ',undefined';

var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
var SPLIT_RE = /[^\w$]+/g;
var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
var BOUNDARY_RE = /^,+|,+$/g;

// 获取变量
function getVariable(code)
{
    return code
        .replace(REMOVE_RE, '')
        .replace(SPLIT_RE, ',')
        .replace(KEYWORDS_RE, '')
        .replace(NUMBER_RE, '')
        .replace(BOUNDARY_RE, '')
        .split(/^$|,+/);
};

// 字符串转义
function stringify(code)
{
    return "'" + code
    // 单引号与反斜杠转义
        .replace(/('|\\)/g, '\\$1')
    // 换行符转义(windows + linux)
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n') + "'";
}

function compiler(source, options)
{
    var debug = options.debug;
    var openTag = options.openTag;
    var closeTag = options.closeTag;
    var parser = options.parser;
    var compress = options.compress;
    var escape = options.escape;

    var line = 1;
    var uniq = { $data: 1, $fileName: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 };

    // 字符串数组拼接
    var isNewEngine = ''.trim; // '__proto__' in {}
    var replaces = isNewEngine
    ? ["$out='';", "$out+=", ";", "$out"]
    : ["$out=[];", "$out.push(", ");", "$out.join('')"];

    var concat = isNewEngine
        ? "$out+=text;return $out;"
        : "$out.push(text);";

    var print = "function(){"
    + "var text=''.concat.apply('',arguments);"
    + concat
    + "}";

    var include = "function(fileName,data){"
    + "data=data||$data;"
    + "var text=$utils.$include(fileName,data,$fileName);"
    + concat
    + "}";

    var headerCode = "'use strict';"
    + "var $utils=this,$helpers=$utils.$helpers,"
    + (debug ? "$line=0," : "");

    var mainCode = replaces[0];

    var footerCode = "return new String(" + replaces[3] + ");"

    // Html与逻辑语法分离
    x.each(source.split(openTag), function(index, code)
    {
        code = code.split(closeTag);

        var $0 = code[0];
        var $1 = code[1];

        if (code.length === 1)
        {
            // code: [html]
        
            mainCode += html($0);
        }
        else
        {
            // code: [logic, html]
         
            mainCode += logic($0);

            if ($1)
            {
                mainCode += html($1);
            }
        }
    });

    // 输出最后代码
    var code = headerCode + mainCode + footerCode;

    // 调试语句
    if (debug)
    {
        code = "try{" + code + "}catch(ex){"
        + "throw {"
        + "fileName:$fileName,"
        + "name:'Render Error',"
        + "message:ex.message,"
        + "line:$line,"
        + "source:" + stringify(source)
        + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')"
        + "};"
        + "}";
    }

    try
    {
        var Render = new Function("$data", "$fileName", code);
        Render.prototype = utils;

        return Render;
    }
    catch (ex)
    {
        ex.temp = "function anonymous($data,$fileName) {" + code + "}";
        throw ex;
    }

    /*#region 函数:html(code)*/
    /**
    * 处理 HTML 语句
    */
    function html(code)
    {
        // 记录行号
        line += code.split(/\n/).length - 1;

        // 压缩多余空白与注释
        if (compress)
        {
            code = code.replace(/\s+/g, ' ').replace(/<!--.*?-->/g, '');
        }

        if (code)
        {
            code = replaces[1] + stringify(code) + replaces[2] + "\n";
        }

        return code;
    }

    /**
    * 处理逻辑语句
    */
    function logic(code)
    {
        var thisLine = line;

        if (parser)
        {
            // 语法转换插件钩子
            code = parser(code, options);
        }
        else if (debug)
        {
            // 记录行号
            code = code.replace(/\n/g, function()
            {
                line++;
                return "$line=" + line + ";";
            });
        }

        // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
        // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
        if (code.indexOf('=') === 0)
        {
            var escapeSyntax = escape && !/^=[=#]/.test(code);

            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

            // 对内容编码
            if (escapeSyntax)
            {
                var name = code.replace(/\s*\([^\)]+\)/, '');

                // 排除 utils.* | include | print

                if (!utils[name] && !/^(include|print)$/.test(name))
                {
                    code = "$escape(" + code + ")";
                }

                // 不编码
            }
            else
            {
                code = "$string(" + code + ")";
            }

            code = replaces[1] + code + replaces[2];
        }

        if (debug)
        {
            code = "$line=" + thisLine + ";" + code;
        }

        // 提取模板中的变量名
        x.each(getVariable(code), function(index, name)
        {
            // name 值可能为空，在安卓低版本浏览器下
            if (!name || uniq[name])
            {
                return;
            }

            var value;

            // 声明模板变量
            // 赋值优先级:
            // [include, print] > utils > helpers > data
            if (name === 'print')
            {
                value = print;
            }
            else if (name === 'include')
            {
                value = include;
            }
            else if (utils[name])
            {
                value = "$utils." + name;
            }
            else if (helpers[name])
            {
                value = "$helpers." + name;
            }
            else
            {

                value = "$data." + name;
            }

            headerCode += name + "=" + value + ",";
            uniq[name] = true;

        });

        return code + "\n";
    }
};



