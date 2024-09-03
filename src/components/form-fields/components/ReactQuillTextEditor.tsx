import { ErrorMessage } from "@hookform/error-message";
import { IReactQuillProps } from "../types";
import { Controller, FieldValues } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillTextEditor = <T extends FieldValues>({
  placeholder,
  control,
  name,
  modules,
  errors,
  className,
}: IReactQuillProps<T>) => {
  return (
    <div className="mb-2">
      <Controller
        name={name}
        control={control}
        render={({field: {onChange,value,onBlur} }) => (
          <ReactQuill
            className={className}
            theme="snow"
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
            ]}
            placeholder={placeholder}
            modules={modules}
            onBlur={onBlur}
            onChange={onChange} // Handle text editor content changes
            value={value} // Set the value of the text editor in content
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className="errorText text-red-600 font-medium text-sm">{message}</span>}
      />
    </div>
  );
};

export default ReactQuillTextEditor;
