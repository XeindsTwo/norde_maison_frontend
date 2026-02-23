import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams, useNavigate} from "react-router-dom";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";
import GenderHero from "@/components/GenderHero/GenderHero.jsx";
import Pagination from "@/components/Pagination/Pagination.jsx";
import FiltersPanel from "./FiltersPanel/FiltersPanel.jsx";

import {getProducts, getSubcategoryDetail} from "@/api/catalog.js";
import {useCurrency} from "@/context/CurrencyContext";

import "./CatalogPage.scss";

const PAGE_SIZE = 16;

const CatalogPage = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {currency} = useCurrency();

  const [cachedFilters, setCachedFilters] = useState({});

  const subcategory = searchParams.get("subcategory");
  const page = Number(searchParams.get("page") || 1);

  const size = searchParams.getAll("size");
  const color = searchParams.getAll("color");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const sort = searchParams.get("sort");

  const productsQuery = useQuery({
    queryKey: [
      "products",
      subcategory,
      page,
      size,
      color,
      minPrice,
      maxPrice,
      sort,
      currency
    ],
    enabled: !!subcategory,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await getProducts({
        subcategory,
        page,
        size,
        color,
        min_price: minPrice,
        max_price: maxPrice,
        sort,
        currency
      });

      return res.data;
    }
  });

  const subcategoryQuery = useQuery({
    queryKey: ["subcategory-detail", subcategory],
    enabled: !!subcategory,
    queryFn: async () => {
      const res = await getSubcategoryDetail(subcategory);
      return res.data;
    }
  });

  useEffect(() => {
    if (productsQuery.data?.filters && Object.keys(cachedFilters).length === 0) {
      setCachedFilters(productsQuery.data.filters);
    }
  }, [productsQuery.data]);

  const productsData = productsQuery.data;

  const products = productsData?.results || [];
  const filters = cachedFilters;

  const totalCount = productsData?.count || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const subcategoryInfo = subcategoryQuery.data;

  const loading =
    productsQuery.isLoading ||
    productsQuery.isFetching ||
    subcategoryQuery.isLoading;

  const isMen = subcategoryInfo?.category?.gender === "M";

  useEffect(() => {
    if (!subcategoryInfo) return;

    const params = new URLSearchParams(searchParams);

    const genderPath =
      subcategoryInfo.category.gender === "M" ? "men" : "women";

    if (params.get("gender") !== genderPath) {
      params.set("gender", genderPath);
      params.set("subcategory", subcategory);
      params.set("page", page);

      navigate(`/catalog?${params.toString()}`, {replace: true});
    }
  }, [
    subcategoryInfo,
    navigate,
    searchParams,
    subcategory,
    page
  ]);

  useEffect(() => {
    const catalog = document.querySelector(".catalog");

    if (catalog) {
      catalog.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [page, subcategory]);

  const breadcrumbItems = [
    {label: "Главная", to: "/"},
    {
      label: isMen ? "Мужчинам" : "Женщинам",
      to: `/${isMen ? "men" : "women"}`
    },
    subcategoryInfo && {label: subcategoryInfo.name}
  ].filter(Boolean);

  return (
    <>
      <Header/>

      <main className="catalog">
        <div className="container container--padding">

          <Breadcrumbs items={breadcrumbItems}/>

          {subcategoryInfo && (
            <GenderHero
              gender={subcategoryInfo.category.gender}
              title={subcategoryInfo.name}
              description={subcategoryInfo.description}
            />
          )}

          <div className="catalog__layout">

            <aside className="catalog__filters">
              <FiltersPanel filters={filters}/>
            </aside>

            <div className="catalog__content">

              {!loading && products.length === 0 && (
                <p className="catalog__empty">
                  Товаров не найдено по данным условиям ¯\_(ツ)_/¯
                </p>
              )}

              <div className="catalog__grid">
                {loading
                  ? Array.from({length: PAGE_SIZE}).map((_, i) => (
                    <ProductCard key={i} product={null}/>
                  ))
                  : products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))
                }
              </div>

              {!loading && totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onChange={(p) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", p);
                    navigate(`/catalog?${params.toString()}`);
                  }}
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

export default CatalogPage;