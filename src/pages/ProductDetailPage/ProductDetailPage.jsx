import "./ProductDetailPage.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

import {getProductDetail} from "@/api/catalog";

import Gallery from "./components/Gallery/Gallery";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import SimilarProducts from "./components/SimilarProductsSection/SimilarProducts";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";

const ProductDetailPage = () => {

  const {id} = useParams();

  const {data, isLoading, isError} = useQuery({
    queryKey: ["product-detail", id],
    queryFn: async () => {
      const res = await getProductDetail(id);
      return res.data;
    },
    staleTime: 0,
    retry: false
  });

  const product = data;

  const genderPathMap = {
    M: "men",
    F: "women"
  };

  const genderLabelMap = {
    M: "Мужчинам",
    F: "Женщинам"
  };

  const breadcrumbs = [
    {label: "Главная", to: "/"},
    product?.gender && {
      label: genderLabelMap[product.gender] || "Каталог",
      to: `/${genderPathMap[product.gender] || "catalog"}`
    },
    product?.subcategory && {
      label: product.subcategory.name,
      to: `/catalog?subcategory=${product.subcategory.id}`
    },
    product?.name && {
      label: product.name
    }
  ].filter(Boolean);

  if (isLoading) {
    return (
      <>
        <Header/>
        <main className="product-detail loading">
          <div className="container container--padding">
            Загрузка...
          </div>
        </main>
        <Footer/>
      </>
    );
  }

  if (isError || !product) {
    return (
      <>
        <Header/>
        <main className="product-detail loading">
          <div className="container container--padding">
            <p className="product-detail__empty">Товар не найден</p>
          </div>
        </main>
        <Footer/>
      </>
    );
  }

  return (
    <>
      <Header/>

      <main className="product-detail">
        <section>
          <div className="container container--padding">

            <Breadcrumbs items={breadcrumbs}/>

            <div className="product-detail__grid">
              <Gallery product={product}/>
              <ProductInfo product={product}/>
            </div>

            {product?.similar_products?.length > 0 && (
              <div className="product-detail__similar">
                <SimilarProducts products={product.similar_products}/>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer/>
    </>
  );
};

export default ProductDetailPage;