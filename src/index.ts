import './reset.css';
import './index.css';
import { gnb } from './components/gnb';
import { main } from './components/main';
import { blockMenu } from './components/blockMenu';
import { workspace } from './components/workspace';
import { console } from './components/console';

const rootElement = document.querySelector('#root') as HTMLElement;
rootElement.innerHTML = '';
rootElement.innerHTML = gnb() + main();

const mainElement = document.querySelector('#main') as HTMLElement;
mainElement.innerHTML = '';
mainElement.innerHTML = blockMenu() + workspace() + console();
