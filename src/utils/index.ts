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

export const openSmallTab = (url:string) => {
  const width = 500; // Width of the popup window
  const height = 600; // Height of the popup window
  const left = (window.screen.width - width) / 2; // Center horizontally
  const top = (window.screen.height - height) / 2; // Center vertically

  window.open(
    url,
    '_blank', // Opens in a new tab or window
    `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes`
  );
}