//** Packages **
import { SubmitHandler, useForm } from "react-hook-form";

//** Common Components **
import Input from "@/components/form-fields/components/Input";
import Button from "@/components/form-fields/components/Button";

//** Types **
import { IContactusForm } from "./types";

//** Validations **
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactusValidation } from "./validation-schema/contactUsValidationSchema";
import { useCreateContactUsAPI } from "../services/cms.service";
import { Link } from "react-router-dom";

const Contactus = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IContactusForm>({
    resolver: yupResolver(ContactusValidation),
  });

  const { createContactUsAPI } = useCreateContactUsAPI();

  const onSubmit: SubmitHandler<IContactusForm> = async (values) => {
    const data = new FormData();

    data.append("title", values.title);
    data.append("description", values.description);
    data.append("greenButton", values.greenButton);

    const response = await createContactUsAPI(data);

    if (response?.data && !response?.error) {
      reset({});
    }
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
          <Button btnName="Update" type="submit" btnClass="!w-auto"></Button>
        </div>
      </div>
      <section className="h-[calc(100%_-_60px)] w-full bg-white overflow-y-auto scroll-design p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Button btnName="Update" type="submit" /> */}
          <Input
            placeholder="Enter Title"
            name="title"
            textLabelName="Title"
            type="text"
            control={control}
            errors={errors}
            autoComplete={""}
          />
          <Input
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
        </form>
      </section>
    </>
  );
};

export default Contactus;
