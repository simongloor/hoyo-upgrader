/* eslint-disable no-unused-vars */
import React from 'react';
import paths, { getCharacterImgPath } from '../../data/paths';
import '../styles/ElementCharacters.scss';
import characters from '../data/characters';
import ownedCharacters from '../data/mock/ownedCharacters';

export default function ElementCharacters({ element }) {
  const ownedCharactersData = characters
    .filter((char) => ownedCharacters.includes(char.name));

  const renderRole = (role) => (
    <>
      <img
        className="tile role"
        src={`${process.env.PUBLIC_URL}/genshin/roles/${role}.png`}
        alt={role}
      />
      {
        ownedCharactersData
          .filter((char) => char.element === element && char.role === role)
          .map((char) => (
            <img
              className="tile character"
              src={getCharacterImgPath(
                Object.keys(paths.character).find((key) => paths.character[key] === char.name),
              )}
              alt={char.name}
              key={char.name}
            />
          ))
      }
    </>
  );

  return (
    <div
      className="ElementCharacters row"
    >
      <img
        className="tile"
        src={`${process.env.PUBLIC_URL}/genshin/elements/${element}.png`}
        alt={element}
      />
      {
        paths.roles.map((role) => renderRole(role))
      }
    </div>
  );
}
