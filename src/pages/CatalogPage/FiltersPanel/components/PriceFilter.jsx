import {AnimatePresence, motion} from "framer-motion";
import DownLine from "@/assets/images/icons/down-line.svg";
import ResetFilters from "@/assets/images/icons/reset-filters.svg";
import {formatPrice} from "@/utils/formatPrice";

export default function PriceFilter({
                                      priceMin,
                                      priceMax,
                                      setPriceMin,
                                      setPriceMax,
                                      activeDropdown,
                                      setActiveDropdown,
                                      applyQuery,
                                      resetFilters,
                                      dropdownRefs,
                                      currency
                                    }) {

  const placeholderMap = {
    rub: {
      min: "от 0 ₽",
      max: "до 200 000 ₽"
    },
    kzt: {
      min: "от 0 ₸",
      max: "до 100 000 ₸"
    },
    byn: {
      min: "от 0 Br",
      max: "до 50 000 Br"
    }
  };

  const placeholders = placeholderMap[currency] || placeholderMap.rub;

  const buildPriceText = () => {

    const minFormatted = priceMin ? formatPrice(priceMin, currency) : null;
    const maxFormatted = priceMax ? formatPrice(priceMax, currency) : null;

    if (!minFormatted && !maxFormatted) return "Цена";

    if (minFormatted && !maxFormatted) {
      return (
        <>
          Цена <span className="filters__muted">от {minFormatted}</span>
        </>
      );
    }

    if (!minFormatted && maxFormatted) {
      return (
        <>
          Цена <span className="filters__muted">до {maxFormatted}</span>
        </>
      );
    }

    return (
      <>
        Цена{" "}
        <span className="filters__muted">
          {minFormatted} — {maxFormatted}
        </span>
      </>
    );
  };

  return (
    <div className="filters__item">

      <button
        className="filters__button"
        onClick={() =>
          setActiveDropdown(activeDropdown === "price" ? null : "price")
        }
      >
        {buildPriceText()}

        {(priceMin || priceMax) && (
          <ResetFilters
            className="filters__reset filters__reset--hoverable"
            onClick={e => {
              e.stopPropagation();
              resetFilters("price");
            }}
          />
        )}

        <DownLine
          className={`filters__arrow ${
            activeDropdown === "price" ? "is-rotated" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {activeDropdown === "price" && (
          <motion.div
            ref={el => dropdownRefs.current["price"] = el}
            className="filters__dropdown filters__dropdown--price"
            initial={{opacity: 0, y: -12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
          >
            <div className="filters__price-grid">
              <input
                placeholder={`${placeholders.min}`}
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
              />
              <input
                placeholder={`${placeholders.max}`}
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
              />
            </div>

            <button className="filters__apply" onClick={() => applyQuery()}>
              Применить
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}