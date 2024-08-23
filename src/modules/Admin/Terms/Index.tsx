//** Packages **
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//** Common Components **
import Button from "@/components/form-fields/components/Button";

//** Types **
import { ITermsForm } from "./types";

//** Validations **
import { yupResolver } from "@hookform/resolvers/yup";
import { termsValidation } from "./validation-schema/termsValidationSchema";
import { useCreateTermsAPI } from "../services/cms.service";
import { useGetTermsAPI } from "@/modules/cms/services/cms.service";
import { Loader } from "@/components/common/Loader";
import ReactQuillTextEditor from "@/components/form-fields/components/ReactQuillTextEditor";
import { modules } from "@/constants";

const Terms = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ITermsForm>({
    resolver: yupResolver(termsValidation),
  });

  const { createTermsAPI, isLoading: updateLoading } = useCreateTermsAPI();
  const { getTermsAPI, isLoading: dataLoading } = useGetTermsAPI();

  const fetchTermsData = async () => {
    const { data, error } = await getTermsAPI();
    if (data && !error) {
      reset(data?.data);
    }
  };

  useEffect(() => {
    fetchTermsData();
  }, []);

  const onSubmit: SubmitHandler<ITermsForm> = async (values) => {
    const data1 = new FormData();
    data1.append("terms", values.terms);
    await createTermsAPI(data1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold ">Terms of Services</h2>
            <span className="text-blackPrimary">
              {" "}
              <Link to="" className="text-grayText text-sm">
                {" "}
                CMS Management{" "}
              </Link>{" "}
              / Terms of Services{" "}
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
          {!dataLoading ? (
            <>
              {" "}
              <ReactQuillTextEditor
                control={control}
                className="  h-[70vh] mb-16 xl:mb-10"
                placeholder="Write terms here..."
                modules={modules}
                name={"terms"}
                errors={errors}
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

export default Terms;
