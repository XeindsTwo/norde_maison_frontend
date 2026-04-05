import "./SearchPageResult.scss";
import {useEffect, useState, useCallback} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import FiltersPanel from "@/pages/CatalogPage/FiltersPanel/FiltersPanel.jsx";
import useFiltersState from "@/pages/CatalogPage/FiltersPanel/hooks/useFiltersState";
import {useProductSearch} from "@/hooks/useProductSearch";
import SearchHeader from "@/pages/SearchPage/SearchHeader.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "@/components/Pagination/Pagination.jsx";

const PAGE_SIZE = 16;
const DEBOUNCE_MS = 200;
const MIN_SKELETON_MS = 600;

const SearchPageResult = () => {
  const navigate = useNavigate();
  const filtersState = useFiltersState();
  const [searchParams] = useSearchParams();

  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [uiLoading, setUiLoading] = useState(false);
  const [initialFilters, setInitialFilters] = useState({});

  const query = searchParams.get("q")?.trim() || "";
  const page = Number(searchParams.get("page") || 1);
  const size = searchParams.getAll("size");
  const color = searchParams.getAll("color");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const sort = searchParams.get("sort") || "default";

  const hasFilters = size.length > 0 || color.length > 0 || minPrice || maxPrice || sort !== "default";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setUiLoading(false);
      return;
    }

    setUiLoading(true);
    const timer = setTimeout(() => {
      setUiLoading(false);
    }, MIN_SKELETON_MS);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const {data, isLoading, isFetching} = useProductSearch({
    q: debouncedQuery || undefined,
    page,
    page_size: PAGE_SIZE,
    size,
    color,
    min_price: minPrice,
    max_price: maxPrice,
    sort: sort === "default" ? undefined : sort
  });

  useEffect(() => {
    if (data?.filters && Object.keys(initialFilters).length === 0 && size.length === 0 && color.length === 0) {
      setInitialFilters(data.filters);
    }
  }, [data, initialFilters, size.length, color.length]);

  const mergedFilters = {
    ...initialFilters,
    ...(data?.filters || {})
  };

  const productsData = data || {};
  const products = productsData.results || [];
  const totalCount = productsData?.count || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const loading = isLoading || isFetching || uiLoading;

  const handlePageChange = useCallback((p) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", p.toString());
    navigate(`/search?${params.toString()}`);
  }, [searchParams, navigate]);

  return (
    <>
      <Header/>

      <main className="catalog">
        <div className="container container--padding">

          <div className="catalog__layout">
            <SearchHeader/>

            {(uiLoading || hasFilters || mergedFilters.sizes?.length > 0 || mergedFilters.colors?.length > 0) && (
              <aside className="catalog__filters">
                {uiLoading ? (
                  <Skeleton height={47}/>
                ) : (
                  <FiltersPanel
                    filters={mergedFilters}
                    {...filtersState}
                  />
                )}
              </aside>
            )}

            <div className="catalog__content">

              {!loading && products.length === 0 && (
                <p className="catalog__empty">
                  Ничего не найдено ¯\_(ツ)_/¯
                </p>
              )}

              <div className="catalog__grid">
                {loading
                  ? Array.from({length: PAGE_SIZE}).map((_, i) => (
                    <ProductCard key={i} product={null}/>
                  ))
                  : products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                  ))}
              </div>

              {!loading && totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </>
  );
};

export default SearchPageResult;