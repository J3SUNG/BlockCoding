import { App } from './App';

const rootElement = document.querySelector('#root') as HTMLElement;
const appComponent = App();

rootElement.innerHTML = '';
rootElement.innerHTML = appComponent;
