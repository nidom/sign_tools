-- ----------------------------
-- 代理用户表
-- ----------------------------
DROP TABLE IF EXISTS `agent_role`;
CREATE TABLE `agent_role` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) NOT NULL  COMMENT '角色id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `password` varchar(32)  NOT NULL COMMENT '用户密码md5',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `agent_level` int(1) DEFAULT 2  COMMENT '2,二代 3,三代',
   `super_agent_id` varchar(8) NOT NULL DEFAULT '' COMMENT '上级代理的 userID',
   `seller_id` varchar(10) NOT NULL  DEFAULT '' COMMENT '销售人员id,只有2级代理才有，暂时不用',
   `status` varchar(10)  DEFAULT 'normal' COMMENT '状态,normal 正常,ban 封禁',
   `ali_discount` int(4) DEFAULT 100 COMMENT '阿里云的点位',
   `tx_discount` int(4) DEFAULT 100 COMMENT '腾讯云点位',
   `aws_discount` int(4) DEFAULT 100 COMMENT '腾讯云点位',
   
   -- `tg_id` varchar(30) DEFAULT ''  COMMENT '飞机 id',
   -- `phone` varchar(20)  DEFAULT '' COMMENT '手机号',
   `agent_balance` double  DEFAULT 0 COMMENT '账户余额',
   `agent_margin` int(10)  DEFAULT 0 COMMENT '账户保证金,暂时不用',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   -- ... 其他列定义 ...

   -- UNIQUE KEY `idx_role_id` (`role_id`),
   --  UNIQUE KEY  `idx_email` (`email`),
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '代理用户表';


DROP TABLE IF EXISTS `agent_invite`;
CREATE TABLE `agent_invite` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) NOT NULL  COMMENT '角色id',
   `super_id`varchar(10) NOT NULL  COMMENT '上级id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `password` varchar(50)  NOT NULL COMMENT '用户密码明文',
   `status` int(1) DEFAULT 0 COMMENT '状态,0表示未成功,1 已注册成功,删除记录',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '代理邀请注册';

    --存在 redis
   -- `total_recharge` FLOAT  DEFAULT 0 COMMENT '总充值',
   -- `rebate_balance` FLOAT  DEFAULT 0 COMMENT '返佣额度',
   -- `tx_count` int(5) DEFAULT 0 COMMENT '腾讯云用户总数',
   -- `ali_count` int(5) DEFAULT 0 COMMENT '腾讯云用户总数',



-- ----------------------------
-- 代理用户表
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10)  DEFAULT 'admin'  NOT NULL  COMMENT '角色id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `password` varchar(32)  NOT NULL COMMENT '用户密码md5',
   `status` int(1) DEFAULT 0 COMMENT '状态,0表示正常,-1表示封禁',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '管理员用户表';



-- ----------------------------
-- 手动绑定记录表
-- ----------------------------
DROP TABLE IF EXISTS `account_bind_note`;
CREATE TABLE `account_bind_note` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10)  DEFAULT 'super'  NOT NULL  COMMENT '角色id',
   `cloud_id` varchar(32)  NOT NULL COMMENT '云账号id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `type` varchar(2) NOT NULL COMMENT '默认 PT 特殊 TS',
   `price`  FLOAT DEFAULT 0  COMMENT '账号单价',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '手动绑定记录表';








-- 账号折扣修改记录表 共用
-- ----------------------------
DROP TABLE IF EXISTS `discount_his`;
CREATE TABLE `discount_his` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '角色id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `origin_discount` int(4) DEFAULT 100 COMMENT '原点位',
   `new_discount` int(4) DEFAULT 100 COMMENT '新点位',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '账号折扣修改记录表';


-- ----------------------------
-- 账号库存表
------------------------------
DROP TABLE IF EXISTS `account_repo`;
CREATE TABLE `account_repo` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `ct_code` varchar(10) NOT NULL COMMENT '国家代码',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
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

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '账号库存表';





-- 账号购买记录
------------------------------
DROP TABLE IF EXISTS `account_trade_note`;
CREATE TABLE `account_trade_note` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '角色id',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
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
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '腾讯云账号库存表';









