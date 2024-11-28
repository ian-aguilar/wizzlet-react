import React, { useState, useCallback, useEffect } from "react";

interface FileUploadProps {
  allowedImageTypes: string[];
  allowedVideoTypes: string[];
  maxImageSizeInMB: number;
  maxVideoSizeInMB: number;
  initialFileUrl?: string; // Optional URL for initial preview
  onFileSelect: (file: File | null, url?: string) => void; // Include URL in the callback
}

const FileUpload: React.FC<FileUploadProps> = ({
  allowedImageTypes,
  allowedVideoTypes,
  maxImageSizeInMB,
  maxVideoSizeInMB,
  initialFileUrl,
  onFileSelect,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(initialFileUrl || null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (initialFileUrl) {
      setPreview(initialFileUrl);
      // Determine file type from URL extension
      const ext = initialFileUrl.split(".").pop();
      if (["jpg", "jpeg", "png"].includes(ext || "")) {
        setFileType("image");
      } else if (ext === "mp4") {
        setFileType("video");
      }
    }
  }, [initialFileUrl]);

  const validateFile = (file: File): boolean => {
    const fileType = file.type;
    const fileSizeInMB = file.size / 1024 / 1024;

    if (allowedImageTypes.includes(fileType)) {
      if (fileSizeInMB > maxImageSizeInMB) {
        setError(
          `Image is too large. Maximum size allowed is ${maxImageSizeInMB}MB.`
        );
        return false;
      }
      setFileType("image");
    } else if (allowedVideoTypes.includes(fileType)) {
      if (fileSizeInMB > maxVideoSizeInMB) {
        setError(
          `Video is too large. Maximum size allowed is ${maxVideoSizeInMB}MB.`
        );
        return false;
      }
      setFileType("video");
    } else {
      setError(
        `File type not allowed. Only images (${allowedImageTypes.join(
          ", "
        )}) and videos (${allowedVideoTypes.join(", ")}) are accepted.`
      );
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && validateFile(file)) {
      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);
      setFileType(file.type.startsWith("image/") ? "image" : "video");
      onFileSelect(file, newPreview);
    } else {
      setPreview(null);
      onFileSelect(null);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && validateFile(file)) {
        const newPreview = URL.createObjectURL(file);
        setPreview(newPreview);
        setFileType(file.type.startsWith("image/") ? "image" : "video");
        onFileSelect(file, newPreview);
      } else {
        setPreview(null);
        onFileSelect(null);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoxClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleClear = () => {
    setPreview(initialFileUrl || null);
    setFileType(null);
    setError(null);
    onFileSelect(null, initialFileUrl || undefined);
  };

  return (
    <div className="text-center">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBoxClick}
        className={`border-2 border-dashed border-gray-300 rounded-lg p-12 mt-4 cursor-pointer bg-gray-100 max-w-lg mx-auto relative ${
          preview ? "bg-transparent" : ""
        }`}>
        {preview ? (
          fileType === "image" ? (
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-80 object-contain"
            />
          ) : (
            <video controls className="max-w-full max-h-80 object-contain">
              <source src={preview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <p className="text-gray-600 text-lg">Upload your file</p>
        )}
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {preview && preview !== initialFileUrl && (
        <button
          onClick={handleClear}
          className="mt-4 block mx-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
          Clear
        </button>
      )}
    </div>
  );
};

export default FileUpload;
