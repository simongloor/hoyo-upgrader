/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import paths from '../data/paths';
import { getSubstatIsAlwaysBad } from '../data/substats';

import Box from './Box';
import Artifact from './Artifact';
import TextPiece from './TextPiece';
import SpacerPiece from './SpacerPiece';
import togglePinnedArtifact from '../data/actions/pinboard';

import '../styles/Pinboard.scss';

export default function Pinboard() {
  const dispatch = useDispatch();
  const { pinnedArtifactData } = useSelector((state) => state.pinboard);

  if (pinnedArtifactData === null) {
    return null;
  }

  const wrapSubstat = (children, substat, index) => (
    <span className={substat[index] && getSubstatIsAlwaysBad(substat[index].key) ? 'bad' : ''}>
      {children}
    </span>
  );
  const getStatType = (substats, index) => (
    substats[index] === undefined
      ? ''
      : wrapSubstat(paths.stats[substats[index].key], substats, index)
  );
  const getStatValue = (substats, index) => (
    substats[index] === undefined
      ? ''
      : wrapSubstat(substats[index].value, substats, index)
  );
  const getStatRolls = (substats, index, substatCounts) => (
    substats[index] === undefined
      ? ''
      : wrapSubstat(substatCounts[substats[index].key], substats, index)
  );

  return (
    <Box
      className="Pinboard"
    >
      <div className="row">
        <button
          type="button"
          className="button pin"
          alt="pin artifact"
          onClick={() => dispatch(togglePinnedArtifact(pinnedArtifactData))}
        >
          <Artifact
            data={pinnedArtifactData}
          />
        </button>
        <SpacerPiece />
        <TextPiece canOverflow>
          {getStatRolls(pinnedArtifactData.substats, 0, pinnedArtifactData.substatCounts)}
          {getStatRolls(pinnedArtifactData.substats, 1, pinnedArtifactData.substatCounts)}
          {getStatRolls(pinnedArtifactData.substats, 2, pinnedArtifactData.substatCounts)}
          {getStatRolls(pinnedArtifactData.substats, 3, pinnedArtifactData.substatCounts)}
        </TextPiece>
        <SpacerPiece />
        <TextPiece canOverflow>
          {getStatType(pinnedArtifactData.substats, 0)}
          {getStatType(pinnedArtifactData.substats, 1)}
          {getStatType(pinnedArtifactData.substats, 2)}
          {getStatType(pinnedArtifactData.substats, 3)}
        </TextPiece>
        <SpacerPiece />
        <TextPiece canOverflow alignRight>
          {getStatValue(pinnedArtifactData.substats, 0)}
          {getStatValue(pinnedArtifactData.substats, 1)}
          {getStatValue(pinnedArtifactData.substats, 2)}
          {getStatValue(pinnedArtifactData.substats, 3)}
        </TextPiece>
        <SpacerPiece />
      </div>
    </Box>
  );
}
