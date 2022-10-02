import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, render } from '@testing-library/react';
import DeleteTodoPopup from './DeleteTodoPopup';
import { axe } from '../utils';
import { TodoContext, TodoContextState } from '../../contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('DeleteTodoPopup Unit Tests', () => {
  const state: TodoContextState = {
    setDeleteTodoId: jest.fn(),
    deleteTodoId: null,
    setIsDeleteTodoOpen: jest.fn(),
    isDeleteTodoOpen: false,
  };

  afterEach(() => {
    cleanup();
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const client = new QueryClient();

    return (
      <QueryClientProvider client={client}>
        <TodoContext.Provider value={state}>{children}</TodoContext.Provider>
      </QueryClientProvider>
    );
  };

  it('Element should be on the page', () => {
    const component = render(
      <Wrapper>
        <DeleteTodoPopup />
      </Wrapper>
    );
    expect(component.container).toBeInTheDocument();
  });

  it('Should pass a11y tests', async () => {
    await act(async () => {
      const component = render(
        <Wrapper>
          <DeleteTodoPopup />
        </Wrapper>
      );
      const results = await axe.run(component.baseElement);
      expect(results.violations).toHaveLength(0);
    });
  });
});
