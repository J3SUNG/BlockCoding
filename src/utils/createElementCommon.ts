import { CreateElementCommonProps } from '../types/createElementCommonProps';

export const createElementCommon = (tagName: string, props: CreateElementCommonProps) => {
  const element = document.createElement(tagName);

  for (const prop in props) {
    (element as any)[prop] = props[prop];
  }

  return element;
};
