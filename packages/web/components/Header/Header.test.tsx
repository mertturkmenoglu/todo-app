import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import Header, { HeaderProps } from './Header';
import { axe } from '../utils';

describe('Header Unit Tests', () => {
  let props: HeaderProps;

  beforeEach(() => {
    props = {
      variant: 'default',
    };
  });

  it('Element should be on the page', () => {
    const component = render(<Header {...props} />);
    expect(component.container).toBeInTheDocument();
  });

  it('Should display login link when variant=landing', () => {
    const component = render(
      <Header
        {...props}
        variant="landing"
      />
    );

    const loginLink = component.getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

  it('Should not display login link when variant=auth', () => {
    const component = render(
      <Header
        {...props}
        variant="auth"
      />
    );

    const loginLink = component.queryByText('Login');
    expect(loginLink).not.toBeInTheDocument();
  });

  it('Should display My Account link when variant=default', () => {
    const component = render(
      <Header
        {...props}
        variant="default"
      />
    );

    const myAccountLink = component.queryByText('My Account');
    expect(myAccountLink).toBeInTheDocument();
  });

  it('Should display logout button when variant=default', () => {
    const component = render(
      <Header
        {...props}
        variant="default"
      />
    );

    const myAccountLink = component.queryByText('Logout');
    expect(myAccountLink).toBeInTheDocument();
  });

  it('Should pass a11y tests', async () => {
    await act(async () => {
      const component = render(<Header {...props} />);
      const results = await axe.run(component.baseElement);
      expect(results.violations).toHaveLength(0);
    });
  });
});
