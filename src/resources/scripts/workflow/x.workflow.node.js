/**
* workflow      : node(分支出口)
*
* require       : x.js, x.net.js, x.workflow.js
*/
x.workflow.node = {

  defaultPolicySetting: '{"setting":{"sendAlertTaskFormat":"","canRating":"0"},"entities":[]}',

  maskWrapper: x.ui.mask.newMaskWrapper('x-workflow-node-maskWrapper', { draggableHeight: 504, draggableWidth: 738 }),

  // 当前节点的索引(编辑状态)
  currentIndex: 0,

  /*#region 函数:attribute(nodeId, name)*/
  /**
  * 获取节点属性
  */
  attribute: function(nodeId, name)
  {
    var target = document.getElementById(nodeId + '_' + name);

    return (target === null) ? '' : target.value;
  },
  /*#endregion*/

  /*#region 函数:nodeIndex(nodeId)*/
  /**
  * 根据节点标识获取节点索引
  */
  nodeIndex: function(nodeId)
  {
    var index = nodeId.indexOf('_');
    return nodeId.substr(index + 1, nodeId.length - index - 1);
  },
  /*#endregion*/

  /*#region 函数:resetNodeId(index, nodeId)*/
  /**
  * 重新设置节点的标识
  */
  resetNodeId: function(index, nodeId)
  {
    var node = $(x.workflow.settings.workflowNodeSelector)[index - 1];

    for(var i = 0;i < node.childNodes[1].childNodes.length;i++)
    {
      var id = node.childNodes[1].childNodes[i].id;

      var tempIndex = id.indexOf('_', 4);

      node.childNodes[1].childNodes[i].id = nodeId + '_' + id.substr(tempIndex + 1, id.length - tempIndex - 1);
    }
  },
  /*#endregion*/

  /*#region 函数:create()*/
  /**
  * 创建节点
  */
  create: function()
  {
    var settings = x.workflow.settings;

    var nodes = $(settings.workflowNodeSelector);

    var nodeName;

    // 节点索引位置
    var index = nodes.length;

    // 节点名称必须不重复
    for(var i = 1;i < 100;i++)
    {
      var isExist = false;

      nodeName = '节点' + i;

      nodes.each(function(nodeIndex, node)
      {
        if(node.childNodes[1].childNodes[2].value === nodeName)
        {
          isExist = true;
        }
      });

      if(!isExist)
      {
        break;
      }
    }

    var outString = '';

    outString += '<tr id="nn_' + index + '" class="table-row-normal workflow-node" >';
    outString += '<td>' + (index > 9 ? '' : '0') + index + '</td>';
    outString += '<td>';
    outString += '<span>' + nodeName + '</span>';
    outString += '<input id="nn_' + index + '_id" type="hidden" value="nn_' + index + '" />';
    outString += '<input id="nn_' + index + '_name" type="hidden" value="' + nodeName + '" />';
    outString += '<input id="nn_' + index + '_type" type="hidden" value="node" />';
    outString += '<input id="nn_' + index + '_actorScope" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_actorDescription" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_actorCounter" type="hidden" value="1" />';
    outString += '<input id="nn_' + index + '_actorMethod" type="hidden" value="并审" />';
    outString += '<input id="nn_' + index + '_handler" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_editor" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_backNodes" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_forwardNodes" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_commissionActors" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_timelimit" type="hidden" value="24" />';
    outString += '<input id="nn_' + index + '_filterActors" type="hidden" value="1" />';
    outString += '<input id="nn_' + index + '_sendAlertTask" type="hidden" value="1" />';
    outString += '<input id="nn_' + index + '_policy" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_remark" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_status" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_positionX" type="hidden" value="0" />';
    outString += '<input id="nn_' + index + '_positionY" type="hidden" value="0" />';
    outString += '<input id="nn_' + index + '_repeatDirection" type="hidden" value="None" />';
    outString += '<input id="nn_' + index + '_zIndex" type="hidden" value="" />';
    outString += '<input id="nn_' + index + '_canEdit" type="hidden" value="1" />';
    outString += '<input id="nn_' + index + '_canMove" type="hidden" value="1" />';
    outString += '<input id="nn_' + index + '_canDelete" type="hidden" value="1" />';
    outString += '<input id="nn_' + index + '_canUploadFile" type="hidden" value="0" />';
    outString += '<input id="nn_' + index + '_radiation" type="hidden" value="0" />';
    outString += '<input id="nn_' + index + '_exits" type="hidden" value="[]" />';
    outString += '</td>';

    outString += '<td>';
    outString += '<span id="nn_' + index + '_actorDescription" ></span>';
    outString += '</td>';

    outString += '<td></td>';
    outString += '<td></td>';
    outString += '<td></td>';
    outString += '<td><a href="#">编辑</a></td>';
    outString += '<td><a href="#">上移</td>';
    outString += '<td><a href="#">下移</td>';
    outString += '<td><a href="#">删除</td>';
    outString += '</tr>';

    if(typeof ($(settings.workflowNodeSelector + ':last')[0]) === 'undefined')
    {
      x.workflow.node.currentIndex = 1;

      $(x.workflow.settings.workflowNodeNewSelector).before(outString);
    }
    else
    {
      index = index + 1;

      x.workflow.node.currentIndex = index;

      $(x.workflow.settings.workflowNodeNewSelector).before(outString);
    }

    x.workflow.node.sync();

    x.workflow.node.edit(index);

    // 如果节点新建后，没按保存按钮，则删除当前节点
    x.workflow.node.maskWrapper.closeEvent = function()
    {
      var nodes = $(settings.workflowNodeSelector);

      nodes.each(function(index, node)
      {
        if(node.childNodes[1].childNodes[4].value === '')
        {
          x.workflow.node.remove(index + 1);
        }
      });
    };
  },
  /*#endregion*/

  /*#region 函数:sync()*/
  /**
  * 同步工作流节点信息，重新分析设置节点数据。
  */
  sync: function()
  {
    var settings = x.workflow.settings;

    var nodes = $(settings.workflowNodeSelector);

    for(var i = 0;i < nodes.length;i++)
    {
      var node = nodes[i];

      var index = i + 1;

      // 设置节点的标识
      if(i === 0)
      {
        node.id = 'sn_0';
      }
      else if(i < nodes.length - 1)
      {
        node.id = 'nn_' + i;
      }
      else
      {
        node.id = 'en_' + i;
      }

      node.childNodes[1].childNodes[1].value = node.id;

      x.workflow.node.resetNodeId(index, node.id);

      // 编号
      node.childNodes[0].innerHTML = (index > 9 ? '' : '0') + index;

      // 设置权限
      if(i === 0)
      {
        // 开始节点
        node.childNodes[1].childNodes[23].value = '0';

        if($(document.getElementById('workflow-administrator')).val() === '1')
        {
          node.childNodes[6].innerHTML = '<a href="javascript:x.workflow.node.edit(' + index + ')" title="编辑"><i class="fa fa-edit"></i></a>';
        }
        else
        {
          node.childNodes[6].innerHTML = '<span class="gray-text" title="编辑" ><i class="fa fa-edit"></i></span>';
        }
        node.childNodes[7].innerHTML = '<span class="gray-text" title="上移" ><i class="fa fa-arrow-up"></i></span>';
        node.childNodes[8].innerHTML = '<span class="gray-text" title="下移" ><i class="fa fa-arrow-down"></i></span>';
        node.childNodes[9].innerHTML = '<span class="gray-text" title="删除" ><i class="fa fa-times"></i></span>';
      }
      else if(($('#workflow-administrator').val() !== '1') && $('#workflow-editableTemplate').val() === '0')
      {
        // 禁止编辑模板
        node.childNodes[6].innerHTML = '<span class="gray-text" title="编辑" ><i class="fa fa-edit"></i></span>';
        node.childNodes[7].innerHTML = '<span class="gray-text" title="上移" ><i class="fa fa-arrow-up"></i></span>';
        node.childNodes[8].innerHTML = '<span class="gray-text" title="下移" ><i class="fa fa-arrow-down"></i></span>';
        node.childNodes[9].innerHTML = '<span class="gray-text" title="删除" ><i class="fa fa-times"></i></span>';
      }
      else if(($(document.getElementById('workflow-administrator')).val() !== '1') && Number(node.childNodes[1].childNodes[18].value) > 0)
      {
        // [不允许编辑]已执行的节点
        node.childNodes[6].innerHTML = '<span class="gray-text" title="编辑" ><i class="fa fa-edit"></i></span>';
        node.childNodes[7].innerHTML = '<span class="gray-text" title="上移" ><i class="fa fa-arrow-up"></i></span>';
        node.childNodes[8].innerHTML = '<span class="gray-text" title="下移" ><i class="fa fa-arrow-down"></i></span>';
        node.childNodes[9].innerHTML = '<span class="gray-text" title="删除" ><i class="fa fa-times"></i></span>';
      }
      else
      {
        // 未执行的节点
        if(($(document.getElementById('workflow-administrator')).val() === '1') || node.childNodes[1].childNodes[23].value === '1')
        {
          node.childNodes[6].innerHTML = '<a href="javascript:x.workflow.node.edit(' + index + ')" title="编辑" ><i class="fa fa-edit"></i></a>';
        }
        else
        {
          node.childNodes[6].innerHTML = '<span class="gray-text" title="编辑" ><i class="fa fa-edit"></i></span>';
        }

        if(($(document.getElementById('workflow-administrator')).val() === '1') || node.childNodes[1].childNodes[24].value === '1')
        {
          node.childNodes[7].innerHTML = '<a href="javascript:x.workflow.node.move(' + index + ',\'up\')" title="上移" ><i class="fa fa-arrow-up"></i></a>';
          node.childNodes[8].innerHTML = '<a href="javascript:x.workflow.node.move(' + index + ',\'down\');" title="下移" ><i class="fa fa-arrow-down"></i></a>';
        }
        else
        {
          node.childNodes[7].innerHTML = '<span class="gray-text" title="上移" ><i class="fa fa-arrow-up"></i></span>';
          node.childNodes[8].innerHTML = '<span class="gray-text" title="下移" ><i class="fa fa-arrow-down"></i></span>';
        }

        if(($(document.getElementById('workflow-administrator')).val() === '1') || node.childNodes[1].childNodes[25].value === '1')
        {
          node.childNodes[9].innerHTML = '<a href="javascript:x.workflow.node.remove(' + index + ');" title="删除" ><i class="fa fa-times"></i></a>';
        }
        else
        {
          node.childNodes[9].innerHTML = '<span class="gray-text" title="删除" ><i class="fa fa-times"></i></span>';
        }
      }
    }

    for(var i = 0;i < nodes.length;i++)
    {
      var node = nodes[i];

      var index = i + 1;

      // 下一步骤
      if(i < nodes.length - 1)
      {
        node.childNodes[3].className = 'vertical-middle';
        node.childNodes[3].innerHTML = '→' + ((index + 1) > 9 ? '' : '0') + (index + 1);

        var exitObjects = node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1];

        if(!(exitObjects.value === '' || exitObjects.value === '[]'))
        {
          var exits = x.toJSON(exitObjects.value);
          var toNodeNames = '';

          x.each(exits, function(exitIndex, exit)
          {
            nodes.each(function(toNodeIndex, toNode)
            {
              if(exit.toNodeId == toNode.childNodes[1].childNodes[1].value)
              {
                toNodeNames += '→' + ((toNodeIndex + 1) > 9 ? '' : '0') + (toNodeIndex + 1) + ' ';
              }
            });
          });

          node.childNodes[3].innerHTML = toNodeNames;
        }
      }

      // 设置最后个节点
      if(i == nodes.length - 1)
      {
        node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1].value = '[]';
        node.childNodes[3].innerHTML = '';
      }
    }
  },
  /*#endregion*/

  /*#region 函数:edit(index)*/
  /**
  * 编辑当前节点
  *
  * index : 节点序号
  */
  edit: function(index)
  {
    x.workflow.node.currentIndex = index;

    var settings = x.workflow.settings;

    var node = x.workflow.node.getNodeObject(index);

    var outString = '';

    outString += '<div id="workflow-node-name-' + node.id + '" class="winodw-wizard-wrapper" style="width:720px; height:auto;" >';

    outString += '<div class="winodw-wizard-toolbar" >';
    outString += '<div class="winodw-wizard-toolbar-close">';
    outString += '<a href="javascript:x.workflow.node.maskWrapper.close();" title="关闭" ><i class="fa fa-close"></i></a>';
    outString += '</div>';
    outString += '<div class="float-left">';
    outString += '<div class="winodw-wizard-toolbar-item"><span>编辑节点</span></div>';
    outString += '<div class="clear"></div>';
    outString += '</div>';
    outString += '<div class="clear"></div>';
    outString += '</div>';

    outString += '<div class="x-ui-pkg-tabs-wrapper" style="height: 360px;">';
    outString += '<div id="workflow-node-tabs-menu-wrapper" class="x-ui-pkg-tabs-menu-wrapper" >';
    outString += '<ul class="x-ui-pkg-tabs-menu nav nav-tabs" >';
    outString += '<li><a href="#workflow-node-tab-1">基本属性</a></li>';
    outString += '<li><a href="#workflow-node-tab-2">高级属性</a></li>';
    outString += '<li><a href="#workflow-node-tab-3">分支设置</a></li>';
    outString += '<li><a href="#workflow-node-tab-4">跳转设置</a></li>';
    outString += '<li><a href="#workflow-node-tab-5">转交设置</a></li>';
    outString += '<li><a href="#workflow-node-tab-6">策略设置</a></li>';
    outString += '</ul>';
    outString += '</div>';

    outString += '<div class="x-ui-pkg-tabs-container" >';
    outString += '<h2 class="x-ui-pkg-tabs-container-head-hidden"><a id="workflow-node-tab-1" name="workflow-node-tab-1" >基本属性</a></h2>';
    outString += '<table style="width:100%;">';
    outString += '<tr>';
    outString += '<td class="table-body-text" style="width:120px;">节点名称</td>';
    outString += '<td colspan="3" class="table-body-input">';

    outString += '<input id="workflow-node-id" name="workflow-node-id" type="hidden" value="' + ((typeof (node.id) === 'undefined') ? '' : node.id) + '" />';
    outString += '<input id="workflow-node-policy" name="workflow-node-policy" type="hidden" value="' + ((typeof (node.id) === 'undefined') ? '' : node.policy) + '" />';
    outString += '<input id="workflow-node-backNodes" name="workflow-node-backNodes" type="hidden" value="' + ((typeof (node.backNodes) === 'undefined') ? '' : node.backNodes) + '" />';
    outString += '<input id="workflow-node-forwardNodes" name="workflow-node-forwardNodes" type="hidden" value="' + ((typeof (node.forwardNodes) === 'undefined') ? '' : node.forwardNodes) + '" />';
    outString += '<input id="workflow-node-commissionActors" name="workflow-node-commissionActors" type="hidden" value="' + ((typeof (node.commissionActors) === 'undefined') ? '' : node.commissionActors) + '" />';
    outString += '<input id="workflow-node-name" name="workflow-node-name" type="text" class="form-control" style="width:200px;" value="' + ((typeof (node.name) === 'undefined') ? '' : node.name) + '" />';
    outString += '</td>';
    outString += '</tr>';

    outString += '<tr>';
    outString += '<td class="table-body-text" >节点权限</td>';
    outString += '<td colspan="3" class="table-body-input">';
    outString += '<input id="workflow-node-canEdit" name="workflow-node-canEdit" type="checkbox" ' + ((typeof (node.canEdit) !== 'undefined' && node.canEdit === '1') ? 'checked="checked"' : '') + ' /> 编辑 ';
    outString += '<input id="workflow-node-canMove" name="workflow-node-canMove" type="checkbox" ' + ((typeof (node.canMove) !== 'undefined' && node.canMove === '1') ? 'checked="checked"' : '') + ' /> 移动 ';
    outString += '<input id="workflow-node-canDelete" name="workflow-node-canDelete" type="checkbox" ' + ((typeof (node.canDelete) !== 'undefined' && node.canDelete === '1') ? 'checked="checked"' : '') + ' /> 删除 ';
    outString += '<input id="workflow-node-canUploadFile" name="workflow-node-canUploadFile" type="checkbox" ' + ((typeof (node.canUploadFile) !== 'undefined' && node.canUploadFile === '1') ? 'checked="checked"' : '') + ' /> 上传附件 ';
    outString += '<input id="workflow-node-filterActors" name="workflow-node-filterActors" type="checkbox" ' + ((typeof (node.filterActors) !== 'undefined' && node.filterActors === '1') ? 'checked="checked"' : '') + ' /> 过滤已执行用户 ';
    outString += '</td>';
    outString += '</tr>';

    outString += '<tr>';
    outString += '<td class="table-body-text">节点执行人</td>';
    outString += '<td colspan="3" class="table-body-input">';
    outString += '<textarea id="workflow-node-actorDescription" name="workflow-node-actorDescription" class="textarea-normal" style="width:520px;cursor:default;" >' + x.isUndefined(node.actorDescription, '') + '</textarea><br />';
    outString += '<input id="workflow-node-actorScope" name="workflow-node-actorScope" type="hidden" value="' + x.isUndefined(node.actorScope, '') + '" />';
    outString += '<input id="node-actorCounter" name="node-actorCounter" type="hidden" value="' + x.isUndefined(node.actorCounter, '') + '" />';
    outString += '<div class="text-right" style="width:520px;" > ';
    outString += '<a href="javascript:x.workflow.node.showActorWizard();" >编辑</a>';
    outString += '</div> ';
    outString += '</td>';
    outString += '</tr>';

    outString += '<tr>';
    outString += '<td class="table-body-text">备注</td>';
    outString += '<td colspan="3" class="table-body-input">';
    outString += '<textarea id="workflow-node-remark" name="workflow-node-remark" type="text" class="textarea-normal" style="width:520px; height:40px;" >' + (x.isUndefined(node.remark) ? '' : x.encoding.html.encode(node.remark)) + '</textarea>';
    outString += '</tr>';

    outString += '<tr>';
    outString += '<td class="table-body-text">执行方式</td>';
    outString += '<td class="table-body-input">';
    outString += '<input id="workflow-node-actorMethod" name="workflow-node-actorMethod" x-dom-feature="combobox" x-dom-combobox-data="' + ((document.getElementById('workflow-nodeActorMethods') === null) ? settings.workflowNodeActorMethods : $('#workflow-nodeActorMethods').val()) + '" x-dom-topOffset="-1" selectedText="' + ((typeof (node.actorMethod) === 'undefined') ? '审核' : node.actorMethod) + '" value="' + ((typeof (node.actorMethod) === 'undefined') ? '并审' : node.actorMethod) + '" class="form-control" style="width:180px" />';
    outString += '</td>';
    outString += '<td class="table-body-text" style="width:120px;" >处理时限(小时)</td>';
    outString += '<td class="table-body-input"><input id="workflow-node-timelimit" name="workflow-node-timelimit" x-dom-feature="number" type="text" class="form-control" style="width:120px;" value="' + ((typeof (node.timelimit) === 'undefined') ? '24' : node.timelimit) + '" /></td>';
    outString += '</tr>';

    outString += '<tr >';
    outString += '<td class="table-body-text" style="width:120px;" >提醒方式</td>';
    outString += '<td colspan="3" class="table-body-input">';
    outString += '<div class="vertical-middle" >';
    outString += '<input id="workflow-node-sendAlertTask1" name="workflow-node-sendAlertTask1" type="checkbox" checked="checked" disabled="disabled" /> 待办事宜 ';
    // outString += '<input id="workflow-node-sendAlertTask1" name="workflow-node-sendAlertTask" type="checkbox" checked="checked" disabled="disabled" /> 待办事宜';
    if(typeof (node.sendAlertTask) !== 'undefined' && (node.sendAlertTask === '2' || node.sendAlertTask === '3' || node.sendAlertTask === '7'))
    {
      outString += '<input id="workflow-node-sendAlertTask2" name="workflow-node-sendAlertTask" type="checkbox" checked="checked" /> 邮件 ';
    }
    else
    {
      outString += '<input id="workflow-node-sendAlertTask2" name="workflow-node-sendAlertTask" type="checkbox" /> 邮件 ';
    }
    if(typeof (node.sendAlertTask) !== 'undefined' && (node.sendAlertTask === '4' || node.sendAlertTask === '5' || node.sendAlertTask === '7'))
    {
      outString += '<input id="workflow-node-sendAlertTask4" name="workflow-node-sendAlertTask" type="checkbox" checked="checked" /> 短信 ';
    }
    else
    {
      outString += '<input id="workflow-node-sendAlertTask4" name="workflow-node-sendAlertTask" type="checkbox" /> 短信 ';
    }
    outString += '</div>';
    outString += '</td>';
    outString += '</tr>';

    outString += '</table>';
    outString += '</div>';

    outString += '<div class="x-ui-pkg-tabs-container" >';
    outString += '<h2 class="x-ui-pkg-tabs-container-head-hidden"><a id="workflow-node-tab-2" name="workflow-node-tab-2">高级属性</a></h2>';

    outString += '<table style="width:100%;">';
    outString += '<tr >';
    outString += '<td class="table-body-text" style="width:120px" >编辑界面</td>';
    outString += '<td class="table-body-input"><input id="workflow-node-editor" name="workflow-node-editor" type="text" class="form-control" style="width:95%;" value="' + ((typeof (node.editor) === 'undefined') ? '' : node.editor) + '" /></td>';
    outString += '</tr>';

    outString += '<tr >';
    outString += '<td class="table-body-text">处理器</td>';
    outString += '<td class="table-body-input"><input id="workflow-node-handler" name="workflow-node-handler" type="text" class="form-control" style="width:95%;" value="' + ((typeof (node.handler) === 'undefined') ? '' : node.handler) + '" /></td>';
    outString += '</tr>';

    outString += '<tr >';
    outString += '<td class="table-body-text" >自定义待办提醒</td>';
    outString += '<td class="table-body-input vertical-middle">';
    outString += '<input id="workflow-node-policy-settings-sendAlertTaskFormat" name="workflow-node-settings$sendAlertTaskFormat" type="text" value="' + ((typeof (node.policy.setting.sendAlertTaskFormat) === 'undefined') ? '' : node.policy.setting.sendAlertTaskFormat) + '" class="form-control" style="width:360px" />';
    outString += '</td>';
    outString += '</tr>';

    outString += '<tr >';
    outString += '<td class="table-body-text" style="width:120px" >评分功能</td>';
    outString += '<td class="table-body-input vertical-middle">';
    outString += '<input id="workflow-node-policy-settings-canRating" name="workflow-node-settings$canRating" type="checkbox" value="' + ((typeof (node.policy.setting.canRating) === 'undefined') ? '' : node.policy.setting.canRating) + '" ' + (node.policy.setting.canRating === '1' ? 'checked="checked" ' : '') + ' /> 支持评分';
    outString += '</td>';
    outString += '</tr>';
    outString += '</table>';
    outString += '</div>';

    outString += '<div class="x-ui-pkg-tabs-container" >';
    outString += '<h2 class="x-ui-pkg-tabs-container-head-hidden"><a id="workflow-node-tab-3" name="workflow-node-tab-3">分支设置</a></h2>';

    outString += '<table style="width:100%;">';
    outString += '<tr >';
    outString += '<td class="table-body-text" style="width:120px" >默认下一步骤</td>';
    outString += '<td class="table-body-input"><span id="workflow-node-defaultSwitcherExit" name="workflow-node-workflow-node-defaultSwitcherExit" ></span></td>';
    outString += '</tr>';
    outString += '<tr >';
    outString += '<td class="table-body-text">发散分支</td>';
    outString += '<td class="table-body-input vertical-middle">';
    //  outString += '<input id="workflow-node-switcher-radiation" name="workflow-node-switcher-radiation" type="checkbox" value="' + ((typeof (node.switcher.radiation) === 'undefined') ? '' : node.switcher.radiation) + '" ' + (node.switcher.radiation === '1' ? 'checked="checked" ' : '') + ' /> ';
    outString += '<input id="workflow-node-switcher-radiation" name="workflow-node-switcher-radiation" type="checkbox" value="' + ((typeof (node.switcher.radiation) === 'undefined') ? '' : node.switcher.radiation) + '" ' + (node.switcher.radiation === '1' ? 'checked="checked" ' : '') + ' disabled="disabled" /> ';
    outString += '<span class="green-text" >允许工作流同时发散到所有分支</span>';
    outString += '</td>';
    outString += '</tr>';
    outString += '<tr >';
    outString += '<td class="table-body-text" style="width:120px" >分支出口条件</td>';
    outString += '<td class="table-body-input">';
    outString += '<div id="workflow-node-switcher-container" name="workflow-node-switcher-container" style="border:1px solid #ccc; width:460px; height:200px;" >';
    outString += '</div> ';
    outString += '</td>';
    outString += '</tr>';
    outString += '</table>';
    outString += '</div>';

    outString += '<div class="x-ui-pkg-tabs-container" >';
    outString += '<h2 class="x-ui-pkg-tabs-container-head-hidden"><a name="workflow-node-tab-4" id="workflow-node-tab-4">跳转设置</a></h2>';

    outString += '<table style="width:100%;">';
    outString += '<tr >';
    outString += '<td class="table-body-text" style="width:120px" >允许后退的节点</td>';
    outString += '<td class="table-body-input vertical-middle"><div id="workflow-node-backNodes-container" name="workflow-node-backNodes-container" style="border:1px solid #ccc; width:460px; height:80px; padding:4px;" ></div></td>';
    outString += '</tr>';
    outString += '<tr >';
    outString += '</tr>';
    outString += '<tr >';
    outString += '<td class="table-body-text">允许前进的节点</td>';
    outString += '<td class="table-body-input vertical-middle"><div id="workflow-node-forwardNodes-container" name="workflow-node-forwardNodes-container" style="border:1px solid #ccc; width:460px; height:80px; padding:4px;" ></div></td>';
    outString += '</tr>';

    outString += '</table>';
    outString += '</div>';

    outString += '<div class="x-ui-pkg-tabs-container" >';
    outString += '<h2 class="x-ui-pkg-tabs-container-head-hidden"><a name="workflow-node-tab-5" id="workflow-node-tab-5">转交设置</a></h2>';

    outString += '<table style="width:100%;">';
    outString += '<tr >';
    outString += '<td class="table-body-text" style="width:120px" >允许转交的人员</td>';
    outString += '<td class="table-body-input">';
    outString += '<textarea id="workflow-node-commissionActorDescription" name="workflow-node-commissionActorDescription" class="textarea-normal" style="width:460px;height:80px;cursor:default;" ></textarea><br />';
    outString += '<input id="workflow-node-commissionActors" name="workflow-node-commissionActors" type="hidden" value="' + ((typeof (node.commissionActors) === 'undefined') ? '' : node.commissionActors) + '" />';
    outString += '<div class="text-right" style="width:460px;" > ';
    outString += '<a href="javascript:x.ui.wizards.getContactsWizard({targetViewName:\'workflow-node-commissionActorDescription\',targetValueName:\'workflow-node-commissionActors\', contactTypeText:\'account\'});" >编辑</a>';
    outString += '</div> ';
    outString += '</td>';
    outString += '</tr>';
    outString += '<tr >';
    outString += '<td class="table-body-text">允许任意转交</td>';
    outString += '<td class="table-body-input vertical-middle">';
    outString += '<input id="workflow-node-node-canCommissionEveryone" name="workflow-node-node-canCommissionEveryone" type="checkbox" ' + ((node.commissionActors === 'role#00000000-0000-0000-0000-000000000000#任意用户') ? 'checked="checked"' : '') + '/> ';
    outString += '<span class="green-text" >允许转交给任意用户审批</span>';
    outString += '</td>';
    outString += '</tr>';
    outString += '</table>';
    outString += '</div>';

    outString += '<div class="x-ui-pkg-tabs-container" >';
    outString += '<h2 class="x-ui-pkg-tabs-container-head-hidden"><a name="workflow-node-tab-6" id="workflow-node-tab-6">业务策略</a></h2>';

    var template = x.workflow.template.getTemplateObject();

    if(template.entityMetaData === '')
    {
      outString += '<div style="color:#a15300; background-color:#fcffca; padding: 0 0 0 10px;  border-bottom:1px solid #c75400; line-height:200%; font-size:12px;" >';
      outString += '(*)未设置流程的业务对象属性。';
      outString += '</div>';
    }
    else
    {
      var metaData = template.entityMetaData.split(',');

      outString += '<div id="workflow-node-policy-container" name="workflow-node-policy-container" style="height:200px;" >';
      outString += '<table class="table-style" style="width:100%;" >';
      outString += '<tr class="table-row-title">';
      outString += '<td>字段</td>';
      outString += '<td style="width:60px;">编辑</td>';
      outString += '<td style="width:60px;">痕迹</td>';
      outString += '<td style="width:60px;">隐藏</td>';
      outString += '</tr>';

      for(var i = 0;i < metaData.length;i++)
      {
        outString += '<tr class="table-row-normal workflow-node-policy-entity-metaData" >';
        outString += '<td>' + metaData[i] + '</td>';
        outString += '<td><input id="workflow-node-entity-' + metaData[i] + '$canEdit" type="checkbox" /></td>';
        outString += '<td><input id="workflow-node-entity-' + metaData[i] + '$canTrace"  type="checkbox" /></td>';
        outString += '<td><input id="workflow-node-entity-' + metaData[i] + '$canHide"  type="checkbox" /></td>';
        outString += '</tr>';
      }

      outString += '</table>';
      outString += '</div>';
    }

    outString += '</div>';

    outString += '</div>';

    outString += '<div style="border-top:1px solid #ccc;padding:10px 20px 10px 0;" >';
    outString += '<div class="float-right button-2font-wrapper" ><a id="btnCancel" href="javascript:void(0);" class="btn btn-default" >取消</a></div> ';
    outString += '<div class="float-right button-2font-wrapper" style="margin-right:10px;" ><a id="btnOkey" href="javascript:void(0);" class="btn btn-default" >保存</a></div> ';
    outString += '<div class="clear"></div>';
    outString += '</div>';

    outString += '</div>';

    // 加载遮罩和页面内容
    x.ui.mask.getWindow({ content: outString }, x.workflow.node.maskWrapper);

    $('#workflow-node-actorDescription').on('focus', function()
    {
      this.blur();
    });

    x.workflow.node.html = outString;

    // 设置分支条件
    x.workflow.node.setSwitcherExit(index, node.switcher.exits);

    // 设置跳转信息
    x.workflow.node.setGotoNodeView(index, 'back', node.backNodes);

    x.workflow.node.setGotoNodeView(index, 'forward', node.forwardNodes);

    // 设置转交人描述信息
    x.ui.wizards.setContactsView('workflow-node-commissionActorDescription', node.commissionActors);

    // 设置业务策略
    $(node.policy.entities).each(function(index, entity)
    {
      if($('#workflow-node-entity-' + entity.metaData + '-canEdit').size() > 0)
      {
        $('#workflow-node-entity-' + entity.metaData + '-canEdit')[0].checked = (entity.canEdit === '1' ? true : false);
        $('#workflow-node-entity-' + entity.metaData + '-canTrace')[0].checked = (entity.canTrace === '1' ? true : false);
        $('#workflow-node-entity-' + entity.metaData + '-canHide')[0].checked = (entity.canHide === '1' ? true : false);
      }
    });

    $(document.getElementById('workflow-node-node-canCommissionEveryone')).bind('click', function()
    {
      if(document.getElementById('workflow-node-node-canCommissionEveryone').checked)
      {
        document.getElementById('workflow-node-commissionActors').value = 'role#00000000-0000-0000-0000-000000000000#任意用户';
        document.getElementById('workflow-node-commissionActorDescription').value = '任意用户';
      }
      else
      {
        document.getElementById('workflow-node-commissionActors').value = '';
        document.getElementById('workflow-node-commissionActorDescription').value = '';
      }
    });

    $('#btnOkey').bind('click', function()
    {
      var node = x.workflow.node.getEditNodeObject();

      if(typeof (node) !== 'undefined')
      {
        x.workflow.node.setNodeObject(node);

        $(document.getElementById('workflow-node-actorCounter')).val(node.actorCounter);

        x.workflow.node.maskWrapper.close();

        x.workflow.node.getExpectedActors(node.id);
      }
    });

    $('#btnCancel').bind('click', function()
    {
      x.workflow.node.maskWrapper.close();
    });

    x.page.goTop();

    x.dom.features.bind();

    x.ui.pkg.tabs.newTabs();
  },
  /*#endregion*/

  /*#region 函数:move(index, direction)*/
  /**
  * 移动节点
  * index : 节点序号
  * direction : 'up' | 'down'
  */
  move: function(index, direction)
  {
    index = index - 1;

    var fromRow = $('#nn_' + index)[0];

    var toRow;

    // 最后节点的处理
    if(typeof (fromRow) === 'undefined')
    {
      fromRow = $('#en_' + index)[0];

      if(typeof (fromRow) === 'undefined')
      {
        return;
      }
      else if(direction === 'down')
      {
        alert('节点【' + fromRow.childNodes[1].childNodes[2].value + '】为结束节点，禁止向下移动。');
        return;
      }
    }

    var html = '<tr class="' + fromRow.className + '" style="' + fromRow.style.cssText + '">' + fromRow.innerHTML + '</tr>';

    if(direction === 'up')
    {
      toRow = $('#sn_' + (index - 1))[0];

      if(typeof (toRow) !== 'undefined')
      {
        alert('节点【' + toRow.childNodes[1].childNodes[2].value + '】为开始节点，禁止移动。');
        return;
      }

      toRow = $('#nn_' + (index - 1))[0];

      if(typeof (toRow) !== 'undefined')
      {
        //目标节点 禁止移动
        /*if(($(document.getElementById('workflow-administrator')).val() !== '1') && Number(toRow.childNodes[1].childNodes[24].value) === 0)
        {
        return;
        }*/

        if(Number(toRow.childNodes[1].childNodes[18].value) === 0)
        {
          html = '<tr class="' + toRow.className + '" style="' + toRow.style.cssText + '">' + fromRow.innerHTML + '</tr>';

          $(toRow).before(html);

          $(toRow)[0].className = $(fromRow)[0].className;

          $(fromRow).remove();
        }
        else
        {
          alert('节点【' + toRow.childNodes[1].childNodes[2].value + '】已执行完成，禁止移动。');
        }
      }
    }
    else if(direction === 'down')
    {
      toRow = $('#nn_' + (index + 1))[0];

      if(typeof (toRow) === 'undefined')
      {
        toRow = $('#en_' + (index + 1))[0];
      }

      if(typeof (fromRow) === 'undefined' || typeof (toRow) === 'undefined')
      {
        return;
      }

      // 目标行
      if(toRow)
      {
        /*if(($(document.getElementById('workflow-administrator')).val() !== '1') && Number(toRow.childNodes[1].childNodes[24].value) === 0)
        {
        return;
        }*/

        if(Number(toRow.childNodes[1].childNodes[18].value) === 0)
        {
          html = '<tr class="' + toRow.className + '" style="' + toRow.style.cssText + '">' + fromRow.innerHTML + '</tr>';

          $(toRow).after(html);

          $(toRow)[0].className = $(fromRow)[0].className;

          $(fromRow).remove();
        }
        else
        {
          alert('节点【' + toRow.childNodes[1].childNodes[2].value + '】已执行完成，禁止移动。');
        }
      }
    }

    x.workflow.node.sync();
  },
  /*#endregion*/

  /*#region 函数:remove(index)*/
  /**
  * 移除当前节点
  * index : 节点序号
  */
  remove: function(index)
  {
    // -------------------------------------------------------
    // 节点前缀说明
    // sn_ : 开始节点
    // nn_ : 普通节点
    // en_ : 结束节点
    // -------------------------------------------------------

    var settings = x.workflow.settings;

    var target = $('#nn_' + (index - 1))[0];

    target = (target) ? target : $('#en_' + (index - 1))[0];

    if(target)
    {
      var targetNodeId = target.childNodes[1].childNodes[1].value;

      var nodeIndex = x.workflow.node.nodeIndex(targetNodeId);

      x.workflow.node.currentIndex = 0;

      // 移除元素
      $(target).remove();

      // 移除分支条件中相关的节点信息
      var nodes = $(settings.workflowNodeSelector);

      for(var i = 0;i < nodes.length;i++)
      {
        var text = nodes[i].childNodes[1].childNodes[nodes[i].childNodes[1].childNodes.length - 1].value;

        if(text !== '')
        {
          var list = x.toJSON(text);

          text = '[';

          for(var j = 0;j < list.length;j++)
          {
            if(list[j].toNodeId !== targetNodeId)
            {
              var toNodeIndex = x.workflow.node.nodeIndex(list[j].toNodeId);

              text += '{';

              // 被删除节点之前的节点Id不变
              if(nodeIndex > toNodeIndex)
              {
                text += '"toNodeId": "' + list[j].toNodeId + '",';
              }
              else
              {
                text += '"toNodeId": "' + list[j].toNodeId.replace(('_' + toNodeIndex), '_' + (toNodeIndex - 1)) + '",';
              }
              text += '"friendlyCondition": "' + list[j].friendlyCondition + '",';
              text += '"condition":' + x.workflow.switcherExit.toSwitcherExitConditionText(list[j]);
              text += '},';
            }
          }

          text = x.string.rtrim(text, ',');

          text += ']';

          nodes[i].childNodes[1].childNodes[nodes[i].childNodes[1].childNodes.length - 1].value = text;
        }
      }
    }

    x.workflow.node.sync();
  },
  /*#endregion*/

  /*#region 函数:setSwitcherExit(index)*/
  /**
  * index
  */
  setSwitcherExit: function(index, exits)
  {
    var outString = '';

    var nodes = $(x.workflow.settings.workflowNodeSelector);

    // 设置默认出口
    if(typeof (nodes[index]) !== 'undefined')
    {
      var text = '<span class="blod-text" >' + nodes[index].childNodes[1].childNodes[2].value + '</span> ';

      $(document.getElementById('workflow-node-defaultSwitcherExit')).html(text);
    }

    // 设置出口条件
    outString += '<table class="table-style" style="width:100%;" >';
    outString += '<tr class="table-row-title" >';
    outString += '<td style="width:80px;">出口名称</td>';
    outString += '<td >出口条件</td>';
    outString += '<td style="width:60px;">编辑</td>';
    outString += '<td style="width:60px;">启用</td>';
    outString += '</tr>';

    for(var i = 0;i < nodes.length;i++)
    {
      if(i > (index - 1))
      {
        var target = null;

        x.each(exits, function(exitIndex, exit)
        {
          if(nodes[i].childNodes[1].childNodes[1].value == exit.toNodeId)
          {
            target = exit;
          }
        });
        // nodes[i].childNodes[1].childNodes[1].value
        outString += '<tr class="table-row-normal" >';

        if(i == index)
        {
          outString += '<td>';
          outString += '<span>' + nodes[i].childNodes[1].childNodes[2].value + '</span>';
          outString += '<input id="workflow-node-switcher-exit' + (i + 1) + '-toNodeId" type="hidden" value="' + nodes[i].childNodes[1].childNodes[1].value + '" />';
          outString += '<input id="workflow-node-switcher-exit' + (i + 1) + '-condition" type="hidden" value="" />';
          outString += '<input id="workflow-node-switcher-exit' + (i + 1) + '-friendlyCondition" type="hidden" value="" />';
          outString += '</td>';
          outString += '<td></td>';
          outString += '<td><span class="gray-text">编辑</span></td>';
          outString += '<td>';
          outString += '<span class="green-text">默认</span>';
          outString += '<div class="hidden" ><input id="workflow-node-switcher-exit' + (i + 1) + '" name="workflow-node-switcher-exit" type="checkbox" value="' + (i + 1) + '" checked="checked" /></div>';
          outString += '</td>';
        }
        else
        {
          outString += '<td>';
          outString += '<span>' + nodes[i].childNodes[1].childNodes[2].value + '</span>';
          outString += '<input id="workflow-node-switcher-exit' + (i + 1) + '-toNodeId" type="hidden" value="' + nodes[i].childNodes[1].childNodes[1].value + '" />';
          outString += '<input id="workflow-node-switcher-exit' + (i + 1) + '-condition" type="hidden" value="' + (target === null ? '[]' : x.encoding.html.encode(x.workflow.switcherExit.toSwitcherExitConditionText(target))) + '" />';
          // outString += '<input id="workflow-node-switcher-exit' + (i + 1) + '-condition" type="hidden" value="' + x.encoding.html.encode('"}]') + '" />';
          // x.debug.log(target.friendlyCondition);

          outString += '<input id="workflow-node-switcher-exit' + (i + 1) + '-friendlyCondition" type="hidden" value="' + (target === null ? '' : target.friendlyCondition) + '" />';
          outString += '</td>';
          outString += '<td><span id="workflow-node-switcher-exit' + (i + 1) + '-friendlyConditionText" >' + (target === null ? '' : target.friendlyCondition) + '</span></td>';
          outString += '<td><a href="javascript:x.workflow.switcherExit.edit(' + (i + 1) + ');" >编辑</a></td>';
          outString += '<td><input id="workflow-node-switcher-exit' + (i + 1) + '" name="workflow-node-switcher-exit" disabled="disabled" type="checkbox" value="' + (i + 1) + '" ' + (target === null ? '' : 'checked="checked" ') + '/></td>';
        }
        outString += '</tr>';
      }
    }
    outString += '</table>';

    $('#workflow-node-switcher-container').html(outString);
  },
  /*#endregion*/

  /*#region 函数:setGotoNodeView(direction, selectedNodes)*/
  /**
  * direction 移除当前节点
  * selectedNodes : 选择的节点信息
  */
  setGotoNodeView: function(index, direction, selectedNodes)
  {
    var outString = '';

    var nodes = $(x.workflow.settings.workflowNodeSelector);

    for(var i = 0;i < nodes.length;i++)
    {
      if((direction === 'back' && i < (index - 1)) || (direction === 'forward' && i > (index - 1)))
      {
        outString += '<input id="workflow-node-' + direction + 'Nodes-' + index + '" '
                + 'name="workflow-node-' + direction + 'Nodes" '
                + 'type="checkbox" '
                + 'value="' + nodes[i].childNodes[1].childNodes[2].value + '" '
                + (selectedNodes.indexOf(nodes[i].childNodes[1].childNodes[2].value) == -1 ? '' : 'checked="checked" ') + ' > '
                + '<span>' + nodes[i].childNodes[1].childNodes[2].value + '</span> ';
      }
    }

    $('#workflow-node-' + direction + 'Nodes-container').html(outString);
  },
  /*#endregion*/

  /*#region 函数:getEditNodeObject()*/
  /**
  * 获取当前编辑节点
  */
  getEditNodeObject: function()
  {
    var nodeId = $(document.getElementById('workflow-node-id')).val();

    var nodeName = $(document.getElementById('workflow-node-name')).val();

    if(nodeName === '')
    {
      alert('【节点名称】不能为空。');
      return;
    }

    var nodes = $(x.workflow.settings.workflowNodeSelector);

    for(i = 0;i < nodes.length;i++)
    {
      if(nodes[i].childNodes[1].childNodes[1].value !== nodeId && nodes[i].childNodes[1].childNodes[2].value === nodeName)
      {
        alert('节点名称【' + nodeName + '】已存在。');
        return;
      }
    }

    // 设置工作流执行方式
    var actorMethod = $(document.getElementById('workflow-node-actorMethod')).val();

    var actorCounter = 0;

    if(actorMethod === "会审" || actorMethod === "会签" || actorMethod === "审核" || actorMethod === "审批" || actorMethod === "批准")
    {
      actorCounter = 0;
    }
    else if(actorMethod === "并审" || actorMethod === "校稿")
    {
      actorCounter = 1;
    }
    else if(actorMethod === "抄送" || actorMethod === "传阅")
    {
      actorCounter = -1;
    }
    else
    {
      //传阅 自动跳过
      actorCounter = -1;
    }

    // 设置工作流通知方式
    var sendAlertTask = 0;

    // 通知方式: 1 待办事宜 2 邮件 4 短信
    var sendAlertTaskTypes = [1, 2, 4];

    for(var i = 0;i < sendAlertTaskTypes.length;i++)
    {
      var sendAlertTaskObejct = $(document.getElementById('workflow-node-sendAlertTask' + sendAlertTaskTypes[i]));

      if(typeof (sendAlertTaskObejct[0]) !== 'undefined' && sendAlertTaskObejct[0].checked)
      {
        sendAlertTask = sendAlertTask + sendAlertTaskTypes[i];
      }
    }

    // 设置节点策略
    var policy = '{';
    policy += '"setting":{';
    policy += '"sendAlertTaskFormat":"' + $('#workflow-node-policy-settings-sendAlertTaskFormat').val() + '",';
    policy += '"canRating":"' + ($('#workflow-node-policy-settings-canRating')[0].checked ? 1 : 0) + '"},';
    policy += '"entities":[';

    var metaData = $('.workflow-node-policy-entity-metaData');

    for(var i = 0;i < metaData.size() ;i++)
    {
      var metaDataName = metaData[i].childNodes[0].innerHTML;

      policy += '{';
      policy += '"metaData":"' + metaDataName + '",';
      policy += '"canEdit":"' + ($('#workflow-node-entity-' + metaDataName + '-canEdit')[0].checked ? 1 : 0) + '",';
      policy += '"canTrace":"' + ($('#workflow-node-entity-' + metaDataName + '-canTrace')[0].checked ? 1 : 0) + '",';
      policy += '"canHide":"' + ($('#workflow-node-entity-' + metaDataName + '-canHide')[0].checked ? 1 : 0) + '"';
      policy += '}' + ((i + 1) == metaData.size() ? '' : ',');
    }

    policy += ']';
    policy += '}';

    // 
    // workflow-node-policy-entity-item
    // workflow-node-policy-settings-sendAlertTaskFormat
    // workflow-node-policy-settings-canRating
    // workflow-node-policy-entity
    // 设置节点分支出口
    var exits = '[';

    var exitObjects = document.getElementsByName('workflow-node-switcher-exit');

    for(var i = 0;i < exitObjects.length;i++)
    {
      if(document.getElementById('workflow-node-switcher-exit' + exitObjects[i].value + '-condition').value === '')
      {
        document.getElementById('workflow-node-switcher-exit' + exitObjects[i].value + '-condition').value = '[]';
      }

      if(exitObjects[i].checked)
      {
        exits += '{';
        exits += '"toNodeId":"' + document.getElementById('workflow-node-switcher-exit' + exitObjects[i].value + '-toNodeId').value + '", ';
        exits += '"condition":' + document.getElementById('workflow-node-switcher-exit' + exitObjects[i].value + '-condition').value + ', ';
        exits += '"friendlyCondition":"' + document.getElementById('workflow-node-switcher-exit' + exitObjects[i].value + '-friendlyCondition').value + '" ';
        exits += '},';
      }
    }

    if(exits.substr(exits.length - 1, 1) === ',')
    {
      exits = exits.substr(0, exits.length - 1);
    }

    exits += ']';

    // -------------------------------------------------------
    // 输出结果
    // -------------------------------------------------------

    var outString = '';

    outString += '{';
    outString += '"id":"' + $('#workflow-node-id').val() + '", ';
    outString += '"name":"' + $(document.getElementById('workflow-node-name')).val() + '", ';
    outString += '"actorScope":"' + $(document.getElementById('workflow-node-actorScope')).val() + '", ';
    outString += '"actorDescription":"' + $(document.getElementById('workflow-node-actorDescription')).val() + '", ';
    outString += '"actorCounter":"' + actorCounter + '", ';
    outString += '"actorMethod":"' + $(document.getElementById('workflow-node-actorMethod')).val() + '", ';
    outString += '"handler":"' + $(document.getElementById('workflow-node-handler')).val() + '", ';
    outString += '"editor":"' + $(document.getElementById('workflow-node-editor')).val() + '", ';
    outString += '"backNodes":"' + x.dom.util.checkbox.getValue('workflow-node-backNodes') + '", ';
    outString += '"forwardNodes":"' + x.dom.util.checkbox.getValue('workflow-node-forwardNodes') + '", ';
    outString += '"commissionActors":"' + $(document.getElementById('workflow-node-commissionActors')).val() + '", ';
    outString += '"timelimit":"' + $(document.getElementById('workflow-node-timelimit')).val() + '", ';
    outString += '"filterActors":"' + ($(document.getElementById('workflow-node-filterActors'))[0].checked ? '1' : '0') + '", ';
    outString += '"sendAlertTask":"' + sendAlertTask + '", ';
    outString += '"policy":' + policy + ', ';
    outString += '"remark":"' + x.encoding.html.encode($('#workflow-node-remark').val()) + '", ';
    outString += '"canEdit":"' + ($(document.getElementById('workflow-node-canEdit'))[0].checked ? '1' : '0') + '", ';
    outString += '"canMove":"' + ($(document.getElementById('workflow-node-canMove'))[0].checked ? '1' : '0') + '", ';
    outString += '"canDelete":"' + ($(document.getElementById('workflow-node-canDelete'))[0].checked ? '1' : '0') + '", ';
    outString += '"canUploadFile":"' + ($(document.getElementById('workflow-node-canUploadFile'))[0].checked ? '1' : '0') + '", ';
    outString += '"switcher":{';
    outString += '"radiation":"' + ($(document.getElementById('workflow-node-switcher-radiation'))[0].checked ? '1' : '0') + '",';
    outString += '"exits":' + exits + '}';
    outString += '}';

    // x.debug.log(outString);

    return x.toJSON(outString);
  },
  /*#endregion*/

  /*#region 函数:getNodeObject(index)*/
  /**
  * 获取当前节点信息.
  *
  * index : 节点标识
  */
  getNodeObject: function(index)
  {
    var nodeIndex = (typeof (index) === 'undefined') ? x.workflow.node.currentIndex : index;

    var nodes = $(x.workflow.settings.workflowNodeSelector);

    var row = nodes[(Number(nodeIndex) - 1)];

    var actorScope = row.childNodes[1].childNodes[4].value === '' ? 'initiator' : row.childNodes[1].childNodes[4].value;
    var actorDescription = row.childNodes[1].childNodes[5].value === '' ? '流程发起人' : row.childNodes[1].childNodes[5].value;
    var actorCounter = row.childNodes[1].childNodes[6].value === '' ? '1' : row.childNodes[1].childNodes[6].value;
    var actorMethod = row.childNodes[1].childNodes[7].value === '' ? '会审' : row.childNodes[1].childNodes[7].value;

    var editor = row.childNodes[1].childNodes[8].value === '' ? '/workflowplus/console/workflow_running.aspx' : row.childNodes[1].childNodes[8].value;
    var handler = row.childNodes[1].childNodes[9].value === '' ? 'X3Platform.WorkflowPlus.Business.General.Transact' : row.childNodes[1].childNodes[9].value;

    // 设置节点默认策略
    if(row.childNodes[1].childNodes[16].value === ''
        || row.childNodes[1].childNodes[16].value === '####'
        || row.childNodes[1].childNodes[16].value === '1')
    {
      row.childNodes[1].childNodes[16].value = x.workflow.node.defaultPolicySetting;
    }

    // -------------------------------------------------------
    // 输出结果
    // -------------------------------------------------------

    var outString = '';

    outString += '{';
    outString += '"id":"' + row.childNodes[1].childNodes[1].value + '", ';
    outString += '"name":"' + row.childNodes[1].childNodes[2].value + '", ';
    outString += '"editor":"' + editor + '", ';
    outString += '"handler":"' + handler + '", ';
    outString += '"actorScope":"' + actorScope + '", ';
    outString += '"actorDescription":"' + actorDescription + '", ';
    outString += '"actorCounter":"' + actorCounter + '", ';
    outString += '"actorMethod":"' + actorMethod + '", ';
    outString += '"canBack":"' + (row.childNodes[1].childNodes[10].value === '' ? 0 : 1) + '", ';
    outString += '"backNodes":"' + row.childNodes[1].childNodes[10].value + '", ';
    outString += '"canForward":"' + (row.childNodes[1].childNodes[11].value === '' ? 0 : 1) + '", ';
    outString += '"forwardNodes":"' + row.childNodes[1].childNodes[11].value + '", ';
    outString += '"canCommission":"' + (row.childNodes[1].childNodes[12].value === '' ? 0 : 1) + '", ';
    outString += '"commissionActors":"' + row.childNodes[1].childNodes[12].value + '", ';
    outString += '"timelimit":"' + row.childNodes[1].childNodes[13].value + '", ';
    outString += '"filterActors":"' + row.childNodes[1].childNodes[14].value + '", ';
    outString += '"sendAlertTask":"' + row.childNodes[1].childNodes[15].value + '", ';
    outString += '"policy":' + row.childNodes[1].childNodes[16].value + ', ';
    outString += '"remark":"' + x.encoding.html.encode(row.childNodes[1].childNodes[17].value) + '", ';
    outString += '"canEdit":"' + row.childNodes[1].childNodes[23].value + '", ';
    outString += '"canMove":"' + row.childNodes[1].childNodes[24].value + '", ';
    outString += '"canDelete":"' + row.childNodes[1].childNodes[25].value + '", ';
    outString += '"canUploadFile":"' + row.childNodes[1].childNodes[26].value + '", ';
    outString += '"switcher":{';
    outString += '"radiation":"' + row.childNodes[1].childNodes[row.childNodes[1].childNodes.length - 2].value + '",';
    outString += '"exits":' + row.childNodes[1].childNodes[row.childNodes[1].childNodes.length - 1].value + '}';
    outString += '}';

    return x.toJSON(outString);
  },
  /*#endregion*/

  /*#region 函数:setNodeObject(node, index)*/
  /**
  * 设置当前节点信息.
  *
  * index : 节点标识
  */
  setNodeObject: function(node, index)
  {
    var settings = x.workflow.settings;

    var nodeIndex = (typeof (index) === 'undefined') ? x.workflow.node.currentIndex : index;

    var nodes = $(settings.workflowNodeSelector);

    var row = nodes[(Number(nodeIndex) - 1)];

    row.childNodes[1].childNodes[0].innerHTML = node.name;
    row.childNodes[1].childNodes[1].value = node.id;
    row.childNodes[1].childNodes[2].value = node.name;
    // row.childNodes[1].childNodes[3].value = node.type;
    row.childNodes[1].childNodes[4].value = node.actorScope;
    row.childNodes[1].childNodes[5].value = node.actorDescription;
    row.childNodes[1].childNodes[6].value = node.actorCounter;
    row.childNodes[1].childNodes[7].value = node.actorMethod;
    row.childNodes[1].childNodes[8].value = node.editor;
    row.childNodes[1].childNodes[9].value = node.handler;
    row.childNodes[1].childNodes[10].value = node.backNodes;
    row.childNodes[1].childNodes[11].value = node.forwardNodes;
    row.childNodes[1].childNodes[12].value = node.commissionActors;
    row.childNodes[1].childNodes[13].value = node.timelimit;
    row.childNodes[1].childNodes[14].value = node.filterActors;
    row.childNodes[1].childNodes[15].value = node.sendAlertTask;
    row.childNodes[1].childNodes[16].value = JSON.stringify(node.policy);
    row.childNodes[1].childNodes[17].value = node.remark;
    row.childNodes[1].childNodes[23].value = node.canEdit;
    row.childNodes[1].childNodes[24].value = node.canMove;
    row.childNodes[1].childNodes[25].value = node.canDelete;
    row.childNodes[1].childNodes[26].value = node.canUploadFile;

    var exits = '[';

    // 设置分支条件
    if(typeof (node.switcher.exits) !== 'undefined' && node.switcher.exits.length > 1)
    {
      x.each(node.switcher.exits, function(index, exit)
      {
        exits += '{';
        exits += '"toNodeId":"' + exit.toNodeId + '", ';
        exits += '"friendlyCondition":"' + exit.friendlyCondition + '", ';
        exits += '"condition":' + x.workflow.switcherExit.toSwitcherExitConditionText(exit) + ' ';
        exits += '},';
      });

      if(exits.substr(exits.length - 1, 1) === ',')
      {
        exits = exits.substr(0, exits.length - 1);
      }
    }

    exits += ']';

    row.childNodes[1].childNodes[row.childNodes[1].childNodes.length - 2].value = node.switcher.radiation;
    row.childNodes[1].childNodes[row.childNodes[1].childNodes.length - 1].value = exits;

    // 设置执行人描述信息
    row.childNodes[2].childNodes[0].innerHTML = node.actorDescription;

    if(typeof (row.childNodes[2].childNodes[1]) !== 'undefined')
    {
      row.childNodes[2].childNodes[1].innerHTML = '';
    }

    row.childNodes[4].innerHTML = node.actorMethod;

    row.childNodes[5].innerHTML = node.timelimit;

    x.workflow.node.sync();
  },
  /*#endregion*/

  /*#region 函数:setActorScopeByNodeId(workflowInstanceId, workflowNodeId, actorScope)*/
  /**
  * 运行时修改预定义执行人范围
  *
  * flowInstanceId: 运行时的工作流的id.
  * nodeFlag: 运行时的节点的flag.
  */
  setActorScopeByNodeId: function(options)
  {
    if(confirm('是否重新设置这个节点的处理者?'))
    {
      var url = "/api/workflow.node.setActorScope.aspx";

      var outString = '<?xml version="1.0" encoding="utf-8"?>';

      outString += '<request>';
      outString += '<workflowInstanceId><![CDATA[' + options.workflowInstanceId + ']]></workflowInstanceId>';
      outString += '<workflowNodeId><![CDATA[' + options.workflowNodeId + ']]></workflowNodeId>';
      outString += '<actorScope><![CDATA[' + options.actorScope + ']]></actorScope>';
      outString += '</request>';

      $.post(url, { resultType: 'json', xml: outString }, function(response)
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
  },
  /*#endregion*/

  /*#region 函数:setActiveNode(options)*/
  /**
  * 运行时强制设置一个节点为当前节点
  */
  setActiveNode: function(options)
  {
    if(confirm('是否强制将当前的节点设置为活动节点?'))
    {
      var url = "/api/workflow.node.setActiveNode.aspx";

      var outString = '<?xml version="1.0" encoding="utf-8"?>';

      outString += '<request>';
      outString += '<nodeId>' + options.nodeId + '</nodeId>';
      outString += '</request>';

      $.post(url, { resultType: 'json', xml: outString }, function(response)
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
  },
  /*#endregion*/

  /*#region 函数:showActorWizard()*/
  /**
  * 执行人选择向导
  */
  showActorWizard: function()
  {
    x.workflow.node.actionMethod = 'cancel';

    // 由于多个节点共用一个人员选择向导
    // 所以需要每次清空人员数据重新初始化向导
    var name = x.getFriendlyName(location.pathname + '-workflow-node-actorDescription-workflow-node-actorScope-contacts-wizard');

    window[name] = undefined;

    // 人员选择向导的人员选择范围
    var contactTypeText = document.getElementById('workflow-node-contactTypeText') === null ? 'all' : $('#workflow-node-contactTypeText').val();

    x.ui.wizards.getContactsWizard({
      targetViewName: 'workflow-node-actorDescription',
      targetValueName: 'workflow-node-actorScope',
      contactTypeText: contactTypeText,
      multiSelection: 1,
      includeProhibited: 0,
      save_callback: function(response)
      {
        x.workflow.node.actionMethod = 'save';

        // x.workflow.node.edit(x.workflow.node.currentIndex);

        var resultView = '';
        var resultValue = '';

        var list = x.toJSON(response).list;

        x.each(list, function(index, node)
        {
          resultView += node.text + ';';
          resultValue += node.value + ';';
        });

        if(resultValue.substr(resultValue.length - 1, 1) === ';')
        {
          resultView = resultView.substr(0, resultView.length - 1);
          resultValue = resultValue.substr(0, resultValue.length - 1);
        }

        $('#workflow-node-actorDescription').val(resultView);
        $('#workflow-node-actorScope').val(resultValue);
      },
      cancel_callback: function(response)
      {
        if(x.workflow.node.actionMethod === 'cancel')
        {
          // x.workflow.node.edit(x.workflow.node.currentIndex);
        }
      }
    });
  },
  /*#endregion*/

  /*#region 函数:getExpectedActors()*/
  /**
  * 获取预计执行人信息
  */
  getExpectedActors: function()
  {
    var outString = '';

    var settings = x.workflow.settings;

    var nodes = $(settings.workflowNodeSelector);

    outString = '<?xml version="1.0" encoding="utf-8" ?>';

    outString += '<request>';
    // 所属公司信息
    outString += '<corporationId><![CDATA[' + $('#workflow-template-corporationId').val() + ']]></corporationId>';
    // 所属项目信息
    outString += '<projectId><![CDATA[' + $('#workflow-template-projectId').val() + ']]></projectId>';
    // 发起人信息
    outString += '<startActorId><![CDATA[' + $('#workflow-template-startActorId').val() + ']]></startActorId>';
    // 发起角色信息
    outString += '<startRoleId><![CDATA[' + $('#workflow-template-startRoleId').val() + ']]></startRoleId>';
    // 节点执行人范围
    for(var i = 0;i < nodes.length;i++)
    {
      // 如果传入单个参数，则只获取某一个节点的预计执行人
      if(arguments.length > 0 && arguments[0] != nodes[i].childNodes[1].childNodes[1].value) { continue; }

      outString += '<node>';
      outString += '<id><![CDATA[' + nodes[i].childNodes[1].childNodes[1].value + ']]></id>';
      outString += '<actorScope><![CDATA[' + nodes[i].childNodes[1].childNodes[4].value + ']]></actorScope>';
      outString += '</node>';
    }

    outString += '</request>';

    x.net.xhr('/api/workflow.client.getExpectedActors.aspx', outString, {
      waitingType: 'mini',
      waitingMessage: i18n.net.waiting.queryTipText,
      callback: function(response)
      {
        var list = x.toJSON(response).data;

        x.each(list, function(index, node)
        {
          if(node.expectedActors === '')
          {
            $('#' + node.id + '_expectedActors')
                .attr('class', 'x-workflow-node-expected-actors-notfound')
                .html('(<label>未找到预计执行人.</label>)');
          }
          else
          {
            $('#' + node.id + '_expectedActors')
                .attr('class', 'x-workflow-node-expected-actors')
                .html('(<label><strong>预计执行人:</strong>' + node.expectedActors + '</label>)');
          }
        });
      }
    });
  }
  /*#endregion*/
};

/**
* checkbox 元素相关的操作函数
*/
x.dom.util.checkbox = {

  /**
  * 获取checkbox元素的值.
  */
  getValue: function(checkboxName)
  {
    var result = '';

    var list = document.getElementsByName(checkboxName);

    for(var i = 0;i < list.length;i++)
    {
      if(list[i].checked)
      {
        result += (result == '' ? '' : ',') + list[i].value;
      }
    }

    return result.trim(',');
  },

  /**
  * 设置checkbox元素的值.
  */
  setValue: function(checkboxName, value)
  {
    var list = document.getElementsByName(checkboxName);

    for(var i = 0;i < list.length;i++)
    {
      if(list[i].value == value)
      {
        list[i].checked = true;
        x.dom.checkbox.setCheckboxViewValue(list[i].id, true);
      }
    }
  },

  selectAll: function(checkboxName, checked)
  {
    var list = document.getElementsByName(checkboxName);

    checked = typeof (checked) == 'undefined' ? true : checked;

    for(var i = 0;i < list.length;i++)
    {
      list[i].checked = checked;
    }
  },

  /**
  * 反选
  */
  selectInverse: function(checkboxName)
  {
    var list = document.getElementsByName(checkboxName);

    for(var i = 0;i < list.length;i++)
    {
      list[i].checked = !list[i].checked;
    }
  }
};
