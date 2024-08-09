import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TopSection from "./components/TopSection";
import { IAboutusForm } from "./types";
import VisionSection from "./components/VisionSection";
import MissionSection from "./components/MissionSection";
import ServiceSection from "./components/ServiceSection";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/form-fields/components/Button";
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
