import {useRef, useState} from "react";
import useDropdownOutside from "@/hooks/useDropdownOutside";

import useFiltersState from "./hooks/useFiltersState";
import PriceFilter from "./components/PriceFilter";
import SizeFilter from "./components/SizeFilter";
import ColorFilter from "./components/ColorFilter";
import SortFilter from "./components/SortFilter";

import sortSizes from "@/utils/sortSizes";
import {useCurrency} from "@/context/CurrencyContext";

import "./FiltersPanel.scss";

const FiltersPanel = ({filters = {}}) => {

  const dropdownRefs = useRef({});
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  useDropdownOutside(dropdownRefs, () => setActiveDropdown(null));

  const sortedSizes = sortSizes(filters.sizes || []);

  return (
    <div className="filters">

      <div className="filters__group">

        <PriceFilter
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          applyQuery={applyQuery}
          resetFilters={resetFilters}
          dropdownRefs={dropdownRefs}
          currency={currency}
        />

        <SizeFilter
          filters={filters}
          sizes={sizes}
          sortedSizes={sortedSizes}
          toggleMulti={toggleMulti}
          resetFilters={resetFilters}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          dropdownRefs={dropdownRefs}
        />

        <ColorFilter
          filters={filters}
          colors={colors}
          toggleMulti={toggleMulti}
          resetFilters={resetFilters}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          dropdownRefs={dropdownRefs}
        />

      </div>

      <div className="filters__group filters__group--right">

        <SortFilter
          sort={sort}
          setSort={setSort}
          applyQuery={applyQuery}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          dropdownRefs={dropdownRefs}
        />

      </div>
    </div>
  );
};

export default FiltersPanel;