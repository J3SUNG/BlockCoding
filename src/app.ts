import './reset.css';
import './index.css';
import { gnb } from './components/gnb/gnb';
import { main } from './components/main/main';

export const app = () => {
  const gnbComponent = gnb();
  const mainComponent = main();

  const fragment = document.createDocumentFragment();
  fragment.appendChild(gnbComponent);
  fragment.appendChild(mainComponent);

  return fragment;
};