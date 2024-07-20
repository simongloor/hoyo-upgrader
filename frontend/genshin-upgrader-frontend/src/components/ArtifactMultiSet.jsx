/* eslint-disable no-unused-vars */
import React from 'react';

import Artifact from './Artifact';
import '../styles/ArtifactMultiSet.scss';

export default function ArtifactMultiSet({
  characterFilter,
  characterSets,
  buildFilterEnabled,
}) {
  return (
    <div
      className="ArtifactMultiSet"
    >
      {
        characterFilter ? (
          // placeholder
          <div
            className="placeholder"
          >
            <Artifact
              set="empty"
              piece="flower"
            />
          </div>
        ) : (
          // build sets
          characterSets.map((set, index) => (
            <div
              key={set}
              className={buildFilterEnabled ? 'active' : ''}
              style={{ width: `${84 * (1 - (index / characterSets.length))}px` }}
            >
              <Artifact
                set={set}
                piece="flower"
              />
            </div>
          ))

        )
      }
    </div>
  );
}
