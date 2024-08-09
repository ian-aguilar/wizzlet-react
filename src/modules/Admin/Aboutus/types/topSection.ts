export interface ITopSection {
  heading: string;
  description: string;
  greenButton: string;
  whiteButton: string;
  cards?: {
    icon: Object;
    title: string;
    description: string;
  }[];
}
