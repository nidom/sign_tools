/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { RedisService } from 'src/general/redis';
import { AwsSQLService } from './aws_sql.service';
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// aws Region 和 Region Name 的对应表
export const AWS_REGION_NAME_MAP: { [region: string]: string } = {
  'us-east-1': 'US East (N. Virginia)',
  'us-east-2': 'US East (Ohio)',
  'us-west-1': 'US West (N. California)',
  'us-west-2': 'US West (Oregon)',
  'af-south-1': 'Africa (Cape Town)',
  'af-south-2': 'Asia Pacific (Hyderabad)',
  'ap-east-1': 'Asia Pacific (Hong Kong)',
  'ap-east-2': 'Asia Pacific (Taipei)',
  'ap-south-1': 'Asia Pacific (Mumbai)',
  'ap-south-2': 'Asia Pacific (Hyderabad)',
  'ap-southeast-1': 'Asia Pacific (Singapore)',
  'ap-southeast-2': 'Asia Pacific (Sydney)',
  'ap-southeast-3': 'Asia Pacific (Jakarta)',
  'ap-southeast-5': 'Asia Pacific (Malaysia)',
  'ap-southeast-4': 'Asia Pacific (Melbourne)',
  'ap-southeast-7': 'Asia Pacific (Thailand)',
  'ap-northeast-1': 'Asia Pacific (Tokyo)',
  'ap-northeast-2': 'Asia Pacific (Seoul)',
  'ap-northeast-3': 'Asia Pacific (Osaka)',
  'ca-central-1': 'Canada (Central)',
  'ca-west-1': 'Canada West (Calgary)',
  'eu-central-1': 'Europe (Frankfurt)',
  'eu-central-2': 'Europe (Zurich)',
  'eu-west-1': 'Europe (Ireland)',
  'eu-west-2': 'Europe (London)',
  'eu-west-3': 'Europe (Paris)',
  'eu-north-1': 'Europe (Stockholm)',
  'eu-south-1': 'Europe (Milan)',
  'eu-south-2': 'Europe (Spain)',
  'me-south-1': 'Middle East (Bahrain)',
  'me-central-1': 'Middle East (UAE)',
  'sa-east-1': 'South America (São Paulo)',
  'us-gov-east-1': 'AWS GovCloud (US-East)',
  'us-gov-west-1': 'AWS GovCloud (US-West)',
  'cn-north-1': 'China (Beijing)',
  'cn-northwest-1': 'China (Ningxia)',
  'il-central-1': 'Israel (Tel Aviv)',
  'mx-central-1': 'Mexico (Central)',
  'global': 'Global',
  '':'Any'
};



export const NO_DISCOUNT_PRODUCT_CODES = [
  'AWSSupportBusiness',
  'AmazonRegistrar',
  'AWSCostExplorer',
  'AmazonBedrock',
  'AWSShield'
]

@Injectable()
export class AwsDealDataService {

  // constructor(
  //   private readonly awsSQLService: AwsSQLService,
  // ) { }


