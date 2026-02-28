import "./QuantitySelector.scss"

const QuantitySelector = ({quantity, setQuantity, max}) => {

  return (

    <div className="product-info__block">
      <h3 className="product-info__subtitle">Количество</h3>
      <div className="quantity-counter">
        <button className="quantity-counter__element"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="quantity-counter__element counter">{quantity}</span>
        <button className="quantity-counter__element"
          onClick={() => setQuantity(Math.min(max, quantity + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;