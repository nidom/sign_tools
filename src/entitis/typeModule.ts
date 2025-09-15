import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuperDeviceEntity } from './super_device.entity';
import { IOSDeviceEntity } from './ios_device.entity';

export let TypeModule =  TypeOrmModule.forFeature([
  
  SuperDeviceEntity,
  IOSDeviceEntity,
  

])

