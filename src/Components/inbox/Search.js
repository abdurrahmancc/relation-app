import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Search = () => {
  return (
    <>
      <div className="flex justify-center pb-4 pt-5">
        <label className={`relative w-[12rem]  md:block max-w-xs hidden `}>
          <form action="">
            <button
              type="submit"
              className="absolute inset-y-0 right-2 rounded pr-1  flex items-center pl-2"
            >
              <BiSearchAlt className="text-2xl text-gray-400" />
            </button>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-accent w-full  py-2 pl-6  pr-9 shadow-sm focus:outline-none focus:border-0 rounded-full  focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="text"
              name="search"
            />
          </form>
        </label>
      </div>
    </>
  );
};

export default Search;
