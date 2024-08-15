export interface IMissionSection {
  title: string;
  description: string;
  image: FileList | "";
}

export interface IMissionSectionProps {
  missionSection?: IMissionSection;
}
