/**
* form feature  : date(日期选择框)
*
* require	    : x.js, x.dom.js
*/
x.dom.features.touchDate = {

    /*
    * 绑定日期
    */
    bind: function(inputName)
    {
        x.require({
            files: [
                { fileType: 'css', id: 'x-ui-pkg-touches-date-css', path: x.ui.styles.dir() + 'x.ui.pkg.touches.date.css' },
                { fileType: 'script', id: 'x-ui-pkg-date-script', path: x.ui.pkg.dir() + 'x.ui.pkg.touches.date.js' }
            ],
            data: { inputName: inputName },
            callback: function(context)
            {
                var data = context.data;

                // 参数初始化

                // 设置相关原始控件
                var input = x.dom('#' + data.inputName);
                // 读取选项信息
                var options = input.options();

                var componentName = data.inputName + '-touch-date';
                var componentContainerName = componentName + '-container';

                // 设置新的显示元素
                input.after('<div id="' + data.inputName + '-view" ></div>');
                input.after('<div id="' + componentContainerName + '" style="display:none;" ></div>');

                // 初始化
                var component = x.cache[componentName] = x.ui.pkg.touches.date.newDate(x.ext(options,
                {
                    // 名称
                    name: componentName,
                    inputName: data.inputName,
                    inputViewName: data.inputName + '-view',
                    containerName: componentContainerName,
                    dateValue: input[0].value
                }));

                x.css.add('#' + component.container[0].id, component.options.classNamePrefix + '-wrapper');

                if (input[0].value.length > 0)
                {
                    component.inputView[0].innerHTML = x.date.create(input[0].value).toString(component.dateFormatValue);
                }
            }
        });
    }
};