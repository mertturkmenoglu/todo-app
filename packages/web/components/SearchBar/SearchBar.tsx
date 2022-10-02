import React, { useContext } from 'react';
import { HomeContext } from '../../contexts';
import { debounce } from 'debounce';

function SearchBar(): JSX.Element {
  const ctx = useContext(HomeContext);

  const onSearchTermUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    ctx.setSearchTerm(inputValue);

    const filter = debounce(() => {
      if (inputValue === '') {
        //setData([]);
        return;
      }

      //setData((prev) => prev.filter((item) => item.text.toLowerCase().includes(inputValue.toLowerCase())));
    }, 500);

    filter();
  };

  return (
    <div className="mt-12 flex w-full items-center pl-4">
      <input
        type="search"
        className="w-full border border-black py-2 px-4 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-2"
        placeholder="Search"
        value={ctx.searchTerm}
        onChange={onSearchTermUpdate}
      />
    </div>
  );
}

export default SearchBar;
