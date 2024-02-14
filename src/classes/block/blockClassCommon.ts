import {
  BLOCK_DEFAULT_HEIGHT,
  BLOCK_DEFAULT_WIDTH,
  BLOCK_SPACE_DEFAULT_MARGIN,
  BLOCK_SPACE_DEFAULT_WIDTH,
} from '../../constants/blockDefaultMap';
import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { InfinityLoop } from '../infinityLoop/infinityLoop';

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
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    timeManager: InfinityLoop,
  ): Promise<string> {
    return '';
  }

  calcWidth() {
    let addWidth = 0;
    this.width = BLOCK_DEFAULT_WIDTH[this.name];
    this.getInnerBlock().forEach((innerProp, index) => {
      const block = this.data[innerProp];
      if (typeof block === 'object' && Object.keys(block).length === 0) {
        this.spaceWidth[index] = BLOCK_SPACE_DEFAULT_WIDTH;
        addWidth += BLOCK_SPACE_DEFAULT_WIDTH + BLOCK_SPACE_DEFAULT_MARGIN;
      } else if (block instanceof BlockCommon) {
        this.spaceWidth[index] = block.calcWidth();
        addWidth += this.spaceWidth[index] + BLOCK_SPACE_DEFAULT_MARGIN;
      }
    });

    this.width = BLOCK_DEFAULT_WIDTH[this.name] + addWidth;
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

    if (this.getChildBlock().length > 0) {
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
    }

    return this.width;
  }

  calcHeight(): { childHeight: number; prefixSum?: number[] } {
    if (this.getChildBlock().length > 0) {
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
    } else {
      return { childHeight: BLOCK_DEFAULT_HEIGHT[this.name] };
    }
  }

  getInnerBlock(): string[] {
    return ['value'];
  }

  getChildBlock(): string[] {
    return [];
  }
}
