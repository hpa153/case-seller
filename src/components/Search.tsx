"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { Input } from "./ui/input";

const Search = ({
  setQuery,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex justify-center items-center w-full overflow-hidden bg-white border border-gray-200 rounded-md">
      <Image
        src="/search.svg"
        alt="search"
        width={30}
        height={30}
        className="bg-white p-1"
      />
      <Input
        type="text"
        placeholder="Search for order by E-Mail"
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        id="search-box"
      />
    </div>
  );
};

export default Search;
