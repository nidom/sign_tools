/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { LogService } from 'src/actions/log.service';
import { Inject } from '@nestjs/common';
@Injectable()
export class DiskService {

    constructor(
        @Inject(LogService)
        private readonly logService: LogService,
    ) {
    }

    //读取服务器磁盘空间
  async disk_warning(): Promise<any> {

    const { execSync } = require('child_process');
    try {
      const stdout = execSync('df -k /', { encoding: 'utf8' });
      const lines = stdout.trim().split('\n');
      if (lines.length >= 2) {
        // Linux/macOS format: Filesystem 1024-blocks Used Available Capacity Mounted on
        const parts = lines[1].split(/\s+/);
        // "Available" is usually the 4th column (index 3)
        const availableKB = parseInt(parts[3], 10);
        const availableGB = (availableKB / 1024 / 1024).toFixed(2);
        // this.logService.disk_warning(`当前硬盘剩余空间: ${availableGB} GB`);
        return availableGB;
      } else {
        this.logService.disk_warning('读取磁盘空间信息失败');
      }
    } catch (error) {
      this.logService.disk_warning(`Error checking disk space: ${error.message}`);
    }

  }

  // INSERT_YOUR_CODE
  async cleanOldFiles(): Promise<void> {

    let dirPath = '/www/wwwroot/iosxapp.com/data/uploads/super_sign_ipa'
    const fs = require('fs');
    const path = require('path');
    try {
      const files: string[] = await new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
          if (err) reject(err);
          else resolve(files);
        });
      });

      const now = Date.now();
      for (let file of files) {
        const filePath = path.join(dirPath, file);
        const stat: any = await new Promise((resolve, reject) => {
          fs.stat(filePath, (err, stat) => {
            if (err) reject(err);
            else resolve(stat);
          });
        });

        if (stat.isFile()) {
          const mtime = stat.mtime.getTime();
          if ((now - mtime) > 8 * 60 * 60 * 1000) { // 8 hours in milliseconds
            await new Promise((resolve, reject) => {
              fs.unlink(filePath, (err) => {
                // ignore error: file may be removed already
                resolve(undefined);
              });
            });
          }
        }
      }

      let disk_space = await this.disk_warning();
      this.logService.disk_warning(`清理ipa文件完成,剩余空间: ${disk_space} GB`);

    } catch (error) {
      if (this.logService && this.logService.disk_warning) {
        this.logService.disk_warning(`清理文件出错: ${error.message || error}`);
      }
    }
  }


}
