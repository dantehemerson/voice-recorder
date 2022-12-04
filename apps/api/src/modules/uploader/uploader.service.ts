import { Injectable } from '@nestjs/common';

@Injectable()
export class UploaderService {
  getHello(): string {
    return 'Hello World!';
  }
}
