/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

import Box from './Box';
import Artifact from './Artifact';
import TextPiece from './TextPiece';
import SpacerPiece from './SpacerPiece';

import paths from '../data/paths';
// import '../styles/Filter.scss';

export default function Filter() {
  // get artifacts
  const artifacts = useSelector((state) => state.artifacts);
  const { counts } = artifacts;

  // render
  return (
    <Box
      className="Filter"
    >
      <h2>Filter</h2>
      <div className="piece row">
        <TextPiece>piece</TextPiece>
        <SpacerPiece />
        <Artifact piece={paths.piece.flower} />
        <Artifact piece={paths.piece.plume} />
        <Artifact piece={paths.piece.sands} />
        <Artifact piece={paths.piece.goblet} />
        <Artifact piece={paths.piece.circlet} />
      </div>
      <div className="set row">
        <TextPiece>set</TextPiece>
        <SpacerPiece />
        {
          // iterate through paths.set
          // render Artifact component for each set
          counts.sortedSets
            .filter((set) => Object.keys(paths.set).includes(set))
            .map((set) => (
              <Artifact
                piece={paths.piece.flower}
                set={set}
                key={set}
                count={counts.sets[set] ? counts.sets[set].total : 0}
              />
            ))
        }
      </div>
    </Box>
  );
}
