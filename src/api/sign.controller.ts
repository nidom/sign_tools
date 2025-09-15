/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { UDIDMonitorService } from './udid_monitor.service';
import { Body, Req } from '@nestjs/common';
import { RequestDto } from 'src/utils';
import { Post, Get, Param } from '@nestjs/common';
import { Request } from '@nestjs/common';
@Controller('api/sign')
export class SignController {

    constructor(
        private readonly signService: UDIDMonitorService,
    ) { }

    @Get('udid_monitor')
    async udid_monitor( @Req() request: Request): Promise<any> {

        return await this.signService.udid_monitor();
    }

    @Get('udid_test/:udid')
    async udid_test( @Param('udid') udid: string, @Req() request: Request): Promise<any> {

        return await this.signService.udid_test(udid);
    }

    @Get('ios_device_crash')
    async ios_device_crash( @Req() request: Request): Promise<any> {

        return await this.signService.ios_device_crash();
    }

}
