import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { InfinityLoop } from '../infinityLoop/infinityLoop';
import { createUniqueId } from '../../utils/createUniqueId';

export class BlockCommon implements BlockObject {
  name = '';
  type = '';
  defaultWidth = 100;
  width = 100;
  defaultSpaceWidth = 50;
  defaultSpaceMargin = 10;
  defaultHeight = 50;
  spaceWidth = [50, 50];
  childWidth? = 100;
  fold = false;
  data: BlockObject['data'];
  paramSize = 0;

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
        return { childHeight: 50 };
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
}
