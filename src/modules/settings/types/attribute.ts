export interface Attributes {
  id: number;
  name: string;
  options:  {
    value: string;
  }[];
}
export interface IAddAttributeInputs {
  name?: string;
  values?: {
    value: string;
  }[];
}
export interface IAddAttributeProps {
  onClose: () => void;
  reload: () => void;
}

export interface IUseAttributeHeadersProps {
  onDelete: (row: Attributes) => void;
}
