import React, { useEffect, useState } from "react";
import SearchInput from "../../atoms/SearchInput/SearchInput";

interface SearchGroupProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearchSignal: React.Dispatch<
    React.SetStateAction<AbortSignal | undefined>
  >;
}
const SearchGroup: React.FC<SearchGroupProps> = ({
  setSearchTerm,
  setSearchSignal,
}) => {
  const [searchInputTerm, setSearchInputTerm] = useState<string>("");

  useEffect(() => {
    setSearchTerm(`${searchInputTerm}`);
  });

  console.log(1);
  return (
    <SearchInput
      setSearchSignal={setSearchSignal}
      setSearchTerm={setSearchInputTerm}
    />
  );
};

export default SearchGroup;
