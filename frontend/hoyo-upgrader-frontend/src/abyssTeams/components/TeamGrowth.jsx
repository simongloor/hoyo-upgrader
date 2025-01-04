/* eslint-disable no-unused-vars */
import React from 'react';
import Box from '../../components/Box';

import paths, { getCharacterImgPath } from '../../data/paths';
import { getTeamMatchesForCharacters } from '../data/teamMatching';

import '../styles/TeamGrowth.scss';
import Character from '../../components/Character';

export default function TeamGrowth({ teamMatches }) {
  const matchesByCharacter = getTeamMatchesForCharacters(teamMatches);
  console.log(matchesByCharacter);

  // render
  return (
    <Box
      className="TeamGrowth"
    >
      <h2>Team Combinations</h2>
      <span>
        Discover in how many combinations of two teams each character can be used.
        For example: An A-Tier number of 5 means that 5 combinations of teams would work.
        The worse team in these combinations is A-Tier.
      </span>
      <div className="header row">
        <div key="empty" className="tile" />
        {
          matchesByCharacter.map((match) => (
            <Character
              key={match.characterName}
              character={match.characterName}
              disabled
            />
          ))
        }
      </div>
      <div className="activeMatches matches row">
        <div
          key="active"
          className="tile"
        >
          <img
            src={getCharacterImgPath('add')}
            alt="add"
          />
        </div>
        {
          matchesByCharacter.map((match) => (
            <div key={match.characterName} className="match">
              <p className="S">{match.matchesByTier.S}</p>
              <p className="A">{match.matchesByTier.A}</p>
            </div>
          ))
        }
      </div>
    </Box>
  );
}
