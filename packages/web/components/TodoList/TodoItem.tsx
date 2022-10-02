import React, { useContext, useRef } from 'react';
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { Todo, TodoApi } from '../../services';
import { HomeContext } from '../../contexts';
import { toast } from 'react-toastify';

export interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const ctx = useContext(HomeContext);
  const router = useRouter();
  const todoApi = useRef(new TodoApi());

  return (
    <>
      <div className="flex w-2/3 items-center">
        <input
          type="checkbox"
          className="accent-amber-300"
          defaultChecked={todo.isCompleted}
          onChange={async (e) => {
            const res = await todoApi.current.updateTodo(todo.id, { isCompleted: e.target.checked });
            const msg = res ? 'Updated' : 'Error happened';
            toast(msg, {
              autoClose: 1000,
              type: res ? 'success' : 'error',
            });
          }}
        />
        <div className="ml-4">{todo.text}</div>
      </div>
      <div className="flex items-center">
        <button
          className="ml-4 rounded-full bg-amber-300 p-2"
          onClick={async () => {
            await router.push(`/todo/${todo.id}`);
          }}
        >
          <ArrowTopRightOnSquareIcon className="h-5 w-5 text-black" />
        </button>
        <button
          className="ml-4 rounded-full bg-amber-300 p-2"
          onClick={() => {
            ctx.setDeleteTodoId(todo.id);
            ctx.setIsDeleteTodoOpen(true);
          }}
        >
          <TrashIcon className="h-5 w-5 text-black" />
        </button>
      </div>
    </>
  );
}

export default TodoItem;
