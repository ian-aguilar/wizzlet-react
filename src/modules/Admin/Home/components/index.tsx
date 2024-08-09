// ** Packages **
import {FormProvider, useForm} from "react-hook-form";

// ** common components **
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import MiddleSection from "./MiddleSection";
import Button from "@/components/form-fields/components/Button";

// ** types **
import {IForm} from "../types";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchema} from "../validationSchema/topSectionValidation";
import {FEATURE} from "../constant";

// ** constants **
const HomePageForm = () => {
  const methods = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      topSection: {
        feature: [FEATURE],
      },
    },
  });

  function onSubmit(data: IForm) {
    console.log(data, "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TopSection />
          <MiddleSection />
          <BottomSection />

          <Button btnName="submit" type="submit"></Button>
        </form>
      </FormProvider>
    </>
  );
};
export default HomePageForm;
