import { BLOCK_DEFAULT_HEIGHT } from '../../constants/blockDefaultMap';
import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception/exception';
import { BlockCommon } from './blockClassCommon';

export class BlockOutput extends BlockCommon {
  name = 'output';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '출력' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${BLOCK_DEFAULT_HEIGHT[this.name]}px;`);
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
    prevLog: () => { text: string; type: string }[],
    setChanageLog: (log: { text: string; type: string }[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    exceptionManager: Exception,
  ): Promise<string> {
    const value = this.data.value;

    if (value instanceof BlockCommon) {
      const result: string = await value.runLogic(
        variableMap,
        functionMap,
        prevLog,
        setChanageLog,
        getProgramState,
        exceptionManager,
      );

      if (getProgramState() === 'stop' || exceptionManager.isError) {
        return '';
      }
      setChanageLog([...prevLog(), { text: result, type: 'output' }]);
    }

    return '';
  }
}
