import { FilterBoxProps } from "../types";

export const FilterBox = ({ label, isOpen, children }: FilterBoxProps) => {
  return (
    <div>
      {isOpen ? (
        <div className="z-10 absolute bg-white p-4 rounded-md shadow-sm shadow-slate-400 custom-select-wrap -left-64">
          <p className="text-base text-grayText">{label}</p>
          {children && <div className="modalBody">{children}</div>}
        </div>
      ) : null}
    </div>
  );
};
