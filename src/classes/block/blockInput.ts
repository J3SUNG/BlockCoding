import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception';
import { Debug } from '../debug';
import { BlockCommon } from './blockClassCommon';

export class BlockInput extends BlockCommon {
  name = 'input';
  type = 'expressionValue';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
  }

  getElement(id: string, x: number, y: number) {
    const div = createElementCommon('div', { id, className: `block block--expression-value` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '입력 받기' });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${this.defaultHeight}px;`);
    div.appendChild(p);

    return { block: div, space: [] };
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

    setChanageLog([...prevLog(), { text: '[입력 해주세요.]', type: 'input' }]);

    exceptionManager.stopTimer();
    const waitInput = () => {
      return new Promise<string>((resolve) => {
        const onKeyDown = (e: KeyboardEvent) => {
          const input = document.querySelector('#console__input') as HTMLInputElement;
          if (e.key === 'Enter') {
            if (input.value !== '') {
              document.removeEventListener('keydown', onKeyDown);
              document.removeEventListener('ProgramStateChange', onProgramStateChange);
              setChanageLog([...prevLog(), { text: '[입력] ' + input.value, type: 'input' }]);
              resolve(input.value);
            } else {
              input.focus();
            }
          }
        };

        const onProgramStateChange = (e: Event) => {
          const customEvent = e as CustomEvent;

          if (customEvent.detail === 'stop') {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('ProgramStateChange', onProgramStateChange);
            resolve('');
          } else if (customEvent.detail === 'pause') {
            document.removeEventListener('keydown', onKeyDown);
          } else if (customEvent.detail === 'run') {
            document.addEventListener('keydown', onKeyDown);
          }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('ProgramStateChange', onProgramStateChange);
      });
    };

    let result = '';
    if (debugManager.time > 0) {
      const div = document.getElementById(this.data.id);
      div?.classList.add('is-highlight-run');
      result = await waitInput();
      div?.classList.remove('is-highlight-run');
    } else {
      result = await waitInput();
    }

    exceptionManager.startTimer();

    return result;
  }

  getJsCode(defs: number): string {
    return `prompt('입력해주세요.')`;
  }
}
