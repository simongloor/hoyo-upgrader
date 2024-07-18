/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';

import Artifact from './Artifact';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import ArtifactStats from './ArtifactStats';

// import '../styles/ArtifactEvaluation.scss';

export default function ArtifactEvaluation({
  evaluationData,
  filteredCharacter,
}) {
  // console.log(evaluationData);
  // return null;
  return (
    <div
      className="ArtifactEvaluation row"
    >
      {
        evaluationData.artifactData.location ? (
          <Character
            characterName={evaluationData.artifactData.location}
            // buildName={data.slotKey}
          />
        ) : (
          <SpacerPiece size="default" />
        )
      }
      <Artifact
        data={evaluationData.artifactData}
      />
      {
        evaluationData.buildEvaluations
          .sort((a, b) => (
            ((b.build.characterName === filteredCharacter) ? 1 : 0)
            - ((a.build.characterName === filteredCharacter) ? 1 : 0)
          ))
          .map((b) => (
            <Fragment key={`${b.build.characterName}-${b.build.build}`}>
              <SpacerPiece size="small" />
              <Character
                characterName={b.build.characterName}
                buildName={b.build.build}
              />
              <ArtifactStats
                totalSubstats={b.totalSubstats}
                showCounter={false}
              />
            </Fragment>
          ))
      }
    </div>
  );
}
