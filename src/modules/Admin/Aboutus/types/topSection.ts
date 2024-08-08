export interface ITopSection {
  heading: string;
  description: string;
  greenButton: string;
  whiteButton: string;
  cards?: {
    icon: string;
    title: string;
    description: string;
  }[];
}
