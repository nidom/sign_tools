/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
import { SignController } from './sign.controller';
import { UDIDMonitorService } from './udid_monitor.service';
import { ActionModule } from 'src/actions/action.module';
import { UrlRedirectService } from './url_redirect.service';
import { TFMonitorService } from './tf_monitor.service';
import { UrlLinkService } from './url_link.service';
@Module({
    imports: [TypeModule,ActionModule],
    controllers: [SignController],
    providers: [
        UDIDMonitorService,
        UrlRedirectService,
        TFMonitorService,
        UrlLinkService,
    ],
})
export class SignModule { }
