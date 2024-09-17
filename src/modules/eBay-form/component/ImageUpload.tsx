import { ModalCommon } from "@/components/common/ModalCommon";
import { IUploadProps } from "../types";
import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import { useState } from "react";

const ImageUpload: React.FC<IUploadProps> = ({
  name,
  watch,
  setValue,
  control,
  setError,
  clearErrors,
  errors,
}) => {
  const [addModelOpen, setAddModelOpen] = useState(false);

  const onAddModelClose = () => setAddModelOpen(false);

  return (
    <>
      <div onClick={() => setAddModelOpen(true)}>Upload Image</div>
      {addModelOpen && (
        <ModalCommon
          heading="Upload Image"
          onCancel={onAddModelClose}
          onConfirm={onAddModelClose}
          cancelButtonText="Cancel"
          confirmButtonText="Save">
          <MultipleImageUpload
            name={name}
            control={control}
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
            maxSize={8}
            allowedFormat={["image/png", "image/jpeg"]}
            setValue={setValue}
            watch={watch}
            className=""
          />
        </ModalCommon>
      )}
    </>
  );
};

export default ImageUpload;
