import { ModalCommon } from "@/components/common/ModalCommon";
import { IImageUpload, IUploadProps } from "../types";
import MultipleImageUpload from "@/components/form-fields/components/multipleFileField";
import { useForm } from "react-hook-form";

const ImageUpload: React.FC<IUploadProps> = ({
  onClose,
  onSubmitImages,
  name,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<IImageUpload>();

  const onSubmit = async (payload: IImageUpload) => {
    onSubmitImages(payload);
  };

  return (
    <ModalCommon
      heading="Upload Image"
      onCancel={onClose}
      onConfirm={handleSubmit(onSubmit)}
      cancelButtonText="Cancel"
      confirmButtonText="Save">
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </ModalCommon>
  );
};

export default ImageUpload;
