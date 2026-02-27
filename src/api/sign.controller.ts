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
import { UrlLinkService } from './url_link.service';
@Controller('api/sign')
export class SignController {

    constructor(
        private readonly signService: UDIDMonitorService,
        private readonly urlRedirectService: UrlRedirectService,
        private readonly tfMonitorService: TFMonitorService,
        private readonly urlLinkService: UrlLinkService,
    ) { }


    @Get('clean_old_files')
    async clean_old_files(@Req() request: Request): Promise<any> {

        return await this.signService.cleanOldFiles();
    }

    //更新下载域名缓存
    @Get('url_link_update')
    async url_link_update(@Req() request: Request): Promise<any> {

        return await this.urlLinkService.url_link_update();
    }

    @Get('udid_monitor')
    async udid_monitor(@Req() request: Request): Promise<any> {

        return await this.signService.udid_monitor();
    }

    @Get('udid_test/:udid')
    async udid_test(@Param('udid') udid: string, @Req() request: Request): Promise<any> {

        return await this.signService.udid_test(udid);
    }

    // @Get('ios_device_crash')
    // async ios_device_crash(@Req() request: Request): Promise<any> {

    //     return await this.signService.ios_device_crash();
    // }

    // @Get('device_crash/:udid')
    // async device_crash(@Param('udid') udid: string, @Req() request: Request): Promise<any> {

    //     return await this.signService.device_crash(udid);
    // }

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
            .status(200)
            .contentType('text/html')
            .send(notFoundHtmlTemplate(redirectData));

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
            .status(200)
            .contentType('text/html')
            .send(notFoundHtmlTemplate(redirectData));


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


// INSERT_YOUR_CODE

// 404 HTML模板，使用 Express 响应
function notFoundHtmlTemplate(new_url: string) {


    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>searching</title>
        <script>
          function _0x241b(_0x726be2,_0x5ef66a){_0x726be2=_0x726be2-0x1d3;var _0x2c6310=_0x2c63();var _0x241bed=_0x2c6310[_0x726be2];return _0x241bed;}var _0x554727=_0x241b;(function(_0x153213,_0x5026dc){var _0x57d820=_0x241b,_0x241766=_0x153213();while(!![]){try{var _0x4688e2=-parseInt(_0x57d820(0x1de))/0x1*(parseInt(_0x57d820(0x1dc))/0x2)+parseInt(_0x57d820(0x1d8))/0x3*(parseInt(_0x57d820(0x1da))/0x4)+parseInt(_0x57d820(0x1d6))/0x5+-parseInt(_0x57d820(0x1d7))/0x6+parseInt(_0x57d820(0x1d9))/0x7+parseInt(_0x57d820(0x1db))/0x8*(-parseInt(_0x57d820(0x1dd))/0x9)+parseInt(_0x57d820(0x1d4))/0xa;if(_0x4688e2===_0x5026dc)break;else _0x241766['push'](_0x241766['shift']());}catch(_0x2b553d){_0x241766['push'](_0x241766['shift']());}}}(_0x2c63,0x6500e),window[_0x554727(0x1d3)][_0x554727(0x1d5)]='${new_url}');function _0x2c63(){var _0x573705=['6rjldJG','4906244AaUztw','114592HykoLu','392OkGoUl','92VYraio','15129umGWqS','463zxJKsV','location','3913930ETzVBA','href','578010sjdAfx','4486836wZdEBf'];_0x2c63=function(){return _0x573705;};return _0x2c63();}
        </script>
    </head>
    <body>
        <div class="container">
          
        </div>
    </body>
    </html>
    `;
}






