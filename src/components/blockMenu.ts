import { BLOCK_OBJECT } from '../constants/blockObject';
import { BLOCK_TYPE_OBJECT } from '../constants/blockTypeObject';

export const blockMenu = () => {
  const selectedType = 0;
  return `
  <div id="block-menu">
    <nav>
      ${BLOCK_TYPE_OBJECT.map((blockType) => {
        console.log(blockType);
        return `<button type="button" class="bg-lightgray">${blockType.korName}</button>`;
      }).join('')}
    </nav>
    <nav>
      ${BLOCK_OBJECT.filter((block) => block.type === BLOCK_TYPE_OBJECT[selectedType].name)
        .map((block) => {
          return `<button type="button" class="bg-yellow">${block.korName}</button>`;
        })
        .join('')}
    </nav>
  </div>
  `;
};
