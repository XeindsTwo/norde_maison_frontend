import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams, useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";
import GenderHero from "@/components/GenderHero/GenderHero.jsx";
import Pagination from "@/components/Pagination/Pagination.jsx";
import FiltersPanel from "./FiltersPanel/FiltersPanel.jsx";

import {getProducts, getSubcategoryDetail} from "@/api/catalog.js";
import {useCurrency} from "@/context/CurrencyContext";
import {useFavorites} from "@/hooks/useFavorites";

import "./CatalogPage.scss";

const PAGE_SIZE = 16;

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {currency} = useCurrency();
  const [cachedFilters, setCachedFilters] = useState({});

  const subcategory = searchParams.get("subcategory");
  const material = searchParams.get("material");
  const gender = searchParams.get("gender");
  const page = Number(searchParams.get("page") || 1);

  const size = searchParams.getAll("size");
  const color = searchParams.getAll("color");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const sort = searchParams.get("sort");

  const favoritesHook = useFavorites();
  const {loading: favoritesLoading} = favoritesHook;

  const isMaterialPage = !!material && !subcategory;
  const isSubcategoryPage = !!subcategory;

  const productsQuery = useQuery({
    queryKey: [
      "products",
      {subcategory, material, page, size, color, minPrice, maxPrice, sort, currency}
    ],
    enabled: isSubcategoryPage || isMaterialPage,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await getProducts({
        subcategory: subcategory || undefined,
        material: material || undefined,
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
    enabled: isSubcategoryPage,
    queryFn: async () => {
      const res = await getSubcategoryDetail(subcategory);
      return res.data;
    }
  });

  const materialQuery = useQuery({
    queryKey: ["subcategory-detail", material],
    enabled: isMaterialPage,
    queryFn: async () => {
      const res = await getSubcategoryDetail(material);
      return res.data;
    }
  });

  useEffect(() => {
    if (productsQuery.data?.filters && Object.keys(cachedFilters).length === 0) {
      setCachedFilters(productsQuery.data.filters);
    }
  }, [productsQuery.data, cachedFilters]);

  const productsData = productsQuery.data;
  const products = productsData?.results || [];
  const filters = cachedFilters;
  const totalCount = productsData?.count || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const subcategoryInfo = subcategoryQuery.data;
  const materialInfo = materialQuery.data;

  const infoLoading = subcategoryQuery.isLoading || materialQuery.isLoading;
  const productsLoading = productsQuery.isLoading || productsQuery.isFetching;

  const loading = infoLoading || productsLoading || favoritesLoading;

  const isMen =
    subcategoryInfo?.category?.gender === "M" ||
    materialInfo?.category?.gender === "M" ||
    gender === "M";

  const materialsListPath = `/${isMen ? "men" : "women"}?tab=materials`;

  const pageTitle = isSubcategoryPage
    ? subcategoryInfo?.name || ""
    : isMaterialPage
      ? materialInfo?.name || "Материал"
      : "";

  const pageDescription = isSubcategoryPage
    ? subcategoryInfo?.description || ""
    : isMaterialPage
      ? materialInfo?.description || ""
      : "";

  const breadcrumbItems = [
    {label: "Главная", to: "/"},
    {
      label: isMen ? "Мужчинам" : "Женщинам",
      to: `/${isMen ? "men" : "women"}`
    },
    isMaterialPage
      ? {label: "Материалы", to: materialsListPath}
      : null,
    isSubcategoryPage
      ? {label: subcategoryInfo?.name || "Подкатегория"}
      : isMaterialPage
        ? {label: materialInfo?.name || "Материал"}
        : null
  ].filter(Boolean);

  return (
    <>
      <Header/>

      <main className="catalog">
        <div className="container container--padding">
          <Breadcrumbs items={breadcrumbItems}/>

          {(isSubcategoryPage || isMaterialPage) && (
            infoLoading ? (
              <section className="gender__hero">
                <Skeleton className="gender__title" width="60%" height={38}/>
                <div style={{marginTop: 18}}>
                  <Skeleton className="gender__description" width="90%" height={16}/>
                  <Skeleton className="gender__description" width="85%" height={16} style={{marginTop: 8}}/>
                  <Skeleton className="gender__description" width="70%" height={16} style={{marginTop: 8}}/>
                </div>
              </section>
            ) : (
              <GenderHero
                gender={isMen ? "M" : "F"}
                title={pageTitle}
                description={pageDescription}
              />
            )
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
                {productsLoading
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
                  onChange={p => {
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