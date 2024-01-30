import './styles/reset.css';
import './styles/index.css';
import { blockCoding } from './pages/blockCoding';

const root = document.querySelector('#root') as HTMLElement;
root.appendChild(blockCoding());
