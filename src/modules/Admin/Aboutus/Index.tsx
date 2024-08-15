// ** Packages **
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

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
import { Link } from "react-router-dom";
import { useGetAboutusAPI } from "@/modules/cms/services/cms.service";
import { useEffect, useState } from "react";

const Aboutus = () => {
  const methods = useForm<IAboutusForm>({
    resolver: yupResolver(AboutusValidation),
  });
  // const methods = useForm<IAboutusForm>();

  const [aboutus, setAboutus] = useState<IAboutusForm>();

  const { createAboutUsAPI } = useCreateAboutUsAPI();
  const { getAboutusAPI } = useGetAboutusAPI();

  const fetchAboutusData = async () => {
    const { data, error } = await getAboutusAPI({});

    if (!error && data) {
      setAboutus(data?.data);

      const temp = {
        ...data.data,
      };

      methods.reset(temp);
    }
  };

  useEffect(() => {
    fetchAboutusData();
  }, []);

  // console.log(methods.getValues());

  const onSubmit: SubmitHandler<IAboutusForm> = async (values) => {
    const data = new FormData();
    console.log("Valuesssss", values);
    data.append("topSection[heading]", values["topSection"].heading);
    data.append("topSection[description]", values["topSection"].description);
    data.append("topSection[greenButton]", values["topSection"].greenButton);
    data.append("topSection[whiteButton]", values["topSection"].whiteButton);

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
    data.append("visionSection[image]", values["visionSection"]["image"][0]);

    data.append("missionSection[title]", values["missionSection"].title);
    data.append("missionSection[description]", values["missionSection"].description);
    data.append("missionSection[image]", values["missionSection"]["image"][0]);

    data.append("serviceSection[title]", values["serviceSection"].title);
    data.append("serviceSection[description]", values["serviceSection"].description);
    values.serviceSection.cards?.forEach((value, index) => {
      data.append(`serviceSection[cards][${index}][title]`, value.title);
      data.append(`serviceSection[cards][${index}][description]`, value.description);
      data.append(`serviceSection[cards][${index}][icon]`, value.icon[0]);
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
                / Aboutus Page{" "}
              </span>
            </div>
            <div>
              <Button btnName="Update" type="submit" btnClass="!w-auto"></Button>
            </div>
          </div>
          <section className="h-[calc(100%_-_60px)] w-full bg-white overflow-y-auto scroll-design p-5">
            {/* <Button btnName="Update" type="" /> */}
            <TopSection topSection={aboutus?.topSection} />
            <VisionSection visionSection={aboutus?.visionSection} />
            <MissionSection missionSection={aboutus?.missionSection} />
            <ServiceSection serviceSection={aboutus?.serviceSection} />
          </section>
        </form>
      </FormProvider>
    </>
  );
};

export default Aboutus;
