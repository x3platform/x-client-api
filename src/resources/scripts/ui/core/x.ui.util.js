// -*- ecoding=utf-8 -*-

/**
* @namespace util
* @memberof x.ui
* @description 常用工具类库
*/
x.ui.util = {
    /**
    * 设置 Flash 元素
    * @method setFlash
    * @memberof x.ui.util
    * @param {string} selector 选择器或者元素对象
    * @param {string} url Falsh 的地址
    * @param {number} widht Falsh 的宽度
    * @param {number} height Falsh 的高度
    * @param {string} [summary] Falsh 内容概述
    */
    setFlash: function(selector, url, width, height, summary)
    {
        var outString = '';

        var element = x.query(selector);

        summary = x.isUndefined(summary, '');

        outString += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
			+ 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11" '
			+ 'width="' + width + '" height="' + height + '" title="' + summary + '"> '
			+ '<param name="movie" value="' + url + '" />'
			+ '<param name="quality" value="high" />'
			+ '<embed src="' + url + '" quality="high" '
			+ 'pluginspage="http://www.macromedia.com/go/getflashplayer" '
			+ 'type="application/x-shockwave-flash" '
			+ 'width="' + width + '" height="' + height + '"></embed>'
			+ '</object>';

        element.innerHTML = outString;
    },

    /**
    * 在页面上打开QQ链接
    * @method setQQ
    * @memberof x.ui.util
    * @param {string} selector 选择器或者元素对象
    * @param {number} qq QQ 号码
    * @param {string} site 来源的站点信息
    */
    setQQ: function(selector, qq, site)
    {
        var outString = '';

        var element = x.query(selector);

        if (!(qq === '' || qq === '0'))
        {
            outString += '<a target="_blank" href="tencent://message/?uin=';
            outString += qq + '&site=' + ((site) ? site : 'localhost');
            outString += '&menu=yes" alt="QQ:' + qq + '" >' + qq + "</a>";
        }

        element.innerHTML = outString;
    }
};
