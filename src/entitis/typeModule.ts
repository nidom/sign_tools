import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperDeviceEntity } from './super_device.entity';
import { IOSDeviceEntity } from './ios_device.entity';
import { SignConfigEntity } from './sign_config.entity';
import { AgentRoleEntity } from './agent_role.entity';
import { AgentUserEntity } from './agent_user.entity';
import { UserEntity } from './user.entity';
import { AppIDEntity } from './app_id.entity';
export let TypeModule =  TypeOrmModule.forFeature([
  
  SuperDeviceEntity,
  IOSDeviceEntity,
  SignConfigEntity,
  AgentRoleEntity,
  AgentUserEntity,
  UserEntity,
  AppIDEntity,
])

