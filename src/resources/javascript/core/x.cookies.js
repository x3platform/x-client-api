// -*- ecoding : utf-8 -*-

/*#region Copyright & Author*/
// =============================================================================
//
// Copyright (c) 2010 ruanyu@live.com
//
// FileName     :x.cookies.js
//
// Description  :
//
// Author       :Max
//
// Date         :2010-01-01
//
// =============================================================================
/*#endregion*/

define(['jquery', 'x'], function($, x)
{
    /**
    * @namespace cookies
    * @memberof x
    * @description Cookies 管理
    */
    x.cookies = {

        /*#region 函数:find(name)*/
        /**
        * 根据 Cookie 名称查找相关的值
        * @method find
        * @memberof x.cookies
        * @param {string} name 名称
        */
        find: function(name)
        {
            var value = '';
            var search = name + '=';

            if (document.cookie.length > 0)
            {
                var offset = document.cookie.indexOf(search);

                if (offset != -1)
                {
                    offset += search.length;

                    var end = document.cookie.indexOf(';', offset);

                    if (end == -1)
                        end = document.cookie.length;

                    value = unescape(document.cookie.substring(offset, end));
                }
            }

            return value;
        },
        /*#endregion*/

        /*#region 函数:add(name, value, expire, path, domain)*/
        /**
        * 新增 Cookie 的值
        * @method add
        * @memberof x.cookies
        * @param {string} name 名称
        * @param {string} value 值
        * @param {Date} expire 名称
        * @param {string} path 所属的路径
        * @param {string} domain 所属的域名
        */
        add: function(name, value, expire, path, domain)
        {
            document.cookie = name + '=' + escape(value) + ((!expire) ? '' : ('; expires=' + expire.toGMTString())) + '; path=' + ((!path) ? '/' : path) + ((!domain) ? '' : ('; domain=' + domain));
        },
        /*#endregion*/

        /*#region 函数:remove(name, path, domain)*/
        /**
        * 移除 Cookie 的值
        * @method remove
        * @memberof x.cookies
        * @param {string} name 名称
        * @param {string} path 所属的路径
        * @param {string} domain 所属的域名
        */
        remove: function(name, path, domain)
        {
            if (x.cookies.find(name))
            {
                document.cookie = name + '=' + '; path=' + ((!path) ? '/' : path) + '; expires=' + new Date(0).toGMTString() + ((!domain) ? '' : ('; domain=' + domain)); ;
            }
        }
        /*#endregion*/
    };

    return x.cookies;
});