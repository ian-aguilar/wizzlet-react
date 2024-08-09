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
      data.append(`topSection[cards][${index}][${value.title}]`, value.title);
      data.append(`topSection[cards][${index}][${value.description}]`, value.description);
    });

    data.append("visionSection[title]", values["visionSection"].title);
    data.append("visionSection[description]", values["visionSection"].description);
    data.append("visionSection[greenButton]", values["visionSection"].greenButton);

    data.append("missionSection[title]", values["missionSection"].title);
    data.append("missionSection[description]", values["missionSection"].description);

    await createAboutUsAPI(data);
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
