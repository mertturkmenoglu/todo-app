import React, { useMemo } from 'react';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export interface PaginationArrowProps {
  type: 'prev' | 'next';
  isFirst: boolean;
  isLast: boolean;
  onClick: () => void;
}

export function PaginationArrow({ isFirst, isLast, onClick, type }: PaginationArrowProps): JSX.Element {
  const isDisabled = useMemo(
    () => (isFirst && type === 'prev') || (isLast && type === 'next'),
    [isFirst, isLast, type]
  );

  return (
    <button
      onClick={onClick}
      className={clsx('border p-2', {
        'cursor-pointer border-amber-500': !isDisabled,
        'cursor-not-allowed border-neutral-500 ': isDisabled,
      })}
      disabled={isDisabled}
    >
      {type === 'prev' && (
        <ChevronLeftIcon
          className={clsx('h-5 w-5', {
            'text-amber-500': !isDisabled,
            'text-neutral-500': isDisabled,
          })}
        />
      )}
      {type === 'next' && (
        <ChevronRightIcon
          className={clsx('h-5 w-5', {
            'text-amber-500': !isDisabled,
            'text-neutral-500': isDisabled,
          })}
        />
      )}
    </button>
  );
}
