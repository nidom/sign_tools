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


@Injectable()
export class UDIDMonitorService {

    constructor(
      
        @InjectRepository(SuperSignEntity)
        private readonly superUDIDRepository: Repository<SuperSignEntity>,

        @Inject(LogService)
        private readonly logService: LogService,
  
    ) { }

    async udid_monitor(): Promise<any> {

        
        
    const latestRecords = await this.superUDIDRepository.find({
        order: { id: 'DESC' },
        take: 3
    });

    for(let record of latestRecords){

      if(isEmpty(record.cert_iss)){

        await this.udid_warning(record.id);
      }
    }
    // const latestRecords = await this.superUDIDRepository.find({

    //     order: { id: 'DESC' }
    // });

    // const count = await this.superUDIDRepository.count();

    // if (!latestRecords) {
    //     return { code: -1, message: '未找到对应数据' };
    // }
    // return latestRecords[0];
    // let record = latestRecords[0];
    // if(isEmpty(record.cert_iss)){

    //   //5s后重试

    //   const nextRecord = await this.superUDIDRepository.findOne({
    //     where: { id: record.id },

    //   });
      
    //   if(isEmpty(nextRecord.cert_iss)){

    //     //进行预警
    //     return { code: -1, message: '未找到对应数据' };
    //   }



    // }


    // let file_path = `/www/wwwroot/iosxapp.com/data/udidcert/${record.udid}/${record.udid}.mobileprovision`;
    // // 判断这个文件是否存在
    // if (!fs.existsSync(file_path)) {

    //   //文件不存在做预警
    //   // return { code: -1, message: '文件不存在' };






    // }

    // parse(file_path)
    // .then(info => {
    // //   console.log('App ID:', info.Entitlements['application-identifier']);
    // //   console.log('Team ID:', info.TeamIdentifier);
    // //   console.log('UUID:', info.UUID);
    // //   console.log('Name:', info.Name);
    // //   console.log('Creation Date:', info.CreationDate);
    // //   console.log('Expiration Date:', info.ExpirationDate);
    // //   console.log('All info:', info);
      
    // })
    // .catch(err => {
    //   console.error('Error parsing mobileprovision file:', err);
    // });
  
  }

  
  async udid_warning(id: number): Promise<any> {
  
 
    //延迟5s后重试
    await new Promise(resolve => setTimeout(resolve, 5000));
    const record = await this.superUDIDRepository.findOne({
      where: { id: id },
    });
    if(isEmpty(record.cert_iss)){

       this.logService.warning(record.udid);
  
      //警告
      // return { code: -1, message: '未找到对应数据' };
    }

  
  }

}
