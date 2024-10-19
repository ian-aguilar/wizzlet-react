import { AnyObject, InputData, OutputData, ReferenceItem } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const amazonTransformData = (data: any): any => {
  if (Array.isArray(data)) {
    // Process each item in the array recursively
    return data.map((item) => amazonTransformData(item));
  } else if (typeof data === "object" && data !== null) {
    // If it's an object, reduce its keys and process each value
    return Object.keys(data).reduce((acc, key) => {
      const value = data[key];

      if (Array.isArray(value)) {
        // Check if the array contains objects with "label" and "value" keys
        acc[key] = value.map((item: any) => {
          if (
            item &&
            typeof item === "object" &&
            "label" in item &&
            "value" in item
          ) {
            return item.value; // Strip out the label and keep the value
          }
          // Otherwise, recursively transform the item
          return amazonTransformData(item);
        });
      } else if (
        value &&
        typeof value === "object" &&
        "label" in value &&
        "value" in value
      ) {
        // If it's an object with both "label" and "value" keys, keep only the value
        acc[key] = value.value;
      } else {
        // Otherwise, process the value recursively
        acc[key] = amazonTransformData(value);
      }

      return acc;
    }, {} as any);
  }

  // If it's a primitive (string, number, etc.), return it as is
  return data;
};

export const appendFormData = (
  formData: FormData,
  data: any,
  parentKey = ""
) => {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    Object.keys(data).forEach((key) => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;
      appendFormData(formData, data[key], fullKey);
    });
  } else if (Array.isArray(data)) {
    data.forEach((value, index) => {
      const fullKey = `${parentKey}[${index}]`;
      appendFormData(formData, value, fullKey);
    });
  } else {
    formData.append(parentKey, data === null ? "" : data);
  }
};

export const mapDataWithReference = async (
  data: InputData,
  reference: ReferenceItem[]
): Promise<OutputData> => {
  const result: OutputData = {};

  reference?.forEach((ref) => {
    const dataKey = ref.name;

    if (data[dataKey]) {
      result[dataKey] = data[dataKey].map((item: any) => {
        const mappedItem: any = {};

        ref.items.forEach((subRef) => {
          const fieldName = subRef.name;

          if (item[fieldName]) {
            // Handle `OPTIONS` or `MULTI_SELECT` types
            if (subRef.type === "OPTIONS") {
              const option = subRef.option?.find(
                (opt) => opt.value === item[fieldName]
              );

              if (option) {
                // mappedItem[fieldName] = {
                //   label: option.label,
                //   value: option.value,
                // };
                mappedItem[fieldName] = option.value;
              }
            } else if (
              subRef.type === "MULTI_SELECT" &&
              Array.isArray(item[fieldName])
            ) {
              mappedItem[fieldName] = item[fieldName].map((val: string) => {
                const option = subRef.option?.find(
                  (opt) => String(opt.value) === val
                );

                // return option
                //   ? { label: option.label, value: option.value }
                //   : { label: "", value: val };
                return option ? option.value : val;
              });
            } else {
              // Directly map the value for other types
              mappedItem[fieldName] = item[fieldName];
            }
          }
        });

        return mappedItem;
      });
    }
  });

  return result;
};

export const cleanPayload = (payload: any): any => {
  if (Array.isArray(payload)) {
    return payload
      .map(cleanPayload)
      .filter((item) => !(isEmpty(item) || isUndefinedOrEmpty(item)));
  } else if (typeof payload === "object" && payload !== null) {
    const cleanedObj: any = {};
    Object.entries(payload).forEach(([key, value]) => {
      const cleanedValue = cleanPayload(value);
      if (!isEmpty(cleanedValue) && !isUndefinedOrEmpty(cleanedValue)) {
        cleanedObj[key] = cleanedValue;
      }
    });
    return cleanedObj;
  } else if (payload === "undefined") {
    return undefined;
  } else {
    return payload;
  }
};

const isEmpty = (value: any): boolean =>
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" &&
    value !== null &&
    Object.keys(value).length === 0);

const isUndefinedOrEmpty = (value: any): boolean =>
  value === undefined ||
  value === null ||
  value === "undefined" ||
  value === "" ||
  (typeof value === "object" && isEmpty(value));

export const mergeDefaults = async (
  valueData: AnyObject,
  defaultData: AnyObject
): Promise<AnyObject> => {
  Object.keys(defaultData).forEach((key) => {
    if (
      typeof defaultData[key] === "object" &&
      defaultData[key] !== null &&
      !Array.isArray(defaultData[key])
    ) {
      // If it's an object, recurse
      if (!valueData[key]) {
        valueData[key] = {};
      }
      mergeDefaults(valueData[key], defaultData[key]);
    } else if (Array.isArray(defaultData[key])) {
      // If it's an array, check each element
      if (!valueData[key] || valueData[key].length === 0) {
        valueData[key] = defaultData[key];
      } else {
        // Iterate over array elements and recursively merge objects if needed
        defaultData[key].forEach((defaultItem, i) => {
          if (typeof defaultItem === "object" && defaultItem !== null) {
            if (!valueData[key][i]) {
              valueData[key][i] = defaultItem;
            } else {
              mergeDefaults(valueData[key][i], defaultItem);
            }
          } else {
            if (!valueData[key][i] || valueData[key][i] === "") {
              valueData[key][i] = defaultItem;
            }
          }
        });
      }
    } else {
      // Primitive type or empty, replace if empty
      if (!valueData[key] || valueData[key] === "") {
        valueData[key] = defaultData[key];
      }
    }
  });
  return valueData;
};
