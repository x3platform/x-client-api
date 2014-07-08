// -*- ecoding : utf-8 -*-

/**
* @namespace cookies
* @memberof x
* @description Cookies 管理
*/
x.cookies = {

    /*#region 函数:query(name)*/
    /**
    * 根据 Cookie 名称查找相关的值
    * @method query
    * @memberof x.cookies
    * @param {string} name 名称
    */
    query: function(name)
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
    * @param {Date} [expire] 过期时间
    * @param {string} [path] 所属的路径
    * @param {string} [domain] 所属的域
    * @example
    * // 新增一条 Cookie 记录, 
    * // 名称为 CookieName1, 值为 CookieValue1
    * x.cookie.add('CookieName1', 'CookieValue1');
    * @example
    * // 新增一条 Cookie 记录, 
    * // 名称为 CookieName2, 值为 CookieValue2, 
    * // 过期时间为 2050-1-1 10:30:00 
    * x.cookie.add('cookieName2', 'cookieValue2', new (2050, 1, 1, 10, 30, 00));
    * @example
    * // 新增一条 Cookie 记录, 
    * // 名称为 CookieName3, 值为 CookieValue3, 
    * // 过期时间为 2050-1-1 10:30:00 , 所属路径为 /help/
    * x.cookie.add('cookieName3', 'cookieValue3', new (2050,1,1,10,30,00), '/help/');
    * @example
    * // 新增一条 Cookie 记录, 
    * // 名称为 CookieName4, 值为 CookieValue4, 
    * // 过期时间为 2050-1-1 10:30:00, 所属的域为 github.com
    * x.cookie.add('cookieName4', 'cookieValue4', new (2050,1,1,10,30,00), '/', 'github.com');
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
    * @param {string} [path] 所属的路径
    * @param {string} [domain] 所属的域
    * @example
    * // 移除一条 Cookie 记录, 名称为 CookieName1
    * x.cookie.remove('CookieName1');
    * @example
    * // 移除一条 Cookie 记录, 名称为 CookieName2
    * x.cookie.remove('CookieName2', '/help/');
    */
    remove: function(name, path, domain)
    {
        if (!!x.cookies.query(name))
        {
            document.cookie = name + '=' + '; path=' + ((!path) ? '/' : path) + '; expires=' + new Date(0).toGMTString() + ((!domain) ? '' : ('; domain=' + domain)); ;
        }
    }
    /*#endregion*/
};
