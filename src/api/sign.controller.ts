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
import { TFMonitorService } from './tf_monitor.service';
import { UrlRedirectService } from './url_redirect.service';
@Controller('api/sign')
export class SignController {

    constructor(
        private readonly signService: UDIDMonitorService,
        private readonly urlRedirectService: UrlRedirectService,
        private readonly tfMonitorService: TFMonitorService,
    ) { }

    @Get('udid_monitor')
    async udid_monitor(@Req() request: Request): Promise<any> {

        return await this.signService.udid_monitor();
    }

    @Get('udid_test/:udid')
    async udid_test(@Param('udid') udid: string, @Req() request: Request): Promise<any> {

        return await this.signService.udid_test(udid);
    }

    @Get('ios_device_crash')
    async ios_device_crash(@Req() request: Request): Promise<any> {

        return await this.signService.ios_device_crash();
    }

    @Get('device_crash/:udid')
    async device_crash(@Param('udid') udid: string, @Req() request: Request): Promise<any> {

        return await this.signService.device_crash(udid);
    }

    @Get('tf_monitor')
    async tf_monitor(@Req() request: Request): Promise<any> {

        return await this.tfMonitorService.monitor();
    }

    @Get('redirect/:params')
    async redirect(@Param('params') params: string, @Req() request: Request, @Res() res: Response): Promise<any> {


        // const url = request.url;
        let ssid = null
        if (request.url.includes('?ssid=')) {

            let queryParams = new URLSearchParams(request.url.split('?')[1]);
            ssid = queryParams.get('ssid');
        }

        let redirectData = await this.urlRedirectService.redirect(params, ssid,request);
        return res.redirect(302, redirectData);
    }

    //应对 https://www.iosxapp.com/redirect/123456/s 这总格式
    @Get('redirect/:params/:s')
    async redirect2(@Param('params') params: string, @Req() request: Request, @Res() res: Response): Promise<any> {
        // console.log('222222');
        // console.log(request.url);

        // INSERT_YOUR_CODE
        // 判断请求是 ios 还是 android


        let redirectData = await this.urlRedirectService.redirect(params, null,request);
        return res.redirect(302, redirectData);
    }

    //无参数

    // @Get('redirect')
    // async redirect3( @Param('params') params: string, @Req() request: Request): Promise<any> {

    //     return 'hello world';
    // }

    // INSERT_YOUR_CODE
    // 处理没有处理到的请求
    @Get('*')
    async handleNotFound(@Req() request: Request, @Res() res: Response): Promise<any> {


        // INSERT_YOUR_CODE
        const url = request.url;
        console.log(url);
        return res.status(404).send('Not Found,Check your url');
    }


}
