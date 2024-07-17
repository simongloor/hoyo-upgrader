/* eslint-disable no-unused-vars */
import React from 'react';

import { evaluateArtifactSet } from '../data/substats';

import Character from './Character';
import SpacerPiece from './SpacerPiece';
import Artifact from './Artifact';
import ArtifactStats from './ArtifactStats';

// import '../styles/CharacterOverview.scss';

export default function CharacterOverview({
  characterName,
  characterBuild,
  characterArtifacts,
  totalSubstats,
}) {
  return (
    <div
      className="CharacterOverview row"
    >
      <Character characterName={characterName} />
      <SpacerPiece />
      <Artifact data={characterArtifacts.flower} characterBuild={characterBuild} />
      <Artifact data={characterArtifacts.plume} characterBuild={characterBuild} />
      <Artifact data={characterArtifacts.sands} characterBuild={characterBuild} />
      <Artifact data={characterArtifacts.goblet} characterBuild={characterBuild} />
      <Artifact data={characterArtifacts.circlet} characterBuild={characterBuild} />
      <SpacerPiece />
      <ArtifactStats totalSubstats={totalSubstats} />
    </div>
  );
}
