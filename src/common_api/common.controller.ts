/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { CommonService } from './common.service';
import { Body, Req } from '@nestjs/common';
import { RequestDto } from 'src/utils';
import { Post, Get, Param } from '@nestjs/common';
import { Request } from '@nestjs/common';
@Controller('api/common')
export class CommonController {

    constructor(
          private readonly commonService: CommonService,
     ) { }
     
    @Post('reset_token')
    async resetToken(@Body() requestDto: RequestDto, @Req() request: Request): Promise<any> {

        return await this.commonService.resetToken(requestDto.params, request);
    }

    @Post('reset_redis_cache')
    async resetRedisCache(@Body() requestDto: RequestDto, @Req() request: Request): Promise<any> {

        return await this.commonService.resetRedisCache(requestDto.params, request);
    }

    @Post('delete_redis_key')
    async deleteRedisCache(@Body() requestDto: RequestDto, @Req() request: Request): Promise<any> {

        return await this.commonService.delete_redis_key(requestDto.params, request);
    }

    @Post('redis_key_value')
    async redisKeyValue(@Body() requestDto: RequestDto, @Req() request: Request): Promise<any> {

        return await this.commonService.redis_key_value(requestDto.params, request);
    }

    @Post('delete_all_tables')
    async deleteAllTables(@Body() requestDto: RequestDto, @Req() request: Request): Promise<any> {

        return await this.commonService.deleteAllTables(requestDto.params, request);
    }
    
}
