/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';

import Artifact from './Artifact';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import ArtifactStats from './ArtifactStats';
import { getBuildKey } from '../data/actions/characters';

import '../styles/ArtifactEvaluation.scss';
import ArtifactStatText from './ArtifactStatText';

export default function ArtifactEvaluation({
  evaluationData,
  handleClickPinArtifact,
}) {
  // console.log(evaluationData);
  return (
    <div
      className="ArtifactEvaluation row"
    >
      {
        evaluationData.artifactData.location ? (
          <Character
            characterName={evaluationData.artifactData.location}
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
        <Artifact
          data={evaluationData.artifactData}
          upgradePotential={
            evaluationData.artifactData.location ? -1 : evaluationData.highestUpgradePotential
          }
        />
      </button>
      {/* <SpacerPiece size="small" /> */}
      <ArtifactStatText artifactData={evaluationData.artifactData} />
      {
        evaluationData.buildEvaluations
          .map((b) => (
            <Fragment key={
              getBuildKey(b.build)
            }>
              <SpacerPiece size="small" />
              <Character
                characterName={b.build.characterName}
                buildName={getBuildKey(b.build)}
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
