// ** Packages **
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
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
import {
  useFaqDataPostAPI,
  usefetchFaqAPI,
} from "@/modules/cms/services/faq.service";
import {useEffect, useState} from "react";
// import axios from "axios";

export const appendFormData = (
  data: any,
  formdata: FormData,
  parentKey: string = ""
) => {
  // console.log(data, "adadad");

  Object.keys(data).forEach((key) => {
    const mainKey = parentKey ? `${parentKey}[${key}]` : key;
    // console.log(mainKey, "mainkey");
    if (data[key] instanceof FileList) {
      console.log(mainKey, "asdsada");
      console.log(data[key][0]);
      // appendFormData
      // formdata.append(mainKey, data[key][0]);
      console.log("file is exist ");
    } else if (typeof data[key] === "object") {
      // console.log(mainKey, "main key");
      appendFormData(data[key], formdata, mainKey);
    } else if (Array.isArray(data[key])) {
      data[key].forEach((item: any, index: number) => {
        appendFormData(item, formdata, `${mainKey}[${index}]`);
      });
    } else {
      // console.log("condition successs");

      formdata.append(mainKey, data[key]);
    }
  });
};

const FaqForm = () => {
  const {faqDataPostAPI} = useFaqDataPostAPI();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const {getFaqAPI} = usefetchFaqAPI();
  // const [initialValues, setInitialValues] = useState({
  //   topSection: {
  //     row: [QUESTIONANSWER],
  //   },
  // });
  const getFaqData = async () => {
    const {data, error} = await getFaqAPI();
    console.log(data, "faq response");
    if (!error && data) {
      setIsUpdate(true);
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

    console.log(formData, "formdadadadadada");
    // if (updateId) {
    await faqDataPostAPI(formData);
    // } else {
    //   await faqDataPostAPI(formData);
    // }
    // await axios.post("http://localhost:8000/cms/faq", formData, {
    //   withCredentials: true,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // });
    // console.log(formData, "formdataaaaaaaaaaa");
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TopSection />
        <BottomSection />
        <Button btnName={isUpdate ? "update" : "submit"} type="submit"></Button>
      </form>
    </FormProvider>
  );
};
export default FaqForm;
