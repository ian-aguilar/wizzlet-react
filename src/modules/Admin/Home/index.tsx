// ** Packages **
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** common components **
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";
import MiddleSection from "./components/MiddleSection";
import Button from "@/components/form-fields/components/Button";

// ** types **
import { IForm } from "./types";

// **validations **
import { validationSchema } from "./validationSchema/topSectionValidation";

// ** constant **
import { FEATURE } from "./constant";

// **services **
import { useHomeDataPostAPI, usefetchHomeAPI } from "./services/home.service";
import { Link } from "react-router-dom";
import { Loader } from "@/components/common/Loader";

const HomePageForm = () => {
  const { getHomeAPI, isLoading: dataLoading } = usefetchHomeAPI();
  const { homeDataPostAPI, isLoading: updateLoading } = useHomeDataPostAPI();
  const methods = useForm<IForm>({
    resolver: yupResolver(validationSchema),

    defaultValues: {
      topSection: {
        feature: [FEATURE],
      },
    },
  });

  const getFaqData = async () => {
    const { data, error } = await getHomeAPI();
    if (!error && data) {
      methods.reset(data.data);
    }
  };
  useEffect(() => {
    getFaqData();
  }, []);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const formData = new FormData();
    formData.append("topSection[title]", data.topSection.title);
    formData.append("topSection[description]", data.topSection.description);
    formData.append("topSection[subtitle]", data.topSection.subtitle);
    formData.append("topSection[greenButton]", data.topSection.greenButton);
    data.topSection.feature.forEach((item: any, index) => {
      if (typeof item.image == "string") {
        formData.append(`topSection[feature][${index}][image]`, item.image);
      } else {
        formData.append(`topSection[feature][${index}][image]`, item.image[0]);
      }
      formData.append(`topSection[feature][${index}][title]`, item.title);
      formData.append(`topSection[feature][${index}][description]`, item.description);
    });
    formData.append("middleSection[title]", data.middleSection.title);
    formData.append("middleSection[description]", data.middleSection.description);
    if (typeof data.middleSection.image == "string") {
      formData.append("middleSection[image]", data.middleSection.image);
    } else {
      formData.append("middleSection[image]", (data.middleSection.image as FileList)[0]);
    }
    formData.append("bottomSection[title]", data.bottomSection.title);
    formData.append("bottomSection[description]", data.bottomSection.description);
    formData.append("bottomSection[greenButton]", data.bottomSection.greenButton);
    formData.append("bottomSection[whiteButton]", data.bottomSection.whiteButton);
    await homeDataPostAPI(formData);
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              <Button
                btnName="Update"
                type="submit"
                btnClass="!w-auto"
                isLoading={updateLoading}
              ></Button>
            </div>
          </div>
          <section className="h-[calc(100vh_-_200px)] w-full bg-white overflow-y-auto scroll-design p-5">
            {!dataLoading ? (
              <>
                {" "}
                <TopSection />
                <MiddleSection />
                <BottomSection />
              </>
            ) : (
              <Loader />
            )}
          </section>
        </form>
      </FormProvider>
    </>
  );
};
export default HomePageForm;
