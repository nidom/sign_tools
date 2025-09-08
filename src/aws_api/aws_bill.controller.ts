/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Body, Req } from '@nestjs/common';
import { RequestDto } from 'src/utils';
import { Post, Get, Param } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AwsBillService } from './aws_bill.service';
import { RedisService } from 'src/general/redis';
@Controller('api/aws')
export class AwsBillController {
    
    constructor(
          private readonly awsBillService: AwsBillService,

    ) { }

    //后台添加账号的时候列表
    @Get('update_current_aws_billing')
    async update_aws_billing(@Param('id') id: string, @Req() request: Request): Promise<any> {

      return  this.awsBillService.update_current_aws_billing();
    }

    //更新aws 账单
    @Get('update_last_aws_billing')
    async update_last_aws_billing(@Param('id') id: string, @Req() request: Request): Promise<any> {
      
      return  this.awsBillService.update_last_aws_billing();
    }

    //查询数据
    @Get('query_data/:uid/:month')
    async query_data(@Param('uid') uid: string, @Param('month') month: string): Promise<any> {

      return await this.awsBillService.query_data(uid, month);
    }

    //查询数据
    @Get('query_data_no_discount/:uid/:month')
    async query_data_no_discount(@Param('uid') uid: string, @Param('month') month: string): Promise<any> {
      return await this.awsBillService.query_data_no_discount(uid, month);
    }

}
