import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { globalConfiguration } from './config/global.config';
import { globalConfigValidationSchema } from './config/global.schema';
import { HealthModule } from './health/health.module';
import { UploaderModule } from './uploader/uploader.module';
import { UplaodsCleanerModule } from './uploads-cleaner/uploads-cleaner.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: globalConfigValidationSchema,
      load: [globalConfiguration],
      validationOptions: {
        allowUnknown: true,
      },
    }),
    UplaodsCleanerModule,
    UploaderModule,
  ],
})
export class AppModule {}
