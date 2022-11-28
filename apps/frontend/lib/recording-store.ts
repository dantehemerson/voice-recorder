export class RecordingStore {
  private audioData: Int8Array[] = [];

  getAudioData(): Int8Array[] {
    return this.audioData;
  }

  appendData(data: Int8Array) {
    this.audioData.push(data);
  }

  generateAudioBlob(): Blob {
    return new Blob(this.audioData, {
      type: 'audio/mpeg',
    });
  }

  generateAudioBlobUrl(): string {
    return URL.createObjectURL(this.generateAudioBlob());
  }
}
