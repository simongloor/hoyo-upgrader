/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Character.scss';
import { useDispatch } from 'react-redux';
import { toggleCharacterFilter } from '../data/actions/filter';

export default function Character({
  character = 'generic',
  secondaryCharacter,
  sets,
  upgradePotential = 0,
  onClick,
  inactive,
  disabled,
}) {
  const dispatch = useDispatch();

  // event handlers
  const handleClick = () => {
    // console.log(`Character: ${characterName} ${buildName}`);
    if (onClick) {
      onClick(character);
    } else {
      dispatch(toggleCharacterFilter(character, sets));
    }
  };

  // render
  return (
    <button
      className={`Character tile ${character} ${inactive ? 'inactive' : 'active'} ${disabled ? 'disabled' : ''}`}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/characters/${character}.png`}
        alt={character}
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
