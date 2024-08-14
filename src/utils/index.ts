import { ATTACHMENT_FILE_TYPES } from "@/constants";

export const checkFileFormat = (props: {
  allowedFormat?: string[];
  errorMsgArr: string[];
  type: string;
}) => {
  const { allowedFormat = [], type } = props;

  // Determine which formats to use for validation
  const formatsToCheck = allowedFormat.length
    ? allowedFormat
    : Object.values(ATTACHMENT_FILE_TYPES);

  // Check if the file type is in the allowed formats
  const isAllowedFormat = formatsToCheck.includes(type);

  if (!isAllowedFormat) {
    // Format the error message string correctly
    const formatString = formatsToCheck.join(", ");
    const errorMessage = `Only ${formatString} format${
      formatsToCheck.length > 1 ? "s are" : " is"
    } allowed`;
    return [errorMessage];
  }

  return [];
};

export const fileSizeGenerator = (fileSize: number) => {
  const sizeType = ["KB", "MB", "GB", "bytes"];
  if (fileSize < 1024) {
    return { size: fileSize.toFixed(1), sizeType: sizeType[3] }; // Display in BYTES
  }

  let i = -1;
  let size = fileSize;
  while (size > 1024) {
    size /= 1024;
    i++;
  }

  return { size: Math.max(size, 0.1).toFixed(1), sizeType: sizeType[i] };
};
