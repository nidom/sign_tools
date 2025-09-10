import { CommonModule } from './common_api/common.module';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { APP_CONFIG } from './utils';
import { AwsBillModule } from './aws_api/aws_bill.module';
import { SignModule } from './sign_api/sign.module';
let app_config = APP_CONFIG()
let mySqlModule = TypeOrmModule.forRootAsync({
  // name: 'data',
  imports: [
    SignModule,],
  inject: [],
  useFactory: () => ({

    type: 'mysql',
    host: app_config.datasource.host,
    port: Number.parseInt(app_config.datasource.port ?? '3306'),
    username: String(app_config.datasource.username),
    password: String(app_config.datasource.password),
    database: String(app_config.datasource.database),
    autoLoadEntities: true,
    // logging: configService.get('datasource.logging'),
    timezone: '+08:00',
    // UTC
    // extra: {
    //   authPlugin: 'caching_sha2_password'
    // }
    // extra: {
    //   connectionLimit: 500, // 连接池最大连接数
    //   queueLimit: 0, // 排队限制，0 表示无限制
    // },
    // // 添加连接池配置
    // poolSize: 20,
    // connectTimeout: 60000, // 连接超时时间（毫秒）
    // acquireTimeout: 60000, // 获取连接超时时间（毫秒）
  }),
});

// @Global()
@Module({

  imports: [

    CommonModule,
    mySqlModule,
    AwsBillModule,

  ],

  controllers: [


  ],
  providers: [
    
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
  ],
})

export class AppModule {



}



