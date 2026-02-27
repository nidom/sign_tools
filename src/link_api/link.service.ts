/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { SignConfigEntity } from '../entitis/sign_config.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { CResult } from 'src/utils';
import { RedisService } from 'src/general/redis';
export class LinkService {

    constructor(
        @InjectRepository(SignConfigEntity)
        private readonly signConfigRepository: Repository<SignConfigEntity>,

        
    ) { }

    async app_link(app_id: string): Promise<any> {
        // const client = await this.clientService.ossClient();
        // const result = await client.get('link.json');
        // return result;

        
        if(isEmpty(app_id)){

            return new CResult(-1, 'url error', {});
        }
        

        let xz_domain_key = 'xz_domain_key';
        let xz_domain = await RedisService.share().get(xz_domain_key);
        if(isEmpty(xz_domain)){

            return new CResult(-1, 'domain error', {});
        }

        return new CResult(0, '', xz_domain+'/'+app_id);
    
    
    }

}
