/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { SuperCertEntity } from 'src/entitis/super_cert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { format } from 'node:path/posix';
const fs = require('fs');
@Injectable()
export class CerService {


    constructor(
        @InjectRepository(SuperCertEntity)
        private readonly superCertRepository: Repository<SuperCertEntity>,
    ) {
    }


    //监控 cer 有没有被移出

    async monitor_cert(): Promise<any> {

        let certs =  await this.superCertRepository.find();

        console.log(certs);
        for(let cert of certs){

            if(isEmpty(cert.p12_file)){
                continue;
            }
            // if(!fs.existsSync(cert.p12_file)){
            //     continue;
            // }

            await this.handle_cert(cert);


        }
    }


    async handle_cert(cert: SuperCertEntity): Promise<any> {

   
let p12_file = cert.p12_file;
    // INSERT_YOUR_CODE
    // 把p12_file 使用/分割 获取第一个字符串
     let firstPart = '';
     if (typeof p12_file === 'string') {
        const parts = p12_file.split('/');
        firstPart = parts[0];
     }

     console.log(firstPart);
     let dircetory = `/www/wwwroot/iosxapp.com/data/cert/${firstPart}`;

    // INSERT_YOUR_CODE
    // 获取dircetory下所有.cer结尾的文件路径 放到一个数组
    let cerFiles: string[] = [];
    try {
        if (fs.existsSync(dircetory)) {
            const files = fs.readdirSync(dircetory);
            cerFiles = files
                .filter(file => file.endsWith('.cer'))
                .map(file => `${dircetory}/${file}`);
        }
    } catch (error) {
        // 错误日志可按实际需要添加
    }

    for(let cerFile of cerFiles){
      
        console.log(cerFile);
    }




    }




}
