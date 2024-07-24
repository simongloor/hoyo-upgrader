/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/CounterPiece.scss';

export default function CounterPiece({ count }) {
  return (
    <div
      className="CounterPiece tile"
    >
      <h3>{count}</h3>
    </div>
  );
}
