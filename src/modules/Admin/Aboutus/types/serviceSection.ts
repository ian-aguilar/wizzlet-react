export type IServiceSection = {
  title: string;
  description: string;
  cards: {
    icon: FileList | "";
    title: string;
    description: string;
  }[];
};
