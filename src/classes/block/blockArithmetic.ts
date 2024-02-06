import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockArithmetic extends BlockCommon {
  name = 'arithmetic';
  type = 'expressionValue';
  defaultWidth = 100;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '+';
    this.data.secondValue = {} as BlockObject;
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value?: string,
    onChange?: (id: string, value: string, insertLocation: string) => void,
  ) {
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
      const target = e.target as HTMLSelectElement;
      const selectedValue: string = target.value;

      if (onChange) {
        onChange(id, selectedValue, 'operator');
      }
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

  runLogic(operand1: string, operand2: string): string {
    const numberOperand1 = Number(operand1);
    const numberOperand2 = Number(operand2);

    switch (this.data.operator) {
      case '+':
        return numberOperand1 + numberOperand2 + '';
      case '-':
        return numberOperand1 - numberOperand2 + '';
      case 'x':
        return numberOperand1 * numberOperand2 + '';
      case '/':
        return numberOperand1 / numberOperand2 + '';
      case '%':
        return (numberOperand1 % numberOperand2) + '';
    }

    return '';
  }

  getInnerBlock(): string[] {
    return ['value', 'secondValue'];
  }
}
