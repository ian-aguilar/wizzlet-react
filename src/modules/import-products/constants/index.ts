import { ImportTab } from "../types";

export const markeplaces = [
  { label: "Ebay", value: "ebay" },
  { label: "Amazon", value: "amazon" },
];

export const switchButton = [ImportTab.NOT_IMPORTED, ImportTab.IMPORTED];

export const pageLimitStyle = {
  singleValue: (base: any) => ({
    ...base,
    color: "#000000",
    fontSize: "16px",
    lineHeight: "18px",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#ddd",
    paddingRight: "0px",
  }),
  control: (base: any) => ({
    ...base,
    background: "transparent",
    border: "1px solid rgb(31 77 161 / 0.2) !important",
    padding: "3px 7px",
    boxSizing: "border-box",
    borderRadius: "5px",
    boxShadow: "none",
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingLeft: "0px",
  }),
  colors: {
    text: "#fff",
  },
};

export const newestBoxStyle = {
  singleValue: (base: any) => ({
    ...base,
    color: "#fff",
    fontSize: "16px",
    lineHeight: "18px",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#ddd",
    paddingRight: "0px",
  }),
  control: (base: any) => ({
    ...base,
    background: "transparent",
    border: "1px solid rgb(31 77 161 / 0.2) !important",
    padding: "3px 7px",
    boxSizing: "border-box",
    borderRadius: "5px",
    boxShadow: "none",
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingLeft: "0px",
  }),
};

export const selectedMarketplaceStyle = {
  singleValue: (base: any) => ({
    ...base,
    color: "#fff !important",
    fontSize: "16px",
    lineHeight: "18px",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#fff  !important",
    paddingRight: "0px",
  }),
  control: (base: any) => ({
    ...base,
    background: "#09A17A",
    border: "1px solid rgb(31 77 161 / 0.2) !important",
    padding: "3px 14px",
    boxSizing: "border-box",
    borderRadius: "5px",
    boxShadow: "none",
    color: "#fff ",
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingLeft: "0px",
    color: "#fff",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#fff",
  }),
};
