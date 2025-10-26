/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
const dns2 = require('dns2');
import { InjectRepository } from '@nestjs/typeorm';
import { TwDomainEntity } from 'src/entitis/tw_domain.entity';
import { Repository } from 'typeorm';
import { LogService } from 'src/actions/log.service';

const myDict = {

    '168.95.1.1': '中华电信 (CHT)',
    '203.66.23.23': '台湾大哥大 (TWM)',
    '61.31.204.20': '远传电信 (FET)',
    'www.apple.com.tw': '17.248.181.145',

};


@Injectable()
export class DomainService {


    constructor(
        @InjectRepository(TwDomainEntity)
        private readonly twDomainRepository: Repository<TwDomainEntity>,
    ) { }
  
    async monitor_domain(): Promise<any> {

        // const customResolver = new DNS({
        //     nameServers: ['68.95.1.1', '168.95.192.1']
        //   });


          const client = new dns2({
            // 可选配置
                dns: 'dns.hinet.net',   // 上游 DNS 服务器
                // port: 53,
            // recursive: true  // 默认开启递归查询
          });
        // let ip = await dns.resolve(domain);
        let records = await this.twDomainRepository.find();
        for(let record of records){
        
            const result2 = await client.resolveA(record.domain);
            console.log(result2.answers);
            // let ip = await dns.resolve(record.domain);
            // if(ip != record.ip){
            //     record.ip = ip;
            //     await this.twDomainRepository.save(record);
            // }
        }
      
        // if(!record){
        //     record = new TwDomainEntity();
        //     record.domain = domain;
        //     record.ip = ip;
        //     await this.twDomainRepository.save(record);
        // }
        return '';

     }

    





}
