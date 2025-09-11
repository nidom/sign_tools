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
   

    async warning(udid: string) {



        this.logBot.sendMessage(CHANNEL_ID_SIGN, udid+'卡设备');


        
     }

     
//     async tg_message(message: string,group_id) {

//         this.logBot.sendMessage(group_id, message);
//    }
}
    
    //报表

