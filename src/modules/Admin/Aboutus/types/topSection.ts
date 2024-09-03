export interface ITopSection {
  heading: string;
  description: string;
  greenButton: string;
  cards: {
    icon: FileList | "";
    title: string;
    description: string;
  }[];
}
