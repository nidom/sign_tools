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
    //154.36.158.161/api/sign/redirect/123456/s
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



        //154.36.158.161/api/sign/redirect/123456/s
        @Get('job/:params')
        async redirect3(@Param('params') params: string, @Req() request: Request, @Res() res: Response): Promise<any> {
    
    
            // const url = request.url;
            let ssid = null
            if (request.url.includes('?ssid=')) {
    
                let queryParams = new URLSearchParams(request.url.split('?')[1]);
                ssid = queryParams.get('ssid');
            }
    
            let redirectData = await this.urlRedirectService.redirect(params, ssid,request);
        
            return   res
            .status(404)
            .contentType('text/html')
            .send(`
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <title>页面未找到</title>
                    <style>
                        body { font-family: Arial, Helvetica, sans-serif; background: #f5f5f5; text-align: center; padding: 60px; }
                        .container { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: inline-block; padding: 40px 60px; }
                        h1 { font-size: 48px; margin-bottom: 16px; color: #e53935; }
                        p { font-size: 20px; color: #555; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>404</h1>
                        <p>页面未找到，请检查您的链接是否正确。</p>
                        <p>Not Found, Check your url!</p>
                    </div>
                </body>
                </html>
            `);
        }
    
        //应对 https://www.iosxapp.com/redirect/123456/s 这总格式
        @Get('job/:params/:s')
        async redirect4(@Param('params') params: string, @Req() request: Request, @Res() res: Response): Promise<any> {
            // console.log('222222');
            // console.log(request.url);
    
            // INSERT_YOUR_CODE
            // 判断请求是 ios 还是 android
    
    
            let redirectData = await this.urlRedirectService.redirect(params, null,request);
            // return redirectData;


            return   res
            .status(404)
            .contentType('text/html')
            .send(`
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <title>页面未找到</title>
                    <style>
                        body { font-family: Arial, Helvetica, sans-serif; background: #f5f5f5; text-align: center; padding: 60px; }
                        .container { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: inline-block; padding: 40px 60px; }
                        h1 { font-size: 48px; margin-bottom: 16px; color: #e53935; }
                        p { font-size: 20px; color: #555; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>404</h1>
                        <p>页面未找到，请检查您的链接是否正确。</p>
                        <p>Not Found, Check your url!</p>
                    </div>
                </body>
                </html>
            `);


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

        // INSERT_YOUR_CODE

        return res.status(404).send('Not Found,Check your url');
    }


}





