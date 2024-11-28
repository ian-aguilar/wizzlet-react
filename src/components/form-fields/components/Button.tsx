import { btnShowType, IButtonProps } from "../types";

const Button = ({
  btnName,
  type,
  showType,
  btnClass,
  onClickHandler,
  isLoading,
  loaderClass,
  disabled,
  BtnIconLeft,
  btnEndIcon,
}: IButtonProps) => {
  let btnType = "";
  switch (showType) {
    case btnShowType.greenRound:
      btnType = `py-3 px-5 border rounded-[10px] text-xl font-medium transition-all duration-300 hover:transition-all hover:duration-300 hover:brightness-110 flex gap-2 items-center ${
        btnClass ?? ""
      }`;
      break;
    case btnShowType.green:
      btnType = `text-white bg-greenPrimary hover:brightness-110 px-3 py-[10px] font-normal text-base w-full rounded transition-all duration-300 ${
        btnClass ?? ""
      }`;
      break;

    case btnShowType.red:
      btnType = `text-white bg-redAlert hover:brightness-110 px-3 py-[10px] font-normal text-base w-full rounded transition-all duration-300 ${
        btnClass ?? ""
      }`;
      break;

    case btnShowType.primary:
      btnType = `py-3 px-5 border rounded-[10px] text-xl font-medium transition-all duration-300 hover:transition-all hover:duration-300 hover:brightness-110 flex gap-2 items-center ${btnClass}`;
      break;

    default:
      btnType = `text-white bg-greenPrimary hover:brightness-110 px-3 py-[10px] font-normal text-base w-full rounded transition-all duration-300 ${
        btnClass ?? ""
      }`;
  }

  return (
    <button
      className={btnType}
      type={type ? type : "button"}
      onClick={onClickHandler}
      disabled={isLoading ? true : disabled}
    >
      {BtnIconLeft}
      {btnName}
      {isLoading && (
        <span className={`inline-flex ml-3 mt-1.5 ${loaderClass ?? ""} `}>
          <div className="spinnerW"></div>
        </span>
      )}
      {btnEndIcon && btnEndIcon}
    </button>
  );
};

export default Button;
