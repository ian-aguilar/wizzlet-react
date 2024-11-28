import React from "react";
import { FormData } from "../types";

export const addMarketplaceForms = (
  marketplaces: string[],
  formArray: FormData[],
  setStepData: React.Dispatch<React.SetStateAction<FormData[]>>
) => {
  let currentMaxId = formArray.reduce((max, form) => Math.max(max, form.id), 0);

  marketplaces.forEach((marketplace) => {
    // Check if the form with the same label already exists
    const existingForm = formArray.find((form) => form.label === marketplace);

    // If it doesn't exist, add the new entry
    if (!existingForm) {
      currentMaxId += 1;

      formArray.push({
        id: currentMaxId,
        label: marketplace,
        description: `${marketplace} form`,
      });
    }
  });

  setStepData(() => [...formArray]);
};

export const filterAndResetIds = (
  originalArray: FormData[],
  labelsToKeep: string[]
): void => {
  // Remove unwanted elements starting from index 2
  for (let i = originalArray.length - 1; i >= 2; i--) {
    const item = originalArray[i];
    if (!labelsToKeep.includes(item.label)) {
      originalArray.splice(i, 1); // Remove the element if label does not match
    }
  }

  // Reset the IDs based on the remaining items in the array
  originalArray.forEach((item, index) => {
    item.id = index + 1; // Set ID to be index + 1
  });
};
