import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaInfoDto } from '@voice-recorder/shared-types';
import 'multer';
import { UploaderService } from './uploader.service';

@Controller('upload')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Get('alive')
  alive() {
    return {
      ok: true,
      serverTime: new Date(),
      NODE_ENV: process.env.NODE_ENV,
    };
  }

  @UseInterceptors(FileInterceptor('chunk'))
  @Post('/:uploadId/chunk/:chunkNumber')
  uploadChunk(
    @Param('uploadId') uploadId: string,
    @Param('chunkNumber', new ParseIntPipe()) chunkNumber: number,
    @UploadedFile() chunks: Express.Multer.File
  ) {
    return this.uploaderService.uploadChunk(uploadId, chunkNumber, chunks);
  }

  @Post('/:uploadId/finalize')
  async finalize(@Param('uploadId') uploadId: string): Promise<MediaInfoDto> {
    await this.uploaderService.finalizeUpload(uploadId);

    return {
      status: 0,
      mediaId: '123',
      ownerToken: '123',
    };
  }
}