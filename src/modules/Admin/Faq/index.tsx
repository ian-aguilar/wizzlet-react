// ** Packages **
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

// ** types **
import { IForm } from "./types";

// ** validations **
import { validationSchema } from "./validationSchema/topSectionValidation";

// ** common components **
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";
import Button from "@/components/form-fields/components/Button";

// ** constant
import { QUESTIONANSWER } from "./constant";

// ** services
import { useFaqDataPostAPI, usefetchFaqAPI } from "./services/faq.service";

// ** helper function **
import { appendFormData } from "./helper/helper";
import { Link } from "react-router-dom";
import { Loader } from "@/components/common/Loader";

const FaqForm = () => {
  const { faqDataPostAPI, isLoading: updateLoading } = useFaqDataPostAPI();

  const { getFaqAPI, isLoading: dataLoading } = usefetchFaqAPI();
  const getFaqData = async () => {
    const { data, error } = await getFaqAPI();
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
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold ">FAQ's Page</h2>
              <span className="text-blackPrimary">
                {" "}
                <Link to="" className="text-grayText text-sm">
                  {" "}
                  CMS Management{" "}
                </Link>{" "}
                / Faq PageCMS Management{" "}
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
                <TopSection />
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
export default FaqForm;
