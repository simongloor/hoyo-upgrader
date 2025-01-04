/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import Tier from '../../components/Tier';
import Character from '../../components/Character';
import CharacterSelector from '../../components/CharacterSelector';
import Box from '../../components/Box';

import {
  addTeam,
  removeTeam,
  updateTeam,
} from '../data/actions/teams';
import { getCharactersByTier } from '../data/teamMatching';

import iconChevronDown from '../../theme/chevron_down.svg';
import iconChevronUp from '../../theme/chevron_up.svg';
import '../styles/AbyssTeam.scss';

export default function AbyssTeam({
  team,
  teamMatches,
  disabledCharacters,
  highlightedCharacter,
  setHighlightedCharacter,
}) {
  const dispatch = useDispatch();
  const [selectedCharacter, setSelectedCharacter] = React.useState(-1);
  const [matchesOpen, setMatchesOpen] = React.useState(false);

  // fill missing character slots with "generic", there are 4 slots
  const characters = team.characters.concat(Array(4 - team.characters.length).fill('generic'));
  const teamMatchCharacters = getCharactersByTier(teamMatches);

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

  const handleToggleTeamMatches = () => {
    setMatchesOpen(!matchesOpen);
  };

  // render
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
            teamMatchCharacters.filter((match) => team.id !== 'new' && (match.tier === 'S' || match.tier === 'A') && match.character === highlightedCharacter).length > 0 && (
              <div className="highlightTile" />
            )
          }
          {
            characters.map((character, index) => (
              <Character
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={team.tier}
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
              <button
                className="chevron"
                type="button"
                onClick={handleToggleTeamMatches}
              >
                <img
                  src={matchesOpen ? iconChevronUp : iconChevronDown}
                  alt="toggle matches"
                />
              </button>
              {
                teamMatchCharacters.map((match) => (
                  <Character
                    key={match.character}
                    className={match.tier}
                    character={match.character}
                    onClick={() => {
                      setHighlightedCharacter((state) => (
                        state === match.character ? null : match.character
                      ));
                    }}
                    selected={highlightedCharacter === match.character}
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
      {
        matchesOpen && (
          <Box>
            <div className="matches">
              {
                teamMatches.map((teamMatch) => (
                  <div
                    key={teamMatch.id}
                    className="teamMatch"
                  >
                    <div>
                      {
                        teamMatch.characters.map((character, index) => (
                          <Character
                            key={character}
                            className={teamMatch.tier}
                            character={character}
                            disabled
                          />
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </Box>
        )
      }
    </div>
  );
}
