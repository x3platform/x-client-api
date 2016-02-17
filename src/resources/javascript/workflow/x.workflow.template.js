/**
* workflow      : template(工作流模板)
*
* require       : x.js, x.net.js, x.workflow.js
*/
x.workflow.template = {

    /*#region 函数:create(options)*/
    /**
    * 新建模板
    */
    create: function(options)
    {
        x.net.xhr('/api/workflow.template.create.aspx?type=' + options.type, { callback: options.callback });
    },
    /*#endregion*/

    /*#region 函数:confirmCopy(options)*/
    /**
    * 复制模板
    */
    confirmCopy: function(options)
    {
        x.net.xhr('/api/workflow.template.copy.aspx?id=' + options.id, { callback: options.callback });
    },
    /*#endregion*/

    /*#region 函数:confirmDelete(options)*/
    /**
    * 删除模板
    */
    confirmDelete: function(options)
    {
        if(options.ids !== null && confirm("确定删除？"))
        {
            x.net.xhr('/api/workflow.template.delete.aspx?ids=' + options.ids, { callback: options.callback });
        }
    },
    /*#endregion*/

    /*#region 函数:download(options)*/
    /**
    * 获取模板信息
    */
    download: function(options)
    {
        var toolbar = (typeof (options.toolbar) === 'undefined') ? '' : options.toolbar;

        var outString = '<?xml version="1.0" encoding="utf-8" ?>';

        outString += '<request>';
        // outString += '<action><![CDATA[' + options.action + ']]></action>';
        if(typeof (options.id) !== 'undefined')
        {
            outString += '<id><![CDATA[' + options.id + ']]></id>';
        }
        if(typeof (options.nodeId) !== 'undefined')
        {
            outString += '<nodeId><![CDATA[' + options.nodeId + ']]></nodeId>';
        }
        if(typeof (options.fectchExpectedActors) !== 'undefined')
        {
            outString += '<fectchExpectedActors><![CDATA[' + options.fectchExpectedActors + ']]></fectchExpectedActors>';
        }
        if(typeof (options.fectchFinishedActors) !== 'undefined')
        {
            outString += '<fectchFinishedActors><![CDATA[' + options.fectchFinishedActors + ']]></fectchFinishedActors>';
        }
        if(typeof (options.corporationId) !== 'undefined')
        {
            outString += '<corporationId><![CDATA[' + options.corporationId + ']]></corporationId>';
        }
        if(typeof (options.projectId) !== 'undefined')
        {
            outString += '<projectId><![CDATA[' + options.projectId + ']]></projectId>';
        }
        outString += '</request>';

        $('#workflow-template-toolbar').prepend(toolbar);

        x.net.xhr(options.url, outString, {
            waitingType: 'mini',
            waitingMessage: i18n.net.waiting.queryTipText,
            callback: function(response)
            {
                var outString = '';

                var template = x.toJSON(response).data;

                // -------------------------------------------------------
                // 设置流程模板属性
                // -------------------------------------------------------

                // 字段 corporationId, projectId, startActorId, startActorName, startRoleId, startRoleName 用于计算预计执行人
                outString += '<input id="workflow-template-id" name="workflow-template-id" type="hidden" value="' + template.id + '" />';
                outString += '<input id="workflow-template-corporationIds" name="workflow-template-corporationIds" type="hidden" value="" />';
                outString += '<input id="workflow-template-projectIds" name="workflow-template-projectIds" type="hidden" value="" />';
                outString += '<input id="workflow-template-startActorId" name="workflow-template-startActorId" type="hidden" value="' + template.startActorId + '" />';
                outString += '<input id="workflow-template-startActorName" name="workflow-template-startActorName" type="hidden" value="' + template.startActorName + '" />';
                outString += '<input id="workflow-template-startRoleId" name="workflow-template-startRoleId" type="hidden" value="' + template.startRoleId + '" />';
                outString += '<input id="workflow-template-startRoleName" name="workflow-template-startRoleName" type="hidden" value="' + template.startRoleName + '" />';
                outString += '<input id="workflow-template-name" name="workflow-template-name" type="hidden" value="' + template.name + '" />';
                outString += '<input id="workflow-template-type" name="workflow-template-type" type="hidden" value="' + template.type + '" />';
                outString += '<input id="workflow-template-tags" name="workflow-template-tags" type="hidden" value="' + template.tags + '" />';
                outString += '<input id="workflow-template-entitySchemaName" name="workflow-template-entitySchemaName" type="hidden" value="' + template.entitySchemaName + '" />';
                outString += '<input id="workflow-template-entityMetaData" name="workflow-template-entityMetaData" type="hidden" value="' + template.entityMetaData + '" />';
                outString += '<input id="workflow-template-entityClass" name="workflow-template-entityClass" type="hidden" value="' + template.entityClass + '" />';
                outString += '<input id="workflow-template-viewer" name="workflow-template-viewer" type="hidden" value="' + template.viewer + '" />';
                outString += '<input id="workflow-template-policy" name="workflow-template-policy" type="hidden" value="' + x.encoding.html.encode(template.policy) + '" />';
                outString += '<input id="workflow-template-config" name="workflow-template-config" type="hidden" value="' + x.encoding.html.encode(template.config) + '" />';
                outString += '<input id="workflow-template-remark" name="workflow-template-remark" type="hidden" value="' + x.encoding.html.encode(template.remark) + '" />';
                outString += '<input id="workflow-template-disabled" name="workflow-template-disabled" type="hidden" value="' + template.disabled + '" />';
                outString += '<input id="workflow-template-orderId" name="workflow-template-orderId" type="hidden" value="' + template.orderId + '" />';
                outString += '<input id="workflow-template-updateDate" name="workflow-template-updateDate" type="hidden" value="' + template.updateDateView + '" />';

                if(x.dom('#workflow-displayCompactTemplate').val() === '1')
                {
                    outString += '<table class="table-style" style="width:100%;" >';
                }
                else
                {
                    outString += '<table class="table-style border-4" style="width:100%" >';
                    outString += '<tr id="workflowTemplateHeaderRow" >';
                    outString += '<td class="table-header" >';
                    outString += '<div class="float-right" >';
                    outString += x.workflow.designtime.templateToolbar;
                    outString += '</div>';
                    outString += '流程[<span id="templateName">' + template.name + '</span>]<div class="clear"></div>';
                    outString += '</td>';
                    outString += '</tr>';
                }

                outString += '<tr>';
                outString += '<td class="table-body" >';

                // 节点 节点名 执行人 执行方式 跳转  编辑 上移 下移
                outString += '<table id="workflow_container" class="table-style" style="width:100%" >';

                // 起始节点
                outString += '<tr id="workflowTemplateTitleRow" class="table-row-title" >';
                outString += '<td style="width:40px;" title="节点" >&nbsp;</td>';
                outString += '<td style="width:100px;" >节点名</td>';
                outString += '<td >执行人</td>';
                outString += '<td style="width:80px;" title="下一步骤" ><i class="fa fa-random"></i></td>';
                outString += '<td style="width:60px;" title="执行方式" ><i class="fa fa-users"></i></td>';
                outString += '<td style="width:40px;" title="时限" ><i class="fa fa-clock-o"></i></td>';
                outString += '<td style="width:30px;" title="编辑" ><i class="fa fa-edit"></i></td>';
                outString += '<td style="width:30px;" title="上移" ><i class="fa fa-arrow-up"></i></td>';
                outString += '<td style="width:30px;" title="下移" ><i class="fa fa-arrow-down"></i></td>';
                outString += '<td style="width:30px;" title="删除" ><i class="fa fa-times"></i></td>';
                outString += '</tr>';

                x.each(template.activities, function(index, node)
                {
                    if(x.dom('#workflow-displayCompactTemplate').val() === '1'
                        && (options.url.indexOf('/api/workflow.template.findOne.aspx') === -1 && x.dom('#workflow-hiddenTemplateTableFooter').val() === '1')
                        && template.activities.length === (index + 1))
                    {
                        if($('#workflow-higthlightTemplateCurrentNode').val() === '1')
                        {
                            outString += '<tr id="' + node.id + '" class="table-row-normal-transparent workflow-node ' + ((node.status === 1) ? 'workflow-node-current' : '') + '" style="background-color:#fcffca;" >';
                        }
                        else
                        {
                            outString += '<tr id="' + node.id + '" class="table-row-normal-transparent workflow-node ' + ((node.status === 1) ? 'workflow-node-current' : '') + '" >';
                        }
                    }
                    else
                    {
                        if($('#workflow-higthlightTemplateCurrentNode').val() === '1')
                        {
                            outString += '<tr id="' + node.id + '" class="table-row-normal workflow-node ' + ((node.status === 1) ? 'workflow-node-current' : '') + '" style="background-color:#fcffca;" >';
                        }
                        else
                        {
                            outString += '<tr id="' + node.id + '" class="table-row-normal workflow-node ' + ((node.status === 1) ? 'workflow-node-current' : '') + '" >';
                        }
                    }

                    outString += "<td></td>";
                    outString += '<td>';
                    outString += '<span id="' + node.id + '_nodeName" >' + node.name + '</span>';
                    outString += '<input id="' + node.id + '_id" type="hidden" value="' + x.isUndefined(node.id, '') + '" />';
                    outString += '<input id="' + node.id + '_name" type="hidden" value="' + x.isUndefined(node.name, '') + '" />';
                    outString += '<input id="' + node.id + '_type" type="hidden" value="' + x.isUndefined(node.type, '') + '" />';
                    outString += '<input id="' + node.id + '_actorScope" type="hidden" value="' + x.isUndefined(node.actorScope, '') + '" />';
                    outString += '<input id="' + node.id + '_actorDescription" type="hidden" value="' + x.isUndefined(node.actorDescription, '') + '" />';
                    outString += '<input id="' + node.id + '_actorCounter" type="hidden" value="' + x.isUndefined(node.actorCounter, '') + '" />';
                    outString += '<input id="' + node.id + '_actorMethod" type="hidden" value="' + x.isUndefined(node.actorMethod, '') + '" />';
                    outString += '<input id="' + node.id + '_editor" type="hidden" value="' + x.isUndefined(node.editor, '') + '" />';
                    outString += '<input id="' + node.id + '_handler" type="hidden" value="' + x.isUndefined(node.handler, '') + '" />';
                    outString += '<input id="' + node.id + '_backNodes" type="hidden" value="' + x.isUndefined(node.backNodes, '') + '" />';
                    outString += '<input id="' + node.id + '_forwardNodes" type="hidden" value="' + x.isUndefined(node.forwardNodes, '') + '" />';
                    outString += '<input id="' + node.id + '_commissionActors" type="hidden" value="' + x.isUndefined(node.commissionActors, '') + '" />';
                    outString += '<input id="' + node.id + '_timelimit" type="hidden" value="' + x.isUndefined(node.timelimit, '') + '" />';
                    outString += '<input id="' + node.id + '_filterActors" type="hidden" value="' + x.isUndefined(node.filterActors, '') + '" />';
                    outString += '<input id="' + node.id + '_sendAlertTask" type="hidden" value="' + x.isUndefined(node.sendAlertTask, '') + '" />';
                    outString += '<input id="' + node.id + '_policy" type="hidden" value="' + (x.isUndefined(node.policy) ? '' : x.encoding.html.encode(node.policy)) + '" />';
                    outString += '<input id="' + node.id + '_remark" type="hidden" value="' + (x.isUndefined(node.remark) ? '' : x.encoding.html.encode(node.remark)) + '" />';
                    outString += '<input id="' + node.id + '_status" type="hidden" value="' + x.isUndefined(node.status, '') + '" />';
                    outString += '<input id="' + node.id + '_positionX" type="hidden" value="' + x.isUndefined(node.positionX, '') + '" />';
                    outString += '<input id="' + node.id + '_positionY" type="hidden" value="' + x.isUndefined(node.positionY, '') + '" />';
                    outString += '<input id="' + node.id + '_repeatDirection" type="hidden" value="' + x.isUndefined(node.repeatDirection, '') + '" />';
                    outString += '<input id="' + node.id + '_zIndex" type="hidden" value="' + x.isUndefined(node.zIndex, '0') + '" />';
                    outString += '<input id="' + node.id + '_canEdit" type="hidden" value="' + x.isUndefined(node.canEdit, '0') + '" />';
                    outString += '<input id="' + node.id + '_canMove" type="hidden" value="' + x.isUndefined(node.canMove, '0') + '" />';
                    outString += '<input id="' + node.id + '_canDelete" type="hidden" value="' + x.isUndefined(node.canDelete, '0') + '" />';
                    outString += '<input id="' + node.id + '_canUploadFile" type="hidden" value="' + x.isUndefined(node.canUploadFile, '0') + '" />';
                    outString += '<input id="' + node.id + '_radiation" type="hidden" value="' + (typeof (node.switcher) === 'undefined' || typeof (node.switcher.radiation) === 'undefined' ? '0' : node.switcher.radiation) + '" />';
                    outString += '<input id="' + node.id + '_exits" type="hidden" value="' + (typeof (node.switcher) === 'undefined' || typeof (node.switcher.exits) === 'undefined' ? '[]' : x.encoding.html.encode(node.switcher.exits)) + '" />';
                    // outString += '<input id="' + node.id + '_exits" type="hidden" value="' + (typeof (node.switcher) === 'undefined' || typeof (node.switcher.exits) === 'undefined' ? '[]' : x.workflow.switcherExit.toSwitcherExitConditionText(node.switcher.exits)) + '" />';

                    outString += '</td>';
                    outString += '<td>';
                    outString += "<span id=\"" + node.id + "_actorDescription\" >" + (typeof (node.actorDescription) === 'undefined' ? '' : node.actorDescription) + "</span>";

                    if(node.expectedActors === '')
                    {
                        outString += '<span id="' + node.id + '_expectedActors" class="ajax-workflow-node-expected-actors-notfound" >(<label>未找到预计执行人.</label>)</span>';
                    }
                    else
                    {
                        outString += '<span id="' + node.id + '_expectedActors" class="ajax-workflow-node-expected-actors" >(<label><strong>预计执行人:</strong>' + (typeof (node.expectedActors) === 'undefined' ? '' : node.expectedActors) + '</label>)</span>';
                    }

                    outString += "</td>";
                    // 下一步骤
                    outString += '<td></td>';
                    // 执行方式
                    outString += "<td>" + x.isUndefined(node.actorMethod, '并审') + "</td>";
                    // 时限
                    outString += "<td>" + x.isUndefined(node.timelimit, '0') + "</td>";
                    // 编辑
                    outString += "<td><a href=\"#\" >编辑</a></td>";
                    // 移动
                    outString += "<td><a href=\"#\" >上移</a></td>";
                    outString += "<td><a href=\"#\" >下移</a></td>";
                    // 删除
                    outString += "<td><a href=\"#\" >删除</a></td>";
                    outString += "</tr>";
                });

                if(options.url.indexOf('/api/workflow.template.findOne.aspx') > -1 || x.dom('#workflow-hiddenTemplateTableFooter').val() !== '1')
                {
                    outString += '<tr class="table-row-normal-transparent workflow-node-new" >';
                    outString += '<td colspan="6" style="text-align:left;" >';
                    // 只有流程模板允许修改发起角色，流程实例不允许修改角色
                    if(options.url.indexOf('/api/workflow.template.findOne.aspx') > -1)
                    {
                        outString += '<span style="padding:0 4px 0 0; font-weight:bold;" >发起角色:</span>';
                        outString += '<span id="workflow-template-startRoleText" style="padding:0 8px 0 0;" >' + template.startRoleName + '</span>';
                        outString += '<a href="javascript:x.workflow.instance.actor.getStartRoleWizard(\'' + template.startActorId + '\');" >编辑</a>';
                    }
                    outString += '</td>';
                    outString += '<td colspan="4" style="text-align:right;" >';
                    if(x.dom('#workflow-hiddenTemplateTableFooter').val() !== '1')
                    {
                        outString += '<a href=\"javascript:x.workflow.node.create();\" >新增节点</a>';
                    }
                    outString += '</td>';
                    outString += '</tr>';
                }

                outString += '</table>';
                outString += '</td>';
                outString += '</tr>';

                // 精简模式
                if(x.dom('#workflow-displayCompactTemplate').val() === '1')
                {
                    outString += '</table>';
                }
                else
                {
                    outString += '<tr id="workflowTemplateFooterRow" ><td class="table-footer" ><img src="/resources/images/transparent.gif" alt="" style="height:18px" /></td></tr></table>';
                }

                $(options.container).html(outString);

                x.dom.features.bind();

                x.workflow.template.setTemplateObject(template);

                x.workflow.template.setTemplateEntityMetaData(template.entityClass);

                x.workflow.node.sync();

                if(typeof (options.callback) !== 'undefined')
                {
                    options.callback();
                }
            }
        });
    },
    /*#endregion*/

    /*#region 函数:getTemplateObject()*/
    /**
    * 保存模板基本信息
    */
    getTemplateObject: function()
    {
        var outString = '';

        outString += '{';
        outString += '"id":"' + x.dom('#workflow-template-id').val() + '", ';
        outString += '"corporationIds":"' + x.dom('#workflow-template-corporationIds').val() + '", ';
        outString += '"projectIds":"' + x.dom('#workflow-template-projectIds').val() + '", ';
        outString += '"startActorId":"' + x.dom('#workflow-template-startActorId').val() + '", ';
        outString += '"startActorName":"' + x.dom('#workflow-template-startActorName').val() + '", ';
        outString += '"startRoleId":"' + x.dom('#workflow-template-startRoleId').val() + '", ';
        outString += '"startRoleName":"' + x.dom('#workflow-template-startRoleName').val() + '", ';
        outString += '"name":"' + x.dom('#workflow-template-name').val() + '", ';
        outString += '"type":"' + x.dom('#workflow-template-type').val() + '", ';
        outString += '"entitySchemaName":"' + x.dom('#workflow-template-entitySchemaName').val() + '", ';
        outString += '"entityMetaData":"' + x.dom('#workflow-template-entityMetaData').val() + '", ';
        outString += '"entityClass":"' + x.dom('#workflow-template-entityClass').val() + '", ';
        outString += '"viewer":"' + x.dom('#workflow-template-viewer').val() + '", ';
        outString += '"policy":"' + x.encoding.html.encode(x.dom('#workflow-template-policy').val()) + '", ';
        outString += '"config":"' + x.encoding.html.encode(x.dom('#workflow-template-config').val()) + '", ';
        outString += '"remark":"' + x.encoding.html.encode(x.dom('#workflow-template-remark').val()) + '", ';
        outString += '"disabled":"' + x.dom('#workflow-template-disabled').val() + '" ';
        outString += '}';

        return x.toJSON(outString);
    },
    /*#endregion*/

    /*#region 函数:setTemplateObject(template)*/
    /**
    * 加载模板基本信息
    */
    setTemplateObject: function(template)
    {
        x.dom('#workflow-template-id').val(template.id);
        x.dom('#workflow-template-name').val(template.name);
        x.dom('#workflow-template-type').val(template.type);
        x.dom('#workflow-template-entityClass').val(template.entityClass);
        x.dom('#workflow-template-viewer').val(template.viewer);
        x.dom('#workflow-template-policy').val(x.encoding.html.decode(template.policy));
        x.dom('#workflow-template-config').val(x.encoding.html.decode(template.config));
        x.dom('#workflow-template-remark').val(x.encoding.html.decode(template.remark));
        x.dom('#workflow-template-disabled').val(template.disabled);
    },
    /*#endregion*/

    /*#region 函数:setTemplateCorporationIds(corporationIds)*/
    /**
    * 设置工作流模板所属的公司标识信息
    */
    setTemplateCorporationIds: function(corporationIds)
    {
        x.dom('#workflow-template-corporationIds').val(corporationIds);
    },
    /*#endregion*/

    /*#region 函数:setTemplateProjectIds(projectIds)*/
    /**
    * 设置工作流模板所属的项目标识信息
    */
    setTemplateProjectIds: function(projectIds)
    {
        x.dom('#workflow-template-projectIds').val(projectIds);
    },
    /*#endregion*/

    /*#region 函数:setTemplateEntityMetaData(entityClassName, entitySchemaName)*/
    /**
    * 设置业务实体元数据信息
    */
    setTemplateEntityMetaData: function(entityClassName, entitySchemaName)
    {
        x.dom('#workflow-template-entityClass').val(entityClassName);

        if(typeof (entitySchemaName) === 'undefined')
        {
            x.dom('#workflow-template-entitySchemaName').val(entitySchemaName);
        }

        x.net.xhr('/api/kernel.entities.metaData.findAllByEntityClassName.aspx?entityClassName=' + entityClassName, '', {
            callback: function(response)
            {
                var outString = '';

                var list = x.toJSON(response).data;

                x.each(list, function(index, node)
                {
                    outString += node.fieldName + ',';
                    // x.debug.log(index + node.fieldName);
                });

                if(outString.substr(outString.length - 1, 1) === ',')
                {
                    outString = outString.substr(0, outString.length - 1);
                }

                document.getElementById('workflow-template-entityMetaData').value = outString;
            }
        });
    },
    /*#endregion*/

    /*#region 函数:getTemplategetInternalMetaData(entityClassName, entitySchemaName)*/
    /**
    * 获取配置信息中内置的实体元数据信息
    */
    getTemplategetInternalMetaData: function()
    {
        var text = x.dom('#workflow-template-config').val();

        if(text == '') { return []; }

        var config = x.toJSON(text);

        return typeof (config.metaData) == 'undefined' ? [] : config.metaData;
    },
    /*#endregion*/

    /*#region 函数:verify()*/
    /*
    * 验证
    */
    verify: function()
    {
        var settings = x.workflow.settings;

        var nodes = $(settings.workflowNodeSelector);

        var hasNodeObject = false;

        for(var i = 0;i < nodes.length;i++)
        {
            var text = nodes[i].childNodes[1].childNodes[nodes[i].childNodes[1].childNodes.length - 1].value;

            if(text !== '')
            {
                var list = x.toJSON(text);

                for(var j = 0;j < list.length;j++)
                {
                    hasNodeObject = false;

                    for(var k = 0;k < nodes.length;k++)
                    {
                        if(list[j].toNodeId === nodes[i].childNodes[1].childNodes[1].value)
                        {
                            hasNodeObject = true;
                        }
                    }
                }
            }
        }
    },
    /*#endregion*/

    /*#region 函数:serialize()*/
    serialize: function()
    {
        var outString = '<?xml version="1.0" encoding="utf-8"?>\r\n';

        var settings = x.workflow.settings;

        var nodes = $(settings.workflowNodeSelector);

        outString += '<workflow ' + x.workflow.template.serializeTemplateAttributes(x.workflow.template.getTemplateObject()) + ' >';

        // -------------------------------------------------------
        // verify
        // -------------------------------------------------------

        x.workflow.template.verify();

        // -------------------------------------------------------
        // designtime
        // -------------------------------------------------------

        outString += x.workflow.template.serializeDesigntimeXml(nodes);

        // -------------------------------------------------------
        // runtime
        // -------------------------------------------------------

        outString += x.workflow.template.serializeRuntimeXml(nodes);

        outString += '</workflow>';

        return outString;
    },
    /*#endregion*/

    /*#region 函数:serializeTemplateAttributes(template, options)*/
    /**
    * 序列化设计时Xml模板属性文本
    */
    serializeTemplateAttributes: function(template, options)
    {
        var outString = 'id="' + template.id + '" '
                + 'startActorId="' + template.startActorId + '" '
                + 'startActorName="' + template.startActorName + '" '
                + 'startRoleId="' + template.startRoleId + '" '
                + 'startRoleName="' + template.startRoleName + '" '
                + 'name="' + template.name + '" '
                + 'type="' + template.type + '" '
                + 'entitySchemaName="' + (typeof (template.entitySchemaName) === 'undefined' ? '' : template.entitySchemaName) + '" '
                + 'entityMetaData="' + (typeof (template.entityMetaData) === 'undefined' ? '' : template.entityMetaData) + '" '
                + 'entityClass="' + (typeof (template.entityClass) === 'undefined' ? '' : template.entityClass) + '" '
                + 'viewer="' + (typeof (template.viewer) === 'undefined' ? '' : x.encoding.html.encode(template.viewer)) + '" '
                + 'policy="' + (typeof (template.policy) === 'undefined' ? '' : template.policy) + '" '
                + 'config="' + (typeof (template.config) === 'undefined' ? '' : template.config) + '" '
                + 'remark="' + (typeof (template.remark) === 'undefined' ? '' : template.remark) + '" '
                + 'disabled="' + (typeof (template.disabled) === 'undefined' ? '' : template.disabled) + '" ';

        return outString;
    },
    /*#endregion*/

    /*#region 函数:serializeDesigntimeXml(nodes, options)*/
    /**
    * 序列化设计时Xml模板文本
    */
    serializeDesigntimeXml: function(nodes, options)
    {
        var pointX = 30;
        var pointY = 200;
        // 节点索引
        var nodeIndex = 1;
        // 节点Z轴索引
        var nodeZIndex = 1;
        // 节点间隔
        var nodeSpace = 150;
        // 开始节点偏移量
        var startNodeOffset = 75;
        // 结束节点偏移量
        var terminatNodeOffset = -15;

        var outString = '<designtime>';

        nodes.each(function(index, node)
        {
            if(nodeIndex < nodes.length)
            {
                // nodeIndex === 1 为开始节点
                outString += x.workflow.template.serializeDesigntimeActivityXml(node, {
                    index: index,
                    type: (nodeIndex === 1) ? 'starter' : node.childNodes[1].childNodes[3].value,
                    idPrefix: (nodeIndex === 1) ? 'sn_' : 'nn_',
                    positionX: (nodeIndex === 1) ? (pointX - 42 + startNodeOffset) : (pointX + nodeSpace * (nodeIndex - 1) + 10),
                    positionY: (pointY - 15),
                    zIndex: nodeZIndex++
                });

                if(node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1].value === "[]")
                {
                    outString += x.workflow.template.serializeDesigntimeRuleXml(node, {
                        index: nodeIndex,
                        type: 'straightline',
                        beginActivityId: node.childNodes[1].childNodes[1].value,
                        beginActivityName: node.childNodes[1].childNodes[2].value,
                        endActivityId: nodes[index + 1].childNodes[1].childNodes[1].value,
                        endActivityName: nodes[index + 1].childNodes[1].childNodes[2].value,
                        beginPointX: (pointX + startNodeOffset),
                        beginPointY: pointY,
                        endPointX: (pointX + nodeSpace),
                        endPointY: pointY,
                        zIndex: nodeZIndex++
                    });
                }
                else
                {
                    exits = x.toJSON(node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1].value);

                    x.each(exits, function(exitIndex, exit)
                    {
                        outString += x.workflow.template.serializeDesigntimeRuleXml(node, {
                            index: nodeIndex + '_' + (exitIndex + 1),
                            type: 'foldline',
                            condition: exit.friendlyCondition,
                            beginActivityId: node.childNodes[1].childNodes[1].value,
                            beginActivityName: node.childNodes[1].childNodes[2].value,
                            endActivityId: exit.toNodeId,
                            endActivityName: x.workflow.node.attribute(exit.toNodeId, 'name'),
                            beginPointX: (pointX + startNodeOffset),
                            beginPointY: pointY,
                            endPointX: (pointX + nodeSpace),
                            endPointY: pointY,
                            zIndex: nodeZIndex++
                        });
                    });
                }
                nodeIndex++;
            }
            else
            {
                outString += x.workflow.template.serializeDesigntimeActivityXml(node, {
                    index: index,
                    type: 'terminator',
                    idPrefix: 'en_',
                    positionX: (pointX + nodeSpace * (nodeIndex - 1) + terminatNodeOffset),
                    positionY: (pointY - 15),
                    zIndex: nodeZIndex
                });
            }
        });

        outString += '</designtime>';

        return outString;
    },
    /*#endregion*/

    /*#region 函数:serializeDesigntimeActivityXml(node, options)*/
    /**
    * 序列化设计时工作流节点
    */
    serializeDesigntimeActivityXml: function(node, options)
    {
        var outString = '<activity id="' + (options.type === 'starter' ? 'sn_0' : (options.idPrefix + options.index)) + '" '
                + 'name="' + node.childNodes[1].childNodes[2].value + '" '
                + 'type="' + options.type + '" '
                + 'actorScope="' + (options.type === 'starter' ? 'initiator#00000000-0000-0000-0000-000000000000' : node.childNodes[1].childNodes[4].value) + '" '
                + 'actorDescription="' + (options.type === 'starter' ? '流程发起人' : node.childNodes[1].childNodes[5].value) + '" '
                + 'actorCounter="' + (options.type === 'starter' ? '1' : node.childNodes[1].childNodes[6].value) + '" '
                + 'actorMethod="' + (options.type === 'starter' ? '提交' : node.childNodes[1].childNodes[7].value) + '" '
                + 'editor="' + node.childNodes[1].childNodes[8].value + '" '
                + 'handler="' + node.childNodes[1].childNodes[9].value + '" '
                + 'backNodes="' + node.childNodes[1].childNodes[10].value + '" '
                + 'forwardNodes="' + node.childNodes[1].childNodes[11].value + '" '
                + 'commissionActors="' + node.childNodes[1].childNodes[12].value + '" '
                + 'timelimit="' + node.childNodes[1].childNodes[13].value + '" '
                + 'filterActors="' + node.childNodes[1].childNodes[14].value + '" '
                + 'sendAlertTask="' + node.childNodes[1].childNodes[15].value + '" '
                + 'policy="' + x.string.trim(JSON.stringify(node.childNodes[1].childNodes[16].value).replace(/"/g, '##'), '##') + '" '
                + 'remark="' + node.childNodes[1].childNodes[17].value + '" '
                + 'status="' + node.childNodes[1].childNodes[18].value + '" '
                + 'positionX="' + options.positionX + '" '
                + 'positionY="' + options.positionY + '" '
                + 'repeatDirection="' + node.childNodes[1].childNodes[21].value + '" '
                + 'zIndex="' + options.zIndex + '" '
                + 'canEdit="' + node.childNodes[1].childNodes[23].value + '" '
                + 'canMove="' + node.childNodes[1].childNodes[24].value + '" '
                + 'canDelete="' + node.childNodes[1].childNodes[25].value + '" '
                + 'canUploadFile="' + node.childNodes[1].childNodes[26].value + '" '
                + 'radiation="' + node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 2].value + '" />';

        return outString;
    },
    /*#endregion*/

    /*#region 函数:serializeDesigntimeRuleXml(node, options)*/
    /**
    * 序列化设计时工作流规则
    */
    serializeDesigntimeRuleXml: function(node, options)
    {
        return '<rule id="rule_' + options.index + '" '
                + 'name="规则' + options.index + '" '
                + 'type="' + options.type + '" '
                + 'condition="' + options.condition + '" '
                + 'beginActivityId="' + options.beginActivityId + '" '
                + 'beginActivityName="' + options.beginActivityName + '" '
                + 'endActivityId="' + options.endActivityId + '" '
                + 'endActivityName="' + options.endActivityName + '" '
                + 'beginPointX="' + options.beginPointX + '" '
                + 'beginPointY="' + options.beginPointY + '" '
                + 'endPointX="' + options.endPointX + '" '
                + 'endPointY="' + options.endPointY + '" '
                + 'turnPoint1X="' + (options.type === 'straightline' ? 0 : options.turnPoint1X) + '" '
                + 'turnPoint1Y="' + (options.type === 'straightline' ? 0 : options.turnPoint1Y) + '" '
                + 'turnPoint2X="' + (options.type === 'straightline' ? 0 : options.turnPoint2X) + '" '
                + 'turnPoint2Y="' + (options.type === 'straightline' ? 0 : options.turnPoint2Y) + '" '
                + 'zIndex="' + options.zIndex + '" />';
    },
    /*#endregion*/

    /*#region 函数:serializeRuntimeXml(nodes, options)*/
    /**
    * 序列化运行时模板
    */
    serializeRuntimeXml: function(nodes, options)
    {
        var outString = '<runtime>';

        // 节点索引
        var nodeIndex = 1;

        var exitToNodeIds = [];

        // 每个出口
        var nodeSwitchExitToNodeIds = [];

        nodes.each(function(index, node)
        {
            nodeSwitchExitToNodeIds[nodeIndex] = [];

            if(nodeIndex === 1)
            {
                // 普通节点
                outString += x.workflow.template.serializeRuntimeNodeXml(node, { type: 'starter', idPrefix: 'sn_', index: index });

                if(node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1].value === "[]")
                {
                    outString += x.workflow.template.serializeRuntimeRouteXml({
                        index: nodeIndex,
                        from: (index === 0 ? 'sn_' : 'nn_') + index,
                        fromType: 'node',
                        to: (nodeIndex + 1 === nodes.length ? 'en_' : 'nn_') + nodeIndex,
                        toType: 'node'
                    });
                }
                else
                {
                    // 设置分支器
                    exits = x.toJSON(node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1].value);

                    outString += x.workflow.template.serializeRuntimeRouteXml({
                        index: index + '_switcher',
                        from: (index === 0 ? 'sn_' : 'nn_') + index,
                        fromType: 'node',
                        to: 'switcher_' + nodeIndex,
                        toType: 'switcher'
                    });

                    outString += x.workflow.template.serializeRuntimeSwitcherXml(exits, {
                        index: nodeIndex,
                        radiation: 0,
                        field: '',
                        canEdit: 0,
                        canMove: 0,
                        remark: ''
                    });

                    // 设置默认路径
                    outString += x.workflow.template.serializeRuntimeRouteXml({
                        index: nodeIndex + '_1',
                        from: 'switcher_' + nodeIndex + '_exit_1',
                        fromType: 'switcher_exit',
                        to: 'nn_' + (index + 1),
                        toType: 'node'
                    });

                    x.each(exits, function(exitIndex, exit)
                    {
                        if(exitIndex > 0)
                        {
                            exitToNodeIds[exit.toNodeId] = exit.toNodeId;

                            nodeSwitchExitToNodeIds[nodeIndex][exit.toNodeId] = exit.toNodeId;

                            outString += x.workflow.template.serializeRuntimeRouteXml({
                                index: nodeIndex + '_' + (exitIndex + 1),
                                from: 'switcher_' + nodeIndex + '_exit_' + (exitIndex + 1),
                                fromType: 'switcher_exit',
                                to: 'collector_' + x.workflow.node.nodeIndex(exit.toNodeId),
                                toType: 'collector'
                            });
                        }
                    });
                }

                nodeIndex++;
            }
            else if(nodeIndex < nodes.length)
            {
                if(typeof (exitToNodeIds['nn_' + index]) !== 'undefined')
                {
                    // 设置聚合器
                    outString += x.workflow.template.serializeRuntimeCollectorXml({
                        index: index,
                        condition: true,
                        canEdit: 0,
                        remark: ''
                    });

                    outString += x.workflow.template.serializeRuntimeRouteXml({
                        index: index + '_collector',
                        from: 'collector_' + index,
                        fromType: 'collector',
                        to: 'nn_' + index,
                        toType: 'node'
                    });
                }

                // 普通节点
                outString += x.workflow.template.serializeRuntimeNodeXml(node, { type: 'node', idPrefix: 'nn_', index: index });

                if(node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1].value === "[]")
                {
                    // 设置默认路径
                    if(typeof (exitToNodeIds['nn_' + nodeIndex]) === 'undefined' && typeof (exitToNodeIds['en_' + nodeIndex]) === 'undefined')
                    {
                        outString += x.workflow.template.serializeRuntimeRouteXml({
                            index: nodeIndex,
                            from: (index === 0 ? 'sn_' : 'nn_') + index,
                            fromType: 'node',
                            to: (nodeIndex + 1 === nodes.length ? 'en_' : 'nn_') + nodeIndex,
                            toType: 'node'
                        });
                    }
                    else
                    {
                        outString += x.workflow.template.serializeRuntimeRouteXml({
                            index: nodeIndex,
                            from: (index === 0 ? 'sn_' : 'nn_') + index,
                            fromType: 'node',
                            to: 'collector_' + nodeIndex,
                            toType: 'collector'
                        });
                    }
                }
                else
                {
                    // 设置分支器
                    exits = x.toJSON(node.childNodes[1].childNodes[node.childNodes[1].childNodes.length - 1].value);

                    outString += x.workflow.template.serializeRuntimeRouteXml({
                        index: index + '_switcher',
                        from: (index === 0 ? 'sn_' : 'nn_') + index,
                        fromType: 'node',
                        to: 'switcher_' + nodeIndex,
                        toType: 'switcher'
                    });

                    outString += x.workflow.template.serializeRuntimeSwitcherXml(exits, {
                        index: nodeIndex,
                        radiation: 0,
                        field: '',
                        canEdit: 0,
                        canMove: 0,
                        remark: ''
                    });

                    // nodeSwitchExitToNodeIds[nodeIndex][exit.toNodeId] = exit.toNodeId;

                    /*
                    if(typeof (exitToNodeIds['nn_' + nodeIndex]) === 'undefined')
                    {
                        outString += x.workflow.template.serializeRuntimeRouteXml({
                            index: nodeIndex + '_1',
                            from: 'switcher_' + nodeIndex + '_exit_1',
                            fromType: 'switcher_exit',
                            to: 'nn_' + index,
                            toType: 'node'
                        });
                    }
                    else
                    {
                        outString += x.workflow.template.serializeRuntimeRouteXml({
                            index: nodeIndex + '_1',
                            from: 'switcher_' + nodeIndex + '_exit_1',
                            fromType: 'switcher_exit',
                            to: 'collector_' + index,
                            toType: 'collector'
                        });
                    }*/

                    x.each(exits, function(exitIndex, exit)
                    {
                        if(exitIndex > 0)
                        {
                            exitToNodeIds[exit.toNodeId] = exit.toNodeId;

                            outString += x.workflow.template.serializeRuntimeRouteXml({
                                index: nodeIndex + '_' + (exitIndex + 1),
                                from: 'switcher_' + nodeIndex + '_exit_' + (exitIndex + 1),
                                fromType: 'switcher_exit',
                                to: 'collector_' + x.workflow.node.nodeIndex(exit.toNodeId),
                                toType: 'collector'
                            });
                        }
                    });

                    // 设置默认路径
                    outString += x.workflow.template.serializeRuntimeRouteXml({
                        index: nodeIndex + '_1',
                        from: 'switcher_' + nodeIndex + '_exit_1',
                        fromType: 'switcher_exit',
                        to: 'nn_' + (index + 1),
                        toType: 'node'
                    });
                }

                nodeIndex++;
            }
            else
            {
                if(typeof (exitToNodeIds['en_' + index]) !== 'undefined')
                {
                    // 设置聚合器
                    outString += x.workflow.template.serializeRuntimeCollectorXml({
                        index: index,
                        condition: true,
                        canEdit: 0,
                        remark: ''
                    });

                    outString += x.workflow.template.serializeRuntimeRouteXml({
                        index: index + '_collector',
                        from: 'collector_' + index,
                        fromType: 'collector',
                        to: 'en_' + index,
                        toType: 'node'
                    });
                }

                // 结束节点
                outString += x.workflow.template.serializeRuntimeNodeXml(node, { type: 'terminator', idPrefix: 'en_', index: index });
            }
        });

        outString += '</runtime>';

        return outString;
    },
    /*#endregion*/

    /*#region 函数:serializeRuntimeNodeXml(node, options)*/
    /**
    * 序列化运行时工作流节点
    */
    serializeRuntimeNodeXml: function(node, options)
    {
        var outString = '';

        outString += '<' + options.type + ' id="' + options.idPrefix + options.index + '" '
                + 'name="' + node.childNodes[1].childNodes[2].value + '" '
                + 'remark="' + node.childNodes[1].childNodes[15].value + '" '
                + 'editor="' + node.childNodes[1].childNodes[8].value + '" '
                + 'handler="' + node.childNodes[1].childNodes[9].value + '" '
                + 'timelimit="' + node.childNodes[1].childNodes[13].value + '" '
                + 'filterActors="' + node.childNodes[1].childNodes[14].value + '" '
                + 'sendAlertTask="' + node.childNodes[1].childNodes[15].value + '" '
                + 'policy="' + x.string.trim(JSON.stringify(node.childNodes[1].childNodes[16].value).replace(/"/g, '##'), '##') + '" >';

        if(options.type == 'starter')
        {
            outString += '<actor scope="initiator" description="流程发起人" counter="1" method="提交" />';
        }
        else
        {
            outString += '<actor scope="' + node.childNodes[1].childNodes[4].value + '" description="' + node.childNodes[1].childNodes[5].value + '" counter="' + node.childNodes[1].childNodes[6].value + '" method="' + node.childNodes[1].childNodes[7].value + '" />';
        }
        outString += '<operation>';
        outString += '<back cando="' + (node.childNodes[1].childNodes[10].value === '' ? '0' : '1') + '" nodes="' + node.childNodes[1].childNodes[10].value + '" />';
        outString += '<forward cando="' + (node.childNodes[1].childNodes[11].value === '' ? '0' : '1') + '" nodes="' + node.childNodes[1].childNodes[11].value + '" />';
        outString += '<commission cando="' + (node.childNodes[1].childNodes[12].value === '' ? '0' : '1') + '" actors="' + node.childNodes[1].childNodes[12].value + '" />';
        outString += '</operation>';
        outString += '</' + options.type + '>';

        return outString;
    },
    /*#endregion*/

    /*#region 函数:serializeRuntimeRouteXml(options)*/
    /**
    * 序列化运行时工作流路由
    */
    serializeRuntimeRouteXml: function(options)
    {
        return '<route id="route_' + options.index + '" '
                + 'from="' + options.from + '" '
                + 'fromType="' + options.fromType + '" '
                + 'to="' + options.to + '" '
                + 'toType="' + options.toType + '" />';
    },
    /*#endregion*/

    /*#region 函数:serializeRuntimeSwitcherXml(exits, options)*/
    /**
    * 序列化运行时工作流路由
    */
    serializeRuntimeSwitcherXml: function(exits, options)
    {
        var outString = '<switcher id="switcher_' + options.index + '" '
                    + 'name="分支器' + options.index + '" '
                    + 'radiation="' + options.radiation + '" '
                    + 'field="' + options.field + '" '
                    + 'canEdit="' + options.canEdit + '" '
                    + 'canMove="' + options.canMove + '" '
                    + 'remark="' + options.remark + '" >';

        x.each(exits, function(exitIndex, exit)
        {
            outString += '<exit id="switcher_' + options.index + '_exit_' + (exitIndex + 1) + '" condition="' + x.workflow.switcherExit.toSwitcherExitConditionText(exit).replace(/"/g, '##') + '" />';
        });

        outString += '</switcher>';

        return outString;
    },
    /*#endregion*/

    /*#region 函数:serializeRuntimeCollectorXml(options)*/
    /**
    * 序列化运行时工作流聚合器
    */
    serializeRuntimeCollectorXml: function(options)
    {
        return '<collector id="collector_' + options.index + '" '
                + 'name="聚合' + options.index + '" '
                + 'condition="' + options.condition + '" '
                + 'canEdit="' + options.index + '" '
                + 'remark="' + options.remark + '" />';
    }
    /*#endregion*/
};