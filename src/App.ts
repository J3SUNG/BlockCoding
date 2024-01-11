import './reset.css';
import './index.css';
import { gnb } from './components/gnb';
import { main } from './components/main';

const gnbComponent = gnb();
const mainComponent = main();

export const App = () => {
  return gnbComponent + mainComponent;
};
