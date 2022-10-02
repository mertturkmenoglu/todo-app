import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Popup, { PopupProps } from './Popup';
import 'intersection-observer';

describe('Popup Unit Tests', () => {
  let props: PopupProps;

  beforeEach(() => {
    props = {
      isOpen: true,
      setIsOpen: jest.fn(),
      title: 'Lorem Ipsum',
      children: <></>,
    };
  });

  it('Element should be on the page', () => {
    const component = render(
      <Popup {...props}>
        <div>Children</div>
      </Popup>
    );
    expect(component.container).toBeInTheDocument();
  });

  it('Should display the title', () => {
    const component = render(
      <Popup {...props}>
        <div>Children</div>
      </Popup>
    );

    const titleElement = component.getByText(props.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('Should display the children', () => {
    const component = render(
      <Popup {...props}>
        <div>Children</div>
      </Popup>
    );

    const childrenTextElement = component.getByText('Children');
    expect(childrenTextElement).toBeInTheDocument();
  });

  it('Should call the setIsOpen when close button is clicked', () => {
    const component = render(
      <Popup {...props}>
        <div>Children</div>
      </Popup>
    );
    const closeButton = component.getByTestId('popup-close-btn');
    fireEvent.click(closeButton);
    expect(props.setIsOpen).toBeCalled();
  });
});
