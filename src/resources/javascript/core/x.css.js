// -*- ecoding : utf-8 -*-

define(['jquery', 'x'], function($, x)
{
    /**
    * @namespace css
    * @memberof x
    * @description CSS
    */
    x.css = {

        /*#region 函数:style(element)*/
        /**
        * 获取元素对象的样式信息
        * @method style
        * @memberof x.css
        * @param {HTMLElement} element 元素对象
        * @returns {CSSStyleDeclaration} {@like https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration|CSSStyleDeclaration}
        */
        style: function(element)
        {
            return element.currentStyle || window.getComputedStyle(element, null);
        },
        /*#endregion*/

        /*#region 函数:check(element, className)*/
        /**
        * 检测元素对象的 className 是否存在
        * @method check
        * @memberof x.css
        * @param {HTMLElement} element 元素对象
        * @param {string} className CSS类名称
        * @returns {bool}
        */
        check: function(element, className)
        {
            /*
            var found=false;
            var temparray=o.className.split(' ');

            for(var i=0;i<temparray.length;i++){
            if(temparray[i]==c1){found=true;}
            }
            return found;
            */

            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

            return element.className.match(reg) == null ? false : true;
        },
        /*#endregion*/

        /*#region 函数:swap(element, classNameA, classNameB)*/
        /**
        * 替换元素对象的 className
      * @method swap
        * @memberof x.css
        * @param {HTMLElement} element 元素对象
        * @param {string} classNameA CSS类名称
        * @param {string} classNameB CSS类名称
        */
        swap: function(element, classNameA, classNameB)
        {
            if (this.check(element, classNameA))
            {
                element.className = element.className.replace(classNameA, classNameB);
            }
        },
        /*#endregion*/

        /*#region 函数:add(element, className)*/
        /**
        * 添加元素对象的 className
        * @method add
        * @memberof x.css
        * @param {HTMLElement} element 元素对象
        * @param {string} className CSS类名称
        */
        add: function(element, className)
        {
            if (!this.check(element, className))
            {
                element.className += ' ' + className;
                element.className = element.className.trim();
            }
        },
        /*#endregion*/

        /*#region 函数:remove(element, className)*/
        /**
        * 移除元素对象的 className
        * @method remove
        * @memberof x.css
        * @param {HTMLElement} element 元素对象
        * @param {string} className CSS类名称
        */
        remove: function(element, className)
        {
            if (this.check(element, className))
            {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                element.className = element.className.replace(reg, '');
                element.className = element.className.trim();
            }
        }
        /*#endregion*/
    };

    return x.css;
});