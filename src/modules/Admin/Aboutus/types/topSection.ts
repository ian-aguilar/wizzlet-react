export interface ITopSection {
  heading: string;
  description: string;
  greenButton: string;
  whiteButton: string;
  cards: {
    icon: FileList | "";
    title: string;
    description: string;
  }[];
}

export interface ITopSectionProps {
  topSection?: ITopSection;
}
