/** Module */

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadsCleanerService } from './uploads-cleaner.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [UploadsCleanerService],
})
export class UplaodsCleanerModule {}
