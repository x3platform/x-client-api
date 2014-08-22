/**
* radio 元素相关的操作函数
*/
x.dom.util.radio = {

    /**
    * 获取radio元素的值.
    */
    getValue: function(radioName)
    {
        var list = document.getElementsByName(radioName);

        for (var i = 0; i < list.length; i++)
        {
            if (list[i].checked)
            {
                return list[i].value;
            }
        }

        return '';
    },

    /**
    * 设置radio元素的值.
    */
    setValue: function(radioName, value)
    {
        var list = document.getElementsByName(radioName);

        for (var i = 0; i < list.length; i++)
        {
            if (list[i].value == value)
            {
                list[i].checked = true;
                break;
            }
        }
    }
};