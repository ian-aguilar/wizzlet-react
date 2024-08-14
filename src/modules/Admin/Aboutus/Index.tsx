// ** Packages **
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

// ** Section Components **
import TopSection from "./components/TopSection";
import VisionSection from "./components/VisionSection";
import MissionSection from "./components/MissionSection";
import ServiceSection from "./components/ServiceSection";

// ** Common Components **
import Button from "@/components/form-fields/components/Button";

// ** Types **
import { IAboutusForm } from "./types";

// ** Validations **
import { yupResolver } from "@hookform/resolvers/yup";
import { AboutusValidation } from "./validation-schema/aboutUsValidation";
import { useCreateAboutUsAPI } from "../services/cms.service";

const Aboutus = () => {
  const methods = useForm<IAboutusForm>({ resolver: yupResolver(AboutusValidation) });
  // const methods = useForm<IAboutusForm>();

  const { createAboutUsAPI } = useCreateAboutUsAPI();

  const onSubmit: SubmitHandler<IAboutusForm> = async (values) => {
    const data = new FormData();

    data.append("topSection[heading]", values["topSection"].heading);
    data.append("topSection[description]", values["topSection"].description);
    data.append("topSection[greenButton]", values["topSection"].greenButton);
    data.append("topSection[whiteButton]", values["topSection"].whiteButton);

    values.topSection.cards?.forEach((value, index) => {
      data.append(`topSection[cards][${index}][title]`, value.title);
      data.append(`topSection[cards][${index}][description]`, value.description);
      data.append(`topSection[cards][${index}][icon]`, value.icon[0]);
    });

    data.append("visionSection[title]", values["visionSection"].title);
    data.append("visionSection[description]", values["visionSection"].description);
    data.append("visionSection[greenButton]", values["visionSection"].greenButton);
    data.append("visionSection[image]", values["visionSection"]["image"][0]);

    data.append("missionSection[title]", values["missionSection"].title);
    data.append("missionSection[description]", values["missionSection"].description);
    data.append("missionSection[image]", values["missionSection"]["image"][0]);

    data.append("serviceSection[title]", values["serviceSection"].title);
    data.append("serviceSection[description]", values["serviceSection"].description);
    values.serviceSection.cards?.forEach((value, index) => {
      data.append(`serviceSection[cards][${index}][title]`, value.title);
      data.append(`serviceSection[cards][${index}][description]`, value.description);
      data.append(`serviceSection[cards][${index}][icon]`, value.icon[0]);
    });

    const response = await createAboutUsAPI(data);

    if (response?.data && !response?.error) {
      methods.reset({});
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Button btnName="Update" type="submit" />
        <TopSection />
        <VisionSection />
        <MissionSection />
        <ServiceSection />
      </form>
    </FormProvider>
  );
};

export default Aboutus;
