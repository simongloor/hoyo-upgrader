/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import Artifact from './Artifact';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import paths from '../data/paths';
import ArtifactStats from './ArtifactStats';
import { evaluateArtifact } from '../data/substats';
// import '../styles/ArtifactEvaluation.scss';

export default function ArtifactEvaluation({
  data,
  characterBuilds,
  filteredCharacter,
}) {
  // get matching builds
  let matchingBuilds = [];
  if (data.slotKey === paths.piece.flower || data.slotKey === paths.piece.plume) {
    matchingBuilds = characterBuilds;
  } else {
    matchingBuilds = characterBuilds.filter((build) => (
      build.mainstats[data.slotKey].includes(data.mainStatKey)
    ));
  }

  // render
  return (
    <div
      className="ArtifactEvaluation row"
    >
      {
        data.location ? (
          <Character
            characterName={data.location}
            // buildName={data.slotKey}
          />
        ) : (
          <SpacerPiece size="default" />
        )
      }
      <Artifact
        data={data}
      />
      {
        matchingBuilds
          .sort((a, b) => (
            ((b.characterName === filteredCharacter) ? 1 : 0)
            - ((a.characterName === filteredCharacter) ? 1 : 0)
          ))
          .map((build, i) => (
            <Fragment key={`${build.characterName}-${build.build}`}>
              <SpacerPiece size="small" />
              <Character
                characterName={build.characterName}
                buildName={build.build}
              />
              <ArtifactStats
                totalSubstats={evaluateArtifact(data, build)}
                showCounter={false}
              />
            </Fragment>
          ))
      }
    </div>
  );
}