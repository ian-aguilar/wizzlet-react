// ** Packages **
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import ReactSelect from "react-select";

// ** Components **

// ** Type **
import { ReactSelectPropsTypes, SelectOption } from "../types";

const AsyncSelectField = <TFormValues extends Record<string, unknown>>(
  props: ReactSelectPropsTypes<TFormValues>
) => {
  const {
    name,
    value,
    errors,
    icon,
    getOptions,
    getOnChange,
    defaultOptions,
    isMulti = false,
    OptionComponent,
    className,
    noOptionsMessage,
    placeholder = "",
    disabled = false,
    isLoading = false,
    defaultSelectValue,
    isIconRight = false,
    fromGroupClass = "",
    singleValueComponent,
    menuPlacement = "auto",
    onFocusApiCall = true,
    menuPosition = "fixed",
    serveSideSearch = false,
    onChange: onCustomChange,
    notClearable = false,
  } = props;
  const selectRef = useRef<any>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<SelectOption[]>(defaultOptions ?? []);

  useEffect(() => {
    if (selectRef?.current?.inputRef) {
      selectRef.current.inputRef.autocomplete = "new-password";
    }
  }, [selectRef?.current?.inputRef]);

  const fetchOption = async ({ pageNo = page, optionValue = search } = {}) => {
    const data = await getOptions?.(optionValue, pageNo);
    console.log("data: ", data);

    if (data) {
      setTotal(data.count || 0);
      if (pageNo !== 1) {
        const tempOptions = [...options];
        data.option.forEach((op: any) => {
          if (!tempOptions.find((el) => el.label === op.label)) {
            tempOptions.push(op);
          }
        });
        setOptions(tempOptions);
      } else {
        setOptions(data.option);
      }
      setPage(pageNo + 1);
    } else {
      setPage(1);
      setSearch("");
      setTotal(0);
    }
    return data;
  };

  const onMenuScrollToBottom = (e: any) => {
    if (
      e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight &&
      total > options.length &&
      getOptions
    ) {
      fetchOption();
    }
  };

  const onInputChange = debounce((e: string) => {
    if (getOptions) {
      setSearch(e);
      fetchOption({ optionValue: e, pageNo: 1 });
    }
  }, 500);

  return (
    <div
      className={`field__wrapper ${
        errors?.message ? "field__has__error" : ""
      } ${disabled ? "disable" : ""} ${fromGroupClass}`}>
      <div
        className={`field__inner__wrapper ${icon ? "field__has__icon" : ""} ${
          isIconRight ? "icon__right" : ""
        }`}>
        <ReactSelect
          name={name}
          value={value}
          options={options}
          isLoading={isLoading}
          isDisabled={disabled}
          className={className}
          isClearable={!notClearable}
          placeholder={placeholder}
          isMulti={isMulti}
          menuPosition={menuPosition}
          menuPlacement={menuPlacement}
          defaultValue={defaultSelectValue}
          onMenuScrollToBottom={onMenuScrollToBottom}
          {...(noOptionsMessage && { noOptionsMessage })}
          {...(isMulti && { defaultValue: defaultOptions })}
          onInputChange={serveSideSearch ? onInputChange : undefined}
          {...(onFocusApiCall && {
            onFocus: () => fetchOption({ pageNo: 1 }),
          })}
          onChange={(selectedOption) => {
            getOnChange?.(selectedOption);
            onCustomChange?.(selectedOption);
          }}
          components={{
            ...(OptionComponent && { Option: OptionComponent }),
            ...(singleValueComponent && {
              SingleValue: singleValueComponent,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default AsyncSelectField;
