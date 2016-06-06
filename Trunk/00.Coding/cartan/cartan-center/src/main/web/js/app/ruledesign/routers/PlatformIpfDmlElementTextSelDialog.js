



/**
 * 选择窗口
 *
 * @author 刘溪滨 (13720880048@163.com)
 * @version 1.0 @Date: 2015-11-18 上午9:10
 */
define(["jquery",
    "utils/Log",
    "grid/SimpleListUtil",
        "js/app/ruledesign/routers/PlatformIpfDmlElementSelDialog",
    "rpc/AjaxEngine",
    "utils/common"
], function($, Log, SimpleListUtil,
		PlatformIpfDmlElementSelDialog,
		AjaxEngine){	
    var PlatformIpfDmlElementTextSelDialog = {
    		codetodes: function(id){
		        var result;
		        var resstr="";
                if (id==""){
                    return resstr;
                } else {
		        new AjaxEngine("router?appKey=000001&method=ipfDmlElementText.selectIpfDmlElementText&v=1.0&format=json",
		            {
		                async: false,
		                data:{id: id},
		                dataType: 'json',
		                complete: function(transport){
		                    result = transport.responseText;
		                    result = $.parseJSON(result);
                            if (result.resultJson.length>0){
                                resstr = result.resultJson[0].IpfDmlElementText;
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
                                url: "router?appKey=000001&method=ipfDmlElementText.selectIpfDmlElementText&v=1.0&format=json"
                            }
                        },
                        pageSize: 10,                     //默认分页是每页10条记录
                        schema: {
                            model: {
                                fields: {
                    		id: { type: "string" },ipfDmlElementId: { type: "string" },ddLanguage: { type: "string" },ddText: { type: "string" }
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
                                        data["IpfDmlElementName"] = PlatformIpfDmlElementSelDialog.codetodes(data["ipfDmlElementId"]);
                                		data["ddLanguageName"] = SimpleListUtil.getSelectDes("T004", data["ddLanguage"]);
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

                      		,{field: "ipfDmlElementId", title:"数据元素", hidden:"true", align:"center", width: "100px"}
                      		,{field: "IpfDmlElementName", title:"数据元素", align:"center", width: "100px"}
    	                  

                      		,{field: "ddLanguage", title:"语言", hidden:"true", align:"center", width: "100px"}
                      		,{field: "ddLanguageName", title:"语言", align:"center", width: "100px"}
    	                  

                      		,{field: "ddText", title:"文本描述", align:"center", width: "100px"}
    	                  
                    ]
                });
                return  detailgrid;
            }
    }
    return PlatformIpfDmlElementTextSelDialog;
})