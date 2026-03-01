import IconSearch from "@/assets/images/icons/bx_search.svg";

const SearchOverlaySearchField = ({
                                    inputRef,
                                    query,
                                    setQuery,
                                    onSearchClick
                                  }) => {

  return (
    <div className="search-overlay__field">
      <input
        ref={inputRef}
        className="search-overlay__input"
        placeholder="Найти..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button
        className="search-overlay__icon-btn"
        onClick={onSearchClick}
      >
        <IconSearch/>
      </button>

    </div>
  );
};

export default SearchOverlaySearchField;