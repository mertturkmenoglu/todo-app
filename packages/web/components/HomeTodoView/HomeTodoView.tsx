import React from 'react';
import { TodoList } from '../TodoList';

function HomeTodoView(): JSX.Element {
  return (
    <div className="mt-4 w-full">
      <TodoList />
    </div>
  );
}

export default HomeTodoView;
