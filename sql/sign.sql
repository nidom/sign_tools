-----代理
--ff_agent
------------------------------
-- 代理用户表
-- ----------------------------
DROP TABLE IF EXISTS `agent_role`;
CREATE TABLE `agent_role` (   

   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `role_id` varchar(10) NOT NULL COMMENT '角色id',
   `email` varchar(70) NOT NULL COMMENT '用户邮箱',
   `password` varchar(32)  NOT NULL COMMENT '用户密码md5',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `status` varchar(10)  DEFAULT 'normal' COMMENT '状态,normal 正常,ban 封禁',
   `super_balance` int(10  DEFAULT 0 COMMENT '超级签名剩余量 是整数',
   `dis_balance` int(10)  DEFAULT 0 COMMENT '分发剩余量 是整数',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   -- ... 其他列定义 ...

   -- UNIQUE KEY `idx_role_id` (`role_id`),
   --  UNIQUE KEY  `idx_email` (`email`),
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '代理用户表';

--代理的用户记录
DROP TABLE IF EXISTS `agent_user`;
CREATE TABLE `agent_user` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `agent_id` varchar(10) NOT NULL COMMENT '代理 role_id',
   `user_id`   int(10)  DEFAULT 0  COMMENT '用户id,是整数 ',
   `note`  varchar(100) DEFAULT ''  COMMENT '备注',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '代理用户表';


