/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignController } from './sign.controller';
import { SuperDeviceEntity } from 'src/entitis/super_device.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { LogService } from 'src/actions/log.service';
import { IOSDeviceEntity } from 'src/entitis/ios_device.entity';
import { Inject } from '@nestjs/common';
const fs = require('fs');
// const provisioning = require('provisioning');
// const parse = require('mobileprovision-parse');

const provisioning = require( '@stendahls/provision-parse' );
@Injectable()
export class UDIDMonitorService {
 
    public udids = []
    constructor(
      
        @InjectRepository(SuperDeviceEntity)
        private readonly superDeviceRepository: Repository<SuperDeviceEntity>,

        @InjectRepository(IOSDeviceEntity)
        private readonly iosDeviceRepository: Repository<IOSDeviceEntity>,

        

        @Inject(LogService)
        private readonly logService: LogService,
        // private  udids = []

        // public udids = []
      ) { 
  
    }

    async udid_monitor(): Promise<any> {
      
      
    const latestRecords = await this.superDeviceRepository.find({
        order: { id: 'DESC' },
        take: 3
    });
    console.log(latestRecords);
    for(let record of latestRecords){

       let result = await this.udid_check(record);
       //如果卡设备
       if(result == 'process'){
        this.udid_warning(record.udid,record.cert_iss);
       }
    }

    // const latestRecords = await this.superUDIDRepository.find({

    //     order: { id: 'DESC' }
    // });
  
  }

  async udid_test(udid: string): Promise<any> {

    let record = await this.superDeviceRepository.findOne({
      where: { udid: udid }
    });

    if(!record){
      return "没有找到这台设备"
    }

    let result = await this.udid_check(record);



    console.log('--------------------------------');
    console.log(result);
    if(result == 'process'){

       return "卡设备了"
    }else if(result == 'complete'){
      return "没有卡设备"
    }
  
  }
  


  async udid_check(record: SuperDeviceEntity): Promise<any> {


    let result = null;
    let dircetory = `/www/wwwroot/iosxapp.com/data/udidcert/${record.udid}`;
  
    // 获取dircetory下后缀为mobileprovision的文件
    let mobileprovisionFiles: string[] = [];
    if (fs.existsSync(dircetory) && fs.statSync(dircetory).isDirectory()) {
     

         mobileprovisionFiles = fs.readdirSync(dircetory).filter(file => file.endsWith('.mobileprovision'))
         let mobileprovisionFile = mobileprovisionFiles[0];

        let filePath = `/www/wwwroot/iosxapp.com/data/udidcert/${record.udid}/${mobileprovisionFile}`;

        // provisioning(filePath, (err, obj) => {
        //   if (err) {
        //     console.error('Error reading the mobileprovision file:', err);
        //     return;
        //   }
          
        //   console.log('UUID:', obj.UUID);

        // });

        provisioning( filePath, ( parseError, provisionData ) => {
          //  console.log( provisionData );

          let udids = provisionData.ProvisionedDevices;
          if(udids.includes(record.udid)){
             //卡设备
            result =  'complete';
            // if(warning){
            //   this.udid_warning(record.udid,provisionData.AppIDName);

            //  }
          }else{
              result =  'process';
          }

        } );

      // let mobileprovision = provisioning.parse(mobileprovisionFile);

        // let uuid = mobileprovision.UUID;
        // console.log(uuid);
      
      }else{

       //证书配置异常
       this.logService.error(record.udid);
       result =  'error';
  
    }

    // INSERT_YOUR_CODE
    // 等待 result 不为空时返回 result
    while (result === undefined || result === null || result === '') {
      // 这里可以适当延迟，避免死循环占用CPU
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return result;
  
  }


  //证书警告
  async udid_warning(udid,cert_iss): Promise<any> {

    if(!this.udids.includes(udid)){
        this.udids.push(udid);
        this.logService.warning(udid,cert_iss);
    }

  }



  
  //处理卡设备
  async ios_device_crash(): Promise<any> {

  
    let records = await this.iosDeviceRepository.find();
    for(let record of records){
      let result = await this.udid_check(record);
      if(result == 'process'){
        //卡设备了 

        if(!record.udid.endsWith('-k')){
          record.udid = record.udid+'-k'
          await this.iosDeviceRepository.save(record);
        }
        // this.udid_warning(record.udid,record.cert_iss);
      }
    }

  
  }


   //自动处理卡设备
   async device_crash(udid: string): Promise<any> {

  
    let records = await this.iosDeviceRepository.find({
      where: { udid: udid }
    });
    for(let record of records){
      let result = await this.udid_check(record);
      if(result == 'process'){
        //卡设备了 

        if(!record.udid.endsWith('-k')){
          record.udid = record.udid+'-k'
          await this.iosDeviceRepository.save(record);

        }
        // this.udid_warning(record.udid,record.cert_iss);
      }
    }

  
  }

}
