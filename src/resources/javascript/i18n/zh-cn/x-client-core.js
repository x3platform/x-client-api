(function(i18n)
{
    var init = function(destination, source) { for (var property in source) { destination[property] = source[property]; } return destination; };

    i18n = init(i18n, {
        /* 常用 */
        msg: {
            // Are you sure you want to delete these items.
            ARE_YOU_SURE_YOU_WANT_TO_DELETE: '确定删除?'
        },
        /* 常用 */
        generic: {
            filter: '查询',
            query: '查询',
            add: '新增',
            edit: '编辑',
            remove: '删除',
            refresh: '刷新'
        },

        /* 日期 */
        date: {
            dateformat: {
                "fulldaykey": "yyyyMMdd",
                "fulldayshow": "yyyy年M月d日",
                "fulldayvalue": "yyyy-M-d",
                "Md": "M/d (W)",
                "Md3": "M月d日"
            }
        },
        /* 元素 */
        dom: {
            errors: {
            }
        },
        /* 网络 */
        net: {
            errors: {
                401: '访问被拒绝，客户试图未经授权访问受密码保护的页面。',
                404: '无法找到指定位置的资源。',
                500: '服务器繁忙，请稍候再试。',
                unkown: '系统错误，错误信息【{0}】。'
            },

            waiting: {
                loadingTipText: '正在加载数据，请稍后......',
                loadingWorkflowTemplateTipText: '正在加载工作流模板，请稍后......',
                queryTipText: '正在查询数据，请稍后......',
                commitTipText: '正在提交数据，请稍候......',
                holdTipText: '正在暂存数据，请稍候......',
                saveTipText: '正在保存数据，请稍候......',
                deleteTipText: '正在删除数据，请稍候......'
            }
        }
    });

    window.i18n = i18n;

    return i18n;
})(typeof i18n !== 'undefined' ? i18n : {});