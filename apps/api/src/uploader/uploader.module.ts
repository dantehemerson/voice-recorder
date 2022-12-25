import { CacheModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../multer/multer.config';
import { S3Provider } from '../s3/providers/s3.provider';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60 * 24 * 7,
    }),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [UploaderController],
  providers: [S3Provider, UploaderService],
})
export class UploaderModule {}
