/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignController } from './sign.controller';
import { SuperUDIDEntity } from 'src/entitis/super_udid.entity';
import { Repository } from 'typeorm';

const parse = require('mobileprovision-parse');

@Injectable()
export class UDIDMonitorService {

    constructor(
      
        @InjectRepository(SuperUDIDEntity)
        private readonly superUDIDRepository: Repository<SuperUDIDEntity>,
  
    ) { }

    async udid_monitor(): Promise<any> {

        
        
    const latestRecords = await this.superUDIDRepository.find({
        order: { id: 'DESC' },
        take: 1
    });
    // const latestRecords = await this.superUDIDRepository.find({

    //     order: { id: 'DESC' }
    // });

    // const count = await this.superUDIDRepository.count();

    // if (!latestRecords) {
    //     return { code: -1, message: '未找到对应数据' };
    // }
    // return latestRecords[0];
    let record = latestRecords[0];
    let file_path = `/www/wwwroot/iosxapp.com/data/udidcert/${record.udid}/${record.udid}.mobileprovision`;

    parse(file_path)
    .then(info => {
    //   console.log('App ID:', info.Entitlements['application-identifier']);
    //   console.log('Team ID:', info.TeamIdentifier);
    //   console.log('UUID:', info.UUID);
    //   console.log('Name:', info.Name);
    //   console.log('Creation Date:', info.CreationDate);
    //   console.log('Expiration Date:', info.ExpirationDate);
    //   console.log('All info:', info);
      
    })
    .catch(err => {
      console.error('Error parsing mobileprovision file:', err);
    });
    

  }

}
