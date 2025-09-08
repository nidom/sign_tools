
// import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ObjectType } from 'typeorm';
// @Injectable()
 class EncryptionService {
  private readonly secretKey: string = 'd4YmI1BUOSB2S3YmalBVZUQ=DACEFX55';
  private readonly iv: string = '0000000000000027';

  decrypt(encryptedData: string): any {
 
    if (!encryptedData) {
      return "";
    }

    var cipherChunks = [];
    var cipher = crypto.createDecipheriv('aes-256-cbc', this.secretKey, this.iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(encryptedData, 'base64', 'utf8'));
    cipherChunks.push(cipher.final('utf8'));
    return cipherChunks.join('');
 }
}

//Dto
export class RequestDto {

  readonly params: any;

}

//Dto
export class CResult {
  
  code = 0;
  message = ''
  data:{}

  constructor(code,msg,data){

     this.code = code
     this.message = msg
     this.data = data
  }

}

//
export class DecryptRequest {

  // requestDto:RequestDto; 
  private static instance: DecryptRequest;
   object(encryptionString):any{

    // this.requestDto.request;
    // let requestJson = new EncryptionService().decrypt(this.requestDto.request);
    
    // return  requestJson;


    try {
 
      let requestJson = new EncryptionService().decrypt(encryptionString);
      //console.log(encryptionString)
      console.log(requestJson)
      //  return  requestJson;
      
      return  JSON.parse(requestJson);
    } catch(e) {
     
      return "invalid params";
    
    }
}

 }

