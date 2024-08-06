import { IButtonProps } from "../types";

const Button = ({
  btnName,
  type,
  btnClass,
  onClickHandler,
  isLoading,
  loaderClass,
}: IButtonProps) => {
  return (
    <button
      className={`text-white bg-greenPrimary hover:brightness-110 px-3 py-[10px] font-normal text-base w-full rounded transition-all duration-300 ${
        btnClass ?? ""
      } `}
      type={type ? type : "button"}
      onClick={onClickHandler}
    >
      {isLoading && (
        <span className={` inline-flex mr-3 mt-1.5 ${loaderClass ?? ""} `}>
          <div className="spinnerW"></div>
        </span>
      )}
      {btnName}
    </button>
  );
};

export default Button;
