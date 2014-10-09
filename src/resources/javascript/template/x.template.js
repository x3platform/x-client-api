/**
* 模板引擎
* @name    template
* @param   {String}            模板选项
* @return  {String, Function}  渲染好的HTML字符串或者渲染方法
*/
var template = function(options)
{
    // content, data
    if (options.fileName)
    {
        return typeof options.context === 'string' ?
        compile(options.data, { fileName: options.fileName }) :
        renderFile(options.fileName, options.data);
    }
    else 
    {
        return compile(options.content, x.ext(options, { fileName: 'tmp-' + x.randomText.create(8) }))(options.data);
        // fileName, options.data
    } 
};

template.version = '3.0.0';

/**
* 设置全局配置
* @name    template.config
* @param   {String}    名称
* @param   {Any}       值
*/
template.config = function(name, value)
{
    defaults[name] = value;
};

var defaults = template.defaults = {
    openTag: '{{',    // 逻辑语法开始标签
    closeTag: '}}',   // 逻辑语法结束标签
    escape: true,     // 是否编码输出变量的 HTML 字符
    cache: true,      // 是否开启缓存（依赖 options 的 fileName 字段）
    compress: false,  // 是否压缩输出
    parser: null      // 自定义语法格式器 @see: template-syntax.js
};

// 缓存
var cacheStore = template.cache = {};

/**
* 渲染模板
* @name    template.render
* @param   {String}    模板
* @param   {Object}    数据
* @return  {String}    渲染好的字符串
*/
template.render = function(source, options)
{
    return compile(source, options);
};

/**
* 渲染模板(根据模板名)
* @name    template.render
* @param   {String}    模板名
* @param   {Object}    数据
* @return  {String}    渲染好的字符串
*/
var renderFile = template.renderFile = function(fileName, data)
{
    var fn = template.get(fileName) || showDebugInfo({
        fileName: fileName,
        name: 'Render Error',
        message: 'Template not found'
    });

    return data ? fn(data) : fn;
};

/**
* 获取编译缓存（可由外部重写此方法）
* @param   {String}    模板名
* @param   {Function}  编译好的函数
*/
template.get = function(fileName)
{
    var cache;

    if (cacheStore[fileName])
    {
        // 使用内存缓存
        cache = cacheStore[fileName];
    }
    else if (typeof document === 'object')
    {
        // 加载模板并编译
        var elem = x.query(fileName);

        if (elem)
        {
            var source = (elem.value || elem.innerHTML).replace(/^\s*|\s*$/g, '');

            source = template.xml.parse(x.string.trim(source));

            cache = compile(source, { fileName: fileName });
        }
    }

    return cache;
};

//var escapeMap = {
//    "<": "&#60;",
//    ">": "&#62;",
//    '"': "&#34;",
//    "'": "&#39;",
//    "&": "&#38;"
//};


//var escapeFn = function(s)
//{
//    return escapeMap[s];
//};

//var escapeHTML = function(content)
//{
//    return toString(content)
//    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
//};

//var isArray = Array.isArray || function(obj)
//{
//    return ({}).toString.call(obj) === '[object Array]';
//};


//var each = function(data, callback)
//{
//    var i, len;
//    if (x.isArray(data))
//    {
//        for (i = 0, len = data.length; i < len; i++)
//        {
//            callback.call(data, data[i], i, data);
//        }
//    } 
//    else
//    {
//        for (i in data)
//        {
//            callback.call(data, data[i], i);
//        }
//    }
//};

var utils = template.utils = {

    $helpers: {},

    $include: renderFile,

    $string: toString,

    $escape: x.encoding.html.encode,

    $foreach: x.each
};

/**
* 添加模板辅助方法
* @name    template.helper
* @param   {String}    名称
* @param   {Function}  方法
*/
template.helper = function(name, helper)
{
    helpers[name] = helper;
};

var helpers = template.helpers = utils.$helpers;

/**
* 模板错误事件（可由外部重写此方法）
* @name    template.onerror
* @event
*/
template.onerror = function(ex)
{
    var message = 'Template Error\n\n';

    for (var name in ex)
    {
        message += '<' + name + '>\n' + ex[name] + '\n\n';
    }

    x.debug.error(message);
};


// 模板调试器
var showDebugInfo = function(ex)
{
    template.onerror(ex);

    return function()
    {
        return '{Template Error}';
    };
};