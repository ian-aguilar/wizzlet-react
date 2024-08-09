// ** Packages **
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

// ** validations **
import { LoginValidationSchema } from "../validation-schema/signupLoginValidation";

// ** types **
import { ILoginForm } from "../types/login";
import { PrivateRoutesPath, RoutesPath } from "../types";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";
import { ShowPassword } from "@/components/svgIcons";
import { useLoginPostAPI } from "../services/auth.service";
import { setCredentials } from "@/redux/slices/authSlice";
import { setUser } from "@/redux/slices/userSlice";
import { btnShowType } from "@/components/form-fields/types";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginPostAPI, isLoading: loader } = useLoginPostAPI();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginValidationSchema),
  });
  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    const { data, error } = await loginPostAPI({
      email: values.email,
      password: values.password,
    });
    if (data?.data?.isVerified === false) {
      navigate(RoutesPath.Otp, {
        state: {
          email: values.email,
          previousRoute: RoutesPath.Login,
        },
      });
    }
    if (!error && data && data?.data?.user?.verified) {
      dispatch(setCredentials({ token: data?.data?.access_token }));
      dispatch(setUser({ user: data?.data?.user }));
      navigate(PrivateRoutesPath.dashboard.view);
    }
  };

  return (
    <>
      <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-xl overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
        <div className="titleContainer text-center relative z-30 ">
          <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
            {" "}
            Welcome Back{" "}
          </h1>
          <p className="text-grayText text-lg md:text-2xl leading-tight ">
            Please enter your details to sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" pt-6 md:pt-9 pb-14">
            <Input
              className=""
              placeholder="Email"
              name="email"
              label="Email"
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <Input
              className=""
              placeholder="**********"
              name="password"
              label="Password"
              type="password"
              control={control}
              errors={errors}
              inputEndIcon={<ShowPassword />}
              autoComplete={"new-password"}
            />

            <div className="flex gap-2 justify-center items-center">
              <Link
                className="my-4 cursor-pointer text-greenPrimary bg-transparent p-0 border-none font-normal text-base leading-4 hover:underline hover:underline-offset-2  duration-300 transition-all"
                to={RoutesPath.ForgotPassword}
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              showType={btnShowType.green}
              btnName="Sign in"
              type="submit"
              isLoading={loader}
            />
          </div>
        </form>

        <div className="text-center">
          <p className="text-grayText/70 font-medium text-base leading-4">
            Don’t have an account yet?{" "}
            <Link
              className="text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer"
              to={RoutesPath.SignUp}
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
