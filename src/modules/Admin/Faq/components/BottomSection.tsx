// ** Packages **
import {useFormContext} from "react-hook-form";

// ** types **
import {IForm} from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";

const BottomSection = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext<IForm>();

  return (
    <>
      <section>
        <h2 className="font-bold">Bottom Section</h2>
        <Input
          textLabelName="Title"
          placeholder="Title"
          name="bottomSection.titleBottom"
          label="Title"
          type="text"
          control={control}
          errors={errors}
        />

        <Input
          textLabelName="Description"
          placeholder="Description"
          name="bottomSection.descriptionBottom"
          label="Description"
          type="text"
          control={control}
          errors={errors}
        />

        <Input
          textLabelName="GreenButton content"
          placeholder="GreenButton"
          name="bottomSection.greenButton"
          label="GreenButton"
          type="text"
          control={control}
          errors={errors}
        />

        <Input
          textLabelName="whiteButton content"
          placeholder="WhiteButton"
          name="bottomSection.whiteButton"
          label="WhiteButton"
          type="text"
          control={control}
          errors={errors}
        />
      </section>
    </>
  );
};
export default BottomSection;
