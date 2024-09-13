import { variantOptionType } from "../types";

// Function to generate all possible combinations
export const generateCombinations = (
  arr: { name: string; value: string[] }[]
): variantOptionType => {
  if (arr.length === 0) return [];
  if (arr.length === 1)
    return arr[0].value.map((el) => [{ name: arr[0].name, value: el }]);

  const [first, ...rest] = arr;
  const restCombinations = generateCombinations(rest);
  const combinations: variantOptionType = [];

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
