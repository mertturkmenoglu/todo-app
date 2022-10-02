import React, { useContext } from 'react';
import { HomeContext } from '../../contexts';
import { useQueryClient } from '@tanstack/react-query';

function IncompleteSelector(): JSX.Element {
  const ctx = useContext(HomeContext);
  const queryClient = useQueryClient();

  return (
    <div className="mt-2 flex pl-2">
      <input
        type="checkbox"
        className="ml-2 accent-amber-300"
        defaultChecked={ctx.isOnlyIncomplete}
        onChange={async (e) => {
          ctx.setIsOnlyIncomplete(e.target.checked);
          await queryClient.invalidateQueries(['todos']);
        }}
      />
      <div className="ml-4">Show only incomplete items</div>
    </div>
  );
}

export default IncompleteSelector;
