/* eslint-disable no-unused-vars */
import React from 'react';

import Artifact from './Artifact';
import '../styles/ArtifactMultiSet.scss';

export default function ArtifactMultiSet({ sets }) {
  return (
    <div
      className="ArtifactMultiSet"
    >
      {
        sets.map((set, index) => (
          <div style={{ width: `${84 * (1 - (index / sets.length))}px` }} key={set}>
            <Artifact
              set={set}
              piece="flower"
            />
          </div>
        ))
      }
    </div>
  );
}
