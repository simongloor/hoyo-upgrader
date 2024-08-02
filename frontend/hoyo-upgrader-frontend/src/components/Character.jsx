/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Character.scss';
import { useDispatch } from 'react-redux';
import { toggleCharacterFilter } from '../data/actions/filter';

export default function Character({
  characterName = 'generic',
  sets,
  upgradePotential = 0,
}) {
  const dispatch = useDispatch();

  // event handlers
  const handleClick = () => {
    // console.log(`Character: ${characterName} ${buildName}`);
    dispatch(toggleCharacterFilter(characterName, sets));
  };

  // render
  return (
    <button
      className={`Character tile ${characterName}`}
      type="button"
      onClick={handleClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/characters/${characterName}.png`}
        alt={characterName}
      />
      {
        upgradePotential > 0 && (
          <div className="upgrade tile-marker">
            <div />
            <h6>{ `↑${upgradePotential}` }</h6>
          </div>
        )
      }
    </button>
  );
}
