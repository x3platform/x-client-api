// -*- ecoding : utf-8 -*-

define(['jquery', 'x'], function($, x)
{
    /**
    * @namespace date
    * @memberof x
    * @description 日期和时间
    */
    x.date = {
        /**
        * 创建时间对象
        *
        * @param {object} timeValue 符合时间规则的值
        */
        create: function(timeValue)
        {
            return new x.date.newTime(timeValue);
        },

        diff: function(begin, end, interval)
        {
            var timeBegin = new x.date.newTime(begin);
            var timeEnd = new x.date.newTime(end);

            switch (String(interval).toLowerCase())
            {
                case "y":
                case "year":
                    result = timeBegin.diff('year', timeEnd);
                case "M":
                case "month":
                    result = timeBegin.diff('month', timeEnd);
                case "w":
                case "week":
                    result = timeBegin.diff('week', timeEnd);
                case "d":
                case "day":
                    result = timeBegin.diff('day', timeEnd);
                case "h":
                case "hour":
                    result = timeBegin.diff('hour', timeEnd);
                case "m":
                case "minute":
                    return timeBegin.diff('minute', timeEnd);
                case "s":
                case "second":
                    return timeBegin.diff('second', timeEnd);
                case "ms":
                case "msecond":
                default:
                    return timeBegin.diff('msecond', timeEnd);
            }
        },

        add: function(timeValue, interval, number)
        {
            var time = new x.date.newTime(timeValue);

            switch (String(interval).toLowerCase())
            {
                case "y":
                case "year":
                    return time.add('year', number);
                case "q":
                case "quarter":
                    return time.add('quarter', number);
                case "M":
                case "month":
                    return time.add('month', number);
                case "w":
                case "week":
                    return time.add('day', number * 7);
                case "d":
                case "day":
                    return time.add('day', number);
                case "h":
                case "hour":
                    return time.add('hour', number);
                case "m":
                case "minute":
                    return time.add('minute', number);
                case "s":
                case "second":
                    return time.add('second', number);
                case "ms":
                case "msecond":
                default:
                    return time.add('msecond', number);
            }

            return time;
        },

        /**
        * 日期格式化
        */
        format: function(timeValue, formatValue)
        {
            var time = x.date.create(timeValue);

            return time.toString(formatValue);
        },

        /**
        * 时间对象
        * @timeValue 符合时间规则的值(允许Date对象|数组对象|字符串对象)
        */
        newTime: function(timeValue)
        {
            var date = new Date();

            if (typeof (timeValue) != 'undefined')
            {
                if (typeof (timeValue) === 'object' && !Object.isArray(timeValue))
                {
                    // Date 对象
                    date = timeValue;
                }
                else if (Object.isArray(timeValue))
                {
                    // Array 对象
                    var keys = timeValue

                    for (var i = 0; i < 6; i++)
                    {
                        keys[i] = isNaN(keys[i]) ? (i < 3 ? 1 : 0) : Number(keys[i]);
                    }

                    date = new Date(keys[0], Number(keys[1]) - 1, keys[2], keys[3], keys[4], keys[5]);
                }
                else
                {
                    // 其他情况
                    var keys = timeValue.replace(/[-|:|\/| ]/g, ',').split(',');

                    for (var i = 0; i < 6; i++)
                    {
                        keys[i] = isNaN(keys[i]) ? (i < 3 ? 1 : 0) : Number(keys[i]);
                    }

                    date = new Date(keys[0], Number(keys[1]) - 1, keys[2], keys[3], keys[4], keys[5]);
                }
            }

            var time = {
                year: date.getFullYear(),
                year2: date.getYear(),
                month: date.getMonth(),
                day: date.getDate(),
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds(),
                msecond: date.getMilliseconds(),
                weekDay: date.getDay(),

                //+---------------------------------------------------  
                //| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串  
                //+---------------------------------------------------  
                diff: function(interval, time)
                {
                    var timeBegin = Number(this.toDate());
                    var timeEnd = Number(time.toDate());

                    switch (interval)
                    {
                        case 'year': return time.year - this.year;
                        case 'quarter': return Math.ceil((((time.year - this.year) * 12) + (time.month - this.month)) / 3);
                        case 'month': return ((time.year - this.year) * 12) + (time.month - this.month);
                        case 'week': return Number((timeEnd - timeBegin) / (86400000 * 7));
                        case 'day': return Number((timeEnd - timeBegin) / 86400000);
                        case 'hour': return Number((timeEnd - timeBegin) / 3600000);
                        case 'minute': return Number((timeEnd - timeBegin) / 60000);
                        case 'second': return Number((timeEnd - timeBegin) / 1000);
                        case 'msecond': return Number((timeEnd - timeBegin));
                    }
                },

                /*
                * 日期计算  
                */
                add: function(interval, number)
                {
                    var date = Number(this.toDate());

                    // 此毫秒表示的是需要创建的时间 和 GMT时间1970年1月1日 之间相差的毫秒数。
                    var ms = 0;

                    var monthMaxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                    switch (interval)
                    {
                        case 'year':
                            if ((this.year % 4 == 0 && ((this.year % 100 != 0) || (this.year % 400 == 0))) && this.month == 1 && this.day == 29
                            && !((this.year + number) % 4 == 0 && (((this.year + number) % 100 != 0) || ((this.year + number) % 400 == 0))))
                            {
                                // 闰年的二月二十九日并且目标年不为闰年
                                ms = Number(new Date(this.year + number, this.month, 28, this.hour, this.minute, this.second));
                            }
                            else
                            {
                                ms = Number(new Date(this.year + number, this.month, this.day, this.hour, this.minute, this.second));
                            }
                            break;
                        case 'quarter':
                            if ((this.year % 4 == 0 && ((this.year % 100 != 0) || (this.year % 400 == 0))) && this.month == 1 && this.day == 29
                            && !((this.year + parseInt((this.month + number * 3) / 12)) % 4 == 0 && (((this.year + parseInt((this.month + number * 3) / 12)) % 100 != 0) || ((this.year + parseInt((this.month + number * 3) / 12)) % 400 == 0))))
                            {
                                // 闰年的二月二十九日并且目标年不为闰年
                                ms = Number(new Date(this.year, (this.month + number * 3), 28, this.hour, this.minute, this.second));
                            }
                            else
                            {
                                if (this.day == monthMaxDays[this.month])
                                {
                                    // 月份最后一天的处理
                                    ms = Number(new Date(this.year, (this.month + number * 3), monthMaxDays[(this.month + number * 3) % 12], this.hour, this.minute, this.second));
                                }
                                else
                                {
                                    ms = Number(new Date(this.year, (this.month + number * 3), this.day, this.hour, this.minute, this.second));
                                }
                            }
                            break;
                        case 'month':

                            if ((this.year % 4 == 0 && ((this.year % 100 != 0) || (this.year % 400 == 0))) && this.month == 1 && this.day == 29
                            && !((this.year + parseInt((this.month + number) / 12)) % 4 == 0 && (((this.year + parseInt((this.month + number) / 12)) % 100 != 0) || ((this.year + parseInt((this.month + number) / 12)) % 400 == 0))))
                            {
                                // 闰年的二月二十九日并且目标年不为闰年
                                ms = Number(new Date(this.year, (this.month + number), 28, this.hour, this.minute, this.second));
                            }
                            else
                            {
                                if (this.day == monthMaxDays[this.month])
                                {
                                    // 月份最后一天的处理
                                    ms = Number(new Date(this.year, (this.month + number), monthMaxDays[(this.month + number) % 12], this.hour, this.minute, this.second));
                                }
                                else
                                {
                                    //ms = Number(this.toDate().setMonth(this.month + number));
                                    ms = Number(new Date(this.year, (this.month + number), this.day, this.hour, this.minute, this.second));
                                }
                            }
                            break;
                        case 'week':
                            ms = date + ((86400000 * 7) * number);
                            break;
                        case 'day':
                            ms = date + (86400000 * number);
                            break;
                        case 'hour':
                            ms = date + (3600000 * number);
                            break;
                        case 'minute':
                            ms = date + (60000 * number);
                            break;
                        case 'second':
                            ms = date + (1000 * number);
                            break;
                        case 'msecond':
                            ms = date + number;
                            break;
                    }

                    return x.date.create(new Date(ms));
                },

                /*
                * 取得日期数据信息  
                * 参数 interval 表示数据类型  
                * y 年 M月 d日 w星期 ww周 h时 n分 s秒  
                */
                getDatePart: function(interval)
                {
                    var weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

                    switch (interval)
                    {
                        case 'y':
                        case 'year':
                            return this.year;
                        case 'q':
                        case 'quarter':
                            return this.getQuarterOfYear();
                        case 'M':
                        case 'month':
                            return this.month;
                        case 'd':
                        case 'day':
                            return this.day;
                        case 'w':
                        case 'week':
                            return weekDays[this.weekDay];
                        case 'W':
                        case 'weekOfYear':
                            return this.getWeekOfYear();
                        case 'h':
                        case 'hour':
                            return this.hour;
                        case 'm':
                        case 'minute':
                            return this.minute;
                        case 's':
                        case 'second':
                            return this.second;
                        default:
                            return 'Unkown Interval';
                    }
                },

                /*
                /* 取得当前日期所在月的最大天数  
                */
                getMaxDayOfMonth: function()
                {
                    var date1 = x.date.create(this.toString('yyyy-MM-01'));
                    var date2 = x.date.create(this.add('month', 1).toString('yyyy-MM-01'));

                    return date1.diff('day', date2);
                },

                /*
                * 取得当前日期所在季度是一年中的第几季度 
                */
                getQuarterOfYear: function()
                {
                    return Math.ceil(this.month / 3);
                },

                /*
                * 取得当前日期是一年中的第几周  
                */
                getWeekOfYear: function()
                {
                    var week = 0;

                    day = this.getDayOfYear();

                    // 判断是否为星期日
                    // 如果一年中的第一天不是星期日, 则减去相差的天数以最近的星期日开始计算
                    if (x.date.create(this.toString('yyyy-01-01')).weekDay > 0)
                    {
                        day = day - (7 - x.date.create(this.toString('yyyy-01-01')).weekDay);
                    }

                    if (day > 0)
                    {
                        week = Math.ceil(day / 7);
                    }

                    return week;
                },

                /*
                * 取得当前日期是一年中的第几天
                */
                getDayOfYear: function()
                {
                    var date1 = this.toDate();
                    var date2 = new Date(date1.getFullYear(), 0, 1);

                    return Math.ceil(Number(date1 - date2) / (24 * 60 * 60 * 1000)) + 1;
                },

                /*
                * 判断闰年  
                */
                isLeapYear: function()
                {
                    // 闰年的计算方法：
                    // 公元纪年的年数可以被四整除，即为闰年；
                    // 被100整除而不能被400整除为平年；
                    // 被100整除也可被400整除的为闰年。
                    // 如2000年是闰年，而1900年不是。
                    return (this.year % 4 == 0 && ((this.year % 100 != 0) || (this.year % 400 == 0)));
                },

                /*
                * 转换为数组格式
                */
                toArray: function()
                {
                    return [this.year, this.month, this.day, this.hour, this.minute, this.second, this.msecond];
                },

                /*
                * 转换为内置 Date 对象
                */
                toDate: function()
                {
                    return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
                },

                /*
                * 日期格式化  
                * 格式 
                * yyyy/yy 表示年份  
                * MM 月份  
                * w 星期  
                * dd/d 日期  
                * hh/h 时间  
                * mm/m 分钟  
                * ss/s 秒  
                */
                toString: function(format)
                {
                    var outString = x.isUndefined(format, 'yyyy-MM-dd HH:mm:ss');

                    var weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

                    outString = outString.replace(/yyyy|YYYY/, this.year);
                    outString = outString.replace(/yy|YY/, (this.year2 % 100) > 9 ? (this.year2 % 100).toString() : '0' + (this.year2 % 100));

                    outString = outString.replace(/MM/, (this.month + 1) > 9 ? (this.month + 1).toString() : '0' + (this.month + 1));
                    outString = outString.replace(/M/g, (this.month + 1));

                    outString = outString.replace(/w|W/g, weekDays[this.weekDay]);

                    outString = outString.replace(/dd|DD/, this.day > 9 ? this.day : '0' + this.day);
                    outString = outString.replace(/d|D/g, this.day);

                    outString = outString.replace(/hh|HH/, this.hour > 9 ? this.hour : '0' + this.hour);
                    outString = outString.replace(/h|H/g, this.hour);

                    outString = outString.replace(/mm/, this.minute > 9 ? this.minute : '0' + this.minute);
                    outString = outString.replace(/m/g, this.minute);

                    outString = outString.replace(/ss|SS/, this.second > 9 ? this.second : '0' + this.second);
                    outString = outString.replace(/s|S/g, this.second);

                    outString = outString.replace(/fff/g, ((this.msecond > 99) ? this.msecond : (this.msecond > 9) ? '0' + this.msecond : '00' + this.msecond));

                    return outString;
                }
            };

            return time;
        },

        /**
        * 时间间隔对象
        */
        newTimeSpan: function(timeSpanValue, format)
        {
            format = typeof (format) === 'undefined' ? 'second' : format;

            // 小时转化成秒
            if (format == 'day' || format == 'd')
            {
                timeSpanValue = timeSpanValue * 24 * 60 * 60;
            }

            // 小时转化成秒
            if (format == 'hour' || format == 'h')
            {
                timeSpanValue = timeSpanValue * 60 * 60;
            }

            // 分钟转化成秒
            if (format == 'minute' || format == 'm')
            {
                timeSpanValue = timeSpanValue * 60;
            }

            // 秒不需要转化
            if (format == 'second' || format == 's')
            {
                timeSpanValue = timeSpanValue * 1000;
            }

            var timeSpan = {
                // 时间间隔(单位:毫秒)
                timeSpanValue: timeSpanValue,
                // 天
                day: timeSpanValue / (24 * 60 * 60 * 1000),
                // 小时
                hour: timeSpanValue / (60 * 60 * 1000),
                // 分钟
                minute: timeSpanValue / (60 * 1000),
                // 秒
                second: timeSpanValue / 1000,
                // 毫秒
                millisecond: timeSpanValue % 1000,

                toString: function(format)
                {
                    var outString = '';

                    switch (format)
                    {
                        case 'MM天dd小时mm分钟ss秒fff毫秒':
                            outString = (this.day > 9 ? '' : '0') + this.day + "天" + (this.hour > 9 ? '' : '0') + this.hour + "小时" + (this.minute > 9 ? '' : '0') + this.minute + "分钟" + (this.second > 9 ? '' : '0') + this.second + "秒" + (this.millisecond > 99 ? '' : (this.millisecond > 9 ? '0' : '00')) + this.second + "秒";
                            break;
                        case 'MM天dd小时mm分钟ss秒':
                            outString = (this.day > 9 ? '' : '0') + this.day + "天" + (this.hour > 9 ? '' : '0') + this.hour + "小时" + (this.minute > 9 ? '' : '0') + this.minute + "分钟" + (this.second > 9 ? '' : '0') + this.second + "秒";
                            break;
                        default:
                            outString = (this.day > 9 ? '' : '0') + this.day + "天" + (this.hour > 9 ? '' : '0') + this.hour + "小时" + (this.minute > 9 ? '' : '0') + this.minute + "分钟" + (this.second > 9 ? '' : '0') + this.second + "秒";
                            break;
                    }

                    return outString;
                }
            };

            return timeSpan;
        },

        /**
        * 倒计时计时器
        */
        newCountdownTimer: function(options)
        {
            var timer = {
                // 定时器的名称
                name: 'countdowntimer$' + Math.ceil(Math.random() * 900000000 + 100000000),

                /*#region 函数:bindOptions(options)*/
                /**
                * 设置选项
                */
                bindOptions: function(options)
                {
                    var that = this;

                    this.options = x.ext({
                        // 时间间隔(单位:秒)
                        interval: 60,
                        // 运行时的回调方法
                        run_callback: function(time) { },
                        // 停止时的回调方法
                        stop_callback: function(time) { }
                    }, options || {});
                },
                /*#endregion*/

                /*#region 函数:bindOptions(options)*/
                /**
                * 开始
                */
                start: function()
                {
                    eval(this.name + ' = this;');

                    this.stopTime = x.date.create().add('second', this.options.interval);

                    this.run();
                },
                /*#endregion*/

                /*#region 函数:stop()*/
                /**
                * 停止
                */
                stop: function()
                {
                    if (this.timerRunning)
                    {
                        clearTimeout(this.timerId);

                        this.options.stop_callback();
                    }

                    this.timerRunning = false;
                },
                /*#endregion*/

                run: function()
                {
                    // 当前时间
                    var currentTime = x.date.create();
                    // 停止的时间
                    var stopTime = this.stopTime;
                    // 剩余时间
                    var time = {
                        year: stopTime.year - currentTime.year,
                        month: stopTime.month - currentTime.month,
                        day: stopTime.day - currentTime.day,
                        hour: stopTime.hour - currentTime.hour,
                        minute: stopTime.minute - currentTime.minute,
                        second: stopTime.second - currentTime.second
                    };

                    if (time.second < 0)
                    {
                        time.second = 60 + time.second;
                        time.minute = time.minute - 1;
                    }
                    if (time.minute < 0)
                    {
                        time.minute = 60 + time.minute;
                        time.hour = time.hour - 1;
                    }
                    if (time.hour < 0)
                    {
                        time.hour = 24 + time.hour;
                        time.day = time.day - 1;
                    }
                    if (time.day < 0)
                    {
                        time.day = 31 + time.day;
                        time.month = time.month - 1;
                    }
                    if (time.month < 0)
                    {
                        time.month = 12 + time.month;
                        time.year = time.year - 1;
                    }

                    this.timerId = setTimeout(this.name + '.run()', 1000);

                    this.timerRunning = true;

                    this.options.run_callback(time);

                    if (time.year == 0 && time.month == 0 && time.day == 0 && time.hour == 0 && time.minute == 0 && time.second == 0)
                    {
                        this.stop();
                    }
                },
                /*#endregion*/

                /*#region 函数:create(options)*/
                create: function(options)
                {
                    this.bindOptions(options);

                    this.timerRunning = false;
                }
                /*#endregion*/
            };

            timer.create(options);

            return timer;
        }
    };

    return x.date;
});