import { setIsSearch } from "@/components/store/storeAction";
import { Search } from "lucide-react";
import React from "react";

const Searchbar = ({
  search,
  dispatch,
  store,
  result,
  isFetching,
  setOnSearch,
  onSearch,
}) => {
  const handleChange = (e) => {
    if (e.target.value === "") {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
    }
  };

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    let val = search.current.value;

    if (val === " " || val === "") {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
      // dispatch(setError(true));
      // dispatch(setMessage("Search keyword cannot be space only or blank."));
    } else {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(true));
    }
  };

  return (
    <>
      <form
        action=""
        className="relative"
        onSubmit={(e) => {
          handleChangeSubmit(e);
        }}
      >
        <input
          type="text"
          ref={search}
          onChange={handleChange}
          placeholder="Search keyword"
          className="p-1.5 bg-secondary border border-line rounded-md outline-none pl-8 placeholder:opacity-30 placeholder:text-sm w-[250px] block focus:border-accent"
        />
        <Search className="absolute bottom-2.5 left-2 opacity-50" size={18} />
      </form>
    </>
  );
};

export default Searchbar;
