/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { BotEntity } from 'src/entitis/bot.entity';
import { BOT } from '../general/bot';

//错误
const CHANNEL_ID_SIGN = -4963596903 //多点云系统异常预警



@Injectable()
export class LogService {

    private logBot: any;
    constructor(

        // @InjectRepository(BotEntity)
        // private readonly botRepository: Repository<BotEntity>,
    ) {
        this.init();
    }
    
    private async init() {
    
        // let bot = await this.botRepository.findOne({ where: { type: "message" } })
        this.logBot = BOT('7613591120:AAGMu6lt5TE4xkt7VOJf4bHUTI4dWEoV5zI')
        
    }
   

    async warning(udid: string,cert_iss: string) {



        this.logBot.sendMessage(CHANNEL_ID_SIGN, udid+'卡设备,证书iss:'+cert_iss);


        
     }


     async disk_warning(disk_space: string) {



        this.logBot.sendMessage(CHANNEL_ID_SIGN, '硬盘剩余空间:'+disk_space);


        
     }


     
    async tf_warning(url: string) {

        this.logBot.sendMessage(CHANNEL_ID_SIGN,'TF 链接访问异常:'+url);

    }
  
        

    async error(udid: string) {


        this.logBot.sendMessage(CHANNEL_ID_SIGN, udid+'证书配置异常请查看');
   }

   async domain_warning(domain: string) {


    this.logBot.sendMessage('-5262630543',domain);
}

     
//     async tg_message(message: string,group_id) {

//         this.logBot.sendMessage(group_id, message);
//    }
}
    
    //报表

