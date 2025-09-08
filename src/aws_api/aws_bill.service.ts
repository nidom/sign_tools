/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { EntitySchema } from "typeorm"
import { FileManagerService } from 'src/actions/file.service';
import { getNextMonth, getLastMonth, getCurrentMonth } from 'src/utils/date';
import { GetObjectCommand } from '@aws-sdk/client-s3';

import { createDynamicEntity2 } from 'src/entitis/dynamicEntity';
import { DataSource } from 'typeorm';
import { shortStringFromDate } from '../utils/date';
import { strToMd5 } from '../utils/str';
import { CResult } from '../utils/request';
import { AwsDealDataService } from './aws_deal_data.service';
import { AwsSQLService } from './aws_sql.service';
import { RedisService } from 'src/general/redis';

const axios = require('axios');
const fs = require('fs');
const path = require('path');
// const csv = require('csv-parser');

@Injectable()
export class AwsBillService {

  constructor(
    private readonly fileManagerService: FileManagerService,
    private readonly dataSource: DataSource,
    private readonly awsDealDataService: AwsDealDataService,
    private readonly awsSQLService: AwsSQLService,
  ) { }


  //更新aws 账单
  async orgs(): Promise<any> {

    let month_string = shortStringFromDate(new Date());
    let md5_str = strToMd5(month_string);
    //  console.log(month);
    // 使用三方库 axios 发起一个 GET 请求
    try {

      let url = `https://58duodianyun.com/api/server/aws_orgs/${md5_str}`;
      let response = await axios.get(url);
      let data = response.data;
      if (data.code < 0) {
        return new CResult(-1, '', data.message);
      }
      // console.log(response.data);
      return new CResult(0, '', data.data);

    } catch (error) {

      return new CResult(-1, '', error.message);
    }
  }

  //n
  async update_last_aws_billing(): Promise<any> {

    let start_date = getLastMonth();
    let end_date = getCurrentMonth();
    // console.log(start_date, end_date);

    // let start_date = '20250701';
    // let end_date = '20250801';
    let orgs_data = await this.orgs();
    if (orgs_data.code < 0) {
      //报警 获取 org 失败
      return
    }

    let orgs = orgs_data.data;
    let cacheData = {}
    let isProcess = await RedisService.share().get('aws_billing_process')
    if (isProcess) {
      return {
        code: -1,
        message: '有任务正在进行中',
        data: {}
      }
    }
    await RedisService.share().set('aws_billing_process', 'true')

    for (let org of orgs) {

      await this.aws_billing_action(start_date, end_date, org, cacheData);

    }
    // // INSERT_YOUR_CODE
    // // 计算 cacheData 多少 m（兆字节）
    // // 先序列化为字符串
    // const cacheDataStr = JSON.stringify(cacheData);
    // // 计算字节数
    // const byteLength = Buffer.byteLength(cacheDataStr, 'utf8');
    // // 转为兆字节（MB）
    // const mb = byteLength / (1024 * 1024);
    // console.log(`cacheData 大小: ${mb.toFixed(2)} MB`);
    await this.write_data(start_date, cacheData);
    await RedisService.share().del('aws_billing_process')
    
    // INSERT_YOUR_CODE
    // 释放 cacheData
    cacheData = null;

    await this.delete_files();
    // console.log(start_date, end_date);
  }

  async update_current_aws_billing(): Promise<any> {

    //
    let start_date = getCurrentMonth();
    let end_date = getNextMonth(start_date);

    console.log(start_date, end_date);

    let orgs_data = await this.orgs();
    if (orgs_data.code < 0) {
      //报警 获取 org 失败
      return
    }

    let orgs = orgs_data.data;


    let isProcess = await RedisService.share().get('aws_billing_process')
    if (isProcess) {
      return {
        code: -1,
        message: '有任务正在进行中',
        data: {}
      }
    }
    await RedisService.share().set('aws_billing_process', 'true')
    let cacheData = {}
    for (let org of orgs) {

      await this.aws_billing_action(start_date, end_date, org, cacheData);

    }

    // // INSERT_YOUR_CODE
    // // 计算 cacheData 多少 m（兆字节）
    // // 先序列化为字符串
    // const cacheDataStr = JSON.stringify(cacheData);
    // // 计算字节数
    // const byteLength = Buffer.byteLength(cacheDataStr, 'utf8');
    // // 转为兆字节（MB）
    // const mb = byteLength / (1024 * 1024);
    // console.log(`cacheData 大小: ${mb.toFixed(2)} MB`);
    await this.write_data(start_date, cacheData);

    await RedisService.share().del('aws_billing_process')
    // 释放 cacheData
    cacheData = null;
    // await this.delete_files();

    // console.log(start_date, end_date);
  }

