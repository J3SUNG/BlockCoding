import { EXCEPTION } from '../../constants/exceptionMap';

type ExceptionType = '' | 'infinityLoop' | 'nan' | 'infinity';

export class Exception {
  #startTime: number | null = null;
  #useTime: number = 0;
  #exception: ExceptionType;

  constructor() {
    this.#startTime = Date.now();
    this.#exception = '';
  }

  startTimer() {
    if (this.#startTime === null) {
      this.#startTime = Date.now();
    }
  }

  stopTimer() {
    if (this.#startTime !== null) {
      const endTime = Date.now();
      this.#useTime += endTime - this.startTime;
      this.#startTime = null;
    }
  }

  isInfinityLoop() {
    const #endTime = Date.now();
    if (this.#startTime) {
      const curUseTime = this.#useTime + #endTime - this.#startTime;

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

  get isError() {
    return this.#exception !== '';
  }

  errorMessage() {
    return EXCEPTION[this.#exception];
  }
}
