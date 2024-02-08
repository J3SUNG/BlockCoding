export class infinityLoop {
  startTime: Date | null = null;
  useTime: number = 0;

  constructor() {
    this.startTime = new Date();
  }

  startTimer() {
    if (this.startTime === null) {
      this.startTime = new Date();
    }
  }

  stopTimer() {
    if (this.startTime !== null) {
      const endTime = new Date();
      this.useTime += endTime.getTime() - this.startTime.getTime();
      this.startTime = null;
    }
  }

  isInfinityLoop() {
    const endTime = new Date();
    if (this.startTime) {
      const curUseTime = this.useTime + endTime.getTime() - this.startTime.getTime();

      return curUseTime > 3000;
    }
    return false;
  }
}
