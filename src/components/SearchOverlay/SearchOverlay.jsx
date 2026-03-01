import {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import './SearchOverlay.scss';

import IconCross from "@/assets/images/icons/cross-modal.svg";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import {searchProducts} from "@/api/catalog";

const PAGE_SIZE = 16;
const PREVIEW_LIMIT = 8;

const SearchOverlay = ({isOpen, onClose}) => {

  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const [query, setQuery] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [renderReady, setRenderReady] = useState(false);
  const [searched, setSearched] = useState(false);

  const isQueryEmpty = !query || !query.trim();

  const performSearch = async (value) => {

    const q = value?.trim();

    if (!q) {
      setProducts([]);
      setSearched(false);
      setRenderReady(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    setRenderReady(false);

    try {

      const res = await searchProducts({
        q,
        page: 1,
        page_size: PAGE_SIZE
      });

      const data = res?.data?.results || [];

      setTimeout(() => {
        setProducts(data);
        setRenderReady(true);
      }, 250);

    } finally {

      setTimeout(() => {
        setLoading(false);
      }, 180);

    }
  };

  useEffect(() => {

    if (debounceRef.current)
      clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

  }, [query]);

  useEffect(() => {

    const handleKey = (e) => {

      if (!isOpen) return;

      if (e.key === "Escape")
        onClose();

      if (e.key === "Enter")
        performSearch(query);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      setTimeout(() => inputRef.current?.focus(), 80);
    }

    return () => document.removeEventListener("keydown", handleKey);

  }, [isOpen, query]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const previewProducts = products.slice(0, PREVIEW_LIMIT);

  const showSpinner = loading && !renderReady;

  const showEmpty =
    searched &&
    !loading &&
    renderReady &&
    products.length === 0;

  const skeletonGrid = Array.from({length: PREVIEW_LIMIT}).map((_, i) => (
    <ProductCard key={i} product={null}/>
  ));

  const handleOpenAll = () => {
    window.location.href =
      `/search?q=${encodeURIComponent(query.trim())}`;
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
            transition={{
              duration: 0.28,
              ease: [0.4, 0, 0.2, 1]
            }}
          >

            <div className="container">

              <div className="search-overlay__inner">

                <div className="search-overlay__top">

                  <div className="search-overlay__field">

                    <input
                      ref={inputRef}
                      className="search-overlay__input"
                      placeholder="Найти..."
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    />

                    <button
                      className="search-overlay__icon-btn"
                      onClick={() => performSearch(query)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24"
                           stroke="currentColor" strokeWidth="1.8" fill="none">
                        <circle cx="11" cy="11" r="7"/>
                        <line x1="17" y1="17" x2="22" y2="22"/>
                      </svg>
                    </button>

                  </div>

                  <div className="search-overlay__hint">

                    {showSpinner && (
                      <div className="search-overlay__spinner"/>
                    )}

                    {isQueryEmpty && !searched && !loading && (
                      <p>Введите запрос, чтобы увидеть результаты</p>
                    )}

                    {showEmpty && (
                      <p className="search-overlay__empty">
                        Ничего не найдено. Проверьте написание или попробуйте другой запрос
                      </p>
                    )}

                  </div>

                </div>

                <div className="search-overlay__results">

                  {renderReady && products.length > 0 && (
                    <>
                      <div className="search-overlay__grid">

                        {previewProducts.map(p => (
                          <ProductCard key={p.id} product={p}/>
                        ))}

                      </div>

                      {products.length > PREVIEW_LIMIT && (
                        <div className="search-overlay__more">
                          <button
                            className="btn search-overlay__more-btn"
                            onClick={handleOpenAll}
                          >
                            Открыть все результаты
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {loading && !renderReady && (
                    <div className="search-overlay__grid">
                      {skeletonGrid}
                    </div>
                  )}

                </div>

              </div>

            </div>

            <button className="search-overlay__close" onClick={onClose}>
              <IconCross/>
            </button>

          </motion.div>
        </>
      )}

    </AnimatePresence>
  );
};

export default SearchOverlay;