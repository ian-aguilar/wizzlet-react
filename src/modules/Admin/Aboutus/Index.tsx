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

const Aboutus = () => {
  const methods = useForm<IAboutusForm>({ resolver: yupResolver(AboutusValidation) });

  const onSubmit: SubmitHandler<IAboutusForm> = async (values) => {
    console.log("Setting aboutus", values);
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
