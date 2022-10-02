import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { axe } from '../utils';
import { HomeContext, HomeContextState } from '../../contexts';
import { HomeTitle } from './index';

describe('HomeTitle Unit Tests', () => {
  const state: HomeContextState = {
    isOnlyIncomplete: false,
    setIsOnlyIncomplete: jest.fn(),
    isDeleteTodoOpen: false,
    setIsDeleteTodoOpen: jest.fn(),
    searchTerm: '',
    setSearchTerm: jest.fn(),
    paginationIndex: 1,
    setPaginationIndex: jest.fn(),
    isNewTodoOpen: false,
    setIsNewTodoOpen: jest.fn(),
  };

  afterEach(() => {
    cleanup();
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <HomeContext.Provider value={state}>{children}</HomeContext.Provider>;
  };

  it('Element should be on the page', () => {
    const component = render(
      <Wrapper>
        <HomeTitle />
      </Wrapper>
    );

    expect(component.container).toBeInTheDocument();
  });

  it('Should display the title correctly', () => {
    const component = render(
      <Wrapper>
        <HomeTitle />
      </Wrapper>
    );

    const titleText = 'My Todos';
    const titleElement = component.getByText(titleText);

    expect(titleElement).toBeInTheDocument();
  });

  it('Should update new todo state', () => {
    const component = render(
      <Wrapper>
        <HomeTitle />
      </Wrapper>
    );

    const newTodoButton = component.getByRole('button');
    fireEvent.click(newTodoButton);

    expect(state.setIsNewTodoOpen).toBeCalledTimes(1);
    expect(state.setIsNewTodoOpen).toBeCalledWith(true);
  });

  it('Should pass a11y tests', async () => {
    await act(async () => {
      const component = render(
        <Wrapper>
          <HomeTitle />
        </Wrapper>
      );
      const results = await axe.run(component.baseElement);
      expect(results.violations).toHaveLength(0);
    });
  });
});
