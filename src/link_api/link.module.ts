import { LinkController } from './link.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { TypeModule } from 'src/entitis/typeModule';
import { ActionModule } from 'src/actions/action.module';
@Module({
    imports: [TypeModule,ActionModule],

    controllers: [
        LinkController,],
    providers: [
        LinkService,
    ],
})
export class LinkModule { }
