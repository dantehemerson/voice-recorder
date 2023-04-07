import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DownloadUrlReponseDto,
  MediaInfoDto,
} from '@voice-recorder/shared-types';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import { GlobalConf } from '../config/global-config.interface';
import { waitForStreamClose } from '../helpers/wait-for-stram-close.helper';
import { S3Service } from '../s3/decorators/s3-service.decorator';
import { S3 } from '../s3/s3.types';

@Injectable()
export class UploaderService {
  private data: any = {};
  constructor(
    @S3Service() private readonly s3: S3,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService<GlobalConf>
  ) {}

  async uploadChunk(
    uploadId: string,
    chunkNumber: number,
    chunks: Express.Multer.File
  ): Promise<string> {
    const multipartUploadId = await this.getMultipartUploadId(uploadId);

    const partUploadResult = await this.s3
      .uploadPart({
        Bucket: this.configService.get('recordings').bucket,
        Key: `${uploadId}.mp3`,
        PartNumber: chunkNumber + 1,
        UploadId: multipartUploadId,
        Body: chunks.buffer,
      })
      .promise();

    this.data[uploadId] = (this.data[uploadId] || []).concat({
      ETag: partUploadResult.ETag,
      PartNumber: chunkNumber + 1,
    });

    return partUploadResult as any;
  }

  private async getMultipartUploadId(uploadId: string): Promise<string> {
    const multipartUploadId = await this.cacheManager.get<string>(uploadId);

    if (multipartUploadId) {
      return multipartUploadId;
    }

    try {
      const result = await this.createMultipartUpload(uploadId);

      await this.cacheManager.set(uploadId, result.UploadId);

      return result.UploadId;
    } catch (error) {
      console.log(error);

      throw new ConflictException(
        `Could not create multipart upload: ${error.message}`
      );
    }
  }

  private createMultipartUpload(key: string) {
    return this.s3
      .createMultipartUpload({
        Bucket: this.configService.get('recordings').bucket,
        Key: `${key}.mp3`,
        ContentType: 'audio/mpeg',
      })
      .promise();
  }

  async finalizeUpload(uploadId: string) {
    const recordingPath = await this.generateRecordingFile(uploadId);

    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get('recordings').bucket,
          Key: `${uploadId}.mp3`,
          ContentType: 'audio/mpeg',
          Body: fs.createReadStream(recordingPath),
          ACL: 'public-read',
        })
        .promise();

      try {
        fs.rmSync(`${this.configService.get('uploads').dir}/${uploadId}/`, {
          recursive: true,
          force: true,
        });
      } catch (error) {
        console.log('Error deleting upload folder', error);
      }

      return {
        mediaUrl: uploadResult.Location,
        status: 0,
        mediaId: uploadId,
        ownerToken: 'ip-address-id',
      };
    } catch (error) {
      throw new ConflictException(
        `Could not upload finalize recording: ${error.message}`
      );
    }
  }

  private async generateRecordingFile(uploadId: string): Promise<string> {
    const files = fs.readdirSync(
      `${this.configService.get('uploads').dir}/${uploadId}`
    );

    files.sort((a, b) => parseInt(a) - parseInt(b));

    const recordingFilePath = `${
      this.configService.get('uploads').dir
    }/${uploadId}/${uploadId}.mp3`;

    const recordingFile = fs.createWriteStream(recordingFilePath);

    for (const fileChunk of files) {
      const chunk = fs.readFileSync(
        `${this.configService.get('uploads').dir}/${uploadId}/${fileChunk}`
      );

      recordingFile.write(chunk);
    }

    recordingFile.end();
    recordingFile.close();

    await waitForStreamClose(recordingFile);

    return recordingFilePath;
  }

  async deleteRecording(recordingId: string) {
    const exists = await this.s3
      .headObject({
        Bucket: this.configService.get('recordings').bucket,
        Key: `${recordingId}.mp3`,
      })
      .promise()
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      throw new NotFoundException(`Couldn't delete. Recording not found.`);
    }

    const response = await this.s3
      .deleteObject({
        Bucket: this.configService.get('recordings').bucket,
        Key: `${recordingId}.mp3`,
      })
      .promise();

    return response;
  }

  async getRecording(recordingId: string): Promise<MediaInfoDto> {
    const exists = await this.s3
      .headObject({
        Bucket: this.configService.get('recordings').bucket,
        Key: `${recordingId}.mp3`,
      })
      .promise()
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      throw new NotFoundException('Recording not found.');
    }

    return {
      mediaId: recordingId,
      status: 0,
      ownerToken: '',
    };
  }

  async getDownloadUrl(uploadId: string): Promise<DownloadUrlReponseDto> {
    const url = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('recordings').bucket,
      Key: `${uploadId}.mp3`,
      Expires: 60,
      ResponseContentDisposition: 'attachment',
    });

    return {
      url,
    };
  }
}
