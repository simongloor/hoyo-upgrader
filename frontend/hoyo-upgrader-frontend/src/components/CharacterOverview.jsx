/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import togglePinnedArtifact from '../data/actions/pinboard';

import Character from './Character';
import SpacerPiece from './SpacerPiece';
import Artifact from './Artifact';
import ArtifactStats from './ArtifactStats';
import { addArtifactFilter } from '../data/actions/filter';

// import '../styles/CharacterOverview.scss';

export default function CharacterOverview({
  characterBuild,
  characterArtifacts,
  relevantSubstats,
}) {
  // console.log(characterBuild, characterArtifacts, relevantSubstats);
  const [hoveredArtifact, setHoveredArtifact] = useState(null);
  const dispatch = useDispatch();
  // console.log(hoveredArtifact);

  const handleClickArtifact = (slot, artifactData) => {
    dispatch(togglePinnedArtifact(artifactData[slot].artifactData));
    dispatch(addArtifactFilter(slot, artifactData[slot].artifactData.mainStatKey));
  };

  const renderArtifact = (artifactData, slot) => {
    const build = artifactData[slot] && artifactData[slot].buildEvaluations
      .find((b) => b.artifactWearer === characterBuild.artifactWearer);
    return (
      <button
        type="button"
        className="button pin"
        alt="pin artifact"
        onClick={() => handleClickArtifact(slot, artifactData)}
        onMouseEnter={() => setHoveredArtifact(build)}
        disabled={!artifactData}
      >
        <Artifact
          data={artifactData[slot] && artifactData[slot].artifactData}
          tier={build && build.relevantSubstats.wastedSubstats}
          showMainstat
        />
      </button>
    );
  };

  return (
    <div
      className="CharacterOverview row"
      onMouseLeave={() => setHoveredArtifact(null)}
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
      <ArtifactStats
        relevantSubstats={relevantSubstats}
        hoveredSubstats={hoveredArtifact && hoveredArtifact.relevantSubstats}
        uniformSubstatCount={45}
        sortRollChances
        showLabel
      />
    </div>
  );
}
