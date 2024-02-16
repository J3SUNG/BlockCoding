import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { InfinityLoop } from '../infinityLoop/infinityLoop';
import { BlockCommon } from './blockClassCommon';

export class BlockOutput extends BlockCommon {
  name = 'output';
  type = 'general';
  defaultWidth = 90;
  defaultHeight = 50;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '출력' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${this.defaultHeight}px;`);
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
    blockObject: BlockCommon,
    variableMap: Map<string, string>,
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    timeManager: InfinityLoop,
  ): Promise<string> {
    if (getProgramState() === 'stop') {
      return '';
    }

    const value = blockObject.data.value;

    if (value instanceof BlockCommon) {
      const result: string = await value.runLogic(
        value,
        variableMap,
        prevLog,
        setChanageLog,
        getProgramState,
        timeManager,
      );

      setChanageLog([...prevLog(), result]);
    }

    return '';
  }
}
