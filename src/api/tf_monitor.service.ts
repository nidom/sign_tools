/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { LogService } from 'src/actions/log.service';
@Injectable()
export class TFMonitorService {
 
    public urlsCache = []
    constructor(
      
        private readonly logService: LogService,

      ) { }

    // 监控URL可访问性的方法
    async monitor(): Promise<any> {

        let url_prefix = 'https://testflight.apple.com/join/';
        let urls = ['WkNHSqfG'] 
        for(let url of urls){
             await this.monitorUrlAccessibility(url_prefix+url);
        }
    }

    // 监控URL可访问性的方法
    async monitorUrlAccessibility(url: string): Promise<void> {
        
        try {
            
            const response = await fetch(url);
            if (response.status === 404) {

                if(!this.urlsCache.includes(url)){
                    this.urlsCache.push(url);
                    this.logService.tf_warning(url);

                }
            } else {
                // console.log(`URL ${url} is accessible - Status: ${response.status}`);
            }
        } catch (error) {


            this.logService.tf_warning(url);
        }
    }


}
