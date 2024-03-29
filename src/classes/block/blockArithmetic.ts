import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception';
import { Debug } from '../debug';
import { BlockCommon } from './blockClassCommon';

export class BlockArithmetic extends BlockCommon {
  name = 'arithmetic';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '+';
    this.data.secondValue = {} as BlockObject;
  }

  getElement(id: string, x: number, y: number, onChange: () => void, value?: string) {
    const operator = ['+', '-', 'x', '/', '%'];

    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const space2 = createElementCommon('span', { id: 'space2', className: 'block__space' });
    const operatorSelect = createElementCommon('select', { className: 'block__operator block__operator--value' });

    operator.forEach((op) => {
      const option = createElementCommon('option', { value: op, textContent: op });
      if (op === this.data.operator) {
        option.setAttribute('selected', 'selected');
      }
      operatorSelect.appendChild(option);
    });

    operatorSelect.addEventListener('change', (e: Event) => {
      if (!this.data.id) {
        return;
      }

      const target = e.target as HTMLSelectElement;
      const selectedValue: string = target.value;

      this.data.operator = selectedValue;
      onChange();
    });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${this.defaultHeight}px;`);
    div.appendChild(space1);
    div.appendChild(operatorSelect);
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
    let result: number = 0;

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
      const operand2 = await secondValue?.runLogic(
        variableMap,
        functionMap,
        prevLog,
        setChanageLog,
        getProgramState,
        exceptionManager,
        debugManager,
      );

      if (operand1 && operand2) {
        switch (this.data.operator) {
          case '+':
            result = Number(operand1) + Number(operand2);
            break;
          case '-':
            result = Number(operand1) - Number(operand2);
            break;
          case 'x':
            result = Number(operand1) * Number(operand2);
            break;
          case '/':
            result = Number(operand1) / Number(operand2);
            break;
          case '%':
            result = Number(operand1) % Number(operand2);
            break;
        }
      }
    }

    exceptionManager.isNan(result);
    exceptionManager.isInfinity(result);

    return result + '';
  }

  getInnerBlock(): string[] {
    return ['value', 'secondValue'];
  }

  getJsCode(defs: number): string {
    let jsCode = '';
    const value = this.data.value;
    const secondValue = this.data.secondValue;
    const operatorMap: { [key: string]: string } = {
      '+': '+',
      '-': '-',
      x: '*',
      '/': '/',
      '%': '%',
    };

    if (value instanceof BlockCommon && secondValue instanceof BlockCommon) {
      const operator = this.data.operator;

      if (operator) {
        jsCode = `(${value.getJsCode(defs)} ${operatorMap[operator]} ${secondValue.getJsCode(defs)})`;
      }
    }

    return jsCode;
  }
}
