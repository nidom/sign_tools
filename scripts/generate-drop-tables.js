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

async function generateDropTablesSQL() {
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
    
    // 获取所有表名
    const [tables] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [datasource.database]);
    
    console.log(`找到 ${tables.length} 个表`);
    
    // 生成删除表的SQL语句
    let dropSQL = `-- 删除 ${datasource.database} 数据库中所有表的SQL脚本\n`;
    dropSQL += `-- 生成时间: ${new Date().toISOString()}\n\n`;
    dropSQL += `-- 禁用外键检查\n`;
    dropSQL += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;
    
    for (const table of tables) {
      const tableName = table.table_name;
      dropSQL += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
    }
    
    dropSQL += `\n-- 重新启用外键检查\n`;
    dropSQL += `SET FOREIGN_KEY_CHECKS = 1;\n`;
    
    // 保存到文件
    const outputFile = path.join(process.cwd(), 'sql/generated_drop_all_tables.sql');
    fs.writeFileSync(outputFile, dropSQL);
    
    console.log(`SQL脚本已生成: ${outputFile}`);
    console.log('包含以下表:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
  } catch (error) {
    console.error('生成SQL时发生错误:', error);
  } finally {
    await connection.end();
  }
}

// 运行脚本
generateDropTablesSQL(); 