import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { InfinityLoop } from '../infinityLoop/infinityLoop';
import { BlockCommon } from './blockClassCommon';

export class BlockNegation extends BlockCommon {
  name = 'negation';
  type = 'expressionLogical';
  defaultWidth = 120;
  defaultHeight = 40;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-logical` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '논리 부정' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const startTriangle = createElementCommon('span', { className: 'block__triangle block--expression-logical' });
    const endTriangle = createElementCommon('span', { className: 'block__triangle block--expression-logical' });

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
    div.appendChild(p);
    div.appendChild(space1);

    return { block: div, space: [space1] };
  }

  insert(obj: BlockObject, insertType?: string) {
    if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
      if (insertType === 'space1') {
        if (Object.keys(this.data.value).length === 0) {
          this.data.value = obj;
          return true;
        }
      }
    }

    return false;
  }

  async runLogic(
    variableMap: Map<string, string>,
    functionMap: Map<string, BlockCommon>,
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    timeManager: InfinityLoop,
  ): Promise<string> {
    if (getProgramState() === 'stop') {
      return '';
    }

    const value = this.data.value;
    let result: boolean = false;

    if (value instanceof BlockCommon) {
      const operand1 =
        (await value.runLogic(variableMap, functionMap, prevLog, setChanageLog, getProgramState, timeManager)) ===
        'true'
          ? true
          : false;

      result = !operand1;
    }

    return result + '';
  }
}
