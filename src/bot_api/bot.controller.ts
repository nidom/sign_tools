// /*
// https://docs.nestjs.com/controllers#controllers
// */

// import { Controller } from '@nestjs/common';
// import { Body, Req } from '@nestjs/common';
// import { RequestDto } from 'src/utils';
// import { Post, Get, Param } from '@nestjs/common';
// import { Request } from '@nestjs/common';

// import { BotAgentService } from './bot_agent.service';
// import { isEmpty } from 'class-validator';

// @Controller('api/bot')
// export class BotController {

//     constructor(
//         private readonly botAgentService: BotAgentService,
//     ) { }

//     @Post('/*')
//     async bot_agent(@Body() body: any, @Req() request: Request): Promise<any> {
  


//         return await this.botAgentService.update(body);
 

//     //   let url = request.url
//     //   let urlParts = url.split('/')
//     //   let lastElement = urlParts[urlParts.length - 1]
//     //   if (isEmpty(lastElement)) {
//     //     return 0
//     //   }
      
//     //   let bot = await this.botUtilsService.botWithID(lastElement)
//     //   if (isEmpty(bot)) {
//     //     return 0
//     //   }
//     //   if (bot.type == 'admin') {
  
//     //     return await this.botAdminService.update(body, bot);
//     //   }
//     //   if (bot.type == 'agent') {
  
//     //     return await this.botAgentService.update(body, bot);
//     //   }
//     //   if (bot.type == 'message') {
  
//     //     return await this.botMessageService.update(body, bot);
//     //   }
//     }



// }