-- 账号国家配置列表 阿里和腾讯库存使用
------------------------------
DROP TABLE IF EXISTS `account_ct`;
CREATE TABLE `account_ct` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `ct_name`  varchar(10) DEFAULT ''  COMMENT '国家名称',
   `ct_code`  varchar(10)  DEFAULT ''  NOT NULL  COMMENT '国家代码',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '账号国家列表';

-- 财务表
-- ----------------------------
DROP TABLE IF EXISTS `finance`;
CREATE TABLE `finance` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,交易流水id',
   `role_id`  varchar(10) NOT NULL  COMMENT '角色id',
   `cloud_id` varchar(20)  NOT NULL  DEFAULT '' COMMENT '账号平台 id,也就是 uid',
   `sub_email` varchar(70) NOT NULL DEFAULT ''  COMMENT ' 子用户邮箱',
   `finance_type` varchar(10) NOT NULL  DEFAULT 'inflow' COMMENT '收入:inflow,支出:outflow',
   `discount` int(4) DEFAULT 100 COMMENT '折扣',
   --空就是其他
   `c_code` varchar(10) NOT NULL  DEFAULT '' COMMENT '云类型',
   `transaction_type`  varchar(50) NOT NULL DEFAULT '' COMMENT '交易类型',
   -- 
   `transaction_name` varchar(10) NOT NULL  DEFAULT '' COMMENT '交易类型名称',
   `final_amount` double NOT NULL COMMENT '实付金额',
   `transaction_amount` double NOT NULL COMMENT '交易金额',
   `receipt` varchar(200) DEFAULT '' COMMENT '交易凭证',
   `role_balance` double NOT NULL COMMENT '交易后余额',
   `note` varchar(200) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
    UNIQUE KEY `idx_role_id` (`role_id`),
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '财务表';

-- ----------------------------
-- 返佣表，
-- ----------------------------

DROP TABLE IF EXISTS `rebate_finance`;
CREATE TABLE `rebate_finance` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,交易流水id',
   
   `role_id`  varchar(10) NOT NULL  COMMENT '角色id,二级代理使用',
   `sub_email` varchar(70) NOT NULL DEFAULT ''  COMMENT ' 子用户邮箱',
   `sub_role_id` varchar(10) NOT NULL   COMMENT ' 三级代理 id',
   `finance_type` varchar(10) NOT NULL  DEFAULT 'inflow' COMMENT '收入:inflow,支出:outflow',
   `status` int(1) DEFAULT 0 COMMENT '状态,0 未结算, 1已结算',

    `discount` int(4) DEFAULT 100 COMMENT '二级折扣',
   `sub_discount` int(4) DEFAULT 100 COMMENT '三级折扣',
   --空就是其他
   `c_code` varchar(10) NOT NULL  DEFAULT '' COMMENT '云类型',
    -- 100:充值 101:退入 201  补扣
   `transaction_type`  varchar(10) NOT NULL DEFAULT '' COMMENT '交易类型',
   -- 
   `transaction_name` varchar(10) NOT NULL  DEFAULT '' COMMENT '交易类型名称',
   `final_amount` double NOT NULL COMMENT '实付返佣',
   `transaction_amount` double NOT NULL COMMENT '交易金额',
   `cloud_id` varchar(20)  NOT NULL  DEFAULT '' COMMENT '云账号id,也就是 uid uin 等',
   -- `receipt` varchar(200) DEFAULT '' COMMENT '交易凭证',
   -- `role_balance` FLOAT NOT NULL COMMENT '交易后余额',
   `note` varchar(200) DEFAULT '' COMMENT '交易备注',
   `checkout_id` int   COMMENT '结算记录 id',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
    UNIQUE KEY `idx_role_id` (`role_id`),
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '返佣表，二级代理使用';

-- ----------------------------
-- 返佣表结算记录
-- ----------------------------
DROP TABLE IF EXISTS `rebate_checkout`;
CREATE TABLE `rebate_checkout` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,结算记录id',
   `role_id`  varchar(10) NOT NULL  COMMENT '角色id,二级代理使用',
   `status` int(1) DEFAULT 0 COMMENT '状态,0 结算, 1已结算',
   `transaction_amount` double NOT NULL COMMENT '结算金额，分正负',
    -- `receipt` varchar(200) DEFAULT '' COMMENT '交易凭证',
    -- `role_balance` FLOAT NOT NULL COMMENT '交易后余额',
   `note` varchar(200) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
    UNIQUE KEY `idx_role_id` (`role_id`),
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '返佣表结算记录';

