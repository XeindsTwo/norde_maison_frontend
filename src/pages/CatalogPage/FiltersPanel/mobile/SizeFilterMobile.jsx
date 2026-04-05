import CheckIcon from "@/assets/images/icons/bx_check.svg";
import ResetFilters from "@/assets/images/icons/reset-filters.svg";

export default function SizeFilterMobile({
                                           filters,
                                           sizes,
                                           sortedSizes,
                                           toggleMulti,
                                           resetFilters,
                                           applyQuery
                                         }) {
  if (!filters?.sizes?.length) return null;

  return (
    <div className="filters-mobile__filter">
      {sizes.length > 0 && (
        <button
          className="filters-mobile__reset"
          onClick={() => resetFilters("size")}
        >
          <ResetFilters />
          Сбросить
        </button>
      )}

      <div className="filters-mobile__list">
        {sortedSizes.map(size => {
          const active = sizes.includes(size);

          return (
            <div
              key={size}
              className={`filters__option ${active ? "is-active" : ""}`}
              onClick={() => toggleMulti("size", size)}
            >
              {size}
              {active && <CheckIcon/>}
            </div>
          );
        })}
      </div>

      <button className="btn filters-mobile__apply" onClick={applyQuery}>
        Применить
      </button>
    </div>
  );
}