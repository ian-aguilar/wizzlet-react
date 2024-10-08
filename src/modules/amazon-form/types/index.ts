export interface ReferenceItem {
  type: string;
  name: string;
  title: string;
  required: boolean;
  option: Array<{ label: string; value: string }> | null;
  addMore: boolean;
  isMulti: boolean;
  items: ReferenceItem[];
}

export interface InputData {
  [key: string]: Array<{ [key: string]: any }>;
}

export interface OutputData {
  [key: string]: Array<{ [key: string]: any }>;
}

export interface AnyObject {
  [key: string]: any;
}
