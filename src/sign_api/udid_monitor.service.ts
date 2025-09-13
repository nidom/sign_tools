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
const provisioning = require('provisioning');


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

      if(isEmpty(record.cert_iss)){

        await this.udid_check(record);
      }
    }

    // const latestRecords = await this.superUDIDRepository.find({

    //     order: { id: 'DESC' }
    // });




  
  }

  
  async udid_check(record: SuperSignEntity): Promise<any> {
  


    let dircetory = `/www/wwwroot/iosxapp.com/data/udidcert/${record.udid}`;
  
    // 获取dircetory下后缀为mobileprovision的文件
    let mobileprovisionFiles: string[] = [];

    console.log('-----11111');
    if (fs.existsSync(dircetory) && fs.statSync(dircetory).isDirectory()) {
      console.log('-----1');

         mobileprovisionFiles = fs.readdirSync(dircetory)

         console.log('-----2');

         console.log(mobileprovisionFiles);
        // .filter(file => file.endsWith('.mobileprovision'))
        // .map(file => `${dircetory}/${file}`);

        let mobileprovisionFile = mobileprovisionFiles[0];

        console.log(mobileprovisionFile);

        let mobileprovision = provisioning.parse(mobileprovisionFile);

        let uuid = mobileprovision.UUID;
        console.log(uuid);



    }else{
      console.log('-----22222');
      console.log('没有mobileprovision文件');
   

    }

 
    // //延迟5s后重试
    // // await new Promise(resolve => setTimeout(resolve, 5000));
    // const record = await this.superUDIDRepository.findOne({
    //   where: { id: id },
    // });

    // if(isEmpty(record.cert_iss)){

    //   if(!this.udids.includes(record.udid)){
    //     this.udids.push(record.udid);
    //     this.logService.warning(record.udid);
    //   }

  
    //   //警告
    //   // return { code: -1, message: '未找到对应数据' };
    // }

  
  }

}
