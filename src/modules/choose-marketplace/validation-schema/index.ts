import * as yup from "yup";
import { IChooseMarketplace } from "../types";

export const chooseMarketplaceValidationSchema: yup.ObjectSchema<IChooseMarketplace> = yup.object().shape({
  marketplace: yup.array().min(1,"Select at least one marketplace"),
});
