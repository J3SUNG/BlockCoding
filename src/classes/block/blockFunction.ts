import { PARAM_MAX_SIZE, PARAM_MIN_SIZE } from '../../constants/blockDataMap';
import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception/exception';
import { BlockCommon } from './blockClassCommon';

export class BlockFunction extends BlockCommon {
  name = 'function';
  type = 'declare';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.param1 = {} as BlockCommon;
    this.data.param2 = {} as BlockCommon;
    this.data.param3 = {} as BlockCommon;
    this.data.param4 = {} as BlockCommon;
    this.data.child = [];
    this.data.return = {} as BlockCommon;
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
    const div = createElementCommon('div', { id, className: `block block--declare` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '함수 선언' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const childSpace = createElementCommon('span', { id: 'child', className: 'block__child' });
    const { childHeight } = this.calcHeight();
    const toggle = createElementCommon('button', {
      className: 'block__toggle',
      textContent: `${this.fold ? '▶' : '▼'}`,
    });
    const paramSpan = createElementCommon('span', { className: 'block__param' });
    const addButton = createElementCommon('button', {
      className: 'block__param-button block__param-button--add',
      textContent: '+',
    });
    const removeButton = createElementCommon('button', {
      className: 'block__param-button block__param-button--remove',
      textContent: '-',
    });
    const returnP = createElementCommon('p', { className: 'block__return-text', textContent: '반환값' });
    const returnSpace = createElementCommon('span', { id: 'return', className: 'block__space block__return-space' });

    toggle.addEventListener('click', () => {
      if (!this.data.id) {
        return;
      }

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

    addButton.addEventListener('click', () => {
      if (onChange) {
        this.paramSize = this.paramSize + 1 > PARAM_MAX_SIZE ? PARAM_MAX_SIZE : this.paramSize + 1;
        onChange(id, this.paramSize + '', 'param');
      }
    });

    removeButton.addEventListener('click', () => {
      if (onChange) {
        this.paramSize = this.paramSize > PARAM_MIN_SIZE ? this.paramSize - 1 : PARAM_MIN_SIZE;
        onChange(id, this.paramSize + '', 'param');
      }
    });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: 250px; height: ${childHeight}px; align-items: start`);
    p.setAttribute('style', `padding-top: 12px`);
    childSpace.setAttribute(
      'style',
      `height: ${childHeight - 100}px; width: 202px; ${this.fold ? 'display: none' : ''}`,
    );
    div.appendChild(toggle);
    div.appendChild(p);
    div.appendChild(space1);
    let array = [];
    for (let i = 0; i < this.paramSize; i++) {
      const newSpace = createElementCommon('span', { id: `space${i + 2}`, className: 'block__space' });
      div.appendChild(newSpace);

      array.push(newSpace);
    }
    div.appendChild(paramSpan);
    paramSpan.appendChild(addButton);
    paramSpan.appendChild(removeButton);
    div.appendChild(childSpace);
    div.appendChild(returnP);
    div.appendChild(returnSpace);

    return { block: div, space: [space1, ...array, returnSpace, childSpace] };
  }

  insert(obj: BlockObject, insertType?: string) {
    if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
      if (insertType) {
        if (insertType === 'return') {
          if (this.data.return && typeof this.data.return === 'object' && Object.keys(this.data.return).length === 0) {
            this.data.return = obj;
            return true;
          }
        } else {
          const index = Number(insertType.split('space')[1]);
          if (
            index === 1 &&
            this.data.value &&
            typeof this.data.value === 'object' &&
            Object.keys(this.data.value).length === 0
          ) {
            this.data.value = obj;
            return true;
          } else if (index >= 2 && index <= 5) {
            const propName = `param${index - 1}`;
            if (
              this.data[propName] &&
              typeof this.data[propName] === 'object' &&
              Object.keys(this.data[propName] ?? {}).length === 0
            ) {
              this.data[propName] = obj;
              return true;
            }
          }
        }
      }
    } else if (obj.type === 'general' || obj.type === 'control') {
      if (Array.isArray(this.data.child)) {
        this.data.child.push(obj);
        return true;
      }
    }

    return false;
  }

  getInnerBlock(): string[] {
    let result = ['value'];
    for (let i = 1; i <= this.paramSize; i++) {
      result.push(`param${i}`);
    }
    result.push('return');

    return result;
  }

  getChildBlock(): string[] {
    return ['child'];
  }

  async runLogic(
    variableMap: Map<string, string>,
    functionMap: Map<string, BlockCommon>,
    prevLog: () => { text: string; type: string }[],
    setChanageLog: (log: { text: string; type: string }[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    exceptionManager: Exception,
  ): Promise<string> {
    let result: string = '';

    exceptionManager.isInfinityLoop();
    if (getProgramState() === 'stop' || exceptionManager.isError) {
      return '';
    }

    for (let i = 0; i < this.paramSize; ++i) {
      const param = this.data[`param${i + 1}`];
      if (param && param instanceof BlockCommon) {
        const paramResult = await param.runLogic(
          variableMap,
          functionMap,
          prevLog,
          setChanageLog,
          getProgramState,
          exceptionManager,
        );
        variableMap.set(`param${i + 1}`, paramResult);
      }
    }

    const child = this.data.child;
    if (Array.isArray(child)) {
      for (const childBlock of child) {
        if (childBlock instanceof BlockCommon) {
          await childBlock.runLogic(
            variableMap,
            functionMap,
            prevLog,
            setChanageLog,
            getProgramState,
            exceptionManager,
          );
        }
      }
    }

    if (this.data.return instanceof BlockCommon) {
      const returnResult = await this.data.return.runLogic(
        variableMap,
        functionMap,
        prevLog,
        setChanageLog,
        getProgramState,
        exceptionManager,
      );
      result = returnResult;

      return result;
    }

    return result;
  }
}
