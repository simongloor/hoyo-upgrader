/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';

import Artifact from './Artifact';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import ArtifactStats from './ArtifactStats';

import '../styles/ArtifactEvaluation.scss';
import ArtifactStatText from './ArtifactStatText';

export default function ArtifactEvaluation({
  evaluationData,
  handleClickPinArtifact,
  filteredCharacter,
}) {
  // console.log(evaluationData);
  return (
    <div
      className="ArtifactEvaluation row"
    >
      {
        evaluationData.artifactData.location ? (
          <Character
            character={evaluationData.artifactData.location}
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
          && handleClickPinArtifact(evaluationData.artifactData)}
        disabled={!handleClickPinArtifact}
      >
        {
          evaluationData.artifactData.location ? (
            <Artifact
              data={evaluationData.artifactData}
              showTier
          />
          ) : (
            <Artifact
              data={evaluationData.artifactData}
              upgradePotential={evaluationData.highestUpgradePotential}
            />
          )
        }
      </button>
      {/* <SpacerPiece size="small" /> */}
      <ArtifactStatText artifactData={evaluationData.artifactData} />
      {
        evaluationData.buildEvaluations
          .filter((b) => (
            // show with upgrade potential
            b.upgradePotential > 0
            // show for the selected character
            || b.build.artifactWearer === filteredCharacter
            // show for the artifact's wearer
            || b.build.artifactWearer === evaluationData.artifactData.location
          ))
          .map((b) => (
            <Fragment key={b.build.artifactWearer}>
              <SpacerPiece size="small" />
              <Character
                character={b.build.buildOwner}
                secondaryCharacter={b.build.artifactWearer}
                sets={b.build.sets}
                upgradePotential={b.upgradePotential}
              />
              <ArtifactStats
                totalSubstats={b.totalSubstats}
                showCounter={false}
                uniformSubststCount={9}
              />
            </Fragment>
          ))
      }
    </div>
  );
}
