/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Character.scss';
import { useDispatch, useStore } from 'react-redux';
import { toggleCharacterFilter } from '../data/actions/filter';

export function CharacterIcon({
  character = 'generic',
  secondaryCharacter,
}) {
  return (
    <div className={`Character tile ${character} CharacterIcon`}>
      <img
        src={`${process.env.PUBLIC_URL}/genshin/characters/${character}.png`}
        alt={character}
      />
      {
        secondaryCharacter && character !== secondaryCharacter && (
          <>
            <img
              className="secondary"
              src={`${process.env.PUBLIC_URL}/genshin/characters/${secondaryCharacter}.png`}
              alt={secondaryCharacter}
            />
            <div className="separator" />
          </>
        )
      }
    </div>
  );
}

export default function Character({
  className,
  character = 'generic',
  secondaryCharacter,
  upgradePotential = 0,
  onClick,
  selected,
  inactive,
  disabled,
}) {
  const dispatch = useDispatch();
  const store = useStore();

  // event handlers
  const handleClick = () => {
    if (onClick) {
      // call custom handler
      onClick(character);
    } else {
      // toggle character filter
      const characterBuild = store.getState().characters
        .find((char) => char.artifactWearer === character);
      dispatch(toggleCharacterFilter(
        character,
        secondaryCharacter,
        characterBuild.sets,
      ));
    }
  };

  // render
  return (
    <button
      className={`Character tile ${character} ${className || ''} ${selected ? 'selected' : ''} ${inactive ? 'inactive' : 'active'} ${disabled ? 'disabled' : ''}`}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/characters/${character}.png`}
        alt={character}
      />
      {
        selected && (
          <div className="selected-marker" />
        )
      }
      {
        secondaryCharacter && character !== secondaryCharacter && (
          <>
            <img
              className="secondary"
              src={`${process.env.PUBLIC_URL}/genshin/characters/${secondaryCharacter}.png`}
              alt={secondaryCharacter}
            />
            <div className="separator" />
          </>
        )
      }
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
