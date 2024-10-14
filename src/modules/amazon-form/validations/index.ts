// // import { z } from "zod";

import { z } from "zod";
import { ResType, validationEnum } from "../types";

// const getObjectWithPath = (
//   theObject: any,
//   targetKey: string,
//   currentPath: string[] = []
// ): { result: any; path: string[] } | null => {
//   let result = null;

//   if (theObject instanceof Array) {
//     for (let i = 0; i < theObject.length; i++) {
//       result = getObjectWithPath(theObject[i], targetKey, [
//         ...currentPath,
//         `${i}`,
//       ]);
//       if (result) {
//         if (result?.result === undefined || result?.result === "") {
//           return null;
//         }
//         return result;
//       }
//     }
//   } else {
//     for (const prop in theObject) {
//       const value = theObject[prop];
//       const newPath = [...currentPath, prop]; // Add current key to the path

//       if (prop === targetKey) {
//         if (theObject[prop] === undefined || theObject[prop] === "") {
//           return null;
//         }
//         return { result: theObject[prop], path: newPath }; // Return the result and path when found
//       }

//       if (value instanceof Object || value instanceof Array) {
//         result = getObjectWithPath(value, targetKey, newPath);
//         if (result) {
//           if (result?.result === undefined || result?.result === "") {
//             return null;
//           }
//           return result;
//         }
//       }
//     }
//   }

//   return null;
// };

