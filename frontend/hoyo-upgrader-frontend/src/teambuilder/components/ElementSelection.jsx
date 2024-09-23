/* eslint-disable no-unused-vars */
import React from 'react';
import ownedCharacters from '../data/mock/ownedCharacters';
import characters from '../data/characters';
import paths from '../../data/paths';
import Box from '../../components/Box';
// import '../styles/ElementSelection.scss';

export default function ElementSelection({
  onSelectElement,
}) {
  return (
    <Box
      className="ElementSelection"
    >
      <h2>select element</h2>
      <div className="row">
        {
          paths.elements.map((element) => {
            console.log('element', element);
            return (
              <button
                className="element tile"
                key={element}
                type="button"
                onClick={() => onSelectElement(element)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/genshin/elements/${element}.png`}
                  alt={element}
                />
              </button>
            );
          })
        }
      </div>
    </Box>
  );
}
