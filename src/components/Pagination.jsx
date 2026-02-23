import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * T15: Pagination Component
 *
 * Props:
 *   currentPage   — aktif sayfa (1-based)
 *   totalItems    — toplam ürün sayısı (API'den gelen total)
 *   itemsPerPage  — limit (default 25)
 *   onPageChange  — (page: number) => void
 *
 * API parametreleri:
 *   offset = (currentPage - 1) * itemsPerPage
 *   limit  = itemsPerPage
 *
 * Örnek: sayfa 2, limit 25 → offset=25 → /products?limit=25&offset=25
 */
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  /* ── sayfa numarası listesi: 1 … 4 5 6 … 12 ── */
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '…', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages);
    }

    return pages;
  };

  const btnBase =
    'min-w-[40px] h-10 px-3 flex items-center justify-center border font-bold text-sm rounded transition-all select-none';
  const btnActive = 'bg-[#23A6F0] text-white border-[#23A6F0] shadow-sm';
  const btnNormal = 'bg-white text-[#737373] border-gray-200 hover:border-[#23A6F0] hover:text-[#23A6F0]';
  const btnDisabled = 'bg-white text-[#BDBDBD] border-gray-200 cursor-not-allowed';

  return (
    <div className="flex flex-col items-center gap-3 py-10">

      {/* Sayfa bilgisi */}
      <p className="text-sm text-[#737373]">
        Page <span className="font-bold text-[#252B42]">{currentPage}</span> of{' '}
        <span className="font-bold text-[#252B42]">{totalPages}</span>
        {' '}—{' '}
        <span className="font-bold text-[#252B42]">{totalItems}</span> total products
      </p>

      {/* Butonlar */}
      <div className="flex items-center gap-1 flex-wrap justify-center">

        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnNormal} hidden sm:flex`}
          title="First page"
        >
          «
        </button>

        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} gap-1 ${currentPage === 1 ? btnDisabled : btnNormal}`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, i) =>
          page === '…' ? (
            <span key={`ellipsis-${i}`} className="min-w-[40px] h-10 flex items-center justify-center text-[#737373] text-sm">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${btnBase} ${currentPage === page ? btnActive : btnNormal}`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} gap-1 ${currentPage === totalPages ? btnDisabled : btnNormal}`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnNormal} hidden sm:flex`}
          title="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;