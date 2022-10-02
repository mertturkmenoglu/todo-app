import React from 'react';
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { Todo } from '../../services';

export interface TodoItemProps {
  todo: Todo;
  setDeleteItemId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDeleteTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoItem({ todo, setDeleteItemId, setIsDeleteTodoOpen }: TodoItemProps): JSX.Element {
  const router = useRouter();

  return (
    <>
      <div className="flex w-2/3 items-center">
        <input
          type="checkbox"
          className="accent-amber-300"
          defaultChecked={todo.completed}
          onChange={(e) => {
            console.log(e.target.checked, todo.id);
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
            setDeleteItemId(todo.id);
            setIsDeleteTodoOpen(true);
          }}
        >
          <TrashIcon className="h-5 w-5 text-black" />
        </button>
      </div>
    </>
  );
}

export default TodoItem;
