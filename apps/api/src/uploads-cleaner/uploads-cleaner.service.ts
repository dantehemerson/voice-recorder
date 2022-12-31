import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class UploadsCleanerService {
  constructor(private readonly configService: ConfigService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  cleanUploads() {
    const uploads = fs.readdirSync(this.configService.get('uploads.dir'));

    uploads.forEach(upload => {
      try {
        const creationDate = fs.statSync(
          `${this.configService.get('uploads.dir')}/${upload}`
        ).birthtime;

        const diff = Math.abs(Date.now() - creationDate.getTime());
        const diffMinutes = Math.ceil(diff / (1000 * 60));

        const deleteAfter = this.configService.get(
          'uploads.deleteAfterMinutes'
        );

        if (diffMinutes >= deleteAfter) {
          fs.rmSync(`${this.configService.get('uploads.dir')}/${upload}`, {
            recursive: true,
            force: true,
          });
        }
      } catch (error) {
        console.log('Error deleting upload', upload, error);
      }
    });
  }
}
