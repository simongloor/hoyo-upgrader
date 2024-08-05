/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from 'react';

import Artifact from './Artifact';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import ArtifactStats from './ArtifactStats';

import '../styles/ArtifactEvaluation.scss';
import ArtifactStatText from './ArtifactStatText';

export default function ArtifactEvaluation({
  artifact,
  handleClickPinArtifact,
  index,
}) {
  // // switch after index * 0.2s to show the artifact
  // const [showPlaceholder, setShowPlaceholder] = useState(true);

  // // trigger after rerender
  // useEffect(() => {
  //   const timeDelay = Math.floor(Math.max(index - 20) / 10) * 50;
  //   let timeout;
  //   if (timeDelay <= 0) {
  //     setShowPlaceholder(false);
  //   } else {
  //     setShowPlaceholder(true);
  //     timeout = setTimeout(() => {
  //       setShowPlaceholder(false);
  //     }, timeDelay);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [artifact, index]);

  // // render placeholder
  // if (showPlaceholder && index > 50) {
  //   return (
  //     <div className="ArtifactEvaluation-placeholder">
  //       <div className="artifact" />
  //       <div className="stats" />
  //     </div>
  //   );
  // }

  // render full
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
        artifact.buildEvaluations
          .map((b) => (
            <Fragment key={b.artifactWearer}>
              <SpacerPiece size="small" />
              <Character
                character={b.buildOwner}
                secondaryCharacter={b.artifactWearer}
                upgradePotential={b.upgradePotential}
              />
              <ArtifactStats
                relevantSubstats={b.relevantSubstats}
                showCounter={false}
                uniformSubstatCount={9}
              />
            </Fragment>
          ))
      }
    </div>
  );
}
