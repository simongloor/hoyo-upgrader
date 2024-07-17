/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/SpacerPiece.scss';

export default function SpacerPiece({ size = 'small' }) {
  return (
    <div
      className={`SpacerPiece ${size}`}
    />
  );
}
