/**
* select 元素相关的操作函数
*/
x.dom.util.select = {

    /**
    * 清空select元素中的所有option元素.
    */
    clear: function(selectName)
    {
        var select = x.dom.query(selectName)[0];

        // clear options
        try
        {
            if (x.net.browser.getName() == 'Internet Explorer')
            {
                var selectObjectLength = select.options.length;

                // IE
                while (selectObjectLength !== 0)
                {
                    selectObjectLength = select.options.length;

                    for (var i = 0; i < selectObjectLength; i++)
                    {
                        select.options.remove(i);
                    }

                    selectObjectLength = select.options.length;
                }
            }
            else
            {
                select.innerHTML = '';
            }
        }
        catch (ex)
        {
            select.innerHTML = ''; // Firefox
        }
    },

    /**
    * 添加 select 元素的 options 元素
    * @method add
    * @memberof x.dom.select
    */
    add: function(selectName, text, value)
    {
        var select = x.dom.query(selectName)[0];

        var option = document.createElement('option');

        option.value = value;
        option.innerHTML = text;

        select.appendChild(option);
    },

    /**
    * 把一个数组信息转换为 select 元素的 options 元素.
    */
    convert: function(selectName, options)
    {
        // clear options
        x.dom.select.clear(selectName);

        x.dom.select.append(selectName, options);
    },

    /**
    * 把一个数组信息追加为select元素的options元素.
    */
    append: function(selectName, options)
    {
        var select = x.dom.query(selectName)[0];

        // append options
        for (var i = 0; i < options.length; i++)
        {
            x.dom.select.add(selectName, options[i].text, options[i].value);
        }

        // 如果长度为1, 直接禁用.
        if (select.options.lenght == 1) { select.disabled = false; }
    },

    /**
    * 获取 select 元素的文本信息.
    * @method getText
    * @memberof x.dom.select
    */
    getText: function(selectName)
    {
        var select = x.dom.query(selectName)[0];

        var value = x.dom.select.getValue(selectName);

        for (var i = 0; i < select.options.length; i++)
        {
            if (select.options[i].value == value)
            {
                return select.options[i].text;
            }
        }

        return '';
    },

    /**
    * 获取 select 元素的值
    * @method getValue
    * @memberof x.dom.select
    */
    getValue: function(selectName)
    {
        document.getElementById(selectName).value;
    },

    /**
    * 设置 select 元素的值
    * @method setValue
    * @memberof x.dom.select
    */
    setValue: function(selectName, value)
    {
        var select = $(selectName);

        for (var i = 0; i < select.options.length; i++)
        {
            if (select.options[i].value == value)
            {
                try
                {
                    select.selectedIndex = i;
                    select.options[i].selected = true;
                    return true;
                }
                catch (ex)
                {
                }
            }
        }

        select.selectedIndex = 0;
    }
};