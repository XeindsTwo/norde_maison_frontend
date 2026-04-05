import CheckIcon from "@/assets/images/icons/bx_check.svg";

export default function SortFilterMobile({
                                           sort,
                                           setSort,
                                           applyQuery,
                                           closeModal
                                         }) {
  const sortOptions = [
    {value: "default", label: "По умолчанию"},
    {value: "price_asc", label: "По возрастанию цены"},
    {value: "price_desc", label: "По убыванию цены"},
    {value: "newest", label: "По новизне"}
  ];

  const handleSortSelect = (sortValue) => {
    setSort(sortValue);
    applyQuery({sort: sortValue});
    closeModal();
  };

  return (
    <div className="filters-mobile__filter">
      <div className="filters-mobile__list">
        {sortOptions.map(opt => {
          const active = sort === opt.value;

          return (
            <div
              key={opt.value}
              className={`filters__option ${active ? "is-active" : ""}`}
              onClick={() => handleSortSelect(opt.value)}
            >
              {opt.label}
              {active && <CheckIcon/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}