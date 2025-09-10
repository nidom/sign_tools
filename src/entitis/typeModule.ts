import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperUDIDEntity } from './super_udid.entity';

export let TypeModule =  TypeOrmModule.forFeature([
  
  SuperUDIDEntity,
  

])

