// -*- ecoding=utf-8 -*-

/**
* @namespace util
* @memberof x
* @description 常用工具类库
*/
x.util = {
    /**
    * 设置元素的位置
    *
    * @element	: 元素
    * @pointX   : 坐标x.
    * @pointY	: Y坐标
    */
    setLocation: function(element, pointX, pointY)
    {
        $(element).css({
            'position': 'fixed',
            'left': pointX + 'px',
            'top': pointY + 'px'
        });
    },

    /**
    * 设置Flash元素
    *
    * @element	    : 元素
    * @url			: Falsh的地址.
    * @widht		: Falsh的宽度.
    * @height		: Falsh的高度.
    */
    setFlash: function(element, url, width, height, summary)
    {
        var outString = '';

        if (typeof (summary) === 'undefined') { summary = ''; }

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
    *
    * @element 元素
    * @param qq QQ 号码
    * @param site 来源的站点信息
    */
    setQQ: function(element, qq, site)
    {
        var outString = '';

        if (!(qq === '' || qq === '0'))
        {
            outString += '<a target="_blank" href="tencent://message/?uin=';
            outString += qq + '&site=' + ((site) ? site : 'localhost');
            outString += '&menu=yes" alt="QQ:' + qq + '" >' + qq + "</a>";
        }

        $(element).html(outString);
    }
};
