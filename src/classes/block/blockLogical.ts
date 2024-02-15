import { BLOCK_DEFAULT_HEIGHT } from '../../constants/blockDefaultMap';
import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception/exception';
import { Debug } from './debug/debug';
import { BlockCommon } from './blockClassCommon';

export class BlockLogical extends BlockCommon {
  name = 'logical';
  type = 'expressionLogical';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = 'AND';
    this.data.secondValue = {} as BlockObject;
  }

  getElement(id: string, x: number, y: number, onChange: () => void, value: string) {
    const operator = ['AND', 'OR'];

    const div = createElementCommon('div', { id, className: `block block--expression-logical` });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const space2 = createElementCommon('span', { id: 'space2', className: 'block__space' });
    const operatorSelect = createElementCommon('select', { className: 'block__operator block__operator--logical' });
    const startTriangle = createElementCommon('span', { className: 'block__triangle block--expression-logical' });
    const endTriangle = createElementCommon('span', { className: 'block__triangle block--expression-logical' });

    operator.forEach((op) => {
      const option = createElementCommon('option', { value: op, textContent: op });
      if (op === this.data.operator) {
        option.setAttribute('selected', 'selected');
      }
      operatorSelect.appendChild(option);
    });

    operatorSelect.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const selectedValue: string = target.value;

      this.data.operator = selectedValue;
      onChange();
    });

    startTriangle.setAttribute(
      'style',
      `width: ${BLOCK_DEFAULT_HEIGHT[this.name]}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px; position: absolute; left: -${BLOCK_DEFAULT_HEIGHT[this.name]}px; clip-path: polygon(40% 50%, 101% -5%, 101% 105%);`,
    );
    endTriangle.setAttribute(
      'style',
      `width: ${BLOCK_DEFAULT_HEIGHT[this.name]}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px; position: absolute; right: -${BLOCK_DEFAULT_HEIGHT[this.name]}px; clip-path: polygon(-1% -5%, -1% 105%, 60% 50%);`,
    );

    div.setAttribute('style', `left: ${x + 10}px; top: ${y}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px;`);
    div.appendChild(startTriangle);
    div.appendChild(endTriangle);
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
    let result: boolean = false;

    if (value instanceof BlockCommon && secondValue instanceof BlockCommon) {
      const operand1 =
        (await value.runLogic(
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
      const operand2 =
        (await secondValue.runLogic(
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

      switch (this.data.operator) {
        case 'AND':
          result = operand1 && operand2;
          break;
        case 'OR':
          result = operand1 || operand2;
          break;
      }
    }

    return result + '';
  }

  getInnerBlock(): string[] {
    return ['value', 'secondValue'];
  }
}
