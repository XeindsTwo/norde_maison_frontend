import "./SimilarProducts.scss";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

const SimilarProducts = ({products}) => {
  if (!products?.length) return null;

  return (
    <section className="similar-products">
      <h2 className="similar-products__title">Похожие товары</h2>

      <div className="similar-products__swiper">
        <Swiper
          modules={[FreeMode]}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 20
            },
            540: {
              slidesPerView: 1.5,
              spaceBetween: 20,
              freeMode: true,
            },
            768: {
              slidesPerView: 2.3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 20,
              freeMode: false,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
              freeMode: false,
            },
          }}
          className="similar-products__swiper-inner"
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SimilarProducts;