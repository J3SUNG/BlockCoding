import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockLogical extends BlockCommon {
  name = 'logical';
  type = 'expressionLogical';
  defaultWidth = 100;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, []);
    this.data.operator = 'AND';
    this.data.secondValue = {} as BlockObject;
  }

  getElement(
    id: string,
    x: number,
    y: number,
    value: string,
    onChange?: (id: string, value: string, insertLocation: string) => void,
  ) {
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

      if (onChange) {
        onChange(id, selectedValue, 'operator');
      }
    });

    startTriangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; left: -${this.defaultHeight}px; clip-path: polygon(40% 50%, 101% -5%, 101% 105%);`,
    );
    endTriangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; right: -${this.defaultHeight}px; clip-path: polygon(-1% -5%, -1% 105%, 60% 50%);`,
    );

    div.setAttribute('style', `left: ${x + 10}px; top: ${y}px; height: ${this.defaultHeight}px;`);
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

  runLogic(operand1: string, operand2: string): boolean {
    const booleanOperand1 = operand1 === 'true' ? true : false;
    const booleanOperand2 = operand2 === 'true' ? true : false;
    switch (this.data.operator) {
      case 'AND':
        return booleanOperand1 && booleanOperand2;
      case 'OR':
        return booleanOperand1 || booleanOperand2;
      default:
        throw new Error('blockLogical - runLogic - 예상치 못한 연산자');
    }
  }

  getInnerBlock(): string[] {
    return ['value', 'secondValue'];
  }
}
