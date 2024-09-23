/* eslint-disable no-unused-vars */
import React from 'react';
import paths from '../../data/paths';

import Box from '../../components/Box';
// import '../styles/TheaterSelection.scss';

function getTheaterCombinationsForElement(element) {
  const allElements = paths.elements.filter((el) => el !== element);
  const elementCount = 3;

  // generate all combinations of 3 elements that include the selected element
  const elementCombinations = [];
  for (let i = 0; i < elementCount; i += 1) {
    for (let j = i + 1; j < elementCount; j += 1) {
      for (let k = j + 1; k < elementCount; k += 1) {
        elementCombinations.push([element, allElements[i], allElements[j], allElements[k]]);
      }
    }
  }

  return elementCombinations;
}

export default function TheaterSelection({
  selectedElement,
  onSelectElements,
}) {
  if (!selectedElement) {
    return null;
  }
  const elementCombinations = getTheaterCombinationsForElement(selectedElement);
  return (
    <Box
      className="TheaterSelection"
    >
      <h2>select theater</h2>
      {
        elementCombinations.map((elements) => (
          <button
            className="combination row"
            key={elements.join('-')}
            type="button"
            onClick={() => onSelectElements(elements)}
          >
            {
              elements.map((element) => (
                <div
                  className="element tile"
                  key={element}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/genshin/elements/${element}.png`}
                    alt={element}
                  />
                </div>
              ))
            }
          </button>
        ))
      }
    </Box>
  );
}
