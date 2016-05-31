/**
* checkbox 元素相关的操作函数
*/
x.dom.util.checkbox = {

    /**
    * 获取checkbox元素的值.
    */
    getValue: function(checkboxName)
    {
        var result = '';

        var list = document.getElementsByName(checkboxName);

        for (var i = 0; i < list.length; i++)
        {
            if (list[i].checked)
            {
                result += (result == '' ? '' : ',') + list[i].value;
            }
        }

        return result.trim(',');
    },

    /**
    * 设置checkbox元素的值.
    */
    setValue: function(checkboxName, value)
    {
        var list = document.getElementsByName(checkboxName);

        for (var i = 0; i < list.length; i++)
        {
            if (list[i].value == value)
            {
                list[i].checked = true;
                x.dom.checkbox.setCheckboxViewValue(list[i].id, true);
            }
        }
    },

    selectAll: function(checkboxName, checked)
    {
        var list = document.getElementsByName(checkboxName);

        checked = typeof (checked) == 'undefined' ? true : checked;

        for (var i = 0; i < list.length; i++)
        {
            list[i].checked = checked;
            x.dom.checkbox.setCheckboxViewValue(list[i].id, checked);
        }
    },

    /**
    * 反选
    */
    selectInverse: function(checkboxName)
    {
        var list = document.getElementsByName(checkboxName);

        for (var i = 0; i < list.length; i++)
        {
            list[i].checked = !list[i].checked;
            x.dom.checkbox.setCheckboxViewValue(list[i].id, list[i].checked);
        }
    },

    setCheckboxViewValue: function(id, value)
    {
        var checkboxView = x.dom.query(id + '$$view');

        if (checkboxView.size() > 0)
        {
            if (x.browser.ie && x.browser.getVersion() < 7)
            {
                checkboxView[0].checked = value;
            }
            else
            {
                if (value)
                {
                    checkboxView.css({ 'background': 'url(/resources/images/x-ajax-controls.png) -3px -117px no-repeat' });
                    checkboxView.parent().css({ 'background': 'url(/resources/images/x-ajax-controls.png) -3px -41px no-repeat' });
                }
                else
                {
                    checkboxView.css({ 'background': 'url(/resources/images/x-ajax-controls.png) -3px -41px no-repeat' });
                }
            }
        }
    }
};
