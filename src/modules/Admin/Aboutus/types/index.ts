import { IMissionSection } from "./missionSection";
import { IServiceSection } from "./serviceSection";
import { ITopSection } from "./topSection";
import { IVisionSection } from "./visionSection";

export interface IAboutusForm {
  topSection: ITopSection;
  visionSection: IVisionSection;
  missionSection: IMissionSection;
  serviceSection: IServiceSection;
}
