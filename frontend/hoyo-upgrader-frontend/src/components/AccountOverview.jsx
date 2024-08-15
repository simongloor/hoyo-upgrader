/* eslint-disable no-unused-vars */
import React from 'react';

import { getCharactersTotalSubstats } from '../data/substats';
import { getEquippedArtifacts } from '../data/builds';

import CharacterOverview from './CharacterOverview';
import Box from './Box';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';

import '../styles/AccountOverview.scss';
import QualitySection from './QualitySection';

export default function AccountOverview({
  filteredBuilds,
}) {
  const renderQualitySection = (label, builds) => (
    <>
      <QualitySection label={label} />
      {
        builds.map((data) => (
          <CharacterOverview
            key={data.build.artifactWearer}
            characterBuild={data.build}
            characterArtifacts={data.artifacts}
            relevantSubstats={data.relevantSubstats}
          />
        ))
      }
      {
        builds.length === 0 && (
          <div className="row placeholder">
            <Character />
            <SpacerPiece />
            <TextPiece canOverflow>No matching character found</TextPiece>
            <SpacerPiece />
          </div>
        )
      }
    </>
  );

  // Render
  return (
    <Box
      className="AccountOverview"
    >
      <h2>Characters</h2>
      { renderQualitySection('in progress', filteredBuilds.missingRolls) }
      { renderQualitySection('max level', filteredBuilds.completeBuilds) }
      { renderQualitySection('missing artifacts', filteredBuilds.missingArtifacts) }
    </Box>
  );
}
