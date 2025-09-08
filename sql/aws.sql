
-- AWS手动绑定记录表
-- ----------------------------
DROP TABLE IF EXISTS `aws_account_bind`;
CREATE TABLE `aws_account_bind` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `repo_id` int NOT NULL  COMMENT 'aws的库存id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '角色id',
   `cloud_id` varchar(32)  NOT NULL COMMENT '云账号id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `precharge`  FLOAT DEFAULT 0  COMMENT '预充值金额',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'AWS手动绑定记录表';

------------------------------
-- 腾讯账号库存表
------------------------------
DROP TABLE IF EXISTS `aws_account_repo`;
CREATE TABLE `aws_account_repo` (

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,也是库存id',
   `precharge`  FLOAT DEFAULT 0  COMMENT '预充值金额',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `password` varchar(32)  NOT NULL COMMENT '明文密码',
   `email_password` varchar(32)  NOT NULL COMMENT  '邮箱密码',
   `email_login_address` varchar(100)  NOT NULL COMMENT  '邮箱登录地址',
   `cloud_id` varchar(50)  NOT NULL COMMENT  '账号平台 id',
   `status` varchar(10) DEFAULT 'not_sale' COMMENT  'for_sale 已上架,not_sale 未上架 sold 已出售,locked 锁定',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '购买人 id',
   `buy_date` timestamp COMMENT  '购买时间',
   `dismiss_date` timestamp DEFAULT NULL COMMENT  '清退时间',
   `deleted` int(4) DEFAULT 0  COMMENT '是否软删除,0 未删除,1 已删除',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `dismiss` varchar(15)  NOT NULL DEFAULT 'normal'  COMMENT '是否清退,normal 正常,dismissing 正在清退,dismissed 已清退',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'AWS账号库存表';


------------------------------
DROP TABLE IF EXISTS `aws_account_trade_note`;
CREATE TABLE `aws_account_trade_note` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '角色id',
   `precharge`  FLOAT DEFAULT 0  COMMENT '预充值金额',
   `discount` int(4) DEFAULT 100  COMMENT '预充值的折扣',
   `amount` double  NOT NULL COMMENT '订单总金额',
   `status` int(1) DEFAULT 1 COMMENT '状态,1 已支付, 0 未支付',
   `platform` int(1) DEFAULT 0 COMMENT '平台:0 平台, 1 飞机',
   `account_ids` varchar(200) DEFAULT '' COMMENT '账号id 数组字符串',
   `note` varchar(200) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'AWS账号购买记录表';

-- ----------------------------
--aws用户表
-- ----------------------------
DROP TABLE IF EXISTS `aws_user`;
CREATE TABLE `aws_user` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `repo_id` int NOT NULL  COMMENT 'aws的库存id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `cloud_id` varchar(50)  NOT NULL COMMENT 'aws使用',
   `discount` int(4) DEFAULT 100  COMMENT 'aws的点位,用于自助充值',
   `role_id`  varchar(10) NOT NULL  COMMENT '代理id',
   `tg_id` varchar(30) DEFAULT ''  COMMENT '飞机id',
   `note` varchar(100)  DEFAULT '' '备注',
   `bill_start` varchar(10)  NOT NULL  COMMENT '备注',
   -- `totol_balance` FLOAT  DEFAULT 0 '总消费',
   `credit_line` varchar(20)  NOT NULL DEFAULT '0' COMMENT '总充值额度',
   -- `available_credit` varchar(20)  NOT NULL DEFAULT '0' COMMENT '剩余额度',
   `cost_credit` varchar(20)  NOT NULL DEFAULT '0' COMMENT '剩余额度',
   `delay_credit` varchar(20)  NOT NULL DEFAULT '0' COMMENT '延停额度',
   `outstanding_time` timestamp DEFAULT NULL COMMENT '',
   `dismiss` varchar(15)  NOT NULL DEFAULT 'normal'  COMMENT '是否清退,normal 正常,dismissing 正在清退,dismissed 已清退',
   --normal 正常
   --arrearsNotShutdown 欠费未停机
   --shutdown 停机
   `service_status` varchar(20)  NOT NULL DEFAULT 'normal' COMMENT 'normal,shutdown,start_failed,shutdown_failed,processing',
   `account_status` varchar(20)  NOT NULL DEFAULT 'ACTIVE' COMMENT '账号状态:ACTIVE || SUSPENDED || PENDING_CLOSURE',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
   
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'aws客户表'

DROP TABLE IF EXISTS `aws_bill_monthly`;
CREATE TABLE `aws_bill_monthly` (   

    `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `cloud_id` varchar(50)  NOT NULL COMMENT 'aws id',
   `month` varchar(10)  NOT NULL COMMENT '月份',
   `cost` double  NOT NULL COMMENT '订单总金额',
   `repo_id` int DEFAULT NULL  COMMENT '当前月份所属的库存id',
   `role_id` varchar(10)  NOT NULL COMMENT '角色id',
   `note` varchar(100)  DEFAULT '' COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'aws月账单'

-----------------------------
--aws 退号申请
-- ----------------------------
DROP TABLE IF EXISTS `aws_dismiss_req`;
CREATE TABLE `aws_dismiss_req` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id 也是审核编号',
   `repo_id` int NOT NULL  COMMENT 'aws的库存id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '角色id',
   `cloud_id` varchar(32)  NOT NULL COMMENT '云账号id',
   `apply_status` varchar(50)  NOT NULL DEFAULT 'inreview' COMMENT 'inreview 审核中,approved 审核通过,rejected 审核不通过',
   `operator` varchar(20)  NOT NULL DEFAULT 'agent' COMMENT 'agent 代理操作,admin管理员操作',  
   `actual_amount` FLOAT   DEFAULT 0 COMMENT '实际补退金额', 
   `finance_type` varchar(10) DEFAULT '' COMMENT '退款:inflow,补扣:outflow',
   `deal_note` varchar(100)  NOT NULL DEFAULT '' COMMENT '处理说明',
   `note` varchar(100)  DEFAULT '' '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'aws退号申请'

------------------------------
--aws 停复机操作记录
------------------------------
DROP TABLE IF EXISTS `aws_service_operation_note`;
CREATE TABLE `aws_service_operation_note` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id 也是审核编号',
   `repo_id` int NOT NULL  COMMENT 'aws的库存id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `cloud_id` varchar(32)  NOT NULL COMMENT '云账号id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '所属代理',
   `operator` varchar(20)  NOT NULL DEFAULT 'agent' COMMENT 'agent 代理操作,admin管理员操作,system 系统操作',
   `operation_type` varchar(20)  NOT NULL DEFAULT 'normal' COMMENT 'start,shutdown',
   `note` varchar(100)  DEFAULT '' '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'aws停复机操作记录'



DROP TABLE IF EXISTS `aws_service_operation_note`;
CREATE TABLE `aws_service_operation_note` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id 也是审核编号',
   `repo_id` int NOT NULL  COMMENT 'aws的库存id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `cloud_id` varchar(32)  NOT NULL COMMENT '云账号id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '所属代理',
   `operator` varchar(20)  NOT NULL DEFAULT 'agent' COMMENT 'agent 代理操作,admin管理员操作,system 系统操作',
   `operation_type` varchar(20)  NOT NULL DEFAULT 'normal' COMMENT 'start,shutdown',
   `note` varchar(100)  DEFAULT '' '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'aws停复机操作记录'








LegalEntity






