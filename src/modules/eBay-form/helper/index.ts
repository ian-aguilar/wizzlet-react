// import { variantOptionType } from "../types";

import { InputData } from "../types";

// Function to generate all possible combinations
export const generateCombinations = (
  arr: { name: string; value: string[] }[]
): any => {
  if (arr.length === 0) return [];
  if (arr.length === 1)
    return arr[0].value?.map((el) => [{ name: arr[0].name, value: el }]);

  const [first, ...rest] = arr;
  const restCombinations = generateCombinations(rest);
  const combinations: any = [];

  for (const item of first.value) {
    for (const restCombination of restCombinations) {
      combinations.push([
        { name: first.name, value: item },
        ...restCombination,
      ]);
    }
  }

  return combinations;
};

export const transformData = async (
  data: InputData
): Promise<{
  firstArray: ({ label: string; value: string } | undefined)[];
  secondArray: Record<string, string[]>;
}> => {
  const firstArray = data
    ?.map((item) => {
      if (item?.option && item?.meta?.aspectEnabledForVariations === true) {
        return {
          label: item?.name,
          value: item?.name,
        };
      }
    })
    .filter(Boolean);

  const secondArray: Record<string, string[]> = {};

  data?.forEach((item) => {
    const optionValues = item?.option?.map((opt) => opt?.value);
    secondArray[item.name] = optionValues;
  });

  return { firstArray, secondArray };
};

export const addAmazonVariantToCombinationsByIndex = (
  primaryData: any,
  secondaryData: any
) => ({
  ...primaryData,
  combinations: primaryData.combinations.map((combination, index) => {
    const variant = secondaryData[index];

    if (variant) {
      combination.quantity = variant?.quantity;
      combination.amazonVariant = {
        label: variant.name,
        value: variant.amazonVariantId,
      };
    }

    return combination;
  }),
});
