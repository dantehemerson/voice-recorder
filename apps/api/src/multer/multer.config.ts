import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';
import { GlobalConf } from '../config/global-config.interface';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService<GlobalConf>) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: this.configService.get('uploads').dir,
      storage: multer.diskStorage({
        destination: (req, _file, callback) => {
          const uploadId = req.params.uploadId;
          const path = `${this.configService.get('uploads').dir}/${uploadId}`;

          fs.mkdirSync(path, { recursive: true });

          callback(null, path);
        },
        filename: (req, _file, callback) => {
          const chunkNumber = req.params.chunkNumber;
          callback(null, chunkNumber);
        },
      }),
    };
  }
}
