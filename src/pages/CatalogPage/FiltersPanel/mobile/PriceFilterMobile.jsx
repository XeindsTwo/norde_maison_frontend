import ResetFilters from "@/assets/images/icons/reset-filters.svg";

export default function PriceFilterMobile({
                                            priceMin,
                                            priceMax,
                                            setPriceMin,
                                            setPriceMax,
                                            resetFilters,
                                            applyQuery,
                                            currency
                                          }) {
  const placeholderMap = {
    rub: { min: "от 0 ₽", max: "до 200 000 ₽" },
    kzt: { min: "от 0 ₸", max: "до 100 000 ₸" },
    byn: { min: "от 0 Br", max: "до 50 000 Br" }
  };

  const placeholders = placeholderMap[currency] || placeholderMap.rub;

  return (
    <div className="filters-mobile__filter">
      {(priceMin || priceMax) && (
        <button
          className="filters-mobile__reset"
          onClick={() => resetFilters("price")}
        >
          <ResetFilters />
          Сбросить
        </button>
      )}

      <div className="filters__price-grid filters-mobile__price-grid">
        <input
          placeholder={placeholders.min}
          value={priceMin}
          onChange={e => setPriceMin(e.target.value)}
        />
        <input
          placeholder={placeholders.max}
          value={priceMax}
          onChange={e => setPriceMax(e.target.value)}
        />
      </div>

      <button className="btn filters-mobile__apply non-top" onClick={applyQuery}>
        Применить
      </button>
    </div>
  );
}