  //请求aws账单
  async aws_billing_action(start_date: string, end_date: string, org, cacheData): Promise<any> {

    // let dataTest = {}
    try {

      const client = new S3Client({
        region: "us-west-2",
        credentials: {
          accessKeyId: org.key_id,
          secretAccessKey: org.key_secret
        }
      });

      let timeInterval = `${start_date}-${end_date}`;

      // console.log(monthInterval);
      // console.log("S3 Objects:", response.Contents);
      // Check if the manifest file exists in the response
      // const manifestKey2 = 'CUR/CUR-REPORT-DAYS/20250501-20250601/CUR-REPORT-DAYS-00001.csv.gz'

      // Import the GetObjectCommand to retrieve the file content

      // Create a command to get the manifest file
      const getManifestCommand = new GetObjectCommand({
        Bucket: `cur-${org.org_id}-days`,
        Key: `CUR/CUR-REPORT-DAYS/${timeInterval}/CUR-REPORT-DAYS-Manifest.json`
      });

      // console.log('开始下载');
      // Send the command to retrieve the manifest file
      const manifestResponse = await client.send(getManifestCommand);
      let manifest_content = await manifestResponse.Body.transformToString();
      if (!manifest_content) {

        return new CResult(-1, '', 'manifest_content is null');
      }

      // console.log(manifest_content);
      // return

      // return

      let manifest_content_json = JSON.parse(manifest_content);
      let reportKeys = manifest_content_json.reportKeys;
      // 将 start_date 从 '20250701' 格式转为 '202507'
      let month = start_date.substring(0, 6);
      for (let reportKey of reportKeys) {
        await this.get_gz_file(reportKey, client, month, org, cacheData);
      }

      // console.log('-----------');
      //
      // console.log(dataTest);

    } catch (error) {

      //桶不存在报错 需要做预警
      return new CResult(-1, '', error.message);

      // console.error('Error processing AWS billing:', error);
      // throw error;
    }

  }


  //解压 file
  async get_gz_file(key: string, client: S3Client, month: string, org, cacheData): Promise<any> {

    const getGZCommand = new GetObjectCommand({
      Bucket: `cur-${org.org_id}-days`,
      Key: key
    });

    // console.log('开始下载');
    // Send the command to retrieve the manifest file
    const gzResponse = await client.send(getGZCommand);
    const filesDir = path.join(process.cwd(), 'files');

    // if (!fs.existsSync(filesDir)) {
    //   await fsPromises.mkdir(filesDir, { recursive: true });
    //   console.log(`Created directory: ${filesDir}`);
    // }
    // Get the file content as a buffer
    //   // Create MD5 hash of the key to use as a unique identifier
    //   const crypto = require('crypto');
    //   const keyMd5 = crypto.createHash('md5').update(key).digest('hex');
    //   console.log(`File key MD5: ${keyMd5}`);

    // Create MD5 hash of the key to use as a unique identifier
    //   const crypto = require('crypto');
    // Remove the last three characters from the key before creating the hash
    //   const trimmedKey = key.slice(0, -7);


    const keyMd5 = strToMd5(key + org.org_id)
    console.log(`File key MD5: ${keyMd5}`);

    const fileContent = await gzResponse.Body.transformToByteArray();
    // Write the buffer to a file
    // 
    let outputPath = path.join(filesDir, `${keyMd5}.csv`);
    console.log(outputPath);

    console.log('开始解压');
    await this.fileManagerService.decompressGzipFile(Buffer.from(fileContent), outputPath);
    console.log('解压结束');
    //处理数据
    await this.awsDealDataService.deal_data(outputPath, month, cacheData);
  }



  //入库
  async write_data(start_date: string, cacheData): Promise<any> {

    // INSERT_YOUR_CODE
    // month 是 start_date 的前 6 位
    const month = start_date.substring(0, 6);
    // console.log(cacheData)
    // // 获取cacheData的所有 key 并循环
    const keys = Object.keys(cacheData);
    for (const key of keys) {

      const value = cacheData[key];

      // let item_ids = value.item_ids
      // let data = value.data

      //先入库 
      let tableName = month + '_' + key
      // console.log(tableName)
      //先建表
      await this.awsSQLService.create_table(tableName)
      let result = await this.awsSQLService.insertFiveRows(tableName, value)

      if (result.code >= 0) {
        //对item_ids进行缓存
        // await this.cacheItemIDs(item_ids)

      } else {

        //失败了进行预警
        
      }

      // 这里可以对每个 key 和对应的 value 进行处理
      // 例如：console.log(key, value);
    }

  }

