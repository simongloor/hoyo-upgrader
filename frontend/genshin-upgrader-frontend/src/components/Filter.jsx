/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

import paths from '../data/paths';

import FilterTile from './FilterTile';
import Box from './Box';

// import '../styles/Filter.scss';

export default function Filter() {
  const filter = useSelector((state) => state.filter);
  const characterFilter = filter.character;
  const characterBuildFilter = filter.build;
  const artifactSetFilter = filter.set;
  const artifactSetsFilter = filter.sets;
  const artifactPieceFilter = filter.piece;

  // render
  return (
    <Box
      className="Filter"
    >
      <div className="row">
        <FilterTile
          isCharacter
          characterName={characterFilter}
          characterBuildName={characterBuildFilter}
        />
        <FilterTile
          isArtifactSet
          artifactSetName={artifactSetFilter}
          artifactSetNames={artifactSetsFilter}
        />
        <FilterTile
          isArtifactPiece
          artifactPieceName={paths.piece.flower}
          filteredArtifactPiece={artifactPieceFilter}
        />
        <FilterTile
          isArtifactPiece
          artifactPieceName={paths.piece.plume}
          filteredArtifactPiece={artifactPieceFilter}
        />
        <FilterTile
          isArtifactPiece
          artifactPieceName={paths.piece.sands}
          filteredArtifactPiece={artifactPieceFilter}
        />
        <FilterTile
          isArtifactPiece
          artifactPieceName={paths.piece.goblet}
          filteredArtifactPiece={artifactPieceFilter}
        />
        <FilterTile
          isArtifactPiece
          artifactPieceName={paths.piece.circlet}
          filteredArtifactPiece={artifactPieceFilter}
        />
      </div>
    </Box>
  );
}
