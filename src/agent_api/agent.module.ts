import { AgentService } from './agent.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { TypeModule } from 'src/entitis/typeModule';
@Module({
    imports: [TypeModule],
    controllers: [
        AgentController,],
    providers: [
        AgentService,],
})
export class AgentModule { }
