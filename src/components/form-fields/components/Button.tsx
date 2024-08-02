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
        <span
          className={`animate-spin rounded-full w-5 h-5 border-4 border-white/70 border-solid border-t-white/20 ${
            loaderClass ?? ""
          } `}
        />
      )}
      {btnName}
    </button>
  );
};

export default Button;
