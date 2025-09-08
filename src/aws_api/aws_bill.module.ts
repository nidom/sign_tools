import { AwsBillController } from './aws_bill.controller';
import { AwsBillService } from './aws_bill.service';
import { ActionModule } from 'src/actions/action.module';
import { AwsSQLService } from './aws_sql.service';
import { AwsDealDataService } from './aws_deal_data.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
    
@Module({
    imports: [ActionModule],
    controllers: [
        AwsBillController,],
    providers: [
        AwsBillService,
        AwsSQLService,
        AwsDealDataService,
    ],
})
export class AwsBillModule { }
