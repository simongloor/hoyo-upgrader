/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import CharacterOverview from './CharacterOverview';
import Box from './Box';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import QualitySection from './QualitySection';

import iconChevronDown from '../theme/chevron_down.svg';
import '../styles/AccountOverview.scss';

export default function AccountOverview({
  filteredBuilds,
}) {
  console.log(filteredBuilds);
  const [limitCharacterCount, setLimitCharacterCount] = useState(true);
  const characterCountLimit = 12;

  const renderQualitySection = (label, builds, usedSlots) => {
    // If no builds or used slots exceed the limit, skip section
    if (
      builds.length === 0
      || (limitCharacterCount && usedSlots >= characterCountLimit)
    ) {
      return null;
    }

    // If we are limiting the character count, slice the builds array
    const limitedBuilds = limitCharacterCount
      ? builds.slice(0, characterCountLimit - usedSlots)
      : builds;

    // Render the section
    return (
      <>
        <QualitySection label={label} withSpacer />
        {
          limitedBuilds
            .map((data) => (
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

  // Calculate slot usage to determine if we can show more characters
  let slotUsage = [-9999, -9999, -9999];
  if (limitCharacterCount) {
    slotUsage = [filteredBuilds.missingRolls.length];
    slotUsage.push(slotUsage[slotUsage.length - 1] + filteredBuilds.completeBuilds.length);
    slotUsage.push(slotUsage[slotUsage.length - 1] + filteredBuilds.missingArtifacts.length);
  }

  // Render
  return (
    <Box
      className="AccountOverview"
    >
      <h2>Characters</h2>
      {
        renderQualitySection(
          'in progress',
          filteredBuilds.missingRolls,
          0,
        )
      }
      {
        renderQualitySection(
          'max level',
          filteredBuilds.completeBuilds,
          slotUsage[0],
        )
      }
      {
        renderQualitySection(
          'missing artifacts',
          filteredBuilds.missingArtifacts,
          slotUsage[1],
        )
      }
      {
        limitCharacterCount && slotUsage[2] > characterCountLimit && (
          <div className="more row">
            <button
              type="button"
              className="button primary"
              onClick={() => setLimitCharacterCount(false)}
            >
              <img src={iconChevronDown} alt="show more characters" />
            </button>
          </div>
        )
      }
    </Box>
  );
}
