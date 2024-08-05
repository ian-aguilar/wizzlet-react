import { EyeIconSettings } from "@/assets/Svg";
import { InputCommon } from "@/components/common/InputCommon";
import { TextLabel } from "@/components/common/TextLabel";
import Button from "@/components/form-fields/components/Button";
import React from "react";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  return (
    <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-xl overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
      <div className="titleContainer text-center relative z-30 ">
        <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
          {" "}
          Add New Password{" "}
        </h1>
        <p className="text-grayText text-lg md:text-2xl leading-tight ">
          Add new password for login
        </p>
      </div>

      <form>
        <div className=" pt-6 md:pt-9  ">
          <TextLabel
            TextLabelName="New Password"
            TextPlaceHolder="df"
            TextEndIcon={<EyeIconSettings />}
          />
          <TextLabel
            TextLabelName="Re-type new Password"
            TextEndIcon={<EyeIconSettings />}
          />

          <Button
            btnClass="mt-6"
            btnName="Sign in"
            type="submit"
            isLoading={loader}
          />
        </div>
      </form>
    </div>
  );
};
