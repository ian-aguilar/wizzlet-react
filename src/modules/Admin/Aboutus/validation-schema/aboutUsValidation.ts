import * as Yup from "yup";

import { TopSectionValidationSchema } from "./topSectionValidation";
import { VisionSectionValidationSchema } from "./visionSectionValidation";
import { MissionSectionValidationSchema } from "./missionSectionValidation";
import { ServiceSectionValidationSchema } from "./serviceSectionValidation";

export const AboutusValidation = Yup.object().shape({
  topSection: TopSectionValidationSchema,
  visionSection: VisionSectionValidationSchema,
  missionSection: MissionSectionValidationSchema,
  serviceSection: ServiceSectionValidationSchema,
});
