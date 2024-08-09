import { DeleteIcon } from "@/assets/Svg";
import Button from "../form-fields/components/Button";
import { btnShowType, ErrorModalCommonProps } from "../form-fields/types";

export const ModalError: React.FC<ErrorModalCommonProps> = ({
  subText,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  isLoading,
  heading,
}) => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black/80 z-50 flex justify-center items-center">
      <div className=" w-[80%] sm:max-w-sm  bg-white rounded-md">
        <div className="ModalBody text-center    px-5 py-10 ">
          <div className="p-5 rounded-full bg-redAlert/10  inline-block">
            <DeleteIcon className="w-10 h-10 text-redAlert " />
          </div>
          <h2 className="text-3xl font-bold pb-2 ">{heading}</h2>
          <p className="text-base text-grayText">{subText}</p>
        </div>

        <div className="ModalFooterActions flex justify-center gap-2 p-5">
          <Button
            btnClass="!w-auto !px-4 !bg-transparent border border-greyBorder !text-grayText  "
            btnName={cancelButtonText}
            onClickHandler={onCancel}
          />
          <Button
            showType={btnShowType.green}
            btnClass="!w-auto !px-4 bg-redAlert "
            btnName={confirmButtonText}
            onClickHandler={onConfirm}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
