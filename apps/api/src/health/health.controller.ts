import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/health')
  health() {
    return {
      ok: true,
      serverTime: new Date(),
      bucket: process.env.AWS__BUCKETS__RECORDINGS,
      uploadsDir: process.env.UPLOADS__DIR,
      uploadsDeleteAfter: process.env.UPLOADS__DELETE_AFTER,
      NODE_ENV: process.env.NODE_ENV,
    };
  }
}
