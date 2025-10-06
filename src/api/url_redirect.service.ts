/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignController } from './sign.controller';
import { SuperDeviceEntity } from 'src/entitis/super_device.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { LogService } from 'src/actions/log.service';
import { IOSDeviceEntity } from 'src/entitis/ios_device.entity';
import { Inject } from '@nestjs/common';
import { SignConfigEntity } from 'src/entitis/sign_config.entity';
import * as request from 'supertest';
import { Request } from '@nestjs/common';
import { AppIDEntity } from 'src/entitis/app_id.entity';
import e from 'express';
@Injectable()
export class UrlRedirectService {

  constructor(
    @InjectRepository(SignConfigEntity)
    private readonly signConfigRepository: Repository<SignConfigEntity>,

    @InjectRepository(AppIDEntity)
    private readonly appIDRepository: Repository<AppIDEntity>,
  ) {
  }



  //迁移
  async redirect(params: string, ssid: string, request): Promise<any> {


    // console.log(params);




    let record = await this.signConfigRepository.findOne({ where: { name: 'IN_SJDOMAIN' } });
    let domain = record.value;

    if (!domain.startsWith('*.')) {

        return
    }

    let appIDRecord = await this.appIDRepository.findOne({ where: { in_link: params } });

    let in_kid = appIDRecord.in_kid;

    //如果有关联 app 再判断请求类型
    if (in_kid > 0) {

      let deviceType = this.getDeviceType(request);
      //如果请求类型不一致 则跳转到关联app

      console.log(deviceType);
      console.log(appIDRecord.in_form);
      if (deviceType != appIDRecord.in_form) {
        let in_kid_app = await this.appIDRepository.findOne({ where: { in_id: in_kid } });
        if(in_kid_app){ 
           params = in_kid_app.in_link;
        }

      }


    }

    // INSERT_YOUR_CODE
    // 生成一个五位数长度的数字字母字符串
    const randomStr = Math.random().toString(36).substr(2, 10);

    // INSERT_YOUR_CODE
    const timestamp = Math.floor(Date.now() / 1000);
    let url = 'https://' + domain.replace('*', randomStr) + '/' + params + '?t=' + timestamp;

    if (ssid) {
      url += '&ssid=' + ssid;
    }
    // INSERT_YOUR_CODE
    return url


  }


  // INSERT_YOUR_CODE
  // 根据 request 判断是 iOS 还是 Android
  getDeviceType(request: any): 'iOS' | 'Android' | 'Unknown' {
    const userAgent = request.headers['user-agent'] || '';
    console.log(userAgent);
    // INSERT_YOUR_CODE
    // 根据userAgent判断设备类型
    if (/iphone|ipad|ipod|ios/i.test(userAgent)) {
      return 'iOS';
    } else if (/android/i.test(userAgent)) {

      return 'Android';
    } else {
      return 'iOS';
    }


    



    // if (/iphone|ipad|ipod|ios/i.test(userAgent)) {
    //   return 'iOS';
    // } else if (/android/i.test(userAgent)) {
    //   return 'Android';
    // } else {
    //   return 'Unknown';
    // }
  }

}
