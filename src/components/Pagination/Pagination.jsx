import { useState, useEffect, useMemo } from "react";
import "./Pagination.scss";

import ArrowLeft from "@/assets/images/icons/arrow-nav-left.svg";
import ArrowRight from "@/assets/images/icons/arrow-nav-right.svg";

const Pagination = ({
                      currentPage = 1,
                      totalPages = 1,
                      onChange
                    }) => {
  const [loading, setLoading] = useState(false);

  const safeChange = async (page) => {
    if (loading) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;

    try {
      setLoading(true);
      await onChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const pages = useMemo(() => {
    if (totalPages <= 1) return [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const result = [1];

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    result.push(totalPages);

    return result;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        disabled={loading || currentPage === 1}
        onClick={() => safeChange(currentPage - 1)}
      >
        <ArrowLeft />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          className={`pagination__item ${page === currentPage ? "is-active" : ""}`}
          disabled={loading || page === currentPage}
          onClick={() => safeChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__arrow"
        disabled={loading || currentPage === totalPages}
        onClick={() => safeChange(currentPage + 1)}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;