/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Character.scss';
import { useDispatch } from 'react-redux';
import { toggleCharacterFilter } from '../data/actions/filter';

export default function Character({
  characterName,
  buildName,
}) {
  const dispatch = useDispatch();

  // event handlers
  const handleClick = () => {
    // console.log(`Character: ${characterName} ${buildName}`);
    dispatch(toggleCharacterFilter(characterName, buildName));
  };

  // render
  return (
    <button
      className="Character tile"
      type="button"
      disabled={buildName === undefined}
      onClick={handleClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/characters/${characterName}.png`}
        alt={characterName}
      />
    </button>
  );
}
