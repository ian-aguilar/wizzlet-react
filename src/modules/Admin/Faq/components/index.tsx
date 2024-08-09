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
import {QUESTIONANSWER} from "../constant";

const FaqForm = () => {
  const methods = useForm<IForm>({
    defaultValues: {
      topSection: {
        row: [QUESTIONANSWER],
      },
    },
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
        {/* <button type="submit">submit</button> */}
        <Button btnName="submit" type="submit"></Button>
      </form>
    </FormProvider>
  );
};
export default FaqForm;
