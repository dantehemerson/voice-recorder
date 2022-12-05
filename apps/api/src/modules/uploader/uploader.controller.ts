import 'multer';
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

@Controller('upload')
export class UploaderController {
  @Get('alive')
  alive() {
    return {
      ok: true,
      serverTime: new Date(),
      NODE_ENV: process.env.NODE_ENV,
    };
  }

  @UseInterceptors(FileInterceptor('chunk'))
  @Post('/:id/chunk/:chunkNumber')
  uploadChunk(
    @Param('id') id: string,
    @Param('chunkNumber', new ParseIntPipe()) chunkNumber: string,
    @UploadedFile() chunks: Express.Multer.File[]
  ) {
    console.log('upload', id, chunkNumber, chunks);
    return {
      ok: true,
    };
  }

  @Post('/:id/finalize')
  async finalize(@Param('id') id: string): Promise<MediaInfoDto> {
    console.log('finalize', id);
    await new Promise(resolve => setTimeout(resolve, 10000));

    return {
      status: 0,
      mediaId: '123',
      ownerToken: '123',
    };
  }
}
