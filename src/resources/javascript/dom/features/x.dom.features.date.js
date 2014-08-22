/**
* form feature  : date(日期选择框)
*
* require	    : x.js, x.dom.js
*/
x.dom.features.date = {

    /*
    * 绑定日期
    */
    bind: function(inputName)
    {
        x.require({
            files:[
                { fileType: 'css', id: 'x-ui-calendar-css', path: x.ui.stylesheetPathPrefix + 'x.ui.calendar.css'},
                { fileType: 'script', id: 'x-ui-calendar-script', path: x.dir() + 'ui/packages/x.ui.calendar.js' }
            ],
            data: { inputName: inputName },
            callback: function(context)
            {
                var data = context.data;

                // 参数初始化
                var calendarName = data.inputName + '_calendar';

                var input = x.dom.query(data.inputName);

                // eval(x.dom.query(inputName).attr('bind'));

                // 设置新的显示元素
                input.after('<div id="' + calendarName + '" style="display:none;" ></div>');

                var calendar = window[calendarName] = x.ui.calendar.newCalendar(calendarName, calendarName, inputName, '', {
                    getDayEvent: function()
                    {
                        if (typeof (this.input.attr('bind')) !== 'undefined')
                        {
                            eval(this.input.attr('bind'));
                        }
                    }
                });

                x.dom.query(calendarName).attr('class', calendar.options.classNamePrefix + '-wrapper');

                // x.debug.log(window[calendarName]);

                if (input.width() < 85)
                {
                    input.css('width', '85px');
                }

                if (input.width() > 20)
                {
                    input.css({
                        'background-image': 'url("/resources/images/form/calendar_icon.gif")',
                        'background-repeat': 'no-repeat',
                        'background-position': (input.width() - 20) + 'px 2px'
                    });
                }

                $(document).bind('click', function(event)
                {
                    var target = window.event ? window.event.srcElement : event ? event.target : null;

                    var list = $('.' + calendar.options.classNamePrefix + '-wrapper');

                    for (var i = 0; i < list.length; i++)
                    {
                        if (target.id == list[i].id)
                        {
                            continue;
                        }

                        if (target.id == list[i].id.replace('_calendar', '') || target.className.indexOf(calendar.options.classNamePrefix + '-dummy') > -1)
                        {

                            continue;
                        }

                        window[list[i].id].close();
                    }
                });

                input.bind('click', function()
                {
                    window[(this.id + '_calendar')].open();
                });

                input.bind('blur', function()
                {
                    if (this.value != '' && !x.expressions.exists({ text: this.value, regexpName: 'date' }))
                    {
                        x.msg('请填写正确的日期，例如【2000-01-01】。');
                        this.focus();
                    }
                });
            }
        });
    }
};