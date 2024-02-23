import { BlockCommon } from '../classes/block/blockClassCommon';
import { createBlock } from './createBlock';
import { BlockObject } from '../types/blockObject';

export const restoreWorkspaceData = (block: BlockObject | BlockObject[]): BlockCommon | BlockCommon[] | null => {
  if (Array.isArray(block)) {
    return block.map((item) => restoreWorkspaceData(item) as BlockCommon);
  } else {
    const newBlock = createBlock(block.name, block.data.id, block.data.x, block.data.y);
    Object.assign(newBlock, block);

    [...newBlock.getInnerBlock(), ...newBlock.getChildBlock()].forEach((key) => {
      const innerBlock = newBlock.data[key];

      if (typeof innerBlock === 'object' && Object.keys(innerBlock).length > 0) {
        const newChildBlock = restoreWorkspaceData(innerBlock);

        if (newChildBlock) {
          newBlock.data[key] = newChildBlock;
        }
      }
    });

    return newBlock;
  }
};
