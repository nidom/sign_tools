

// import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Db, ObjectType } from 'typeorm';
import Redis, { ClientContext, Result } from 'ioredis';
import { APP_CONFIG } from '../utils';

// @Injectable()
export class RedisService {

  private static instance: RedisService;
  private constructor() {}
  public redisClient!: Redis;
  
  public static share(): RedisService {
    if (!this.instance) {
        this.instance = new RedisService();
        this.instance.client();
    }
    return this.instance;
  }
  
  private client() {
 

    let app_config = APP_CONFIG()
     // const environment = process.env.NODE_ENV;
    // //默认测试环境
    // let host = '8.218.43.192'
  

    // if (environment === 'production') {

    //     //线上内网服务器
    //     host = '172.18.131.133'
    //     //线上环境用第一个数据库
    //  }

    this.redisClient = new Redis({
      
      port:6380, // Redis port
      // host: '47.238.156.106', // redisDb Redis host
      host: app_config.redis.host, // redisDb Redis host
      
      username: '', // needs Redis >= 6
      password: app_config.redis.password, // 密码
      db: 0, // redis是几个数据库的，使用第2个 云 api 使用的是第一个
    });
  }

  /**
   * @Author: nidom
   * @Date: 2022-08-11 11:25:54
   * @Description: 设置值到redis中
   * @param {string} key
   * @param {any} value
   * @param {number} second 过期时间秒
   * @return {*}
   */
  public async set(key: string, value: unknown): Promise<Result<'OK', ClientContext>>;
  public async set(
    key: string,
    value: unknown,
    second: number
  ): Promise<Result<'OK', ClientContext>>;

  public async set(key: string, value: any, second?: number): Promise<Result<'OK', ClientContext>> {

    value = typeof value === 'object' ? JSON.stringify(value) : value;
     if (!second) {
      return await this.redisClient.set(key, value);
    } else {
      return await this.redisClient.set(key, value, 'EX', second);
    }
  }

  /**
   * @Description: 设置自动 +1
   * @param {string} key
   * @return {*}
   */
  public async incr(key: string): Promise<Result<number, ClientContext>> {
    return await this.redisClient.incr(key);
  }

  /**
   * @Description: 设置获取redis缓存中的值
   * @param key {String}
   */
  public async get(key: string): Promise<Result<string | null, ClientContext>> {
    try {
      const data = await this.redisClient.get(key);
      if (data) {
        return JSON.parse(data);
      } else {
        return null;
      }
    } catch (e) {
      return await this.redisClient.get(key);
    }
  }

 
    /**
   * @Description: 设置获取redis缓存中的值
   * @param key {String}
   */
    public async getNumber(key: string): Promise<number | null>  {
      try {
        const data = await this.redisClient.get(key);
        if (data) {
          return Number(JSON.parse(data));
        } else {
          return null;
        }
      } catch (e) {
        return await Number(this.redisClient.get(key));
      }
    }
  

  /**

   * @Description: 根据key删除redis缓存数据
   * @param {string} key
   * @return {*}
   */
  public async del(key: string): Promise<Result<number, ClientContext>> {
    return await this.redisClient.del(key);
  }

  async hset(key: string, field: object): Promise<Result<number, ClientContext>> {
    return await this.redisClient.hset(key, field);
  }


  /**
   * @Description: 清除所有记录
   * @return {Promise<'OK'>}
   */
  public async clearAllRecords(): Promise<Result<'OK', ClientContext>> {
    return await this.redisClient.flushall();
  }


  /**
   * 
   * * @Description: 获取单一个值
   * @param {string} key
   * @param {string} field
   * @return {*}
   */
  async hget(key: string, field: string): Promise<Result<string | null, ClientContext>> {
    return await this.redisClient.hget(key, field);
  }

  /**

   * @Description: 获取全部的hget的
   * @param {string} key
   * @return {*}
   */
  async hgetall(key: string): Promise<Result<Record<string, string>, ClientContext>> {
    return await this.redisClient.hgetall(key);
  }

