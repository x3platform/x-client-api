// -*- ecoding=utf-8 -*-

/**
* ����
* @namespace windows
* @memberof x
*/
x.ui.windows = {
    /*#region ����:newWindow(name, options)*/
    newWindow: function(name, options)
    {
        var internalWindow = {
            // ����
            name: name,
            // ѡ��
            options: options,

            /*#region ����:open()*/
            open: function()
            {
                document.getElementById(name).style.display = '';
            },
            /*#endregion*/

            /*#region ����:close()*/
            close: function()
            {
                document.getElementById(name).style.display = 'none';
            },
            /*#endregion*/

            /*#region ����:create()*/
            create: function()
            {
                var outString = '';

                var opts = this.options;

                outString = '<div id="' + this.name + '" style="';
                outString += 'position: fixed; display:none;'
                outString += 'z-index: ' + opts.zIndex + ';'
                outString += 'border: ' + opts.border + ';'
                outString += 'width: ' + opts.width + ';'
                outString += 'height: ' + opts.height + ';'
                outString += 'top: ' + opts.top + ';'
                outString += 'right:' + opts.right + ';'
                outString += 'bottom: ' + opts.bottom + ';'
                outString += 'left: ' + opts.left + ';'
                outString += '" >' + opts.content + '</div>';

                return outString;
            },
            /*#endregion*/

            /*#region ����:destroy()*/
            /**
            * ���ٶ���
            */
            destroy: function()
            {
                $(document.getElementById(name)).remove();
            },
            /*#endregion*/

            /*#region ����:bindOptions(options)*/
            bindOptions: function(options)
            {
                // ����Ĭ��ѡ�����
                this.options = x.ext({
                    zIndex: 999,                    // Z������
                    height: '100px',                // �߶�
                    width: '100px',                 // ���
                    top: 'auto',                    // ��
                    right: 'auto',                  // ��
                    bottom: 'auto',                 // ��
                    left: 'auto'                    // ��
                }, options || {});
            },
            /*#endregion*/

            load: function(options)
            {
                // ��֤����ѡ����Ϣ
                this.bindOptions(options);

                // ������д��Ĵ�������
                if (!x.isUndefined(options.create))
                {
                    this.create = options.create;
                }

                // �������ֺ�ҳ������
                $(document.body).append(this.create());

                if (this.options.bindingFeature)
                {
                    x.dom.features.bind();
                }
            }
        };

        return internalWindow;
    },
    /*#endregion*/

    /*#region ����:getWindow(name, options)*/
    /**
    * ��ȡ���ڶ���
    */
    getWindow: function(name, options)
    {
        var name = x.getFriendlyName(location.pathname + '$window$' + name);

        var internalWindow = x.windows.newWindow(name, options);

        // ���ؽ��桢���ݡ��¼�
        internalWindow.load(options);

        // �󶨵�Window����
        window[name] = internalWindow;

        return internalWindow;
    },
    /*#endregion*/

    /*#region ����:getDialog(url, width, height, style)*/
    /**
    * �򿪶Ի��´���, �ô�������Ļ����.
    */
    getDialog: function(url, width, height, style)
    {
        // ��ʽ����
        // resizable        ������С
        // location         ��ַ��

        if (typeof (style) === 'undefined')
        {
            style = 'resizable=1,directories=0,location=0,menubar=1,scrollbars=1,status=0,titlebar=0,toolbar=0';
            //
            //style = 'resizable=1,directories=1,location=1,menubar=1,scrollbars=1,status=1,titlebar=1,toolbar=1';
            //
            //style = 'resizable=1,directories=0,location=0,menubar=0,scrollbars=1,status=0,titlebar=0,toolbar=0';
        }

        if (typeof (width) === 'undefined')
        {
            style = "width=" + screen.availWidth + "," + style;
            var left = Math.round((screen.availWidth - width) / 2);
            style = "left=" + left + "," + style;
        }
        else
        {
            style = "width=" + width + "," + style;
            var left = Math.round((screen.availWidth - width) / 2);
            style = "left=" + left + "," + style;
        }

        if (typeof (height) === 'undefined')
        {
            style = "height=" + screen.availHeight + "," + style;
            var top = Math.round((screen.availHeight - height) / 2);
            style = "top=" + top + "," + style;
        }
        else
        {
            style = "height=" + height + "," + style;
            var top = Math.round((screen.availHeight - height) / 2);
            style = "top=" + top + "," + style;
        }

        return window.open(url, '', style);
    },
    /*#endregion*/

    /*#region ����:getModalDialog(url, width, height, style)*/
    /**
    * ��ģ̬����, �ô�������Ļ����.
    */
    getModalDialog: function(url, width, height, style)
    {
        if (typeof (style) === 'undefined')
        {
            style = 'toolbar=no; location=no; directories=no; status=no; menubar=no; center=yes; help=0; resizable=yes; status=0;';
        }

        if (typeof (width) === 'undefined')
        {
            var left = Math.round((screen.availWidth - width) / 2);
            style = 'dialogWidth=' + width + 'px,left=' + left + ',' + style;
        }
        else
        {
            style = "dialogWidth=" + width + "px," + style;
            var left = Math.round((screen.availWidth - width) / 2);
            style = "left=" + left + "," + style;
        }

        if (typeof (height) === 'undefined')
        {
            var top = Math.round((screen.availHeight - height) / 2);
            style = 'dialogHeight=' + height + 'px,top=' + top + ',' + style;
        }
        else
        {
            style = "dialogHeight=" + height + "px," + style;
            var top = Math.round((screen.availHeight - height) / 2);
            style = "top=" + top + "," + style;
        }

        return window.showModalDialog(url, window, style);
    }
    /*#endregion*/
}
    