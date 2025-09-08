
//登录 toeken
export const RedisKeyToken = (roleID): string => {
    return 'Token_'+roleID

};  
//找回密码的邮箱验证
export const RedisKeyFindPwdCode = (email): string => {

    return 'FindPwdCode_'+email

};

//代理的阿里云折扣
export const RedisKeyAliDiscount = (roleID): string => {

    return 'AliDiscount_'+roleID
};

//代理的腾讯云折扣
export const RedisKeyTXDiscount = (roleID): string => {

    return 'TXDiscount_'+roleID
};

//代理的aws折扣
export const RedisKeyAWSDiscount = (roleID): string => {

    return 'AWSDiscount_'+roleID
};

//管理员的腾讯云折扣
export const RedisKeyAdminConfig = (): string => {

    return 'AdminConfig'
};


export const RedisKeyUSDTOrder= (order_id): string => {
    
    return 'USDTOrder_'+order_id

};

//阿里云邀请可用的国家列表
export const RedisKeyAliInviteCTS= (): string => {

    return 'AliInviteCTS'

};

//缓存代理的 email 信息
export const RedisKeyAgentEmail = (roleID): string => {

    return 'AgentEmail_'+roleID

};


//缓存代理的 email 信息
export const RedisKeyAgentRoleIDWithEmail = (email): string => {

    return 'AgentRoleIDWithEmail_'+email

};

export const RedisKeyAgentLevel = (roleID): string => {

    return 'AgentLevel_'+roleID

};

//云账号信息缓存表
export const RedisKeyCloudAccountInfo = (accoutID): string => {

    return 'CloudAccountInfo_'+accoutID

};

//云账号信用信息缓存表
export const RedisKeyCloudCredit = (accoutID): string => {

    return 'CloudCredit_'+accoutID

};

//云账号更新时间缓存表
export const RedisKeyCloudUpdateTime = (accoutID): string => {

    return 'CloudUpdateTime_'+accoutID

};

//云账号更新时间缓存表
export const RedisKeyCloudOutstandingTime = (accoutID): string => {

    return 'CloudOutstandingTime_'+accoutID

};

//云账号更新时间缓存表
export const RedisKeyCloudUserEmail= (accountID): string => {

    return 'CloudUserEmail_'+accountID

};

//代理返佣未结算余额
export const RedisKeyAgentRebateBalance = (roleID): string => {

    return 'AgentRebateBalance_'+roleID
};


//代理最近的结算时间
export const RedisKeyAgentLastCheckoutTime = (roleID): string => {

    return 'AgentLastCheckoutTime_'+roleID
};


//代理总充值额度
export const RedisKeyAgentTotalRecharge = (roleID): string => {

    return 'AgentTotalRecharge_'+roleID
};

//代理阿里云用户总数
export const RedisKeyAgentAliUserCount = (roleID): string => {

    return 'AgentAliUserCount_'+roleID
};

//代理腾讯云用户总数
export const RedisKeyAgentTXUserCount = (roleID): string => {

    return 'AgentTXUserCount_'+roleID
};


//代理aws用户总数
export const RedisKeyAgentAWSUserCount = (roleID): string => {

    return 'AgentAWSUserCount_'+roleID
};

export const RedisKeyBotWithID = (botID): string => {

    return 'botWithID_'+botID

};

export const RedisKeyGroupID_RoleID = (role_id): string => {

    return 'GroupID_RoleID_'+role_id
};

export const RedisKeyCloudWarning= (uid,range): string => {

    return 'CloudWarning_'+uid+'range_'+range
};


export const RedisKeyWebCloudAccount= (ip,order_id): string => {

    return 'WebCloudAccount_'+ip+'_'+order_id
};


export const RedisKeyWebRechargeAccount= (ip,order_id): string => {

    return 'WebCloudRecharge_'+ip+'_'+order_id
};




