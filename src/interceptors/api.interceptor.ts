import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements NestInterceptor {

  // 可以直接访问的
  private readonly decryptPathList: string[] = ['agent', 'admin', 'common','web'];
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {


    return next.handle()
    
    

  }

}