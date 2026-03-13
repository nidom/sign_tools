/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { SuperCertEntity } from 'src/entitis/super_cert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { format } from 'node:path/posix';
const { execSync } = require('child_process');
const fs = require('fs');
import { LogService } from 'src/actions/log.service';
@Injectable()
export class CerService {


    constructor(
        @InjectRepository(SuperCertEntity)
        private readonly superCertRepository: Repository<SuperCertEntity>,

        private readonly logService: LogService,
    ) {
    }


    //监控 cer 有没有被移出

    async monitor_cert(): Promise<any> {

        let certs =  await this.superCertRepository.find();

        // console.log(certs);
        for(let cert of certs){

            if(isEmpty(cert.p12_file)){
                continue;
            }
            // if(!fs.existsSync(cert.p12_file)){
            //     continue;
            // }

            await this.handle_cert(cert);
            await new Promise(resolve => setTimeout(resolve, 1000));


        }

        // await this.handle_cert(certs[0]);
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
      
         let result = await this.parse(cerFile);

         if(result === 0){

            //设置为失效
            cert.status = 2;
            await this.superCertRepository.save(cert);

            let key = 'cert_status_monitor_'+cert.iss;
            this.logService.warning_message(cert.iss+'已经被移出或封号，自动设置为失效');

         }

         //监控异常 直接退出
         if(result === -1){
            this.logService.warning_message('证书状态监控异常，请检查');
            return

         }
    
    }
    

}

async parse(cerFile: string): Promise<any> {


   
    try {
        let path = 'openssl ocsp -issuer  /www/wwwroot/AppleWWDRCAG3.pem -cert '+cerFile+'  -text -url http://ocsp.apple.com ' 
        console.log(path);
        // const stdout = execSync('openssl ocsp -issuer  /www/wwwroot/AppleWWDRCAG3.pem -cert '+cerFile+'  -text -url http://ocsp.apple.com ', { encoding: 'utf8' });

        // INSERT_YOUR_CODE
        // 解决 openssl stdout 输出内容不全问题，使用 spawn 代替 execSync
        const { spawnSync } = require('child_process');
        const cmd = 'openssl';
        const args = [
            'ocsp', 
            '-issuer', '/www/wwwroot/AppleWWDRCAG3.pem',
            '-cert', cerFile,
            '-text',
            '-url', 'http://ocsp.apple.com'
        ];
        // 使用 spawnSync 并调整 maxBuffer
        const result = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 });
        let stdout = '';
        if (result.error) {
            throw result.error;
        } else {
            stdout = result.stdout;
        }

        if(stdout.includes('good')){

            return 1
        }

        if(stdout.includes('revoked')){

            console.log('revoked');
            return 0
        }


        return -1
        // console.log(stdout);

      // INSERT_YOUR_CODE




      } catch (error) { 
        return -1
      }
}





}
