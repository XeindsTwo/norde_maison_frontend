import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import buildFiltersQuery from "../utils/filtersQueryBuilder";

export default function useFiltersState() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("default");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [currency, setCurrency] = useState("rub");

  useEffect(() => {
    setPriceMin(searchParams.get("min_price") || "");
    setPriceMax(searchParams.get("max_price") || "");
    setSort(searchParams.get("sort") || "default");
    setSizes(searchParams.getAll("size"));
    setColors(searchParams.getAll("color"));
    setCurrency(searchParams.get("currency") || "rub");
  }, [searchParams]);

  const applyQuery = (override = {}) => {
    const params = buildFiltersQuery(
      searchParams,
      {
        sizes,
        colors,
        priceMin,
        priceMax,
        sort,
        currency
      },
      override
    );

    setSearchParams(params, { replace: true });
  };

  const toggleMulti = (key, value) => {

    if (key === "size") {
      const next = sizes.includes(value)
        ? sizes.filter(v => v !== value)
        : [...sizes, value];

      setSizes(next);
      applyQuery({ size: next });
    }

    if (key === "color") {
      const next = colors.includes(value)
        ? colors.filter(v => v !== value)
        : [...colors, value];

      setColors(next);
      applyQuery({ color: next });
    }
  };

  const resetFilters = type => {
    const params = new URLSearchParams(searchParams);

    if (type === "price") {
      setPriceMin("");
      setPriceMax("");
      params.delete("min_price");
      params.delete("max_price");
    }

    if (type === "size") {
      setSizes([]);
      params.delete("size");
    }

    if (type === "color") {
      setColors([]);
      params.delete("color");
    }

    params.set("page", "1");
    setSearchParams(params, { replace: true });
  };

  return {
    priceMin,
    priceMax,
    sort,
    sizes,
    colors,
    currency,
    setCurrency,
    setPriceMin,
    setPriceMax,
    setSort,
    setSizes,
    setColors,
    applyQuery,
    toggleMulti,
    resetFilters
  };
}