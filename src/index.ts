import './reset.css';
import './index.css';
import { gnb } from './components/gnb';
import { main } from './components/main';
import { blockMenu } from './components/blockMenu';
import { workspace } from './components/workspace';
import { consoleSpace } from './components/consoleSpace';

const rootElement = document.querySelector('#root') as HTMLElement;
rootElement.innerHTML = '';
rootElement.innerHTML = gnb() + main();

const mainElement = document.querySelector('#main') as HTMLElement;
mainElement.innerHTML = '';
mainElement.innerHTML = blockMenu() + workspace() + consoleSpace();

const arr = [
  {
    name: 'start',
    type: 'declare',
    data: {
      value: [],
    },
  },
  {
    name: 'start',
    type: 'declare',
    data: {
      value: [],
    },
  },
];

const newBlock = arr.map((block: any) => {
  return `<div class="block" id="${block.name}">hi</div>`;
});

const workspaceElement = document.querySelector('#workspace') as HTMLElement;
workspaceElement.innerHTML = '';
workspaceElement.innerHTML = newBlock.join('');
