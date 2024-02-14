export class Debug {
  time: number;

  constructor() {
    this.time = 0;
  }

  set setTime(value: number) {
    this.time = value;
  }

  get getTime() {
    return this.time;
  }
}
