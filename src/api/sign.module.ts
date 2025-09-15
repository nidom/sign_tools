/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
import { SignController } from './sign.controller';
import { UDIDMonitorService } from './udid_monitor.service';
import { ActionModule } from 'src/actions/action.module';
@Module({
    imports: [TypeModule,ActionModule],
    controllers: [SignController],
    providers: [UDIDMonitorService],
})
export class SignModule { }
