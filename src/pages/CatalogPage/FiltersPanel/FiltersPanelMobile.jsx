import {useState} from "react";
import AnimatedModal from "@/components/Modals/ui/AnimatedModal";
import ColorFilterMobile from "./mobile/ColorFilterMobile";
import SizeFilterMobile from "./mobile/SizeFilterMobile";
import PriceFilterMobile from "./mobile/PriceFilterMobile";
import SortFilterMobile from "./mobile/SortFilterMobile";
import useFiltersState from "./hooks/useFiltersState";
import sortSizes from "@/utils/sortSizes";
import {useCurrency} from "@/context/CurrencyContext";
import CrossArrow from "@/assets/images/icons/cross-modal.svg";
import SortIcon from "@/assets/images/icons/sort.svg";
import "./mobile/FiltersPanelMobile.scss";

const FiltersPanelMobile = ({filters = {}}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const {currency} = useCurrency();
  const {
    priceMin,
    priceMax,
    sort,
    sizes,
    colors,
    setPriceMin,
    setPriceMax,
    setSort,
    applyQuery,
    toggleMulti,
    resetFilters
  } = useFiltersState();

  const sortedSizes = sortSizes(filters.sizes || []);

  const closeModal = () => setActiveFilter(null);

  const handleApply = () => {
    applyQuery();
    closeModal();
  };

  const renderContent = () => {
    switch (activeFilter) {
      case "price":
        return (
          <PriceFilterMobile
            priceMin={priceMin}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            resetFilters={resetFilters}
            applyQuery={handleApply}
            currency={currency}
          />
        );

      case "sizes":
        return (
          <SizeFilterMobile
            filters={filters}
            sizes={sizes}
            sortedSizes={sortedSizes}
            toggleMulti={toggleMulti}
            resetFilters={resetFilters}
            applyQuery={handleApply}
          />
        );

      case "colors":
        return (
          <ColorFilterMobile
            filters={filters}
            colors={colors}
            toggleMulti={toggleMulti}
            resetFilters={resetFilters}
            applyQuery={handleApply}
          />
        );

      case "sort":
        return (
          <SortFilterMobile
            sort={sort}
            setSort={setSort}
            applyQuery={applyQuery}
            closeModal={closeModal}
          />
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    const titles = {
      price: "Цена",
      sizes: "Размер",
      colors: "Цвет",
      sort: "Показывать сначала"
    };
    return titles[activeFilter] || "";
  };

  return (
    <>
      <div className="filters-mobile__buttons">
        <button
          className="filters-mobile__btn sort filters__button"
          onClick={() => setActiveFilter("sort")}
        >
          <SortIcon/>
        </button>

        <button
          className="filters-mobile__btn filters__button"
          onClick={() => setActiveFilter("price")}
        >
          Цена
          {(priceMin || priceMax) && (
            <span className="filters__counter">
              {Number(!!priceMin) + Number(!!priceMax)}
            </span>
          )}
        </button>

        {filters.sizes?.length > 0 && (
          <button
            className="filters-mobile__btn filters__button"
            onClick={() => setActiveFilter("sizes")}
          >
            Размер
            {sizes.length > 0 && (
              <span className="filters__counter">{sizes.length}</span>
            )}
          </button>
        )}

        {filters.colors?.length > 0 && (
          <button
            className="filters-mobile__btn filters__button"
            onClick={() => setActiveFilter("colors")}
          >
            Цвет
            {colors.length > 0 && (
              <span className="filters__counter">{colors.length}</span>
            )}
          </button>
        )}
      </div>

      <AnimatedModal isOpen={!!activeFilter} onClose={closeModal}>
        <div className="modal__top non-bottom">
          <h3 className="modal__title">{getTitle()}</h3>
          <button className="modal__close" onClick={closeModal}>
            <CrossArrow/>
          </button>
        </div>
        <div className="modal__inner">{renderContent()}</div>
      </AnimatedModal>
    </>
  );
};

export default FiltersPanelMobile;