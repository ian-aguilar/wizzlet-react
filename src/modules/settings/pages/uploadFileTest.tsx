import FileUpload from "@/components/common/uploadFileCommon";

const FileUploadCommonComponentTest = () => {
  const handleFileSelect = (file: File | null) => {
    if (file) {
      console.log("Selected file:", file);
    } else {
      console.log("No file selected or validation failed.");
    }
  };

  return (
    <div>
      <h1 className="text-center mb-6">File Upload with Validation</h1>
      <FileUpload
        allowedImageTypes={["image/png", "image/jpeg"]}
        allowedVideoTypes={["video/mp4"]}
        maxImageSizeInMB={1} //size in mb
        maxVideoSizeInMB={10} //size in mb
        initialFileUrl="http://localhost:8000/uploads/knife.jpeg_1723201269898.jpeg"
        onFileSelect={handleFileSelect}
      />
    </div>
  );
};

export default FileUploadCommonComponentTest;
