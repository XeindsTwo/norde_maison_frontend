import "./ColorSelector.scss";

const ColorSelector = ({ colors = [], selected, onSelect }) => {

  if (!colors.length) return null;

  return (
    <div className="product-info__block">
      <h3 className="product-info__subtitle">
        Цвет: {selected?.name || "—"}
      </h3>
      <div className="color-selector__list">

        {colors.map((color, index) => {
          const active = selected?.hex === color.hex;

          return (
            <button
              key={index}
              className={`color-selector__item ${active ? "active" : ""}`}
              onClick={() => onSelect(color)}
            >
              <span
                className="color-selector__inner"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default ColorSelector;