export function getPaginationNumbers(currentPage: number, totalPages: number): number[] {
  const fill = (arr: unknown[], startAt: number) => arr.fill(0).map((_, index) => index + startAt);

  if (totalPages <= 3) {
    return fill(new Array(totalPages), 1);
  }

  if (totalPages <= 5) {
    return fill(new Array(5), 1);
  }

  if (currentPage > totalPages - 3) {
    return fill(new Array(5), totalPages - 4);
  }

  return fill(new Array(5), Math.max(currentPage - 2, 1));
}
