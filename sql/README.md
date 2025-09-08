# MySQL删除所有数据表

本目录包含了删除MySQL数据库中所有表的多种方法。

## ⚠️ 警告
**删除操作不可逆！请确保您已经备份了重要数据。**

## 方法1：使用Node.js脚本自动删除

### 1.1 直接删除所有表
```bash
# 安装依赖（如果还没有安装）
npm install mysql2 yaml

# 运行删除脚本
node scripts/drop-all-tables.js
```

### 1.2 生成删除SQL脚本
```bash
# 生成删除所有表的SQL脚本
node scripts/generate-drop-tables.js
```

生成的SQL文件将保存在 `sql/generated_drop_all_tables.sql`

## 方法2：使用MySQL命令行

### 2.1 连接到数据库
```bash
mysql -h 8.217.61.63 -P 8020 -u aws_bill -p aws_bill
```

### 2.2 查看所有表
```sql
SHOW TABLES;
```

### 2.3 删除所有表
```sql
-- 禁用外键检查
SET FOREIGN_KEY_CHECKS = 0;

-- 删除所有表（需要根据实际表名替换）
DROP TABLE IF EXISTS table1;
DROP TABLE IF EXISTS table2;
-- ... 继续删除其他表

-- 重新启用外键检查
SET FOREIGN_KEY_CHECKS = 1;
```

## 方法3：使用生成的SQL脚本

### 3.1 生成SQL脚本
```bash
node scripts/generate-drop-tables.js
```

### 3.2 执行生成的SQL脚本
```bash
mysql -h 8.217.61.63 -P 8020 -u aws_bill -p aws_bill < sql/generated_drop_all_tables.sql
```

## 方法4：一键删除数据库并重建

如果您想完全重置数据库：

```sql
-- 删除整个数据库
DROP DATABASE aws_bill;

-- 重新创建数据库
CREATE DATABASE aws_bill CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 注意事项

1. **备份数据**：在执行删除操作前，请务必备份重要数据
2. **外键约束**：脚本会自动禁用外键检查，避免删除顺序问题
3. **权限**：确保数据库用户有足够的权限执行删除操作
4. **环境配置**：脚本会根据 `NODE_ENV` 环境变量选择对应的配置文件

## 数据库连接信息

- 主机：8.217.61.63
- 端口：8020
- 数据库：aws_bill
- 用户名：aws_bill
- 密码：Kw3EnAEMZS57W6Gr 