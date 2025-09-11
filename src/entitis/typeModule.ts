import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperSignEntity } from './super_sign.entity';

export let TypeModule =  TypeOrmModule.forFeature([
  
  SuperSignEntity,
  

])

