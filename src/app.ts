import './reset.css';
import './index.css';
import { blockCoding } from './pages/blockCoding';

export const app = () => {
  const blockCodingPage = blockCoding();

  return blockCodingPage;
};
