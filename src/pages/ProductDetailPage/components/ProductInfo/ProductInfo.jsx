import "./ProductInfo.scss";
import {useState, useEffect, useMemo} from "react";
import {useCurrency} from "@/context/CurrencyContext";
import {normalizeHex} from "@/utils/color";
import {formatPrice} from "@/utils/formatPrice.js";
import {useCart} from "@/hooks/useCart";

import ColorSelector from "../ColorSelector/ColorSelector";
import SizeSelector from "../SizeSelector/SizeSelector";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton.jsx";
import ProductDeliveryInfo from "@/pages/ProductDetailPage/ProductDeliveryInfo";

const MAX_PER_ITEM = 5;

const ProductInfo = ({product}) => {

  const {currency} = useCurrency();
  const {data: cart} = useCart();

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

    return Object.entries(map).map(([size]) => ({size}));

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

  const currentPrice =
    priceMap[currency] ?? product.price_rub;

  const variant = product?.variants?.find(v =>
    selectedColor &&
    selectedSize &&
    normalizeHex(v.color_hex) === normalizeHex(selectedColor.hex) &&
    v.size === selectedSize.size
  );

  const cartItem = cart?.items?.find(
    item => item.variant === variant?.id
  );

  const stock = variant?.stock ?? 0;

  const limit = Math.min(MAX_PER_ITEM, stock);

  const currentQuantity = cartItem?.quantity ?? 0;

  const limitReached =
    !!variant && currentQuantity >= limit;

  return (
    <div className="product-info">

      <h1 className="product-info__title">
        {product.name}

        <FavoriteButton
          productId={product.id}
          className="product-info__favorite"
          iconClassName=""
        />
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
        max={MAX_PER_ITEM}
      />

      {limitReached && (
        <p className="product-info__warning">
          Это максимальное количество конкретного варианта доступное для заказа
        </p>
      )}

      <AddToCartButton
        product={product}
        color={selectedColor}
        size={selectedSize}
        quantity={quantity}
        variant={variant}
        limitReached={limitReached}
      />

      <ProductDeliveryInfo
        price={currentPrice}
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