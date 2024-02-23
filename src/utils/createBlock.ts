import { BlockArithmetic } from '../classes/block/blockArithmetic';
import { BlockCommon } from '../classes/block/blockClassCommon';
import { BlockComparison } from '../classes/block/blockComparison';
import { BlockCondition } from '../classes/block/blockCondition';
import { BlockDeubg } from '../classes/block/blockDebug';
import { BlockFunction } from '../classes/block/blockFunction';
import { BlockFunctionCall } from '../classes/block/blockFunctionCall';
import { BlockFunctionReturn } from '../classes/block/blockFunctionReturn';
import { BlockInput } from '../classes/block/blockInput';
import { BlockLogical } from '../classes/block/blockLogical';
import { BlockLoop } from '../classes/block/blockLoop';
import { BlockNegation } from '../classes/block/blockNegation';
import { BlockOutput } from '../classes/block/blockOutput';
import { BlockRandomNumber } from '../classes/block/blockRandomNumber';
import { BlockRefVariable } from '../classes/block/blockRefVariable';
import { BlockStart } from '../classes/block/blockStart';
import { BlockString } from '../classes/block/blockString';
import { BlockTimer } from '../classes/block/blockTimer';
import { BlockValue } from '../classes/block/blockValue';
import { BlockVariable } from '../classes/block/blockVariable';

interface BlockTypeMap {
  [key: string]: new (id: string, x: number, y: number) => BlockCommon;
}

const blockTypes: BlockTypeMap = {
  start: BlockStart,
  function: BlockFunction,
  functionCall: BlockFunctionCall,
  functionReturn: BlockFunctionReturn,
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
  debug: BlockDeubg,
};

export const createBlock = (name: string, id: string, x: number, y: number): BlockCommon => {
  const BlockClass = blockTypes[name];

  if (!BlockClass) {
    throw new Error(`createBlock - ${name} 없는 블럭`);
  }

  return new BlockClass(id, x, y);
};
