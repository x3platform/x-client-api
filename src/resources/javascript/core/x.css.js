// -*- ecoding : utf-8 -*-

define(['jquery', 'x'], function($, x)
{
    x.css = {

        /*#region 函数:style(element)*/
        /**
        * 获取样式信息
        */
        style: function(element)
        {
            return element.currentStyle || window.getComputedStyle(element, null);
        },
        /*#endregion*/

        /*#region 函数:check(element, className)*/
        /**
        * @description 检测 css className 是否存在.
        *
        * @param {string} element
        * @param {string} className
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
        * 替换 css className
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
        * 添加 css className
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
        * 移除 css className
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