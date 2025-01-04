/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '../../components/Box';
import AbyssTeam from './AbyssTeam';

import '../styles/AvailableAbyssTeams.scss';

export default function AvailableAbyssTeams({
  abyssTeams,
  disabledCharacters,
  selectedTeam,
  setSelectedTeam,
}) {
  const [highlightedCharacter, setHighlightedCharacter] = useState(null);

  // filter out teams with disabled characters
  const teams = [
    ...abyssTeams.filter((team) => {
      if (team.characters.some((character) => disabledCharacters.includes(character))) {
        return false;
      }
      return true;
    }),
    {
      id: 'new',
      tier: 'S',
      characters: [],
    },
  ];

  // sort teams by tier and then by the characters joined names
  const tiers = ['S', 'A', 'B', 'C', 'D'];
  teams.sort((a, b) => {
    if (tiers.indexOf(a.tier) !== tiers.indexOf(b.tier)) {
      return tiers.indexOf(a.tier) - tiers.indexOf(b.tier);
    }
    return a.characters.join().localeCompare(b.characters.join());
  });
  // move the new team to the last position
  teams.push(teams.shift());

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
        teams.map((team) => (
          <AbyssTeam
            key={team.id}
            team={team}
            teams={teams}
            disabledCharacters={disabledCharacters}
            highlightedCharacter={highlightedCharacter}
            setHighlightedCharacter={setHighlightedCharacter}
          />
        ))
      }
    </Box>
  );
}
