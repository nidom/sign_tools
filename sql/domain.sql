-----代理
--ff_agent
------------------------------
-- 代理用户表
-- ----------------------------
DROP TABLE IF EXISTS `tw_domain`;
CREATE TABLE `tw_domain` (   
   
   `id` int NOT NULL AUTO_INCREMENT primary key COMMENT '主键id',
   `domain` varchar(100) NOT NULL COMMENT '域名',
   `ip` varchar(50) NOT NULL COMMENT 'ip',
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
) ENGINE = InnoDB  CHARACTER SET = utf8mb4 COMMENT = '台湾域名表';
