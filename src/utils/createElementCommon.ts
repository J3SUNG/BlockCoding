import { HtmlTagInputProperties, HtmlTagTextProperties } from '@/types/htmlTagProperties';

export const createElementCommon = (tagName: string, props: HtmlTagInputProperties | HtmlTagTextProperties) => {
  const element = document.createElement(tagName);

  for (const prop in props) {
    (element as any)[prop] = props[prop];
  }

  return element;
};
