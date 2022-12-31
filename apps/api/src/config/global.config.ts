import { GlobalConf } from './global-config.interface';

export const globalConfiguration = (): GlobalConf =>
  ({
    databases: {
      mongo: {
        uri: process.env.MONGODB_URI,
      },
      redis: {
        host: process.env.REDIS__HOST,
        // port: parseIntEnv(process.env.REDIS__PORT),
      },
    },
    aws: {
      accessKeyId: process.env.AWS__ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS__SECRET_ACCESS_KEY,
      region: process.env.AWS__REGION || 'us-east-1',
    },
    recordings: {
      bucket: process.env.AWS__BUCKETS__RECORDINGS,
    },
    api: {
      baseURL: process.env.API__BASE_URL,
    },
    uploads: {
      dir: process.env.UPLOADS__DIR,
      deleteAfterMinutes: parseInt(process.env.UPLOADS__DELETE_AFTER),
    },
  } as GlobalConf);
