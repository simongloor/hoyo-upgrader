/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Character.scss';

export default function Character({ characterName }) {
  return (
    <div
      className="Character tile"
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/characters/${characterName}.png`}
        alt={characterName}
      />
    </div>
  );
}
