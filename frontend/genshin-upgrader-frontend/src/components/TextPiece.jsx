/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/TextPiece.scss';

export default function TextPiece({ canOverflow, children }) {
  return (
    <span
      className={`TextPiece ${canOverflow ? 'overflow' : ''}`}
    >
      {children}
    </span>
  );
}
