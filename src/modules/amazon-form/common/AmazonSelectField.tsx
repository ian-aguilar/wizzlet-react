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
import { customStyles } from "@/components/form-fields/constant";

// ** Types **
import { ICustomSelect } from "@/components/form-fields/types";
import { Option } from "@/modules/inventory-management/types";

const ValueContainer = (props: ValueContainerProps) => {
  const { children } = props;
  return (
    <components.ValueContainer className="reactSelectCSWrapper" {...props}>
      {children}
    </components.ValueContainer>
  );
};

export const AmazonSelectField = <T extends FieldValues>(
  props: ICustomSelect<T>
) => {
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
    maxLength,
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
              const selectedValue = isMulti
                ? (selectedOption as MultiValue<Option>).map(
                    (option) => option.value
                  )
                : (selectedOption as SingleValue<Option>)?.value;

              onChange(selectedValue);
              CustomOnChange?.(selectedOption, e);
            }}
            name={name}
            value={
              isMulti
                ? options.filter((option: Option) =>
                    innerValue?.includes(option.value)
                  )
                : options.find((option: Option) => option.value === innerValue)
            }
            isOptionDisabled={() =>
              maxLength ? innerValue?.length >= maxLength : false
            }
            placeholder={placeholder || ""}
            options={options}
            autoFocus={autoFocus}
            isMulti={isMulti}
            isClearable={isClearable}
            menuPlacement="auto"
            styles={customStyles}
            isDisabled={disabled}
            className={`${className}` + (disabled ? "cursor-not-allowed" : "")}
            menuPosition={"fixed"}
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
