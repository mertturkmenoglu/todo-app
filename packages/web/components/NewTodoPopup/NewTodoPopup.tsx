import React, { useContext } from 'react';
import { TextField } from '../TextField';
import { Popup } from '../Popup';
import { HomeContext } from '../../contexts';
import { useNewTodo } from './useNewTodo.hook';

function NewTodoPopup(): JSX.Element {
  const ctx = useContext(HomeContext);
  const { register, handleSubmit, onSubmit, errors } = useNewTodo();

  return (
    <Popup
      title="New Todo"
      isOpen={ctx.isNewTodoOpen}
      setIsOpen={ctx.setIsNewTodoOpen}
    >
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <TextField
            label="Text"
            placeholder="Enter a task"
            {...register('text', {
              required: 'Text is required',
            })}
            error={{
              type: errors.text?.type,
              message: errors.text?.message,
            }}
          />

          <button className="mt-16 w-full rounded bg-amber-300 py-2 text-black">Create</button>
        </form>
      </>
    </Popup>
  );
}

export default NewTodoPopup;
