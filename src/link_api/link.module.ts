import { LinkController } from './link.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
@Module({
    imports: [],
    controllers: [
        LinkController,],
    providers: [
        LinkService,
    ],
})
export class LinkModule { }
