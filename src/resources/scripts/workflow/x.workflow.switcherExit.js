/**
* workflow      : switcherExit(分支出口)
*
* require       : x.js, x.net.js, x.workflow.js
*/
x.workflow.switcherExit = {

  maskWrapper: x.ui.mask.newMaskWrapper('x-workflow-switcherExit-maskWrapper', { draggableHeight: 504, draggableWidth: 738 }),

  // 当前分支条件的索引(编辑状态)
  currentIndex: 0,

  /*#region 函数:edit(index)*/
  edit: function(index)
  {
    x.workflow.switcherExit.currentIndex = index;

    var exit = x.workflow.switcherExit.getSwitcherExitObject(index);

    var outString = '';

    outString += '<div id="workflow-node-switcher-exit-name-' + index + '" class="winodw-wizard-wrapper" style="width:720px; height:auto;" >';

    outString += '<div class="winodw-wizard-toolbar" >';
    outString += '<div class="winodw-wizard-toolbar-close">';
    outString += '<a href="javascript:x.workflow.switcherExit.maskWrapper.close();" title="关闭" ><i class="fa fa-close"></i></a>';
    outString += '</div>';
    outString += '<div class="float-left">';
    outString += '<div class="winodw-wizard-toolbar-item" style="width:200px;" ><span>编辑分支条件</span></div>';
    outString += '<div class="clear"></div>';
    outString += '</div>';
    outString += '<div class="clear"></div>';
    outString += '</div>';

    outString += '<input id="workflow-node-switcher-exit-index" type="hidden" value="' + index + '" />';

    outString += '<table class="table-style" style="width:100%;" >';
    outString += '<tr class="table-row-normal-transparent" >';
    outString += '<td ><input id="workflow-node-switcher-exit-condition-join" type="text" x-dom-feature="combobox" topOffset="-1" x-dom-xhr-url="/api/application.setting.getCombobox.aspx" x-dom-xhr-params="{applicationSettingGroupName:\'应用管理_协同平台_工作流管理_分支出口条件管理_链接方式\'}" x-dom-combobox-icon-hidden="1" class="form-control" style="width:53px" /></td>';
    outString += '<td ><input id="workflow-node-switcher-exit-condition-leftBracket" type="text" x-dom-feature="combobox" topOffset="-1" x-dom-xhr-url="/api/application.setting.getCombobox.aspx" x-dom-xhr-params="{applicationSettingGroupName:\'应用管理_协同平台_工作流管理_分支出口条件管理_左侧括号\'}" x-dom-combobox-icon-hidden="1" class="form-control" style="width:50px" /></td>';
    outString += '<td >';
    outString += '<div class="form-inline">';
    outString += '<div class="input-group">';
    outString += '<input id="workflow-node-switcher-exit-condition-expression1-view" type="text" class="form-control" readonly="readonly" style="width:120px" /> ';
    outString += '<input id="workflow-node-switcher-exit-condition-expression1" type="hidden"/> ';
    outString += '<a href="javascript:x.workflow.switcherExit.expression.edit(\'workflow-node-switcher-exit-condition-expression1\',\'left\');" title="编辑" class="input-group-addon"><span class="glyphicon glyphicon-modal-window"></span></a>';
    outString += '</div>';
    outString += '</div>';

    outString += '</td>';
    outString += '<td ><input id="workflow-node-switcher-exit-condition-compare" type="text" x-dom-feature="combobox" topOffset="-1" x-dom-xhr-url="/api/application.setting.getCombobox.aspx" x-dom-xhr-params="{applicationSettingGroupName:\'应用管理_协同平台_工作流管理_分支出口条件管理_判断方式\'}"  x-dom-combobox-icon-hidden="1" class="form-control" style="width:75px" /></td>';
    outString += '<td >';
    outString += '<input id="workflow-node-switcher-exit-condition-expression2" type="hidden"/> ';
    outString += '<input id="workflow-node-switcher-exit-condition-handmade" type="hidden" /> ';
    outString += '<input id="workflow-node-switcher-exit-condition-expression2-view" type="text" class="form-control" style="width:120px" /> ';
    // outString += '<a href="javascript:x.workflow.switcherExit.expression.edit(\'workflow-node-switcher-exit-condition-expression2\',\'right\');" >编辑</a>';
    outString += '</td>';
    outString += '<td ><input id="workflow-node-switcher-exit-condition-rightBracket" type="text" x-dom-feature="combobox" topOffset="-1" x-dom-xhr-url="/api/application.setting.getCombobox.aspx" x-dom-combobox-icon-hidden="1" x-dom-xhr-params="{applicationSettingGroupName:\'应用管理_协同平台_工作流管理_分支出口条件管理_右侧括号\'}" x-dom-combobox-icon-hidden="1" class="form-control" style="width:50px" /></td>';
    outString += '<td >';
    outString += '<button onclick="javascript:x.workflow.switcherExit.condition.setEditConditionObject();" class="btn btn-default" >确定</button>';
    outString += '</td>';
    outString += '</tr>';
    outString += '</table>';

    outString += '<div style="padding:0; height:auto; border-top:1px solid #ccc;" >';
    outString += '<table id="workflow-node-switcher-exit-wizard-condition$table" class="table-style" style="width:100%;" >';
    outString += '<tr class="table-row-title" >';
    outString += '<td style="width:80px;">链接方式</td>';
    outString += '<td >表达式</td>';
    outString += '<td style="width:30px;" title="编辑" ><i class="fa fa-edit" ></i></td>';
    outString += '<td style="width:30px;" title="删除" ><i class="fa fa-trash" ></i></td>';
    outString += '</tr>';
    outString += '<tr class="table-row-normal-transparent workflow-switcher-exit-condition-new" >';
    outString += '<td colspan="4" style="text-align:right;" ><a href="javascript:x.workflow.switcherExit.condition.reset();" >新增分支条件</a></td>';
    outString += '</tr>';
    outString += '</table>';
    outString += '</div>';

    outString += '<div style="border-top:1px solid #ccc;padding:10px 20px 10px 0;" >';
    outString += '<div class="float-right button-2font-wrapper" ><a id="btnCancel" href="javascript:x.workflow.switcherExit.maskWrapper.close();" class="btn btn-default" >取消</a></div> ';
    outString += '<div class="float-right button-2font-wrapper" style="margin-right:10px;" ><a id="btnOkey" href="javascript:x.workflow.switcherExit.save();" class="btn btn-default" >保存</a></div> ';
    outString += '<div class="clear"></div>';
    outString += '</div>';

    outString += '</div>';

    // 加载遮罩和页面内容
    x.ui.mask.getWindow({ content: outString }, x.workflow.switcherExit.maskWrapper);
    // 设置条件表格
    x.workflow.switcherExit.setConditionTable(exit);

    $('#btnCancel').bind('click', function()
    {
      x.workflow.node.maskWrapper.close();
    });

    x.page.goTop();

    x.dom.features.bind();

    // 重置编辑界面
    x.workflow.switcherExit.condition.reset();
  },
  /*#endregion*/

  /*#region 函数:save()*/
  save: function()
  {
    var list = $(x.workflow.settings.workflowSwitcherExitConditionSelector);

    var index = $(x.workflow.settings.workflowSwitcherExitConditionSelector);

    var outString = '';

    // 设置表达式
    outString = '[';

    for(var i = 0;i < list.length;i++)
    {
      outString += '{';
      outString += '"join":"' + list[i].childNodes[1].childNodes[1].value + '", ';
      outString += '"joinText":"' + list[i].childNodes[1].childNodes[2].value + '", ';
      outString += '"leftBracket":"' + list[i].childNodes[1].childNodes[3].value + '", ';
      outString += '"expression1":"' + list[i].childNodes[1].childNodes[4].value + '", ';
      outString += '"expression1Text":"' + list[i].childNodes[1].childNodes[5].value + '", ';
      outString += '"compare":"' + list[i].childNodes[1].childNodes[6].value + '", ';
      outString += '"compareText":"' + list[i].childNodes[1].childNodes[7].value + '", ';
      outString += '"expression2":"' + list[i].childNodes[1].childNodes[8].value + '", ';
      outString += '"expression2Text":"' + list[i].childNodes[1].childNodes[9].value + '", ';
      outString += '"handmade":"' + list[i].childNodes[1].childNodes[10].value + '", ';
      outString += '"rightBracket":"' + list[i].childNodes[1].childNodes[11].value + '", ';
      outString += '"friendlyText":"' + list[i].childNodes[1].childNodes[0].innerHTML.replace(/&nbsp;/g, ' ') + '" ';
      outString += '},';
    }

    if(outString.substr(outString.length - 1, 1) === ',')
    {
      outString = outString.substr(0, outString.length - 1);
    }

    outString += ']';

    // 设置启用
    document.getElementById('workflow-node-switcher-exit' + x.workflow.switcherExit.currentIndex).checked = (outString.length > 2) ? true : false;

    document.getElementById('workflow-node-switcher-exit' + x.workflow.switcherExit.currentIndex + '-condition').value = outString;

    // 设置表达式
    outString = '';

    for(var i = 0;i < list.length;i++)
    {
      // joinText + friendlyText
      outString += list[i].childNodes[1].childNodes[2].value + ' ' + list[i].childNodes[1].childNodes[0].innerHTML + ' ';
      outString = outString.replace(/&nbsp;/g, ' ');
    }

    document.getElementById('workflow-node-switcher-exit' + x.workflow.switcherExit.currentIndex + '-friendlyCondition').value = outString;
    document.getElementById('workflow-node-switcher-exit' + x.workflow.switcherExit.currentIndex + '-friendlyConditionText').innerHTML = outString;
    // x.debug.log('workflow-node-switcher-exit' + x.workflow.switcherExit.currentIndex + '-condition');

    x.workflow.switcherExit.maskWrapper.close();
  },
  /*#endregion*/

  /*#region 函数:setConditionTable(exit)*/
  setConditionTable: function(exit)
  {
    var list = exit.condition;

    var outString = '';

    for(var i = 0;i < list.length;i++)
    {
      var condition = list[i];

      var idPrefix = 'workflow-node-switcher-exit-condition-' + (i + 1);

      outString += '<tr class="table-row-normal workflow-switcher-exit-condition" >';
      outString += '<td>' + condition.joinText + '</td>';
      outString += '<td>';
      outString += '<span>' + condition.friendlyText + '</span>';
      outString += '<input id="' + idPrefix + '-join" type="hidden" value="' + condition.join + '" />';
      outString += '<input id="' + idPrefix + '-joinText" type="hidden" value="' + condition.joinText + '" />';
      outString += '<input id="' + idPrefix + '-leftBracket" type="hidden" value="' + condition.leftBracket + '" />';
      outString += '<input id="' + idPrefix + '-expression1" type="hidden" value="' + condition.expression1 + '" />';
      outString += '<input id="' + idPrefix + '-expression1Text" type="hidden" value="' + condition.expression1Text + '" />';
      outString += '<input id="' + idPrefix + '-compare" type="hidden" value="' + condition.compare + '" />';
      outString += '<input id="' + idPrefix + '-compareText" type="hidden" value="' + condition.compareText + '" />';
      outString += '<input id="' + idPrefix + '-expression2" type="hidden" value="' + condition.expression2 + '" />';
      outString += '<input id="' + idPrefix + '-expression2Text" type="hidden" value="' + condition.expression2Text + '" />';
      outString += '<input id="' + idPrefix + '-handmade" type="hidden" value="' + condition.handmade + '" />';
      outString += '<input id="' + idPrefix + '-rightBracket" type="hidden" value="' + condition.rightBracket + '" />';
      outString += '</td>';
      outString += '<td><a href="javascript:x.workflow.switcherExit.condition.edit(' + (i + 1) + ')" title="编辑" ><i class="fa fa-edit" ></i></a></td>';
      outString += '<td><a href="javascript:x.workflow.switcherExit.condition.remove(' + (i + 1) + ')" title="删除" ><i class="fa fa-trash" ></i></a></td>';
      outString += '</tr>';
    }

    // 默认情况插入倒数第一个
    $(x.workflow.settings.workflowSwitcherExitConditionNewSelector).before(outString);
  },
  /*#endregion*/

  /*#region 函数:getSwitcherExitObject(index)*/
  getSwitcherExitObject: function(index)
  {
    var outString = '{';

    if(document.getElementById('workflow-node-switcher-exit' + index + '-condition').value === '')
    {
      document.getElementById('workflow-node-switcher-exit' + index + '-condition').value = '[]';
    }

    outString += '"toNodeId":"' + document.getElementById('workflow-node-switcher-exit' + index + '-toNodeId').value + '",';
    outString += '"condition":' + document.getElementById('workflow-node-switcher-exit' + index + '-condition').value + ',';
    outString += '"friendlyCondition":"' + document.getElementById('workflow-node-switcher-exit' + index + '-friendlyCondition').value + '"';
    outString += '}';

    return x.toJSON(outString);
  },
  /*#endregion*/

  /*#region 函数:toSwitcherExitConditionText(exit)*/
  toSwitcherExitConditionText: function(exit)
  {
    var outString = '[';

    for(var i = 0;i < exit.condition.length;i++)
    {
      outString += '{';
      outString += '"join":"' + exit.condition[i].join + '", ';
      outString += '"joinText":"' + exit.condition[i].joinText + '", ';
      outString += '"leftBracket":"' + exit.condition[i].leftBracket + '", ';
      outString += '"expression1":"' + exit.condition[i].expression1 + '", ';
      outString += '"expression1Text":"' + exit.condition[i].expression1Text + '", ';
      outString += '"compare":"' + x.encoding.html.encode(exit.condition[i].compare) + '", ';
      outString += '"compareText":"' + exit.condition[i].compareText + '", ';
      outString += '"expression2":"' + exit.condition[i].expression2 + '", ';
      outString += '"expression2Text":"' + exit.condition[i].expression2Text + '", ';
      outString += '"handmade":"' + exit.condition[i].handmade + '", ';
      outString += '"rightBracket":"' + exit.condition[i].rightBracket + '", ';
      outString += '"friendlyText":"' + exit.condition[i].friendlyText + '" ';
      outString += '},';
    }

    if(outString.substr(outString.length - 1, 1) === ',')
    {
      outString = outString.substr(0, outString.length - 1);
    }

    outString += ']';

    return outString;
  },
  /*#endregion*/

  condition: {

    // 当前分支条件的索引(编辑状态)
    currentIndex: 0,

    /*#region 函数:reset()*/
    reset: function()
    {
      x.workflow.switcherExit.condition.currentIndex = 0;

      $('#workflow-node-switcher-exit-condition-join').val('AND');
      $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-join-view').val('并且');
      $('#workflow-node-switcher-exit-condition-leftBracket').val('(');
      $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-leftBracket-view').val('(');
      $('#workflow-node-switcher-exit-condition-expression1').val('');
      $('#workflow-node-switcher-exit-condition-expression1-view').val('');
      $('#workflow-node-switcher-exit-condition-compare').val('=');
      $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-compare-view').val('等于');
      $('#workflow-node-switcher-exit-condition-expression2').val('');
      $('#workflow-node-switcher-exit-condition-expression2-view').val('');
      $('#workflow-node-switcher-exit-condition-handmade').val(0);
      $('#workflow-node-switcher-exit-condition-rightBracket').val(')');
      $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-rightBracket-view').val(')');
    },
    /*#endregion*/

    /*#region 函数:sync()*/
    /**
    * 同步工作流节点信息，重新分析设置节点数据。
    */
    sync: function()
    {
      var list = $(x.workflow.settings.workflowSwitcherExitConditionSelector);

      for(var i = 0;i < list.length;i++)
      {
        var row = list[i];

        var index = i + 1;

        var idPrefix = 'workflow-node-switcher-exit-condition-' + index;

        row.childNodes[1].childNodes[1].id = idPrefix + '-join';
        row.childNodes[1].childNodes[2].id = idPrefix + '-joinText';
        row.childNodes[1].childNodes[3].id = idPrefix + '-leftBracket';
        row.childNodes[1].childNodes[4].id = idPrefix + '-expression1';
        row.childNodes[1].childNodes[5].id = idPrefix + '-expression1Text';
        row.childNodes[1].childNodes[6].id = idPrefix + '-compare';
        row.childNodes[1].childNodes[7].id = idPrefix + '-compareText';
        row.childNodes[1].childNodes[8].id = idPrefix + '-expression2';
        row.childNodes[1].childNodes[9].id = idPrefix + '-expression2Text';
        row.childNodes[1].childNodes[10].id = idPrefix + '-handmade';
        row.childNodes[1].childNodes[11].id = idPrefix + '-rightBracket';
        row.childNodes[2].innerHTML = '<a href="javascript:x.workflow.switcherExit.condition.edit(' + index + ')" title="编辑" ><i class="fa fa-edit" ></i></a>';
        row.childNodes[3].innerHTML = '<a href="javascript:x.workflow.switcherExit.condition.remove(' + index + ')" title="删除" ><i class="fa fa-trash" ></i></a>';
      }
    },
    /*#endregion*/

    /*#region 函数:edit(index)*/
    edit: function(index)
    {
      x.workflow.switcherExit.condition.currentIndex = index;

      var editPrefix = 'workflow-node-switcher-exit-condition';

      var idPrefix = 'workflow-node-switcher-exit-condition-' + index;

      // 加载编辑数据
      document.getElementById(editPrefix + '-join').value = document.getElementById(idPrefix + '-join').value;
      document.getElementById(editPrefix + '-join-view').value = document.getElementById(idPrefix + '-joinText').value;
      document.getElementById(editPrefix + '-leftBracket').value = document.getElementById(idPrefix + '-leftBracket').value;
      document.getElementById(editPrefix + '-leftBracket-view').value = document.getElementById(idPrefix + '-leftBracket').value;
      document.getElementById(editPrefix + '-expression1').value = document.getElementById(idPrefix + '-expression1').value;
      document.getElementById(editPrefix + '-expression1-view').value = document.getElementById(idPrefix + '-expression1Text').value;
      document.getElementById(editPrefix + '-compare').value = document.getElementById(idPrefix + '-compare').value;
      document.getElementById(editPrefix + '-compare-view').value = document.getElementById(idPrefix + '-compareText').value;
      document.getElementById(editPrefix + '-expression2').value = document.getElementById(idPrefix + '-expression2').value;
      document.getElementById(editPrefix + '-expression2-view').value = document.getElementById(idPrefix + '-expression2Text').value;
      document.getElementById(editPrefix + '-handmade').value = document.getElementById(idPrefix + '-handmade').value;
      document.getElementById(editPrefix + '-rightBracket').value = document.getElementById(idPrefix + '-rightBracket').value;
      document.getElementById(editPrefix + '-rightBracket-view').value = document.getElementById(idPrefix + '-rightBracket').value;

      x.form.query(editPrefix + 'expression1-view').css({ 'text-decoration': 'underline', 'font-weight': 'bold' });

      if(document.getElementById(idPrefix + '-handmade').value == '0')
      {
        x.form.query(editPrefix + 'expression2-view').css({ 'text-decoration': 'underline', 'font-weight': 'bold' });
      }
      else
      {
        x.form.query(editPrefix + 'expression2-view').css({ 'text-decoration': 'none', 'font-weight': 'normal' });
      }
    },
    /*#endregion*/

    /*#region 函数:remove(index)*/
    remove: function(index)
    {
      var target = $(x.workflow.settings.workflowSwitcherExitConditionSelector)[index - 1];

      if(target)
      {
        $(target).remove();
      }

      x.workflow.switcherExit.condition.sync();
    },
    /*#endregion*/

    /*#region 函数:setEditConditionObject()*/
    setEditConditionObject: function()
    {
      // 验证

      // 保存
      var list = $(x.workflow.settings.workflowSwitcherExitConditionSelector);

      var condition = x.workflow.switcherExit.condition.getEditConditionObject();

      var outString = '';

      var index = x.workflow.switcherExit.condition.currentIndex;

      if(index === 0)
      {
        index = list.length + 1;

        var idPrefix = 'workflow-node-switcher-exit-condition-' + index;

        outString += '<tr class="table-row-normal workflow-switcher-exit-condition" >';
        outString += '<td>' + (index === 1 ? '' : condition.joinText) + '</td>';
        outString += '<td>';
        outString += '<span>' + condition.friendlyText + '</span>';
        outString += '<input id="' + idPrefix + '-join" type="hidden" value="' + (index === 1 ? '' : condition.join) + '" />';
        outString += '<input id="' + idPrefix + '-joinText" type="hidden" value="' + (index === 1 ? '' : condition.joinText) + '" />';
        outString += '<input id="' + idPrefix + '-leftBracket" type="hidden" value="' + condition.leftBracket + '" />';
        outString += '<input id="' + idPrefix + '-expression1" type="hidden" value="' + condition.expression1 + '" />';
        outString += '<input id="' + idPrefix + '-expression1Text" type="hidden" value="' + condition.expression1Text + '" />';
        outString += '<input id="' + idPrefix + '-compare" type="hidden" value="' + condition.compare + '" />';
        outString += '<input id="' + idPrefix + '-compareText" type="hidden" value="' + condition.compareText + '" />';
        outString += '<input id="' + idPrefix + '-expression2" type="hidden" value="' + condition.expression2 + '" />';
        outString += '<input id="' + idPrefix + '-expression2Text" type="hidden" value="' + condition.expression2Text + '" />';
        outString += '<input id="' + idPrefix + '-handmade" type="hidden" value="' + condition.handmade + '" />';
        outString += '<input id="' + idPrefix + '-rightBracket" type="hidden" value="' + condition.rightBracket + '" />';
        outString += '</td>';
        outString += '<td><a href="javascript:x.workflow.switcherExit.condition.edit(' + index + ')" title="编辑" ><i class="fa fa-edit" ></i></a></td>';
        outString += '<td><a href="javascript:x.workflow.switcherExit.condition.remove(' + index + ')" title="删除" ><i class="fa fa-trash" ></i></a></td>';
        outString += '</tr>';

        // 默认情况插入倒数第一个
        $(x.workflow.settings.workflowSwitcherExitConditionNewSelector).before(outString);
      }
      else
      {
        var row = list[index - 1];

        row.childNodes[0].innerHTML = (index === 1 ? '' : condition.joinText);
        row.childNodes[1].childNodes[0].innerHTML = condition.friendlyText;
        row.childNodes[1].childNodes[1].value = (index === 1 ? '' : condition.join);
        row.childNodes[1].childNodes[2].value = (index === 1 ? '' : condition.joinText);
        row.childNodes[1].childNodes[3].value = condition.leftBracket;
        row.childNodes[1].childNodes[4].value = condition.expression1;
        row.childNodes[1].childNodes[5].value = condition.expression1Text;
        row.childNodes[1].childNodes[6].value = condition.compare;
        row.childNodes[1].childNodes[7].value = condition.compareText;
        row.childNodes[1].childNodes[8].value = condition.expression2;
        row.childNodes[1].childNodes[9].value = condition.expression2Text;
        row.childNodes[1].childNodes[10].value = condition.handmade;
        row.childNodes[1].childNodes[11].value = condition.rightBracket;
      }

      x.debug.log('x.workflow.switcherExit.save();');
      x.debug.log(condition);

      // 重置编辑界面
      x.workflow.switcherExit.condition.reset();
    },
    /*#endregion*/

    /*#region 函数:getEditConditionObject()*/
    /**
    * 获取当前编辑节点
    */
    getEditConditionObject: function()
    {
      var join = $('#workflow-node-switcher-exit-condition-join').val();
      var leftBracket = $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-leftBracket-view').val();
      var expression1 = $('#workflow-node-switcher-exit-condition-expression1-view').val();
      var compare = $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-compare-view').val();
      var expression2 = $('#workflow-node-switcher-exit-condition-expression2-view').val();
      var handmade = $('#workflow-node-switcher-exit-condition-handmade');
      var rightBracket = $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-rightBracket-view').val();

      var friendlyText = leftBracket + '' + expression1 + ' ' + compare + ' ' + expression2 + '' + rightBracket;

      if(handmade === '1')
      {
        $('#workflow-node-switcher-exit-condition-expression2').val($('#workflow-node-switcher-exit-condition-expression2-view').val());
      }

      // -------------------------------------------------------
      // 输出结果
      // -------------------------------------------------------

      var outString = '';

      outString += '{';
      outString += '"join":"' + $('#workflow-node-switcher-exit-condition-join').val() + '", ';
      outString += '"joinText":"' + $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-join-view').val() + '", ';
      outString += '"leftBracket":"' + $('#workflow-node-switcher-exit-condition-leftBracket').val() + '", ';
      outString += '"expression1":"' + $('#workflow-node-switcher-exit-condition-expression1').val() + '", ';
      outString += '"expression1Text":"' + $('#workflow-node-switcher-exit-condition-expression1-view').val() + '", ';
      outString += '"compare":"' + $('#workflow-node-switcher-exit-condition-compare').val() + '", ';
      outString += '"compareText":"' + $('#' + x.ui.classNamePrefix + '-workflow-node-switcher-exit-condition-compare-view').val() + '", ';
      outString += '"expression2":"' + $('#workflow-node-switcher-exit-condition-expression2').val() + '", ';
      outString += '"expression2Text":"' + $('#workflow-node-switcher-exit-condition-expression2-view').val() + '", ';
      outString += '"handmade":"' + ($('#workflow-node-switcher-exit-condition-handmade')[0].checked ? 1 : 0) + '", ';
      outString += '"rightBracket":"' + $('#workflow-node-switcher-exit-condition-rightBracket').val() + '", ';
      outString += '"friendlyText":"' + friendlyText + '" ';
      outString += '}';

      return x.toJSON(outString);
    }
    /*#endregion*/
  },

  expression: {

    maskWrapper: x.ui.mask.newMaskWrapper('x-workflow-switcherExit-expression-maskWrapper', { draggableHeight: 504, draggableWidth: 738 }),

    /*#region 函数:getTreeView()*/
    /*
    * 获取树形菜单
    */
    getTreeView: function(entitySchemaId, expressionType)
    {
      var url = '';
      var treeViewId = '10000000-0000-0000-0000-000000000000';
      var treeViewName = '选择表达式';
      var treeViewRootTreeNodeId = '00000000-0000-0000-0000-000000000001';
      var treeViewUrl = 'javascript:x.workflow.switcherExit.expression.setTreeViewNode(\'{treeNodeId}\',\'{treeNodeName}\')';

      var entitySchemaIds = '04-E01,04-E02' + ((entitySchemaId === 'undefined') ? '' : (',' + entitySchemaId));

      var outString = '<?xml version="1.0" encoding="utf-8" ?>';

      outString += '<request>';
      outString += '<action><![CDATA[getDynamicTreeView]]></action>';
      outString += '<treeViewId><![CDATA[' + treeViewId + ']]></treeViewId>';
      outString += '<treeViewName><![CDATA[' + treeViewName + ']]></treeViewName>';
      outString += '<treeViewRootTreeNodeId><![CDATA[' + treeViewRootTreeNodeId + ']]></treeViewRootTreeNodeId>';
      outString += '<entitySchemaIds><![CDATA[' + entitySchemaIds + ']]></entitySchemaIds>';
      outString += '<expressionType><![CDATA[' + expressionType + ']]></expressionType>';
      outString += '<tree><![CDATA[{tree}]]></tree>';
      outString += '<parentId><![CDATA[{parentId}]]></parentId>';
      outString += '<url><![CDATA[' + treeViewUrl + ']]></url>';
      outString += '</request>';

      var tree = x.ui.pkg.tree.newTreeView({ name: 'x.workflow.switcherExit.expression.tree', ajaxMode: true });

      tree.add({
        id: "0",
        parentId: "-1",
        name: treeViewName,
        url: treeViewUrl.replace('{treeNodeId}', treeViewRootTreeNodeId),
        title: treeViewName,
        target: '',
        icon: '/resources/images/tree/tree_icon.gif'
      });

      tree.load('/api/workflow.expression.getDynamicTreeView.aspx', false, outString);

      // 增加内置业务实体信息

      var list = x.workflow.template.getTemplategetInternalMetaData();

      if(list.length > 0)
      {
        tree.add({
          id: '00000',
          parentId: '0',
          name: '表单内置信息',
          url: 'javascript:void(0);'
        });

        x.each(list, function(index, node)
        {
          tree.add({
            id: '00000-' + index,
            parentId: '00000',
            name: node.fieldName,
            url: 'javascript:x.workflow.switcherExit.expression.setTreeViewNode(\'meta:' + node.fieldType + '#' + node.dataColumnName + '\',\'' + node.fieldName + '\')'
          });

          // tree.add('00000-' + index, '00000', node.fieldName, 'javascript:x.workflow.switcherExit.expression.setTreeViewNode(\'meta:' + node.fieldType + '#' + node.dataColumnName + '\',\'' + node.fieldName + '\')');
        });
      }

      x.workflow.switcherExit.expression.tree = tree;

      $('#workflow-switcherExit-expression-wizardTreeViewContainer')[0].innerHTML = tree;
    },
    /*#endregion*/

    /*#region 函数:setTreeViewNode (value, text)*/
    setTreeViewNode: function(value, text)
    {
      $('#workflow-switcherExit-expression-wizardExpressionText').val(text);
      $('#workflow-switcherExit-expression-wizardExpressionValue').val(value);
    },
    /*#endregion*/

    /*#region 函数:edit(expressionName)*/
    edit: function(expressionName, expressionType)
    {
      var outString = '';

      outString += '<div id="' + expressionName + '-edit" class="winodw-wizard-wrapper" style="width:300px; height:auto;" >';

      outString += '<div class="winodw-wizard-toolbar" >';
      outString += '<div class="winodw-wizard-toolbar-close">';
      outString += '<a href="javascript:x.workflow.switcherExit.expression.maskWrapper.close();" title="关闭" ><i class="fa fa-close"></i></a>';
      outString += '</div>';
      outString += '<div class="float-left">';
      outString += '<div class="winodw-wizard-toolbar-item" style="width:200px;" ><span>设置表达式</span></div>';
      outString += '<div class="clear"></div>';
      outString += '</div>';
      outString += '<div class="clear"></div>';
      outString += '</div>';

      outString += '<div id="workflow-switcherExit-expression-wizardTreeViewContainer" class="winodw-wizard-tree-view" style="height:300px;" ></div>';

      outString += '<div class="winodw-wizard-result-container form-inline text-right" >';
      outString += '<label class="winodw-wizard-result-item-text" >表达式</label> ';
      outString += '<input id="workflow-switcherExit-expression-wizardExpressionText" name="wizardExpressionText" type="text" value="" class="winodw-wizard-result-item-input form-control input-sm" style="width:160px" /> ';
      outString += '<input id="workflow-switcherExit-expression-wizardExpressionValue" name="wizardExpressionValue" type="hidden" value="" />';
      outString += '<a href="javascript:x.workflow.switcherExit.expression.save(\'' + expressionName + '\');" class="btn btn-default btn-sm" >确定</a>';
      outString += '</div>';

      // 加载遮罩和页面内容
      x.ui.mask.getWindow({ content: outString }, x.workflow.switcherExit.expression.maskWrapper);

      // 初始化数据
      $('#workflow-switcherExit-expression-wizardExpressionText').val($('#' + expressionName + '-view').val());
      $('#workflow-switcherExit-expression-wizardExpressionValue').val($('#' + expressionName).val());

      x.net.xhr('/api/kernel.entities.schema.findOneByEntityClassName.aspx?entityClassName=' + encodeURIComponent($('#workflow-template-entityClass').val()), {
        callback: function(response)
        {
          var param = x.toJSON(response).data;

          x.workflow.switcherExit.expression.getTreeView(param.id, expressionType);
        }
      });
    },
    /*#endregion*/

    /*#region 函数:save()*/
    save: function(expressionName)
    {
      x.workflow.switcherExit.expression.maskWrapper.close();

      $('#' + expressionName + '-view').val($('#workflow-switcherExit-expression-wizardExpressionText').val());
      $('#' + expressionName).val($('#workflow-switcherExit-expression-wizardExpressionValue').val());
      $('#' + expressionName + '-view').css({ 'text-decoration': 'underline', 'font-weight': 'bold' });
      $('#workflow-node-switcher-exit-condition-handmade').val(0);
    }
    /*#endregion*/
  }
};