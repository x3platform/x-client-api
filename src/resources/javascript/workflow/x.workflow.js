// =============================================================================
//
// Copyright (c) 2010 ruanyu@live.com
//
// FileName     :x.workflow.js
//
// Description  :
//
// Author       :Max
//
// Date         :2010-01-01
//
// =============================================================================

/**
* 工作流类
*
*/
x.workflow = {

  // 设置
  settings: {
    // 工作流节点标识
    // workflowNodeActorMethods: '[{text:\'会审(需要所有人审批)\',value:\'会审\'},{text:\'并审(只需其中一个人审)\',value:\'并审\'},{text:\'抄送\',value:\'抄送\'}]',
    workflowNodeActorMethods: '[{text:\'会签\',value:\'会签\'},{text:\'校稿\',value:\'校稿\'},{text:\'审核(需要所有人同意)\',value:\'审核\'},{text:\'并审(需要其中一人同意)\',value:\'并审\'},{text:\'审批(审核+批准)\',value:\'审批\'},{text:\'批准\',value:\'批准\'},{text:\'抄送\',value:\'抄送\'}]',
    // 工作流节点标识
    workflowNodeSelector: '.workflow-node',
    // 工作流节点新增标识
    workflowNodeNewSelector: '.workflow-node-new',
    // 工作流分支条件标识
    workflowSwitcherExitSelector: '.workflow-switcher-exit',
    // 工作流分支条件新增标识
    workflowSwitcherExitNewSelector: '.workflow-switcher-exit-new',
    // 工作流分支条件标识
    workflowSwitcherExitConditionSelector: '.workflow-switcher-exit-condition',
    // 工作流分支条件新增标识
    workflowSwitcherExitConditionNewSelector: '.workflow-switcher-exit-condition-new'
  },

  /*#region 函数:reminder(options)*/
  /**
   * 发送催办信息
   */
  reminder: function(options)
  {
    if(confirm('确定发送催办消息给审批人?'))
    {
      var outString = '<?xml version="1.0" encoding="utf-8"?>';
      outString += '<request>';
      if(typeof (options.clientTargetObject) !== 'undefined')
      {
        outString += '<clientTargetObject><![CDATA[' + options.clientTargetObject + ']]></clientTargetObject>';
      }
      outString += '<customTableName><![CDATA[' + options.customTableName + ']]></customTableName>';
      outString += '<entityId><![CDATA[' + options.entityId + ']]></entityId>';
      outString += '<entityClassName><![CDATA[' + options.entityClassName + ']]></entityClassName>';
      outString += '<workflowInstanceId><![CDATA[' + options.workflowInstanceId + ']]></workflowInstanceId>';
      outString += '<sendUrlFormat><![CDATA[' + options.sendUrlFormat + ']]></sendUrlFormat>';
      outString += '<tags><![CDATA[' + options.tags + ']]></tags>';
      outString += '</request>';

      x.net.xhr('/api/kernel.entities.operationLog.reminder.aspx', outString, { popResultValue: 1 });
    }
  },
  /*#endregion*/

  /**
  * 处理工作流请求
  */
  workflowRequest: {

    /*#region 函数:start(templateId, entityId, entityClassName, options)*/
    /*
    * 启动流程
    *
    * templateId:模板标识
    */
    start: function(templateId, entityId, entityClassName, options)
    {
      x.workflow.workflowRequest.transact({
        url: '/api/workflow.client.start.aspx',
        templateId: templateId,
        entityId: entityId,
        entityClassName: entityClassName,
        title: (typeof (options) === 'undefined' ? '' : options.title),
        idea: (typeof (options) === 'undefined' ? '' : options.idea)
      });
    },
    /*#endregion*/

    /*#region 函数:next(instanceId, nodeId, historyNodeId, options)*/
    /*
    * 执行流程下一步
    *
    * instanceId:工作流实例标识
    */
    next: function(instanceId, nodeId, historyNodeId, options)
    {
      x.workflow.workflowRequest.transact({
        url: '/api/workflow.client.next.aspx',
        instanceId: instanceId,
        nodeId: nodeId,
        historyNodeId: historyNodeId,
        title: (typeof (options) === 'undefined' ? '' : options.title),
        idea: (typeof (options) === 'undefined' ? '' : options.idea)
      });
    },
    /*#endregion*/

    /*#region 函数:gotoStartNode(instanceId, nodeId, historyNodeId, idea)*/
    gotoStartNode: function(instanceId, nodeId, historyNodeId, idea)
    {
      if(idea === '')
      {
        alert("驳回操作必须填写意见。");
        return;
      }

      x.workflow.workflowRequest.transact({
        url: '/api/workflow.client.gotoStartNode.aspx',
        instanceId: instanceId,
        nodeId: nodeId,
        historyNodeId: historyNodeId,
        idea: idea
      });
    },
    /*#endregion*/

    /*#region 函数:gotoRejectNode(instanceId, nodeId, historyNodeId, options)*/
    gotoRejectNode: function(instanceId, nodeId, historyNodeId, options)
    {
      x.workflow.workflowRequest.transact({
        url: '/api/workflow.client.gotoRejectNode.aspx',
        instanceId: instanceId,
        nodeId: nodeId,
        historyNodeId: historyNodeId,
        title: (typeof (options) === 'undefined' ? '' : options.title),
        idea: (typeof (options) === 'undefined' ? '' : options.idea)
      });
    },
    /*#endregion*/

    /*#region 函数:transact(options)*/
    /* 
    *处理工作流
    */
    transact: function(options)
    {
      var outString = '<?xml version="1.0" encoding="utf-8" ?>';

      outString += '<request>';
      outString += '<action><![CDATA[start]]></action>';
      outString += '<templateId><![CDATA[' + options.templateId + ']]></templateId>';
      outString += '<entityId><![CDATA[' + options.entityId + ']]></entityId>';
      outString += '<title><![CDATA[' + options.title + ']]></title>';
      outString += '<idea><![CDATA[' + options.idea + ']]></idea>';
      outString += '</request>';

      $.post(options.url, { resultType: 'json', xml: outString }, function(response)
      {
        var result = x.toJSON(response).message;

        switch(Number(result.returnCode))
        {
          case 0:
            if(typeof (options.callback) !== 'undefined')
            {
              options.callback();
            }
            break;

          case -1:
          case 1:
            alert(result.value);
            break;

          default:
            break;
        }
      });
    }
    /*#endregion*/
  },

  /**
  * 设计时 工具函数.
  */
  designtime:
  {
    /*#region 函数:createDesignXml()*/
    /**
    * 创建设计模板的Xml
    */
    createDesignXml: function()
    {
      x.debug.warn('函数【x.workflow.designtime.createDesignXml】已过时了，可以使用新的函数【x.workflow.template.serialize】。');

      return x.workflow.template.serialize();
    },
    /*#endregion*/

    /*#region 函数:getTemplateByWorkflowTemplateId(templateId, container, toolbar, fectchExpectedActors, options)*/
    /**
    * 获取模板信息
    *
    * templateId : 模板标识
    * container : 容器
    * toolbar : 工具栏信息
    * fectchExpectedActors : 获取预计执行人信息
    * options : 工作流选项
    */
    getTemplateByWorkflowTemplateId: function(templateId, container, toolbar, fectchExpectedActors, options)
    {
      x.debug.warn('函数【x.designtime.getTemplateByWorkflowTemplateId】已过时了，可以使用新的函数【x.workflow.template.download】。');

      x.workflow.template.download({
        toolbar: toolbar,
        container: container,
        url: '/api/workflow.template.findOne.aspx',
        id: templateId,
        fectchExpectedActors: fectchExpectedActors,
        corporationId: (typeof (options) === 'undefined' ? '' : options.corporationId),
        projectId: (typeof (options) === 'undefined' ? '' : options.projectId),
        startActorId: (typeof (options) === 'undefined' ? '' : options.startActorId)
      });
    },
    /*#endregion*/

    /*#region 函数:getTemplateByWorkflowInstanceId(instanceId, container, toolbar, fectchExpectedActors, fectchFinishedActors, options)*/
    /**
    * 获取模板信息
    *
    * instanceId : 模板标识
    * container : 容器
    * toolbar : 工具栏信息
    * fectchExpectedActors : 获取预计执行人信息
    * fectchFinishedActors : 获取已执行人信息
    * options : 工作流选项
    */
    getTemplateByWorkflowInstanceId: function(instanceId, container, toolbar, fectchExpectedActors, fectchFinishedActors, options)
    {
      x.debug.warn('函数【x.designtime.getTemplateByWorkflowInstanceId】已过时了，可以使用新的函数【x.workflow.template.download】。');

      x.workflow.template.download({
        toolbar: toolbar,
        container: container,
        url: '/api/workflow.instance.getTemplateByWorkflowInstanceId.aspx',
        id: instanceId,
        fectchExpectedActors: fectchExpectedActors,
        fectchFinishedActors: fectchFinishedActors,
        corporationId: (typeof (options) === 'undefined' ? '' : options.corporationId),
        projectId: (typeof (options) === 'undefined' ? '' : options.projectId)
      });
    },
    /*#endregion*/

    /*#region 函数:getTemplateByWorkflowInstanceId(instanceId, container, toolbar, fectchExpectedActors, fectchFinishedActors, options)*/
    /**
    * 获取模板信息
    *
    * nodeId : 模板标识
    * container : 容器
    * toolbar : 工具栏信息
    * fectchExpectedActors : 获取预计执行人信息
    * fectchFinishedActors : 获取已执行人信息
    * options : 工作流选项
    */
    getTemplateByWorkflowNodeId: function(nodeId, container, toolbar, fectchExpectedActors, fectchFinishedActors, options)
    {
      x.debug.warn('函数【x.designtime.getTemplateByWorkflowNodeId】已过时了，可以使用新的函数【x.workflow.template.download】。');

      x.workflow.template.download({
        toolbar: toolbar,
        container: container,
        url: '/api/workflow.instance.getTemplateByWorkflowNodeId.aspx',
        nodeId: nodeId,
        fectchExpectedActors: fectchExpectedActors,
        fectchFinishedActors: fectchFinishedActors,
        corporationId: (typeof (options) === 'undefined' ? '' : options.corporationId),
        projectId: (typeof (options) === 'undefined' ? '' : options.projectId)
      });
    }
    /*#endregion*/
  },

  /**
  * 运行时 工具函数.
  */
  runtime:
  {
    /**
    * 图形化显示流程的设计模板.
    *
    * flowInstanceId : 工作流实例Id
    */
    viewWorkflowByWorkflowInstanceId: function(workflowInstanceId, isPopup)
    {
      var url = '/apps/pages/workflowplus/designer/v2/canvas.aspx?workflowInstanceId=' + encodeURIComponent(workflowInstanceId) + '&status=readonly';

      if(isPopup)
      {
        x.mask.getUrl(url);
      }
      else
      {
        location.href = url;
      }
    },

    /**
    * 图形化显示流程的设计模板.
    *
    * nodeId : 节点Id
    */
    viewWorkflowByWorkflowNodeId: function(nodeId, isPopup)
    {
      var url = "/workflowplus/pages/workflow_view.aspx?nid=" + encodeURIComponent(nodeId);

      if(isPopup)
      {
        x.util.showModalDialog(url, Workflowplus.runtime.modalDialogWidth, Workflowplus.runtime.modalDialogHeight);
      }
      else
      {
        location.href = url;
      }
    },

    /*
    *显示流程业务处理内容，传递flowInstanceId
    */
    viewContentByFlowInstanceId: function(workflowInstanceId)
    {

    },

    /*
    *显示流程业务处理内容，传递node id
    */
    viewContentByNodeId: function(nodeId, isPopup)
    {
      var url = "/workflowplus/pages/workflow_view_dispatch.aspx?nid=" + nodeId;

      if(isPopup)
      {
        x.util.showModalDialog(url, x.workflow.runtime.modalDialogWidth, x.workflow.runtime.modalDialogHeight);
      }
      else
      {
        location.href = url;
      }
    },

    // 用列表方式显示指定流程本人经办的节点信息
    viewMyHistoryByFlowInstanceId: function(flowInstanceId, isPopup)
    {
      var url = "/workflowplus/pages/workflow_query_done_all_node_list.aspx?fid=" + flowInstanceId;

      if(isPopup)
      {
        x.util.showModalDialog(url, x.workflow.runtime.modalDialogWidth, x.workflow.runtime.modalDialogHeight);
      }
      else
      {
        location.href = url;
      }
    },

    /**
    * 用列表方式显示指定流程的所有已处理的节点信息
    *
    * @workflowInstanceId 工作流实例标识
    * @container 接收返回结果的Html元素
    */
    viewHistoryNodesByWorkflowInstanceId: function(workflowInstanceId, container)
    {
      if(workflowInstanceId.indexOf('$') > -1
          || workflowInstanceId.indexOf('{') > -1
          || workflowInstanceId.indexOf('}') > -1
          || workflowInstanceId.indexOf('$') > -1)
      {
        return;
      }

      if(typeof (workflowInstanceId) === 'undefined' || workflowInstanceId === '')
      {
        alert('必须填写【流程实例标识】。');
        return;
      }

      if(typeof (container) === 'undefined' || typeof (container.id) === 'undefined')
      {
        x.cookies.add('workflow-runtime$viewHistoryNodesByWorkflowInstanceId$container', 'workflow-runtime$viewHistoryNodesByWorkflowInstanceId$container');
      }
      else
      {
        x.cookies.add('workflow-runtime$viewHistoryNodesByWorkflowInstanceId$container', container.id);
      }

      var outString = '<?xml version="1.0" encoding="utf-8" ?>';

      outString += '<request>';
      outString += '<workflowInstanceId><![CDATA[' + workflowInstanceId + ']]></workflowInstanceId>';
      outString += '</request>';

      x.net.xhr('/api/workflow.historyNode.findFinishedHistoryNodes.aspx?workflowInstanceId' + workflowInstanceId, {
        callback: function(response)
        {
          var outString = '';

          var result = x.toJSON(response);

          var list = result.ajaxStorage;

          outString += '<table class="table-style table-full-border-style-table" style="width: 100%; margin-bottom: 4px;" >';

          outString += '<tbody>';
          outString += '<tr class="table-row-title" >';
          outString += '<th style="width: 80px;">审批人</th>';
          outString += '<th >审批意见</th>';
          outString += '<th style="width: 120px;">审批时间</th>';
          outString += '</tr>';

          list.each(function(node, index)
          {
            outString += '<tr class="table-row-normal" >';
            outString += '<td>' + node.actorName + '</td>';
            outString += '<td>' + node.idea + '</td>';
            outString += '<td>' + x.date.create(node.finishedTime).toString('yyyy-MM-dd HH:mm:ss') + '</td>';
            outString += '</tr>';
          });

          outString += '</tbody>';
          outString += '</table>';

          if(x.cookies.find('workflow-runtime$viewHistoryNodesByWorkflowInstanceId$container') === '')
          {
            $("#windowWorkflowHistoryNodesContainer").html(outString);
          } else
          {
            $(document.getElementById(x.cookies.find('workflow-runtime$viewHistoryNodesByWorkflowInstanceId$container'))).html(outString);
          }
        }
      });
    },

    // 显示流程维护界面，传递flow id
    manageFlowByFlowInstanceId: function(flowInstanceId, isPopup)
    {
      //var url = "/workflowplus/pages/workflow_manage_flow_view.aspx?fid=" + flowInstanceId;
      var url = "/workflowplus/pages/workflow_management_instance.aspx?fid=" + flowInstanceId;

      if(isPopup)
      {
        x.util.showModalDialog(url, x.workflow.runtime.modalDialogWidth, x.workflow.runtime.modalDialogHeight);
      }
      else
      {
        location.href = url;
      }
    },

    //显示流程维护界面，传递node id
    manageFlowByNodeId: function(nodeId, isPopup)
    {
      //var url = "/workflowplus/pages/workflow_manage_flow_view.aspx?nid=" + nodeId;
      var url = "/workflowplus/pages/workflow_management_instance.aspx?nid=" + nodeId;

      if(isPopup)
      {
        x.util.showModalDialog(url, x.workflow.runtime.modalDialogWidth, x.workflow.runtime.modalDialogHeight);
      }
      else
      {
        location.href = url;
      }
    }
  }
};