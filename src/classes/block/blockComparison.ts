import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { BlockCommon } from './blockClassCommon';

export class BlockComparison extends BlockCommon {
  name = 'comparison';
  type = 'expressionLogical';
  defaultWidth = 100;
  defaultHeight = 40;

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

      if (onValueChange) {
        onValueChange(id, selectedValue, 'operator');
      }
    });

    space1.setAttribute('style', `width: ${this.spaceWidth[0]}px;`);
    space2.setAttribute('style', `width: ${this.spaceWidth[1]}px;`);
    startTriangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; left: -${this.defaultHeight}px; clip-path: polygon(40% 50%, 100% 0, 100% 100%);`,
    );
    endTriangle.setAttribute(
      'style',
      `width: ${this.defaultHeight}px; height: ${this.defaultHeight}px; position: absolute; right: -${this.defaultHeight}px; clip-path: polygon(0 0, 0 100%, 60% 50%);`,
    );

    div.setAttribute(
      'style',
      `left: ${x + 20}px; top: ${y}px; width: ${childWidth}px; height: ${this.defaultHeight}px;`,
    );
    div.appendChild(startTriangle);
    div.appendChild(endTriangle);
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

  getInnerBlock(): string[] {
    return ['value', 'secondValue'];
  }
}
