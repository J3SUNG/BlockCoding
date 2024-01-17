import { app } from './app';
import { render } from './core/core';

const root = document.querySelector('#root') as HTMLElement;

render(app, root);
