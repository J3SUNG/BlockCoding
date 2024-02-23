import { PARAM_MAX_SIZE, PARAM_MIN_SIZE } from '../../constants/blockDataMap';
import { BlockObject } from '../../types/blockObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { Exception } from '../exception';
import { Debug } from '../debug';
import { BlockCommon } from './blockClassCommon';

export class BlockFunctionCall extends BlockCommon {
  name = 'functionCall';
  type = 'general';

  constructor(id: string, x: number, y: number) {
    super(id, x, y, {} as BlockObject);
    this.data.param1 = {} as BlockObject;
    this.data.param2 = {} as BlockObject;
    this.data.param3 = {} as BlockObject;
    this.data.param4 = {} as BlockObject;
  }

  getElement(id: string, x: number, y: number, onChange: () => void, value?: string) {
    const div = createElementCommon('div', { id, className: `block block--general` });
    const p = createElementCommon('p', { className: 'block__text', textContent: '함수 호출' });
    const space1 = createElementCommon('span', { id: 'space1', className: 'block__space' });
    const paramSpan = createElementCommon('span', { className: 'block__param' });
    const addButton = createElementCommon('button', {
      className: 'block__param-button block__param-button--add',
      textContent: '+',
    });
    const removeButton = createElementCommon('button', {
      className: 'block__param-button block__param-button--remove',
      textContent: '-',
    });

    addButton.addEventListener('click', () => {
      if (!this.data.id) {
        return;
      }

      this.paramSize = this.paramSize + 1 > PARAM_MAX_SIZE ? PARAM_MAX_SIZE : this.paramSize + 1;
      onChange();
    });

    removeButton.addEventListener('click', () => {
      if (!this.data.id) {
        return;
      }

      this.paramSize = this.paramSize > PARAM_MIN_SIZE ? this.paramSize - 1 : PARAM_MIN_SIZE;
      for (let i = 1; i <= PARAM_MAX_SIZE; i++) {
        if (this.paramSize < i) {
          this.data[`param${i}`] = {} as BlockObject;
        }
      }
      onChange();
    });

    div.setAttribute('style', `left: ${x}px; top: ${y}px; height: ${this.defaultHeight}px;`);
    paramSpan.setAttribute('style', `justify-content: center;`);
    div.appendChild(p);
    div.appendChild(space1);
    let array = [];
    for (let i = 0; i < this.paramSize; i++) {
      const newSpace = createElementCommon('span', { id: `space${i + 2}`, className: 'block__space' });
      div.appendChild(newSpace);

      array.push(newSpace);
    }
    div.appendChild(paramSpan);
    paramSpan.appendChild(addButton);
    paramSpan.appendChild(removeButton);

    return { block: div, space: [space1, ...array] };
  }

  insert(obj: BlockObject, insertType?: string) {
    if (obj.type === 'expressionValue' || obj.type === 'expressionLogical') {
      if (insertType) {
        const index = Number(insertType.split('space')[1]);
        if (
          index === 1 &&
          this.data.value &&
          typeof this.data.value === 'object' &&
          Object.keys(this.data.value).length === 0
        ) {
          this.data.value = obj;
          return true;
        } else if (index >= 2 && index <= 5) {
          const propName = `param${index - 1}`;
          if (
            this.data[propName] &&
            typeof this.data[propName] === 'object' &&
            Object.keys(this.data[propName] ?? {}).length === 0
          ) {
            this.data[propName] = obj;
            return true;
          }
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
    const functionVariableMap = new Map();

    if (value instanceof BlockCommon) {
      const functionName = await value.runLogic(
        variableMap,
        functionMap,
        prevLog,
        setChanageLog,
        getProgramState,
        exceptionManager,
        debugManager,
      );

      const functionBlock = functionMap.get(functionName);
      if (functionBlock === undefined) {
        exceptionManager.isNullPointer();
        return '';
      } else {
        const paramSize = functionBlock.paramSize;

        if (typeof paramSize === 'number') {
          for (let i = 1; i <= paramSize; i++) {
            const argument = this.data[`param${i}`];
            if (argument instanceof BlockCommon) {
              const paramValue = await argument.runLogic(
                variableMap,
                functionMap,
                prevLog,
                setChanageLog,
                getProgramState,
                exceptionManager,
                debugManager,
              );

              const param = functionBlock.data[`param${i}`];
              if (param && param instanceof BlockCommon) {
                const paramName = await param.runLogic(
                  variableMap,
                  functionMap,
                  prevLog,
                  setChanageLog,
                  getProgramState,
                  exceptionManager,
                  debugManager,
                );

                functionVariableMap.set(paramName, paramValue);
              }
            }
          }
        }

        await functionBlock.runLogic(
          functionVariableMap,
          functionMap,
          prevLog,
          setChanageLog,
          getProgramState,
          exceptionManager,
          debugManager,
        );
      }
    }

    return '';
  }

  getInnerBlock(): string[] {
    let result = ['value'];
    for (let i = 1; i <= this.paramSize; i++) {
      result.push(`param${i}`);
    }
    result.push('return');

    return result;
  }

  getJsCode(defs: number): string {
    let jsCode = '';
    const value = this.data.value;

    if (value instanceof BlockCommon) {
      jsCode = `${this.getJsTab(defs)}await ${this.removeQuarters(value.getJsCode(defs))}(`;
    }

    for (let i = 0; i < this.paramSize; i++) {
      const propName = `param${i + 1}`;
      const paramBlock = this.data[propName];

      if (paramBlock && paramBlock instanceof BlockCommon) {
        jsCode += paramBlock.getJsCode(defs);
      }

      jsCode += i !== this.paramSize - 1 ? ', ' : '';
    }
    jsCode += ');\n';

    return jsCode;
  }
}
