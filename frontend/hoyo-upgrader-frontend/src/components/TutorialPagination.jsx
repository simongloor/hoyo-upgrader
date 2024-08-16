/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
// import '../styles/TutorialPagination.scss';

export default function TutorialPagination({
  onPrev,
  onNext,
  page,
  total,
}) {
  return (
    <div
      className="TutorialPagination"
    >
      <div className="dots">
        {Array.from({ length: total }).map((_, index) => (
          <span key={index} className={index === page ? 'active' : ''}>o</span>
        ))}
      </div>
      <div className="buttons">
        <button
          className={`${page === 0 ? 'secondary' : 'primary'}`}
          type="button"
          onClick={onPrev}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          className={`button ${page === total - 1 ? 'primary' : 'secondary'}`}
          type="button"
          onClick={onNext}
          disabled={page === total - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