  /**

   * @Description: 清空redis的缓存
   * @return {*}
   */
  public async flushall(): Promise<Result<'OK', ClientContext>> {
    return await this.redisClient.flushall();
  }



    // ... existing code ...

  /**
   * @Description: 将一个或多个值插入到列表头部

   */
  public async lpush(key: string, values: any): Promise<Result<number, ClientContext>> {
    return await this.redisClient.lpush(key, values);
  }

  /**
   * @Description: 将一个或多个值插入到列表尾部
   * @param {string} key
   * @param {string | string[]} values
   * @return {Promise<number>} 返回列表的长度
   */
  public async rpush(key: string, values: any): Promise<Result<number, ClientContext>> {
    return await this.redisClient.rpush(key, values);
  }

  /**
   * @Description: 移出并获取列表的第一个元素
   * @param {string} key
   * @return {Promise<string | null>} 返回第一个元素的值，或者当列表为空时返回null
   */
  public async lpop(key: string): Promise<Result<string | null, ClientContext>> {
    return await this.redisClient.lpop(key);
  }

  /**
   * @Description: 移出并获取列表的最后一个元素
   * @param {string} key
   * @return {Promise<string | null>} 返回最后一个元素的值，或者当列表为空时返回null
   */
  public async rpop(key: string): Promise<Result<string | null, ClientContext>> {
    return await this.redisClient.rpop(key);
  }

  /**
   * @Description: 获取列表指定范围内的元素
   * @param {string} key
   * @param {number} start 开始位置，0 表示第一个元素
   * @param {number} stop 结束位置，-1 表示最后一个元素
   * @return {Promise<string[]>} 返回指定范围内的元素列表
   */
  public async lrange(key: string, start: number, stop: number): Promise<Result<string[], ClientContext>> {
    return await this.redisClient.lrange(key, start, stop);
  }

  /**
   * @Description: 获取列表长度
   * @param {string} key
   * @return {Promise<number>} 返回列表的长度
   */
  public async llen(key: string): Promise<Result<number, ClientContext>> {
    return await this.redisClient.llen(key);
  }

  /**
   * @Description: 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素
   * @param {string} key
   * @param {number} count 移除的数量，0 表示移除所有匹配的元素
   * @param {string} value 要移除的元素
   * @return {Promise<number>} 返回被移除元素的数量
   */
  public async lrem(key: string, count: number, value: string): Promise<Result<number, ClientContext>> {
    return await this.redisClient.lrem(key, count, value);
  }
    // ... existing code ...

  /**
   * @Description: 设置列表的过期时间
   * @param {string} key
   * @param {number} seconds 过期时间，单位为秒
   * @return {Promise<number>} 返回 1 表示成功设置过期时间，0 表示 key 不存在或未能设置过期时间
   */
  public async expireList(key: string, seconds: number): Promise<Result<number, ClientContext>> {
   
    return await this.redisClient.expire(key, seconds);
    
  }


    /**
   * @Description: 在列表中查找指定的值
   * @param {string} key 列表的键
   * @param {string} value 要查找的值
   * @return {Promise<number[]>} 返回匹配值的索引数组，如果没有找到则返回空数组
   */
    public async lsearch(key: string, value: string): Promise<number[]> {

        const listLength:number = await this.llen(key) as unknown as number;
        const allItems = await this.lrange(key, 0, listLength - 1) as unknown as [string];
         const indices: number[] = [];
         allItems.forEach((item, index) => {
         if (item === value) {
           indices.push(index);
         }
        });

         return indices;
    }

    /**
   * @Description: 获取匹配指定模式的所有键
   * @param {string} pattern 匹配模式，例如 "*" 匹配所有键
   * @return {Promise<string[]>} 返回匹配的键列表
   */
  public async getKeys(pattern: string): Promise<Result<string[], ClientContext>> {
    return await this.redisClient.keys(pattern);
  }

  // ... existing code ...
}






