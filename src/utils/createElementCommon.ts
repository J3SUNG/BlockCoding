import { HtmlTagInputProperties, HtmlTagTextProperties } from '@/types/htmlTagProperties';

export interface CreateElementCommonProps {
  id?: string;
  className?: string;
  textContent?: string;
  placeholder?: string;
  name?: string;
  type?: string;
}

export const createElementCommon = (tagName: string, props: HtmlTagInputProperties | HtmlTagTextProperties) => {
  const element = document.createElement(tagName);

  for (const prop in props) {
    (element as any)[prop] = props[prop];
  }

  return element;
};
