/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
import { StartService } from './start.service';
import { LogService } from './log.service';
@Module({
    imports: [TypeModule],
    controllers: [],
    providers: [

        StartService,
        LogService,
     ],
    exports:[

        LogService,
     ]
})
export class ActionModule { }
