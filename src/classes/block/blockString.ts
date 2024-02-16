import { BLOCK_DEFAULT_HEIGHT } from '../../constants/blockDefaultMap';
import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception/exception';
import { Debug } from './debug/debug';
import { BlockCommon } from './blockClassCommon';

export class BlockString extends BlockCommon {
  name = 'string';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.secondValue = {} as BlockObject;
  }

  getElement(id: string, x: number, y: number, onChange: () => void, value: string) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '문자열' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const space2 = createElementCommon('span', { id: 'space2', className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px;`);
    div.appendChild(p);
    div.appendChild(space1);
    div.appendChild(space2);

    return { block: div, space: [space1, space2] };
  }

  insert(obj: BlockObject, insertType?: string) {
    if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
      if (insertType === 'space1') {
        if (Object.keys(this.data.value).length === 0) {
          this.data.value = obj;
          return true;
        }
      } else if (insertType === 'space2') {
        if (this.data.secondValue && Object.keys(this.data.secondValue).length === 0) {
          this.data.secondValue = obj;
          return true;
        }
      }
    }

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
    if (!(await this.preprocessingRun(getProgramState, exceptionManager, debugManager))) {
      return '';
    }

    const value = this.data.value;
    const secondValue = this.data.secondValue;
    let result: string = '';

    if (value instanceof BlockCommon && secondValue instanceof BlockCommon) {
      const operand1 = await value.runLogic(
        variableMap,
        functionMap,
        prevLog,
        setChanageLog,
        getProgramState,
        exceptionManager,
        debugManager,
      );
      const operand2 = await secondValue.runLogic(
        variableMap,
        functionMap,
        prevLog,
        setChanageLog,
        getProgramState,
        exceptionManager,
        debugManager,
      );

      result = operand1 + ' ' + operand2;
    }
    return result;
  }

  getInnerBlock(): string[] {
    return ['value', 'secondValue'];
  }

  getJsCode(defs: number): string {
    let jsCode = '';

    if (this.data.value instanceof BlockCommon && this.data.secondValue instanceof BlockCommon) {
      const value = this.data.value.getJsCode(defs);
      const secondValue = this.data.secondValue.getJsCode(defs);

      jsCode = value + ' + ' + secondValue;
    }

    return jsCode;
  }
}
