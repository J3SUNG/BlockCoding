import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception';
import { Debug } from '../debug';
import { BlockCommon } from './blockClassCommon';
import { MILLISECONDS } from '../../constants/commonMap';

export class BlockTimer extends BlockCommon {
  name = 'timer';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '타이머' });
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

    exceptionManager.stopTimer();
    if (value instanceof BlockCommon) {
      const time = await value.runLogic(
        variableMap,
        functionMap,
        prevLog,
        setChanageLog,
        getProgramState,
        exceptionManager,
        debugManager,
      );

      if (debugManager.time > 0) {
        const div = document.getElementById(this.data.id);
        div?.classList.add('is-highlight-run');
        await this.wait(Number(time), exceptionManager);
        div?.classList.remove('is-highlight-run');
      } else {
        await this.wait(Number(time), exceptionManager);
      }
    }
    exceptionManager.startTimer();

    return '';
  }

  getJsCode(defs: number): string {
    let jsCode = '';

    if (this.data.value instanceof BlockCommon) {
      jsCode = `${this.getJsTab(defs)}await new Promise(resolve => setTimeout(resolve, ${Number(this.data.value.getJsCode(defs)) / MILLISECONDS}));\n`;
    }

    return jsCode;
  }
}
