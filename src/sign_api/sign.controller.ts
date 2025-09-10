/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { UDIDMonitorService } from './udid_monitor.service';
@Controller()
export class SignController {


    constructor(
        private readonly signService: UDIDMonitorService,
    ) { }

    async sign(req: object, request: Request): Promise<any> {

        return await this.signService.udid_monitor(req, request);
    }
}
