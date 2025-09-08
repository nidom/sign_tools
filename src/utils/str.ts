import crypto from 'crypto';
// import { createHash } from 'crypto';
import { randomBytes } from 'crypto';
import { MD5 } from 'crypto-js';
/**
 * @Author: nidom
 * @Date: 2023-10-07 18:53:32
 * @Description: 随机生成指定范围内的随机数
 * @param {number} min
 * @param {number} max
 * @return {*}
 */
export const getRandomNum = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max - min));
};


export const getEmailCode = (): string => {
  return getRandomNum(100000,999999).toString();
};

/**
 * @Author: nidom
 * @Date: 2023-10-07 18:56:03
 * @Description: 生成随机长度的字符串
 * @param {number} length
 * @return {*}
 */
export const randomString = (length: number): string => {
  return randomBytes(length).toString('hex').slice(0, length);
};

/**
 * @Date: 2023-10-07 19:06:42
 * @Description: 字符串md5加密
 * @param {string} str
 * @return {*}
 */
export const strToMd5 = (str: string): string => {

  return MD5(str).toString();
};


export const idGenergate = (str: string): string => {

  
  let buff = Buffer.from(strToMd5(str));
  let base64String = buff.toString('base64');
   return base64String.substring(0,8);
};


export const getRandomString = (length: number): string =>{

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}


export const idGenergateWithLength = (str: string,length: number,): string => {

  let buff = Buffer.from(strToMd5(str));
  let base64String = buff.toString('base64');
  return base64String.substring(0,length);



};

export const generateYearBasedId=(): string =>{

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  // const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  let random = getRandomNum(1000,9999)
  const idString = `${year}${month}${day}${hours}${minutes}${seconds}${random}`;
  return idString
}


