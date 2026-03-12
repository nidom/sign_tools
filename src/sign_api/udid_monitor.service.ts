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
import { MoreThan } from 'typeorm';
import { SuperCertEntity } from 'src/entitis/super_cert.entity';
import { RedisService } from 'src/general/redis';
import { RedisKeyAdminConfig } from '../utils/redis-key';
import { SuperSignEntity } from 'src/entitis/super_sign.entity';
const fs = require('fs');
// const provisioning = require('provisioning');
// const parse = require('mobileprovision-parse');

const provisioning = require('@stendahls/provision-parse');
@Injectable()
export class UDIDMonitorService {

  // public udids = []
  constructor(

    @InjectRepository(SuperDeviceEntity)
    private readonly superDeviceRepository: Repository<SuperDeviceEntity>,

    @InjectRepository(IOSDeviceEntity)
    private readonly iosDeviceRepository: Repository<IOSDeviceEntity>,

    @InjectRepository(SuperCertEntity)
    private readonly superCertRepository: Repository<SuperCertEntity>,

    //签名队列
    @InjectRepository(SuperSignEntity)
    private readonly superSignRepository: Repository<SuperSignEntity>,

    @Inject(LogService)
    private readonly logService: LogService,
    // private  udids = []

    // public udids = []
  ) {

  }

  //监控是否开设备
  async udid_monitor(): Promise<any> {


    //先监控签名设备
    const latestRecords = await this.superDeviceRepository.find({
      order: { id: 'DESC' },
      take: 3
    });
    for (let record of latestRecords) {

      // console.log(record.udid)

      let result = await this.udid_check(record);
      //如果卡设备
      if (result == 'process') {
        //发送预警并处理
        this.udid_warning_handle(record.udid, record.cert_iss);

      }

    }




    //监控签名队列
    const latestSignRecords = await this.superSignRepository.find({
      order: { id: 'DESC' },
      take: 100
    });



    for (let record of latestSignRecords) {

      // console.log(record.udid)

       await this.sign_udid_check(record);

      }



  }

  async udid_test(udid: string): Promise<any> {

    let record = await this.superDeviceRepository.findOne({
      where: { udid: udid }
    });

    if (!record) {
      return "没有找到这台设备"
    }

    let result = await this.udid_check(record);



    // console.log('--------------------------------');
    // console.log(result);
    if (result == 'process') {

      return "卡设备了"
    } else if (result == 'complete') {
      return "没有卡设备"
    }

  }



