// ** Packages **

import ReactSelect, {
  MultiValue,
  SingleValue,
  ValueContainerProps,
  components,
} from "react-select";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, FieldValues } from "react-hook-form";

// ** Constant **
import { customStyles } from "../constant";

// ** Types **
import { ICustomSelect, Option } from "../types";

const ValueContainer = (props: ValueContainerProps) => {
  const { children } = props;
  return (
    <components.ValueContainer className="reactSelectCSWrapper" {...props}>
      {children}
    </components.ValueContainer>
  );
};

export const SelectField = <T extends FieldValues>(props: ICustomSelect<T>) => {
  const {
    isSearchable,
    onChange: CustomOnChange,
    inputClass,
    placeholder,
    options,
    isCompulsory,
    isMulti = false,
    label,
    labelClass,
    Margin,
    Width,
    disabled,
    className,
    isClearable = false,
    autoFocus = false,
    name,
    control,
    errors,
  } = props;

  const components = { ValueContainer };
  return (
    <div
      className={`custom-select-wrap relative ${Width} ${Margin} ${inputClass}`}
    >
      {label && (
        <label className={labelClass}>
          {label}
          {isCompulsory && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value: innerValue, ref } }) => (
          <ReactSelect
            ref={ref}
            isSearchable={isSearchable}
            components={components}
            onChange={(selectedOption, e) => {
              onChange(selectedOption);
              CustomOnChange?.(selectedOption, e);
            }}
            name={name}
            value={innerValue as MultiValue<Option> | SingleValue<Option>}
            placeholder={placeholder ? placeholder : ""}
            options={options}
            autoFocus={autoFocus}
            isMulti={isMulti}
            isClearable={isClearable}
            menuPlacement="auto"
            styles={customStyles}
            isDisabled={disabled}
            className={`${className}`}
          />
        )}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="errorText text-red-600 font-medium text-sm">
            {message}
          </span>
        )}
      />
    </div>
  );
};

export default SelectField;
