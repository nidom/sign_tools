/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

import { Repository, Transaction } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';



import { RedisService } from 'src/general/redis';
import { promisifiedFunction } from 'src/utils/promis';
import { RedisKeyAgentEmail } from '../utils/redis-key';

import { In } from 'typeorm';
// import { AccountPriceEntity } from 'src/entitis/accountPrice.entity';


//一个月过期时间
const redisExpire = 60*60*24*30 

@Injectable()
export class UtilsService {
    
    constructor(

    ) { }

    //限制
    async limit(key, second): Promise<boolean> {

        let redisKey = `limit_${key}`;
        let lastAccess = await RedisService.share().get(redisKey) as string;
        if (lastAccess) {
            
            const timeDiff = Date.now() - parseInt(lastAccess);
            if (timeDiff < second * 1000) { // Less than 1 second
                return true;
            }
        }
        //
        await RedisService.share().set(redisKey, Date.now().toString(), second); // Expire in 2 seconds
        return false;
    }
    //一天内限制多少次访问
    async limitDayliy(key,times): Promise<boolean> {

        const currentDate = new Date();
        const formattedDate = currentDate.getFullYear()+(currentDate.getMonth()+1).toString().padStart(2, '0') + currentDate.getDate().toString().padStart(2, '0');
        let redisKey = `limit_${formattedDate}_${key}`;
        let count = await RedisService.share().getNumber(redisKey);
        if(count>times){
            
            return  true
        }
         if(count==0){

            //一天后清理
            await  RedisService.share().set(redisKey,count+1,60*60*24)

        }else{

            await  RedisService.share().set(redisKey,count+1)
        }
         return false
   }

    //删除
    async delete(key): Promise<boolean> {
        
        await RedisService.share().del(key);
        return true
    }

}
