// ** Packages **
import {useEffect} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// ** common components **
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";
import MiddleSection from "./components/MiddleSection";
import Button from "@/components/form-fields/components/Button";

// ** types **
import {IForm} from "./types";

// **validations **
import {validationSchema} from "./validationSchema/topSectionValidation";

// ** constant **
import {FEATURE} from "./constant";

// **services **
import {useHomeDataPostAPI, usefetchHomeAPI} from "./services/home.service";
import {Link} from "react-router-dom";

const HomePageForm = () => {
  const {getHomeAPI} = usefetchHomeAPI();
  const {homeDataPostAPI} = useHomeDataPostAPI();
  const methods = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      topSection: {
        feature: [FEATURE],
      },
    },
  });
  console.log(methods.formState.errors, "error");

  const getFaqData = async () => {
    const {data, error} = await getHomeAPI();
    console.log(data, "home response");
    if (!error && data) {
      // setIsUpdate(true);
      console.log(data.data, "initial value of formdata");

      methods.reset(data.data);
    }
  };
  useEffect(() => {
    getFaqData();
  }, []);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    // console.log(data.topSection.feature[0].image[0] instanceof File, "image");
    // return;
    console.log(data, "datttttttttttttttttt");

    // return;

    const formData = new FormData();
    // appendFormData(data, formData);
    formData.append("topSection[title]", data.topSection.title);
    formData.append("topSection[description]", data.topSection.description);
    formData.append("topSection[subtitle]", data.topSection.subtitle);
    formData.append("topSection[greenButton]", data.topSection.greenButton);
    data.topSection.feature.forEach((item: any, index) => {
      formData.append(`topSection[feature][${index}][image]`, item.image[0]);
      formData.append(`topSection[feature][${index}][title]`, item.title);
      formData.append(
        `topSection[feature][${index}][description]`,
        item.description
      );
    });
    formData.append("middleSection[title]", data.middleSection.title);
    formData.append(
      "middleSection[description]",
      data.middleSection.description
    );

    formData.append(
      "middleSection[image]",
      (data.middleSection.image as FileList)[0]
    );
    formData.append("bottomSection[title]", data.bottomSection.title);
    formData.append(
      "bottomSection[description]",
      data.bottomSection.description
    );
    formData.append(
      "bottomSection[greenButton]",
      data.bottomSection.greenButton
    );
    formData.append(
      "bottomSection[whiteButton]",
      data.bottomSection.whiteButton
    );

    // appendFormData(data, formData);

    await homeDataPostAPI(formData);
    // await axios.post("http://localhost:8000/cms/home", formData, {
    //   withCredentials: true,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold ">Home Page</h2>
          <span className="text-blackPrimary">
            {" "}
            <Link to="" className="text-grayText text-sm">
              {" "}
              CMS Management{" "}
            </Link>{" "}
            / Home Page{" "}
          </span>
        </div>
        <div>
          {/* <Button btnName="Update" type="submit" btnClass="!w-auto"></Button> */}
        </div>
      </div>
      <section className="h-[calc(100%_-_60px)] w-full bg-white overflow-y-auto scroll-design p-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TopSection />
            <MiddleSection />
            <BottomSection />
            <Button btnName="Update" type="submit" btnClass="!w-auto"></Button>
            {/* <Button btnName="submit" type="submit"></Button> */}
          </form>
        </FormProvider>
      </section>
    </>
  );
};
export default HomePageForm;
