import { WorkspaceData } from '../types/stateType';

export class WorkspaceHistory {
  #stack: WorkspaceData[];
  #capacity: number;

  constructor() {
    this.#stack = [[]];
    this.#capacity = 10;
  }

  push(item: WorkspaceData): void {
    if (this.#stack.length >= this.#capacity) {
      this.#stack.shift();
    }

    this.#stack.push(item);
  }

  pop(): WorkspaceData | undefined {
    const MIN_STACK_SIZE = 1;
    if (this.#stack.length > MIN_STACK_SIZE) {
      return this.#stack.pop();
    }
    return this.peek();
  }

  peek(): WorkspaceData | undefined {
    return this.#stack[this.#stack.length - 1];
  }
}
