import './reset.css';
import './index.css';
import { gnb } from './components/gnb';
import { main } from './components/main';
import { blockMenu } from './components/blockMenu';
import { workspace } from './components/workspace';
import { consoleSpace } from './components/consoleSpace';
import { BLOCK_OBJECT } from './constants/blockObject';
import { BLOCK_MAP } from './constants/blockMap';

const rootElement = document.querySelector('#root') as HTMLElement;
rootElement.innerHTML = '';
rootElement.innerHTML = gnb() + main();

const mainElement = document.querySelector('#main') as HTMLElement;
mainElement.innerHTML = '';
mainElement.innerHTML = blockMenu() + workspace() + consoleSpace();

const condition = BLOCK_OBJECT[BLOCK_MAP.condition];
const logical = BLOCK_OBJECT[BLOCK_MAP.logical];

const arr = [
  {
    name: 'start',
    korName: '시작',
    type: 'declare',
    data: {
      value: [],
    },
  },
  condition,
  logical,
  {
    name: 'variable',
    korName: '변수',
    type: 'general',
    data: {
      varName: {},
      value: {},
    },
  },
];

const newBlock = arr.map((block: any) => {
  return `<div class="block" id="${block.type}">${block.korName}</div>`;
});

const workspaceElement = document.querySelector('#workspace') as HTMLElement;
workspaceElement.innerHTML = '';
workspaceElement.innerHTML = newBlock.join('');
