/* eslint-disable no-unused-vars */
import React from 'react';

import Artifact from './Artifact';
import '../styles/ArtifactMultiSet.scss';

export default function ArtifactMultiSet({ filter }) {
  return (
    <div
      className="ArtifactMultiSet"
    >
      {
        filter.filterCharacterSets ? (
          // build sets
          filter.characterSets.map((set, index) => (
            <div
              key={set}
              className={filter.filterCharacterSets ? 'active' : ''}
              style={{ width: `${84 * (1 - (index / filter.characterSets.length))}px` }}
            >
              <Artifact
                set={set}
                piece="flower"
              />
            </div>
          ))
        ) : (
          // placeholder
          <div
            className="placeholder"
          >
            <Artifact
              set="empty"
              piece="multi"
            />
          </div>
        )
      }
    </div>
  );
}
