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
