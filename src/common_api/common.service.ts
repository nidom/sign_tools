/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CResult } from 'src/utils';
import { RedisService } from 'src/general/redis';
import { RedisKeyToken } from 'src/utils/redis-key';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BOT } from '../general/bot';
import { LogService } from 'src/actions/log.service';
import { UtilsService } from 'src/actions/utils.service';
import { promisifiedFunction } from '../utils/promis';
import { APP_CONFIG } from 'src/utils';
import { DataSource } from 'typeorm';
import { RedisKeyAgentAWSUserCount } from 'src/utils/redis-key';
// import { AgentRoleEntity } from 'src/entitis/agent_role.entity';

interface TemporaryCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: number;
}
// AWS Organizations client configuration

@Injectable()
export class CommonService {
  
  constructor(
  
    private readonly logService: LogService,
    private readonly utilService: UtilsService,
    private readonly dataSource: DataSource,

  ) { }


//重置token 
  async resetToken(req: object, request: Request): Promise<any> {

    // let roleID = req['roleID']
    // await RedisService.share().del(RedisKeyToken(roleID))
    // return  new CResult(0,'',{})

  }
  //重置所有 redis
  async resetRedisCache(req: object, request: Request): Promise<any> {

    // let roleID = req['roleID']
    await RedisService.share().clearAllRecords()
    // return  new CResult(0,'',{})

  }

  //重置token 
  async delete_redis_key(req: object, request: Request): Promise<any> {

    let key = req['key']
    // this.utilService.delete(key)

    return await RedisService.share().del(key)
  }

    //重置token 
  async redis_key_value(req: object, request: Request): Promise<any> {

    let key = req['key']
    // this.utilService.delete(key)

    return await RedisService.share().get(key)
  }



  



   //删除所有表格
    async deleteAllTables(req: object, request: Request): Promise<any> {

    let tables = await this.dataSource.query(`SELECT table_name 
      FROM information_schema.tables `);

    
      for (const table of tables) {
        const tableName = table.TABLE_NAME;
        if(tableName.includes('2025')){
        console.log(`正在删除表: ${tableName}`);
         await this.dataSource.query(`DROP TABLE IF EXISTS \`${tableName}\``);
      }


      const redisService = await RedisService.share();
      try {
        await redisService.flushall();
        // return { code: 0, message: 'Redis cache cleared successfully' };
      } catch (error) {
        // return { code: -1, message: 'Failed to clear Redis cache', error: error?.message || error };
      }
     }




  }


}
    
  

