import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { GlobalConf } from '../../config/global-config.interface';
import { S3_SERVICE } from '../s3.constants';

export const S3Provider: Provider = {
  provide: S3_SERVICE,
  useFactory(configService: ConfigService) {
    const awsConfig = configService.get<GlobalConf['aws']>('aws');

    return new AWS.S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
      signatureVersion: 'v4',

      // Only for Minio
      s3ForcePathStyle: false ? undefined : true,
      endpoint: false ? undefined : 'http://127.0.0.1:9000',
    });
  },
  inject: [ConfigService],
};
