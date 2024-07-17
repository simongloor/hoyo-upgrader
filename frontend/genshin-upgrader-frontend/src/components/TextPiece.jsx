/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/TextPiece.scss';

export default function TextPiece({ children }) {
  return (
    <span
      className="TextPiece"
    >
      {children}
    </span>
  );
}
