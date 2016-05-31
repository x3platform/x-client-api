/**
* workflow      : instance(流程实例)
*
* require       : x.js, x.net.js, x.workflow.js
*/
x.workflow.instance = {

  /*#region 函数:pause(options)*/
  /**
  * 暂停流程实例
  */
  pause: function(options)
  {
    if(options.id !== '' && confirm('确定要暂停此流程吗？'))
    {
      x.net.xhr('/api/workflow.instance.pause.aspx?id=' + options.id, {
        callback: options.callback
      });
    }
  },
  /*#endregion*/

  /*#region 函数:resume(options)*/
  /**
  * 恢复流程实例
  */
  resume: function(options)
  {
    if(options.id !== '' && confirm('确定要恢复此流程吗？'))
    {
      x.net.xhr('/api/workflow.instance.resume.aspx?id=' + options.id, {
        callback: options.callback
      });
    }
  },
  /*#endregion*/

  /*#region 函数:abort(options)*/
  /**
  * 恢复流程实例
  */
  abort: function(options)
  {
    if(options.id !== '' && confirm("确定要中止此流程吗？ 流程一旦被中止，将无法恢复!"))
    {
      x.net.xhr('/api/workflow.instance.abort.aspx?id=' + options.id, {
        callback: options.callback
      });
    }
  },
  /*#endregion*/

  /*#region 函数:confirmDelete(options)*/
  /**
  * 删除模板
  */
  confirmDelete: function(options)
  {
    if(options.id !== null && confirm("确定删除？"))
    {
      x.net.xhr('/api/workflow.instance.delete.aspx?id=' + options.id, {
        callback: options.callback
      });
    }
  },
  /*#endregion*/

  /*
  * 执行者信息
  */
  actor: {
    /*#region*/
    /*
    * 发起角色选择向导
    */
    getStartRoleWizard: function(accountId)
    {
      // findAll
      x.ui.wizards.getWizard('workflow-startRole', {

        bindOptions: function() { },

        save_callback: function()
        {
          $('#workflow-template-startRoleId').val($('#workflow-startRole-wizardValue').val());
          $('#workflow-template-startRoleName').val($('#workflow-startRole-wizardText').val());
          $('#workflow-template-startRoleText').html($('#workflow-startRole-wizardText').val());

          // 重新获取预计执行人信息
          x.workflow.node.getExpectedActors();

          return 0;
        },

        create: function()
        {
          var outString = '';

          outString += '<div id="' + this.name + '" class="winodw-wizard-wrapper" style="width:260px; height:auto;" >';

          outString += '<div class="winodw-wizard-toolbar" >';
          outString += '<div class="winodw-wizard-toolbar-close">';
          outString += '<a href="javascript:' + this.name + '.cancel();" title="关闭" ><i class="fa fa-close"></i></a>';
          outString += '</div>';
          outString += '<div class="float-left">';
          outString += '<div class="winodw-wizard-toolbar-item" style="width:200px;" ><span>发起角色设置向导</span></div>';
          outString += '<div class="clear"></div>';
          outString += '</div>';
          outString += '<div class="clear"></div>';
          outString += '</div>';

          outString += '<div id="workflow-startRole-wizardTableContainer" style="height:260px;" ></div>';

          outString += '<div class="winodw-wizard-result-container form-inline text-right" >';
          outString += '<label class="winodw-wizard-result-item-text" style="width:40px;" >角色</label> ';
          outString += '<input id="workflow-startRole-wizardText" name="wizardText" type="text" value="' + $('#workflow-template-startRoleName').val() + '" class="winodw-wizard-result-item-input form-control input-sm" style="width:100px;" /> ';
          outString += '<input id="workflow-startRole-wizardValue" name="wizardValue" type="hidden" value="' + $('#workflow-template-startRoleId').val() + '" />';
          outString += '<a href="javascript:' + this.name + '.save();" class="btn btn-default btn-sm" >确定</a>';
          outString += '</div>';

          return outString;
        }
      });

      x.net.xhr('/api/membership.role.findAllByAccountId.aspx?accountId=' + accountId, {
        waitingType: 'mini',
        waitingMessage: i18n.net.waiting.queryTipText,
        callback: function(response)
        {
          var outString = '';

          var counter = 0;

          var result = x.toJSON(response);

          var list = result.data;

          outString += '<table class="table">';
          outString += '<thead>';
          outString += '<tr class="table-row-title">';
          outString += '<th >名称</th>';
          outString += '</tr>';
          outString += '</thead>';
          outString += '<tbody>';
          x.each(list, function(index, node)
          {
            if(node.value !== '')
            {
              classNameValue = (counter % 2 === 0) ? 'table-row-normal' : 'table-row-alternating';

              classNameValue = classNameValue + ((counter + 1) === list.length && (list.length > 8) ? '-transparent' : '');

              outString += '<tr class="' + classNameValue + '">';
              outString += '<td>';
              outString += '<a href="javascript:$(#\'workflow-startRole-wizardValue\').val(\'' + node.id + '\');x.form.query(\'workflow-startRole-wizardText\').val(\'' + node.name + '\'); void(0);" >' + node.name + '</a></li>';

              outString += '</td>';
              outString += '</tr>';

              counter++;
            }
          });

          outString += '</tr>';
          outString += '</tbody>';
          outString += '</table>';

          $('#workflow-startRole-wizardTableContainer')[0].innerHTML = outString;
        }
      });
    }
    /*#endregion*/
  }
}