/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { evaluateArtifact, getArtifactTier } from '../data/substats';

import iconUpgrade from '../theme/upgrade.svg';
import iconWasted from '../theme/wasted.svg';
import '../styles/Artifact.scss';

export default function Artifact({
  data,
  characterBuild,
  piece = 'empty',
  set = 'generic',
  count = -1,
  showTier = true,
  showMissingSlots = false,
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
  const validTier = showTier && evaluation;
  const validMainstat = data && data.slotKey !== 'flower' && data.slotKey !== 'plume';
  let label = null;
  if (validTier && validMainstat) {
    label = (
      <>
        <div className={`tier mainstat ${data.mainStatKey}`} />
        <h6 className="tier">{evaluation.tier}</h6>
      </>
    );
  } else if (validMainstat) {
    label = (
      <div className={`mainstat ${data.mainStatKey}`} />
    );
  } else if (validTier) {
    label = (
      <>
        <div className="tier" />
        <h6 className="tier">{evaluation.tier}</h6>
      </>
    );
  }

  // render missing slots
  let missingStat = null;
  if (showMissingSlots && data && data.substats.length < 4) {
    missingStat = (
      <>
        <div className="missingStat" />
        <h6 className="missingStat">?</h6>
      </>
    );
  }

  // render warning that there is no upgrade potential
  let noUpgradePotential = null;
  if (upgradePotential === 0) {
    // console.log('no upgrade potential');
    noUpgradePotential = (
      <div className="no-upgrade">
        <img
          className="upgrade"
          src={iconUpgrade}
          alt="upgrade"
        />
        <img
          className="wasted"
          src={iconWasted}
          alt="wasted"
        />
      </div>
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
      { noUpgradePotential || missingStat }
      { label }
      {
        count !== -1 && (
          <h6>{count}</h6>
        )
      }
    </div>
  );
}
