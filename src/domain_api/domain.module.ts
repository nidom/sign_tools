import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
import { ActionModule } from 'src/actions/action.module';
@Module({
    imports: [TypeModule,ActionModule],
    controllers: [
        DomainController,],
    providers: [
        DomainService,],
})
export class DomainModule {

    

    
 }
