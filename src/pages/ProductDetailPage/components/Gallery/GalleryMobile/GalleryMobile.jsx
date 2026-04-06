import "./GalleryMobile.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

const GalleryMobile = ({ product, images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
            plugins={[lgZoom, lgThumbnail]}
            download={false}
            elementClassNames="gallery-mobile__lightbox"
        >
          <Swiper
              loop={false}
              spaceBetween={10}
              navigation={false}
              thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="gallery-mobile__main"
          >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <a
                      href={img}
                      className="gallery-mobile__main-link"
                      data-src={img}
                  >
                    {!loaded && <Skeleton height={420} />}
                    <img
                        src={img}
                        alt={product?.name || ''}
                        data-src={img}
                        data-sub-html={product?.name || ''}
                        onLoad={() => setLoaded(true)}
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
                  direction="horizontal"
                  slidesPerView="auto"
                  spaceBetween={0}
                  freeMode={true}
                  watchSlidesProgress={true}
                  loop={false}
                  modules={[FreeMode, Thumbs]}
                  className="gallery-mobile__thumbs"
              >
                {images.map((img, index) => (
                    <SwiperSlide
                        key={index}
                        className="gallery-mobile__thumb-slide"
                    >
                      <img
                          src={img}
                          alt={`${product?.name || ''} ${index + 1}`}
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