-- ----------------------------
-- 阿里补返条件记录表
-- ----------------------------
DROP TABLE IF EXISTS `makeup_condition_ali`;
CREATE TABLE `makeup_condition_ali` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,结算记录id',
   `product_code`  varchar(50) NOT NULL  COMMENT '',
   `product_name`  varchar(50)  DEFAULT ''  COMMENT '',
   `product_cn_name`  varchar(50)  DEFAULT ''  COMMENT '',
   `note` varchar(200) DEFAULT '' COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '阿里补返条件记录表';

-- ----------------------------
-- 腾讯补返条件记录表
-- ----------------------------
DROP TABLE IF EXISTS `makeup_condition_tx`;
CREATE TABLE `makeup_condition_tx` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,结算记录id',
   `product_name`  varchar(50) NOT NULL  COMMENT '',
   `sub_product_name`  varchar(50)  DEFAULT ''  COMMENT '',
   `note` varchar(200) DEFAULT '' COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '腾讯补返条件记录表';

-- ----------------------------
-- 补返条件-国家
-- ----------------------------
DROP TABLE IF EXISTS `makeup_condition_ct`;
CREATE TABLE `makeup_condition_ct` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,结算记录id',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `ct_name` varchar(50) NOT NULL COMMENT '国家名称,用于匹配',
   `ct_cn_name` varchar(50) DEFAULT '' COMMENT '国家中文名称',
   `note` varchar(200) DEFAULT '' COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '- 补返条件-国家';


-- ----------------------------
-- 补返条件-cost 最小匹配开销
-- ----------------------------
DROP TABLE IF EXISTS `makeup_condition_cost`;
CREATE TABLE `makeup_condition_cost` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,结算记录id',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `cost` double NOT NULL DEFAULT 1 COMMENT '最小匹配开销',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '补返条件-cost';



-- ----------------------------
--腾讯用户补扣账单
-- ----------------------------
DROP TABLE IF EXISTS `tx_makeup_order`;
CREATE TABLE `tx_makeup_order` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) NOT NULL  COMMENT '所属代理id',
   `uin` varchar(20)  NOT NULL COMMENT '腾讯云使用',
   `email` varchar(70)  NOT NULL COMMENT '',
   `region` varchar(100)  NOT NULL COMMENT '国家',
   `transaction_id` varchar(25) NOT NULL COMMENT '腾讯云的交易id',
   `product_name`  varchar(50) NOT NULL  COMMENT '',
   `sub_product_name`  varchar(50) NOT NULL DEFAULT ''  COMMENT '',
   `status` int(1) DEFAULT 0 COMMENT '状态,0 未结算, 1 已结算',
   --2024-09-30 07:05:05
   `bill_date` varchar(20)  NOT NULL COMMENT '账单时间年月日',
   `bill_month` varchar(20)  NOT NULL COMMENT '账单时间',
   `billing_mode` varchar(25) NOT NULL COMMENT '账单类型 Pay-As-You-Go resources',
   `final_cost` varchar(30) NOT NULL COMMENT '账单实际消费',
   `transaction_type` varchar(50) NOT NULL COMMENT 'Spot,Daily settlement',

   `discount` int(4) DEFAULT 100 COMMENT '腾讯云折扣点位',
   `makeup_amount` double DEFAULT 0 COMMENT '结算金额',
   
   `note` varchar(100)  DEFAULT '' COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
     -- ... 其他列定义 ...

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '腾讯用户补扣账单';

