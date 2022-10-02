import React from 'react';
import clsx from 'clsx';

export interface PaginationItemProps {
  paginationIndex: number;
  isCurrent: boolean;
  onClick: (index: number) => void;
}

export function PaginationItem({ paginationIndex, isCurrent, onClick }: PaginationItemProps): JSX.Element {
  return (
    <button
      className={clsx('flex items-center justify-center border p-2 font-mono', {
        'border-black text-black': !isCurrent,
        'border-amber-500 text-amber-500': isCurrent,
      })}
      onClick={() => onClick(paginationIndex)}
    >
      {paginationIndex}
    </button>
  );
}
