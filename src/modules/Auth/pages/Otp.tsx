// ** Packages **
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ** icons **
import { LeftArrow } from "@/components/svgIcons";

// ** types **
import { RoutesPath } from "../types";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import OtpInputField from "@/components/form-fields/components/OtpInputField";

// ** services **
import { useVerifyPostAPI } from "../services/auth.service";
import { btnShowType } from "@/components/form-fields/types";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const changeDataValue = (e: string) => {
    setOtp(e);
  };

  useEffect(() => {
    if (!location?.state?.email) {
      navigate(RoutesPath.Login);
    }
  }, [location?.state?.email]);

  const { verifyPostAPI, isLoading: loader } = useVerifyPostAPI();

  // verify-otp
  const handleSubmit = async () => {
    const { data, error } = await verifyPostAPI({
      email: location?.state?.email,
      otp: otp,
    });

    if (!error) {
      if (location?.state?.previousRoute == RoutesPath.ForgotPassword) {
        navigate(RoutesPath.ResetPassword, {
          state: { token: data?.token },
        });
      } else {
        navigate(RoutesPath.Login);
      }
    }
  };

  return (
    <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-lg overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
      <div className="titleContainer text-center relative z-[9999] ">
        <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
          Verify your Email
        </h1>
        <p className="text-grayText text-lg md:text-2xl leading-tight ">
          Please enter 6 Digit Code sent to
        </p>
        {location?.state?.email && (
          <p className="text-blackPrimary font-bold text-lg pt-2">
            {location?.state?.email}
          </p>
        )}
      </div>

      <div className=" pt-6 md:pt-9 pb-14">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <OtpInputField onChangeHandler={changeDataValue} value={otp} />
          </div>
        </div>

        <Button
          showType={btnShowType.primary}
          btnName="Confirm"
          btnClass="mt-9"
          type="submit"
          onClickHandler={handleSubmit}
          isLoading={loader}
        />
        <div className="text-center pt-9">
          <a
            className="text-greenPrimary bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer"
            href=""
          >
            Resend Code
          </a>
        </div>
      </div>

      <div className="text-center">
        <p className="text-grayText/70 font-medium text-base leading-4">
          {" "}
          <a
            className="inline-flex gap-4 items-center text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer"
            onClick={() => navigate(RoutesPath.Login)}
          >
            {" "}
            <LeftArrow />
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Otp;
