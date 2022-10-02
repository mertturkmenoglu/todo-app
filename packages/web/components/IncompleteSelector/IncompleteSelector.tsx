import React, { useContext } from 'react';
import { HomeContext } from '../../contexts';

function IncompleteSelector(): JSX.Element {
  const ctx = useContext(HomeContext);

  return (
    <div className="mt-2 flex pl-2">
      <input
        type="checkbox"
        className="ml-2 accent-amber-300"
        defaultChecked={ctx.isOnlyIncomplete}
        onChange={(e) => {
          ctx.setIsOnlyIncomplete(e.target.checked);
        }}
      />
      <div className="ml-4">Show only incomplete items</div>
    </div>
  );
}

export default IncompleteSelector;
