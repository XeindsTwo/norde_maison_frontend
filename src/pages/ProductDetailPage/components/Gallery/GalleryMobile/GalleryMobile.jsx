import "./GalleryMobile.scss";
import { useState, useCallback } from "react";
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
  const [mainSwiper, setMainSwiper] = useState(null);

  if (!images.length) {
    return (
      <div className="gallery-mobile">
        <Skeleton height={420} />
      </div>
    );
  }

  const onInit = useCallback((detail) => {
    if (detail && detail.instance) {
      detail.instance.settings.container = document.querySelector('.gallery-mobile__lightbox');
    }
  }, []);

  return (
    <div className="gallery-mobile">
      <LightGallery
        speed={500}
        plugins={[]}
        download={false}
        elementClassNames="gallery-mobile__lightbox"
        selector=".gallery-mobile__main-link"
        onInit={onInit}
      >
        <Swiper
          loop={false}
          slidesPerView={1}
          slidesPerGroup={1}
          centeredSlides={false}
          navigation={false}
          spaceBetween={20}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          onSwiper={setMainSwiper}
          className="gallery-mobile__main"
          style={{ width: "100%" }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} style={{ width: "100%" }}>
              <div className="gallery-mobile__main-link-wrapper">
                <a
                  href={img}
                  className="gallery-mobile__main-link"
                  data-src={img}
                  data-sub-html={product?.name || ""}
                >
                  {!imageLoaded[index] && <Skeleton height={480} />}
                  <img
                    src={img}
                    alt={product?.name || ""}
                    data-lg-size="large-thumb"
                    onLoad={() =>
                      setImageLoaded((prev) => ({ ...prev, [index]: true }))
                    }
                    className="gallery-mobile__main-image"
                  />
                </a>
              </div>
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
              610: {
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
            onClick={(swiper, event) => {
              const clickedSlide = event.target.closest('.swiper-slide');
              if (clickedSlide && mainSwiper) {
                const index = Array.from(clickedSlide.parentNode.children).indexOf(clickedSlide);
                mainSwiper.slideTo(index, 300);
                if (thumbsSwiper && !thumbsSwiper.destroyed) {
                  thumbsSwiper.slideTo(index, 300, false);
                }
              }
            }}
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