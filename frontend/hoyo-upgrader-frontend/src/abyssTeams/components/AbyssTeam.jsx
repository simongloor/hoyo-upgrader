/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import Tier from '../../components/Tier';
import Character from '../../components/Character';
import '../styles/AbyssTeam.scss';
import CharacterSelector from '../../components/CharacterSelector';
import Box from '../../components/Box';
import { addTeam, removeTeam, updateTeam } from '../data/actions/teams';
import { getAllTeamMatches, getCharactersByTier } from '../data/teamMatching';

export default function AbyssTeam({ team, teams, disabledCharacters }) {
  const dispatch = useDispatch();
  const [selectedCharacter, setSelectedCharacter] = React.useState(-1);

  // fill missing character slots with "generic", there are 4 slots
  const characters = team.characters.concat(Array(4 - team.characters.length).fill('generic'));
  const teamMatchCharacters = getCharactersByTier(getAllTeamMatches(team, teams));

  const handleToggleTier = (letter) => {
    if (team.id === 'new') {
      dispatch(addTeam({ ...team, tier: letter }));
    } else {
      dispatch(updateTeam({ ...team, tier: letter }));
    }
  };

  const handleClickCharacter = (character) => {
    if (selectedCharacter === character) {
      setSelectedCharacter(-1);
      return;
    }
    setSelectedCharacter(character);
  };

  const handleAssignSlot = (character) => {
    characters[selectedCharacter] = character;
    if (team.id === 'new') {
      dispatch(addTeam({ ...team, characters }));
    } else {
      // update team
      dispatch(updateTeam({ ...team, characters }));
    }
    setSelectedCharacter(-1);
  };

  return (
    <div
      className="AbyssTeam"
    >
      <div className="team">
        <Tier
          letter={team.tier}
          setLetter={handleToggleTier}
        />
        <div
          className="characters"
        >
          {
            characters.map((character, index) => (
              <Character
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                character={character}
                onClick={() => handleClickCharacter(index)}
                selected={selectedCharacter === index}
              />
            ))
          }
        </div>
        {
          team.id !== 'new' && (
            <div className="matches">
              {
                teamMatchCharacters.map((match) => (
                  <Character
                    key={match.character}
                    className={match.tier}
                    character={match.character}
                    disabled
                  />
                ))
              }
            </div>
          )
        }
        {
          team.id !== 'new' && (
            <button
              className="primary"
              type="button"
              onClick={() => dispatch(removeTeam(team.id))}
            >
              <span>delete</span>
            </button>
          )
        }
      </div>
      {
        selectedCharacter >= 0 && (
          <Box>
            <CharacterSelector
              onSelectCharacter={handleAssignSlot}
              disabledCharacters={disabledCharacters}
            />
          </Box>
        )
      }
    </div>
  );
}
