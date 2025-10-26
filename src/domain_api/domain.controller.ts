/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import DNS from 'dns2';
import { DomainService } from './domain.service';
import { Param,Get} from '@nestjs/common';

@Controller('api/domain')
export class DomainController {


    constructor(
        private readonly domainService: DomainService,
    ) { }

    @Get('monitor_domain')
    async monitorDomain(@Param('domain') domain: string): Promise<any> {

        return await this.domainService.monitor_domain();
    }

    @Get('domain_list')
    async domainList(): Promise<any> {
        return await this.domainService.domain_list();
    }

    @Get('add_domain/:domain')
    async addDomain(@Param('domain') domain: string): Promise<any> {

        return await this.domainService.add_domain(domain);
    }

    @Get('delete_domain/:id')
    async deleteDomain(@Param('id') id: number): Promise<any> {
        return await this.domainService.delete_domain(id);
    }

    
    

}
