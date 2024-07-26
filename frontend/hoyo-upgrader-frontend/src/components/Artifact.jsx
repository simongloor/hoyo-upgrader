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
  showMissingSlots = false,
}) {
  // console.log(data);

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
  const validTier = showTier && evaluation;
  const validMainstat = data && data.slotKey !== 'flower' && data.slotKey !== 'plume';
  let label = null;
  if (validTier && validMainstat) {
    label = (
      <>
        <div className={`tier-backdrop mainstat ${data.mainStatKey}`} />
        <h6 className="tier-label">{evaluation.tier}</h6>
      </>
    );
  } else if (validMainstat) {
    label = (
      <div className={`mainstat-backdrop ${data.mainStatKey}`} />
    );
  } else if (validTier) {
    label = (
      <>
        <div className="tier-backdrop" />
        <h6 className="tier-label">{evaluation.tier}</h6>
      </>
    );
  }

  // render missing slots
  let missingStat = null;
  if (showMissingSlots && data && data.substats.length < 4) {
    missingStat = (
      <>
        <div className="missingStat-backdrop" />
        <h6 className="missingStat-label">?</h6>
      </>
    );
  }

  // render
  return (
    <div
      className={`Artifact tile ${displayedSet} ${displayedPiece}`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/artifacts/${displayedSet}/${displayedPiece}.png`}
        alt={displayedPiece}
      />
      { missingStat }
      { label }
      {
        count !== -1 && (
          <h6>{count}</h6>
        )
      }
    </div>
  );
}
