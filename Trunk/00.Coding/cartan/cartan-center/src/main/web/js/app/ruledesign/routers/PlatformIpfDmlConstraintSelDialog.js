
		

		

		

		

		

		

		
/**
 * 选择窗口
 *
 * @author 刘溪滨 (13720880048@163.com)
 * @version 1.0 @Date: 2015-11-18 上午9:10
 */
define(["jquery",
    "utils/Log",
    "grid/SimpleListUtil",
        "js/app/ruledesign/routers/PlatformIpfDmlTableSelDialog",
    "rpc/AjaxEngine",
    "utils/common"
], function($, Log, SimpleListUtil,
		PlatformIpfDmlTableSelDialog,
		AjaxEngine){	
    var PlatformIpfDmlConstraintSelDialog = {
    		codetodes: function(id){
		        var result;
		        var resstr="";
                if (id==""){
                    return resstr;
                } else {
		        new AjaxEngine("router?appKey=000001&method=ipfDmlConstraint.selectIpfDmlConstraint&v=1.0&format=json",
		            {
		                async: false,
		                data:{id: id},
		                dataType: 'json',
		                complete: function(transport){
		                    result = transport.responseText;
		                    result = $.parseJSON(result);
                            if (result.resultJson.length>0){
                                resstr = result.resultJson[0].constraintName;
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
                                url: "router?appKey=000001&method=ipfDmlConstraint.selectIpfDmlConstraint&v=1.0&format=json"
                            }
                        },
                        pageSize: 10,                     //默认分页是每页10条记录
                        schema: {
                            model: {
                                fields: {
                    		id: { type: "string" },ipfDmlTableId: { type: "string" },constraintName: { type: "string" },constraintType: { type: "string" },columnName: { type: "string" },foreignTableName: { type: "string" },foreignColumnName: { type: "string" }
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
                                        data["IpfDmlTableName"] = PlatformIpfDmlTableSelDialog.codetodes(data["ipfDmlTableId"]);
                                		data["constraintTypeName"] = SimpleListUtil.getSelectDes("T047", data["constraintType"]);
                                    }
                                }
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

                      		,{field: "ipfDmlTableId", title:"表名", hidden:"true", align:"center", width: "100px"}
                      		,{field: "IpfDmlTableName", title:"表名", align:"center", width: "100px"}
    	                  

                      		,{field: "constraintName", title:"约束名称", align:"center", width: "100px"}
    	                  

                      		,{field: "constraintType", title:"约束类型", hidden:"true", align:"center", width: "100px"}
                      		,{field: "constraintTypeName", title:"约束类型", align:"center", width: "100px"}
    	                  

                      		,{field: "columnName", title:"字段名称", align:"center", width: "100px"}
    	                  

                      		,{field: "foreignTableName", title:"外关联表名", align:"center", width: "100px"}
    	                  

                      		,{field: "foreignColumnName", title:"外关联字段名", align:"center", width: "100px"}
    	                  
                    ]
                });
                return  detailgrid;
            }
    }
    return PlatformIpfDmlConstraintSelDialog;
})