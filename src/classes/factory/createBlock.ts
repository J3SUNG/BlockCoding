import { BlockObject } from '../../types/blockObject';
import { BlockArithmetic } from '../block/blockArithmetic';
import { BlockComparison } from '../block/blockComparison';
import { BlockCondition } from '../block/blockCondition';
import { BlockInput } from '../block/blockInput';
import { BlockLogical } from '../block/blockLogical';
import { BlockLoop } from '../block/blockLoop';
import { BlockNegation } from '../block/blockNegation';
import { BlockOutput } from '../block/blockOutput';
import { BlockRandomNumber } from '../block/blockRandomNumber';
import { BlockRefVariable } from '../block/blockRefVariable';
import { BlockStart } from '../block/blockStart';
import { BlockString } from '../block/blockString';
import { BlockTimer } from '../block/blockTimer';
import { BlockValue } from '../block/blockValue';
import { BlockVariable } from '../block/blockVariable';

interface BlockTypeMap {
  [key: string]: new (id: string, x: number, y: number) => BlockObject;
}

const blockTypes: BlockTypeMap = {
  start: BlockStart,
  variable: BlockVariable,
  output: BlockOutput,
  timer: BlockTimer,
  condition: BlockCondition,
  loop: BlockLoop,
  value: BlockValue,
  input: BlockInput,
  refVariable: BlockRefVariable,
  arithmetic: BlockArithmetic,
  comparison: BlockComparison,
  negation: BlockNegation,
  logical: BlockLogical,
  string: BlockString,
  randomNumber: BlockRandomNumber,
};

export const createBlock = (name: string, id: string, x: number, y: number): BlockObject => {
  const BlockClass = blockTypes[name];

  if (!BlockClass) {
    throw new Error(`createBlock - ${name} 없는 블럭`);
  }

  return new BlockClass(id, x, y);
};
