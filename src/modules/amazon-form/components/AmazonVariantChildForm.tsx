import FormBuilder from "@/components/form-builder";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { IAmazonVariantChildProps } from "../types";

export const AmazonVariantChildForm = (props: IAmazonVariantChildProps) => {
  const { control, errors, watch, variationProperties } = props;

  return (
    <form>
      {variationProperties && variationProperties.length > 0 && (
        <div>
          <FormBuilder
            control={control}
            errors={errors}
            fields={variationProperties as any}
            watch={watch as any}
          />

          <div className="flex justify-between">
            <Button
              showType={btnShowType.primary}
              btnName="Save"
              type="submit"
              btnClass="mt-6 !text-base"
            />

            <Button
              showType={btnShowType.primary}
              btnName="Save and list in Amazon"
              btnClass="mt-6 !text-base !bg-greenPrimary !text-white "
              // isLoading={listInAmazonLoading}
              type="button"
              onClickHandler={async () => {
                // setListInAmazonLoading(true);
                // await handleSubmit(
                //   onSubmit.bind(this, AmazonSaveType.SaveInAmazon)
                // )();
                // setListInAmazonLoading(false);
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
};
