import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception/exception';
import { BlockCommon } from './blockClassCommon';
import { Debug } from '../debug/debug';

export class BlockLoop extends BlockCommon {
  name = 'loop';
  type = 'control';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.condition = {} as BlockObject;
  }

  setChildPosition(index: number) {
    const { prefixSum } = this.calcHeight();
    return { childX: 0, childY: prefixSum?.[index] ?? 0 };
  }

  getElement(id: string, x: number, y: number, onChange: () => void, value?: string) {
    const div = createElementCommon('div', { id, className: `block block--control` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '반복문' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const childSpace = createElementCommon('span', { id: 'child', className: 'block__child' });
    const { childHeight } = this.calcHeight();
    const toggle = createElementCommon('button', {
      className: 'block__toggle',
      textContent: `${this.fold ? '▶' : '▼'}`,
    });

    toggle.addEventListener('click', () => {
      if (!this.data.id) {
        return;
      }

      this.fold = !this.fold;
      onChange();

      const { childHeight } = this.calcHeight();
      div.style.height = childHeight + 'px';
      childSpace.style.height = childHeight - 100 + 'px';
    });

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
    variableMap: Map<string, string>,
    functionMap: Map<string, BlockCommon>,
    prevLog: () => { text: string; type: string }[],
    setChanageLog: (log: { text: string; type: string }[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    exceptionManager: Exception,
    debugManager: Debug,
  ): Promise<string> {
    const condition = this.data.condition;
    const value = this.data.value;
    let result: string = '';

    if (!(await this.preprocessingRun(getProgramState, exceptionManager, debugManager))) {
      return '';
    }
    if (condition instanceof BlockCommon) {
      let operand =
        (await condition.runLogic(
          variableMap,
          functionMap,
          prevLog,
          setChanageLog,
          getProgramState,
          exceptionManager,
          debugManager,
        )) === 'true'
          ? true
          : false;

      while (operand) {
        if (!(await this.preprocessingRun(getProgramState, exceptionManager, debugManager))) {
          return '';
        }

        exceptionManager.isInfinityLoop();
        await this.wait(0, exceptionManager);
        if (Array.isArray(value)) {
          for (const child of value) {
            if (child instanceof BlockCommon) {
              result = await child.runLogic(
                variableMap,
                functionMap,
                prevLog,
                setChanageLog,
                getProgramState,
                exceptionManager,
                debugManager,
              );
            }
          }
        }

        operand =
          (await condition.runLogic(
            variableMap,
            functionMap,
            prevLog,
            setChanageLog,
            getProgramState,
            exceptionManager,
            debugManager,
          )) === 'true'
            ? true
            : false;
      }
    }

    return result;
  }
}
