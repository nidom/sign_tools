/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
const dns2 = require('dns2');
import { InjectRepository } from '@nestjs/typeorm';
import { TwDomainEntity } from 'src/entitis/tw_domain.entity';
import { Repository } from 'typeorm';
import { LogService } from 'src/actions/log.service';
import * as dns from 'dns';
import { promisify } from 'util';

const lookup = promisify(dns.lookup);

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

        const resolver = new dns2({
            nameServers: ['168.95.1.1'], // dns.hinet.net 的 IP 地址
            timeout: 5000
          });
        // let ip = await dns.resolve(domain);
        let records = await this.twDomainRepository.find();
        for(let record of records){

            // const result = await lookup(record.domain,{family: 4});
            // console.log(result); 
            const result2 = await resolver.resolveA(record.domain);
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
