import { EXCEPTION } from '../../constants/exceptionMap';

type ExceptionType = '' | 'infinityLoop' | 'nan' | 'infinity' | 'nullPointer';

export class Exception {
  #startTime: Date | null = null;
  #useTime: number = 0;
  #exception: ExceptionType;

  constructor() {
    this.#startTime = new Date();
    this.#exception = '';
  }

  startTimer() {
    if (this.#startTime === null) {
      this.#startTime = new Date();
    }
  }

  stopTimer() {
    if (this.#startTime !== null) {
      const endTime = new Date();
      this.#useTime += endTime.getTime() - this.#startTime.getTime();
      this.#startTime = null;
    }
  }

  isInfinityLoop() {
    const endTime = new Date();
    if (this.#startTime) {
      const curUseTime = this.#useTime + endTime.getTime() - this.#startTime.getTime();

      if (curUseTime > 10000) {
        this.#exception = 'infinityLoop';
      }
    }
  }

  isNan(value: number) {
    if (isNaN(value)) {
      this.#exception = 'nan';
    }
  }

  isInfinity(value: number) {
    if (value === Infinity || value === -Infinity) {
      this.#exception = 'infinity';
    }
  }

  isNullPointer() {
    this.#exception = 'nullPointer';
  }

  get isError() {
    return this.#exception !== '';
  }

  errorMessage() {
    return EXCEPTION[this.#exception];
  }
}