-- ----------------------------
--阿里云用户补扣账单
-- ----------------------------
DROP TABLE IF EXISTS `ali_makeup_order`;
CREATE TABLE `ali_makeup_order` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) NOT NULL  COMMENT '所属代理id',
   `uid` varchar(20)  NOT NULL COMMENT 'ali云使用',
   `email` varchar(50)  NOT NULL COMMENT '',
   `bill_date` varchar(20)  NOT NULL COMMENT '账单时间年月日',
   `bill_month` varchar(20)  NOT NULL COMMENT '账单时间',
   `region` varchar(100)  NOT NULL COMMENT '国家',
   -- `transaction_id` varchar(25) NOT NULL COMMENT '腾讯云的交易id',
   `product_name`  varchar(50) NOT NULL  COMMENT '',
   `product_code`  varchar(50) NOT NULL  COMMENT '',
   `status` int(1) DEFAULT 0 COMMENT '状态,0 未结算, 1 已结算',
   --2024-09-30 07:05:05
   `billing_mode` varchar(25) NOT NULL COMMENT 'Pay-As-You-Go',
   `final_cost` double NOT NULL COMMENT '账单实际消费',
   `discount` int(4) DEFAULT 100 COMMENT '阿里云折扣点位',
   `makeup_amount` double DEFAULT 0 COMMENT '结算金额',
   `note` varchar(100)  DEFAULT '' COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
     -- ... 其他列定义 ...
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '腾讯用户补扣账单';

-- 补扣结算记录表
-- ----------------------------
DROP TABLE IF EXISTS `makeup_checkout`;
CREATE TABLE `makeup_checkout` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,结算记录id',
   `role_id`  varchar(10) NOT NULL  COMMENT '代理id',
   `month`  varchar(10) NOT NULL  COMMENT '年月',
   `email`  varchar(70) NOT NULL  COMMENT '代理邮箱',
   `status` int(1) DEFAULT 0 COMMENT '状态,0 结算, 1已结算',
   `final_amount` double NOT NULL COMMENT '应付金额',
   `order_amount` double NOT NULL COMMENT '订单金额',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `note` varchar(100) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
    UNIQUE KEY `idx_role_id` (`role_id`),
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '返佣表结算记录';

-- 导出任务记录
-- ----------------------------
DROP TABLE IF EXISTS `import_task`;
CREATE TABLE `import_task` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id,结算记录id',
   `role_id`  varchar(10) NOT NULL  COMMENT '代理id',
   `task_id`  varchar(15) NOT NULL  COMMENT '任务 id',
   `task_name`  varchar(50) NOT NULL  COMMENT '任务名称',
   `status`  varchar(10) DEFAULT 'pending' COMMENT '处理中:pending,成功:success,失败:failed',
   `url` varchar(200) DEFAULT '' COMMENT '下载链接',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '导出任务记录';

-- 导出任务记录
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `level`  varchar(10) COMMENT 'Error,Warn,Info,Debug,Trace',
   `content`  varchar(200) NOT NULL  COMMENT '任务名称',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '日志';

-- ----------------------------
-- 管理员配置表
------------------------------
DROP TABLE IF EXISTS `admin_config`;
CREATE TABLE `admin_config` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `tx_price`  FLOAT DEFAULT 0  COMMENT '腾讯云账号单价',
   `ali_price`  FLOAT DEFAULT 0  COMMENT '阿里云账号单价',
   `aws_precharge`  FLOAT DEFAULT 0  COMMENT 'aws预充值',
   `tx_ts_price`  FLOAT DEFAULT 0  COMMENT '腾讯云特殊账号单价',
   `ali_ts_price`  FLOAT DEFAULT 0  COMMENT '阿里云特殊账号单价',
   `ali_discount` int(4) DEFAULT 100 COMMENT '阿里云的点位',
   `tx_discount` int(4) DEFAULT 100 COMMENT '腾讯云点位',
   `aws_discount` int(4) DEFAULT 100 COMMENT 'aws点位',
   `usdt`  varchar(100) DEFAULT '' COMMENT '收款 u 地址',
   `usdt_qr`  varchar(100) DEFAULT '' COMMENT '收款 u二维码地址',
   `ali_price`  FLOAT DEFAULT 0  COMMENT '阿里云账号单价',
   `aws_urgent_cost`  FLOAT DEFAULT 1000  COMMENT 'aws突发消耗预警',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '管理员配置';

