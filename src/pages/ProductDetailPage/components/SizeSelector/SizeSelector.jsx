 import "./SizeSelector.scss";

const SIZE_ORDER = {
  XXS: 0, XS: 1, S: 2, M: 3, L: 4, XL: 5, XXL: 6, UNI: 7
};

const SizeSelector = ({sizes = [], selected, onSelect, onOpenSizeQuiz }) => {
  if (!sizes.length) return null;

  const hasUniOnly = sizes.length === 1 && sizes[0].size === "UNI";
  const sortedSizes = [...sizes].sort((a, b) =>
    (SIZE_ORDER[a.size] ?? 99) - (SIZE_ORDER[b.size] ?? 99)
  );

  return (
    <div className="product-info__block">
      <div className="product-info__top">
        <h3 className="product-info__subtitle">Размер</h3>
        {!hasUniOnly && (
          <button
            type="button"
            className="product-info__helper"
            onClick={onOpenSizeQuiz}
          >
            Какой у меня размер?
          </button>
        )}
      </div>
      <div className="size-selector__list">
        {sortedSizes.map((item, index) => {
          const active = selected?.size === item.size;
          const disabled = item.stock === 0;

          return (
            <button
              key={item.size}
              className={`size-selector__item ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
              disabled={disabled}
              onClick={() => !disabled && onSelect(item)}
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