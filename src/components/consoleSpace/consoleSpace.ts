import { ConsoleLog } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

interface ConsoleSpaceProps {
  consoleLog: ConsoleLog;
}

export const consoleSpace = ({ consoleLog }: ConsoleSpaceProps) => {
  const div = createElementCommon('div', { id: 'console' });
  const h1 = createElementCommon('h1', { textContent: 'Output' });
  const outputDiv = createElementCommon('div', {});

  consoleLog.forEach((item) => {
    const p = createElementCommon('p', { textContent: item.text });

    if (item.type === 'output') {
      p.style.color = 'white';
    } else if (item.type === 'input') {
      p.style.color = 'aqua';
    } else if (item.type === 'system') {
      p.style.color = 'lime';
    } else if (item.type === 'error') {
      p.style.color = 'yellow';
    }
    outputDiv.appendChild(p);
  });

  const input = createElementCommon('input', {
    id: 'console__input',
    type: 'text',
    name: 'input',
    placeholder: '입력해 주세요.',
  });

  div.appendChild(h1);
  div.appendChild(outputDiv);
  div.appendChild(input);

  return div;
};
