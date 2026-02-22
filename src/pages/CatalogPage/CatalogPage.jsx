import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";
import GenderHero from "@/components/GenderHero/GenderHero.jsx";
import Pagination from "@/components/Pagination/Pagination.jsx";

import { getProducts, getSubcategoryDetail } from "@/api/catalog.js";

import './CatalogPage.scss';

const PAGE_SIZE = 16;

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const subcategory = searchParams.get("subcategory");
  const page = Number(searchParams.get("page") || 1);

  const productsQuery = useQuery({
    queryKey: ["products", subcategory, page],
    enabled: !!subcategory,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await getProducts({
        subcategory,
        page
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

  const productsData = productsQuery.data;
  const products = productsData?.results || [];
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

    const genderPath = isMen ? "men" : "women";

    if (searchParams.get("gender") !== subcategoryInfo.category.gender) {
      navigate(
        `/catalog?subcategory=${subcategory}&gender=${genderPath}&page=${page}`,
        { replace: true }
      );
    }
  }, [
    subcategoryInfo,
    isMen,
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

  useEffect(() => {
    if (page < 1) {
      navigate(`?subcategory=${subcategory}&page=1`, { replace: true });
    }

    if (totalPages && page > totalPages) {
      navigate(`?subcategory=${subcategory}&page=${totalPages}`, { replace: true });
    }
  }, [page, totalPages, navigate, subcategory]);

  const breadcrumbItems = [
    { label: "Главная", to: "/" },
    {
      label: isMen ? "Мужчинам" : "Женщинам",
      to: `/${isMen ? "men" : "women"}`
    },
    subcategoryInfo && { label: subcategoryInfo.name }
  ].filter(Boolean);

  return (
    <>
      <Header />

      <main className="catalog">
        <div className="container container--padding">

          <Breadcrumbs items={breadcrumbItems} />

          {subcategoryInfo && (
            <GenderHero
              gender={subcategoryInfo.category.gender}
              title={subcategoryInfo.name}
              description={subcategoryInfo.description}
            />
          )}

          <div className="catalog__grid">
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ProductCard key={i} product={null} />
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
                navigate(
                  `/catalog?subcategory=${subcategory}&gender=${searchParams.get("gender")}&page=${p}`,
                  { replace: true }
                );
              }}
            />
          )}

        </div>
      </main>

      <Footer />
    </>
  );
};

export default CatalogPage;