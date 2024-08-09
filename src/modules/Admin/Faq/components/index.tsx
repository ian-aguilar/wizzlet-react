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
import axios from "axios";

const FaqForm = () => {
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
    formData.append("topSection[title]", data["topSection"].title);
    formData.append(
      "topSection[description]",
      data["bottomSection"].description
    );
    // formData.append("topSection.row[0]",data["topSection"].row[0]);
    data.topSection.row.forEach((value, index) => {
      formData.append(`topSection[row][${index}][question]`, value.question);
      formData.append(`topSection[row][${index}][answer]`, value.answer);
    });
    formData.append("bottomSection[title]", data["bottomSection"].title);
    formData.append(
      "bottomSection[description]",
      data["bottomSection"].description
    );
    formData.append(
      "bottomSection[greenButton]",
      data["bottomSection"].greenButton
    );
    formData.append(
      "bottomSection[whiteButton]",
      data["bottomSection"].whiteButton
    );
    await axios.post("http://localhost:8000/cms/faq", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(formData, "formdataaaaaaaaaaa");
  };
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
