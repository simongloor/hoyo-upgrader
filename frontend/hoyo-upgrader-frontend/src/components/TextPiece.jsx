/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/TextPiece.scss';

export default function TextPiece({
  canOverflow,
  alignRight,
  children,
  className,
}) {
  return (
    <span
      className={`TextPiece ${className || ''} ${canOverflow ? 'overflow' : ''} ${alignRight ? 'right' : ''}`}
    >
      {children}
    </span>
  );
}
