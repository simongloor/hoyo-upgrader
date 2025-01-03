/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React from 'react';
import Box from '../../components/Box';
import AbyssTeam from './AbyssTeam';

// import '../styles/AvailableAbyssTeams.scss';

export default function AvailableAbyssTeams({
  abyssTeams,
  disabledCharacters,
  selectedTeam,
  setSelectedTeam,
}) {
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

  return (
    <Box
      className="AvailableAbyssTeams"
    >
      <h2>Teams</h2>
      {
        teams.map((team) => (
          <AbyssTeam
            key={team.id}
            team={team}
          />
        ))
      }
    </Box>
  );
}
