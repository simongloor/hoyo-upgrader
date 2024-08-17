/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';

import circleEmpty from '../theme/circle_empty.svg';
import circleFilled from '../theme/circle_filled.svg';
import '../styles/TutorialPagination.scss';

export default function TutorialPagination({
  onPrev,
  onNext,
  pageNumber = 0,
  total = 1,
}) {
  if (total < 2) {
    return null;
  }

  return (
    <div
      className="TutorialPagination"
    >
      <div className="dots">
        {
          Array(total).fill().map((_, index) => (
            index === pageNumber
              ? (
                <img
                  key={index}
                  src={circleFilled}
                  alt=""
                />
              ) : (
                <img
                  key={index}
                  src={circleEmpty}
                  alt=""
                />
              )
          ))
        }
      </div>
      <div className="buttons">
        <button
          className={`${pageNumber === 0 ? 'secondary' : 'primary'}`}
          type="button"
          onClick={onPrev}
          disabled={pageNumber === 0}
        >
          <span>Previous</span>
        </button>
        <button
          className={`button ${pageNumber === total - 1 ? 'secondary' : 'primary'}`}
          type="button"
          onClick={onNext}
          disabled={pageNumber === total - 1}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}
