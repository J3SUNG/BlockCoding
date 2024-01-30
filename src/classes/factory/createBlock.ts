import { BlockArithmetic } from '../block/blockArithmetic';
import { BlockComparison } from '../block/blockComparison';
import { BlockCondition } from '../block/blockCondition';
import { BlockInput } from '../block/blockInput';
import { BlockLogical } from '../block/blockLogical';
import { BlockLoop } from '../block/blockLoop';
import { BlockNegation } from '../block/blockNegation';
import { BlockOutput } from '../block/blockOutput';
import { BlockRefVariable } from '../block/blockRefVariable';
import { BlockStart } from '../block/blockStart';
import { BlockTimer } from '../block/blockTimer';
import { BlockValue } from '../block/blockValue';
import { BlockVariable } from '../block/blockVariable';

export const createBlock = (name: string, id: string, x: number, y: number) => {
  switch (name) {
    case 'start':
      return new BlockStart(id, x, y);
    case 'variable':
      return new BlockVariable(id, x, y);
    case 'output':
      return new BlockOutput(id, x, y);
    case 'timer':
      return new BlockTimer(id, x, y);
    case 'condition':
      return new BlockCondition(id, x, y);
    case 'loop':
      return new BlockLoop(id, x, y);
    case 'value':
      return new BlockValue(id, x, y);
    case 'input':
      return new BlockInput(id, x, y);
    case 'refVariable':
      return new BlockRefVariable(id, x, y);
    case 'arithmetic':
      return new BlockArithmetic(id, x, y);
    case 'comparison':
      return new BlockComparison(id, x, y);
    case 'negation':
      return new BlockNegation(id, x, y);
    case 'logical':
      return new BlockLogical(id, x, y);
    default:
      return new BlockStart(id, x, y);
  }
};
