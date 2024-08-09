// ** packages **
import { FieldValues } from "react-hook-form";

// ** common **
import Input from "../form-fields/components/Input";

// ** types **
import { ITextLabelProps } from "./types";

export const TextLabel = <T extends FieldValues>({
  TextClass,
  TextPlaceHolder,
  TextEndIcon,
  TextLabelName,
  control,
  type,
  name,
  errors,
  autoComplete,
}: ITextLabelProps<T>) => {
  return (
    <div className=" relative mb-2">
      <label className="pb-1 block">{TextLabelName}</label>

      <Input
        placeholder={TextPlaceHolder}
        inputEndIcon={TextEndIcon}
        control={control}
        type={type}
        name={name}
        errors={errors}
        autoComplete={autoComplete}
        className={` bg-inputAuthBg/60   p-3 rounded-md text-grayLightBody w-full outline-none  hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300 ${TextClass} `}
      />
      {/* <input
        type="text"
        className={` bg-inputAuthBg/60   p-3 rounded-md text-grayLightBody w-full outline-none focus:outline-none font-normal text-base mb-2 transition-all duration-300 ${TextClass} `}
        placeholder={TextPlaceHolder}
      /> */}
      {/* <div className="absolute right-4 top-10 "> {TextEndIcon} </div> */}
      <span className="errorText text-red-400 text-xs"> </span>
    </div>
  );
};
