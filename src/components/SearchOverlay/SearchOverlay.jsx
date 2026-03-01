import {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate} from "react-router-dom";

import './SearchOverlay.scss';
import IconCross from "@/assets/images/icons/cross-modal.svg";
import SearchOverlaySearchField from "./components/SearchOverlaySearchField.jsx";
import SearchOverlayHint from "./components/SearchOverlayHint.jsx";
import SearchOverlayGrid from "./components/SearchOverlayGrid.jsx";
import SearchOverlaySkeleton from "./components/SearchOverlaySkeleton.jsx";
import {useProductSearch} from "@/hooks/useProductSearch";

const PREVIEW_LIMIT_SKELETON = 4;
const PREVIEW_LIMIT = 8;
const DEBOUNCE_MS = 500;
const MIN_SKELETON_MS = 800;

const SearchOverlay = ({isOpen, onClose}) => {

  const navigate = useNavigate();

  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [uiLoading, setUiLoading] = useState(false);

  useEffect(() => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setUiLoading(false);
      return;
    }

    setUiLoading(true);

    const timer = setTimeout(() => {
      setUiLoading(false);
    }, MIN_SKELETON_MS);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const {data} = useProductSearch({
    q: debouncedQuery,
    page: 1,
    page_size: PREVIEW_LIMIT
  });

  const products = data?.results || [];

  useEffect(() => {
    const handleKey = e => {
      if (isOpen && e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);

      clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      clearTimeout(focusTimeoutRef.current);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const previewProducts = products.slice(0, PREVIEW_LIMIT);
  const isQueryEmpty = !query.trim();

  const showSkeleton = uiLoading && !!debouncedQuery;

  const showResults =
    !uiLoading &&
    !!debouncedQuery &&
    products.length > 0;

  const handleOpenAll = () => {
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="search-overlay__backdrop"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
          />

          <motion.div
            className="search-overlay__panel"
            initial={{opacity: 0, y: -40}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -40}}
            transition={{duration: 0.28}}
          >

            <div className="container container--padding">
              <div className="search-overlay__inner">

                <div className="search-overlay__top">

                  <SearchOverlaySearchField
                    inputRef={inputRef}
                    query={query}
                    setQuery={setQuery}
                  />

                  <div className="search-overlay__hint">
                    <SearchOverlayHint
                      isQueryEmpty={isQueryEmpty}
                      products={products}
                      hasQuery={!!debouncedQuery}
                      isLoading={uiLoading}
                    />
                  </div>

                </div>

                <div className="search-overlay__results">

                  {showSkeleton && (
                    <SearchOverlaySkeleton limit={PREVIEW_LIMIT_SKELETON}/>
                  )}

                  {showResults && (
                    <>
                      <SearchOverlayGrid
                        products={previewProducts}
                        limit={PREVIEW_LIMIT}
                      />

                      {products.length > PREVIEW_LIMIT && (
                        <div className="search-overlay__more">
                          <button
                            className="search-overlay__btn btn btn--black"
                            onClick={handleOpenAll}
                          >
                            Открыть все результаты
                          </button>
                        </div>
                      )}
                    </>
                  )}

                </div>

              </div>
            </div>

            <button
              className="search-overlay__close"
              onClick={onClose}
            >
              <IconCross/>
            </button>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;