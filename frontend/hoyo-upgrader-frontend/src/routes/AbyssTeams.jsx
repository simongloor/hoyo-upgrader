/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import CharacterAvailability from '../components/abyss/CharacterAvailability';
import AvailableAbyssTeams from '../components/abyss/AvailableAbyssTeams';
import Abysses from '../components/abyss/Abysses';
import AbyssMatchups from '../components/abyss/AbyssMatchups';
// import '../styles/AbyssTeams.scss';

export default function TheaterTeams() {
  const [selectedAbyss, setSelectedAbyss] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div
      className="AbyssTeams page"
    >
      <CharacterAvailability />
      <AvailableAbyssTeams
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
