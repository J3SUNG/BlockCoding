export class Debug {
  #time: number;

  constructor() {
    this.#time = 0;
  }

  get time() {
    return this.#time;
  }

  set time(value: number) {
    this.#time = value;
  }
}
