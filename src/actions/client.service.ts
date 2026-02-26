/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const OSS = require('ali-oss');
import { isEmpty } from 'class-validator';
type OSSClientType = InstanceType<typeof OSS>;

@Injectable()
export class ClientService {

    private clients: { [key: string]: any } = {};
    constructor(
        private readonly configService: ConfigService,
     ) { }
    //获取 oss client
    async ossClient(): Promise<OSSClientType> {

        // if (this.clients['oss']) {
        //     return this.clients['oss'];
        // }

        // // let oss_region = await this.configService.get('oss_region')
        // let oss_access_key_id = 'LTAI5tDUDWvQu6uafdQs4XSz'
        // let oss_access_key_secret = 'gYdai1qpWNCASdE3ptozutcCfuZY2Y'
        // let oss_bucket = 'appdev'

        // this.clients['oss'] = new OSS({
            
        //     region: 'oss-cn-hongkong', // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
        //     accessKeyId: oss_access_key_id, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
        //     accessKeySecret: oss_access_key_secret, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
        //     bucket: oss_bucket, // 示例：'my-bucket-name'，填写存储空间名称。
        // });
        // return this.clients['oss'];
    }
}
