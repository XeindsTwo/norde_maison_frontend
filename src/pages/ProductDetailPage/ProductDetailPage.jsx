import "./ProductDetailPage.scss";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductDetail} from "@/api/catalog";

import Gallery from "./components/Gallery/Gallery";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import SimilarProducts from "./components/SimilarProductsSection/SimilarProducts";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";

import {useFavorites} from "@/hooks/useFavorites";

const ProductDetailPage = () => {
  const {id} = useParams();
  const {data: favoritesData} = useFavorites();

  const favoriteSet = new Set(
    favoritesData?.data?.map(f => f.product.id) || []
  );

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const {data} = await getProductDetail(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (loading) {
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

  if (!product) {
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
              <ProductInfo
                product={product}
                initialFavorite={favoriteSet.has(product.id)}
              />
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