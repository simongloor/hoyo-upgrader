/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CharacterAvailability from '../abyssTeams/components/CharacterAvailability';
import AvailableAbyssTeams from '../abyssTeams/components/AvailableAbyssTeams';
import Abysses from '../abyssTeams/components/Abysses';
import AbyssMatchups from '../abyssTeams/components/AbyssMatchups';
import TeamGrowth from '../abyssTeams/components/TeamGrowth';
import Box from '../components/Box';
import Header from '../components/Header';

import { loadTeams, restoreTeams } from '../abyssTeams/data/actions/teams';
import { getTeamMatchesForAllTeams } from '../abyssTeams/data/teamMatching';

import iconBack from '../theme/arrow_back.svg';
import '../abyssTeams/styles/AbyssTeams.scss';

export default function AbyssTeams() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const abyssTeams = useSelector((state) => state.abyssTeams);

  const [teamMatches, setTeamMatches] = useState(null);
  const [selectedAbyss, setSelectedAbyss] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    dispatch(loadTeams());
  }, []);

  useEffect(() => {
    if (abyssTeams) {
      // filter out teams with disabled characters
      const teams = [
        ...abyssTeams.teams.filter((team) => {
          if (
            team.characters.some((character) => abyssTeams.disabledCharacters.includes(character))
          ) {
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

      // get the matches for each team
      const matches = getTeamMatchesForAllTeams(teams);

      setTeamMatches(matches);
    }
  }, [abyssTeams]);

  if (!abyssTeams || !teamMatches) {
    return null;
  }

  const handleChangeData = (data) => {
    dispatch(restoreTeams(JSON.parse(data)));
  };

  return (
    <div
      className="AbyssTeams mainpage page"
    >
      <div className="scrollArea">
        <Header
          buttonsLeft={(
            <button
              className="iconButton primary"
              type="button"
              onClick={() => navigate('/genshin')}
            >
              <img src={iconBack} alt="artifact upgrader" />
              <span>Artifact Upgrader</span>
            </button>
          )}
        />
        <CharacterAvailability
          disabledCharacters={abyssTeams.disabledCharacters}
        />
        <TeamGrowth
          teamMatches={teamMatches}
          highlightedCharacters={abyssTeams.highlightedCharacters}
        />
        <AvailableAbyssTeams
          disabledCharacters={abyssTeams.disabledCharacters}
          teamMatches={teamMatches}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
        />
        {/* <Abysses
          selectedAbyss={selectedAbyss}
          setSelectedAbyss={setSelectedAbyss}
        />
        <AbyssMatchups
          selectedAbyss={selectedAbyss}
          selectedTeam={selectedTeam}
        /> */}
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
    </div>
  );
}
