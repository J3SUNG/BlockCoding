import { createElementCommon } from '../../utils/createElementCommon';

export const workspace = () => {
  const section = createElementCommon('section', { id: 'workspace' });
  const trashBin = createElementCommon('div', { id: 'trash-bin' });
  const trashIcon = createElementCommon('span', { className: 'material-symbols-outlined', textContent: 'delete' });

  trashBin.appendChild(trashIcon);
  section.appendChild(trashBin);

  return section;
};
