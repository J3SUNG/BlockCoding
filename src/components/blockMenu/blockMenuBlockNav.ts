import { BlockMenuBlockNavProps } from '../../types/blockMenu';
import { BLOCK_MAP } from '../../constants/blockMap';
import { BLOCK_OBJECT } from '../../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../../constants/blockTypeObject';
import { createElementCommon } from '../../utils/createElementCommon';
import { blockMenuBlockButton } from './blockMenuBlockButton';

export const blockMenuBlockNav = ({
  selectedType,
  setSelectedTypeBlock,
  selectedMenuBlock,
  setSelectedMenuBlock,
  setBlockList,
  blockList,
  uniqueId,
  setUniqueId,
}: BlockMenuBlockNavProps) => {
  const blockNav = createElementCommon('nav', { id: 'nav-block' });
  const ul = createElementCommon('ul', {});

  BLOCK_OBJECT.filter((block, index) => block.type === BLOCK_TYPE_OBJECT[selectedType].name).forEach((block, index) => {
    const li = blockMenuBlockButton({
      name: block.name,
      type: block.type,
      x: 20,
      y: index * 80 + 20,
    });

    li?.addEventListener('click', (e) => {
      setSelectedTypeBlock(index);
      const name = block.name;

      const blockIndex = BLOCK_MAP[name];
      if (selectedMenuBlock === blockIndex) {
        setSelectedMenuBlock(-1);
        setSelectedTypeBlock(-1);
        console.log(BLOCK_OBJECT[blockIndex]);

        const deepCopiedObj = JSON.parse(JSON.stringify(BLOCK_OBJECT[blockIndex]));
        deepCopiedObj.data.id = 'unique-id__' + uniqueId;
        setUniqueId(uniqueId + 1);

        setBlockList([...blockList, { ...deepCopiedObj }]);
      } else {
        setSelectedMenuBlock(blockIndex);
      }
    });
    ul.appendChild(li!);
  });

  blockNav.appendChild(ul);

  return blockNav;
};
