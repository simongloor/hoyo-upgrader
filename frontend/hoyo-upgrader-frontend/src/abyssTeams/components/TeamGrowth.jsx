/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '../../components/Box';
import Character from '../../components/Character';

import { getCharacterImgPath } from '../../data/paths';
import { characterData } from '../../data/characters';
import { getTeamMatchesForCharacters } from '../data/teamMatching';
import { toggleHighlightedCharacter } from '../data/actions/teams';

import iconTrash from '../../theme/trash.svg';
import '../styles/TeamGrowth.scss';

export default function TeamGrowth({ teamMatches, highlightedCharacters }) {
  const matchesByCharacter = getTeamMatchesForCharacters(teamMatches);

  const dispatch = useDispatch();
  const [dataVariants, setDataVariants] = useState([]);

  const handleAddDataVariant = (variant) => {
    setDataVariants([...dataVariants, matchesByCharacter]);
  };

  const handleToggleCharacter = (characterName) => {
    console.log('handleToggleCharacter', characterName);
    dispatch(toggleHighlightedCharacter(characterName));
  };

  const renderMatches = (data) => (
    data
      // prefer highlighed characters
      .sort((a, b) => {
        if (highlightedCharacters.includes(a.characterName)) {
          return -1;
        }
        if (highlightedCharacters.includes(b.characterName)) {
          return 1;
        }
        return 0;
      })
      .map((match) => (
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
        <button
          key="delete"
          className="tile"
          onClick={() => setDataVariants([])}
          type="button"
        >
          <img className="trash" src={iconTrash} alt="wasted" />
        </button>
        {
          Object.keys(characterData)
            // sort by highlighted characters
            .sort((a, b) => {
              if (highlightedCharacters.includes(a)) {
                return -1;
              }
              if (highlightedCharacters.includes(b)) {
                return 1;
              }
              return 0;
            })
            .map((characterName) => (
              <Character
                key={characterName}
                character={characterName}
                onClick={() => handleToggleCharacter(characterName)}
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
