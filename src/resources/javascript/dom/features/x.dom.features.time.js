/**
* form feature  : time(时间选择向导)
*
* require	    : x.js, x.dom.js
*/
x.dom.features.time = {

    /*
    * 绑定日期
    */
    bind: function(inputName)
    {
        x.require({
            files: [
                { fileType: 'css', id: 'x-ui-pkg-calendar-css', path: x.ui.styles.dir() + 'x.ui.pkg.calendar.css' },
                { fileType: 'script', id: 'x-ui-pkg-calendar-script', path: x.ui.pkg.dir() + 'x.ui.pkg.calendar.js' }
            ],
            data: { inputName: inputName },
            callback: function(context)
            {
                var data = context.data;

                // <input id="dateView" name="dateView" type="text" />
                // <div id="dateView_calendar" style="display:none;" ></div>

                // 参数初始化
                var input = x.dom.query(data.inputName);

                var maskName = inputName + '_mask';

                var viewName = inputName + '_view';

                var calendarName = inputName + '_calendarValue_calendar';

                var timeName = inputName + '_timeValue_time';

                var time = input.val() == '' ? x.date.newTime() : x.date.newTime(input.val());

                var defaultCalendarValue = typeof (input.attr('defaultCalendarValue')) == 'undefined' ? (time == null ? '' : time.toString('yyyy-MM-dd')) : input.attr('defaultCalendarValue');
                var defaultTimeValue = typeof (input.attr('defaultTimeValue')) == 'undefined' ? (time == null ? '' : time.toString('HH:mm')) : input.attr('defaultTimeValue');

                var timeBeginHourValue = Number(typeof (input.attr('timeBeginHourValue')) == 'undefined' ? '0' : input.attr('timeBeginHourValue'));
                var timeEndHourValue = Number(typeof (input.attr('timeEndHourValue')) == 'undefined' ? '24' : input.attr('timeEndHourValue'));

                // 隐藏原始对象
                input.wrap('<div id="' + maskName + '" style="display:none;" ></div>');

                // 设置新的显示元素
                x.dom.query(maskName).after('<div class="float-left" >'
                                      + '<input id="' + inputName + '_calendarValue" name="' + inputName + '_calendarValue" type="text" value="' + defaultCalendarValue + '" class="input-normal ajax-calendar-dummy" style="width:90px;margin-right:10px;" />'
                                      + '<div id="' + calendarName + '" class="ajax-calendar-wrapper " style="display:none; *height:0px;" ></div>'
                                      + '</div>'
                                      + '<div class="float-left" >'
                                      + '<input id="' + inputName + '_timeValue" name="' + inputName + '_timeValue" value="' + defaultTimeValue + '" type="text" class="input-normal " style="width:60px;" /> '
                                      + '<div id="' + inputName + '_timeValue_wrapper" class="ajax-combobox-wrapper" ><div id="' + inputName + '_timeValue_time" style="display:none;" ></div></div>'
                                      + '</div>'
                                      + '<div class="clear"><div>');

                // 日历
                window[calendarName] = x.ui.pkg.calendar.newCalendar(calendarName, calendarName, inputName + '_calendarValue', defaultCalendarValue, {
                    getDayEvent: function()
                    {
                        x.dom.features.time.setValue(inputName);
                    }
                });

                if(x.dom.query(inputName + '_calendarValue').width() > 20)
                {
                    x.dom.query(inputName + '_calendarValue').css('background-image', 'url("/resources/images/form/calendar_icon.gif")');
                    x.dom.query(inputName + '_calendarValue').css('background-repeat', 'no-repeat');

                    x.dom.query(inputName + '_calendarValue').css('background-position', (x.dom.query(inputName + '_calendarValue').width() - 20) + 'px 2px');
                }

                if(x.dom.query(inputName + '_timeValue').width() > 20)
                {
                    x.dom.query(inputName + '_timeValue').css('background-image', 'url("/resources/images/form/clock_icon.gif")');
                    x.dom.query(inputName + '_timeValue').css('background-repeat', 'no-repeat');

                    x.dom.query(inputName + '_timeValue').css('background-position', (x.dom.query(inputName + '_timeValue').width() - 20) + 'px 2px');
                }

                $(document).bind('click', function(event)
                {
                    var target = window.event ? window.event.srcElement : event ? event.target : null;

                    var list = $('.ajax-calendar-wrapper');

                    for(var i = 0;i < list.length;i++)
                    {
                        if(target.id == list[i].id)
                        {
                            continue;
                        }

                        if(target.id == list[i].id.replace('_calendar', '') || target.className.indexOf('ajax-calendar-dummy') > -1)
                        {
                            continue;
                        }

                        window[list[i].id].close();
                    }
                });

                x.dom.query(inputName + '_calendarValue').bind('click', function()
                {
                    window[(this.id + '_calendar')].open();
                });

                x.dom.query(inputName + '_calendarValue').bind('blur', function()
                {
                    if(this.value != '' && !x.expression.exists({ text: this.value, regexpName: 'date' }))
                    {
                        alert('请填写正确的日期，例如【2000-01-01】。');
                        this.focus();
                    }
                });

                // 时间

                var options = {
                    show: 'text',
                    topOffset: '-1',
                    widthOffset: '0',
                    selectedValue: '00:00',
                    comboboxType: 'static',
                    list: [],
                    callback: function() { x.dom.features.time.setValue(inputName); }
                };

                var timeText = '[';

                for(var i = timeBeginHourValue;i < timeEndHourValue;i++)
                {
                    timeText += '{text:\'' + ((i < 10) ? '0' : '') + i + ':00\',value:\'' + ((i < 10) ? '0' : '') + i + ':00\'},';
                    timeText += '{text:\'' + ((i < 10) ? '0' : '') + i + ':30\',value:\'' + ((i < 10) ? '0' : '') + i + ':30\'}';

                    if((i + 1) < timeEndHourValue)
                    {
                        timeText += ',';
                    }

                    if((i + 1) == timeEndHourValue && i < 23)
                    {
                        timeText += ',{text:\'' + ((i + 1 < 10) ? '0' : '') + (i + 1) + ':00\',value:\'' + ((i + 1 < 10) ? '0' : '') + (i + 1) + ':00\'}';
                    }
                }

                timeText += ']';

                options.list = x.toJSON(timeText);

                window[timeName] = x.ui.pkg.combobox.newCombobox(timeName, timeName, inputName + '_timeValue', inputName + '_timeValue', options);

                x.dom.query(inputName + '_timeValue').bind('focus', function()
                {
                    window[(this.id + '_time')].open();
                });

                x.dom.query(inputName + '_timeValue').bind('keyup', function()
                {
                    window[(this.id + '_time')].open();
                });

                $(document).bind('click', function(event)
                {
                    var target = window.event ? window.event.srcElement : event ? event.target : null;

                    var list = $('.ajax-combobox-wrapper');

                    for(var i = 0;i < list.length;i++)
                    {
                        if(target.id != list[i].id.replace('_wrapper', '') && target.id != list[i].id.replace('_wrapper', '_time'))
                        {
                            var targetObject = window[list[i].id.replace('_wrapper', '') + '_time'];

                            if(targetObject != null)
                            {
                                targetObject.close();
                            }
                        }
                    }
                });
            }
        });
    },

    setValue: function(inputName)
    {
        var calendarValue = x.dom.query(inputName + '_calendarValue').val();
        var timeValue = x.dom.query(inputName + '_timeValue').val();

        var value = calendarValue + ' ' + timeValue;

        x.debug.log(value);

        x.dom.query(inputName).val(value);
    }
};