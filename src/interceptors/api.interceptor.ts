import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { DecryptRequest } from '../utils/request';
import { isEmpty } from 'class-validator';
import { RedisService } from 'src/general/redis';
import { RedisKeyToken } from '../utils/redis-key';
@Injectable()
export class ApiInterceptor implements NestInterceptor {

  // 可以直接访问的
  private readonly decryptPathList: string[] = ['agent', 'admin', 'common','web'];
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {


    return next.handle()
    
    const request = context.switchToHttp().getRequest();
    const realIp = request.headers['cf-connecting-ip'] || request.connection.remoteAddress;
    // console.log('Real IP:', realIp);
    // /**当前请求方式 */
    const method = request.method;
    /**当前请求路径 */
    const url = request.url;
    if (method == "GET") {

      return next.handle()
    }

    const pathSegments = url.split('/').filter(segment => segment !== '');
    let path = pathSegments[1] || ''
    let functionPath = pathSegments[2] || ''

    //不需要解密的直接下一步处理
    if (!this.decryptPathList.includes(path)) {
      return next.handle()
    }


    //不校验参数了
    if (functionPath == 'modifly_platform_usdt' || functionPath == 'import_ali_makeup_condition' || functionPath == 'modifly_bot_usdt'
      || functionPath == 'modifly_web_usdt' || functionPath == 'edit_web_logo'
    ) {

      return next.handle()
    }


    //验证参数
    let requestString = request.body.request

    if (isEmpty(requestString)) {

      return of(JSON.stringify({ code: -1, msg: 'error params', data: {} }));
    }
    
    //进行解密
    let requestObj = new DecryptRequest().object(requestString)
    requestObj['ip']= realIp
    request.body = { ...request.body, params: requestObj };
    //统一处理 token
    if (path == 'agent' || path == 'admin') {

      console.log(functionPath)

      let token = requestObj.token
      let role_id = requestObj.roleID
      if (role_id) {

        let currentToken = await RedisService.share().get(RedisKeyToken(role_id))
        if (currentToken != token) {
          // RedisService.share().del(RedisKeyToken(role_id))
          return of(JSON.stringify({ code: -100, msg: '', data: {} }));
        } else {

          // RedisService.share().set(RedisKeyToken(role_id), token, TOKEN_EXPIRE)
        }
      }
    }

   


    //
    return next.handle()
  }

}