export interface GlobalConf {
  databases: {
    mongo: {
      uri: string;
    };
    redis: {
      host: string;
      // port: number;
    };
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
  recordings: {
    bucket: string;
  };
  api: {
    baseURL: string;
  };
}
