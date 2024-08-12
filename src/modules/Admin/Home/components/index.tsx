// ** Packages **
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// ** common components **
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import MiddleSection from "./MiddleSection";
import Button from "@/components/form-fields/components/Button";

// ** types **
import {IForm} from "../types";

// **validations **
import {validationSchema} from "../validationSchema/topSectionValidation";

// ** constant **
import {FEATURE} from "../constant";
import {appendFormData} from "../../Faq/components";
import axios from "axios";

const HomePageForm = () => {
  const methods = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      topSection: {
        feature: [FEATURE],
      },
    },
  });

  const onSubmit = async (data: IForm) => {
    const formData = new FormData();
    appendFormData(data, formData);
    console.log(formData, "formdataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    await axios.post("http://localhost:8000/cms/home", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
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
