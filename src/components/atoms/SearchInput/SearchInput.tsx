/** This React component provides an AutoComplete search input with integrated suggestions.
 * It utilizes the Ant Design AutoComplete and Input components to allow users to search
 * and receive dynamic suggestions based on the entered query.
 *
 * The search suggestions are generated randomly using the `searchResult` function, and each
 * suggestion includes a link to Taobao for further details.
 *
 * Usage::
 * <SearchInput />
 *
 * Features:
 * - AutoComplete with dynamic search suggestions.
 * - Displays search results with links to Taobao and a random number of results.
 * - Integrated with Ant Design Input for search functionality.
 * - Adjustable width of the popup to match the search input.
 * - Displays the number of random results for each suggestion.
 *
 * Note: This component assumes the availability of Ant Design components.
 */

import React, { useRef } from "react";
import { AutoComplete, Input } from "antd";
import Sizes from "../../../constants/Sizes";
import "../../../styles/main.scss";

interface SearchInputProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearchSignal: React.Dispatch<
    React.SetStateAction<AbortSignal | undefined>
  >;
}

const SearchInput: React.FC<SearchInputProps> = ({
  setSearchTerm,
  setSearchSignal,
}) => {
  const searchControllerRef = useRef<AbortController>();
  const handleSearch = async (value: string) => {
    value ? setSearchTerm(value) : setSearchTerm("");

    if (searchControllerRef.current) {
      searchControllerRef.current.abort();
    }
    searchControllerRef.current = new AbortController();
    const searchSignal = searchControllerRef.current.signal;
    setSearchSignal(searchSignal);
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={Sizes.PopUpSearchLarge}
      onSearch={handleSearch}
      data-testid="search-input-autocomplete"
    >
      <Input.Search placeholder="Search" enterButton allowClear size="large" />
    </AutoComplete>
  );
};

export default SearchInput;
