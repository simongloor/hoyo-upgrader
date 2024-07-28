/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { evaluateArtifact, getArtifactTier } from '../data/substats';

import iconTrash from '../theme/trash.svg';
import '../styles/Artifact.scss';

export default function Artifact({
  data,
  characterBuild,
  piece = 'empty',
  set = 'generic',
  count = -1,
  showTier = false,
  upgradePotential = -1,
}) {
  // console.log(data);
  // console.log(upgradePotential);

  // What to display
  const displayedSet = data ? data.set : set;
  const displayedPiece = data ? data.piece : piece;

  // evaluate
  const [evaluation, setEvaluation] = React.useState(null);
  useEffect(() => {
    if (data && characterBuild) {
      const substats = evaluateArtifact(data, characterBuild);
      const tier = getArtifactTier(data, substats);
      setEvaluation({ substats, tier });
    }
  }, [data]);

  // render label
  let label = '';

  // tier?
  if (showTier && evaluation) {
    label = (
      <h6 className="tier">{evaluation.tier}</h6>
    );
  }

  // upgrade potential?
  switch (upgradePotential) {
    case 0: {
      label = (
        <img className="trash" src={iconTrash} alt="wasted" />
      );
      break;
    }
    case -1: {
      break;
    }
    default: {
      label = (
        <h6 className="upgrade">{`↑${upgradePotential}`}</h6>
      );
    }
  }

  // add widget around label
  const widget = label ? (
    <div className={`tier tile-marker ${showTier ? 'heavy' : ''}`}>
      <div className={`${data.piece === 'flower' || data.piece === 'plume' ? 'generic' : data.mainStatKey}`} />
      {label}
    </div>
  ) : null;

  // render
  return (
    <div
      className={`Artifact tile ${displayedSet} ${displayedPiece}`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/artifacts/${displayedSet}/${displayedPiece}.png`}
        alt={displayedPiece}
      />
      { widget }
      {
        count !== -1 && (
          <h6>{count}</h6>
        )
      }
    </div>
  );
}
