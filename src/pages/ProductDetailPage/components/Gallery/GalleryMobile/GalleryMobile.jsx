import "./GalleryMobile.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import LightGallery from "lightgallery/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GalleryMobile = ({ product, images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  if (!images.length) {
    return (
      <div className="gallery-mobile">
        <Skeleton height={420} />
      </div>
    );
  }

  return (
    <div className="gallery-mobile">
      <LightGallery
        speed={500}
        plugins={[]}
        download={false}
        elementClassNames="gallery-mobile__lightbox"
      >
        <Swiper
          loop={false}
          slidesPerView={1}
          slidesPerGroup={1}
          centeredSlides={false}
          navigation={false}
          spaceBetween={20}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="gallery-mobile__main"
          style={{ width: "100%" }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} style={{ width: "100%" }}>
              <a
                href={img}
                className="gallery-mobile__main-link"
                data-src={img}
              >
                {!imageLoaded[index] && <Skeleton height={480} />}
                <img
                  src={img}
                  alt={product?.name || ""}
                  data-src={img}
                  data-sub-html={product?.name || ""}
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, [index]: true }))
                  }
                  className="gallery-mobile__main-image"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </LightGallery>

      {images.length > 1 && (
        <div className="gallery-mobile__thumbs">
          <Swiper
            onSwiper={setThumbsSwiper}
            breakpoints={{
              0: {
                direction: "horizontal",
                slidesPerView: "auto",
                spaceBetween: 8,
              },
              768: {
                direction: "vertical",
                slidesPerView: "auto",
                spaceBetween: 8,
              },
              992: {
                direction: "horizontal",
                slidesPerView: "auto",
                spaceBetween: 8,
              },
            }}
            freeMode
            watchSlidesProgress
            loop={false}
            modules={[FreeMode, Thumbs]}
            className="gallery-mobile__thumbs-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="gallery-mobile__thumb-slide">
                <img
                  src={img}
                  alt={`${product?.name || ""} ${index + 1}`}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default GalleryMobile;
