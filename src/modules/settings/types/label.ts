export interface IAddLabelInputs {
  label: string;
}

export interface Label {
  id: number;
  name: string;
}

export interface IUseLabelHeadersProps {
  onDelete: (row: Label) => void;
}

export interface IAddLabelProps {
  onClose: () => void;
  reload: () => void;
}
