import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
  control: () => ({
    borderRadius: "10px",
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#F8F8F8",
    border: "1px solid rgb(0 0 0 / 0.05)",
    padding: "9px 8px",
    fontFamily: "BeVietnamProR, sans-serif",
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    position: "relative",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    alignSelf: "flex-start",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#777777",
    borderRadius: "5px",
    cursor: "pointer",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#ffffff",
    backgroundColor: "",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#ffffff",
    },
    padding: "0 2px",
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 100,
    backgroundColor: "#F8F8F8",
    borderColor: "rgb(0 0 0 / 0.05)",
    border: "1px solid rgb(0 0 0 / 0.05)",
    boxShadow: "0px 0 10px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: "10px",
  }),
  menuList: (provided) => ({
    ...provided,
    color: "#000000",
    backgroundColor: "#F8F8F8",
    borderRadius: "10px",
  }),
  input: (provided) => ({
    ...provided,
    position: "absolute",
    color: "#000000",
    backgroundColor: "transparent",
    margin: "0",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000000",
    fontSize: " 16px",
    lineHeight: " 24px",
    fontWeight: " 400",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#d6e1dc"
      : state?.isDisabled
      ? "#d6e1dc"
      : "#F8F8F8",

    color: state?.isDisabled ? "#bbabab" : "#000000",
    padding: "10px 12px",
    borderBottom: "1px solid rgb(0 0 0 / 0.05)",
    cursor: state?.isDisabled ? "not-allowed" : "pointer",
    "&:hover": {
      backgroundColor: state?.isDisabled ? "#d6e1dc" : "#d6e1dc",
    },
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    backgroundColor: "#d6e1dc",
    "&:hover": {
      backgroundColor: "#d6e1dc",
    },
  }),
  placeholder: (provided) => {
    return {
      ...provided,
      position: "absolute",
      display: "inline-block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
      color: "rgb(0 0 0 / 0.6)",
      fontSize: " 16px",
      lineHeight: " 24px",
      fontWeight: " 500",
      letterSpacing: " 0.05em",
    };
  },
};
