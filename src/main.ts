import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_CONFIG } from './utils';
export const config = APP_CONFIG();
const port = config.PORT;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
   //支持跨域
  
   app.enableCors();
   await app.listen(port);
}

bootstrap();
