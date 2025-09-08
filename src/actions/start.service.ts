/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RedisService } from 'src/general/redis';
import {RedisKeyAliInviteCTS
  ,RedisKeyAliDiscount,RedisKeyTXDiscount,RedisKeyAgentEmail,
  RedisKeyAgentLevel,RedisKeyAWSDiscount
} from 'src/utils/redis-key';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StartService implements OnApplicationBootstrap {

  constructor(

   ){}
  
   //应用启动后执行
  async  onApplicationBootstrap() {

    await this.loadRoleInfoToRedis()
        console.log('数据缓存加载成功')
  }

  async loadRoleInfoToRedis(){ 
    
    // Get all agent roles from the database
    // const agentRoles = await this.agentRoleRepository.find();
    // Loop through each agent role

  }

}