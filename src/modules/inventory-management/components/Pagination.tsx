import { useEffect, useState } from "react";
import { IPaginationProps } from "../types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from: number, to: number, step = 1): (number | string)[] => {
  let i = from;
  const range: (number | string)[] = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};
export const Pagination = ({
  totalRecords,
  pageLimit,
  pageNeighbors,
  onPageChanged,
  currentPage,
}: IPaginationProps) => {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [setTotalPages, pageLimit]);
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbors * 2 + 1;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, Number(currentPage) - pageNeighbors);
      const endPage = Math.min(totalPages - 1, Number(currentPage) + pageNeighbors);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          pages = [...pages, RIGHT_PAGE];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };
  const pages = fetchPageNumbers() || [];
  return (
    <div className="my-4">
      <nav>
        <ul className="flex">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li
                  key={index}
                  aria-hidden="true"
                  onClick={(e) => onPageChanged(e, Number(currentPage) - 1)}
                  className="cursor-pointer p-2 border border-1"
                >
                  <span>&lt; Prev</span>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li
                  key={index}
                  aria-hidden="true"
                  onClick={(e) => onPageChanged(e, Number(currentPage) + 1)}
                  className="cursor-pointer p-2 border border-1"
                >
                  <span>Next &gt;</span>
                </li>
              );

            return (
              <li
                key={index}
                aria-hidden="true"
                onClick={(e) => onPageChanged(e, page)}
                className={`${
                  currentPage === page ? "bg-green-500 text-white" : "cursor-pointer p-2 border border-1"
                } "cursor-pointer rounded-sm p-2 border border-1"`}
              >
                <span>{page == 1 ? `First` : page === totalPages ? `Last` : page}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
