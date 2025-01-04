/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '../../components/Box';
import AbyssTeam from './AbyssTeam';

import '../styles/AvailableAbyssTeams.scss';

export default function AvailableAbyssTeams({
  teamMatches,
  disabledCharacters,
  selectedTeam,
  setSelectedTeam,
}) {
  const [highlightedCharacter, setHighlightedCharacter] = useState(null);

  // render
  return (
    <Box
      className="AvailableAbyssTeams"
    >
      <h2>Teams</h2>
      <span>
        Add your teams and rank them by strength.
        On the right side, you can see which characters have teams for the other side.
      </span>
      <div className="header">
        <span>tier</span>
        <span>team</span>
        <span>playable on other side</span>
      </div>
      {
        teamMatches.map((tm) => (
          <AbyssTeam
            key={tm.team.id}
            team={tm.team}
            teamMatches={tm.matches}
            disabledCharacters={disabledCharacters}
            highlightedCharacter={highlightedCharacter}
            setHighlightedCharacter={setHighlightedCharacter}
          />
        ))
      }
    </Box>
  );
}
