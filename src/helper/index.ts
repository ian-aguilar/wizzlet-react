import axios from "axios";
import moment from "moment";
import { MutableRefObject } from "react";
import { FieldErrors } from "react-hook-form";

export const stringToBoolean = (value: any) => {
  if (value === "true" || value === true || value === "1") {
    return true;
  }
  if (value === "false" || value === false || value === "0") {
    return false;
  }
  return false;
};

export const convertIntoInt = (value: string | number | null | undefined) => {
  return value && !Number.isNaN(Number(value))
    ? Math.round(Number(value))
    : null;
};

export const convertIntoNumber = (
  value: string | number | null | undefined
) => {
  if (typeof value === "string") {
    value = value.replaceAll(",", "");
  }
  return value && !Number.isNaN(Number(value)) ? Number(value) : null;
};

export const setDateType = (value: string | Date | null | undefined) => {
  if (value) {
    if (!Number.isNaN(new Date(value).getTime())) {
      return new Date(value);
    }
    return null;
  }
  return null;
};

export const downloadAttachmentFile = async ({
  url,
  fileName,
}: {
  url: string;
  fileName: string;
}) => {
  const originalImage = `${url}`;
  const linkTag = document.createElement("a");
  linkTag.download = fileName;

  const response = await axios(originalImage, {
    headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Expires: "0" },
    responseType: "blob",
  });

  linkTag.href = URL.createObjectURL(response.data);
  linkTag.click();
};

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
};

export const focusOnError = (
  ref: MutableRefObject<Record<string, HTMLDivElement | null>>,
  errors: FieldErrors<any> | undefined = {}
) => {
  const firstErrorKey = Object.keys(errors)?.[0];

  if (firstErrorKey && Object.hasOwn(ref?.current, firstErrorKey)) {
    ref?.current?.[firstErrorKey]?.scrollIntoView();
  }
};

export const dateFormatter = (date: string | Date, withTime = false) => {
  return moment(date).format("MMM DD,yyyy" + (withTime ? " mm:hh A" : ""));
};
