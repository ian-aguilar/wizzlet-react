// ** Packages **
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// ** types **
import {IForm} from "../types";

// ** validations **
import {validationSchema} from "../validationSchema/topSectionValidation";

// ** common components **
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import Button from "@/components/form-fields/components/Button";

const FaqForm = () => {
  const methods = useForm<IForm>({
    resolver: yupResolver(validationSchema),
  });
  function onSubmit(data: IForm) {
    console.log(data, "dataaaa");
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TopSection />
        <BottomSection />
        <Button btnName="submit" type="submit"></Button>
      </form>
    </FormProvider>
  );
};
export default FaqForm;
