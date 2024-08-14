// ** Packages **
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect} from "react";

// ** types **
import {IForm} from "./types";

// ** validations **
import {validationSchema} from "./validationSchema/topSectionValidation";

// ** common components **
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";
import Button from "@/components/form-fields/components/Button";

// ** constant
import {QUESTIONANSWER} from "./constant";

// ** services
import {useFaqDataPostAPI, usefetchFaqAPI} from "./services/faq.service";

// ** helper function **
import {appendFormData} from "./helper/helper";

const FaqForm = () => {
  const {faqDataPostAPI, isLoading} = useFaqDataPostAPI();

  const {getFaqAPI} = usefetchFaqAPI();
  const getFaqData = async () => {
    const {data, error} = await getFaqAPI();
    if (!error && data) {
      methods.reset(data.data);
    }
  };

  useEffect(() => {
    getFaqData();
  }, []);

  const methods = useForm<IForm>({
    defaultValues: {
      topSection: {
        row: [QUESTIONANSWER],
      },
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const formData = new FormData();
    appendFormData(data, formData);
    await faqDataPostAPI(formData);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TopSection />
        <BottomSection />
        <Button btnName={"submit"} type="submit" isLoading={isLoading}></Button>
      </form>
    </FormProvider>
  );
};
export default FaqForm;