const getValue = (data: any, path: string[]) => {
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

// let amazonJson = {
//   // allOf: [
//   //   {
//   if: {
//     anyOf: [
//       {
//         not: {
//           properties: {
//             temp: {
//               items: {
//                 required: ["demo"],
//               },
//               // contains: {
//               //   required: ["demo"],
//               //   properties: { demo: { enum: ["Testing"] } },
//               // },
//             },
//           },
//         },
//       },
// {
//   not: {
//     properties: {
//       personalInfo: {
//         contains: {
//           required: ["name"],
//           properties: { name: { enum: ["Name"] } },
//         },
//       },
//     },
//   },
// },
//     ],
//   },
//   then: {
//     required: ["email"],
//   },
//   else: {
//     required: ["contact"],
//   },
//   //   },
//   // ],
// };

let amazonJson = {
  allOf: [
    {
      if: {
        anyOf: [
          {
            allOf: [
              {
                not: {
                  required: ["merchant_suggested_asin"],
                  properties: {
                    merchant_suggested_asin: { required: ["value"] },
                  },
                },
              },
              {
                not: {
                  required: ["parentage_level"],
                  properties: {
                    parentage_level: { items: { required: ["value"] } },
                  },
                },
              },
              {
                required: [
                  "supplier_declared_has_product_identifier_exemption",
                ],
                properties: {
                  supplier_declared_has_product_identifier_exemption: {
                    contains: {
                      required: ["value"],
                      properties: { value: { enum: [false] } },
                    },
                  },
                },
              },
            ],
          },
          {
            allOf: [
              {
                required: ["merchant_suggested_asin"],
                properties: {
                  merchant_suggested_asin: { required: ["value"] },
                },
              },
              {
                not: {
                  required: ["parentage_level"],
                  properties: {
                    parentage_level: { items: { required: ["value"] } },
                  },
                },
              },
              {
                required: [
                  "supplier_declared_has_product_identifier_exemption",
                ],
                properties: {
                  supplier_declared_has_product_identifier_exemption: {
                    contains: {
                      required: ["value"],
                      properties: { value: { enum: [true] } },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      then: {
        properties: {
          sleeve: {
            // items: {
            properties: {
              type: {
                properties: {
                  value: {
                    enum: ["Sleeveless"],
                  },
                },
              },
              // },
            },
          },
        },
      },
      else: {
        properties: {
          closure: {
            // items: {
            properties: {
              type: {
                properties: {
                  value: {
                    enum: [
                      "Buckle",
                      "Button",
                      "Double Ring",
                      "Drawstring",
                      "Hook and Eye",
                      "Hook and Loop",
                      "Magnetic",
                      "Pull On",
                      "Snap",
                      "Zipper",
                    ],
                  },
                },
              },
            },
            // },
          },
        },
        if: {
          allOf: [
            {
              required: ["shirt_form_type"],
              properties: {
                shirt_form_type: {
                  // contains: {
                  required: ["value"],
                  properties: {
                    value: {
                      enum: ["tank_top"],
                    },
                  },
                  // },
                },
              },
            },
            {
              required: ["test"],
              properties: {
                test: {
                  contains: {
                    required: ["demo"],
                    properties: { demo: { enum: ["Testing"] } },
                  },
                },
              },
            },
          ],
        },
        then: {
          properties: {
            collar_style: {
              // items: {
              properties: {
                value: {
                  enum: ["Collarless"],
                },
              },
              // },
            },
          },
        },
        else: {
          properties: {
            collar_style: {
              // items: {
              properties: {
                value: {
                  enum: [
                    "Band Collar",
                    "Button Down",
                    "Camp Collar",
                    "Club Collar",
                    // "Collarless",
                    "Cutaway",
                    "Extreme Cutaway Collar",
                    "Eyelet Collar",
                    "Flat Collar",
                    "Hidden Button Down Collar",
                    "Lapel Collar",
                    "Mandarin Collar",
                    "One Piece Collar",
                    "Pajama Collar",
                    "Point Collar",
                    "Polo Collar",
                    "Semi Cutaway Collar",
                    "Shawl Collar",
                    "Spear Collar",
                    "Spread Collar",
                    "Tab Collar",
                    "Wingtip Collar",
                  ],
                },
              },
              // },
            },
          },
        },
      },
    },
  ],
  // },
};

// export const testValidations = (amazonJson: any, data: any) => {
export const schema = z.any().superRefine((data, ctx) => {
  function parseSchema(amazonJson: any, path: any = []) {
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

      /**
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       */

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
          parseSchema(amazonJson["else"]);

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

      temp?.forEach((e: ResType) => {
        if (!e.success) {
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
  parseSchema(amazonJson);
});

const checkIf = (amazonJson: any, data: any, path: string[]) => {
  const tempArray: ResType[] = [];
  const temp = parseProperties(validationEnum.If, amazonJson["if"], data, path);
  const success = temp?.every((e) => e.success);
  if (success) {
    if (amazonJson["then"]) {
      const temp = parseProperties(
        validationEnum.Then,
        amazonJson["then"],
        data,
        path
      );
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
      const array2: ResType[] = [];
      Object.entries(amazonJson).map(([key, value]: any) => {
        if (value["items"]) {
          const tempValue = getValue(data, [...path, key]);

          if (tempValue !== null && Array.isArray(tempValue.result)) {
            if (value["items"]["required"]) {
              const temp1 = tempValue.result.flatMap(
                (_: any, index: number) => {
                  return (
                    parseProperties(
                      validationEnum.Required,
                      value["items"]["required"],
                      data,
                      [...path, `${key}[${index}]`]
                    )?.filter(Boolean) || []
                  );
                }
              );
              array2.push(...temp1);
            }
            if (value["items"]["properties"]) {
              const temp1 = tempValue.result.flatMap(
                (_: any, index: number) => {
                  return (
                    parseProperties(
                      validationEnum.Properties,
                      value["items"]["properties"],
                      data,
                      [...path, `${key}[${index}]`]
                    )?.filter(Boolean) || []
                  );
                }
              );
              array2.push(...temp1);
            }
          }
          if (value["items"]["anyOf"]) {
            const temp1 =
              parseProperties(
                validationEnum.Anyof,
                value["items"]["anyOf"],
                data,
                [...path, `${key}`]
              )?.filter(Boolean) || [];
            const tempArray = temp1?.some((e) => e?.success);
            if (tempArray) {
              array2.push(...[{ success: true, path: [] }]);
            } else {
              array2.push(...[{ success: false, path: [] }]);
            }
          }
          if (value["items"]["if"]) {
            array2.push(...(checkIf(value["items"], data, path) || []));
          }
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
          if (value["contains"]?.properties) {
            const tempValue = getValue(data, [...path, key]);
            let temp2: any = [];
            if (Array.isArray(tempValue)) {
              temp2 =
                parseProperties(
                  validationEnum.Properties,
                  { items: value["contains"]["properties"] },
                  data,
                  [...path, key]
                )?.filter(Boolean) || [];
            } else if (typeof tempValue === "object") {
              temp2 =
                parseProperties(
                  validationEnum.Properties,
                  value["contains"]["properties"],
                  data,
                  [...path, key]
                )?.filter(Boolean) || [];
            }

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
            array2.push(
              ...[
                {
                  success: false,
                  path: [...path, key],
                },
              ]
            );
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
                    message: `${key} has invalid value`,
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
          tempArray.push(...(temp || []));
        }
        if (e["properties"]) {
          const temp = parseProperties(
            validationEnum.Properties,
            e["properties"],
            data,
            path
          );
          tempArray.push(...(temp || []));
        }

        if (e["not"]) {
          const temp = parseProperties(
            validationEnum.Not,
            e["not"],
            data,
            path
          );
          tempArray.push(...(temp || []));
        }

        if (e["allOf"]) {
          const temp = parseProperties(
            validationEnum.AllOf,
            e["allOf"],
            data,
            path
          );
          tempArray.push(...(temp || []));
        }

        if (e["if"]) {
          tempArray.push(...(checkIf(e, data, path) || []));
        }
        const tempValue = tempArray.every((e) => e.success);
        if (tempValue) {
          array3.push(
            ...(tempArray.map((e) => {
              return {
                success: true,
                path: e.path,
                message: e.message,
              };
            }) || [])
          );
        } else {
          array3.push(
            ...(tempArray.map((e) => {
              return {
                success: false,
                path: e.path,
                message: e.message,
              };
            }) || [])
          );
        }
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
        array4.push(...(temp || []));
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
      return array4;
    default:
      break;
  }
};
