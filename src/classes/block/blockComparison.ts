import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockComparison extends BlockCommon {
  name = 'comparison';
  type = 'expressionLogical';
  defaultWidth = 100;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '=';
    this.data.secondValue = {} as BlockObject;
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value: string,
    onValueChange?: (id: string, value: string, insertLocation: string) => void,
  ) {
    const operator = ['=', '!=', '>', '<', '>=', '<='];

    const div = createElementCommon('div', { id, className: `block block--expression-logical` });
    const space1 = createElementCommon('span', { className: 'block__space' });
    const space2 = createElementCommon('span', { className: 'block__space' });
    const operatorSelect = createElementCommon('select', { className: 'block__operator block__operator--logical' });
    const childWidth = this.calcWidth();

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

      if (onValueChange) {
        onValueChange(id, selectedValue, 'operator');
      }
    });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; width: ${childWidth}px;`);
    div.appendChild(space1);
    div.appendChild(operatorSelect);
    div.appendChild(space2);

    return { block: div, space: [space1, space2] };
  }

  insert(obj: BlockObject) {
    if (Object.keys(this.data.value).length === 0) {
      if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        this.data.value = obj;
      }
    } else if (this.data.secondValue && Object.keys(this.data.secondValue).length === 0) {
      if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
        this.data.secondValue = obj;
      }
    }
  }

  getInnerBlock(): BlockObjectValue[] {
    return [this.data.value, this.data.secondValue!];
  }

  runLogic(operand1: string, operand2: string): boolean {
    switch (this.data.operator) {
      case '=':
        return operand1 === operand2;
      case '!=':
        return operand1 != operand2;
      case '>':
        return Number(operand1) > Number(operand2);
      case '<':
        return Number(operand1) < Number(operand2);
      case '>=':
        return Number(operand1) >= Number(operand2);
      case '<=':
        return Number(operand1) <= Number(operand2);
    }

    throw new Error('blockComparison - runLogic - 예상치 못한 연산자');
  }
}
