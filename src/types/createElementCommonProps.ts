import { ClassName, Id, Name, Placeholder, TextContent, Type } from './htmlTagType';

export interface CreateElementCommonProps {
  [key: string]: any;
  id?: Id;
  className?: ClassName;
  textContent?: TextContent;
  placeholder?: Placeholder;
  name?: Name;
  type?: Type;
}
