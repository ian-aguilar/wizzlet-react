export enum validationEnum {
  Required = "required",
  Not = "not",
  Properties = "properties",
  AllOf = "allOf",
  Anyof = "anyOf",
  If = "if",
  Then = "then",
  Else = "else",
}

export interface ResType {
  success: boolean;
  path: string[];
  message?: string;
}
