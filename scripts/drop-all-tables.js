const mysql = require('mysql2/promise');
const { parse } = require('yaml');
const fs = require('fs');
const path = require('path');

// 读取配置文件
const getConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  const yamlPath = path.join(process.cwd(), `./app.${environment}.yml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  return parse(file);
};

async function dropAllTables() {
  const config = getConfig();
  const { datasource } = config;
  
  // 创建数据库连接
  const connection = await mysql.createConnection({
    host: datasource.host,
    port: datasource.port,
    user: datasource.username,
    password: datasource.password,
    database: datasource.database,
    charset: datasource.charset
  });

  try {
    console.log('连接到数据库:', datasource.database);
    
    // 禁用外键检查
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    
    // 获取所有表名
    const [tables] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [datasource.database]);
    
    console.log(`找到 ${tables.length} 个表`);
    
    // 删除所有表
    for (const table of tables) {
      const tableName = table.table_name;
      console.log(`正在删除表: ${tableName}`);
      await connection.execute(`DROP TABLE IF EXISTS \`${tableName}\``);
    }
    
    // 重新启用外键检查
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('所有表已成功删除！');
    
  } catch (error) {
    console.error('删除表时发生错误:', error);
  } finally {
    await connection.end();
  }
}

// 运行脚本
dropAllTables(); 