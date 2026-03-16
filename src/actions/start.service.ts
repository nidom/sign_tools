/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RedisService } from 'src/general/redis';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StartService implements OnApplicationBootstrap {

  constructor(

   ){}

   //应用启动后执行
  async onApplicationBootstrap() {
    
    console.log('启动成功')
  }
  


}