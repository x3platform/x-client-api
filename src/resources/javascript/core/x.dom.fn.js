/*#region 函数:val()*/
/**
 * 获取对象的值
 * @method val
 * @memberof x.dom
 */
dom.fn.val = function(value)
{
    var element = this[0];

    if (x.isUndefined(value))
    {
        return element.nodeType === 1 ? element.value : undefined;
    }
    else
    {
        x.each(this.results, function(index, node)
        {
            node.value = value;
        });
    }

    return this;
};

var valHooks = [];

/*#endregion*/

/*#region 函数:html()*/
dom.fn.html = function(value)
{
    if (x.isUndefined(value))
    {
        var element = this[0];

        return element.nodeType === 1 ? element.innerHTML : undefined;
    }
    else
    {
        x.each(this.results, function(index, node)
        {
            node.innerHTML = value;
        });
    }

    return this;
};
/*#endregion*/

/*#region 函数:size()*/
/**
 * 查看结果集记录数
 * @method size
 * @memberof x.dom
 */
dom.fn.size = function()
{
    return this.results.length;
};
/*#endregion*/

/*#region 函数:css()*/
/**
 * 设置样式
 * @method css
 * @memberof x.dom
 */
dom.fn.css = function()
{
    if (arguments.length == 1 && x.type(arguments[0]) == 'string')
    {
        var element = this[0];

        var args = Array.prototype.slice.call(arguments).slice(0);

        args.unshift(element);

        return x.css.style.apply(this, args);
    }
    else
    {
        var me = this;

        var originalArgs = Array.prototype.slice.call(arguments).slice(0);

        x.each(this.results, function(index, node)
        {
            var args = originalArgs.slice(0);

            args.unshift(node);

            x.css.style.apply(me, args);
        });
    }

    return this;
};
/*#endregion*/