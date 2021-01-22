import React, { useState, useRef } from "react";
import "./SearchBox.css";

interface SearchBoxProps {
  onClick: (text: string) => void;
  initialInput: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onClick,
  initialInput,
}) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText((e.target as HTMLInputElement).value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClick(searchText);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="cityForm">
      <form>
        <label htmlFor="citySearch">Enter city:</label>
        <input
          placeholder={initialInput}
          ref={inputRef}
          autoFocus={true}
          type="text"
          id="citySearch"
          name="citySearch"
          size={35}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={() => onClick(searchText)}>
          Search
        </button>
      </form>
    </div>
  );
};
