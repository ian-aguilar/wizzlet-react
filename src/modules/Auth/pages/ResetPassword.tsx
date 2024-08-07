// ** packages **
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";

// ** types **
import { RoutesPath } from "../types";

// ** icons **
import { ShowPassword } from "@/components/svgIcons";

// ** others **
import { PasswordDetailsFieldsType } from "../types/resetPassword";
import Button from "@/components/form-fields/components/Button";

// ** services **
import {
  useIsValidateTokenAPI,
  useResetPasswordAPI,
} from "../services/auth.service";

// ** validations **
import { ResetPasswordValidationSchema } from "../validation-schema/forgotPasswordValidation";
import Input from "@/components/form-fields/components/Input";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isValidToken, setIsValidToken] = useState(false);

  // ** Custom Hooks **
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PasswordDetailsFieldsType>({
    resolver: yupResolver(ResetPasswordValidationSchema),
  });
  const navigate = useNavigate();

  const { isValidateTokenAPI } = useIsValidateTokenAPI();

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
    }
    checkPasswordSetTokenAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPasswordSetTokenAPI = async () => {
    const { data } = await isValidateTokenAPI({ token });
    if (data) {
      setIsValidToken(true);
    }
  };

  // ** Custom Hooks **
  const { resetPasswordAPI, isLoading: loader } = useResetPasswordAPI();

  const onSubmit: SubmitHandler<PasswordDetailsFieldsType> = async (values) => {
    const { password } = values;

    const { error } = await resetPasswordAPI({
      token,
      password: password,
    });
    if (!error) {
      navigate(RoutesPath.Login);
    }
  };

  return (
    <>
      {isValidToken ? (
        <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-xl overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
          <div className="titleContainer text-center relative z-30 ">
            <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
              Reset Password
            </h1>
            <p className="text-grayText text-lg md:text-2xl leading-tight ">
              Change password for login
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" pt-6 md:pt-9  ">
              <Input
                textLabelName="New Password"
                inputEndIcon={<ShowPassword />}
                control={control}
                name="password"
                errors={errors}
                type="password"
              />
              <Input
                textLabelName="Re-type new Password"
                inputEndIcon={<ShowPassword />}
                control={control}
                name="confirmPassword"
                errors={errors}
                type="password"
              />
              <Button
                showType="App"
                btnClass="mt-6"
                btnName="Sign in"
                type="submit"
                isLoading={loader}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-xl overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
          <div className="titleContainer text-center relative z-30 ">
            <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
              Your link is invalid{" "}
            </h1>
            <p className="text-grayText text-lg md:text-2xl leading-tight ">
              Please request another from below.
            </p>
          </div>

          <div className="text-center">
            <Button
              showType="App"
              btnName="Forgot Password"
              btnClass="mt-9 !px-7  !w-auto !bg-white !border !border-grayLightBody/40 !text-black "
              type="submit"
              onClickHandler={() => navigate(RoutesPath.ForgotPassword)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
