//** Packages **
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {Link} from "react-router-dom";

//** Common Components **
import Input from "@/components/form-fields/components/Input";
import Button from "@/components/form-fields/components/Button";
import TextArea from "@/components/form-fields/components/TextArea";

//** Types **
import {IContactusForm} from "./types";

//** Validations **
import {yupResolver} from "@hookform/resolvers/yup";
import {ContactusValidation} from "./validation-schema/contactUsValidationSchema";
import {useCreateContactUsAPI} from "../services/cms.service";
import {useGetContactusAPI} from "@/modules/cms/services/cms.service";
import {Loader} from "@/components/common/Loader";

const Contactus = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<IContactusForm>({
    resolver: yupResolver(ContactusValidation),
  });

  const {createContactUsAPI, isLoading: updateLoading} =
    useCreateContactUsAPI();
  const {getContactusAPI, isLoading: dataLoading} = useGetContactusAPI();

  const fetchContactusData = async () => {
    const {data, error} = await getContactusAPI();

    if (data && !error) {
      reset(data?.data);
    }
  };

  useEffect(() => {
    fetchContactusData();
  }, []);

  const onSubmit: SubmitHandler<IContactusForm> = async (values) => {
    const data1 = new FormData();
    data1.append("title", values.title);
    data1.append("description", values.description);
    data1.append("greenButton", values.greenButton);

    await createContactUsAPI(data1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold ">Contact Us Page</h2>
            <span className="text-blackPrimary">
              {" "}
              <Link to="" className="text-grayText text-sm">
                {" "}
                CMS Management{" "}
              </Link>{" "}
              / Contact Us Page{" "}
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
        <section className="h-[calc(100%_-_60px)] w-full bg-white overflow-y-auto scroll-design p-5">
          {/* <Button btnName="Update" type="submit" /> */}
          {!dataLoading ? (
            <>
              {" "}
              <Input
                placeholder="Enter Title"
                name="title"
                textLabelName="Title"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />
              <TextArea
                placeholder="Enter Description"
                name="description"
                textLabelName="Description"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />
              <Input
                placeholder="Enter Green Button Name"
                name="greenButton"
                textLabelName="Green Button"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />
            </>
          ) : (
            <Loader />
          )}
        </section>
      </form>
    </>
  );
};

export default Contactus;
