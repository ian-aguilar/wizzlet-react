// ** Packages **
import ReactPaginate from "react-paginate";

// ** Types **
import { IPaginationProps } from "../types";
import { LeftArrowIcon } from "@/assets/Svg";
import { spawn } from "child_process";

export const Pagination = ({
  totalRecords,
  pageLimit,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 2,
  onPageChanged,
  currentPage,
}: IPaginationProps) => {
  return (
    <ReactPaginate
      className=""
      pageCount={Math.ceil(totalRecords / pageLimit)}
      onPageChange={onPageChanged}
      forcePage={Number(currentPage) - 1}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      previousLabel={
        <LeftArrowIcon
          className={`w-4 h-4 min-w-4  ml-1 mt-1.5 ${
            Number(currentPage) === 1 ? `opacity-50 cursor-not-allowed` : ``
          }`}
        />
      }
      nextLabel={
        <LeftArrowIcon
          className={`w-4 h-4 min-w-4  mr-1 mt-1.5 rotate-180  ${
            Number(currentPage) === Math.ceil(totalRecords / pageLimit)
              ? `opacity-50 cursor-not-allowed`
              : ``
          }`}
        />
      }
      pageLinkClassName="w-7 h-7 min-w-7 flex justify-center items-center "
      pageClassName=""
      activeClassName="bg-greenPrimary text-white rounded-md w-7 h-7 min-w-7 flex justify-center items-center "
      disabledClassName="opacity-50 cursor-none"
      containerClassName="flex  gap-2 py-1 rounded-md"
    />
  );
};
