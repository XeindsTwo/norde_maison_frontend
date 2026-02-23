import {AnimatePresence, motion} from "framer-motion";
import DownLine from "@/assets/images/icons/down-line.svg";
import ResetFilters from "@/assets/images/icons/reset-filters.svg";
import CheckIcon from "@/assets/images/icons/bx_check.svg";

export default function ColorFilter({
                                      filters,
                                      colors,
                                      toggleMulti,
                                      resetFilters,
                                      activeDropdown,
                                      setActiveDropdown,
                                      dropdownRefs
                                    }) {

  if (!filters?.colors?.length) return null;

  return (
    <div className="filters__item">

      <button
        className="filters__button"
        onClick={() =>
          setActiveDropdown(activeDropdown === "colors" ? null : "colors")
        }
      >
        Цвет

        {colors.length > 0 && (
          <span className="filters__counter">{colors.length}</span>
        )}

        {colors.length > 0 && (
          <ResetFilters
            className="filters__reset filters__reset--hoverable"
            onClick={e => {
              e.stopPropagation();
              resetFilters("color");
            }}
          />
        )}

        <DownLine className={`filters__arrow ${activeDropdown === "colors" ? "is-rotated" : ""}`}/>
      </button>

      <AnimatePresence>
        {activeDropdown === "colors" && (
          <motion.div
            ref={el => dropdownRefs.current["colors"] = el}
            className="filters__dropdown"
            initial={{opacity: 0, y: -12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
          >
            {filters.colors.map(color => {

              const name = color.color_name;
              const active = colors.includes(name);

              return (
                <div
                  key={name}
                  className={`filters__color ${active ? "is-active" : ""}`}
                  onClick={() => toggleMulti("color", name)}
                >
                  <div
                    className="filters__color-circle"
                    style={{background: color.color_hex}}
                  />

                  {name}
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