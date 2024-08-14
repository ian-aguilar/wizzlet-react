import Input from "@/components/form-fields/components/Input";
import {useFormContext} from "react-hook-form";

const ItemDetails = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  return (
    <>
      <section>
        <h2 className="font-bold">Item Details</h2>
        title description brand select condition select primary color quantity
        sku zipcode
        <Input
          name="title"
          textLabelName="Title"
          placeholder="Enter Title"
          label="Title"
          type="text"
          control={control}
          errors={errors}
        />
        <Input
          name="description"
          textLabelName="Description"
          placeholder="Enter Description"
          label="Description"
          type="text"
          control={control}
          errors={errors}
        />
        <Input
          name="zipcode"
          textLabelName="Zip code"
          placeholder="Enter Zip code"
          label="Zip code"
          type="text"
          control={control}
          errors={errors}
        />
      </section>
    </>
  );
};

export default ItemDetails;
