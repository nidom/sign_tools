/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class FileManagerService {


async decompressGzipFile(rowContent:Buffer, outputPath: string): Promise<any> {
    
    const zlib = require('zlib');
    const fs = require('fs');
    const { promises: fsPromises } = fs;
    try {
        // Create a gunzip stream and decompress the buffer
        const decompressed = zlib.gunzipSync(rowContent);
         // Write the decompressed content to the output path
        await fsPromises.writeFile(outputPath, decompressed);
        return {
            success: true,
            message: 'File decompressed successfully',
            outputPath
        };
    } catch (error) {
        
        return {
            success: false,
            message: `Failed to decompress file: ${error.message}`,
            error
        };
    }

}

    
}
