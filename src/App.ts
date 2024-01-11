import './reset.css';
import './index.css';
import { gnb } from './components/gnb';
import { main } from './components/main';
import { createElementCommon } from './utils/createElementCommon';

export const App = () => {
  const gnbComponent = gnb();
  const mainComponent = main();

  const div = createElementCommon('div', { id: 'root' });
  div.appendChild(gnbComponent);
  div.appendChild(mainComponent);

  return div;
};