  //解析数据 数据
  async deal_data(csvPath: string, month: string, cacheData): Promise<any> {

    console.log('开始处理数据');
    // let data = {}

    // cacheData:{

    //   '23232323':{
    //     'item_ids':['asdad'],
    //     'data':[]
    //   },

    // }
     let reding = true
     fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', async (row) => {

        await this.deal_data_action(row, month, cacheData);
      //入库
       })
      .on('end', async () => {

        reding = false
        console.log('CSV file successfully processed');
        // console.log(cacheData);
        // await this.write_data(month, cacheData)
        // console.log(testData);
      });

      while(reding){
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

   // 等待上面的异步代码执行完再继续执行
  // 由于 .on('data', async (row) => { ... }) 的回调不会等待异步完成，需手动收集 Promise 并在 end 时等待

  //  console.log('开始处理数据');
    // let promises: Promise<any>[] = [];

    // 要实现同步处理 CSV 文件，可以使用 csv-parse/sync 或 papaparse 等同步解析库
    // 这里用 fs.readFileSync 读取文件内容，然后用 csv-parse/sync 解析
    // 需要 csv-parse/sync 库: const parse = require('csv-parse/sync').parse;
    // 由于不能 import，这里假设 parse 已经可用

    // // 同步读取csvPath的数据
    // const fs = require('fs');


    // const fileContent = fs.readFileSync(csvPath, 'utf-8');
    // const records = parse(fileContent, {
    //   columns: true,
    //   skip_empty_lines: true
    // });

    // for (const row of records) {
    //   await this.deal_data_action(row, month, testData, cacheData);
    // }
    // await this.write_data(month, cacheData);

    // const fileContent = fs.readFileSync(csvPath, 'utf-8');
    // // csv-parse/sync 默认第一行为表头
    // const parse = require('csv-parse/sync').parse;
    // const records = await parse(fileContent, {
    //   columns: true,
    //   skip_empty_lines: true
    // });

    // // console.log('--------------------------------');
    // for (const row of records) {
    //   // 这里可以直接 await，因为在 async 函数里
    //   await this.deal_data_action(row, month, testData, cacheData);
    // }
    // // 全部处理完后写入数据
    // await this.write_data(month, cacheData);
    // fs.createReadStream(csvPath)
    //   .pipe(csv())
    //   .on('data', (row) => {
    //     // 收集每个异步处理的 Promise
    //     promises.push(this.deal_data_action(row, month, testData, cacheData));
    //   })
    //   .on('end', async () => {
    //     // 等待所有异步处理完成
    //     await Promise.all(promises);
    //     console.log('CSV file successfully processed');
    //     await this.write_data(month, cacheData)
    //     // console.log(testData);
    //   });
      // console.log('开始处理数据111');

  }


  //解析数据 数据
  async deal_data_action(row, month: string, cacheData): Promise<any> {

    // console.log(row['bill/PayerAccountId']);
    let item_id = row['identity/LineItemId'];
    // let cache = await RedisService.share().get('item_' + item_id);
    // if (cache) {
    //   console.log('uid is empty');
    //   console.log(item_id);
    //   return
    // }

    // let uid = row['bill/PayerAccountId'];
    let uid = row['lineItem/UsageAccountId'];
    if (isEmpty(uid)) {
      console.log('uid is empty');
      return
    }

    // let entity = row['lineItem/LegalEntity'];

    let item_type = row['lineItem/LineItemType'];

    // if(entity == 'Amazon Web Services, Inc.'){


    //   console.log(entity);
    // }




    // // 对item_type去除空格
    // if (typeof item_type === 'string') {
    //     item_type = item_type.replace(/\s+/g, '');
    // }


    // let types = []
    // testData.push(item_type)



    //             let totoalCost = testData[uid]
    // // 将cost转为高精度浮点
    //             let costStr = row['lineItem/UnblendedCost'];
    //             let cost = parseFloat(costStr) 

    //             if(totoalCost == null){

    //                 testData[uid] = cost
    //            }else {

    //                 testData[uid] = totoalCost + cost
    //             }
    // if((item_type!='Usage') && (item_type!='Tax') && (item_type!='SavingsPlanNegation') && (item_type!='SavingsPlanCoveredUsage')

    //     &&(item_type!='Credit') && (item_type!='Fee') && (item_type!='SavingsPlanRecurringFee')
    //      &&(item_type!='DistributorDiscount')
    //   ) {

    //         console.log(uid);
    //         console.log(item_type);

    //     }



    if (item_type == 'Usage' || item_type == 'Tax' || item_type == 'Support'
      //  ||item_type == 'DistributorDiscount' 
      //  || item_type == 'Credit' 
      || item_type == 'Fee'
      // || item_type == 'BundledDiscount'
      // || item_type == 'Refund'
      //  || item_type == 'SavingsPlanRecurringFee'
      || item_type == 'SavingsPlanCoveredUsage'
      // || item_type == 'SavingsPlanAmortizedFee'
      // || item_type == 'SavingsPlanRecurringFee'
    ) {


      let costStr = row['lineItem/UnblendedCost'];
      let cost = parseFloat(costStr)
      let description = row['lineItem/LineItemDescription']
      let rateStr = row['lineItem/UsageAmount']
      let rate = parseFloat(rateStr)
      let usage_type = row['lineItem/UsageType']
      let unit = row['pricing/unit']
      let region = row['product/region']
      let location = AWS_REGION_NAME_MAP[region]
      let discount = 1
      let entity = row['bill/BillingEntity']
      let service_name = ''
         service_name = row['product/servicename'];
      let product_code = row['lineItem/ProductCode'];
      if(isEmpty(service_name)&&(entity == 'AWS Marketplace')){
  
        // console.log(row);
        service_name = 'AWS Marketplace'
        discount = 0

       }
       
       if(isEmpty(service_name)&&(entity != 'AWS Marketplace')){
  
     
        service_name = row['product/ProductName']

       }


       if(isEmpty(service_name)||service_name==''){
  
        console.log(row);

       }
      //  if(isEmpty(service_name)&&entity == 'AWS Marketplace'){

      //   service_name = 'AWS Marketplace'
      //   discount = 0

      //  }

   
      if(NO_DISCOUNT_PRODUCT_CODES.includes(product_code)){
        discount = 0
      }


      // let entity = row['bill/InvoicingEntity']

      if(isEmpty(rateStr)){
       
           rate = -1

      }

      let uidData = cacheData[uid]
      // if (uidData == null) {
      
      //   uidData = {
      //     'item_ids': [],
      //     'data': []
      //   }
      // }

      if (uidData == null) {
      
        uidData =[]
      }

      // 'item_id',
      // 'entity',
      // 'item_type',
      // 'location',
      // 'service_name',
      // 'usage_type',
      // 'unit',
      // 'rate',
      // 'cost',
      // 'description'

      // uidData.item_ids.push(item_id)
      uidData.push({item_id: item_id, entity: 0, item_type: item_type, location: location, service_name: service_name, usage_type: usage_type, unit: unit, rate: rate, cost: cost, description: description,discount })
      cacheData[uid] = uidData


      




      //             let totoalCost = testData[uid]
      // // 将cost转为高精度浮点
      //             let costStr = row['lineItem/UnblendedCost'];
      //             let cost = parseFloat(costStr) 

      //             if(totoalCost == null){

      //                 testData[uid] = cost
      //            }else {

      //                 testData[uid] = totoalCost + cost
      //             }


    } else {


      // if(uid == '257394471285' || uid == '390403868126' 
      //   || uid == '977099014453'
      //     || uid == '615299768675'
      //  ){

      //   let costStr = row['lineItem/UnblendedCost'];
      //    console.log(uid);
      //    console.log(item_type);
      //    console.log(costStr);
      //  }

      if (item_type == 'Fee') {

        // let costStr = row['lineItem/UnblendedCost'];
        // let description = row['llineItem/LineItemDescription'];
        // let product_name = row['llineItem/ProductCode'];


        // console.log(product_code)

        //   console.log(row);
        // //  console.log(uid);
        //   //  console.log(item_type);
        //  console.log(costStr);
        //  console.log(description);

      }

    }

    // if(item_type == 'Refund' ){

    //     let totoalCost = testData[uid]
    //     // 将cost转为高精度浮点
    //                 let costStr = row['lineItem/UnblendedCost'];
    //                 let cost = parseFloat(costStr) 

    //                 if(totoalCost == null){

    //                     testData[uid] = cost
    //                }else {

    //                     testData[uid] = totoalCost + cost
    //                 }
    // }

    // let location = row['identity/Location'];
    // let service_name = row['identity/ProductName'];
    // let usage_type = row['identity/UsageType'];
    // let unit = row['identity/Unit'];
    // let rate = row['identity/Rate'];
    // let cost = row['identity/Cost'];

  }



  


  async cacheItemIDs(ids): Promise<any> {

    //缓存2个月
    for (const id of ids) {
      // 缓存每个item_id，2个月
      await RedisService.share().set('item_' + id, true, 60 * 60 * 24 * 60);
    }

    // 这里可以对每个 key 和对应的 value 进行处理
    // 例如：console.log(key, value);
  }


}