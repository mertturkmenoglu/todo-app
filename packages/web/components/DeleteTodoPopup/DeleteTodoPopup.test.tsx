import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import DeleteTodoPopup from './DeleteTodoPopup';
import { axe } from '../utils';
import { TodoContext, TodoContextState } from '../../contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'intersection-observer';

describe('DeleteTodoPopup Unit Tests', () => {
  let state: TodoContextState;

  beforeEach(() => {
    state = {
      setDeleteTodoId: jest.fn(),
      deleteTodoId: null,
      setIsDeleteTodoOpen: jest.fn(),
      isDeleteTodoOpen: false,
    };
  });

  afterEach(() => {
    cleanup();
  });

  const Wrapper: React.FC<{ children: React.ReactNode; ctxState: TodoContextState }> = ({ children, ctxState }) => {
    const client = new QueryClient();

    return (
      <QueryClientProvider client={client}>
        <TodoContext.Provider value={ctxState}>{children}</TodoContext.Provider>
      </QueryClientProvider>
    );
  };

  it('Element should be on the page', () => {
    const component = render(
      <Wrapper ctxState={state}>
        <DeleteTodoPopup />
      </Wrapper>
    );
    expect(component.container).toBeInTheDocument();
  });

  it('Should close the popup when clicked to close button', () => {
    const newState: TodoContextState = {
      ...state,
      isDeleteTodoOpen: true,
    };

    const component = render(
      <Wrapper ctxState={newState}>
        <DeleteTodoPopup />
      </Wrapper>
    );

    const closeButton = component.getByTestId('popup-close-btn');

    fireEvent.click(closeButton);

    expect(state.setIsDeleteTodoOpen).toBeCalledTimes(1);
    expect(state.setIsDeleteTodoOpen).toBeCalledWith(false);
  });

  it('Should close the popup when clicked to cancel button', () => {
    const newState: TodoContextState = {
      ...state,
      isDeleteTodoOpen: true,
    };

    const component = render(
      <Wrapper ctxState={newState}>
        <DeleteTodoPopup />
      </Wrapper>
    );

    const cancelButton = component.getByTestId('cancel-btn');

    fireEvent.click(cancelButton);

    expect(state.setIsDeleteTodoOpen).toBeCalledTimes(1);
    expect(state.setIsDeleteTodoOpen).toBeCalledWith(false);
  });

  it('Should pass a11y tests', async () => {
    await act(async () => {
      const component = render(
        <Wrapper ctxState={state}>
          <DeleteTodoPopup />
        </Wrapper>
      );
      const results = await axe.run(component.baseElement);
      expect(results.violations).toHaveLength(0);
    });
  });
});
