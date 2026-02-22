import "./ProductCard.scss";
import {useState, useMemo, useRef} from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FavoriteIcon from "@/assets/images/icons/bx_star.svg";
import {formatPrice} from "@/utils/formatPrice.js";

const ProductCard = ({product}) => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const imageRef = useRef(null);

  const images = useMemo(() => {
    if (!product) return [];

    return [
      product.main_image,
      ...(product.gallery?.map((img) => img.image) || []),
    ].filter(Boolean);
  }, [product]);

  const handleMouseMove = (e) => {
    if (!imageRef.current || images.length <= 1) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    const index = Math.floor(ratio * images.length);

    setHoverIndex(
      Math.min(Math.max(index, 0), images.length - 1)
    );
  };

  const handleMouseLeave = () => {
    setHoverIndex(0);
  };

  if (!product) {
    return (
      <div className="product-card product-card--skeleton">
        <div className="product-card__image">
          <Skeleton height="100%" />
        </div>

        <div className="product-card__name">
          <Skeleton height={22} width="75%" />
        </div>

        <div className="product-card__info">
          <Skeleton height={26} width={90} />
        </div>
      </div>
    );
  }

  const currentImage =
    images[hoverIndex] || product.main_image;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>

        <div
          ref={imageRef}
          className="product-card__image"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
          />

          {images.length > 1 && (
            <div className="product-card__indicators">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`product-card__indicator ${
                    idx === hoverIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            title="Добавить в избранное"
            className="product-card__favorite"
            onClick={(e) => e.preventDefault()}
          >
            <FavoriteIcon/>
          </button>
        </div>

        <div className="product-card__name">
          {product.name}
        </div>

        <div className="product-card__info">
          <div className="product-card__price">
            {formatPrice(product.price)} ₽
          </div>

          {product.colors?.length > 0 && (
            <div className="product-card__colors">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="product-card__color"
                  style={{backgroundColor: color.hex}}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>

      </Link>
    </div>
  );
};

export default ProductCard;