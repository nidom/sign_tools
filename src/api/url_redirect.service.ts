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
import { SignConfigEntity } from 'src/entitis/sign_config.entity';
@Injectable()
export class UrlRedirectService {

    constructor(
        @InjectRepository(SignConfigEntity)
        private readonly signConfigRepository: Repository<SignConfigEntity>,
    ) {
    }



      //迁移
  async redirect(params: string): Promise<any> {

  

    console.log(params);

    let record = await this.signConfigRepository.findOne({where: { name: 'IN_SJDOMAIN' }});
    
    let domain = record.value;
    if(domain.startsWith('*.')){
        
        return { redirect: 'https://baidu.com' };
    }

    // for(let record of records){
    //   let result = await this.udid_check(record);
    //   if(result == 'process'){
    //     //卡设备了 

    //     if(!record.udid.endsWith('-k')){
    //       record.udid = record.udid+'-k'
    //       await this.iosDeviceRepository.save(record);
    //     }
    //     // this.udid_warning(record.udid,record.cert_iss);
    //   }
    // }

  
  }

}
