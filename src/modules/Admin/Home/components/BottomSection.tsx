// ** Packages **
import { useFormContext } from "react-hook-form";

// ** types **
import { IForm } from "../types";

// ** common components **
import Input from "@/components/form-fields/components/Input";
import { TextArea } from "@/components/common/TextArea";

const BottomSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IForm>();

  return (
    <>
      {" "}
      <section>
        <h2 className="font-bold text-[22px] text-blackPrimary bg-grayLightBody/20 py-3 px-5 rounded-t-md ">
          Bottom Section
        </h2>
        <div className=" py-3 px-5 border-l border-r border-b  mb-6 rounded-b-md ">
          <Input
            textLabelName="Title"
            placeholder="Enter Title"
            name="bottomSection.title"
            label="Title"
            type="text"
            control={control}
            errors={errors}
          />

          {/* <Input
            textLabelName="Description"
            placeholder="Enter Description"
            name="bottomSection.description"
            label="Description"
            type="text"
            control={control}
            errors={errors}
          /> */}
          <TextArea textareaLabel="Description" />

          <div className="grid grid-cols-12 lg:gap-4">
            <div className=" col-span-12 lg:col-span-6">
              <Input
                textLabelName="GreenButton "
                placeholder="Enter GreenButton Name"
                name="bottomSection.greenButton"
                label="GreenButton"
                type="text"
                control={control}
                errors={errors}
              />
            </div>
            <div className=" col-span-12 lg:col-span-6">
              <Input
                textLabelName="whiteButton content"
                placeholder="Enter WhiteButton Name"
                name="bottomSection.whiteButton"
                label="WhiteButton"
                type="text"
                control={control}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default BottomSection;
