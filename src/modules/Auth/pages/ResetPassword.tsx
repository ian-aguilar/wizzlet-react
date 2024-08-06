import { useEffect, useState } from "react";
import {
  useIsValidateTokenAPI,
  useResetPasswordAPI,
} from "../services/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordValidationSchema } from "../validation-schema/forgotPasswordValidation";
import { PasswordDetailsFieldsType } from "../types/resetPassword";
// import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import _ from "lodash";
import Button from "@/components/form-fields/components/Button";
import { RoutesPath } from "../types";
// import { setLogoutData } from "@/redux/slices/authSlice";
import { TextLabel } from "@/components/common/TextLabel";
import { ShowPassword } from "@/components/svgIcons";

const ResetPassword = () => {
  const [isValidPasswordSetToken, setValidPasswordSetToken] = useState(false);
  // const [tokenError, setTokenError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  // ** Custom Hooks **
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PasswordDetailsFieldsType>({
    resolver: yupResolver(ResetPasswordValidationSchema),
  });
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isValidateTokenAPI, isLoading: tokenLoading } =
    useIsValidateTokenAPI();

  // check token
  useEffect(() => {
    if (_.isEqual(isValidPasswordSetToken, false)) {
      checkPasswordSetTokenAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkPasswordSetTokenAPI = async () => {
    const data = await isValidateTokenAPI({ token: searchParams.get("token") });
    if (data.error) {
      setValidPasswordSetToken(true);
    }
  };
  // ** Custom Hooks **
  const { resetPasswordAPI } = useResetPasswordAPI();

  const onSubmit: SubmitHandler<PasswordDetailsFieldsType> = async (values) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      console.log("password does not match");
    }
    const { error } = await resetPasswordAPI({
      token,
      password: password,
    });
    if (!error) {
      // setTokenError(false);
      navigate(RoutesPath.Login);
    }
    // if (error && error === "Token expired, try again") {
    //   setTokenError(true);
    // }
  };

  return (
    <>
      <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-xl overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
        <div className="titleContainer text-center relative z-30 ">
          <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
            {" "}
            Reset Password{" "}
          </h1>
          <p className="text-grayText text-lg md:text-2xl leading-tight ">
            Change password for login
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" pt-6 md:pt-9  ">
            <TextLabel
              TextLabelName="New Password"
              TextEndIcon={<ShowPassword />}
              control={control}
              name="password"
              errors={errors}
              type="password"
            />
            <TextLabel
              TextLabelName="Re-type new Password"
              TextEndIcon={<ShowPassword />}
              control={control}
              name="confirmPassword"
              errors={errors}
              type="password"
            />
            <Button
              btnClass="mt-6"
              btnName="Sign in"
              type="submit"
              isLoading={tokenLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
