/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/NumberButton.scss';

export default function NumberButton({
  number,
  label,
  isBold,
  isSelected,
  onClick,
}) {
  return (
    <button
      className={`NumberButton ${isSelected ? 'selected' : ''}`}
      type="button"
      onClick={onClick}
      disabled={!onClick}
    >

      {
        number && (
          <>
            <h2 className={isBold ? 'bold' : ''}>
              {number}
            </h2>
            <div />
          </>
        )
      }
      <span>
        {label}
      </span>
    </button>
  );
}
