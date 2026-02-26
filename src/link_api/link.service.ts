/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ClientService } from '../actions/client.service';
import { SignConfigEntity } from '../entitis/sign_config.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { CResult } from 'src/utils';
@Injectable()
export class LinkService {

    constructor(
        private readonly clientService: ClientService,
        @InjectRepository(SignConfigEntity)
        private readonly signConfigRepository: Repository<SignConfigEntity>,
    ) { }

    async app_link(app_id: string): Promise<any> {
        // const client = await this.clientService.ossClient();
        // const result = await client.get('link.json');
        // return result;


        if(isEmpty(app_id)){

            return new CResult(-1, 'app_id不能为空', {});
        }
        
       let record = await this.signConfigRepository.findOne({ where: { name: 'IN_SJDOMAIN' } });
       let domain = record.value;

       return new CResult(0, '', { 'domain': domain });



    //    if (!domain.startsWith('*.')) {
    //       return
    //     }


            // Check if the price entity exists for the given c_code
       
    
    }

}
