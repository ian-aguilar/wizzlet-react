import { IButtonProps } from "../types";

const Button = ({
  btnName,
  type,
  btnClass,
  onClickHandler,
  isLoading,
  loaderClass,
  disabled,
}: IButtonProps) => {
  return (
    <button
      className={`text-white bg-greenPrimary hover:brightness-110 px-3 py-[10px] font-normal text-base w-full rounded transition-all duration-300 ${
        btnClass ?? ""
      } `}
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
    </button>
  );
};

export default Button;
