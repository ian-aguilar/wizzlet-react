// ** Packages **
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";

// ** types **
import { RoutesPath } from "../types";
import { ISignupForm } from "../types/signup";

// ** validations **
import { signUpValidationSchema } from "../validation-schema/signupLoginValidation";
import { ShowPassword } from "@/components/svgIcons";
import { useRegisterUserApi } from "../services/auth.service";
import { btnShowType } from "@/components/form-fields/types";

const Registration = () => {
  const navigate = useNavigate();
  const { registerUserApi, isLoading: loader } = useRegisterUserApi();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ISignupForm>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit: SubmitHandler<ISignupForm> = async (values) => {
    const registerPayload = {
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password,
    };

    const { error } = await registerUserApi(registerPayload);
    if (!error) {
      navigate(RoutesPath.Otp, { state: { email: values.email } });
    }
  };

  return (
    <>
      <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-lg overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
        <div className="titleContainer text-center relative z-[9999] ">
          <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
            Welcome{" "}
          </h1>
          <p className="text-grayText text-lg md:text-2xl leading-tight ">
            Please enter your details to signup.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" pt-6 md:pt-9 pb-14">
            <div className="grid grid-cols-12 md:gap-2">
              <div className=" col-span-12 md:col-span-6">
                <Input
                  className=""
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  control={control}
                  errors={errors}
                  autoComplete={""}
                />
              </div>
              <div className=" col-span-12 md:col-span-6">
                <Input
                  className=""
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  control={control}
                  errors={errors}
                  autoComplete={""}
                />
              </div>
            </div>
            <Input
              className=""
              placeholder="Email"
              name="email"
              type="text"
              control={control}
              errors={errors}
              autoComplete={""}
            />
            <Input
              className=""
              placeholder="**********"
              name="password"
              type="password"
              control={control}
              errors={errors}
              inputEndIcon={<ShowPassword />}
              autoComplete="new-password"
            />
            <Input
              className=""
              placeholder="**********"
              name="confirmPassword"
              type="password"
              control={control}
              errors={errors}
              inputEndIcon={<ShowPassword />}
              autoComplete="new-password"
            />
            <Button
              showType={btnShowType.green}
              btnName="Signup"
              btnClass="mt-9"
              type="submit"
              isLoading={loader}
            />
          </div>
        </form>

        <div className="text-center">
          <p className="text-grayText/70 font-medium text-base leading-4">
            Already have an account?{" "}
            <Link
              className="text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer"
              to={RoutesPath.Login}
            >
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
