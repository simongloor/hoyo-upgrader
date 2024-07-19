/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/TextPiece.scss';

export default function TextPiece({ canOverflow, alignRight, children }) {
  return (
    <span
      className={`TextPiece ${canOverflow ? 'overflow' : ''} ${alignRight ? 'right' : ''}`}
    >
      {children}
    </span>
  );
}
