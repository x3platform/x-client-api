/**
* form feature  : email(邮箱地址输入框)
*
* require       : x.js, x.dom.js
*/
x.dom.features.telephone = {

    /**
    * 绑定
    */
    bind: function(inputName)
    {
        var input = x.dom.query(inputName);

        // 绑定相关事件
        input.bind('keydown', function(event)
        {
            var event = x.event.getEvent(event);

            // x.debug.log(event.keyCode);

            // 禁止按 shift 键 ( + 号除外)
            if (event.shiftKey && event.keyCode != 187)
            {
                x.event.preventDefault(event);
            }

            // 禁止 = 键
            if (!event.shiftKey && event.keyCode == 187)
            {
                x.event.preventDefault(event);
            }

            // + 号只允许有一个，而且是第一个。

            if (this.value.indexOf('+') === 0 && (event.keyCode == 187 || event.keyCode == 107))
            {
                x.event.preventDefault(event);
            }

            // 8：退格键、46：delete、37-40： 方向键
            // 48-57：小键盘区的数字、96-105：主键盘区的数字
            // 110、190：小键盘区和主键盘区的小数
            // 187、107：小键盘区和主键盘区的正号
            // 189、109：小键盘区和主键盘区的负号

            // 考虑小键盘上的数字键 
            // 只允许按Delete键和Backspace键
            if (!((event.keyCode >= 48 && event.keyCode <= 57) // 小键盘区的数字
                || (event.keyCode >= 96 && event.keyCode <= 105) // 主键盘区的数字
                || (event.keyCode == 187 || event.keyCode == 107) // 小键盘区和主键盘区的正号
                || (event.keyCode == 189 || event.keyCode == 109) // 小键盘区和主键盘区的负号
                || (event.keyCode == 8)  // 退格
                || (event.keyCode == 46) // Del
                || (event.keyCode == 27) // ESC
                || (event.keyCode == 37) // 左
                || (event.keyCode == 39) // 右
                || (event.keyCode == 16) // Shift
                || (event.keyCode == 9)  // Tab
            ))
            {
                x.event.preventDefault(event);
            }
        });

        input.bind('blur', function()
        {
            if (this.value.indexOf('+') > 0)
            {
                this.value = this.value.replace('+', '');
            }

            // 去除两边的符号
            if (this.value.indexOf('-') === 0 || this.value.lastIndexOf('-') == this.value.length - 1)
            {
                this.value = x.string.trim(this.value, '-');
            }

            if (this.value.exists(x.expressions.rules['non-telephone']))
            {
                this.value = x.expressions.formatTelephone(this.value);
            }
        });
    }
};