import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { axe } from '../utils';
import Pagination, { PaginationProps } from './Pagination';

describe('Pagination Unit Tests', () => {
  let props: PaginationProps;

  beforeEach(() => {
    props = {
      totalPages: 10,
      currentPage: 1,
      onItemClick: jest.fn(),
      onNextClick: jest.fn(),
      onPrevClick: jest.fn(),
    };
  });

  it('Element should be on the page', () => {
    const component = render(<Pagination {...props} />);
    expect(component.container).toBeInTheDocument();
  });

  it('Should trigger onNextClick when button is clicked', () => {
    const component = render(<Pagination {...props} />);
    const nextButton = component.getByTestId('next-btn');
    fireEvent(nextButton, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(props.onNextClick).toBeCalled();
  });

  it('Should not trigger onNextClick when it is the last page', () => {
    const component = render(
      <Pagination
        {...props}
        currentPage={10}
        totalPages={10}
      />
    );
    const nextButton = component.getByTestId('next-btn');
    fireEvent(nextButton, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(props.onNextClick).not.toBeCalled();
  });

  it('Should trigger onPrevClick when button is clicked', () => {
    const component = render(
      <Pagination
        {...props}
        currentPage={2}
      />
    );
    const prevButton = component.getByTestId('prev-btn');
    fireEvent(prevButton, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(props.onPrevClick).toBeCalled();
  });

  it('Should not trigger onPrevClick when its the first page', () => {
    const component = render(
      <Pagination
        {...props}
        currentPage={1}
      />
    );
    const prevButton = component.getByTestId('prev-btn');
    fireEvent(prevButton, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(props.onPrevClick).not.toBeCalled();
  });

  it('Should pass a11y tests', async () => {
    await act(async () => {
      const component = render(<Pagination {...props} />);
      const results = await axe.run(component.baseElement);
      expect(results.violations).toHaveLength(0);
    });
  });
});
