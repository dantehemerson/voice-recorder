import { CacheModule, Module } from '@nestjs/common';
import { S3Provider } from '../s3/providers/s3.provider';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60 * 24 * 7,
    }),
  ],
  controllers: [UploaderController],
  providers: [S3Provider, UploaderService],
})
export class UploaderModule {}
