// ** Packages **
import ReactPaginate from "react-paginate";

// ** Types **
import { IPaginationProps } from "../types";
import { LeftArrowIcon } from "@/assets/Svg";

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
      pageCount={Math.ceil(totalRecords / pageLimit)}
      onPageChange={onPageChanged}
      forcePage={Number(currentPage) - 1} 
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      previousLabel={
        <LeftArrowIcon
          className={`min-h-10 ml-4 ${
            Number(currentPage) === 1 ? `opacity-50 cursor-not-allowed` : ``
          }`}
        />
      }
      nextLabel={
        <LeftArrowIcon
          className={`min-h-10 rotate-180 mr-4 ${
            Number(currentPage) === Math.ceil(totalRecords / pageLimit)
              ? `opacity-50 cursor-not-allowed`
              : ``
          }`}
        />
      }
      pageClassName="px-4 py-2"
      activeClassName="bg-greenPrimary text-white rounded-md"
      disabledClassName="opacity-50 cursor-none"
      containerClassName="flex bg-inputAuthBg/60 space-x-2 my-2 py-1 rounded-md"
    />
  );
};
