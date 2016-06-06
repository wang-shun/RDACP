













/**
 * 选择窗口
 *
 * @author 刘溪滨 (13720880048@163.com)
 * @version 1.0 @Date: 2015-11-18 上午9:10
 */
define(["jquery",
    "utils/Log",
    "rpc/AjaxEngine",
    "utils/common"
], function($, Log,AjaxEngine){	
    var PlatformRuleSelDialog = {
    		codetodes: function(id){
		        var result;
		        var resstr="";
                if (id==""){
                    return resstr;
                } else {
		        new AjaxEngine("router?appKey=000001&method=rule.selectRule&v=1.0&format=json",
		            {
		                async: false,
		                data:{id: id},
		                dataType: 'json',
		                complete: function(transport){
		                    result = transport.responseText;
		                    result = $.parseJSON(result);
                            if (result.resultJson.length>0){
                                resstr = result.resultJson[0].Rule;
                            }
		                }
		            }
		        );
		        return resstr;
                }
		    },
    		showGridData: function(gridObject){
                var detailgrid= gridObject.kendoGrid({
                    dataSource: {
                        serverPaging: false,
                        transport: {
                            read: {
                                url: "router?appKey=000001&method=rule.selectRule&v=1.0&format=json"
                            }
                        },
                        pageSize: 10,                     //默认分页是每页10条记录
                        schema: {
                            model: {
                                fields: {
                    		id: { type: "string" },ruleName: { type: "string" },rulesetId: { type: "string" },isUsed: { type: "string" },priLevel: { type: "string" },contentType: { type: "string" },effectDate: { type: "string" },invalidDate: { type: "string" },creator: { type: "string" },createDate: { type: "string" },modifyDate: { type: "string" },modifyed: { type: "string" },owner: { type: "string" },locked: { type: "string" }
                            }
                            },
                            parse: function(response) {
                                return response;
                            },
                            //返回的数据
                            data: function(response) {
                                var result = response["resultJson"];
                                return result;
                            },
                            //记录条数
                            total: function(response) {
                                var result = response["total"] || response["resultJson"].length;
                                return result;
                            }
                        }
                    },
                    selectable: true,
                    pageable: {                     //是否支持分页，如果支持，其相关的配置信息
                        pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        info: true,
                        messages: {
                            empty: "查询无记录！",
                            itemsPerPage: "行每页",
                            display: "共 {2} 条记录"
                        }
                    },
                    columns: [
    	                  {field: "id", title:"主键", hidden:"true", align:"center", width: "100px"}
    	                  ,{field: "ruleName", title:"规则", align:"center", width: "100px"}
    	                  ,{field: "rulesetId", title:"规则集", align:"center", width: "100px"}
    	                  ,{field: "isUsed", title:"是否有效", align:"center", width: "100px"}
    	                  ,{field: "priLevel", title:"优先级", align:"center", width: "100px"}
    	                  ,{field: "contentType", title:"内容类别", align:"center", width: "100px"}
    	                  ,{field: "effectDate", title:"生效日期", align:"center", width: "100px"}
    	                  ,{field: "invalidDate", title:"失效日期", align:"center", width: "100px"}
    	                  ,{field: "creator", title:"创建人", align:"center", width: "100px"}
    	                  ,{field: "createDate", title:"创建日期", align:"center", width: "100px"}
    	                  ,{field: "modifyDate", title:"修改日期", align:"center", width: "100px"}
    	                  ,{field: "modifyed", title:"修改人", align:"center", width: "100px"}
    	                  ,{field: "owner", title:"所有人", align:"center", width: "100px"}
    	                  ,{field: "locked", title:"锁定人", align:"center", width: "100px"}
                    ]
                });
                return  detailgrid;
            }
    }
    return PlatformRuleSelDialog;
})