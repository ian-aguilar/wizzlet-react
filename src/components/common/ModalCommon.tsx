import { CloseIconSvg } from "@/assets/Svg";
import { Link } from "react-router-dom";

import Button from "../form-fields/components/Button";
import { btnShowType } from "../form-fields/types";

export const ModalCommon = () => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black/80 z-50 flex justify-center items-center">
      <div className=" w-[80%] sm:max-w-xl  bg-white rounded-md">
        <div className="ModalHeader text-2xl font-medium flex justify-between items-center p-5 border-b border-greyBorder ">
          <h2>Change Email</h2>
          <Link
            className=" inline-block hover:brightness-125 hover:scale-90 transition-all duration-300"
            to=""
          >
            <CloseIconSvg />
          </Link>
        </div>
        <div className="modalBody py-9 px-6">
          {/* <Input
            textLabelName="New Password"
            inputEndIcon={<ShowPassword />}
            control={control}
            name="password"
            errors={errors}
            type="password"
          />  */}
        </div>
        <div className="ModalFooterActions flex justify-end gap-2 p-5">
          <Button
            showType={btnShowType.primary}
            btnClass="!w-auto !px-8 !bg-transparent border border-greyBorder !text-grayText  "
            btnName="Cancel"
          />
          <Button
            showType={btnShowType.primary}
            btnClass="!w-auto !px-8"
            btnName="Change"
          />
        </div>
      </div>
    </div>
  );
};
