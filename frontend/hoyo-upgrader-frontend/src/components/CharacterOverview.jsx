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
  characterBuild,
  characterArtifacts,
  relevantSubstats,
}) {
  // console.log(characterBuild, characterArtifacts, relevantSubstats);
  const dispatch = useDispatch();

  const renderArtifact = (artifactData, slot) => (
    <button
      type="button"
      className="button pin"
      alt="pin artifact"
      onClick={() => dispatch(togglePinnedArtifact(artifactData))}
      disabled={!artifactData}
    >
      <Artifact
        data={artifactData[slot] && artifactData[slot].artifactData}
        tier={artifactData[slot] && artifactData[slot].buildEvaluations
          .find((b) => b.artifactWearer === characterBuild.artifactWearer).tier}
      />
    </button>
  );

  return (
    <div
      className="CharacterOverview row"
    >
      <Character
        character={characterBuild.artifactWearer}
        secondaryCharacter={characterBuild.buildOwner}
        sets={characterBuild.sets}
      />
      <SpacerPiece />
      { renderArtifact(characterArtifacts, 'flower') }
      { renderArtifact(characterArtifacts, 'plume') }
      { renderArtifact(characterArtifacts, 'sands') }
      { renderArtifact(characterArtifacts, 'goblet') }
      { renderArtifact(characterArtifacts, 'circlet') }
      <SpacerPiece />
      <ArtifactStats relevantSubstats={relevantSubstats} uniformSubstatCount={45} />
    </div>
  );
}
