/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
import { SignController } from './sign.controller';
import { UDIDMonitorService } from './udid_monitor.service';
@Module({
    imports: [TypeModule],
    controllers: [SignController],
    providers: [UDIDMonitorService],
})
export class SignModule { }
