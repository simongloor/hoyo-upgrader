/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import togglePinnedArtifact from '../data/actions/pinboard';

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
  const dispatch = useDispatch();

  const renderArtifact = (data) => (
    <button
      type="button"
      className="button pin"
      alt="pin artifact"
      onClick={() => dispatch(togglePinnedArtifact(data))}
    >
      <Artifact
        data={data}
        characterBuild={characterBuild}
      />
    </button>
  );

  return (
    <div
      className="CharacterOverview row"
    >
      <Character
        characterName={characterName}
        buildName={characterBuild.build}
      />
      <SpacerPiece />
      { renderArtifact(characterArtifacts.flower) }
      { renderArtifact(characterArtifacts.plume) }
      { renderArtifact(characterArtifacts.sands) }
      { renderArtifact(characterArtifacts.goblet) }
      { renderArtifact(characterArtifacts.circlet) }
      <SpacerPiece />
      <ArtifactStats totalSubstats={totalSubstats} />
    </div>
  );
}
