import React, { useContext } from 'react';
import { Popup } from '../Popup';
import { HomeContext } from '../../contexts';

function DeleteTodoPopup(): JSX.Element {
  const ctx = useContext(HomeContext);

  return (
    <Popup
      title="Delete Todo"
      isOpen={ctx.isDeleteTodoOpen}
      setIsOpen={ctx.setIsDeleteTodoOpen}
    >
      <div className="w-full">
        <div>Are you sure you want to delete this item?</div>

        <div className="mt-16 flex w-full space-x-4">
          <button className="w-full rounded bg-rose-500 py-2 text-neutral-50">Delete</button>
          <button
            className="w-full rounded border border-neutral-500 py-2 text-neutral-800 hover:bg-neutral-500 hover:text-neutral-50"
            onClick={() => ctx.setIsDeleteTodoOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default DeleteTodoPopup;
