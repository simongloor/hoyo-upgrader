/* eslint-disable no-unused-vars */
import React from 'react';

import { combineSubstats } from '../data/substats';

import Character from './Character';
import SpacerPiece from './SpacerPiece';
import Artifact from './Artifact';
import ArtifactStats from './ArtifactStats';
import CounterPiece from './CounterPiece';

// import '../styles/CharacterOverview.scss';

export default function CharacterOverview({ characterName, characterData, artifactData }) {
  const totalSubstats = combineSubstats(artifactData);
  return (
    <div
      className="CharacterOverview row"
    >
      <Character characterName={characterName} />
      <SpacerPiece />
      <Artifact data={artifactData.flower} />
      <Artifact data={artifactData.plume} />
      <Artifact data={artifactData.sands} />
      <Artifact data={artifactData.goblet} />
      <Artifact data={artifactData.circlet} />
      <SpacerPiece />
      <ArtifactStats data={totalSubstats} />
      <CounterPiece count="???" />
    </div>
  );
}
