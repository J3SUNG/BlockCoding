import { createElementCommon } from '../../utils/createElementCommon';

interface BlockMenuTypeNavButtonProps {
  type: string;
  korName: string;
}

interface BlockTypePaintProps {
  korName: string;
}

export const blockMenuTypeNavButton = ({ type, korName }: BlockMenuTypeNavButtonProps) => {
  if (type === 'declare') {
    return blockTypeDeclare({ korName });
  } else if (type === 'general') {
    return blockTypeGeneral({ korName });
  } else if (type === 'control') {
    return blockTypeControl({ korName });
  } else if (type === 'expressionValue') {
    return blockTypeExpressionValue({ korName });
  } else if (type === 'expressionLogical') {
    return blockTypeExpressionLogical({ korName });
  } else {
    throw new Error('타입메뉴 버튼 생성 오류 : 정의 되지 않은 타입입니다.');
  }
};

const blockTypeDeclare = ({ korName }: BlockTypePaintProps) => {
  const li = createElementCommon('li', { className: 'nav-type__button nav-type__button--declare' });
  const div = createElementCommon('div', { className: 'block' });
  const p = createElementCommon('p', { className: 'nav-type__button-text', textContent: korName });

  div.appendChild(p);
  li.appendChild(div);

  return li;
};

const blockTypeGeneral = ({ korName }: BlockTypePaintProps) => {
  const li = createElementCommon('li', { className: 'nav-type__button nav-type__button--general' });
  const div = createElementCommon('div', { className: 'block' });
  const p = createElementCommon('p', { className: 'nav-type__button-text', textContent: korName });

  div.appendChild(p);
  li.appendChild(div);

  return li;
};

const blockTypeControl = ({ korName }: BlockTypePaintProps) => {
  const li = createElementCommon('li', { className: 'nav-type__button nav-type__button--control' });
  const div = createElementCommon('div', { className: 'block' });
  const p = createElementCommon('p', { className: 'nav-type__button-text', textContent: korName });

  div.appendChild(p);
  li.appendChild(div);

  return li;
};

const blockTypeExpressionValue = ({ korName }: BlockTypePaintProps) => {
  const li = createElementCommon('li', { className: 'nav-type__button nav-type__button--expression-value' });
  const div = createElementCommon('div', { className: 'block' });
  const p = createElementCommon('p', { className: 'nav-type__button-text', textContent: korName });

  div.appendChild(p);
  li.appendChild(div);

  return li;
};

const blockTypeExpressionLogical = ({ korName }: BlockTypePaintProps) => {
  const li = createElementCommon('li', { className: 'nav-type__button nav-type__button--expression-logical' });
  const div = createElementCommon('div', { className: 'block' });
  const p = createElementCommon('p', { className: 'nav-type__button-text', textContent: korName });

  div.appendChild(p);
  li.appendChild(div);

  return li;
};
