//** Packages **
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//** Common Components **
import Button from "@/components/form-fields/components/Button";

//** Types **
import { IPrivacyPolicyForm } from "./types";

//** Validations **
import { yupResolver } from "@hookform/resolvers/yup";
import { PrivacyPolicyValidation } from "./validation-schema/PrivacyValidationSchema";
import { useCreatePrivacyAPI } from "../services/cms.service";
import { useGetPrivacyAPI } from "@/modules/cms/services/cms.service";
import { Loader } from "@/components/common/Loader";
import ReactQuillTextEditor from "@/components/form-fields/components/ReactQuillTextEditor";
import { modules } from "@/constants";

const Privacy = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IPrivacyPolicyForm>({
    resolver: yupResolver(PrivacyPolicyValidation),
  });

  const { createPrivacyAPI, isLoading: updateLoading } = useCreatePrivacyAPI();
  const { getPrivacyAPI, isLoading: dataLoading } = useGetPrivacyAPI();

  const fetchPrivacyData = async () => {
    const { data, error } = await getPrivacyAPI();

    if (data && !error) {
      reset(data?.data);
    }
  };

  useEffect(() => {
    fetchPrivacyData();
  }, []);

  const onSubmit: SubmitHandler<IPrivacyPolicyForm> = async (value) => {
    const data1 = new FormData();
    data1.append("policy", value.policy);
    await createPrivacyAPI(data1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold ">Privacy And Policy</h2>
            <span className="text-blackPrimary">
              {" "}
              <Link to="" className="text-grayText text-sm">
                {" "}
                CMS Management{" "}
              </Link>{" "}
              / Privacy And Policy{" "}
            </span>
          </div>
          <div>
            <Button btnName="Update" type="submit" btnClass="!w-auto" isLoading={updateLoading}></Button>
          </div>
        </div>
        <section className="h-[calc(100%_-_60px)] w-full bg-white overflow-y-auto scroll-design p-5">
          {!dataLoading ? (
            <>
              {" "}
              <ReactQuillTextEditor
                control={control}
                className="h-[500px]"
                placeholder="Write Privacy and Policy here..."
                modules={modules}
                name={"policy"}
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

export default Privacy;
