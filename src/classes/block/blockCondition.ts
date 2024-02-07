import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockCondition extends BlockCommon {
  name = 'condition';
  type = 'control';
  defaultWidth = 150;
  defaultHeight = 150;
  childWidth = 100;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }

  setChildPosition(index: number) {
    const { prefixSum } = this.calcHeight();
    if (prefixSum) return { childX: 0, childY: prefixSum[index] };
    return { childX: 0, childY: 0 };
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onChange?: (id: string, value: string, insertLocation?: string) => void,
  ) {
    const div = createElementCommon('div', { id, className: `block block--control` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '조건문' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const childSpace = createElementCommon('span', { id: 'child', className: 'block__child' });
    const { childHeight } = this.calcHeight();
    const toggle = createElementCommon('button', {
      className: 'block__toggle',
      textContent: `${this.fold ? '▶' : '▼'}`,
    });

    toggle.addEventListener('click', () => {
      this.fold = !this.fold;
      if (onChange) {
        if (this.fold) {
          onChange(id, 'true', 'fold');
        } else {
          onChange(id, 'false', 'fold');
        }
      }

      const { childHeight } = this.calcHeight();
      div.style.height = childHeight + 'px';
      childSpace.style.height = childHeight - 100 + 'px';
    });

    space1.setAttribute('style', `margin-top: 5px;`);
    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${childHeight}px;`);
    p.setAttribute('style', `padding-top: 12px`);
    childSpace.setAttribute('style', `height: ${childHeight - 100}px; ${this.fold ? 'display: none' : ''}`);
    div.appendChild(toggle);
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

  async runLogic(
    blockObject: BlockCommon,
    variableMap: Map<string, string>,
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
  ): Promise<string> {
    if (getProgramState() === 'stop') {
      return '';
    }

    const condition = blockObject.data.condition;
    const value = blockObject.data.value;

    if (condition instanceof BlockCommon) {
      const operand1 = await condition.runLogic(condition, variableMap, prevLog, setChanageLog, getProgramState);
      if (operand1 === 'true') {
        if (Array.isArray(value)) {
          for (const child of value) {
            if (child instanceof BlockCommon) {
              await child.runLogic(child, variableMap, prevLog, setChanageLog, getProgramState);
            }
          }
        }
      }
    }

    return '';
  }
}
