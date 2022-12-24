import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { S3Service } from '../s3/decorators/s3-service.decorator';
import { S3 } from '../s3/s3.types';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { GlobalConf } from '../config/global-config.interface';

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
    const multipartUploadId = await this.cacheManager.get<string>(uploadId);

    if (!multipartUploadId) {
      throw new NotFoundException('Upload id not found');
    }

    const resultFinalize = await this.s3
      .completeMultipartUpload({
        Bucket: this.configService.get('recordings').bucket,
        Key: `${uploadId}.mp3`,
        UploadId: multipartUploadId,
        MultipartUpload: {
          Parts: this.data[uploadId],
        },
      })
      .promise();

    return resultFinalize;
  }
}
