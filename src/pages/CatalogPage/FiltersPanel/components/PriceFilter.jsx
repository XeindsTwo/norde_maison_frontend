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
                                      dropdownRefs
                                    }) {

  const label = () => {

    if (!priceMin && !priceMax) return "Цена";

    if (priceMin && !priceMax)
      return <>Цена <span className="filters__muted">от {formatPrice(priceMin)}</span></>;

    if (!priceMin && priceMax)
      return <>Цена <span className="filters__muted">0 - {formatPrice(priceMax)}</span></>;

    return (
      <>
        Цена <span className="filters__muted">
          {formatPrice(priceMin)} — {formatPrice(priceMax)}
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
        {label()}

        {(priceMin || priceMax) && (
          <ResetFilters
            className="filters__reset filters__reset--hoverable"
            onClick={e => {
              e.stopPropagation();
              resetFilters("price");
            }}
          />
        )}

        <DownLine className={`filters__arrow ${activeDropdown === "price" ? "is-rotated" : ""}`}/>
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
                placeholder="от 6 500"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
              />

              <input
                placeholder="до 32 000"
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