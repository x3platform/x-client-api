/**
* workflow      : historyNode(历史节点)
*
* require       : x.js, x.net.js, x.workflow.js
*/
x.workflow.historyNode = {

    showDiscussDialog: function()
    {
        var outString = '';

        outString += '<table style="width: 100%;" class="table-style border-4" >';
        outString += '<tr>';
        outString += '<td class="table-header border-4">协商</td>';
        outString += '</tr>';
        outString += '<tr>';
        outString += '<td class="table-body">';

        outString += '<table class="table-style" style="width:100%" >';
        outString += '<tr class="table-row-normal" >';
        outString += '<td class="table-body-text" >标题</td>';
        outString += '<td class="table-body-input" colspan="3"></td>';
        outString += '<span>' + title + '</span>';
        outString += '<input id="discussHistotyNodeId" name="discussHistotyNodeId" type="hidden" value="' + historyNodeId + '" />';
        outString += '</td>';
        outString += '</tr>';
        outString += '<tr class="table-row-normal" >';
        outString += '<td class="table-body-text" style="width: 120px;" >发起人</td>';
        outString += '<td class="table-body-input" style="width: 200px;" ></td>';
        outString += '<td class="table-body-text" style="width: 120px;" >发起时间</td>';
        outString += '<td class="table-body-input" ></td>';
        outString += '</tr>';
        outString += '<tr class="table-row-normal" >';
        outString += '<td class="table-body-text" >发送人</td>';
        outString += '<td class="table-body-input" >dd</td>';
        outString += '<td class="table-body-text" >接收人</td>';
        outString += '<td class="table-body-input" ></td>';
        outString += '</tr>';
        outString += '<tr class="table-row-normal" >';
        outString += '<td class="table-body-text" >意见</td>';
        outString += '<td class="table-body-input" colspan="3" ><textarea></textarea></td>';
        outString += '</tr>';
        outString += '<tr class="table-row-normal" >';
        outString += '<td class="table-body-text" >通知方式</td>';
        outString += '<td class="table-body-input" colspan="3" >';
        outString += '<div class="checkbox-wrapper" >';
        outString += '<input type="checkbox" /><label>待办</label> ';
        outString += '<input type="checkbox" /><label>邮件</label>';
        outString += '<input type="checkbox" /><label>短信</label>';
        outString += '</div>';
        outString += '</td>';
        outString += '</tr>';
        outString += '<tr class="table-row-normal" >';
        outString += '<td class="table-body-text" >&nbsp;</td>';
        outString += '<td class="table-body-input" colspan="3" >';
        outString += '<div class="button-2font-wrapper" ><a class="button-text" href="#">发送</a></div>';
        outString += '</td>';
        outString += '</tr>';
        outString += '</table>';

        outString += '</td>';
        outString += '</tr>';
        outString += '<tr>';
        outString += '<td class="table-footer" ><img style="height: 18px;" src="/resources/images/transparent.gif"></td>';
        outString += '</tr>';
        outString += '</table>';

        var element = x.workflow.node.maskWrapper.open();

        $(element).html(outString);
    },

    /**
    * 讨论 协商
    */
    discuss: function(options)
    {
        var url = '/api/workflow.historyNode.discuss.save.aspx';

        var outString = '<?xml version="1.0" encoding="utf-8" ?>';

        outString += '<ajaxStorage>';
        outString += '<workflowHistoryNodeId><![CDATA[' + options.workflowHistoryNodeId + ']]></workflowHistoryNodeId>';
        outString += '<fromActorId><![CDATA[' + options.fromActorId + ']]></fromActorId>';
        outString += '<toActorId><![CDATA[' + options.toActorId + ']]></toActorId>';
        outString += '<idea><![CDATA[' + options.idea + ']]></idea>';
        outString += '</ajaxStorage>';

        x.net.xhr(url, outString, options);
    }
};