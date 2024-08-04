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
  artifact,
  handleClickPinArtifact,
  filteredCharacter,
}) {
  console.log(artifact);
  // return null;
  return (
    <div
      className="ArtifactEvaluation row"
    >
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
              showTier
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
        artifact.buildEvaluations // !!!!!! evaluation should include wearer as property: convert object to array!
          .filter((b) => (
            // show with upgrade potential
            b.upgradePotential > 0
            // show for the selected character
            || b.build.artifactWearer === filteredCharacter
            // show for the artifact's wearer
            || b.build.artifactWearer === artifact.artifactData.location
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
