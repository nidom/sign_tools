/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { UDIDMonitorService } from './udid_monitor.service';
import { Body, Req } from '@nestjs/common';
import { RequestDto } from 'src/utils';
import { Post, Get, Param } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';

import { UrlRedirectService } from './url_redirect.service';
@Controller('api/sign')
export class SignController {

    constructor(
        private readonly signService: UDIDMonitorService,
        private readonly urlRedirectService: UrlRedirectService,
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

    @Get('device_crash/:udid')
    async device_crash( @Param('udid') udid: string, @Req() request: Request): Promise<any> {

        return await this.signService.device_crash(udid);
    }

    @Get('redirect/:params')
    async redirect( @Param('params') params: string, @Req() request: Request, @Res() res: Response): Promise<any> {




        let redirectData = await this.urlRedirectService.redirect(params);


        // if (redirectData && redirectData.url) {
        //     return res.redirect(301, redirectData.url);
        // }
        
        return res.redirect(302, redirectData);
    }


    @Get('redirect/:params/:s')
    async redirect2( @Param('params') params: string, @Req() request: Request, @Res() res: Response): Promise<any> {




        let redirectData = await this.urlRedirectService.redirect(params);


        // if (redirectData && redirectData.url) {
        //     return res.redirect(301, redirectData.url);
        // }
        
        return res.redirect(302, redirectData);
    }


    


}
