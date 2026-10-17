import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages < 1) return null;

  // 표시할 페이지 번호 범위 계산 (최대 5개 노출)
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.4rem',
        marginTop: '2rem',
        padding: '0.5rem 0'
      }}
    >
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          color: currentPage <= 1 ? '#9ca3af' : '#374151',
          cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage <= 1 ? 0.5 : 1,
          transition: 'all 0.2s ease'
        }}
      >
        <ChevronLeft size={18} />
      </button>

      {/* 첫 페이지 바로가기 (범위가 멀어졌을 때) */}
      {startPage > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            1
          </button>
          {startPage > 2 && (
            <span style={{ color: '#9ca3af', padding: '0 0.2rem' }}>…</span>
          )}
        </>
      )}

      {/* 페이지 번호 목록 */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: isActive ? '1px solid var(--dark-green, #112a22)' : '1px solid #e5e7eb',
              backgroundColor: isActive ? 'var(--dark-green, #112a22)' : '#ffffff',
              color: isActive ? '#ffffff' : '#374151',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 2px 6px rgba(17, 42, 34, 0.2)' : 'none'
            }}
          >
            {page}
          </button>
        );
      })}

      {/* 마지막 페이지 바로가기 (범위가 멀어졌을 때) */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span style={{ color: '#9ca3af', padding: '0 0.2rem' }}>…</span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          color: currentPage >= totalPages ? '#9ca3af' : '#374151',
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage >= totalPages ? 0.5 : 1,
          transition: 'all 0.2s ease'
        }}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
