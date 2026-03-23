import {createContext, useContext, useState} from "react";

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);
  const toggleSearch = () => setIsOpen(v => !v);

  return (
    <SearchContext.Provider value={{isOpen, openSearch, closeSearch, toggleSearch}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);