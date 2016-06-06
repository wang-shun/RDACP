
/**
 * IpfCcmStrategy
 *
 * @author 刘溪滨 (13720880048@163.com)
 * @version 1.0 @Date: 2015-11-18 上午9:10
 */
define(["types/Class",
    "utils/Log",
    "jquery",
    "base/BaseRouter",
    "base/BaseView",
    "grid/simplelist",
    "grid/SimpleListUtil",
    "rpc/AjaxEngine"
], function(Class, Log, $, BaseRouter, BaseView, SimpleListView, SimpleListUtil, 
		AjaxEngine){    
	
    
    function showEditDetilDialog(tp, titles, id, url, content, height){
    	var kendoUIWindow = SimpleListUtil.showkdDialog(id, content, 350, height, titles);
        
    	
        
        

        if (tp==1){
        $("#submitBtn").click(function(){    	
        $("#submitBtn").attr("disabled", true);
            new AjaxEngine(url,
                {
                    async: false,                              
                    data:{id: $("#id").val(),strategyType: $("#strategyType").val(),strategyCode: $("#strategyCode").val(),strategyName: $("#strategyName").val(),strategyDes: $("#strategyDes").val(),drlFile: $("#drlFile").val(),drlRoute: $("#drlRoute").val(),packageName: $("#packageName").val(),ruleNo: $("#ruleNo").val(),ruleType: $("#ruleType").val(),sourceCode: $("#sourceCode").val(),svnRevision: $("#svnRevision").val()},
                    dataType: 'json',
                    complete: function(transport){
                        result = transport.responseText;
                        result = $.parseJSON(result);
                        alert("操作成功！");
                        kendoUIWindow.close();
                        var table0=$("#simplelist_list").data("kendoGrid");
                        table0.dataSource.read();
                        table0.refresh();
                        $("#submitBtn").attr("disabled", false);
                    }
                }
            );
        });
    	} else{
        $("#QueryBtn").click(function(){
            $("#QueryBtn").attr("disabled", true);
            new AjaxEngine(url,
                {
                    async: false,
                    data:{id: $("#id").val(),strategyType: $("#strategyType").val(),strategyCode: $("#strategyCode").val(),strategyName: $("#strategyName").val(),strategyDes: $("#strategyDes").val(),drlFile: $("#drlFile").val(),drlRoute: $("#drlRoute").val(),packageName: $("#packageName").val(),ruleNo: $("#ruleNo").val(),ruleType: $("#ruleType").val(),sourceCode: $("#sourceCode").val(),svnRevision: $("#svnRevision").val()},
                    dataType: 'json',
                    complete: function(transport){
                        var result = transport.responseText;
                        result = $.parseJSON(result);


                        if($.isArray(result.resultJson)){
                            var data = null;
                            for(var i= 0, count=result.resultJson.length; i<count; i++){
                                data = result.resultJson[i];

        						
        						
                            }
                        }

                        var table0=$("#simplelist_list").data("kendoGrid");
                        table0.dataSource.data([]);
                        table0.dataSource.data(result.resultJson);
                        $("#QueryBtn").attr("disabled", false);
                        kendoUIWindow.close();
                    }
                }
            );
        });
    	}
        SimpleListUtil.setDataTimeCn();

        
    }
    
    var PlatformIpfCcmStrategyManageRouter = BaseRouter.extend({
        routes: {
            "basic_manage/platform_IpfCcmStrategy_manage": "showPlatformIpfCcmStrategyManageList",  
            "basic_manage/platform_ckIpfCcmStrategy_manage": "showPlatformckIpfCcmStrategyManageList"
        },
        showPlatformckIpfCcmStrategyManageList: function(){
            $("#Submit").click(function(){
                var sid=SimpleListUtil.getSessionId();
                if (SimpleListUtil.cklogin(sid)=="1"){
                	SimpleListUtil.addSession(sid);
                } else {
                	SimpleListUtil.removeSession(sid);
                }
            });
        },
        showPlatformIpfCcmStrategyManageList: function(){
            //var sid=SimpleListUtil.getSessionId();
            //SimpleListUtil.ckSession(sid);            
            var platformIpfCcmStrategyManageListView = new SimpleListView({
                id: "platform_ipfCcmStrategy_manage_list",
                title: "基础管理 > IpfCcmStrategy",
                buttonCount:3,

                ready: function(){
                    this.setSimpleListHeader("IpfCcmStrategy");
                    this.addToolbarBtn("addBtn", "新 增", function(){
                        var detailstr="";
                        detailstr+="<div id='content' align='center'>";
                        detailstr+="<table>";       
                        detailstr+="<input id='id' name='主键' hidden='true' style='...'/>";                          
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyType' align='right'>策略类别：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyType' name='策略类别' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyCode' align='right'>策略编码：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyCode' name='策略编码' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyName' align='right'>策略名称：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyName' name='策略名称' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyDes' align='right'>策略描述：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyDes' name='策略描述' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='ldrlFile' align='right'>DRL文件：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='drlFile' name='DRL文件' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='ldrlRoute' align='right'>DRL路径：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='drlRoute' name='DRL路径' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lpackageName' align='right'>包名：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='packageName' name='包名' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lruleNo' align='right'>规则号：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='ruleNo' name='规则号' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lruleType' align='right'>规则类型：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='ruleType' name='规则类型' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lsourceCode' align='right'>源代码：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='sourceCode' name='源代码' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lsvnRevision' align='right'>SVN版本：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='svnRevision' name='SVN版本' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="</table>";
                        detailstr+="</div>";
                        detailstr+="<div align='center'>";
                        detailstr+="<input id='submitBtn'  name='submitBtn' type='button' value='保 存' />";
                        detailstr+="</div>";
                        showEditDetilDialog(1,"新增","0" ,"router?appKey=000001&method=ipfCcmStrategy.createIpfCcmStrategy&v=1.0&format=json",$(detailstr),370);
                        dialogId = null;
                    }, "add");
                    this.addToolbarBtn("deleteBtn", "删 除",function(){
                        var rowCount = platformIpfCcmStrategyManageListView.getGridObject().select().length;
                        if (rowCount>0){
                        for(var i=0; i<rowCount; i++){
                            rowEl = platformIpfCcmStrategyManageListView.getGridObject().select().get(i);
                            var ID = SimpleListUtil.getColumnValue(platformIpfCcmStrategyManageListView.getGridObject(),rowEl, "id");
                            new AjaxEngine("router?appKey=000001&method=ipfCcmStrategy.deleteIpfCcmStrategy&v=1.0&format=json",
                            {
                                async: false,
                                data:{id: ID},
                                dataType: 'json',
                                complete: function(transport){
                                    result = transport.responseText;
                                    result = $.parseJSON(result);
                                	}
                            	}
                            );
                        }
                        alert("删除成功！");
                        var table0=$("#simplelist_list").data("kendoGrid");
                        table0.dataSource.read();
                        table0.refresh();
                        } else {
                            alert("请先选择记录！");
                        }
                    }, "delete");
                    this.addToolbarBtn("queryBtn", "查 询", function(){
                        var detailstr="";
                        detailstr+="<div id='content' align='center'>";
                        detailstr+="<table>";
                        detailstr+="<input id='id' name='主键' hidden='true' style='...'/>";                          
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyType' align='right'>策略类别：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyType' name='策略类别' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyCode' align='right'>策略编码：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyCode' name='策略编码' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyName' align='right'>策略名称：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyName' name='策略名称' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lstrategyDes' align='right'>策略描述：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='strategyDes' name='策略描述' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='ldrlFile' align='right'>DRL文件：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='drlFile' name='DRL文件' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='ldrlRoute' align='right'>DRL路径：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='drlRoute' name='DRL路径' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lpackageName' align='right'>包名：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='packageName' name='包名' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lruleNo' align='right'>规则号：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='ruleNo' name='规则号' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lruleType' align='right'>规则类型：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='ruleType' name='规则类型' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lsourceCode' align='right'>源代码：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='sourceCode' name='源代码' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lsvnRevision' align='right'>SVN版本：</label>";
                        detailstr+="</td><td>";
                		detailstr+="<input id='svnRevision' name='SVN版本' style='...'/>";
                        detailstr+="</td></tr>";                        
                        detailstr+="</table>";
                        detailstr+="</div>";
                        detailstr+="<div align='center'>";
                        detailstr+="<input id='QueryBtn'  name='QueryBtn' type='button' value='查 询'  />";
                        detailstr+="</div>";
                        showEditDetilDialog(2,"查询","2" ,"router?appKey=000001&method=ipfCcmStrategy.selectIpfCcmStrategy&v=1.0&format=json",$(detailstr),370);
                        dialogId = null;
                    }, "filter");
                },

                dataSource: {
                    serverPaging: false,
                    transport: {
                        read: {
                            url: "router?appKey=000001&method=ipfCcmStrategy.selectIpfCcmStrategy&v=1.0&format=json"
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                        		id: { type: "string" },strategyType: { type: "string" },strategyCode: { type: "string" },strategyName: { type: "string" },strategyDes: { type: "string" },drlFile: { type: "string" },drlRoute: { type: "string" },packageName: { type: "string" },ruleNo: { type: "string" },ruleType: { type: "string" },sourceCode: { type: "string" },svnRevision: { type: "string" }
                            }
                        },
                        parse: function(response) {
                            return response;
                        },
                        //返回的数据
                        data: function(response) {
                            var result = response["resultJson"];
                            if($.isArray(result)){
                                var data = null;
                                for(var i= 0, count=result.length; i<count; i++){
                                    data = result[i];
                                }
                            }
                            result = platformIpfCcmStrategyManageListView.appendColValue(result);
                            return result;
                        },
                        //记录条数
                        total: function(response) {
                            var result = response["total"] || response["resultJson"].length;
                            return result;
                        }
                    }
                },
                columns: [
                          {field: "chk", type:"chk", title: "&nbsp;", value:"ID"},
                          {field: "id", title:"主键", hidden:"true", align:"center", width: "100px"},
                    		{field: "strategyType", title:"策略类别", align:"center", width: "100px"},
                    		{field: "strategyCode", title:"策略编码", align:"center", width: "100px"},
                    		{field: "strategyName", title:"策略名称", align:"center", width: "100px"},
                    		{field: "strategyDes", title:"策略描述", align:"center", width: "100px"},
                    		{field: "drlFile", title:"DRL文件", align:"center", width: "100px"},
                    		{field: "drlRoute", title:"DRL路径", align:"center", width: "100px"},
                    		{field: "packageName", title:"包名", align:"center", width: "100px"},
                    		{field: "ruleNo", title:"规则号", align:"center", width: "100px"},
                    		{field: "ruleType", title:"规则类型", align:"center", width: "100px"},
                    		{field: "sourceCode", title:"源代码", align:"center", width: "100px"},
                    		{field: "svnRevision", title:"SVN版本", align:"center", width: "100px"},
                    {
                        width: 100,
                        title: "操作列",
                        align: "center",
                        command: [ {
                            name: "修 改",
                            click: function(e) {
                                var rowEl = SimpleListUtil.getCurrentRow(e.target);
                                platformIpfCcmStrategyManageListView.selectRow(rowEl);
                                var Id = SimpleListUtil.getSelectedColumnValue(this, "id");
                                var dialogId = "detail_edit_dialog_" + Id;
                                var columnArray = platformIpfCcmStrategyManageListView.get("columns");
                                var col = null;
                                var colName = null;
                                var value = null;
                                var ColumnValue = {};
                                for(var i= 0, colCount=columnArray.length; i<colCount; i++){
                                    col = columnArray[i];
                                    colName = col.field;
                                    value = SimpleListUtil.getSelectedColumnValue(this, colName);
                                    ColumnValue[colName] = value;
                                }

                                var detailstr="";
                                detailstr+="<div id='content' align='center'>";
                                detailstr+="<table>";
                                detailstr+="<input id='id' name='主键' hidden='true' value='"+ColumnValue["id"]+"' style='...'/>";

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lstrategyType' align='right'>策略类别：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='strategyType' name='策略类别' value='"+ColumnValue["strategyType"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lstrategyCode' align='right'>策略编码：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='strategyCode' name='策略编码' value='"+ColumnValue["strategyCode"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lstrategyName' align='right'>策略名称：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='strategyName' name='策略名称' value='"+ColumnValue["strategyName"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lstrategyDes' align='right'>策略描述：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='strategyDes' name='策略描述' value='"+ColumnValue["strategyDes"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='ldrlFile' align='right'>DRL文件：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='drlFile' name='DRL文件' value='"+ColumnValue["drlFile"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='ldrlRoute' align='right'>DRL路径：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='drlRoute' name='DRL路径' value='"+ColumnValue["drlRoute"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lpackageName' align='right'>包名：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='packageName' name='包名' value='"+ColumnValue["packageName"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lruleNo' align='right'>规则号：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='ruleNo' name='规则号' value='"+ColumnValue["ruleNo"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lruleType' align='right'>规则类型：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='ruleType' name='规则类型' value='"+ColumnValue["ruleType"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lsourceCode' align='right'>源代码：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='sourceCode' name='源代码' value='"+ColumnValue["sourceCode"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lsvnRevision' align='right'>SVN版本：</label>";
                                detailstr+="</td><td>";
          						
        						
        						
        						
                        		detailstr+="<input id='svnRevision' name='SVN版本' value='"+ColumnValue["svnRevision"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                
				                detailstr+="</table>";
				                detailstr+="</div>";
				                detailstr+="<div align='center'>";
				                detailstr+="<input id='submitBtn'  name='submitBtn' type='button' value='保 存' />";
				                detailstr+="</div>";
                                showEditDetilDialog(1,"修改",dialogId ,"router?appKey=000001&method=ipfCcmStrategy.updateIpfCcmStrategy&v=1.0&format=json", $(detailstr),370);
                                dialogId = null;
                            }

                        }]
                    }
                ]
            });

            this.changePage(platformIpfCcmStrategyManageListView);
        }
    });

    return PlatformIpfCcmStrategyManageRouter;
});
