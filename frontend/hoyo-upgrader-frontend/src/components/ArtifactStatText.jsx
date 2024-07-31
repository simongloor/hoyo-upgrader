/* eslint-disable no-unused-vars */
import React from 'react';

import paths, { getStatText } from '../data/paths';

import '../styles/ArtifactStatText.scss';

export default function ArtifactStatText({ artifactData }) {
  if (artifactData === null) {
    return null;
  }

  const slotCount = artifactData.substats.length;
  const stats = Array.from({ length: slotCount }, (_, index) => (
    getStatText(artifactData.substats[index])
  ));

  return (
    <div className="ArtifactStatText">
      <p>
        {stats.join('\n')}
      </p>
      {
        Array.from({ length: 4 - slotCount }, (_, index) => (
          <p className="missing" key={index}>
            missing
          </p>
        ))
      }
    </div>
  );
}
