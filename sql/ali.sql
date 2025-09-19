
-- ----------------------------
-- 手动绑定记录表
-- ----------------------------
DROP TABLE IF EXISTS `ali_account_bind`;
CREATE TABLE `ali_account_bind` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10)  DEFAULT 'super'  NOT NULL  COMMENT '角色id',
   `cloud_id` varchar(32)  NOT NULL COMMENT '云账号id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `type` varchar(2) NOT NULL COMMENT '默认 PT 特殊 TS',
   `price`  FLOAT DEFAULT 0  COMMENT '账号单价',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '阿里手动绑定记录表';

------------------------------
-- 阿里账号库存表
------------------------------
DROP TABLE IF EXISTS `ali_account_repo`;
CREATE TABLE `ali_account_repo` (

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `ct_code` varchar(10) NOT NULL COMMENT '国家代码',
   `type` varchar(2) NOT NULL COMMENT '默认 PT 特殊 TS',
   `price`  FLOAT DEFAULT 0  COMMENT '账号单价',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `password` varchar(32)  NOT NULL COMMENT '明文密码',
   `email_password` varchar(32)  NOT NULL COMMENT  '邮箱密码',
   `email_login_address` varchar(100)  NOT NULL COMMENT  '邮箱登录地址',
   `cloud_id` varchar(50)  NOT NULL COMMENT  '账号平台 id',
   `status` varchar(10) DEFAULT 'not_sale' COMMENT  'for_sale 已上架,not_sale 未上架 sold 已出售,locked 锁定',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '购买人 id',
   `buy_date` timestamp COMMENT  '购买时间',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '阿里账号库存表';


------------------------------
DROP TABLE IF EXISTS `ali_account_trade_note`;
CREATE TABLE `ali_account_trade_note` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '角色id',
   `ct_code` varchar(10) NOT NULL COMMENT '国家代码',
   `price`  FLOAT DEFAULT 0  COMMENT '账号单价',
   `amount` double  NOT NULL COMMENT '订单总金额',
   `status` int(1) DEFAULT 1 COMMENT '状态,1 已支付, 0 未支付',
   `platform` int(1) DEFAULT 0 COMMENT '平台:0 平台, 1 飞机',
   `account_ids` varchar(200) DEFAULT '' COMMENT '账号id 数组字符串',
   `note` varchar(200) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '阿里账号购买记录表';


-- ali账号邀请------------------------------
DROP TABLE IF EXISTS `ali_invite`;
CREATE TABLE `ali_invite` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10)  DEFAULT 'super'  NOT NULL  COMMENT '角色id',
   `ct_code` varchar(10) NOT NULL COMMENT '国家代码',
   `invite_name` varchar(100) NOT NULL COMMENT '客户名称',
   `invite_id` varchar(100) NOT NULL COMMENT '客户名称',
   `customer_id` varchar(100) NOT NULL COMMENT '客户名称',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `status` int(1) DEFAULT 0 COMMENT '状态,0 未关联, 1已关联',
   `days` int(2) DEFAULT 0 COMMENT '过期天数',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '阿里云账号邀请表';

-- ----------------------------
-- 阿里用户
-- ----------------------------
DROP TABLE IF EXISTS `agent`;
CREATE TABLE `ali_user` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `uid` varchar(20)  NOT NULL COMMENT '阿里云使用',
   `discount` int(4) DEFAULT 100  COMMENT '阿里云的点位,用于自助充值',
   `role_id`  varchar(10) NOT NULL  COMMENT '代理id',
   `tg_id` varchar(30) DEFAULT ''  COMMENT '飞机id',
   `mobile` varchar(20)  DEFAULT '' COMMENT '手机号',
   `distribution_id` varchar(70)  DEFAULT '' COMMENT '分销id,也就是阿里云官网的',

   -- `totol_balance` FLOAT  DEFAULT 0 '总消费',
   `credit_line` varchar(15)  NOT NULL DEFAULT '0' COMMENT '信控额度',
   `available_credit` varchar(15)  NOT NULL DEFAULT '0' COMMENT '剩余额度',
   --normal 正常
   --arrearsNotShutdown 欠费未停机
   --shutdown 停机
   `account_status` varchar(30)  NOT NULL DEFAULT 'normal' COMMENT '账号状态:normal,arrearsNotShutdown,shutdown',
   `new_buy_status` varchar(30)  NOT NULL DEFAULT 'Normal' COMMENT '下单控制:Purchase Forbidden,Normal',
   `delay_status` varchar(20)  NOT NULL DEFAULT 'immediatelyStop' COMMENT '延停策略:immediatelyStop,delayStop,delayAmount,noStop',
   `asociation_time` timestamp COMMENT '关联成功时间',
   `outstanding_time` timestamp DEFAULT NULL COMMENT '',
   `warning_credit` varchar(15)  DEFAULT NULL COMMENT '预警额度',
     `deleted` int(4) DEFAULT 0  COMMENT '是否软删除,0 未删除,1 已删除',
   `note` varchar(100)  DEFAULT '' '备注',
   
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
     -- ... 其他列定义 ...
   UNIQUE KEY `idx_role_id` (`role_id`),
   -- UNIQUE KEY `idx_role_id` (`role_id`),
   -- INDEX `idx_email` (`email`),

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '阿里客户表';
