import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import FiltersPanel from "@/pages/CatalogPage/FiltersPanel/FiltersPanel.jsx";
import useFiltersState from "@/pages/CatalogPage/FiltersPanel/hooks/useFiltersState";
import {useProductSearch} from "@/hooks/useProductSearch";

const PAGE_SIZE = 16;

const SearchPageResult = () => {

  const filtersState = useFiltersState();

  const [cachedFilters, setCachedFilters] = useState({});

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";
  const page = Number(searchParams.get("page") || 1);

  const size = searchParams.getAll("size");
  const color = searchParams.getAll("color");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const sort = searchParams.get("sort");

  const {data, isLoading, isFetching} = useProductSearch({
    q: query,
    page,
    page_size: PAGE_SIZE,
    size,
    color,
    min_price: minPrice,
    max_price: maxPrice,
    sort
  });

  useEffect(() => {
    if (data?.filters && Object.keys(cachedFilters).length === 0) {
      setCachedFilters(data.filters);
    }
  }, [data]);

  const productsData = data || {};
  const products = productsData.results || [];
  const filters = cachedFilters;

  const loading = isLoading || isFetching;

  return (
    <>
      <Header/>

      <main className="catalog">
        <div className="container container--padding">

          <div className="catalog__layout">

            <aside className="catalog__filters">
              <FiltersPanel
                filters={filters}
                {...filtersState}
              />
            </aside>

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
                  ))
                }
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </>
  );
};

export default SearchPageResult;