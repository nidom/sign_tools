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
import { CResult } from 'src/utils';
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
        private readonly logService: LogService,
    ) { }
  
    async monitor_domain(): Promise<any> {

        // const customResolver = new DNS({
        //     nameServers: ['68.95.1.1', '168.95.192.1']
        //   });

        const resolver = new dns2({
            nameServers: ['dns.hinet.net'], // dns.hinet.net 的 IP 地址
            timeout: 5000
          });
        // let ip = await dns.resolve(domain);
        let records = await this.twDomainRepository.find();
        for(let record of records){

            // const result = await lookup(record.domain,{family: 4});
            // console.log(result); 
            const result = await resolver.resolveA(record.domain);
            // console.log(result2.answers);
            if(result.answers &&result.answers.length > 0){

                let item  = result.answers[0];
                if(item.address == '182.173.0.181'){
                    record.ip = '182.173.0.181';
                    //预警
                    this.warning_domain(record.domain);


                 }else{
                    record.ip = item.address;
                 }
                await this.twDomainRepository.save(record);
            } else {
                //无解析
                // record.ip = '';
                // await this.twDomainRepository.save(record);

                // console.log(record.domain + '无解析');

                this.warning_domain_no_resolve(record.domain);
          
            }

            if(record.ip != record.ip){
                record.ip = record.ip;
                await this.twDomainRepository.save(record);
            }
    
            await new Promise(resolve => setTimeout(resolve, 1000));
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
        return new CResult(0, '', '');

     }


     async domain_list(): Promise<any> {

        // let ip = await dns.resolve(domain);
      
        //     record = new TwDomainEntity();
        //     record.domain = domain;
        //     record.ip = ip;
        //     await this.twDomainRepository.save(record);
        // }

        let  records = await this.twDomainRepository.find({
            order: {
                id: 'DESC'
            }
        });
        return new CResult(0, '', records);

     }


    async add_domain(domain: string): Promise<any> {


        // 判断domain是否合法
        // 域名一般只允许字母、数字、短横线，并以字母或数字开头结尾，中间可以有点
        const domainRegex = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
        if (!domainRegex.test(domain)) {
            return new CResult(-1, '域名格式不正确', {});
        }


        let record = await this.twDomainRepository.findOne({where: {domain: domain}});
        if(record){
            return new CResult(-1, '域名已存在', {});
        }


        // const resolver = new dns2({
        //     nameServers: ['dns.hinet.net'], // dns.hinet.net 的 IP 地址
        //     timeout: 5000
        //  });
        let new_record = new TwDomainEntity();
        new_record.domain = domain;
        new_record.ip = '';
        await this.twDomainRepository.save(new_record);
        return new CResult(0, '', {});

    }


    async delete_domain(id): Promise<any> {
        
        let record = await this.twDomainRepository.findOne({where: {id: id}});
        if(!record){
            return new CResult(-1, '域名不存在', {});
        }

        await this.twDomainRepository.delete(id);
        return new CResult(0, '', {});
     }


    async warning_domain(domain: string,): Promise<any> {


        this.logService.domain_warning(domain_warning_template(domain));

    }

    
    async warning_domain_no_resolve(domain: string): Promise<any> {


        this.logService.domain_warning(domain_warning_template_no_resolve(domain));

    }

}


export const domain_warning_template = (domain):string =>{


    const template = `

⚠️ 網域預警
    
├網域： ${domain}
├中華電信 (CHT)： '封禁'
├台灣大哥大 (TWM)： '封禁'
├遠傳電信(FET)： '封禁'
├DNS RPZ封禁

    `;
    
    return template
    }    


    export const domain_warning_template_no_resolve = (domain):string =>{


        const template = `
    
    ⚠️ 網域預警
        
    ├網域： ${domain}
    ├無解析记录,可能被封禁
    
        `;
        
        return template
  }    
    