import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
@Module({
    imports: [TypeModule],
    controllers: [
        DomainController,],
    providers: [
        DomainService,],
})
export class DomainModule {

    

    
 }
