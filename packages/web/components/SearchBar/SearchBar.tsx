import React, { useContext, useState } from 'react';
import { HomeContext } from '../../contexts';
import { useQueryClient } from '@tanstack/react-query';

let timeout: NodeJS.Timeout;

function SearchBar(): JSX.Element {
  const [value, setValue] = useState('');
  const ctx = useContext(HomeContext);
  const queryClient = useQueryClient();

  const onSearchTermUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      ctx.setSearchTerm(inputValue);
      await queryClient.invalidateQueries(['todos']);
    }, 1000);
  };

  return (
    <div className="mt-12 flex w-full items-center pl-4">
      <input
        type="search"
        className="w-full border border-black py-2 px-4 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-2"
        placeholder="Search"
        value={value}
        onChange={onSearchTermUpdate}
      />
    </div>
  );
}

export default SearchBar;
