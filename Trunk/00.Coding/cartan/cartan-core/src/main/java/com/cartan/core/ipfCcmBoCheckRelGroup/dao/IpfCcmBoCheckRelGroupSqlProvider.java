/**
 * Copyright：志远数字商务有限公司 版权所有 违者必究 2013 
 */
package com.cartan.core.ipfCcmBoCheckRelGroup.dao;

import com.cartan.core.ipfCcmBoCheckRelGroup.domain.IpfCcmBoCheckRelGroup;
import org.apache.commons.lang.StringUtils;
import java.util.Map;

/**mabatis  sql拼装类
 * @author : liuxb(13720880048@163.com)
 * @date: 13-6-26
 */
public class IpfCcmBoCheckRelGroupSqlProvider {

    public static String getSql(Map<String, Object> parameter){

        StringBuffer conditionsStr=new StringBuffer("select * from cartan_common.t_ipf_ccm_bo_check_rel_group where 1=1 ");


        if(parameter.get("conditions")!=null){
            String conditions    =parameter.get("conditions").toString();
            conditionsStr.append(conditions);
        }
        IpfCcmBoCheckRelGroup ipfCcmBoCheckRelGroup=new IpfCcmBoCheckRelGroup();
        ipfCcmBoCheckRelGroup=(IpfCcmBoCheckRelGroup)parameter.get("ipfCcmBoCheckRelGroup");

        if(StringUtils.isNotBlank(ipfCcmBoCheckRelGroup.getId())){
        	conditionsStr.append(" and ID = #{ipfCcmBoCheckRelGroup.ID} ");
        }    		
        if(StringUtils.isNotBlank(ipfCcmBoCheckRelGroup.getIpfCcmBoCheckId())){
        	conditionsStr.append(" and IPF_CCM_BO_CHECK_ID like  CONCAT('%',#{ipfCcmBoCheckRelGroup.IPF_CCM_BO_CHECK_ID},'%')");
        }
        if(StringUtils.isNotBlank(ipfCcmBoCheckRelGroup.getGroupName())){
        	conditionsStr.append(" and GROUP_NAME like  CONCAT('%',#{ipfCcmBoCheckRelGroup.GROUP_NAME},'%')");
        }
        if(StringUtils.isNotBlank(ipfCcmBoCheckRelGroup.getGroupDesc())){
        	conditionsStr.append(" and GROUP_DESC like  CONCAT('%',#{ipfCcmBoCheckRelGroup.GROUP_DESC},'%')");
        }
        return  conditionsStr.toString();
    }
}


