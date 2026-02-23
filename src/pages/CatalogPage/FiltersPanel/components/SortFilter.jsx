import {AnimatePresence, motion} from "framer-motion";
import DownLine from "@/assets/images/icons/down-line.svg";
import CheckIcon from "@/assets/images/icons/bx_check.svg";

export default function SortFilter({
                                     sort,
                                     setSort,
                                     applyQuery,
                                     activeDropdown,
                                     setActiveDropdown,
                                     dropdownRefs
                                   }) {

  const sortOptions = [
    {value: "default", label: "По умолчанию"},
    {value: "price_asc", label: "По возрастанию цены"},
    {value: "price_desc", label: "По убыванию цены"},
    {value: "newest", label: "По новизне"}
  ];

  const sortOptionsMap = sortOptions.reduce((acc, o) => {
    acc[o.value] = o.label;
    return acc;
  }, {});

  const currentSortLabel = sortOptionsMap[sort] || "Сортировка";

  return (
    <div className="filters__item">

      <button
        className="filters__button"
        onClick={() =>
          setActiveDropdown(activeDropdown === "sort" ? null : "sort")
        }
      >
        {currentSortLabel}

        <DownLine className={`filters__arrow ${activeDropdown === "sort" ? "is-rotated" : ""}`}/>
      </button>

      <AnimatePresence>
        {activeDropdown === "sort" && (
          <motion.div
            ref={el => dropdownRefs.current["sort"] = el}
            className="filters__dropdown filters__dropdown--right"
            initial={{opacity: 0, y: -12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
          >
            {sortOptions.map(opt => {

              const active = sort === opt.value;

              return (
                <div
                  key={opt.value}
                  className={`filters__option ${active ? "is-active" : ""}`}
                  onClick={() => {
                    setSort(opt.value);
                    applyQuery({sort: opt.value});
                    setActiveDropdown(null);
                  }}
                >
                  {opt.label}
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