-- ----------------------------
-- usdt web充值
------------------------------
DROP TABLE IF EXISTS `usdt_platform_recharge`;
CREATE TABLE `usdt_platform_recharge` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `amount`  double DEFAULT 0  COMMENT '在线充值金额',
   `status`  varchar(10) DEFAULT 'pending' COMMENT '状态,pending 等待中,success 成功,failed 已关闭 refund 已退款 doubt 疑问',
   `to`  varchar(50) DEFAULT '' COMMENT '收款 u 地址',
   `from` varchar(50) DEFAULT '' COMMENT '打款方 u地址',
   `hash`  varchar(100) DEFAULT '' COMMENT 'hash值',
   `note` varchar(100) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'usdt订单';

-- ----------------------------
-- bot admin 购买账号
------------------------------
DROP TABLE IF EXISTS `usdt_bot_admin_account`;
CREATE TABLE `usdt_bot_admin_account` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `count` int DEFAULT 0 COMMENT '购买数量',
   `amount`  double DEFAULT 0  COMMENT '在线充值金额',
   `status`  varchar(10) DEFAULT 'pending' COMMENT '状态,pending 等待中,success 成功,failed 已关闭 refund 已退款 doubt 疑问',
   `tg_id`  varchar(50) DEFAULT '' COMMENT '客户的tg id',
   `bot_name`  varchar(50) DEFAULT '' COMMENT 'bot 的 username',
   `to`  varchar(50) DEFAULT '' COMMENT '收款u地址',
   `from` varchar(50) DEFAULT '' COMMENT '打款方u地址',
   `hash`  varchar(100) DEFAULT '' COMMENT 'hash值',
   `note` varchar(100) DEFAULT '' COMMENT '交易备注',
   `account_ids` varchar(200) DEFAULT '' COMMENT '账号id 数组字符串',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'bot admin 购买账号';

-- ----------------------------
-- bot admin 购买账号
------------------------------

DROP TABLE IF EXISTS `usdt_bot_agent_account`;
CREATE TABLE `usdt_bot_agent_account` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `amount`  double DEFAULT 0  COMMENT '原价',
   `final_amount`  double DEFAULT 0  COMMENT '应付金额',
   `rebate_amount`  double DEFAULT 0  COMMENT '返佣金额',
   `rebate_id`  int DEFAULT NULL  COMMENT '返佣记录 id,对应财务表中的 id',
   `discount` int(4) DEFAULT 100 COMMENT '账号折扣',
   `account_ids` varchar(30) DEFAULT '' COMMENT '账号id 数组字符串',
   `bot_name`  varchar(50) DEFAULT '' COMMENT 'bot 的 username',
   `tg_id`  varchar(50) DEFAULT '' COMMENT '客户的tg id',
   `tg_username`  varchar(50) DEFAULT '' COMMENT '客户的tg username',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `status`  varchar(10) DEFAULT 'pending' COMMENT '状态,pending 等待中,success 成功,failed 已关闭 refund 已退款 doubt 疑问',
   `to`  varchar(50) DEFAULT '' COMMENT '收款 u 地址',
   `from` varchar(50) DEFAULT '' COMMENT '打款方 u地址',
   `hash`  varchar(100) DEFAULT '' COMMENT 'hash值',
   `agent_discount` int(4) DEFAULT 100 COMMENT '代理折扣',
   `note` varchar(100) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'bot agent账号';

------------------------------
-- bot agent 充值
------------------------------
DROP TABLE IF EXISTS `usdt_bot_agent_recharge`;
CREATE TABLE `usdt_bot_agent_recharge` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `amount`  double DEFAULT 0  COMMENT '原价',
   `cloud_id`  varchar(20) DEFAULT '' COMMENT '阿里云对应uid,腾讯云对应 uin',
   `repo_id` int DEFAULT NULL  COMMENT 'aws库存id,aws使用,默认是空',
   `final_amount`  double DEFAULT 0  COMMENT '应付金额',
   `rebate_amount`  double DEFAULT 0  COMMENT '返佣金额',
   `rebate_id`  int DEFAULT NULL  COMMENT '返佣记录 id,对应财务表中的 id',
   `discount` int(4) DEFAULT 100 COMMENT '账号折扣',
   `bot_name`  varchar(50) DEFAULT '' COMMENT 'bot 的 username',
   `tg_id`  varchar(50) DEFAULT '' COMMENT '客户的tg id',
   `tg_username`  varchar(50) DEFAULT '' COMMENT '客户的tg username',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `status`  varchar(10) DEFAULT 'pending' COMMENT '状态,pending 等待中,success 成功,failed 已关闭 refund 已退款 doubt 待定 doubt 疑问',
   `to`  varchar(50) DEFAULT '' COMMENT '收款u地址',
   `from` varchar(50) DEFAULT '' COMMENT '打款方u地址',
   `hash`  varchar(100) DEFAULT '' COMMENT 'hash值',
   `agent_discount` int(4) DEFAULT 100 COMMENT '代理折扣',
   `note` varchar(100) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'bot agent 充值';


