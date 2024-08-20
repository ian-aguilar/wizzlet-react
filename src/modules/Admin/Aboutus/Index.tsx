// ** Packages **
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// ** Section Components **
import TopSection from "./components/TopSection";
import VisionSection from "./components/VisionSection";
import MissionSection from "./components/MissionSection";
import ServiceSection from "./components/ServiceSection";

// ** Common Components **
import Button from "@/components/form-fields/components/Button";

// ** Types **
import { IAboutusForm } from "./types";

// ** Validations **
import { yupResolver } from "@hookform/resolvers/yup";
import { AboutusValidation } from "./validation-schema/aboutUsValidation";
import { useCreateAboutUsAPI } from "../services/cms.service";
import { useGetAboutusAPI } from "@/modules/cms/services/cms.service";
import { Loader } from "@/components/common/Loader";

const Aboutus = () => {
  const methods = useForm<IAboutusForm>({
    resolver: yupResolver(AboutusValidation),
  });
  // const methods = useForm<IAboutusForm>();

  const { createAboutUsAPI, isLoading: updateLoading } = useCreateAboutUsAPI();
  const { getAboutusAPI, isLoading: dataLoading } = useGetAboutusAPI();

  const fetchAboutusData = async () => {
    const { data, error } = await getAboutusAPI({});

    if (!error && data) {
      methods.reset(data?.data);
    }
  };

  useEffect(() => {
    fetchAboutusData();
  }, []);

  const onSubmit: SubmitHandler<IAboutusForm> = async (values) => {
    const data = new FormData();
    data.append("topSection[heading]", values["topSection"].heading);
    data.append("topSection[description]", values["topSection"].description);
    data.append("topSection[greenButton]", values["topSection"].greenButton);

    values.topSection.cards?.forEach((value, index) => {
      data.append(`topSection[cards][${index}][title]`, value.title);
      data.append(`topSection[cards][${index}][description]`, value.description);
      if (typeof value.icon == "string") {
        data.append(`topSection[cards][${index}][icon]`, value.icon);
      } else {
        data.append(`topSection[cards][${index}][icon]`, value.icon[0]);
      }
    });

    data.append("visionSection[title]", values["visionSection"].title);
    data.append("visionSection[description]", values["visionSection"].description);
    data.append("visionSection[greenButton]", values["visionSection"].greenButton);
    if (typeof values["visionSection"]["image"] == "string") {
      data.append("visionSection[image]", values["visionSection"]["image"]);
    } else {
      data.append("visionSection[image]", values["visionSection"]["image"][0]);
    }

    data.append("missionSection[title]", values["missionSection"].title);
    data.append("missionSection[description]", values["missionSection"].description);
    if (typeof values["missionSection"]["image"] == "string") {
      data.append("missionSection[image]", values["missionSection"]["image"]);
    } else {
      data.append("missionSection[image]", values["missionSection"]["image"][0]);
    }

    data.append("serviceSection[title]", values["serviceSection"].title);
    data.append("serviceSection[description]", values["serviceSection"].description);
    values.serviceSection.cards?.forEach((value, index) => {
      data.append(`serviceSection[cards][${index}][title]`, value.title);
      data.append(`serviceSection[cards][${index}][description]`, value.description);
      if (typeof value.icon == "string") {
        data.append(`serviceSection[cards][${index}][icon]`, value.icon);
      } else {
        data.append(`serviceSection[cards][${index}][icon]`, value.icon[0]);
      }
    });

    await createAboutUsAPI(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold ">About Page</h2>
              <span className="text-blackPrimary">
                {" "}
                <Link to="" className="text-grayText text-sm">
                  {" "}
                  CMS Management{" "}
                </Link>{" "}
                / About Us Page{" "}
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
            {/* <Button btnName="Update" type="" /> */}
            {!dataLoading ? (
              <>
                <TopSection />
                <VisionSection />
                <MissionSection />
                <ServiceSection />
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

export default Aboutus;
