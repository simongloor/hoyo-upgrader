/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Box.scss';

export default function Box({ children, className }) {
  return (
    <div
      className={`Box ${className || ''}`}
    >
      {children}
    </div>
  );
}