  //入库
  async delete_files(): Promise<any> {

    let filesDir = path.join(process.cwd(), 'files');
    let files = fs.readdirSync(filesDir);
    for (const file of files) {
      fs.unlinkSync(path.join(filesDir, file));
    }

  }
//入库
  async query_data(uid, month): Promise<any> {

    let tableName = month + '_' + uid
    let result = await this.awsSQLService.query_data(tableName)
    if (result.code < 0) {
      return new CResult(-1, '数据不存在', '');
    }
    let list = result.data
    if (list.length == 0) {
      return new CResult(-2, '数据不存在', '');
    }

    // INSERT_YOUR_CODE
    // 按 service_name -> location -> usage_type -> description 分组
    const grouped = {};
    for (const item of list) {

      const service = item.service_name || 'Any';
      const location = item.location || 'Any';
      const usage = item.usage_type || 'Any';
      const description = item.description || 'Any';

      if (!grouped[service]) {
        grouped[service] = {};
      }
      if (!grouped[service][location]) {
        grouped[service][location] = {};
      }
      if (!grouped[service][location][usage]) {
        grouped[service][location][usage] = {};
      }
      if (!grouped[service][location][usage][description]) {
        grouped[service][location][usage][description] = [];
      }
      grouped[service][location][usage][description].push(item);
    }

    // 对每个 description 分组的 cost 和 rate 字段进行求和合并
    const summary = {};
    let sum_cost = 0
    for (const service in grouped) {
      summary[service] = {};
      for (const location in grouped[service]) {
        summary[service][location] = {};
        for (const usage in grouped[service][location]) {
          summary[service][location][usage] = {};
          for (const description in grouped[service][location][usage]) {
            const items = grouped[service][location][usage][description];
            let totalCost = 0;
            let totalRate = 0;
            for (const item of items) {
              let cost = 0;
              let rate = 0;
              if (item.cost !== undefined && item.cost !== null && !isNaN(Number(item.cost))) {
                cost = Number(item.cost);
              }
              if (item.rate !== undefined && item.rate !== null && !isNaN(Number(item.rate))) {
                rate = Number(item.rate);
              }
              totalCost += cost;
              totalRate += rate;
            }
            summary[service][location][usage][description] = {
              totalCost,
              totalRate,
              // count: items.length,
              unit: items[0].unit,
              // description: items[0].description
            };
            sum_cost += totalCost
          }
        }
      }
    }


    return new CResult(0, '', {
      summary: summary,
      sum_cost: sum_cost
    });

  }




  //入库
  async query_data_no_discount(uid, month): Promise<any> {

    let tableName = month + '_' + uid
    let result = await this.awsSQLService.query_data_no_discount(tableName)
    if (result.code < 0) {
      return new CResult(-1, '数据不存在', '');
    }
    let list = result.data
    if (list.length == 0) {
      return new CResult(-2, '数据不存在', '');
    }

    // INSERT_YOUR_CODE
    // 按 service_name -> location -> usage_type -> description 分组
    const grouped = {};
    for (const item of list) {

      const service = item.service_name || 'Any';
      const location = item.location || 'Any';
      const usage = item.usage_type || 'Any';
      const description = item.description || 'Any';

      if (!grouped[service]) {
        grouped[service] = {};
      }
      if (!grouped[service][location]) {
        grouped[service][location] = {};
      }
      if (!grouped[service][location][usage]) {
        grouped[service][location][usage] = {};
      }
      if (!grouped[service][location][usage][description]) {
        grouped[service][location][usage][description] = [];
      }
      grouped[service][location][usage][description].push(item);
    }

    // 对每个 description 分组的 cost 和 rate 字段进行求和合并
    const summary = {};
    let sum_cost = 0
    for (const service in grouped) {
      summary[service] = {};
      for (const location in grouped[service]) {
        summary[service][location] = {};
        for (const usage in grouped[service][location]) {
          summary[service][location][usage] = {};
          for (const description in grouped[service][location][usage]) {
            const items = grouped[service][location][usage][description];
            let totalCost = 0;
            let totalRate = 0;
            for (const item of items) {
              let cost = 0;
              let rate = 0;
              if (item.cost !== undefined && item.cost !== null && !isNaN(Number(item.cost))) {
                cost = Number(item.cost);
              }
              if (item.rate !== undefined && item.rate !== null && !isNaN(Number(item.rate))) {
                rate = Number(item.rate);
              }
              totalCost += cost;
              totalRate += rate;
            }
            summary[service][location][usage][description] = {
              totalCost,
              totalRate,
              // count: items.length,
              unit: items[0].unit,
              // description: items[0].description
            };
            sum_cost += totalCost
          }
        }
      }
    }


    return new CResult(0, '', {
      summary: summary,
      sum_cost: sum_cost
    });

  }



}





