export interface IVisionSection {
  title: string;
  description: string;
  greenButton: string;
  // image: FileList | "";
  image: any;
}

export interface IVisionSectionProps {
  visionSection?: IVisionSection;
}
