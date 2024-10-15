import { z } from "zod";
import { ResType, validationEnum } from "../types";
import { IConditions } from "@/components/form-builder/types";

const getValue = (data: any, path: string[]): any => {
  const newPath = [...path];
  if (newPath.length > 0) {
    const key = newPath.shift();
    if (key?.includes("[")) {
      const { prefix, value }: any = separateBracketedString(key);
      return getValue(data[prefix || ""][value], newPath);
    } else {
      if (data[key || ""]) {
        return getValue(data[key || ""], newPath);
      } else {
        return data[key || ""];
      }
    }
  } else return data;
};

function separateBracketedString(str: string): {
  prefix: string;
  value: number | null;
} {
  const match = str.match(/^([^\[]+)\[(\d+)\]$/);
  if (match) {
    return {
      prefix: match[1],
      value: parseInt(match[2], 10),
    };
  }
  return {
    prefix: str,
    value: null,
  };
}

function parseSchema(
  data: any,
  ctx: z.RefinementCtx,
  amazonJson: any,
  path: any = []
) {
  if (amazonJson) {
    if (amazonJson["if"]) {
      const array = [];

      if (amazonJson["if"]["allOf"]) {
        const temp = parseProperties(
          validationEnum.AllOf,
          amazonJson["if"]["allOf"],
          data,
          []
        );
        const tempArray = temp?.every((e) => e?.success);
        if (tempArray) {
          array.push(...[{ success: true, path: [] }]);
        } else {
          array.push(...[{ success: false, path: [] }]);
        }
      }

      if (amazonJson["if"]["anyOf"]) {
        const temp = parseProperties(
          validationEnum.Anyof,
          amazonJson["if"]["anyOf"],
          data,
          []
        );
        const tempArray = temp?.some((e) => e?.success);
        if (tempArray) {
          array.push(...[{ success: true, path: [] }]);
        } else {
          array.push(...[{ success: false, path: [] }]);
        }
      }

      if (amazonJson["if"]["required"]) {
        let temp: ResType[] | undefined = [];
        temp = parseProperties(
          validationEnum.Required,
          amazonJson["if"]["required"],
          data,
          []
        );
        array.push(...(temp || []));
      }
      if (amazonJson["if"]["properties"]) {
        const temp = parseProperties(
          validationEnum.Properties,
          amazonJson["if"]["properties"],
          data,
          []
        );
        const tempArray = temp?.every((e) => e.success);
        if (tempArray) {
          array.push(...[{ success: true, path: [] }]);
        } else {
          array.push(...[{ success: false, path: [] }]);
        }
      }

      if (amazonJson["if"]["not"]) {
        const temp = parseProperties(
          validationEnum.Not,
          amazonJson["if"]["not"],
          data,
          []
        );
        array.push(...(temp || []));
      }

      const success = array.every((e) => e?.success);

      if (success) {
        if (amazonJson["then"]) {
          const thenArray: ResType[] = [];
          if (amazonJson["then"]["required"]) {
            const temp = parseProperties(
              validationEnum.Required,
              amazonJson["then"]["required"],
              data,
              path
            );
            thenArray.push(...(temp || []));
          }
          if (amazonJson["then"]["properties"]) {
            const temp = parseProperties(
              validationEnum.Properties,
              amazonJson["then"]["properties"],
              data,
              path
            );
            thenArray.push(...(temp || []));
          }
          thenArray?.forEach((e: ResType) => {
            if (!e.success) {
              ctx.addIssue({
                path: e.path,
                message: e.message
                  ? e.message
                  : ` ${e.path[e.path.length - 1]} is required`,
                code: "custom",
              });
            }
          });
        }
      } else {
        if (amazonJson["else"]) {
          const elseArray: ResType[] = [];

          if (amazonJson["else"]["required"]) {
            const temp = parseProperties(
              validationEnum.Required,
              amazonJson["else"]["required"],
              data,
              path
            );
            elseArray.push(...(temp || []));
          }
          parseSchema(data, ctx, amazonJson["else"]);

          elseArray?.forEach((e: any) => {
            if (!e.success) {
              ctx.addIssue({
                path: e.path,
                message: e.message
                  ? e.message
                  : ` ${e.path[e.path.length - 1]} is required`,
                code: "custom",
              });
            }
          });
        }
      }
    }

    if (amazonJson["allOf"]) {
      const temp = parseProperties(
        validationEnum.AllOf,
        amazonJson["allOf"],
        data,
        path
      );

      console.log(temp, "<<<<<<<<<<<<<<<");
      temp?.forEach((e: ResType) => {
        if (!e.success) {
          if (e.path.includes("size")) {
            console.log(e, "<<<<<<<<<");
          }
          ctx.addIssue({
            path: [...path, ...e.path],
            message: e.message
              ? e.message
              : ` ${e.path[e.path.length - 1]} is required`,
            code: "custom",
          });
        }
      });
    }

    if (amazonJson["properties"]) {
      const temp = parseProperties(
        validationEnum.Properties,
        amazonJson["properties"],
        data,
        path
      );

      temp?.forEach((e: any) => {
        if (!e.success) {
          ctx.addIssue({
            path: e.path,
            message: e.message
              ? e.message
              : ` ${e.path[e.path.length - 1]} is required`,
            code: "custom",
          });
        }
      });
    }
  }
}

// export const testValidations = (amazonJson: any, data: any) => {
export const schema = (amazonJson: IConditions | undefined) =>
  z.any().superRefine((data, ctx) => {
    parseSchema(data, ctx, {
      allOf: Array.isArray(amazonJson?.allOf) ? amazonJson.allOf : [],
    });
    if (amazonJson?.required) {
      amazonJson?.required?.forEach((item) => {
        const value = getValue(data, [item]);

        if (Array.isArray(value)) {
          value?.forEach((innerItem, index) => {
            checkMainRequired(data, ctx, [`${item}[${index}]`], innerItem);
          });
        } else if (typeof value === "object") {
          Object.keys(value).forEach((objectItem) => {
            checkMainRequired(data, ctx, [...item, objectItem]);
          });
        } else {
          if (!value || value === "") {
            ctx.addIssue({
              path: [item],
              message: ` ${item} is required`,
              code: "custom",
            });
          }
        }
      });
    }
  });

const checkMainRequired = (
  data: any,
  ctx: z.RefinementCtx,
  path: string[],
  value: Object | undefined = undefined
) => {
  if (!value) {
    value = getValue(data, path);
  }

  if (Array.isArray(value)) {
    value?.forEach((innerItem, index) => {
      checkMainRequired(data, ctx, [path[index]], innerItem);
    });
  } else if (typeof value === "object") {
    Object.keys(value).forEach((objectItem) => {
      checkMainRequired(data, ctx, [...path, objectItem]);
    });
  } else {
    if (!value || value === "") {
      ctx.addIssue({
        path: path,
        message: ` ${path[path.length - 1]} is required`,
        code: "custom",
      });
    }
  }
};

const checkIf = (amazonJson: any, data: any, path: string[]) => {
  const tempArray: ResType[] = [];

  const temp = parseProperties(validationEnum.If, amazonJson["if"], data, path);
  console.log("🚀 ~ checkIf ~ temp:", temp);
  const success = temp?.every((e) => e.success);

  if (success) {
    if (amazonJson["then"]) {
      const temp = parseProperties(
        validationEnum.Then,
        amazonJson["then"],
        data,
        path
      );

      console.log("🚀 ~ checkIf ~ temp:22222", temp);
      tempArray.push(...(temp || []));
    }
  } else {
    if (amazonJson["else"]) {
      const temp = parseProperties(
        validationEnum.Else,
        amazonJson["else"],
        data,
        path
      );
      tempArray.push(...(temp || []));
    }
  }

  return tempArray;
};

const parseProperties = (
  type: validationEnum,
  amazonJson: any,
  data: any,
  path: string[]
) => {
  switch (type) {
    case validationEnum.Required:
      if (Array.isArray(amazonJson)) {
        return amazonJson.map((e: any) => {
          let success = true;
          if (!getValue(data, [...path, e])) {
            success = false;
          }
          return { path: [...path, e], success };
        });
      } else return [];

    case validationEnum.Not:
      const array: ResType[] = [];

      if (amazonJson["required"]) {
        const temp = parseProperties(
          validationEnum.Required,
          amazonJson["required"],
          data,
          path
        );
        array.push(...(temp || []));
      }
      if (amazonJson["properties"]) {
        const temp = parseProperties(
          validationEnum.Properties,
          amazonJson["properties"],
          data,
          path
        );

        array.push(...(temp || []));
      }
      const tempValue = array.every((e) => e.success);
      return array.map((e) => ({ ...e, success: !tempValue }));

    case validationEnum.Properties:
      const propertiesValue = getValue(data, path);
      if (Array.isArray(propertiesValue)) {
        const temp2: ResType[] =
          parseProperties(
            validationEnum.Items,
            { properties: amazonJson },
            data,
            path
          )?.filter(Boolean) || [];

        return temp2;
      } else {
        const array2: ResType[] = [];
        Object.entries(amazonJson).map(([key, value]: any) => {
          if (value["items"]) {
            const temp: ResType[] =
              parseProperties(validationEnum.Items, value["items"], data, [
                ...path,
                key,
              ])?.filter(Boolean) || [];
            array2.push(...temp);
            // const tempValue = getValue(data, [...path, key]);

            // if (tempValue !== null && Array.isArray(tempValue)) {
            //   if (value["items"]["required"]) {
            //     const temp1 = tempValue.flatMap((_: any, index: number) => {
            //       return (
            //         parseProperties(
            //           validationEnum.Required,
            //           value["items"]["required"],
            //           data,
            //           [...path, `${key}[${index}]`]
            //         )?.filter(Boolean) || []
            //       );
            //     });
            //     array2.push(...temp1);
            //   }
            //   if (value["items"]["properties"]) {
            //     const temp1 = tempValue.flatMap((_: any, index: number) => {
            //       return (
            //         parseProperties(
            //           validationEnum.Properties,
            //           value["items"]["properties"],
            //           data,
            //           [...path, `${key}[${index}]`]
            //         )?.filter(Boolean) || []
            //       );
            //     });
            //     array2.push(...temp1);
            //   }
            // }
            // if (value["items"]["anyOf"]) {
            //   const temp1 =
            //     parseProperties(
            //       validationEnum.Anyof,
            //       value["items"]["anyOf"],
            //       data,
            //       [...path, `${key}`]
            //     )?.filter(Boolean) || [];
            //   const tempArray = temp1?.some((e) => e?.success);
            //   if (tempArray) {
            //     array2.push(...[{ success: true, path: [] }]);
            //   } else {
            //     array2.push(...[{ success: false, path: [] }]);
            //   }
            // }
            // if (value["items"]["if"]) {
            //   array2.push(...(checkIf(value["items"], data, path) || []));
            // }
          } else {
            if (value["required"]) {
              const temp1 =
                parseProperties(
                  validationEnum.Required,
                  value["required"],
                  data,
                  [...path, `${key}`]
                )?.filter(Boolean) || [];

              array2.push(...temp1);
            }
            if (value["properties"]) {
              const temp1 =
                parseProperties(
                  validationEnum.Properties,
                  value["properties"],
                  data,
                  [...path, `${key}`]
                )?.filter(Boolean) || [];

              array2.push(...temp1);
            }
          }

          if (value["contains"]) {
            const tempValue = getValue(data, [...path, key]);

            let temp2: any = [];
            if (Array.isArray(tempValue)) {
              temp2 =
                parseProperties(validationEnum.Items, value["contains"], data, [
                  ...path,
                  key,
                ])?.filter(Boolean) || [];

              array2.push(...temp2);
            } else if (typeof tempValue === "object") {
              if (value["contains"]?.properties) {
                temp2 =
                  parseProperties(
                    validationEnum.Properties,
                    value["contains"]["properties"],
                    data,
                    [...path, key]
                  )?.filter(Boolean) || [];
                array2.push(...temp2);
              }
              if (value["contains"]?.required) {
                const temp2 =
                  parseProperties(
                    validationEnum.Required,
                    value["contains"]["required"],
                    data,
                    [...path, key]
                  )?.filter(Boolean) || [];

                array2.push(...temp2);
              }
            }
          }
          if (value["minItems"] || value["minUniqueItems"]) {
            const minValue = value["minItems"] || value["minUniqueItems"];
            const tempValue = getValue(data, [...path, key]);
            if (Array.isArray(tempValue)) {
              if (tempValue.length < minValue) {
                array2.push(
                  ...[
                    {
                      success: false,
                      path: [...path, key],
                      message: `${key} should have minimum ${minValue} items`,
                    },
                  ]
                );
              } else {
                array2.push(...[{ success: true, path: [...path, key] }]);
              }
            } else {
              array2.push(
                ...[
                  {
                    success: false,
                    path: [...path, key],
                    message: `${key} should be an array`,
                  },
                ]
              );
            }
          }
          if (value["maxItems"] || value["maxUniqueItems"]) {
            const maxValue = value["maxItems"] || value["maxUniqueItems"];
            const tempValue = getValue(data, [...path, key]);
            if (Array.isArray(tempValue)) {
              if (tempValue.length > maxValue) {
                array2.push(
                  ...[
                    {
                      success: false,
                      path: [...path, key],
                      message: `${key} should have maximum ${maxValue} items`,
                    },
                  ]
                );
              } else {
                array2.push(...[{ success: true, path: [...path, key] }]);
              }
            } else {
              array2.push(
                ...[
                  {
                    success: false,
                    path: [...path, key],
                    message: `${key} should be an array`,
                  },
                ]
              );
            }
          }
          if (value["enum"]) {
            const isObject = getValue(data, [...path, key]);

            if (!isObject) {
              // array2.push(
              //   ...[
              //     {
              //       success: false,
              //       path: [...path, key],
              //     },
              //   ]
              // );
            } else {
              const enumValues = value["enum"].map((e: any) => e.toString());

              if (enumValues.includes(isObject)) {
                array2.push(...[{ success: true, path: [...path, key] }]);
              } else {
                array2.push(
                  ...[
                    {
                      success: false,
                      path: [...path, key],
                      message:
                        value["enum"].length > 0
                          ? `Only one of ${value["enum"].join(",")} is allowed`
                          : `Only  ${value["enum"].join(",")} is allowed`,
                    },
                  ]
                );
              }
            }
          }
          if (value["anyOf"]) {
            const temp1 =
              parseProperties(validationEnum.Anyof, value["anyOf"], data, [
                ...path,
                `${key}`,
              ])?.filter(Boolean) || [];
            const tempArray = temp1?.some((e) => e?.success);
            if (tempArray) {
              array2.push(...[{ success: true, path: [] }]);
            } else {
              array2.push(...[{ success: false, path: [] }]);
            }
          }
        });

        return array2;
      }

    case validationEnum.AllOf:
    case validationEnum.Anyof:
      const array3: ResType[] = [];
      amazonJson.forEach((e: any) => {
        const tempArray: ResType[] = [];
        if (e["required"]) {
          const temp = parseProperties(
            validationEnum.Required,
            e["required"],
            data,
            path
          );
          tempArray.push(
            ...(temp || []).map((item) => ({
              ...item,
              json: (e as any)["required"],
            }))
          );
        }
        if (e["properties"]) {
          const temp = parseProperties(
            validationEnum.Properties,
            e["properties"],
            data,
            path
          );
          tempArray.push(
            ...(temp || []).map((item) => ({
              ...item,
              json: (e as any)["properties"],
            }))
          );
        }

        if (e["not"]) {
          const temp = parseProperties(
            validationEnum.Not,
            e["not"],
            data,
            path
          );
          tempArray.push(
            ...(temp || []).map((item) => ({
              ...item,
              json: (e as any)["not"],
            }))
          );
        }

        if (e["allOf"]) {
          const temp = parseProperties(
            validationEnum.AllOf,
            e["allOf"],
            data,
            path
          );
          tempArray.push(
            ...(temp || []).map((item) => ({
              ...item,
              json: (e as any)["allOf"],
            }))
          );
        }

        if (e["if"]) {
          tempArray.push(
            ...(checkIf(e, data, path) || []).map((item) => ({
              ...item,
              json: (e as any)["if"],
            }))
          );
        }
        // const tempValue = tempArray.every((e) => e.success);
        // if (tempValue) {
        //   array3.push(
        //     ...(tempArray.map((e) => {
        //       return {
        //         success: true,
        //         path: e.path,
        //         message: e.message,
        //       };
        //     }) || [])
        //   );
        // } else {
        //   array3.push(
        //     ...(tempArray.map((e) => {
        //       return {
        //         success: false,
        //         path: e.path,
        //         message: e.message,
        //       };
        //     }) || [])
        //   );
        // }
        array3.push(...tempArray);
      });
      return array3;

    case validationEnum.If:
    case validationEnum.Then:
    case validationEnum.Else:
      const array4: ResType[] = [];
      if (amazonJson["required"]) {
        const temp = parseProperties(
          validationEnum.Required,
          amazonJson["required"],
          data,
          path
        );

        array4.push(...(temp || []));
      }
      if (amazonJson["properties"]) {
        const temp = parseProperties(
          validationEnum.Properties,
          amazonJson["properties"],
          data,
          path
        );

        array4.push(...(temp || []));
      }
      if (amazonJson["not"]) {
        const temp = parseProperties(
          validationEnum.Not,
          amazonJson["not"],
          data,
          path
        );

        if (type === validationEnum.Then) {
          const newTemp = temp?.map((e) => {
            return {
              ...e,
              message: "You're not allowed to enter this value",
            };
          });
          array4.push(...(newTemp || []));
        } else {
          array4.push(...(temp || []));
        }
      }
      if (amazonJson["allOf"]) {
        const temp = parseProperties(
          validationEnum.AllOf,
          amazonJson["allOf"],
          data,
          path
        );
        const tempValue = temp?.every((e) => e.success);
        if (tempValue) {
          array4.push(...[{ success: true, path: [] }]);
        } else {
          array4.push(...[{ success: false, path: [] }]);
        }
      }
      if (amazonJson["anyOf"]) {
        const temp = parseProperties(
          validationEnum.Anyof,
          amazonJson["anyOf"],
          data,
          path
        );
        const tempValue = temp?.some((e) => e.success);
        if (tempValue) {
          array4.push(...[{ success: true, path: [] }]);
        } else {
          array4.push(...[{ success: false, path: [] }]);
        }
      }
      if (amazonJson["if"]) {
        array4.push(...(checkIf(amazonJson, data, path) || []));
      }

      return array4;

    case validationEnum.Items:
      const array5: ResType[] = [];
      const tempPath = [...path];
      const lastEle = tempPath.pop();

      const tempValueForItems = getValue(data, path);

      if (tempValueForItems !== null && Array.isArray(tempValueForItems)) {
        if (amazonJson["required"]) {
          const temp1 = tempValueForItems.flatMap((_: any, index: number) => {
            return (
              parseProperties(
                validationEnum.Required,
                amazonJson["required"],
                data,
                [...tempPath, `${lastEle}[${index}]`]
              )?.filter(Boolean) || []
            );
          });
          array5.push(...temp1);
        }
        if (amazonJson["properties"]) {
          const temp1 = tempValueForItems.flatMap((_: any, index: number) => {
            return (
              parseProperties(
                validationEnum.Properties,
                amazonJson["properties"],
                data,
                [...tempPath, `${lastEle}[${index}]`]
              )?.filter(Boolean) || []
            );
          });
          array5.push(...temp1);
        }
        if (amazonJson["allOf"]) {
          const temp1 = tempValueForItems.flatMap((_: any, index: number) => {
            return (
              parseProperties(validationEnum.AllOf, amazonJson["allOf"], data, [
                ...tempPath,
                `${lastEle}[${index}]`,
              ])?.filter(Boolean) || []
            );
          });
          const tempArray = temp1?.every((e: ResType) => e?.success);
          if (tempArray) {
            array5.push(...[{ success: true, path: [] }]);
          } else {
            array5.push(...[{ success: false, path: [] }]);
          }
        }
        if (amazonJson["anyOf"]) {
          const temp1 = tempValueForItems.flatMap((_: any, index: number) => {
            return (
              parseProperties(validationEnum.Anyof, amazonJson["anyOf"], data, [
                ...tempPath,
                `${lastEle}[${index}]`,
              ])?.filter(Boolean) || []
            );
          });
          const tempArray = temp1?.some((e: ResType) => e?.success);
          if (tempArray) {
            array5.push(...[{ success: true, path: [] }]);
          } else {
            array5.push(...[{ success: false, path: [] }]);
          }
        }
        if (amazonJson["if"]) {
          const temp1 = tempValueForItems.flatMap((_: any, index: number) => {
            return checkIf(amazonJson, data, [
              ...tempPath,
              `${lastEle}[${index}]`,
            ]);
          });
          array5.push(...temp1);
        }
      }
      return array5;

    default:
      break;
  }
};
