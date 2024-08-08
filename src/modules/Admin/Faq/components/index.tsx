import {FormProvider, useForm} from "react-hook-form";
import TopSection from "./TopSection";
import {yupResolver} from "@hookform/resolvers/yup";
import BottomSection from "./BottomSection";
import {IForm} from "../types";
import {validationSchema} from "../validationSchema/topSectionValidation";
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
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};
export default FaqForm;
