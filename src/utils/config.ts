import { parse } from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
// // 获取项目运行环境
export const getEnv = () => {
  return process.env.NODE_ENV;
};

// export const IS_DEV = getEnv() === 'development';
// 读取项目配置
export const APP_CONFIG = () => {

  const environment = getEnv();
  //默认使用开发环境
  let yamlPath  = path.join(process.cwd(), `./app.dev.yml`);

  // if (environment === 'development') {
    
  //   yamlPath = path.join(process.cwd(), `./app.dev.yml`);
  // }

  if (environment === 'production') {
        yamlPath = path.join(process.cwd(), `./app.prod.yml`);
  }

   console.log(environment, '当前运行的环境');
  //  const yamlPath = path.join(process.cwd(), `./${environment}.yml`);
  
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};


