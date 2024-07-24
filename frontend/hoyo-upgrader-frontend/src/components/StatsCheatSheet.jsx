/* eslint-disable no-unused-vars */
import React from 'react';
import Box from './Box';

import '../styles/StatsCheatSheet.scss';
import SpacerPiece from './SpacerPiece';

export default function StatsCheatSheet({ children }) {
  return (
    <Box
      className="StatsCheatSheet"
    >
      <div className="row">
        <span className="label">stats:</span>
        <SpacerPiece />
        <span className="stat enerRech_">
          Energy Recharge
        </span>
        <span className="stat critRate_">
          Crit Rate
        </span>
        <span className="stat critDMG_">
          Crit Damage
        </span>
        <span className="stat atk_">
          ATK %
        </span>
        <span className="stat hp_">
          HP %
        </span>
        <span className="stat def_">
          DEF %
        </span>
        <span className="stat eleMas_">
          Elemental Mastery
        </span>
      </div>
    </Box>
  );
}
