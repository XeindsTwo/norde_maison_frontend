import CheckIcon from "@/assets/images/icons/bx_check.svg";
import ResetFilters from "@/assets/images/icons/reset-filters.svg";

export default function ColorFilterMobile({
                                            filters,
                                            colors,
                                            toggleMulti,
                                            resetFilters,
                                            applyQuery
                                          }) {
  if (!filters?.colors?.length) return null;

  return (
    <div className="filters-mobile__filter">
      {colors.length > 0 && (
        <button
          className="filters-mobile__reset"
          onClick={() => resetFilters("color")}
        >
          <ResetFilters />
          Сбросить
        </button>
      )}

      <div className="filters-mobile__list">
        {filters.colors.map(color => {
          const name = color.color_name;
          const active = colors.includes(name);

          return (
            <div
              key={name}
              className={`filters__color ${active ? "is-active" : ""}`}
              onClick={() => toggleMulti("color", name)}
            >
              <div
                className="filters__color-circle"
                style={{background: color.color_hex}}
              />
              {name}
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