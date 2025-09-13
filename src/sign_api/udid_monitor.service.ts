/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignController } from './sign.controller';
import { SuperSignEntity } from 'src/entitis/super_sign.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { LogService } from 'src/actions/log.service';
import { Inject } from '@nestjs/common';
const fs = require('fs');
// const provisioning = require('provisioning');
// const parse = require('mobileprovision-parse');

const provisioning = require( '@stendahls/provision-parse' );

@Injectable()
export class UDIDMonitorService {
 
    public udids = []
    constructor(
      
        @InjectRepository(SuperSignEntity)
        private readonly superUDIDRepository: Repository<SuperSignEntity>,

        @Inject(LogService)
        private readonly logService: LogService,

        // private  udids = []

        // public udids = []
    
  
    ) { 
  




    }

    async udid_monitor(): Promise<any> {
      
      
    const latestRecords = await this.superUDIDRepository.find({
        order: { id: 'DESC' },
        take: 3
    });
    console.log(latestRecords);
    for(let record of latestRecords){

       let result = await this.udid_check(record);
       //如果卡设备
       if(result){
        this.udid_warning(record.udid,record.cert_iss);
       }
    }

    // const latestRecords = await this.superUDIDRepository.find({

    //     order: { id: 'DESC' }
    // });




  
  }

  async udid_test(udid: string): Promise<any> {

    let record = await this.superUDIDRepository.findOne({
      where: { udid: udid }
    });
    let result = await this.udid_check(record);

    if(result){
       return "卡设备"
    }
    return "没有卡设备"
  }
  
  async udid_check(record: SuperSignEntity): Promise<any> {


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
          // console.log( provisionData );

          let udids = provisionData.ProvisionedDevices;
          if(udids.includes(record.udid)){
  
            //卡设备
            return false;
            // if(warning){
            //   this.udid_warning(record.udid,provisionData.AppIDName);

            //  }
          }else{

              
            return true; 
          }
          // => { "AppIDName": "com.facebook.facebook",
          //      "TeamName": "Facebook Inc.",
          //      ... }
      } );

      // let mobileprovision = provisioning.parse(mobileprovisionFile);

        // let uuid = mobileprovision.UUID;
        // console.log(uuid);



    }else{

      //证书配置异常
      this.logService.error(record.udid);
  
    }




 
    // //延迟5s后重试
    // // await new Promise(resolve => setTimeout(resolve, 5000));
    // const record = await this.superUDIDRepository.findOne({
    //   where: { id: id },
    // });


    //   //警告
    //   // return { code: -1, message: '未找到对应数据' };
    // }

  
  }

  async udid_warning(udid,cert_iss): Promise<any> {


      if(!this.udids.includes(udid)){
        this.udids.push(udid);
        this.logService.warning(udid,cert_iss);
      }
  }

}
