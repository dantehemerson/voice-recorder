export interface MediaInfo {
  mediaId: string;
  ownerToken: string;
  time?: number;
}

export interface MediaInfoRequest extends MediaInfo {
  status: number;
}
