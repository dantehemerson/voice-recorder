import { Module } from '@nestjs/common';
import { UploaderModule } from './uploader/uploader.module';

@Module({
  imports: [UploaderModule],
})
export class AppModule {}
