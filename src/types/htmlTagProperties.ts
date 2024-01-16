export interface HtmlTagCommonProperties {
  [key: string]: any;
  id?: string;
  className?: string;
}

export interface HtmlTagTextProperties extends HtmlTagCommonProperties {
  textContent?: string;
}

export interface HtmlTagInputProperties extends HtmlTagCommonProperties {
  placeholder?: string;
  name?: string;
  type?: string;
}
