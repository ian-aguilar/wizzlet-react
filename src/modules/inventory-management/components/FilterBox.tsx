import { FilterBoxProps } from "../types";

export const FilterBox = ({
  label,
  isOpen,
  children,
  clearButton,
}: FilterBoxProps) => {
  return (
    <div>
      {isOpen ? (
        <div className="z-10 absolute bg-white p-4 rounded-md shadow-sm shadow-slate-400 custom-select-wrap -left-64">
          <div className="flex justify-between">
            <p className="text-end text-grayText">{label}</p>
            <div>{clearButton}</div>
          </div>
          {children && <div className="modalBody">{children}</div>}
        </div>
      ) : null}
    </div>
  );
};
