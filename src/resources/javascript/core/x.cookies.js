// -*- ecoding : utf-8 -*-

//=============================================================================
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
//=============================================================================

define(['jquery', 'x'], function($, x)
{
    x.cookies = {

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

        add: function(name, value, expire, path, domain)
        {
            document.cookie = name + '=' + escape(value) + ((!expire) ? '' : ('; expires=' + expire.toGMTString())) + '; path=' + ((!path) ? '/' : path) + ((!domain) ? '' : ('; domain=' + domain));
        },

        remove: function(name, path, domain)
        {
            if (x.cookies.find(name))
            {
                document.cookie = name + '=' + '; path=' + ((!path) ? '/' : path) + '; expires=' + new Date(0).toGMTString() + ((!domain) ? '' : ('; domain=' + domain)); ;
            }
        }
    };

    return x.cookies;
});