  async udid_check(record: SuperDeviceEntity): Promise<any> {


    let result = null;
    let dircetory = `/www/wwwroot/iosxapp.com/data/udidcert/${record.udid}`;

    // 获取dircetory下后缀为mobileprovision的文件
    let mobileprovisionFiles: string[] = [];
    if (fs.existsSync(dircetory) && fs.statSync(dircetory).isDirectory()) {

      mobileprovisionFiles = fs.readdirSync(dircetory).filter(file => file.endsWith('.mobileprovision'))
      let mobileprovisionFile = mobileprovisionFiles[0];
      let filePath = `/www/wwwroot/iosxapp.com/data/udidcert/${record.udid}/${mobileprovisionFile}`;
      provisioning(filePath, (parseError, provisionData) => {
        //  console.log( provisionData );

        let udids = provisionData.ProvisionedDevices;
        if (udids.includes(record.udid)) {
          //卡设备
          result = 'complete';
          // if(warning){
          //   this.udid_warning(record.udid,provisionData.AppIDName);

          //  }
        } else {
          result = 'process';
        }

      });

      // let mobileprovision = provisioning.parse(mobileprovisionFile);

      // let uuid = mobileprovision.UUID;
      // console.log(uuid);

    } else {

      //证书配置异常
      //  this.logService.error(record.udid);
      result = 'error';

    }

    // INSERT_YOUR_CODE
    // 等待 result 不为空时返回 result
    while (result === undefined || result === null || result === '') {
      // 这里可以适当延迟，避免死循环占用CPU
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return result;

  }



  //签名队列检查
  async sign_udid_check(record: SuperSignEntity): Promise<any> {

    //如果udid是空 则不处理
    if (isEmpty(record.udid)) {
      return;
    }

    //卡了 把所有预定证书关闭 并预警
    if (record.type == 0 && record.status == 0 && isEmpty(record.cert_iss)) {

      let cache_key = ' udid_sign_monitor_' + record.udid;
      let value = await RedisService.share().get(cache_key);
      if (value) {
        return;
      }
      let certs = await this.superCertRepository.find({
        where: { status: 1 }
      });

      // INSERT_YOUR_CODE
      // 把certs的status都设置为0
      for (let cert of certs) {
        cert.status = 0;
        await this.superCertRepository.save(cert);
      }

      this.udid_warning_handle(record.udid, '所有预定证书已关闭');
      await RedisService.share().set(cache_key, '1', 60 * 60 * 12)

    }
  }


  //证书警告
  async udid_warning_handle(udid, cert_iss): Promise<any> {

    let cache_key = ' udid_monitor_' + udid;
    let value = await RedisService.share().get(cache_key);
    if (value) {
      return;
    }
    // // INSERT_YOUR_CODE
    // // 查询一个小时以内的记录
    // const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    // const udidStuckRecord = await this.udidStuckRepository.findOne({
    //   where: {
    //     udid: udid,
    //     created_at: MoreThan(oneHourAgo)
    //   }
    // });

    // if (udidStuckRecord) {
    //   return;
    // }
    this.logService.warning(udid, cert_iss);

    //处理卡设备
    await this.handle_udid_stuck(udid);

    //处理证书
    await this.handle_cert_stuck(cert_iss);
    //缓存12个小时
    await RedisService.share().set(cache_key, '1', 60 * 60 * 12)

  }

  //处理卡设备
  // async ios_device_crash(): Promise<any> {


  //   let records = await this.iosDeviceRepository.find();
  //   for (let record of records) {
  //     let result = await this.udid_check(record);
  //     if (result == 'process') {
  //       //卡设备了 

  //       if (!record.udid.endsWith('-k')) {
  //         record.udid = record.udid + '-k'
  //         await this.iosDeviceRepository.save(record);
  //       }
  //       // this.udid_warning(record.udid,record.cert_iss);
  //     }
  //   }

  // }


  //处理卡设备
  // async handle_device_stuck(udid: string): Promise<any> {

  //   let records = await this.iosDeviceRepository.find({
  //     where: { udid: udid }
  //   });
  //   for (let record of records) {
  //     let result = await this.udid_check(record);
  //     if (result == 'process') {
  //       //卡设备了 

  //       if (!record.udid.endsWith('-k')) {
  //         record.udid = record.udid + '-k'
  //         await this.iosDeviceRepository.save(record);
  //       }
  //       // this.udid_warning(record.udid,record.cert_iss);
  //     }
  //   }

  // }

  //先处理 udid
  async handle_udid_stuck(udid: string): Promise<any> {


    let records = await this.iosDeviceRepository.find({
      where: { udid: udid }
    });

    for (let record of records) {
      //卡设备了 

      if (!record.udid.endsWith('-k')) {
        record.udid = record.udid + '-k'
        await this.iosDeviceRepository.save(record);
      }
      // this.udid_warning(record.udid,record.cert_iss);
    }

  }

  //处理 cert
  async handle_cert_stuck(cert_iss: string): Promise<any> {


    let record = await this.superCertRepository.findOne({
      where: { iss: cert_iss }
    });

    if (!record) {
      return;
    }

    //如果证书类型为0 秒签证书，则不处理
    if (record.type == 0) {
      return;
    }

    record.status = 0

    //更新记录 把证书关闭
    await this.superCertRepository.save(record);

    //


  }





}
