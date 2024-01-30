import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockArithmetic extends BlockCommon {
  name = 'arithmetic';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = '+';
    this.data.secondValue = {} as BlockObject;
  }
  setChildPosition(x: number, y: number, index: number) {
    return { childX: 50 * index, childY: 0 };
  }

  paintBlock(
    id: string,
    x: number,
    y: number,
    value: string,
    onValueChange?: (id: string, value: string, insertLocation: string) => void,
  ) {
    const operator = ['+', '-', 'x', '/', '%'];

    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const space1 = createElementCommon('span', { className: 'block__space' });
    const space2 = createElementCommon('span', { className: 'block__space' });
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

      if (onValueChange) {
        onValueChange(id, selectedValue, 'operator');
      }
    });

    div.setAttribute('style', `left: ${x}px; top: ${y}px`);
    div.appendChild(space1);
    div.appendChild(operatorSelect);
    div.appendChild(space2);

    return div;
  }

  insertBlock(obj: BlockObject) {
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

  runBlockLogic(operand1: string, operand2: string): string {
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
}
