/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/general/redis';
import { SignConfigEntity } from 'src/entitis/sign_config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
@Injectable()
export class UrlLinkService {

    constructor(

        @InjectRepository(SignConfigEntity)
        private readonly signConfigRepository: Repository<SignConfigEntity>,
    ) { }

    async url_link_update(): Promise<any> {

        let record = await this.signConfigRepository.findOne({ where: { name: 'IN_SJDOMAIN' } });
        let domain = record.value;

        // INSERT_YOUR_CODE
        // 使用,分割
        let parts = domain.split(',');
        if(isEmpty(parts)){

            return
        }
        // INSERT_YOUR_CODE
        let first_domain = parts[0];
        
        if (first_domain.startsWith('*.')) {
    
        // INSERT_YOUR_CODE
        // 生成随机 6 个字符 可能是数字或者小写字母
        const randomStr = Math.random().toString(36).substr(2, 6);
        first_domain = first_domain.replace('*', randomStr);
        let xz_domain_key = 'xz_domain_key';
        await RedisService.share().set(xz_domain_key, "https://"+first_domain);
        }    
    
    
    }
}
