import { IButtonProps } from "../types";

const Button = ({
  btnName,
  type,
  showType,
  btnClass,
  onClickHandler,
  isLoading,
  loaderClass,
  disabled,
  btnEndIcon,
}: IButtonProps) => {
  return (
    <button
      className={
        showType === "App"
          ? `text-white bg-greenPrimary hover:brightness-110 px-3 py-[10px] font-normal text-base w-full rounded transition-all duration-300 ${
              btnClass ?? ""
            }`
          : `py-3 px-5 border rounded-[10px] text-xl font-medium transition-all duration-300 hover:transition-all hover:duration-300 hover:brightness-110 flex gap-2 items-center ${btnClass}`
      }
      type={type ? type : "button"}
      onClick={onClickHandler}
      disabled={isLoading ? true : disabled}
    >
      {isLoading ? "Please wait" : btnName}
      {isLoading && (
        <span className={`inline-flex ml-3 mt-1.5 ${loaderClass ?? ""} `}>
          <div className="spinnerW"></div>
        </span>
      )}
      {btnEndIcon}
    </button>
  );
};

export default Button;
