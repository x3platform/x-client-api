// -*- ecoding=utf-8 -*-

/**
* @namespace animation
* @memberof x.ui
* @description 动画
*/
x.ui.animation = {
    /**
    * 动画剪辑
    * @description 动画剪辑
    * @class Clip
    * @constructor newClip
    * @memberof x.ui.animation
    * @param {object} options 选项
    */
    newClip: function(options)
    {
        // 容器对象,滑动对象,切换数量
        var clip = {
            //
            container: null,
            slider: null,
            // 场景
            scenes: [],
            count: 0,
            // 定时器
            timer: null,

            index: 0, // 当前索引
            _target: 0, // 目标值
            // tween 参数
            _t: 0,
            _b: 0,
            _c: 0,

            // 设置默认属性
            bindOptions: function(options)
            {
                this.options = {
                    vertical: true,                         // 是否垂直方向（方向不能改）
                    hange: 0,                               // 改变量
                    duration: 50,                           // 滑动持续时间
                    time: 5,                                // 滑动延时
                    auto: false,                            // 是否自动
                    cpause: 2000,                           // 停顿时间(auto为true时有效)
                    onStart: function() { },                // 开始转换时执行
                    onFinish: function() { },               // 完成转换时执行
                    tween: x.ui.animation.tween.quart.easeOut  // tween 算法
                };

                x.ext(this.options, options || {});
            },

            // 开始切换
            run: function(index)
            {
                // 修正index
                index == undefined && (index = this.index);
                index < 0 && (index = this.count - 1) || index >= this.count && (index = 0);

                // 设置参数
                this.target = -Math.abs(this.change) * (this.index = index);
                this._t = 0;
                this._b = parseInt(x.css.style(this.slider)[this.options.vertical ? "top" : "left"]);
                this._c = this.target - this._b;

                this.onStart();
                this.move();
            },

            // 移动
            move: function()
            {
                clearTimeout(this.timer);

                if (this._c && this._t < this.duration)
                {
                    // 未到达目标继续移动否则进行下一次滑动
                    this.moveTo(Math.round(this.tween(this._t++, this._b, this._c, this.duration)));
                    this.timer = setTimeout(x.invoke(this, this.move), this.time);
                }
                else
                {
                    this.moveTo(this.target);
                    this.auto && (this.timer = setTimeout(x.invoke(this, this.next), this.pause));
                }
            },

            /*#region 函数:moveTo()*/
            /**
            * 移动到
            * @method moveTo
            * @memberof x.ui.animation.newClip#
            */
            moveTo: function(i)
            {
                this.slider.style[this._css] = i + "px";
            },
            /*#endregion*/

            /*#region 函数:previous()*/
            /**
            * 上一个
            * @method previous
            * @memberof x.ui.animation.newClip#
            */
            previous: function()
            {
                this.run(--this.index);
            },
            /*#endregion*/

            /*#region 函数:next()*/
            /**
            * 下一个
            * @method next
            * @memberof x.ui.animation.newClip#
            */
            next: function()
            {
                this.run(++this.index);
            },
            /*#endregion*/

            /*#region 函数:stop()*/
            /**
            * 停止
            * @method stop
            * @memberof x.ui.animation.newClip#
            */
            stop: function()
            {
                clearTimeout(this.timer);
                this.moveTo(this.target);
            },
            /*#endregion*/

            bindScenes: function()
            {
                var that = this;

                $($(this.container).find('.x-ui-clip-scene')).each(function(index, node)
                {
                    that.scenes[index] = node;
                });

                this.count = this.scenes.length;
            },

            /*#region 函数:getScene(index)*/
            /**
            * 添加场景
            */
            getScene: function(index)
            {
                var sceneCount = this.scenes.length;

                index = x.isUndefined(index, 0);

                if (index < 0) { index = 0; }

                if (index > sceneCount - 1) { index = sceneCount - 1; }

                return this.scenes[index];
            },
            /*#endregion*/

            /*#region 函数:addScene(index)*/
            /**
            * 添加场景
            */
            addScene: function(index)
            {
                var sceneCount = this.scenes.length;

                if (sceneCount == 0) { x.debug.error('必须创建默认场景。'); }

                index = x.isUndefined(index, sceneCount - 1);

                var scene = this.getScene(index);

                // 横向
                $(scene).parent().parent().append($('<td><div class="x-ui-clip-scene" ></div></td>'));
                this.count++;

                // 重新设置容器宽度
                $(this.container).find('.x-ui-clip-scene').css({ width: this.width, height: this.height });

                // 重新绑定场景信息
                this.bindScenes();
            },
            /*#endregion*/

            /*#region 函数:addScene()*/
            /**
            * 添加场景
            */
            removeScene: function(index)
            {
                var sceneCount = this.scenes.length;

                if (sceneCount == 0) { x.debug.error('必须创建默认场景。'); }

                if (scenes.size() == 2) { x.debug.error('必须创建默认场景.'); }

                index = x.isUndefined(index, sceneCount - 1);

                var scene = this.getScene(index);

                if (scenes.size() > 0)
                {
                    // 横向
                    $(scenes[scenes.size() - 1]).parent().parent().append($('<td><div class="x-ui-clip-scene" ></div></td>'));
                    this.count++;
                }

                // 重新设置容器宽度
                $(this.container).find('.x-ui-clip-scene').css({ width: this.width, height: this.height });

                // 重新绑定场景信息
                this.bindScenes();
            },
            /*#endregion*/

            create: function(options)
            {
                this.container = x.dom.query(options.container)[0];    // 容器对象
                this.slider = x.dom.query(options.slider)[0];          // 滑动对象

                this.width = options.width;                             // 容器显示的宽度
                this.height = options.height;                           // 容器显示的高度

                this.bindOptions(options);

                $(this.container).find('.x-ui-clip-scene').css({ width: this.width, height: this.height });

                // 重新绑定场景信息
                this.bindScenes();

                this.count = Math.abs(options.count);                   // 切换数量

                this.auto = !!this.options.auto;
                this.duration = Math.abs(this.options.duration);
                this.time = Math.abs(this.options.time);
                this.pause = Math.abs(this.options.pause);
                this.tween = this.options.tween;

                this.onStart = this.options.onStart;
                this.onFinish = this.options.onFinish;

                var bvertical = !!this.options.vertical;

                // 方向
                this._css = bvertical ? "top" : "left";

                // 样式设置
                var position = x.css.style(this.container).position;
                
                position == "relative" || position == "absolute" || (this.container.style.position = "relative");

                this.container.style.overflow = "hidden";
                this.slider.style.position = "absolute";

                this.change = this.options.change ? this.options.change : this.slider[bvertical ? "offsetHeight" : "offsetWidth"] / this.count;
            }
        };

        clip.create(options);

        return clip;
    },

    /** 
    * 补间动画
    * @namespace tween
    * @memberof x.ui.animation
    */
    tween: {
        /** 
        * 线性的
        * @method linear
        * @memberof x.ui.animation.tween
        * @param {number} t: timestamp，指缓动效果开始执行到当前帧开始执行时经过的时间段，单位ms
        * @param {number} b: beginning position，起始位置
        * @param {number} c: change，要移动的距离，就是终点位置减去起始位置
        * @param {number} d: duration ，缓和效果持续的时间
        */
        linear: function(t, b, c, d)
        {
            return c * t / d + b;
        },
        /**
        * @namespace quart
        * @memberof x.ui.animation.tween
        */
        quart: {
            /** 
            * 缓慢进入
            * @method easeIn
            * @memberof x.ui.animation.tween.quart
            * @param {number} t: timestamp，指缓动效果开始执行到当前帧开始执行时经过的时间段，单位ms
            * @param {number} b: beginning position，起始位置
            * @param {number} c: change，要移动的距离，就是终点位置减去起始位置
            * @param {number} d: duration ，缓和效果持续的时间
            */
            easeIn: function(t, b, c, d)
            {
                return c * (t /= d) * t * t * t + b;
            },
            /** 
            * 缓慢退出
            * @method easeIn
            * @memberof x.ui.animation.tween.quart
            * @param {number} [t]imestamp 指缓动效果开始执行到当前帧开始执行时经过的时间段，单位ms
            * @param {number} [b]eginning position，起始位置
            * @param {number} [c]hange 要移动的距离，就是终点位置减去起始位置
            * @param {number} [d]uration 缓和效果持续的时间
            */
            easeOut: function(t, b, c, d)
            {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function(t, b, c, d)
            {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        /**
        * @namespace quad
        * @memberof x.ui.animation.tween
        */
        quad: {
            easeIn: function(t, b, c, d)
            {
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d)
            {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function(t, b, c, d)
            {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        /**
        * @namespace cubic
        * @memberof x.ui.animation.tween
        */
        cubic: {
            easeIn: function(t, b, c, d)
            {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function(t, b, c, d)
            {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d)
            {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        /**
        * @namespace quint
        * @memberof x.ui.animation.tween
        */
        quint: {
            easeIn: function(t, b, c, d)
            {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function(t, b, c, d)
            {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d)
            {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        /**
        * @namespace sine
        * @memberof x.ui.animation.tween
        */
        sine: {
            easeIn: function(t, b, c, d)
            {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function(t, b, c, d)
            {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function(t, b, c, d)
            {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        /**
        * @namespace expo
        * @memberof x.ui.animation.tween
        */
        expo: {
            easeIn: function(t, b, c, d)
            {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function(t, b, c, d)
            {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function(t, b, c, d)
            {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        /**
        * @namespace circ
        * @memberof x.ui.animation.tween
        */
        circ: {
            easeIn: function(t, b, c, d)
            {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function(t, b, c, d)
            {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function(t, b, c, d)
            {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        /**
        * @namespace elastic
        * @memberof x.ui.animation.tween
        */
        elastic: {
            easeIn: function(t, b, c, d, a, p)
            {
                if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function(t, b, c, d, a, p)
            {
                if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function(t, b, c, d, a, p)
            {
                if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        /**
        * @namespace back
        * @memberof x.ui.animation.tween
        */
        back: {
            easeIn: function(t, b, c, d, s)
            {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function(t, b, c, d, s)
            {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function(t, b, c, d, s)
            {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        /**
        * @namespace bounce
        * @memberof x.ui.animation.tween
        */
        bounce: {
            easeIn: function(t, b, c, d)
            {
                return c - x.animation.tween.bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function(t, b, c, d)
            {
                if ((t /= d) < (1 / 2.75))
                {
                    return c * (7.5625 * t * t) + b;
                }
                else if (t < (2 / 2.75))
                {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                }
                else if (t < (2.5 / 2.75))
                {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                }
                else
                {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function(t, b, c, d)
            {
                if (t < d / 2) return x.animation.tween.bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return x.animation.tween.bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};