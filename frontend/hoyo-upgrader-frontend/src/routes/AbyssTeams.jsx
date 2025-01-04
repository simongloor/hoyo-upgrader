/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CharacterAvailability from '../abyssTeams/components/CharacterAvailability';
import AvailableAbyssTeams from '../abyssTeams/components/AvailableAbyssTeams';
import Abysses from '../abyssTeams/components/Abysses';
import AbyssMatchups from '../abyssTeams/components/AbyssMatchups';
import Box from '../components/Box';

import { loadTeams, restoreTeams } from '../abyssTeams/data/actions/teams';

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

  const handleChangeData = (data) => {
    dispatch(restoreTeams(JSON.parse(data)));
  };

  return (
    <div
      className="AbyssTeams page"
    >
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
      <Box className="backup">
        <span>
          Make a backup of this data to restore your save in case your cache gets deleted:
        </span>
        <textarea
          value={JSON.stringify(abyssTeams, null, 2)}
          onChange={(e) => handleChangeData(e.target.value)}
        />
      </Box>
    </div>
  );
}
