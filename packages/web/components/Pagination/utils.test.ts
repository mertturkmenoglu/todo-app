import { getPaginationNumbers } from './utils';

describe('Pagination Utils Unit Tests', () => {
  it('Should return empty array when Total=3', () => {
    const currentPage = 0;
    const totalPages = 0;
    const expected: number[] = [];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });

  it('Should return identity array when Total=1', () => {
    const currentPage = 1;
    const totalPages = 1;
    const expected = [1];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });

  it('Should assert true when current is 1 and total is less than 5', () => {
    const currentPage = 1;
    const totalPages = 3;
    const expected = [1, 2, 3];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });

  it('Should assert true when current is 1 and total is equal to 5', () => {
    const currentPage = 1;
    const totalPages = 5;
    const expected = [1, 2, 3, 4, 5];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });

  it('Should assert true when default case', () => {
    const currentPage = 4;
    const totalPages = 10;
    const expected = [2, 3, 4, 5, 6];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });

  it('Should assert true when default case and totalPages is greater than 10', () => {
    const currentPage = 8;
    const totalPages = 20;
    const expected = [6, 7, 8, 9, 10];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });

  it('Should assert true when current is greater than totalPages-3', () => {
    const currentPage = 8;
    const totalPages = 10;
    const expected = [6, 7, 8, 9, 10];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });

  it('Should assert true when current and total are equal', () => {
    const currentPage = 10;
    const totalPages = 10;
    const expected = [6, 7, 8, 9, 10];
    const actual = getPaginationNumbers(currentPage, totalPages);
    expect(actual).toStrictEqual(expected);
  });
});
