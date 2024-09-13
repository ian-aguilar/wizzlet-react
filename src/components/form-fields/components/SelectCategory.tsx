import { Fragment, useEffect, useState } from "react";
import {
  CategoryOptGroupProps,
  CategoryOptionProps,
  CategoryOptions,
  ICategory,
  ISetSelectOptions,
  SelectCategoryProps,
} from "@/components/common/types";

export const Options = ({
  data,
  setValue,
  setIsSelectOpen,
  setSlug,
  setId,
}: CategoryOptionProps) => {
  return (
    <>
      {data &&
        data.map((option: CategoryOptions) => {
          return (
            <Fragment key={option.id}>
              <OptGroup
                option={option}
                setValue={setValue}
                setIsSelectOpen={setIsSelectOpen}
                setSlug={setSlug}
                setId={setId}
              />
            </Fragment>
          );
        })}
    </>
  );
};

const OptGroup = ({
  option,
  setValue,
  setIsSelectOpen,
  setSlug,
  setId,
}: CategoryOptGroupProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {option.options ? (
        <>
          <li
            className="list-none bg-red mt-[5px]"
            onClick={() => {
              setIsOpen(!isOpen);
            }}>
            {option.label}
          </li>
          {isOpen && (
            <>
              <Options
                data={option.options}
                setValue={setValue}
                setIsSelectOpen={setIsSelectOpen}
                setSlug={setSlug}
                setId={setId}
              />
            </>
          )}
        </>
      ) : (
        <>
          <li
            onClick={() => {
              setValue(option.value);
              setIsSelectOpen(false);
              setSlug(option.slug);
              setId(option.id);
            }}
            className="bg-slate-500">
            {option.label}
          </li>
        </>
      )}
    </>
  );
};

const setSelectOptions = (
  data: ICategory[],
  slug: string = "",
  defaultValue?: string | number
): ISetSelectOptions => {
  let newValue, newSlug, newId;
  for (const category of data) {
    if (category.children && category?.children?.length > 0) {
      category.label = category.name;
      category.slug = `${slug}  ${category.label} > `;

      const optionValues = setSelectOptions(
        category.children,
        category.slug,
        defaultValue
      );

      category.options = optionValues.options;
      newValue = optionValues.defaultValue.value
        ? optionValues.defaultValue.value
        : newValue;
      newSlug = optionValues.defaultValue.slug
        ? optionValues.defaultValue.slug
        : newSlug;
      newId = optionValues.defaultValue.id
        ? optionValues.defaultValue.id
        : newId;

      const childOptions = category.options.filter((child: CategoryOptions) => {
        if (child.options && child.options.length > 0) {
          return child;
        }
      });
      const nonChildOptions = category.options.filter(
        (child: CategoryOptions) => {
          if (!child.options) {
            return child;
          }
        }
      );
      category.options = [...childOptions, ...nonChildOptions];
    } else {
      category.label = category.name;
      category.value = category.name;
      category.slug = `${slug} ${category.label}`;
      if (defaultValue) {
        if (defaultValue == category.id || defaultValue == category.value) {
          newValue = category.value;
          newSlug = category.slug;
          newId = category.id;
        }
      }
    }
    delete category.name;
    delete category.children;
  }
  return {
    options: data,
    defaultValue: {
      value: newValue,
      slug: newSlug,
      id: newId,
    },
  };
};

export const Select = (props: SelectCategoryProps) => {
  const { options, defaultValue, onChange } = props;

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [finalOptions, setFinalOptions] = useState<CategoryOptions[]>([]);
  const [newValue, setNewValue] = useState<string>();
  const [slug, setSlug] = useState<string>();
  const [id, setId] = useState<number | string>();

  useEffect(() => {
    if (options.length > 0) {
      const newOptions = options;
      const updatedOptions = setSelectOptions(newOptions, "", defaultValue);
      setFinalOptions(updatedOptions.options);
      setNewValue(updatedOptions.defaultValue.value);
      setId(updatedOptions.defaultValue.id);
      setSlug(updatedOptions.defaultValue.slug);
    }
  }, [options]);

  useEffect(() => {
    if (newValue && id) {
      if (onChange) {
        onChange({
          id: id,
          value: newValue,
        });
      }
    }
  }, [newValue]);

  return (
    <>
      <div
        className="bg-slate-400 max h-[25px]"
        onClick={() => {
          setIsSelectOpen(!isSelectOpen);
        }}>
        {newValue && slug}
        {!isSelectOpen && !newValue && `Select Value`}
      </div>
      {isSelectOpen && finalOptions && (
        <Options
          data={finalOptions}
          setValue={setNewValue}
          setIsSelectOpen={setIsSelectOpen}
          setSlug={setSlug}
          setId={setId}
        />
      )}
    </>
  );
};
