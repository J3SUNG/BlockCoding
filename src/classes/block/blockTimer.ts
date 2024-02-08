import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { infinityLoop } from '../infinityLoop/infinityLoop';
import { BlockCommon } from './blockClassCommon';

export class BlockTimer extends BlockCommon {
  name = 'timer';
  type = 'general';
  defaultWidth = 100;
  defaultHeight = 50;

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
    blockObject: BlockCommon,
    variableMap: Map<string, string>,
    prevLog: () => string[],
    setChanageLog: (log: string[]) => void,
    getProgramState: () => 'run' | 'stop' | 'pause',
    timeManager: infinityLoop,
  ): Promise<string> {
    if (getProgramState() === 'stop') {
      return '';
    }

    const value = blockObject.data.value;

    timeManager.stopTimer();
    if (value instanceof BlockCommon) {
      const time = await value.runLogic(value, variableMap, prevLog, setChanageLog, getProgramState, timeManager);

      await new Promise((resolve) => {
        let timeoutId = setTimeout(resolve, Number(time) * 1000);
        let startTime = new Date().getTime();
        let remainingTime: number = Number(time) * 1000;

        const onProgramStateChange = (e: Event) => {
          const customEvent = e as CustomEvent;
          if (customEvent.detail === 'stop') {
            clearTimeout(timeoutId);
            document.removeEventListener('ProgramStateChange', onProgramStateChange);
            resolve('');
          } else if (customEvent.detail === 'pause') {
            const endTime = new Date().getTime();
            remainingTime = remainingTime - (endTime - startTime);
            clearTimeout(timeoutId);
          } else if (customEvent.detail === 'run') {
            startTime = new Date().getTime();
            timeoutId = setTimeout(resolve, remainingTime);
          }
        };

        document.addEventListener('ProgramStateChange', onProgramStateChange);
      });
    }
    timeManager.startTimer();

    return '';
  }
}
