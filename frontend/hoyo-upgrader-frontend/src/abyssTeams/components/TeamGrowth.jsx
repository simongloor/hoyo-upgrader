/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '../../components/Box';

import paths, { getCharacterImgPath } from '../../data/paths';
import { getTeamMatchesForCharacters } from '../data/teamMatching';

import '../styles/TeamGrowth.scss';
import Character from '../../components/Character';

export default function TeamGrowth({ teamMatches }) {
  const matchesByCharacter = getTeamMatchesForCharacters(teamMatches);

  const [dataVariants, setDataVariants] = useState([]);

  const handleAddDataVariant = (variant) => {
    setDataVariants([...dataVariants, matchesByCharacter]);
  };

  const renderMatches = (data) => (
    data.map((match) => (
      <div
        key={match.characterName}
        className={`match ${match.matchesByTier.S === 0 && match.matchesByTier.A === 0 ? 'empty' : ''}`}
      >
        <p className="S">{match.matchesByTier.S}</p>
        <p className="A">{match.matchesByTier.A}</p>
      </div>
    ))
  );

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
      {
        dataVariants.map((data, index) => (
          <div key={data[0].characterName} className="matches row">
            <h3>
              {`V${index + 1}`}
            </h3>
            {
              renderMatches(data)
            }
          </div>
        ))
      }
      <div className="activeMatches matches row">
        <button
          key="active"
          className="tile"
          onClick={() => handleAddDataVariant(matchesByCharacter)}
          type="button"
        >
          <img
            src={getCharacterImgPath('add')}
            alt="add"
          />
        </button>
        {
          renderMatches(matchesByCharacter)
        }
      </div>
    </Box>
  );
}
