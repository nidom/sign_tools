import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { Module } from '@nestjs/common';
import { ActionModule } from 'src/actions/action.module';
import { TypeModule  } from 'src/entitis/typeModule';
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
