import {
  BLOCK_DEFAULT_HEIGHT,
  BLOCK_DEFAULT_WIDTH,
  BLOCK_SPACE_DEFAULT_MARGIN,
  BLOCK_SPACE_DEFAULT_WIDTH,
} from '../../constants/blockDefaultMap';
import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { createUniqueId } from '../../utils/createUniqueId';
import { Exception } from '../exception/exception';
import { Debug } from '../debug/debug';

export class BlockCommon implements BlockObject {
  name = '';
  type = '';
  width = 100;
  spaceWidth = [50, 50];
  childWidth? = 100;
  fold = false;
  paramSize = 0;
  data: BlockObject['data'];

  constructor(id: string, x: number, y: number, value: BlockObjectValue) {
    this.data = { id, x, y, value };
  }

  setChildPosition(index?: number) {
    return { childX: 0, childY: 0 };
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onChange?: (id: string, value: string, insertLocation?: string) => void,
    changeBlockWidth?: () => void,
  ) {
    const div = createElementCommon('div', { id, className: `block` });
    div.setAttribute('style', `left: ${x}px; top: ${y}px;`);

    return { block: div, space: [] as HTMLElement[] };
  }

  insert(obj: BlockObject, insertType?: string): boolean {
    return false;
  }

  async runLogic(
    variableMap: Map<string, string>,
    functionMap: Map<string, BlockCommon>,
    prevLog: () => { text: string; type: string }[],
    setChanageLog: (log: { text: string; type: string }[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    exceptionManager: Exception,
    debugManager: Debug,
  ): Promise<string> {
    return '';
  }

  calcWidth() {
    let addWidth = 0;
    this.width = this.defaultWidth;
    this.getInnerBlock().forEach((innerProp, index) => {
      const block = this.data[innerProp];
      if (typeof block === 'object' && Object.keys(block).length === 0) {
        this.spaceWidth[index] = this.defaultSpaceWidth;
        addWidth += this.defaultSpaceWidth + this.defaultSpaceMargin;
      } else if (block instanceof BlockCommon) {
        this.spaceWidth[index] = block.calcWidth();
        addWidth += this.spaceWidth[index] + this.defaultSpaceMargin;
      }
    });

    this.width = this.defaultWidth + addWidth;
    this.childWidth = this.width - 48;

    const div = document.getElementById(this.data.id);
    if (div) {
      div.style.width = `${this.width}px`;
    }

    for (let i = 0; i < this.getInnerBlock().length; i++) {
      if (div) {
        const space = div.querySelector(':scope > #space' + (i + 1));
        if (space instanceof HTMLElement) {
          space.style.width = `${this.spaceWidth[i]}px`;
        }
      }
    }

    this.getChildBlock().forEach((childProp) => {
      const block = this.data[childProp];

      if (Array.isArray(block)) {
        block.forEach((childBlock) => {
          childBlock.calcWidth();
        });
      }
    });

    const childSpace = div?.querySelector(':scope > .block__child');
    if (childSpace instanceof HTMLElement) {
      childSpace.style.width = `${this.childWidth}px`;
    }

    return this.width;
  }

  calcHeight(): { childHeight: number; prefixSum?: number[] } {
    if (this.getChildBlock().length <= 0) {
      return { childHeight: this.defaultHeight };
    } else {
      if (this.fold) {
        const div = document.querySelector(`#${this.data.id}`) as HTMLDivElement;
        const child = div.querySelector(':scope > .block__child') as HTMLSpanElement;
        if (child) {
          child.style.display = 'none';
        }
        if (this.name === 'function') {
          return { childHeight: 100 };
        } else {
          return { childHeight: 50 };
        }
      } else {
        let height = 0;
        let prefixSum: number[] = [0];
        this.getChildBlock().forEach((key) => {
          const childList = this.data[key];

          if (Array.isArray(childList)) {
            childList.forEach((child) => {
              if (child instanceof BlockCommon) {
                const { childHeight } = child.calcHeight();
                height += childHeight;
                prefixSum.push(prefixSum[prefixSum.length - 1] + childHeight);
              }
            });
          }
        });

        if (this.name === 'start') {
          return { childHeight: 50, prefixSum };
        } else {
          return { childHeight: height + 100 > 150 ? height + 100 : 150, prefixSum };
        }
      }
    }
  }

  getInnerBlock(): string[] {
    return ['value'];
  }

  getChildBlock(): string[] {
    return [];
  }

  get defaultWidth() {
    return BLOCK_DEFAULT_WIDTH[this.name];
  }

  get defaultHeight() {
    return BLOCK_DEFAULT_HEIGHT[this.name];
  }

  get defaultSpaceWidth() {
    return BLOCK_SPACE_DEFAULT_WIDTH;
  }

  get defaultSpaceMargin() {
    return BLOCK_SPACE_DEFAULT_MARGIN;
  }

  changeUniqueId() {
    const newUniqueId = createUniqueId();
    this.data.id = newUniqueId;

    this.getInnerBlock().forEach((innerProp) => {
      const block = this.data[innerProp];
      if (block instanceof BlockCommon) {
        block.changeUniqueId();
      }
    });

    this.getChildBlock().forEach((childProp) => {
      const block = this.data[childProp];
      if (Array.isArray(block)) {
        block.forEach((child) => {
          child.changeUniqueId();
        });
      }
    });
  }

  async wait(time: number, exceptionManager: Exception) {
    exceptionManager.stopTimer();

    await new Promise((resolve) => {
      let timeoutId = setTimeout(resolve, time * 1000);
      let startTime = Date.now();
      let remainingTime: number = time * 1000;

      const onProgramStateChange = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail === 'stop') {
          clearTimeout(timeoutId);
          document.removeEventListener('ProgramStateChange', onProgramStateChange);
          resolve('');
        } else if (customEvent.detail === 'pause') {
          const endTime = Date.now();
          remainingTime = remainingTime - (endTime - startTime);
          clearTimeout(timeoutId);
        } else if (customEvent.detail === 'run') {
          startTime = Date.now();
          timeoutId = setTimeout(resolve, remainingTime);
        }
      };

      document.addEventListener('ProgramStateChange', onProgramStateChange);
    });

    exceptionManager.stopTimer();
  }

  async preprocessingRun(
    getProgramState: () => 'run' | 'stop' | 'pause',
    exceptionManager: Exception,
    debugManager: Debug,
  ): Promise<boolean> {
    if (getProgramState() === 'stop' || exceptionManager.isError) {
      return false;
    }

    const time = debugManager.time;

    if (time > 0) {
      const div = document.getElementById(this.data.id);
      div?.classList.add('is-highlight-run');
      await this.wait(time, exceptionManager);
      div?.classList.remove('is-highlight-run');
    }

    return true;
  }
}
