// ** Packages **
import { FormProvider, useForm } from "react-hook-form";
import ItemDetails from "./components/ItemDetails";
import Category from "./components/Category";
import PackageDetails from "./components/PackageDetails";
import Price from "./components/Price";
import AdditionalDetails from "./components/AdditionalDetails";

// ** types **

// ** validations **

// ** common components **

// ** constant

// ** services

// ** helper function **

const AddItemForm = () => {
  const methods = useForm({});
  // const onSubmit = async (data) => {
  //     console.log(data);

  // };
  return (
    <FormProvider {...methods}>
      <ItemDetails />
      <Category />
      <PackageDetails />
      <Price />
      <AdditionalDetails />
    </FormProvider>
  );
};
export default AddItemForm;
