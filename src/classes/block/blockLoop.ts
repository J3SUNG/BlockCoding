import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockLoop extends BlockCommon {
  name = 'loop';
  type = 'control';
  defaultWidth = 250;
  defaultHeight = 150;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }

  setChildPosition(index: number) {
    const { prefixSum } = this.calcHeight();
    return { childX: 0, childY: prefixSum?.[index] ?? 0 };
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--control` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '반복문' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const childSpace = createElementCommon('span', { id: 'child', className: 'block__child' });
    const { childHeight } = this.calcHeight();

    space1.setAttribute('style', `margin-top: 5px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${childHeight}px;`);
    p.setAttribute('style', `padding-top: 12px`);
    childSpace.setAttribute('style', `height: ${childHeight - 100}px;`);
    div.appendChild(p);
    div.appendChild(space1);
    div.appendChild(childSpace);

    return { block: div, space: [space1, childSpace] };
  }

  insert(obj: BlockObject, insertType?: string) {
    if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
      if (insertType === 'space1') {
        if (this.data.condition && Object.keys(this.data.condition).length === 0) {
          this.data.condition = obj;
          return true;
        }
      }
    } else if (obj.type === 'general' || obj.type === 'control') {
      if (Array.isArray(this.data.value)) {
        this.data.value.push(obj);
        return true;
      }
    }

    return false;
  }

  getInnerBlock(): string[] {
    return ['condition'];
  }

  getChildBlock(): string[] {
    return ['value'];
  }

  calcHeight(): { childHeight: number; prefixSum?: number[] } {
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

    return { childHeight: height + 100 > 150 ? height + 100 : 150, prefixSum };
  }
}
