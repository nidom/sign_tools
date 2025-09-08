import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { Module } from '@nestjs/common';
import { TypeModule } from 'src/entitis/typeModule';
import { ActionModule } from 'src/actions/action.module';
@Module({
    imports: [TypeModule,ActionModule],
    controllers: [
        CommonController],
    providers: [
        CommonService,
    ],
})
export class CommonModule { 


}
