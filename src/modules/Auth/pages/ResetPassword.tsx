import React, { useEffect, useState } from "react";
import {
  useIsValidateTokenAPI,
  useResetPasswordAPI,
} from "../services/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordValidationSchema } from "../validation-schema/forgotPasswordValidation";
import { PasswordDetailsFieldsType } from "../types/resetPassword";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import _ from "lodash";
import Button from "@/components/form-fields/components/Button";
import { RoutesPath } from "../types";
import { setLogoutData } from "@/redux/slices/authSlice";
import Input from "@/components/form-fields/components/Input";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isValidPasswordSetToken, setValidPasswordSetToken] = useState(false);
  const [tokenError, setTokenError] = useState<boolean>(false);

  // ** Custom Hooks **
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PasswordDetailsFieldsType>({
    resolver: yupResolver(ResetPasswordValidationSchema),
  });
  const dispatch = useDispatch();
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
  const { isAuthenticated } = useAuthGuard();
  const { resetPasswordAPI, isSuccess } = useResetPasswordAPI();

  //   const onSubmit = handleSubmit(async (dataObj) => {
  const onSubmit: SubmitHandler<PasswordDetailsFieldsType> = async (values) => {
    const { password: userPassword } = values;

    const { data, error } = await resetPasswordAPI({
      token,
      password: userPassword,
      resettingPassword: false,
    });
    if (data && !error) {
      setTokenError(false);
    }
    if (error && error === "Token expired, try again") {
      setTokenError(true);
    }
  };

  return (
    <>
      {isAuthenticated && !isValidPasswordSetToken && !tokenError ? (
        <div className="card signup__Card w-[489px] max-w-full mx-auto mt-[20px]">
          <div className="signup__Card__Body">
            <p className="text-center text-colorBlack08 text-[18px] font-Biotif__Regular mt-[30px] mb-[20px]">
              Your session are already stored please logout
            </p>
            <div className="flex items-center justify-center w-full">
              <Button
                btnName="Dashboard"
                type="submit"
                onClickHandler={() => navigate(RoutesPath.Home)}
                isLoading={tokenLoading}
              />

              <Button
                btnName="Logout"
                type="submit"
                onClickHandler={() => {
                  dispatch(setLogoutData());
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {!isSuccess &&
        !tokenError &&
        !isAuthenticated &&
        !isValidPasswordSetToken && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pt-6 md:pt-9 pb-14 md:pb-32">
                <Input
                  placeholder="Enter Password"
                  name="password"
                  label="Password"
                  type="password"
                  control={control}
                  errors={errors}
                />

                <Button
                  btnName="Reset Password"
                  btnClass="mt-9"
                  type="submit"
                  isLoading={tokenLoading}
                />
              </div>
            </form>
          </div>
        )}

      {isSuccess && (
        <div className="w-[426px] max-w-full mx-auto">
          <h2 className="heading text-[24px] font-Biotif__Bold text-textDark mb-[8px]">
            Password Changed
          </h2>

          <p className="text text-[18px] font-Biotif__Regular text-textTertiary leading-[24px]">
            Your password has been set successfully. Click below button to
            login.
          </p>

          <Button btnName="Sign in" type="submit" isLoading={false} />
          <Button
            btnName="Go To Login"
            type="submit"
            isLoading={tokenLoading}
            onClickHandler={() => {
              navigate(RoutesPath.Login);
            }}
          />
        </div>
      )}
    </>
  );
};

export default ResetPassword;
