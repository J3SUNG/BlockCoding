import { BLOCK_MAP } from '../../constants/blockMap';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { BlockMenuBlockNavProps } from '../../types/blockMenuBlockNavProps';
import { createElementCommon } from '../../utils/createElementCommon';

export const blockMenuBlockNav = ({
  selectedType,
  selectedTypeBlock,
  setSelectedTypeBlock,
  selectedBlock,
  setSelectedBlock,
  setBlockList,
  blockList,
}: BlockMenuBlockNavProps) => {
  const BlockNav = createElementCommon('nav', {});

  BLOCK_OBJECT.filter((block) => block.type === BLOCK_TYPE_OBJECT[selectedType].name).forEach((block, index) => {
    const button = createElementCommon('button', {
      name: block.name,
      textContent: block.korName,
      className: `${selectedTypeBlock === index ? 'bg-yellow' : 'bg-lightgray'}`,
    });

    button.onclick = (e) => {
      setSelectedTypeBlock(index);
      const name = (e.target as HTMLButtonElement).name;
      const blockIndex = BLOCK_MAP[name];

      if (selectedBlock === blockIndex) {
        setSelectedBlock(-1);
        setSelectedTypeBlock(-1);
        setBlockList([...blockList, { ...BLOCK_OBJECT[blockIndex] }]);
      } else {
        setSelectedBlock(blockIndex);
      }
    };
    BlockNav.appendChild(button);
  });

  return BlockNav;
};
