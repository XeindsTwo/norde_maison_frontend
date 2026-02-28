import "./ProductInfo.scss";
import {useEffect, useState, useMemo} from "react";
import {useCurrency} from "@/context/CurrencyContext";
import {normalizeHex} from "@/utils/color";
import {formatPrice} from "@/utils/formatPrice.js";
import ColorSelector from "../ColorSelector/ColorSelector";
import SizeSelector from "../SizeSelector/SizeSelector";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import FavoriteIcon from "@/assets/images/icons/bx_star.svg";
import {useAuth} from "@/context/AuthContext";

const ProductInfo = ({product}) => {
  const {isAuth, openAuth} = useAuth();
  const {currency} = useCurrency();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    setSelectedSize(null);
  }, [selectedColor]);

  const filteredSizes = useMemo(() => {
    if (!product?.variants || !selectedColor) return [];

    const colorHex = normalizeHex(selectedColor.hex);
    const map = {};

    product.variants
      .filter(v => normalizeHex(v.color_hex) === colorHex)
      .forEach(v => {
        map[v.size] = (map[v.size] || 0) + v.stock;
      });

    return Object.entries(map).map(([size, stock]) => ({
      size,
      stock
    }));

  }, [product, selectedColor]);

  useEffect(() => {
    if (!filteredSizes.some(s => s.size === selectedSize?.size)) {
      setSelectedSize(null);
    }
  }, [filteredSizes]);

  if (!product) return null;

  const priceMap = {
    rub: product.price_rub,
    kzt: product.price_kzt,
    byn: product.price_byn,
  };

  const currentPrice = priceMap[currency] ?? product.price_rub;

  return (
    <div className="product-info">
      <h1 className="product-info__title">
        {product.name}
        <button
          type="button"
          className="product-info__favorite"
          onClick={() => {
            if (!isAuth) {
              openAuth();
              return;
            }

            // TODO: здесь логика добавления в избранное
            console.log("Add to favorites");
          }}
        >
          <FavoriteIcon/>
        </button>
      </h1>

      <div className="product-info__price">
        {formatPrice(currentPrice, currency)}
      </div>

      <ColorSelector
        colors={product.colors}
        selected={selectedColor}
        onSelect={setSelectedColor}
      />

      <SizeSelector
        sizes={filteredSizes}
        selected={selectedSize}
        onSelect={setSelectedSize}
      />

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        max={10}
      />

      <AddToCartButton
        product={product}
        color={selectedColor}
        size={selectedSize}
        quantity={quantity}
      />

      <div className="product-info__description">
        <div
          className="product-info__content"
          dangerouslySetInnerHTML={{
            __html: product.description
          }}
        />
      </div>
    </div>
  );
};

export default ProductInfo;