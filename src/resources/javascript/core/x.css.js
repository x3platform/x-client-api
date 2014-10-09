// -*- ecoding=utf-8 -*-

/**
* @namespace css
* @memberof x
* @description CSS
*/
var css = x.css = {
    /**
    * 特殊关键字映射关系字典
    * @private
    */
    dict: {},

    /*#region 函数:style(selector)*/
    /**
    * 获取或设置元素对象的样式信息
    * @method style
    * @memberof x.css
    * @param {string} selector 选择器或者元素对象
    * @returns {CSSStyleDeclaration} {@like https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration|CSSStyleDeclaration}
    */
    style: function(selector)
    {
        var element = x.query(selector);

        if (arguments.length == 1)
        {
            return element.currentStyle || window.getComputedStyle(element, null);
        }
        else if (arguments.length == 2)
        {
            if (x.type(arguments[1]) == 'object')
            {
                var options = arguments[1];

                x.each(options, function(key, value)
                {
                    element.style[x.camelCase(key)] = options[key];
                });
            }
        }
        else if (arguments.length == 3)
        {
            if (x.type(arguments[1]) == 'string')
            {
                element.style[arguments[1]] = arguments[2];
            }
        }
    },
    /*#endregion*/

    /*#region 函数:check(selector, className)*/
    /**
    * 检测元素对象的 className 是否存在
    * @method check
    * @memberof x.css
    * @param {string} selector 选择器或者元素对象
    * @param {string} className CSS类名称
    * @returns {bool}
    */
    check: function(selector, className)
    {
        var element = x.query(selector);

        if (element == null) return;

        /*
        var found=false;
        var buffer=o.className.split(' ');

        for(var i=0;i<buffer.length;i++){
        if(buffer[i]==className){found=true;}
        }
        return found;
        */

        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

        return element.className.match(reg) == null ? false : true;
    },
    /*#endregion*/

    /*#region 函数:swap(selector, classNameA, classNameB)*/
    /**
    * 替换元素对象的 className
    * @method swap
    * @memberof x.css
    * @param {string} selector 选择器或者元素对象
    * @param {string} classNameA CSS类名称
    * @param {string} classNameB CSS类名称
    */
    swap: function(selector, classNameA, classNameB)
    {
        var element = x.query(selector);

        if (css.check(element, classNameA))
        {
            var buffer = element.className.split(' ');

            for (var i = 0; i < buffer.length; i++)
            {
                buffer[i] = buffer[i].trim();

                if (buffer[i] == classNameA) { buffer[i] = classNameB; }
            }

            element.className = buffer.join(' ');
        }
    },
    /*#endregion*/

    /*#region 函数:add(selector, className)*/
    /**
    * 添加元素对象的 className
    * @method add
    * @memberof x.css
    * @param {string} selector 选择器或者元素对象
    * @param {string} className CSS类名称
    */
    add: function(selector, className)
    {
        var element = x.query(selector);

        if (element == null) return;

        if (!css.check(element, className))
        {
            element.className += ' ' + className;
            element.className = element.className.trim();
        }
    },
    /*#endregion*/

    /*#region 函数:remove(selector, className)*/
    /**
    * 移除元素对象的 className
    * @method remove
    * @memberof x.css
    * @param {string} selector 选择器或者元素对象
    * @param {string} className CSS类名称
    */
    remove: function(selector, className)
    {
        var element = x.query(selector);
        
        if (element == null) return;

        if (css.check(element, className))
        {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

            element.className = element.className.replace(reg, '');
            element.className = element.className.trim();
        }
    }
    /*#endregion*/
};