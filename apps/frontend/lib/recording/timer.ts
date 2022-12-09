export class Timer {
  private startTime: number;
  private stoppedTime: number;

  constructor() {
    this.reset();
  }

  reset() {
    this.startTime = null;
    this.stoppedTime = null;
  }

  start() {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    if (this.stoppedTime) {
      this.startTime += Date.now() - this.stoppedTime;
      this.stoppedTime = null;
    }
  }

  resetAndStart() {
    this.reset();
    this.start();
  }

  stop() {
    if (!this.stoppedTime) {
      this.stoppedTime = Date.now();
    }
  }

  getTime(): number {
    if (this.startTime) {
      if (this.stoppedTime) {
        return this.stoppedTime - this.startTime;
      } else {
        return Date.now() - this.startTime;
      }
    }

    return 0;
  }

  static makeTimeStrMMSS(time: number): string {
    const minutes = Math.floor(time / 60000);

    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = Math.floor((time - minutes * 60000) / 1000)
      .toString()
      .padStart(2, '0');

    return `${minutesStr}.${secondsStr}`;
  }
}
