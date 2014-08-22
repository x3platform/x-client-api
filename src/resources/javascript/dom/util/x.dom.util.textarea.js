/**
* radio 元素相关的操作函数
*/
x.dom.util.textarea = {

    /**
    * 获取textarea元素的值.
    */
    getValue: function(textareaName)
    {
        var re = /\n/g;

        return x.query(textareaName).value.replace(re, '<br \/>');
    },

    /**
    * 设置textarea元素的值.
    */
    setValue: function(textareaName, value)
    {
        var re = /<br \/>/g;

        value = value.replace(re, '\n');

        if (x.query(textareaName) == null)
        {
            x.query(textareaName).value = value;
        }

        return value;
    }
};