import React, { useMemo } from 'react';
import { PaginationArrow } from './PaginationArrow';
import { PaginationItem } from './PaginationItem';
import { getPaginationNumbers } from './utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onItemClick: (index: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

function Pagination({ currentPage, totalPages, onItemClick, onNextClick, onPrevClick }: PaginationProps): JSX.Element {
  const isFirst = useMemo(() => currentPage === 1, [currentPage]);
  const isLast = useMemo(() => currentPage === totalPages, [currentPage, totalPages]);

  const numbers = useMemo(() => {
    return getPaginationNumbers(currentPage, totalPages);
  }, [totalPages, currentPage]);

  return (
    <nav
      role="pagination"
      className="flex items-center space-x-4"
    >
      <PaginationArrow
        type="prev"
        onClick={onPrevClick}
        isFirst={isFirst}
        isLast={isLast}
      />

      <ol className="flex items-center space-x-2">
        {numbers.map((paginationIndex) => (
          <li key={paginationIndex}>
            <PaginationItem
              paginationIndex={paginationIndex}
              isCurrent={paginationIndex === currentPage}
              onClick={onItemClick}
            />
          </li>
        ))}
      </ol>

      <PaginationArrow
        type="next"
        onClick={onNextClick}
        isFirst={isFirst}
        isLast={isLast}
      />
    </nav>
  );
}

export default Pagination;
