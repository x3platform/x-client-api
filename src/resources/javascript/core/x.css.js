// -*- ecoding=utf-8 -*-

/**
* @namespace css
* @memberof x
* @description CSS
*/
x.css = {
    map: {
        'border': 'border',
        'border-bottom': 'borderBottom',
        'border-bottom-color': 'borderBottomColor',
        'border-bottom-style': 'borderBottomStyle',
        'border-bottom-style': 'borderBottomWidth',
        'border-color': 'borderColor',
        'border-left': 'borderLeft',
        'border-left-color': 'borderLeftColor',
        'border-left-style': 'borderLeftStyle',
        'border-left-width': 'borderLeftWidth',
        'border-right': 'borderRight',
        'border-right-color': 'borderRightColor',
        'border-right-style': 'borderRightStyle',
        'border-right-width': 'borderRightWidth',
        'border-style': 'borderStyle',
        'border-top': 'borderTop',
        'border-top-color': 'borderTopColor',
        'border-top-style': 'borderTopStyle',
        'border-top-width': 'borderTopWidth',
        'border-width': 'borderWidth',
        'clear': 'clear',
        'float': 'floatStyle',
        'margin': 'margin',
        'margin-bottom': 'marginBottom',
        'margin-left': 'marginLeft',
        'margin-right': 'marginRight',
        'margin-top': 'marginTop',
        'padding': 'padding',
        'padding-bottom': 'paddingBottom',
        'padding-left': 'paddingLeft',
        'padding-right': 'paddingRight',
        'padding-top': 'paddingTop',
        'background': 'background',
        'background-attachment': 'backgroundAttachment',
        'background-color': 'backgroundColor',
        'background-image': 'backgroundImage',
        'background-position': 'backgroundPosition',
        'background-repeat': 'backgroundRepeat',
        'color': 'color',
        'display': 'display',
        'list-style-type': 'listStyleType',
        'list-style-image': 'listStyleImage',
        'list-style-position': 'listStylePosition',
        'list-style': 'listStyle',
        'white-space': 'whiteSpace',
        'font': 'font',
        'font-family': 'fontFamily',
        'font-size': 'fontSize',
        'font-style': 'fontStyle',
        'font-variant': 'fontVariant',
        'font-weight': 'fontWeight',
        'letter-spacing': 'letterSpacing',
        'line-break': 'lineBreak',
        'line-height': 'lineHeight',
        'text-align': 'textAlign',
        'text-decoration': 'textDecoration',
        'text-indent': 'textIndent',
        'text-justify': 'textJustify',
        'text-transform': 'textTransform',
        'vertical-align': 'verticalAlign'
    },

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
            var options = arguments[1];

            for (var property in options)
            {
                element.style[property] = options[property];
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

        if (x.css.check(element, classNameA))
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

        if (!x.css.check(element, className))
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

        if (x.css.check(element, className))
        {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

            element.className = element.className.replace(reg, '');
            element.className = element.className.trim();
        }
    }
    /*#endregion*/
};
