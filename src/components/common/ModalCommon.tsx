import { CloseIconSvg } from "@/assets/Svg";
import { Link } from "react-router-dom";
import Button from "../form-fields/components/Button";
import { btnShowType, ModalCommonProps } from "../form-fields/types";

export const ModalCommon: React.FC<ModalCommonProps> = ({
  heading,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  isLoading,
  children,
}) => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black/80 z-50 flex justify-center items-center">
      <div className=" w-[80%] sm:max-w-xl  bg-white rounded-md">
        <div className="ModalHeader text-2xl font-medium flex justify-between items-center p-5 border-b border-greyBorder ">
          <h2>{heading}</h2>
          <Link
            className=" inline-block hover:brightness-125 hover:scale-90 transition-all duration-300"
            to="">
            <button
              onClick={onCancel}
              className="inline-block hover:brightness-125 hover:scale-90 transition-all duration-300">
              <CloseIconSvg />
            </button>
          </Link>
        </div>
        <div className="modalBody py-9 px-6">{children}</div>
        <div className="ModalFooterActions flex justify-end gap-2 p-5">
          <Button
            showType={btnShowType.primary}
            btnClass="!w-auto !px-8 !bg-transparent border border-greyBorder !text-grayText  "
            btnName={cancelButtonText}
            onClickHandler={onCancel}
          />
          <Button
            showType={btnShowType.green}
            btnClass="!w-auto !px-8"
            btnName={confirmButtonText}
            onClickHandler={onConfirm}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
