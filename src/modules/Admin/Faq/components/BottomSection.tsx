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
          placeholder="Enter Title"
          name="bottomSection.title"
          label="Title"
          type="text"
          control={control}
          errors={errors}
        />

        <Input
          textLabelName="Description"
          placeholder="Enter Description"
          name="bottomSection.description"
          label="Description"
          type="text"
          control={control}
          errors={errors}
        />

        <Input
          textLabelName="GreenButton "
          placeholder="Enter GreenButton Name"
          name="bottomSection.greenButton"
          label="GreenButton"
          type="text"
          control={control}
          errors={errors}
        />

        <Input
          textLabelName="whiteButton content"
          placeholder="Enter WhiteButton Name"
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
