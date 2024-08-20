/* eslint-disable no-unused-vars */
import React from 'react';

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
  // if (!filteredBuilds) {
  //   return null;
  // }

  const renderQualitySection = (label, builds) => {
    if (builds.length === 0) {
      return null;
    }
    return (
      <>
        <QualitySection label={label} withSpacer />
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
      </>
    );
  };

  // no characters?
  if (
    !filteredBuilds
    || (filteredBuilds.completeBuilds.length === 0
    && filteredBuilds.missingArtifacts.length === 0
    && filteredBuilds.missingRolls.length === 0)
  ) {
    return (
      <Box
        className="AccountOverview"
      >
        <h2>Characters</h2>
        <div className="row placeholder">
          <Character />
          <SpacerPiece />
          <span>No characters found</span>
          <SpacerPiece />
        </div>
      </Box>
    );
  }

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
