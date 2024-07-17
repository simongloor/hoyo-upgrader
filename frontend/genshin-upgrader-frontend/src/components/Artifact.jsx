/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import '../styles/Artifact.scss';

export default function Artifact({
  data,
  piece = 'empty',
  set = 'generic',
  count = -1,
}) {
  const displayedSet = data ? data.set : set;
  const displayedPiece = data ? data.piece : piece;
  // console.log(displayedSet, displayedPiece);

  // Load image from path ../theme/genshin/artifacts/${displayedSet}/${displayedPiece}.png
  // useEffect(() => {
  //   const img = new Image();
  //   img.src = `../theme/genshin/artifacts/${displayedSet}/${displayedPiece}.png`;
  // }, [displayedPiece, displayedSet]);

  return (
    <div
      className="Artifact tile"
    >
      <img
        src={`${process.env.PUBLIC_URL}/genshin/artifacts/${displayedSet}/${displayedPiece}.png`}
        alt={displayedPiece}
      />
      {
        data && (
          <h4>{data.tier}</h4>
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
