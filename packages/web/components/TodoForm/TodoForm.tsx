import React, { useContext } from 'react';
import { TextField } from '../TextField';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { TodoContext } from '../../contexts';
import { Todo } from '../../services';
import { useUpdateTodo } from './useUpdateTodo.hook';

export interface TodoFormProps {
  data: Todo;
}

function TodoForm({ data }: TodoFormProps): JSX.Element {
  const ctx = useContext(TodoContext);

  const { register, handleSubmit, onSubmit, errors, onStatusChange } = useUpdateTodo(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-16"
    >
      <div>
        <span>Id: {data.id}</span>
      </div>

      <TextField
        label="Task"
        type="text"
        className="mt-4"
        {...register('text', {
          required: 'Text is required',
        })}
        error={{
          type: errors.text?.type,
          message: errors.text?.message,
        }}
      />

      <div className="mt-4 flex items-center">
        <div>Completed:</div>
        <div className="ml-4 text-amber-500">{data.isCompleted ? 'True' : 'False'}</div>
        <button
          className="ml-4 flex items-center bg-amber-300 px-4 py-2"
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            await onStatusChange();
          }}
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <span className="ml-4">Change</span>
        </button>
      </div>

      <div className="my-8 flex space-x-4">
        <button
          type="submit"
          className={clsx('w-full rounded bg-amber-300 py-2')}
        >
          Update
        </button>
        <button
          className={clsx('w-full rounded bg-rose-500 py-2 text-neutral-50')}
          onClick={(e) => {
            e.preventDefault();
            ctx.setDeleteTodoId(data.id);
            ctx.setIsDeleteTodoOpen(true);
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
