/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
import { StartService } from './start.service';
import { UtilsService } from './utils.service';
import { LogService } from './log.service';
import { FileManagerService } from './file.service';
import { ClientService } from './client.service';
@Module({
    imports: [TypeModule],
    controllers: [],
    providers: [

        StartService,
        UtilsService,
        LogService,
        FileManagerService,
        ClientService,
     ],
    exports:[

        UtilsService,
        LogService,
        FileManagerService,
     ]
})
export class ActionModule { }
