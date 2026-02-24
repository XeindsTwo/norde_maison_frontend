import {useState} from "react";
import './Pagination.scss';

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
    } finally {
      setLoading(false);
    }
  };

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">

      <button
        className="pagination__arrow"
        disabled={loading || currentPage === 1}
        onClick={() => safeChange(currentPage - 1)}
      >
        <ArrowLeft/>
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`pagination__item ${
            page === currentPage ? 'is-active' : ''
          }`}
          disabled={loading}
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
        <ArrowRight/>
      </button>

    </div>
  );
};

export default Pagination;