/* eslint-disable no-unused-vars */
import React from 'react';

import { evaluateArtifactSet } from '../data/substats';

import Character from './Character';
import SpacerPiece from './SpacerPiece';
import Artifact from './Artifact';
import ArtifactStats from './ArtifactStats';
import CounterPiece from './CounterPiece';

// import '../styles/CharacterOverview.scss';

export default function CharacterOverview({ characterName, characterBuild, characterArtifacts }) {
  console.log(characterName, characterBuild, characterArtifacts);
  const totalSubstats = evaluateArtifactSet(characterArtifacts, characterBuild);
  return (
    <div
      className="CharacterOverview row"
    >
      <Character characterName={characterName} />
      <SpacerPiece />
      <Artifact data={characterArtifacts.flower} />
      <Artifact data={characterArtifacts.plume} />
      <Artifact data={characterArtifacts.sands} />
      <Artifact data={characterArtifacts.goblet} />
      <Artifact data={characterArtifacts.circlet} />
      <SpacerPiece />
      <ArtifactStats data={totalSubstats} />
      <CounterPiece count="???" />
    </div>
  );
}
