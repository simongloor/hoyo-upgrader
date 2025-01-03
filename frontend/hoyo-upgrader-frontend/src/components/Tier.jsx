/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Tier.scss';

export default function Tier({
  letter = 'S',
  setLetter,
}) {
  const handleClick = () => {
    if (setLetter) {
      const letters = ['S', 'A', 'B', 'C', 'D'];
      setLetter(letters[(letters.indexOf(letter) + 1) % letters.length]);
    }
  };
  return (
    <button
      className={`Tier tile ${letter}`}
      onClick={handleClick}
      type="button"
    >
      <h3>{letter}</h3>
    </button>
  );
}
