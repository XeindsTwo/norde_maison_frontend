import "./Gallery.scss";
import { useMemo, useState } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import useIsMobile from "@/pages/CatalogPage/FiltersPanel/hooks/useIsMobile";
import GalleryMobile from "./GalleryMobile/GalleryMobile";

const Gallery = ({ product }) => {
  const isMobile = useIsMobile();
  const [imageLoaded, setImageLoaded] = useState(false);

  const images = useMemo(() => {
    if (!product) return [];
    return [
      product.main_image,
      ...(product.images?.map((img) => img.image) || [])
    ].filter(Boolean);
  }, [product]);

  if (!product) {
    return (
        <div className="product-gallery">
          <Skeleton height={480} />
        </div>
    );
  }

  if (isMobile) {
    return <GalleryMobile product={product} images={images} />;
  }

  return (
      <div className="product-gallery">
        <LightGallery
            speed={500}
            plugins={[lgZoom, lgThumbnail]}
            download={false}
            elementClassNames="product-gallery__grid"
        >
          {images.map((img, index) => (
              <a key={index} href={img} className="product-gallery__item">
                {!imageLoaded && <Skeleton height={480} />}
                <img
                    src={img}
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                />
              </a>
          ))}
        </LightGallery>
      </div>
  );
};

export default Gallery;