------------------------------
-- tg admin机器人的绑定关系
------------------------------
DROP TABLE IF EXISTS `bot_admin_bind`;
CREATE TABLE `bot_admin_bind`
(
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `tg_id`  varchar(20) DEFAULT ''  COMMENT 'tg会话 id',
   `tg_username`  varchar(30) DEFAULT ''  COMMENT '代理id,非必须',
   `agent_email`  varchar(50) DEFAULT 0  COMMENT '代理邮箱',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'tg admin机器人的绑定关系';


------------------------------
-- 代理的客服群组 id,用于推送消息
------------------------------
DROP TABLE IF EXISTS `agent_group`;
CREATE TABLE `agent_group`
(
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `group_id`  varchar(30) DEFAULT ''  COMMENT 'bot的 group_id',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '代理的客服群组 id,用于推送消息';



------------------------------
-- bot 管理
------------------------------
DROP TABLE IF EXISTS `bot`;
CREATE TABLE `bot` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `bot_id`  varchar(20) DEFAULT ''  COMMENT 'bot id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `token`  varchar(50) DEFAULT ''  COMMENT 'tg token',
   `bot_name`  varchar(30) DEFAULT ''  COMMENT 'tg的name',
   `service`  varchar(30) DEFAULT ''  COMMENT '客服 id',
   `type` varchar(10) DEFAULT 'agent'  COMMENT 'admin,agent,message',
   `status` varchar(10) DEFAULT 'normal' COMMENT  'normal 正常,ban 封禁',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'bot';


------------------------------
-- 管理bot客户的语言 目前用于agent
------------------------------
DROP TABLE IF EXISTS `bot_locale`;
CREATE TABLE `bot_locale` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `tg_id`  varchar(20) DEFAULT ''  COMMENT 'tg id',
   `locale`  varchar(10) DEFAULT 'zh'  COMMENT '语言,zh,en',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'bot_locale';


-- bot agent的用户
------------------------------
DROP TABLE IF EXISTS `bot_agent_user`;
CREATE TABLE `bot_agent_user` (

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `tg_userid`  varchar(20) DEFAULT ''  COMMENT 'bot id', 
   `tg_username`  varchar(50) DEFAULT ''  COMMENT 'tg token',
   `bot_name`  varchar(30) DEFAULT ''  COMMENT 'tg的name',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'bot_agent_user';


-- bot agent的用户
------------------------------
DROP TABLE IF EXISTS `bot_agent_white_list`;
CREATE TABLE `bot_agent_white_list` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'bot_agent_white_list';
-- web绑定域名
------------------------------
DROP TABLE IF EXISTS `web`;
CREATE TABLE `web` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `domain`  varchar(50) DEFAULT ''  COMMENT '域名',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id',
   `site_name`  varchar(20) DEFAULT ''  COMMENT '代理id',
   `service`  varchar(30) DEFAULT ''  COMMENT '客服 id',
   `bot_name`  varchar(30) DEFAULT ''  COMMENT '绑定的 botname',
   `logo_url` varchar(200) DEFAULT '' COMMENT '',
   `cf_id` varchar(50) DEFAULT '' COMMENT '',
   `status` varchar(10) DEFAULT 'normal' COMMENT  'normal 正常,ban 封禁',
   `active` varchar(10) DEFAULT 'not actived' COMMENT  'actived,not actived',
   `parse` varchar(50) DEFAULT '' COMMENT  '解析状态actived,not actived',
   `deleted` int(0) DEFAULT 0 COMMENT  '0,1',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'web';

-- -- bot agent的用户
-- ------------------------------
-- DROP TABLE IF EXISTS `test`;
-- CREATE TABLE `test` (
   
--    `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
--    `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id',
--    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
--    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

-- ) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'test';

-- web 云充值
------------------------------
DROP TABLE IF EXISTS `usdt_web_cloud_recharge`;
CREATE TABLE `usdt_web_cloud_recharge` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `amount`  double DEFAULT 0  COMMENT '原价',
   `cloud_id`  varchar(20) DEFAULT '' COMMENT '阿里云对应uid,腾讯云对应 uin aws 对应的 aws id',
   `repo_id` int DEFAULT NULL  COMMENT '当前月份所属的库存id,aws使用',
   `final_amount`  double DEFAULT 0  COMMENT '应付金额',
   `rebate_amount`  double DEFAULT 0  COMMENT '返佣金额',
   `rebate_id`  int DEFAULT NULL  COMMENT '返佣记录 id,对应财务表中的 id',
   `discount` int(4) DEFAULT 100 COMMENT '账号折扣',
   `domain`  varchar(50) DEFAULT ''  COMMENT '域名',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `status`  varchar(10) DEFAULT 'pending' COMMENT '状态,pending 等待中,success 成功,failed 已关闭 refund 已退款 doubt 待定 doubt 疑问',
   `to`  varchar(50) DEFAULT '' COMMENT '收款u地址',
   `from` varchar(50) DEFAULT '' COMMENT '打款方u地址',
   `hash`  varchar(100) DEFAULT '' COMMENT 'hash值',
   `agent_discount` int(4) DEFAULT 100 COMMENT '代理折扣',
   `note` varchar(100) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'usdt_web_cloud_recharge';

-- web 云充
------------------------------
DROP TABLE IF EXISTS `usdt_web_cloud_account`;
CREATE TABLE `usdt_web_cloud_account` (

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `order_id`  varchar(18) DEFAULT ''  COMMENT '订单 id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id,非必须',
   `amount`  double DEFAULT 0  COMMENT '原价',
   `final_amount`  double DEFAULT 0  COMMENT '应付金额',
   `rebate_amount`  double DEFAULT 0  COMMENT '返佣金额',
   `rebate_id`  int DEFAULT NULL  COMMENT '返佣记录 id,对应财务表中的 id',
   `discount` int(4) DEFAULT 100 COMMENT '账号折扣',
   `account_ids` varchar(50) DEFAULT '' COMMENT '账号id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `domain`  varchar(50) DEFAULT ''  COMMENT '域名',
   `c_code` varchar(10) NOT NULL COMMENT '云类型',
   `status`  varchar(10) DEFAULT 'pending' COMMENT '状态,pending 等待中,success 成功,failed 已关闭 refund 已退款 doubt 疑问',
   `to`  varchar(50) DEFAULT '' COMMENT '收款 u 地址',
   `from` varchar(50) DEFAULT '' COMMENT '打款方 u地址',
   `hash`  varchar(100) DEFAULT '' COMMENT 'hash值',
   `agent_discount` int(4) DEFAULT 100 COMMENT '代理折扣',
   `note` varchar(100) DEFAULT '' COMMENT '交易备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'usdt_web_cloud_account';

-- web agent的用户
------------------------------
DROP TABLE IF EXISTS `web_agent_white_list`;
CREATE TABLE `web_agent_white_list` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'web_agent_white_list';

--web agent的用户
------------------------------
DROP TABLE IF EXISTS `web_notice`;
CREATE TABLE `web_notice` (
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_ids`  varchar(200) DEFAULT NULL  COMMENT '代理id 空字符串就是所有,代理 id数组字符串', 
   `priority` int NOT NULL COMMENT '优先级 大于0的整数',
   `status` varchar(10)  DEFAULT 'normal' COMMENT '状态,normal 正常,ban 封禁',
   `title` varchar(30)  DEFAULT '' COMMENT '标题',
   `content` varchar(300) DEFAULT '' COMMENT '公告内容',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'web_notice';


-- ------------------------------
-- DROP TABLE IF EXISTS `web_notice_role`;
-- CREATE TABLE `web_notice_role` (
   
--    `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
--    `notice_id`  int DEFAULT 0  COMMENT '公告id', 
--    `role_id`  varchar(10) DEFAULT ''  COMMENT '代理id 空字符串就是所有', 
--    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
--    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'

-- ) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = 'web_notice_role';







