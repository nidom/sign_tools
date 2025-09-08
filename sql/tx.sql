-- 腾讯手动绑定记录表
-- ----------------------------
DROP TABLE IF EXISTS `tx_account_bind`;
CREATE TABLE `tx_account_bind` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10)  DEFAULT 'super'  NOT NULL  COMMENT '角色id',
   `cloud_id` varchar(32)  NOT NULL COMMENT '云账号id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `type` varchar(2) NOT NULL COMMENT '默认 PT 特殊 TS',
   `price`  FLOAT DEFAULT 0  COMMENT '账号单价',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '腾讯手动绑定记录表';



-- ----------------------------
-- 腾讯账号库存表
------------------------------
DROP TABLE IF EXISTS `tx_account_repo`;
CREATE TABLE `tx_account_repo` (
   
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
   `org_id`  varchar(15)  DEFAULT '200038633816'  NOT NULL  COMMENT '组织 id',
   `buy_date` timestamp COMMENT  '购买时间',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '腾讯账号库存表';



------------------------------
DROP TABLE IF EXISTS `tx_account_trade_note`;
CREATE TABLE `tx_account_trade_note` (   

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
     UNIQUE KEY `idx_role_id` (`role_id`),
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '阿里账号购买记录表';

------------------------------
--腾讯用户
-- ----------------------------
DROP TABLE IF EXISTS `tx_user`;
CREATE TABLE `tx_user` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `uin` varchar(50)  NOT NULL COMMENT '腾讯云使用',
   `discount` int(4) DEFAULT 100  COMMENT '阿里云的点位,用于自助充值',
   `role_id`  varchar(10) NOT NULL  COMMENT '代理id',
   `tg_id` va char(30) DEFAULT ''  COMMENT '飞机id',
   `mobile` varchar(20)  DEFAULT '' COMMENT '手机号',
   `distribution_id` varchar(20)  DEFAULT '' COMMENT '分销id,也就是阿里云官网的，这个废弃',
   `note` varchar(100)  DEFAULT '' '备注',
   -- `totol_balance` FLOAT  DEFAULT 0 '总消费',
   `credit_line` varchar(20)  NOT NULL DEFAULT '0' COMMENT '信控额度',
   `available_credit` varchar(20)  NOT NULL DEFAULT '0' COMMENT '剩余额度',
   `outstanding_time` timestamp DEFAULT NULL COMMENT '',
   `warning_credit` varchar(15)  DEFAULT NULL COMMENT '预警额度',
   --normal 正常
   --arrearsNotShutdown 欠费未停机
   --shutdown 停机
   `account_locked` varchar(2)  NOT NULL DEFAULT '0' COMMENT '账号锁定 0: Normal 2: Forced service suspension',
   `account_status` varchar(2)  NOT NULL DEFAULT '0' COMMENT '账号状态:0: Normal 1: Forcibly mandatory (this function is not supported yet) 2. Mandatory arrears',
   `asociation_time` timestamp DEFAULT NULL COMMENT '关联成功时间',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
     -- ... 其他列定义 ...
     UNIQUE KEY `idx_role_id` (`role_id`),
   -- UNIQUE KEY `idx_role_id` (`role_id`),
   -- INDEX `idx_email` (`email`),
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '腾讯客户表';


-- ----------------------------
--腾讯创建用户记录表
-- ----------------------------
DROP TABLE IF EXISTS `tx_ceate_note`;f
CREATE TABLE `tx_ceate_note` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) NOT NULL  COMMENT '代理id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `ct_name` varchar(70) NOT NULL COMMENT '国家名称',
   `uin` varchar(50)  NOT NULL COMMENT '腾讯云使用',
   `password`  varchar(20) NOT NULL  COMMENT '密码',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '腾讯创建用户记录表';



