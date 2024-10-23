import Button from "../form-fields/components/Button";
import { BaseModalCommonProps } from "../form-fields/types";

export const BaseModal: React.FC<BaseModalCommonProps> = ({
  subText,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  isLoading,
  heading,
  icon,
  keyWord,
  children,
  showType,
}) => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black/80 z-50 flex justify-center items-center">
      <div className=" w-[80%] sm:max-w-sm  bg-white rounded-md">
        <div className="ModalBody text-center px-5 py-3">
          {icon && icon}

          <h2 className="text-3xl font-bold pb-2 mb-2 mt-2">{heading}</h2>
          <p className="text-base text-grayText">{subText}</p>
          <p className="text-base text-green-700">{keyWord}</p>
        </div>

        {children && <div className="modalBody px-6">{children}</div>}
        <div className="ModalFooterActions flex justify-center gap-2 p-5">
          {cancelButtonText ? (
            <Button
              btnClass="!w-auto !px-4 !bg-transparent border border-greyBorder !text-grayText  "
              btnName={cancelButtonText}
              onClickHandler={onCancel}
            />
          ) : null}
          {onConfirm && (
            <Button
              showType={showType}
              btnClass="!w-auto !px-4"
              btnName={confirmButtonText}
              onClickHandler={onConfirm}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
