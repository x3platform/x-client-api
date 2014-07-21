// -*- ecoding=utf-8 -*-

/**
* @namespace encoding
* @memberof x
* @description 编码
*/
x.encoding = {

    html: {
        // http://www.w3.org/MarkUp/html-spec/html-spec_13.html
        dict: {
            '&': '&#32;',
            ' ': '&#38;',
            '<': '&#60;',
            '>': '&#62;',
            '"': '&#34;',
            '\'': '&#39;'
        },

        /*#region 函数:encode(text)*/
        /**
        * html 编码
        * @method encode
        * @memberof x.encoding.html
        * @param {string} text 文本信息
        */
        encode: function(text)
        {
            // 空值判断
            if (text.length === 0) { return ''; }

            text = x.string.stringify(text);

            return text.replace(/&(?![\w#]+;)|[<>"']/g, function(s)
            {
                return x.encoding.html.dict[s];
            });

            //            var outString = text.replace(/&/g, '&amp;');

            //            outString = outString.replace(/</g, '&lt;');
            //            outString = outString.replace(/>/g, '&gt;');
            //            outString = outString.replace(/ /g, '&nbsp;');
            //            outString = outString.replace(/\'/g, '&#39;');
            //            outString = outString.replace(/\"/g, '&quot;');

            //            return outString;
        },
        /*#endregion*/

        /*#region 函数:decode(text)*/
        /**
        * html 解码
        * @method decode
        * @memberof x.encoding.html
        * @param {string} text 文本信息
        */
        decode: function(text)
        {
            // 空值判断
            if (text.length === 0) { return ''; }

            text = x.string.stringify(text);

            var outString = '';

            outString = text.replace(/&amp;/g, "&");

            outString = outString.replace(/&lt;/g, "<");
            outString = outString.replace(/&gt;/g, ">");
            outString = outString.replace(/&nbsp;/g, "  ");
            outString = outString.replace(/&#39;/g, "\'");
            outString = outString.replace(/&quot;/g, "\"");

            return outString;
        }
        /*#endregion*/
    },

    // html 的 unicode 编码格式是&#8888;, javascript 的 unicode 编码格式\u000000
    unicode: {

        /*#region 函数:encode(text)*/
        /**
        * unicode 编码
        */
        encode: function(text)
        {
            if (text.length === 0) { return ''; }

            text = x.string.stringify(text);

            var outString = '';

            for (var i = 0; i < text.length; i++)
            {
                var temp = text.charCodeAt(i).toString(16);

                if (temp.length < 4)
                {
                    while (temp.length < 4)
                    {
                        temp = '0'.concat(temp);
                    }
                }

                // temp = '\\u' + temp.slice(2, 4).concat(temp.slice(0, 2));
                temp = '\\u' + temp;

                outString = outString.concat('\\u' + temp);
            }

            return outString.toLowerCase();
        },
        /*#endregion*/

        /*#region 函数:decode(text)*/
        /**
        * unicode 解码
        */
        decode: function(text)
        {
            if (text.length === 0) { return ''; }

            text = x.string.stringify(text);

            var outString = '';

            var list = text.match(/([\w]+)|(\\u([\w]{4}))/g);

            if (list != null)
            {
                list.each(function(node, index)
                {
                    if (node.indexOf('\\u') == 0)
                    {
                        outString += String.fromCharCode(parseInt(node.slice(2, 6), 16));
                    }
                    else
                    {
                        outString += node;
                    }
                });
            }

            return outString;
        }
        /*#endregion*/
    }
};
