import {AnimatePresence, motion} from "framer-motion";
import DownLine from "@/assets/images/icons/down-line.svg";
import ResetFilters from "@/assets/images/icons/reset-filters.svg";
import CheckIcon from "@/assets/images/icons/bx_check.svg";

export default function SizeFilter({
                                     filters,
                                     sizes,
                                     sortedSizes,
                                     toggleMulti,
                                     resetFilters,
                                     activeDropdown,
                                     setActiveDropdown,
                                     dropdownRefs
                                   }) {

  if (!filters?.sizes?.length) return null;

  return (
    <div className="filters__item">

      <button
        className="filters__button"
        onClick={() =>
          setActiveDropdown(activeDropdown === "sizes" ? null : "sizes")
        }
      >
        Размер одежды

        {sizes.length > 0 && (
          <span className="filters__counter">{sizes.length}</span>
        )}

        {sizes.length > 0 && (
          <ResetFilters
            className="filters__reset filters__reset--hoverable"
            onClick={e => {
              e.stopPropagation();
              resetFilters("size");
            }}
          />
        )}

        <DownLine className={`filters__arrow ${activeDropdown === "sizes" ? "is-rotated" : ""}`}/>
      </button>

      <AnimatePresence>
        {activeDropdown === "sizes" && (
          <motion.div
            ref={el => dropdownRefs.current["sizes"] = el}
            className="filters__dropdown"
            initial={{opacity: 0, y: -12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
          >
            {sortedSizes.map(size => {

              const active = sizes.includes(size);

              return (
                <div
                  key={size}
                  className={`filters__option ${active ? "is-active" : ""}`}
                  onClick={() => toggleMulti("size", size)}
                >
                  {size}
                  {active && <CheckIcon/>}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}