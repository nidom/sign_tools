/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Body, Req } from '@nestjs/common';
import { RequestDto } from 'src/utils';
import { Post, Get, Param } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { AgentService } from './agent.service';
@Controller('api/agent')
export class AgentController {

    constructor(
        private readonly agentService: AgentService,
    ) { }

    @Get('user_list/:agent_role')
    async user_list(@Param('agent_role') agent_role: string, @Req() request: Request): Promise<any> {

        return await this.agentService.user_list(agent_role);
    }
 }
