/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentRoleEntity } from 'src/entitis/agent_role.entity';
import { AgentUserEntity } from 'src/entitis/agent_user.entity';
import { UserEntity } from 'src/entitis/user.entity';
import { CResult } from 'src/utils';
import { In } from 'typeorm';
@Injectable()
export class AgentService {



    constructor(
        @InjectRepository(AgentRoleEntity)
        private readonly agentRepository: Repository<AgentRoleEntity>,
        @InjectRepository(AgentUserEntity)
        private readonly agentUserRepository: Repository<AgentUserEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }


    async user_list(aget_role): Promise<any> {


        let agent_role_record = await this.agentRepository.findOne({where: {role_id: aget_role}});

        if(!agent_role_record){
          return new CResult(-1, '代理不存在', {});
        }

        let agent_user_list = await this.agentUserRepository.find({where: {agent_id: agent_role_record.role_id}});
        let user_ids = agent_user_list.map(item => item.user_id);

        let user_list = await this.userRepository.find({where: {id: In(user_ids)}});

        let results = [];
        for (let item of user_list) {
        
            results.push({
                ...item,
                note: agent_user_list.find(agent_user => agent_user.user_id === item.id)?.note,
   
  
            });
        }

        // for(let user_item of user_list){

        //     user_item.note = agent_user_list.find(agent_user => agent_user.user_id === user_item.id)?.note;
        // }

        return  new CResult(0, '', results);
    }



 }
