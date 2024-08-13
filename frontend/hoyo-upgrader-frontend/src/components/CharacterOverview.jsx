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
  const [hoveredArtifact, setHoveredArtifact] = React.useState(null);
  const dispatch = useDispatch();
  // console.log(hoveredArtifact);

  const renderArtifact = (artifactData, slot) => {
    const build = artifactData[slot] && artifactData[slot].buildEvaluations
      .find((b) => b.artifactWearer === characterBuild.artifactWearer);
    return (
      <button
        type="button"
        className="button pin"
        alt="pin artifact"
        onClick={() => dispatch(togglePinnedArtifact(artifactData[slot].artifactData))}
        onMouseEnter={() => setHoveredArtifact(build)}
        disabled={!artifactData}
      >
        <Artifact
          data={artifactData[slot] && artifactData[slot].artifactData}
          tier={build && build.relevantSubstats.wastedSubstats}
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
      />
    </div>
  );
}
