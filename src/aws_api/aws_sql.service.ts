/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RedisService } from 'src/general/redis';

@Injectable()
export class AwsSQLService {

  constructor(
    private readonly dataSource: DataSource,
    // private readonly redisService: RedisService,
  ) { }

  //重置token 
  async create_table(tableName: string): Promise<any> {

    // let redisKey = `table_${tableName}`;
    // let redisValue =  await RedisService.share().get(redisKey);
    // // let redisValue = await this.redisService.get(redisKey);
    // //如果存在，则返回1
    // if (redisValue) {

    //   return { code: 0, message: 'table already exists' };
    // }

    //

    //entity 0:  Amazon Web Services, Inc. 


   //item_type
   //  0:  Usage
   // 1:  Tax
   // 2:  Support
   // 3:  Fee
   // 4:  SavingsPlanCoveredUsage

    const createTableQuery = `


   CREATE TABLE IF NOT EXISTS \`${tableName}\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键id',
      item_id VARCHAR(80) NOT NULL COMMENT '',
      entity INT NOT NULL DEFAULT 0 COMMENT '',
      item_type  VARCHAR(50) NOT NULL DEFAULT 'Usage' COMMENT '',
      location VARCHAR(50)  COMMENT '',
      service_name VARCHAR(100)  COMMENT '',
      usage_type VARCHAR(100)  COMMENT '',
      unit VARCHAR(30)  COMMENT '',
      rate double  COMMENT '',
      cost double  COMMENT '',
      description VARCHAR(200) NULL COMMENT '',
      discount INT  DEFAULT 1 COMMENT ''
    ) ENGINE = InnoDB CHARACTER SET = utf8mb4;

  

  `;

  const truncateTableQuery = `

    TRUNCATE TABLE ${tableName};
    
  `;

  try {

      await this.dataSource.query(createTableQuery);
      await this.dataSource.query(truncateTableQuery);

      //60天后失效
      // await RedisService.share().set(redisKey, 'ok', 60 * 60 * 24 * 60);
      return { code: 0, message: 'table created successfully' };
    } catch (error) {

      console.log(error)
      return { code: -1, message: 'table created failed' };
    }
  }

  /**
   * 批量插入五条数据到指定表
   * @param tableName 表名
   * @param dataList 数据数组，长度为5，每个元素为对象，包含表字段
   * @returns 插入结果
   */
  async insertFiveRows(tableName: string, dataList: any[]): Promise<any> {
    
    // if (!Array.isArray(dataList) || dataList.length !== 5) {
    //   return { code: -1, message: 'dataList must be an array of 5 items' };
    // }

    // 构建插入字段和占位符
    const fields = [
      'item_id',
      'entity',
      'item_type',
      'location',
      'service_name',
      'usage_type',
      'unit',
      'rate',
      'cost',
      'description',
      'discount'
    ];


    const placeholders = dataList.map(() => `(${fields.map(() => '?').join(',')})`).join(',');
    const values = [];
    for (const row of dataList) {
      for (const field of fields) {
        values.push(row[field] ?? null);
      }
    }
    // console.log(dataList)

    const insertSql = `
      INSERT INTO ${tableName} (${fields.join(',')})
      VALUES ${placeholders}
    `;

    try {
      await this.dataSource.query(insertSql, values);
      return { code: 0, message: 'rows inserted successfully' };
    } catch (error) {
      console.log(error)
      return { code: -1, message: 'insert failed', error: error.message };
    }
  }

// INSERT_YOUR_CODE
  /**
   * 查询指定表的数据
   * @param tableName 表名
   * @returns 查询结果
   */
  async query_data(tableName: string): Promise<any> {
    const sql = `SELECT * FROM ${tableName}`;
    try {
      const results = await this.dataSource.query(sql);
      return { code: 0, data: results };
    } catch (error) {
      console.log(error);
      return { code: -1, message: 'query failed', error: error.message };
    }
  }


  // INSERT_YOUR_CODE
  /**
   * 查询指定表的数据
   * @param tableName 表名
   * @returns 查询结果
   */
  async query_data_no_discount(tableName: string): Promise<any> {
    const sql = `SELECT * FROM ${tableName} where discount = 0`;
    try {
      const results = await this.dataSource.query(sql);
      return { code: 0, data: results };
    } catch (error) {
      console.log(error);
      return { code: -1, message: 'query failed', error: error.message };
    }
  }

}
