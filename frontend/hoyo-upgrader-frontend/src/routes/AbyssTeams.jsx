/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CharacterAvailability from '../abyssTeams/components/CharacterAvailability';
import AvailableAbyssTeams from '../abyssTeams/components/AvailableAbyssTeams';
import Abysses from '../abyssTeams/components/Abysses';
import AbyssMatchups from '../abyssTeams/components/AbyssMatchups';
import Box from '../components/Box';

import { loadTeams } from '../abyssTeams/data/actions/teams';

import '../abyssTeams/styles/AbyssTeams.scss';

export default function AbyssTeams() {
  const dispatch = useDispatch();
  const abyssTeams = useSelector((state) => state.abyssTeams);

  const [selectedAbyss, setSelectedAbyss] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    dispatch(loadTeams());
  }, []);

  if (!abyssTeams) {
    return null;
  }

  return (
    <div
      className="AbyssTeams page"
    >
      <Box className="backup">
        <textarea
          value={JSON.stringify(abyssTeams, null, 2)}
          readOnly
        />
      </Box>
      <CharacterAvailability
        disabledCharacters={abyssTeams.disabledCharacters}
      />
      <AvailableAbyssTeams
        disabledCharacters={abyssTeams.disabledCharacters}
        abyssTeams={abyssTeams.teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      <Abysses
        selectedAbyss={selectedAbyss}
        setSelectedAbyss={setSelectedAbyss}
      />
      <AbyssMatchups
        selectedAbyss={selectedAbyss}
        selectedTeam={selectedTeam}
      />
    </div>
  );
}
