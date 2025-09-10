/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { SignController } from './sign.controller';
import { SuperUDIDEntity } from 'src/entitis/super_udid.entity';
import { Repository } from 'typeorm';

const parse = require('mobileprovision-parse');

@Injectable()
export class UDIDMonitorService {

    async udid_monitor(req: object, request: Request): Promise<any> {

    }

}
