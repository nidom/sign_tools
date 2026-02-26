/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { LinkService } from './link.service';
import { Get,Post} from '@nestjs/common';
import { Param } from '@nestjs/common';
@Controller('api')
export class LinkController {
    constructor(
        private readonly linkService: LinkService,
    ) { }
    @Get('link/:app_id')
    async appLink(@Param('app_id') app_id: string): Promise<any> {
        return await this.linkService.app_link(app_id);
    }

    @Post('link/:app_id')
    async appLinkPost(@Param('app_id') app_id: string): Promise<any> {
        return await this.linkService.app_link(app_id);
    }







}
