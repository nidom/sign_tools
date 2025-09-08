/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { BotEntity } from 'src/entitis/bot.entity';
import { BOT } from '../general/bot';

//错误
const CHANNEL_ID_ERROR = -1002404316015 //多点云系统异常预警
//order
const CHANNEL_ID_ORDER = -1002427683181 //多点云交易
 //多点云系统日志
const CHANNEL_ID_LOG= -4728501886
 //多点云报表系统,是个群组
const CHANNEL_ID_REPORT= -4117608075
//aws预警群
const CHANNEL_AWS = -4787035030
 //测试环境
const CHANNEL_ID_TEST = -4542740233


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
        // this.logBot = BOT(bot.token)
        
    }
    //错误
    async error(message: string) {
        
        if(process.env.NODE_ENV == 'production'){
            
            this.logBot.sendMessage(CHANNEL_ID_ERROR, message);

        }else {
    
            this.logBot.sendMessage(CHANNEL_ID_TEST, message);
        }
   }

    //订单
    async order(message: string) {

        if(process.env.NODE_ENV == 'production'){
            
            this.logBot.sendMessage(CHANNEL_ID_ORDER, message);

        }else {

            this.logBot.sendMessage(CHANNEL_ID_TEST, message);
        }
    }
    
    //日志
    async log(message: string) {
        
        if(process.env.NODE_ENV == 'production'){
            
            this.logBot.sendMessage(CHANNEL_ID_LOG, message);

        }else {
            this.logBot.sendMessage(CHANNEL_ID_TEST, message);
        }
    }
    //报表
    async report(message: string) {

      await  this.logBot.sendPhoto(CHANNEL_ID_REPORT, 'https://cloud-dqn.pages.dev/bot_imgs/report.png', {
            caption: message,
        });
    }
    
    async credit_warning(message: string,group_id) {

        this.logBot.sendMessage(group_id, message);
    }

    async warning(message: string) {

        if(process.env.NODE_ENV == 'production'){
            
            console.log('生产环境')
            console.log(message)
            this.logBot.sendMessage(CHANNEL_AWS, message);

        }else {

            this.logBot.sendMessage(CHANNEL_ID_TEST, message);
        }
     }

     
    async tg_message(message: string,group_id) {

        this.logBot.sendMessage(group_id, message);
   }
}
    
    //报表

