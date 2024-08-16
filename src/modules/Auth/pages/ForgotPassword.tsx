// ** Packages **
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";

// ** validations **
import { ForgotPasswordValidationSchema } from "../validation-schema/forgotPasswordValidation";
import { RoutesPath } from "../types";
import { useForgotPasswordPostAPI } from "../services/auth.service";
import { LeftArrow } from "@/components/svgIcons";
import { useState } from "react";
import { MailSent } from "./MailSent";
import { btnShowType } from "@/components/form-fields/types";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const { forgotPasswordPostAPI, isLoading: loader } =
    useForgotPasswordPostAPI();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<{ email: string }>({
    resolver: yupResolver(ForgotPasswordValidationSchema),
  });

  const onSubmit: SubmitHandler<{ email: string }> = async (values) => {
    const { data } = await forgotPasswordPostAPI({ email: values.email });

    if (data) {
      setIsSuccess(true);
      const email = values.email;
      if (values.email) setEmail(email);
    }
  };

  return (
    <>
      {!isSuccess ? (
        <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-lg overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
          <div className="titleContainer text-center relative z-[9999] ">
            <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
              {" "}
              Forgot Password {/* add text for forgot and reset password */}
            </h1>
            <p className="text-grayText text-lg md:text-2xl leading-tight ">
              Enter the email address associated with your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" pt-6 md:pt-9 pb-14">
              <Input
                className=""
                placeholder="Enter Registered Email Address"
                name="email"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />

              <Button
                showType={btnShowType.green}
                btnName="Reset Password"
                btnClass="mt-9"
                type="submit"
                isLoading={loader}
              />
            </div>
          </form>

          <div className="text-center">
            <p className="text-grayText/70 font-medium text-base leading-4">
              {" "}
              <Link
                className="inline-flex gap-4 items-center text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer"
                to={RoutesPath.Login}
              >
                {" "}
                <LeftArrow />
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <MailSent email={email} />
      )}
    </>
  );
};

export default ForgotPassword;
