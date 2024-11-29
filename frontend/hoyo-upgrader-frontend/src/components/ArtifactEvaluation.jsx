/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React from 'react';

import Artifact from './Artifact';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import ArtifactStats from './ArtifactStats';

import '../styles/ArtifactEvaluation.scss';
import ArtifactStatText from './ArtifactStatText';

export default function ArtifactEvaluation({
  artifact,
  handleClickPinArtifact,
  pinnedArtifactString,
}) {
  // // console.log(artifact);
  // if (
  //   artifact
  //   && artifact.buildEvaluations.length > 0
  //   && artifact.buildEvaluations[0].upgradePotential < 0
  // ) {
  //   return null;
  // }

  return (
    <div
      className="ArtifactEvaluation row"
    >
      {
        pinnedArtifactString
        && pinnedArtifactString === JSON.stringify(artifact.artifactData.substats)
        && (
          <div className="pinned" />
        )
      }
      {
        artifact.highlight && (
          <div className="highlight" />
        )
      }
      {
        artifact.artifactData.location ? (
          <Character
            character={artifact.artifactData.location}
          />
        ) : (
          <SpacerPiece size="default" />
        )
      }
      <button
        type="button"
        className="button pin"
        alt="pin artifact"
        onClick={() => handleClickPinArtifact
          && handleClickPinArtifact(artifact.artifactData)}
        disabled={!handleClickPinArtifact}
      >
        {
          artifact.artifactData.location ? (
            <Artifact
              data={artifact.artifactData}
              showMainstat
          />
          ) : (
            <Artifact
              data={artifact.artifactData}
              upgradePotential={artifact.highestUpgradePotential}
            />
          )
        }
      </button>
      {/* <SpacerPiece size="small" /> */}
      <ArtifactStatText artifactData={artifact.artifactData} />
      {
        artifact.buildEvaluations
          .map((b) => (
            <div
              className={`evaluation row ${b.upgradeIsRelevant && b.upgradePotential < 0 && b.artifactWearer !== artifact.artifactData.location ? 'weak' : ''}`}
              key={b.artifactWearer}
            >
              {/* <span>{b.upgradeChance}</span> */}
              {/* <span>{b.sortValue}</span> */}
              <SpacerPiece size="small" />
              <Character
                character={b.artifactWearer}
                secondaryCharacter={b.buildOwner}
                upgradePotential={b.upgradePotential}
              />
              <ArtifactStats
                relevantSubstats={b.relevantSubstats}
                showCounter={false}
                uniformSubstatCount={9}
                upgradeChance={b.upgradeChance}
              />
            </div>
          ))
      }
    </div>
  );
}
