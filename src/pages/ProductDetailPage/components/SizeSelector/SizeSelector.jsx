import "./SizeSelector.scss";

const SizeSelector = ({sizes = [], selected, onSelect}) => {

  if (!sizes.length) return null;

  return (
    <div className="product-info__block">
      <div className="product-info__top">
        <h3 className="product-info__subtitle">Размер</h3>
      </div>
      <div className="size-selector__list">
        {sizes.map((item, index) => {

          const active = selected?.size === item.size;
          const disabled = item.stock === 0;

          return (
            <button
              key={index}
              className={`size-selector__item ${active ? "active" : ""}`}
              disabled={disabled}
              onClick={() => onSelect(item)}
            >
              {item.size}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default SizeSelector;