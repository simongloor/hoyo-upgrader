/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { evaluateArtifact, getArtifactTier } from '../data/substats';

import '../styles/Artifact.scss';

export default function Artifact({
  data,
  characterBuild,
  piece = 'empty',
  set = 'generic',
  count = -1,
  showTier = true,
}) {
  // What to display
  const displayedSet = data ? data.set : set;
  const displayedPiece = data ? data.piece : piece;

  // Evaluate
  const [evaluation, setEvaluation] = React.useState(null);
  useEffect(() => {
    if (data && characterBuild) {
      const substats = evaluateArtifact(data, characterBuild);
      const tier = getArtifactTier(data, substats);
      setEvaluation({ substats, tier });
    }
  }, [data]);

  // Render
  return (
    <div
      className="Artifact tile"
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/artifacts/${displayedSet}/${displayedPiece}.png`}
        alt={displayedPiece}
      />
      {
        showTier && evaluation && (
          <>
            <div className="tier-backdrop" />
            <h4>{evaluation.tier}</h4>
          </>
        )
      }
      {
        count !== -1 && (
          <h6>{count}</h6>
        )
      }
    </div>
  );
}
