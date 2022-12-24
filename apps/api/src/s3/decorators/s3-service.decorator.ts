import { Inject } from '@nestjs/common';
import { S3_SERVICE } from '../../s3/s3.constants';

export const S3Service = () => Inject(S3_SERVICE);
